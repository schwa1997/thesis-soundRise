"use client";

import React, { useState, useRef } from "react";

export default function VowelRecognitionPage() {
  const [isRecording, setIsRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [testResult, setTestResult] = useState(null);
  const [selectedVowel, setSelectedVowel] = useState("a");

  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);

      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: "audio/wav",
        });
        const url = URL.createObjectURL(audioBlob);
        setAudioUrl(url);
      };

      audioChunksRef.current = [];
      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (error) {
      console.error("Error accessing microphone:", error);
      alert(
        "Error accessing microphone. Please ensure you have granted microphone permissions."
      );
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream
        .getTracks()
        .forEach((track) => track.stop());
      setIsRecording(false);
    }
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setAudioUrl(URL.createObjectURL(file));
    }
  };

  const runTest = async () => {
    if (isProcessing || !audioUrl) return;

    try {
      setIsProcessing(true);
      const response = await fetch(audioUrl);
      const audioBlob = await response.blob();

      // Use selected vowel for filename
      const fileName = `${selectedVowel}.wav`;

      // Convert blob to base64
      const base64Audio = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(audioBlob);
      });

      // Call API
      const apiResponse = await fetch("http://localhost:5000/api/test-model", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          input: base64Audio,
          fileName: fileName,
        }),
      });

      if (!apiResponse.ok) {
        throw new Error(`HTTP error! status: ${apiResponse.status}`);
      }

      const result = await apiResponse.json();
      if (result.success) {
        setTestResult(result);
      } else {
        throw new Error(result.error || "Unknown error occurred");
      }
    } catch (error) {
      console.error("Error:", error);
      setTestResult({ error: error.message });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">
        Vowel Recognition Test Interface
      </h1>

      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h3 className="text-xl font-semibold mb-4">
          Record or Upload Vowel Audio for Testing:
        </h3>

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

          <button
            onClick={startRecording}
            disabled={isRecording}
            className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-600"
          >
            Start Recording
          </button>
          <button
            onClick={stopRecording}
            disabled={!isRecording}
            className="bg-red-500 text-white px-4 py-2 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-red-600"
          >
            Stop Recording
          </button>
          {audioUrl && (
            <audio controls src={audioUrl} className="w-full mt-4" />
          )}
        </div>

        <p className="text-center my-4">- OR -</p>

        <input
          type="file"
          accept="audio/*"
          onChange={handleFileUpload}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />

        <button
          onClick={runTest}
          disabled={!audioUrl || isProcessing}
          className="mt-4 bg-green-500 text-white px-4 py-2 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-green-600"
        >
          Run Test
        </button>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">Test Results:</h3>
        <div className="space-y-4">
          {isProcessing && (
            <p className="text-gray-600">Processing... Please wait...</p>
          )}
          {testResult && !testResult.error && (
            <div>
              <div className="space-y-2">
                <p>
                  <strong>Prediction:</strong> Class {testResult.prediction}{" "}
                  (Vowel: {testResult.predictedVowel})
                </p>
                <p>
                  <strong>Actual Vowel:</strong> {testResult.actualVowel}
                </p>
                <p
                  className={
                    testResult.isCorrect ? "text-green-600" : "text-red-600"
                  }
                >
                  <strong>Status:</strong> Prediction is{" "}
                  {testResult.isCorrect ? "correct" : "incorrect"}
                </p>
                <p>
                  <strong>Confidence:</strong>{" "}
                  {(testResult.confidence * 100).toFixed(2)}%
                </p>
              </div>

              <h4 className="font-semibold mt-6 mb-4">
                Prediction Probabilities for All Classes:
              </h4>
              {Object.entries(testResult.allProbabilities)
                .sort(([, a], [, b]) => b - a)
                .map(([vowel, prob]) => {
                  const percentage = (prob * 100).toFixed(2);
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
          {testResult?.error && (
            <p className="text-red-600">Error: {testResult.error}</p>
          )}
        </div>
      </div>
    </div>
  );
}
