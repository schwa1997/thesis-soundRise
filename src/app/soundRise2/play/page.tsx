"use client";

import React, { useState, useRef } from "react";
import styles from "./VowelRecognition.module.css";

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
    <div className={styles.container}>
      <h1>Vowel Recognition Test Interface</h1>

      <div className={styles.inputContainer}>
        <h3>Record or Upload Vowel Audio for Testing:</h3>

        <div className={styles.recordingControls}>
          <select
            value={selectedVowel}
            onChange={(e) => setSelectedVowel(e.target.value)}
            className={styles.select}
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
            className={styles.button}
          >
            Start Recording
          </button>
          <button
            onClick={stopRecording}
            disabled={!isRecording}
            className={styles.button}
          >
            Stop Recording
          </button>
          {audioUrl && (
            <audio controls src={audioUrl} className={styles.audio} />
          )}
        </div>

        <p>- OR -</p>

        <input
          type="file"
          accept="audio/*"
          onChange={handleFileUpload}
          className={styles.fileInput}
        />

        <button
          onClick={runTest}
          disabled={!audioUrl || isProcessing}
          className={styles.button}
        >
          Run Test
        </button>
      </div>

      <div className={styles.resultContainer}>
        <h3>Test Results:</h3>
        <div className={styles.result}>
          {isProcessing && <p>Processing... Please wait...</p>}
          {testResult && !testResult.error && (
            <div>
              <div className="result-item">
                <p>
                  <strong>Prediction:</strong> Class {testResult.prediction}{" "}
                  (Vowel: {testResult.predictedVowel})
                </p>
                <p>
                  <strong>Actual Vowel:</strong> {testResult.actualVowel}
                </p>
                <p style={{ color: testResult.isCorrect ? "green" : "red" }}>
                  <strong>Status:</strong> Prediction is{" "}
                  {testResult.isCorrect ? "correct" : "incorrect"}
                </p>
                <p>
                  <strong>Confidence:</strong>{" "}
                  {(testResult.confidence * 100).toFixed(2)}%
                </p>
              </div>

              <h4>Prediction Probabilities for All Classes:</h4>
              {Object.entries(testResult.allProbabilities)
                .sort(([, a], [, b]) => b - a)
                .map(([vowel, prob]) => {
                  const percentage = (prob * 100).toFixed(2);
                  return (
                    <div key={vowel} className={styles.probabilityBar}>
                      <div
                        className={styles.probabilityValue}
                        style={{ width: `${percentage}%` }}
                      >
                        {vowel}: {percentage}%
                      </div>
                    </div>
                  );
                })}
            </div>
          )}
          {testResult?.error && (
            <p style={{ color: "red" }}>Error: {testResult.error}</p>
          )}
        </div>
      </div>
    </div>
  );
}
