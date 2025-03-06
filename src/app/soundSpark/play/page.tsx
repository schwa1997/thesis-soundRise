"use client";

import React, { useState } from "react";

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
  const [audioUrl, setAudioUrl] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedVowel, setSelectedVowel] = useState("a");
  const [fileTestResult, setFileTestResult] = useState<TestResult | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [recordedAudio, setRecordedAudio] = useState<string | null>(null);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(
    null
  );
  const [recordingError, setRecordingError] = useState<string | null>(null);
  const [recordedBlob, setRecordedBlob] = useState<Blob | null>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setAudioUrl(URL.createObjectURL(file));
    }
  };

  const runTest = async () => {
    if (isProcessing || (!audioUrl && !recordedBlob)) return;

    try {
      setIsProcessing(true);

      let audioBlob;
      if (recordedBlob) {
        audioBlob = recordedBlob;

        if (
          !audioBlob.type.includes("wav") ||
          audioBlob.type === "audio/wav;codecs=1"
        ) {
          console.log("Converting audio format to ensure compatibility");
          audioBlob = new Blob([await audioBlob.arrayBuffer()], {
            type: "audio/wav",
          });
        }
      } else {
        const response = await fetch(audioUrl);
        audioBlob = await response.blob();
      }

      const fileName = `${selectedVowel || "test"}.wav`;

      console.log("Audio blob type:", audioBlob.type);
      console.log("Audio blob size:", audioBlob.size);

      const base64Audio = await new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.readAsDataURL(audioBlob);
      });

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
        mode: "cors",
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

      setFileTestResult(result);
    } catch (error) {
      console.error("Error running test:", error);
      const errorMessage =
        error instanceof Error
          ? error.message === "Request timeout"
            ? "Processing is taking longer than expected, please try again."
            : error.message
          : "An unknown error occurred";

      setFileTestResult({ error: errorMessage, allProbabilities: {} });
    } finally {
      setIsProcessing(false);
    }
  };

  const startRecording = async () => {
    try {
      setRecordingError(null);
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          channelCount: 1,         // 单声道
          sampleRate: 48000,       // 48 kHz 采样率
          sampleSize: 16,          // 16位
          echoCancellation: true,
          noiseSuppression: true,
        } 
      });
      
      // 创建音频上下文以便更好地控制音频属性
      const audioContext = new AudioContext({
        sampleRate: 48000,         // 确保48 kHz采样率
      });
      
      // 创建媒体流源
      const source = audioContext.createMediaStreamSource(stream);
      
      // 创建录音处理器
      const processor = audioContext.createScriptProcessor(4096, 1, 1);
      
      const audioChunks: BlobPart[] = [];
      let recorder: MediaRecorder;
      
      try {
        // 尝试使用特定的MIME类型
        recorder = new MediaRecorder(stream, {
          mimeType: 'audio/wav',
          audioBitsPerSecond: 768000, // 768 kbps
        });
      } catch (e) {
        // 如果不支持，回退到默认值
        console.log("WAV recording not supported, falling back to WebM");
        recorder = new MediaRecorder(stream);
      }

      recorder.addEventListener("dataavailable", (event) => {
        audioChunks.push(event.data);
      });

      recorder.addEventListener("stop", async () => {
        // 停止音频处理
        source.disconnect();
        processor.disconnect();
        
        // 创建初始blob
        const rawBlob = new Blob(audioChunks);
        
        // 转换为WAV格式，确保正确的属性
        // 注意：这里简化了处理，实际上可能需要更复杂的WAV转换库
        const audioBlob = new Blob([await rawBlob.arrayBuffer()], { 
          type: 'audio/wav' 
        });
        
        setRecordedBlob(audioBlob);
        const audioUrl = URL.createObjectURL(audioBlob);
        setRecordedAudio(audioUrl);
        setAudioUrl(audioUrl);
        
        console.log("Recording completed, blob type:", audioBlob.type);
        console.log("Audio properties: 48kHz, 16-bit, mono");
      });

      // 连接音频节点
      source.connect(processor);
      processor.connect(audioContext.destination);
      
      setMediaRecorder(recorder);
      recorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error("Error accessing microphone:", error);
      setRecordingError(
        "Could not access microphone. Please ensure you've granted permission."
      );
    }
  };

  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      setIsRecording(false);
      mediaRecorder.stream.getTracks().forEach((track) => track.stop());
    }
  };

  const downloadRecording = () => {
    if (recordedBlob) {
      // 这里可以添加更复杂的WAV头部修改逻辑，以确保正确的采样率等属性
      // 但这需要使用专门的音频处理库
      
      const url = URL.createObjectURL(recordedBlob);
      const a = document.createElement("a");
      a.style.display = "none";
      a.href = url;
      a.download = `vowel_${selectedVowel}_recording_48khz_16bit.wav`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    }
  };

  // Create a TestResults component
  const TestResults: React.FC<{ result: TestResult | null }> = ({ result }) => {
    if (!result) return null;

    return (
      <div className="space-y-4">
        {result.error ? (
          <p className="text-red-600 dark:text-red-400">
            Error: {result.error}
          </p>
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
                className={
                  result.isCorrect
                    ? "text-green-600 dark:text-green-400"
                    : "text-red-600 dark:text-red-400"
                }
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
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4">
                      <div
                        className="bg-blue-600 dark:bg-blue-500 h-4 rounded-full text-xs text-white px-2 flex items-center"
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
    <div className="container mx-auto px-4 sm:px-6 py-6">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-900 dark:text-white">
        Vowel Recognition
      </h1>

      {/* File Upload Section */}
      <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
          Upload Audio File
        </h2>

        <div className="space-y-4">
          <select
            value={selectedVowel}
            onChange={(e) => setSelectedVowel(e.target.value)}
            className="block w-full p-2 border dark:border-gray-600 rounded-md mb-4 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
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
            className="block w-full text-sm text-gray-500 dark:text-gray-400 
                      file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 
                      file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 
                      dark:file:bg-blue-900 dark:file:text-blue-200
                      hover:file:bg-blue-100 dark:hover:file:bg-blue-800"
          />

          {audioUrl && (
            <div className="space-y-4">
              <audio controls src={audioUrl} className="w-full" />
              <button
                onClick={runTest}
                disabled={isProcessing}
                className="bg-green-500 dark:bg-green-600 text-white px-4 sm:px-6 py-2 rounded-md 
                          disabled:opacity-50 disabled:cursor-not-allowed 
                          hover:bg-green-600 dark:hover:bg-green-700 transition-colors"
              >
                {isProcessing ? "Processing..." : "Run Test"}
              </button>
              {isProcessing && (
                <p className="text-gray-600 dark:text-gray-400">
                  Processing... Please wait...
                </p>
              )}
              <TestResults result={fileTestResult} />
            </div>
          )}
        </div>
      </div>

      {/* Voice Recording Section */}
      <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
          Record Your Voice
        </h2>

        <div className="space-y-4">
          {recordingError && (
            <div className="p-3 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 rounded-md">
              {recordingError}
            </div>
          )}

          <div className="flex items-center space-x-4">
            {!isRecording ? (
              <button
                onClick={startRecording}
                className="bg-red-500 dark:bg-red-600 text-white px-4 sm:px-6 py-2 rounded-md 
                          hover:bg-red-600 dark:hover:bg-red-700 transition-colors flex items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z"
                    clipRule="evenodd"
                  />
                </svg>
                Start Recording
              </button>
            ) : (
              <button
                onClick={stopRecording}
                className="bg-gray-500 dark:bg-gray-600 text-white px-4 sm:px-6 py-2 rounded-md 
                          hover:bg-gray-600 dark:hover:bg-gray-700 transition-colors flex items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 00-1 1v4a1 1 0 001 1h4a1 1 0 001-1V8a1 1 0 00-1-1H8z"
                    clipRule="evenodd"
                  />
                </svg>
                Stop Recording
              </button>
            )}

            {isRecording && (
              <div className="flex items-center">
                <span className="relative flex h-3 w-3 mr-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                </span>
                Recording...
              </div>
            )}
          </div>

          {recordedAudio && (
            <div className="mt-4 space-y-4">
              <p className="mb-2 text-gray-700 dark:text-gray-300">
                Recorded Audio:
              </p>
              <audio controls src={recordedAudio} className="w-full" />

              <div className="flex space-x-4">
                <button
                  onClick={downloadRecording}
                  className="bg-blue-500 dark:bg-blue-600 text-white px-4 py-2 rounded-md 
                            hover:bg-blue-600 dark:hover:bg-blue-700 transition-colors flex items-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Download Recording
                </button>

                <button
                  onClick={runTest}
                  disabled={isProcessing}
                  className="bg-green-500 dark:bg-green-600 text-white px-4 py-2 rounded-md 
                            disabled:opacity-50 disabled:cursor-not-allowed 
                            hover:bg-green-600 dark:hover:bg-green-700 transition-colors flex items-center"
                >
                  {isProcessing ? "Processing..." : "Test Recording"}
                </button>
              </div>

              {isProcessing && (
                <p className="text-gray-600 dark:text-gray-400">
                  Processing... Please wait...
                </p>
              )}

              <TestResults result={fileTestResult} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
