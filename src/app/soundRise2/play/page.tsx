"use client";

import React, { useState, useRef, useEffect } from "react";

// 添加类型定义
interface TestResult {
  error?: string;
  prediction?: number;
  predictedVowel?: string;
  actualVowel?: string;
  isCorrect?: boolean;
  confidence?: number;
  allProbabilities: Record<string, number>;
}

export default function VowelRecognitionPage() {
  const [isRecording, setIsRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedVowel, setSelectedVowel] = useState("a");
  const [pitch, setPitch] = useState(0);
  const [intensity, setIntensity] = useState(0);

  const [realtimeTestResult, setRealtimeTestResult] =
    useState<TestResult | null>(null);
  const [fileTestResult, setFileTestResult] = useState<TestResult | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  // Add debounce time state and ref
  const [lastProcessedTime, setLastProcessedTime] = useState(0);
  const processingQueueRef = useRef(false);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      // Create new AudioContext
      const AudioContextClass = (window.AudioContext ||
        (window as any).webkitAudioContext) as typeof AudioContext;
      audioContextRef.current = new AudioContextClass();

      if (!audioContextRef.current) return;

      // Create and configure analyser
      analyserRef.current = audioContextRef.current.createAnalyser();
      analyserRef.current.fftSize = 2048;
      analyserRef.current.smoothingTimeConstant = 0.8;
      analyserRef.current.minDecibels = -90;
      analyserRef.current.maxDecibels = -10;

      // Connect audio nodes
      const source = audioContextRef.current.createMediaStreamSource(stream);
      source.connect(analyserRef.current);

      // Set up MediaRecorder
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (audioChunksRef.current) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: "audio/wav",
        });
        const tempUrl = URL.createObjectURL(audioBlob);
        setAudioUrl(tempUrl);
      };

      // Start recording
      mediaRecorderRef.current.start();
      setIsRecording(true);

      // Start audio analysis
      processAudioData();
    } catch (err) {
      console.error("Error starting recording:", err);
    }
  };

  const stopRecording = async () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();

      await new Promise<void>((resolve) => {
        mediaRecorderRef.current!.addEventListener("stop", () => {
          // 直接创建文件对象
          const audioBlob = new Blob(audioChunksRef.current, {
            type: "audio/wav",
          });
          const file = new File([audioBlob], `${selectedVowel}.wav`, {
            type: "audio/wav",
          });

          // 创建一个隐藏的文件输入元素
          const input = document.createElement("input");
          input.type = "file";

          // 将文件分配给输入元素
          const dataTransfer = new DataTransfer();
          dataTransfer.items.add(file);
          input.files = dataTransfer.files;

          // 使用相同的文件上传处理函数
          const fakeEvent = {
            target: input,
            nativeEvent: new Event("change"),
            currentTarget: input,
            bubbles: true,
            cancelable: true,
            defaultPrevented: false,
            eventPhase: 2,
            isTrusted: true,
            preventDefault: () => {},
            stopPropagation: () => {},
            isDefaultPrevented: () => false,
            isPropagationStopped: () => false,
            persist: () => {},
            timeStamp: Date.now(),
            type: "change",
          } as React.ChangeEvent<HTMLInputElement>;

          handleFileUpload(fakeEvent);
          resolve();
        });
      });

      // ... 清理代码
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setAudioUrl(URL.createObjectURL(file));
    }
  };

  const runTest = async (isRealtime: boolean) => {
    if (isProcessing || !audioUrl) return;

    // For realtime testing, add debounce
    if (isRealtime) {
      const now = Date.now();
      if (now - lastProcessedTime < 2000 || processingQueueRef.current) {
        return;
      }
      setLastProcessedTime(now);
    }

    try {
      setIsProcessing(true);
      processingQueueRef.current = true;

      const response = await fetch(audioUrl);
      const audioBlob = await response.blob();
      const fileName = `${selectedVowel || "test"}.wav`;

      // Convert blob to base64
      const base64Audio = await new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.readAsDataURL(audioBlob);
      });

      // Use environment variable for API URL with fallback
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:5000";

      const fetchPromise = fetch(`${apiUrl}/api/test-model`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          input: base64Audio,
          fileName,
          actualVowel: selectedVowel,
        }),
      });

      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Request timeout")), 10000)
      );

      const apiResponse = (await Promise.race([
        fetchPromise,
        timeoutPromise,
      ])) as Response;

      if (!apiResponse.ok) {
        throw new Error(`HTTP error! status: ${apiResponse.status}`);
      }

      const result = await apiResponse.json();

      if (result.error) {
        throw new Error(result.error);
      }

      // Update test results
      if (isRealtime) {
        setRealtimeTestResult(result);
      } else {
        setFileTestResult(result);
      }
    } catch (error) {
      console.error("Error running test:", error);
      const errorMessage =
        error instanceof Error
          ? error.message === "Request timeout"
            ? "Processing is taking longer than expected, please try again."
            : error.message
          : "An unknown error occurred";

      if (isRealtime) {
        setRealtimeTestResult({ error: errorMessage, allProbabilities: {} });
      } else {
        setFileTestResult({ error: errorMessage, allProbabilities: {} });
      }
    } finally {
      setIsProcessing(false);
      processingQueueRef.current = false;
    }
  };

  const processAudioData = () => {
    if (!isRecording || !analyserRef.current || !audioContextRef.current) {
      return;
    }

    try {
      // Get buffer length
      const bufferLength = analyserRef.current.frequencyBinCount;
      const dataArray = new Float32Array(bufferLength);
      const frequencyData = new Uint8Array(bufferLength);

      // Get audio data
      analyserRef.current.getFloatTimeDomainData(dataArray);
      analyserRef.current.getByteFrequencyData(frequencyData);

      // Calculate intensity (volume)
      let sum = 0;
      for (let i = 0; i < dataArray.length; i++) {
        sum += Math.abs(dataArray[i]);
      }
      const averageIntensity = sum / dataArray.length;
      const scaledIntensity = Math.max(
        2,
        Math.min(50, Math.round(averageIntensity * 150))
      );
      setIntensity(scaledIntensity);

      // Calculate pitch
      let maxValue = 0;
      let peakIndex = 0; // Changed variable name to avoid conflict

      // Calculate frequency range bounds
      const minFreqIndex = Math.floor(
        (150 * analyserRef.current.fftSize) / audioContextRef.current.sampleRate
      );
      const maxFreqIndex = Math.floor(
        (500 * analyserRef.current.fftSize) / audioContextRef.current.sampleRate
      );

      // Find the peak frequency in our range of interest
      for (let i = minFreqIndex; i <= maxFreqIndex; i++) {
        if (frequencyData[i] > maxValue) {
          maxValue = frequencyData[i];
          peakIndex = i; // Using the renamed variable
        }
      }

      // Only update pitch if there's significant audio input
      if (maxValue > 50) {
        // Lowered threshold for better sensitivity
        const fundamentalFrequency =
          (peakIndex * audioContextRef.current.sampleRate) /
          analyserRef.current.fftSize;
        setPitch(Math.round(fundamentalFrequency));
      }

      // Continue the analysis loop
      if (isRecording) {
        requestAnimationFrame(processAudioData);
      }
    } catch (error) {
      console.error("Error processing audio data:", error);
    }
  };

  // Update VoiceMetrics component with more sensitive display
  const VoiceMetrics = () => (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h3 className="text-xl font-semibold mb-4">Voice Metrics:</h3>

      <div className="space-y-6">
        <div>
          <h4 className="text-lg mb-2">PITCH</h4>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div
              className="bg-orange-500 h-4 rounded-full transition-all duration-200"
              style={{ width: `${Math.min((pitch / 1000) * 100, 100)}%` }}
            ></div>
          </div>
          <span className="text-lg">{pitch} Hz</span>
        </div>

        <div>
          <h4 className="text-lg mb-2">INTENSITY</h4>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div
              className="bg-orange-500 h-4 rounded-full transition-all duration-200"
              style={{ width: `${Math.min(intensity, 100)}%` }}
            ></div>
          </div>
          <span className="text-lg">{intensity}</span>
        </div>
      </div>
    </div>
  );

  // Create a TestResults component
  const TestResults: React.FC<{ result: TestResult | null }> = ({ result }) => {
    if (!result) return null;

    return (
      <div className="space-y-4">
        {result.error ? (
          <p className="text-red-600">Error: {result.error}</p>
        ) : (
          <div>
            <div className="space-y-2">
              <p>
                <strong>Prediction:</strong> Class {result.prediction} (Vowel:{" "}
                {result.predictedVowel})
              </p>
              <p>
                <strong>Actual Vowel:</strong> {result.actualVowel}
              </p>
              <p
                className={result.isCorrect ? "text-green-600" : "text-red-600"}
              >
                <strong>Status:</strong> Prediction is{" "}
                {result.isCorrect ? "correct" : "incorrect"}
              </p>
              <p>
                <strong>Confidence:</strong>{" "}
                {result.confidence !== undefined
                  ? (result.confidence * 100).toFixed(2)
                  : 0}
                %
              </p>
            </div>

            <h4 className="font-semibold mt-6 mb-4">
              Prediction Probabilities:
            </h4>
            {Object.entries(result.allProbabilities)
              .sort(([, a], [, b]) => (b as number) - (a as number))
              .map(([vowel, prob]) => {
                const percentage = ((prob as number) * 100).toFixed(2);
                return (
                  <div key={vowel} className="mb-2">
                    <div className="w-full bg-gray-200 rounded-full h-4">
                      <div
                        className="bg-blue-600 h-4 rounded-full text-xs text-white px-2 flex items-center"
                        style={{ width: `${percentage}%` }}
                      >
                        {vowel}: {percentage}%
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">
        Vowel Recognition Test Interface
      </h1>

      {/* Recording Section */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-2xl font-semibold mb-4">Voice Recording</h2>

        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <select
              value={selectedVowel}
              onChange={(e) => setSelectedVowel(e.target.value)}
              className="w-32 p-2 border rounded-md"
            >
              <option value="a">a</option>
              <option value="e">e</option>
              <option value="i">i</option>
              <option value="o">o</option>
              <option value="u">u</option>
            </select>

            <button
              onClick={startRecording}
              disabled={isRecording}
              className="bg-blue-500 text-white px-6 py-2 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-600"
            >
              Start Recording
            </button>
            <button
              onClick={stopRecording}
              disabled={!isRecording}
              className="bg-red-500 text-white px-6 py-2 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-red-600"
            >
              Stop Recording
            </button>
          </div>

          {isRecording && <VoiceMetrics />}

          {audioUrl && !isRecording && (
            <div className="space-y-4">
              <audio controls src={audioUrl} className="w-full" />
              <button
                onClick={() => runTest(true)}
                disabled={isProcessing}
                className="bg-green-500 text-white px-6 py-2 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-green-600"
              >
                Run Test
              </button>
              {isProcessing && (
                <p className="text-gray-600">Processing... Please wait...</p>
              )}
              <TestResults result={realtimeTestResult} />
            </div>
          )}
        </div>
      </div>

      {/* File Upload Section */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-2xl font-semibold mb-4">File Upload Test</h2>

        <div className="space-y-4">
          <select
            value={selectedVowel}
            onChange={(e) => setSelectedVowel(e.target.value)}
            className="block w-full p-2 border rounded-md mb-4"
          >
            <option value="a">a</option>
            <option value="e">e</option>
            <option value="i">i</option>
            <option value="o">o</option>
            <option value="u">u</option>
          </select>

          <input
            type="file"
            accept="audio/*"
            onChange={handleFileUpload}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />

          {audioUrl && !isRecording && (
            <div className="space-y-4">
              <audio controls src={audioUrl} className="w-full" />
              <button
                onClick={() => runTest(false)}
                disabled={isProcessing}
                className="bg-green-500 text-white px-6 py-2 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-green-600"
              >
                Run Test
              </button>
              {isProcessing && (
                <p className="text-gray-600">Processing... Please wait...</p>
              )}
              <TestResults result={fileTestResult} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
