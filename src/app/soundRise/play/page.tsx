"use client";

import * as dimsFunctions from "../audio/setDimsValue";
import * as vowelFunctions from "../audio/audioManager";
import React, { useState, useEffect } from "react";
import SunAwake from "../../../components/icons/SunAwake";
import SunSleep from "../../../components/icons/SunSleep";
import { ProgressBar } from "../../../components/component/progressBar";
import ElementIndicator from "../../../components/component/elementIndicator";
import {
  CloseFullscreenOutlined,
  Fullscreen,
  FullscreenExit,
  FullscreenOutlined,
  PlayCircle,
  StopCircle,
} from "@mui/icons-material";
import { Divider } from "@mui/material";
import ToggleButton from "../../../components/component/toggleButton";
import { PlayBox } from "@/components/layout/skyContainer";
import { FullScreen, useFullScreenHandle } from "react-full-screen";

export default function Play() {
  const [isCardOpen, setIsCardOpen] = useState(false);
  const handle = useFullScreenHandle();

  const toggleCard = () => {
    setIsCardOpen(!isCardOpen);
  };
  const [isToggleOpen, setIsToggleOpen] = useState(true);
  const toggleButton = () => {
    setIsToggleOpen(!isToggleOpen);
  };
  const [svgColor, setSvgColor] = useState<string>("yellow");
  const [rad, setRad] = useState<number>(dimsFunctions.minRad);
  const [yCoord, setYCoord] = useState<number>(
    (dimsFunctions.height - Math.round((dimsFunctions.height * 30) / 100)) / 2
  );
  const [sunListen, setSunListen] = useState<boolean>(false);
  const [isListening, setIsListening] = useState<boolean>(false);
  const [pitch, setPitch] = useState("--");
  const [pitchValue, setPitchValue] = useState(0);
  const [volumeValue, setVolumeValue] = useState<number>(0);
  const [volume, setVolume] = useState("--");
  const [note, setNote] = useState("--");
  const [vowel, setVowel] = useState("--");
  const [noteStrings, setNoteStrings] = useState<string[]>([
    "C",
    "C#",
    "D",
    "D#",
    "E",
    "F",
    "F#",
    "G",
    "G#",
    "A",
    "A#",
    "B",
  ]);
  const [vowels, setVowels] = useState<string[]>(["A", "E", "I", "O", "U"]);

  useEffect(() => {
    let audioContext: AudioContext | null;
    let analyser: AnalyserNode | null = null;
    let mediaStreamSource: MediaStreamAudioSourceNode | null;
    let rafID: number | null = null;
    const buflen = 2048;
    const buf = new Float32Array(buflen);
    let count_sil = 0;
    let buffer_pitch: number[] = [];
    let buffer_vol: number[] = [];
    let buffer_vocal: string[] = [];

    function noteFromPitch(frequency: number) {
      var noteNum = 12 * (Math.log(frequency / 440) / Math.log(2));
      return Math.round(noteNum) + 69;
    }

    function frequencyFromNoteNumber(note: number) {
      return 440 * Math.pow(2, (note - 69) / 12);
    }

    function centsOffFromPitch(frequency: number, note: number) {
      return Math.floor(
        (1200 * Math.log(frequency / frequencyFromNoteNumber(note))) /
          Math.log(2)
      );
    }
    function setFrequency(buf: Float32Array, sampleRate: number) {
      // Implements the ACF2+ algorithm
      var SIZE = buf.length;
      var rms = 0;

      for (var i = 0; i < SIZE; i++) {
        var val = buf[i];
        rms += val * val;
      }
      rms = Math.sqrt(rms / SIZE);

      if (rms < 0.01) {
        // not enough signal
        //console.log("rms: "+rms);
        return -1;
      }

      var r1 = 0,
        r2 = SIZE - 1,
        thres = 0.2;
      for (var i = 0; i < SIZE / 2; i++)
        if (Math.abs(buf[i]) < thres) {
          r1 = i;
          break;
        }
      for (var i = 1; i < SIZE / 2; i++)
        if (Math.abs(buf[SIZE - i]) < thres) {
          r2 = SIZE - i;
          break;
        }

      buf = buf.slice(r1, r2);
      SIZE = buf.length;

      var c = new Array(SIZE).fill(0);
      for (var i = 0; i < SIZE; i++)
        for (var j = 0; j < SIZE - i; j++) c[i] = c[i] + buf[j] * buf[j + i];

      var d = 0;
      while (c[d] > c[d + 1]) d++;
      var maxval = -1,
        maxpos = -1;
      for (var i = d; i < SIZE; i++) {
        if (c[i] > maxval) {
          maxval = c[i];
          maxpos = i;
        }
      }
      var T0 = maxpos;

      var x1 = c[T0 - 1],
        x2 = c[T0],
        x3 = c[T0 + 1];
      var a = (x1 + x3 - 2 * x2) / 2;
      var b = (x3 - x1) / 2;
      if (a) T0 = T0 - b / (2 * a);

      return sampleRate / T0;
    }
    // Define a buffer to store previous audio buffer data
    const previousBuffers: number[] = [];

    function getStableVolume(buf: Float32Array) {
      const sumSquares = buf.reduce(
        (sum, amplitude) => sum + amplitude * amplitude,
        0
      );
      const rootMeanSquare = Math.sqrt(sumSquares / buf.length);

      // Add the root mean square value to the previousBuffers array
      previousBuffers.push(rootMeanSquare);

      // Keep a limited history of previous volume values
      // (adjust the history size as needed)
      const historySize = 10;
      if (previousBuffers.length > historySize) {
        previousBuffers.shift();
      }

      // Calculate the average of the previous volume values
      const averageVolume =
        previousBuffers.reduce((sum, value) => sum + value, 0) /
        previousBuffers.length;

      return Math.round(averageVolume * 100);
    }

    function getVowel(buf: Float32Array, sampleRate: number) {
      // donna
      var form1 = [320, 400, 620, 920, 640, 400, 360];
      var form2 = [2750, 2500, 2400, 1400, 1200, 920, 760];
      var result = vowelFunctions.getVowel(buf, sampleRate);
      return result;
    }
    const initializeAudio = () => {
      audioContext = new window.AudioContext() || null;
      if (audioContext) {
        navigator.mediaDevices
          .getUserMedia({
            audio: {
              echoCancellation: true,
              noiseSuppression: true,
              autoGainControl: true,
              // highpassFilter: true,
            },
          })
          .then((stream) => {
            mediaStreamSource = audioContext!.createMediaStreamSource(stream);

            // Create DynamicsCompressor and get the reduction value
            const compressor = audioContext!.createDynamicsCompressor();
            compressor.threshold.value = -50;
            compressor.knee.value = 40;
            compressor.ratio.value = 12;
            compressor.attack.value = 0;
            compressor.release.value = 0.25;

            compressor.reduction; // Just to avoid a warning, value is not used

            analyser = audioContext!.createAnalyser();
            analyser.fftSize = 2048;
            mediaStreamSource.connect(analyser);
            startListening();
          })
          .catch((err) => {
            console.error(`${err.name}: ${err.message}`);
          });
      } else {
        console.error("Failed to create AudioContext.");
      }
    };

    function ArrayAvg(myArray: string | any[]) {
      var i = 0,
        summ = 0,
        ArrayLen = myArray.length;
      while (i < ArrayLen) {
        summ = summ + myArray[i++];
      }
      return summ / ArrayLen;
    }
    function findMostRepeatedItem(arr: string[]): string {
      let count: Record<string, number> = {};
      let mostRepeatedItem;
      let maxCount = 0;

      for (const item of arr) {
        if (count[item] === undefined) {
          count[item] = 1;
        } else {
          count[item]++;
        }

        if (count[item] > maxCount) {
          maxCount = count[item];
          mostRepeatedItem = item;
        }
      }
      if (mostRepeatedItem === undefined) {
        // You can either throw an error or return a default value
        // In this case, I'll return an empty string as a default value
        return "";
      }
      return mostRepeatedItem;
    }
    const selectColor = (vocale: string | undefined) => {
      if (vocale == "I") {
        setSvgColor("blue");
      } else if (vocale == "E") {
        setSvgColor("#4CC94C");
      } else if (vocale == "A") {
        setSvgColor("red");
      } else if (vocale == "O") {
        setSvgColor("orange");
      } else if (vocale == "U") {
        setSvgColor("#C0C0C0");
      }
    };

    const startListening = () => {
      if (!analyser || !audioContext) {
        return;
      }
      analyser.getFloatTimeDomainData(buf);
      const ac = setFrequency(buf, audioContext.sampleRate);
      const vol = getStableVolume(buf);

      const v = getVowel(buf, audioContext.sampleRate);

      var MAX_BUF = 600;
      if (
        (ac == -1 ||
          ac < dimsFunctions.minPitch ||
          ac > dimsFunctions.maxPitch) &&
        (vol < dimsFunctions.minVol || vol > dimsFunctions.maxVol)
      ) {
        setPitch("...");
        setVolume("...");
        setNote("...");
        setVowel("...");
        setSunListen(false);
        setRad(dimsFunctions.minRad);
        setSvgColor("yellow");
        setYCoord(
          (dimsFunctions.height -
            Math.round((dimsFunctions.height * 30) / 100)) /
            2
        );
        count_sil++;
        if (count_sil >= 50) {
          console.log("silence");
          buffer_pitch = [];
          buffer_vol = [];
          buffer_vocal = [];
          count_sil = 0;
        }
      } else {
        if (ac != -1 && ac >= 100 && ac <= 600 && vol > 0 && vol <= 50) {
          if (buffer_pitch.length > MAX_BUF) {
            buffer_pitch.shift();
            buffer_pitch.push(ac);
          } else {
            buffer_pitch.push(ac);
          }

          if (buffer_vol.length > MAX_BUF) {
            buffer_vol.shift();
            buffer_vol.push(vol);
          } else {
            buffer_vol.push(vol);
          }
          if (v != 0) {
            if (buffer_vocal.length > MAX_BUF) {
              buffer_vocal.shift();
              buffer_vocal.push(v);
            } else {
              buffer_vocal.push(v);
            }
          } else {
            // v == 0
            if (buffer_vocal.length > MAX_BUF) {
              buffer_vocal.shift();
              buffer_vocal.push(findMostRepeatedItem(buffer_vocal));
            } else {
              buffer_vocal.push(findMostRepeatedItem(buffer_vocal));
            }
          }

          setSunListen(true);

          const pitchValue = Math.round(ArrayAvg(buffer_pitch));
          const yCoordValue = dimsFunctions.setPosPitch(pitchValue);
          setPitchValue(pitchValue);
          var hz = pitchValue + "Hz";
          setPitch(hz);
          setYCoord(yCoordValue);

          const volValue = `${Math.round(ArrayAvg(buffer_vol))}`;
          setVolumeValue(Math.round(ArrayAvg(buffer_vol)));
          setVolume(volValue);

          const radValue = dimsFunctions.setRad(volValue);
          setRad(radValue);

          const n = noteFromPitch(pitchValue);
          setNote(noteStrings[n % 12]);

          const vocalValue = findMostRepeatedItem(buffer_vocal);
          selectColor(vocalValue);
          setVowel(vocalValue);
        }
      }

      if (!window.requestAnimationFrame)
        window.requestAnimationFrame = window.requestAnimationFrame;
      rafID = window.requestAnimationFrame(startListening);
    };

    const stopListening = () => {
      buffer_pitch = [];
      buffer_vol = [];
      buffer_vocal = [];
      count_sil = 0;
      setSunListen(false);
      setRad(dimsFunctions.minRad);
      setSvgColor("yellow");
      setYCoord(
        (dimsFunctions.height - Math.round((dimsFunctions.height * 30) / 100)) /
          2
      );
      if (audioContext) {
        if (rafID) {
          window.cancelAnimationFrame(rafID);
        }
        if (mediaStreamSource) {
          mediaStreamSource.disconnect();
        }
        audioContext
          .close()
          .then(() => {
            audioContext = null;
            analyser = null;
            mediaStreamSource = null;
            /* console.log(
                "Microphone stopped.\nlen: " +
                  buffer_pitch.filter((x, i) => buffer_pitch.indexOf(x) === i)
                    .length
              );*/
            setPitch("--");
            setVolume("--");
            setNote("--");
            setVowel("--");
          })
          .catch((err) => {
            console.error("Error stopping microphone:", err);
          });
      }
    };

    if (isListening) {
      initializeAudio();
    }

    return () => {
      stopListening();
    };
  }, [isListening, noteStrings]);

  const [startButtonDisabled, setStartButtonDisabled] = useState(false);
  const [stopButtonDisabled, setStopButtonDisabled] = useState(true);

  const handleStartListening = () => {
    setIsListening(true);
    setStartButtonDisabled(true);
    setStopButtonDisabled(false);
  };

  const handleStopListening = () => {
    setIsListening(false);
    setStartButtonDisabled(false);
    setStopButtonDisabled(true);
  };
  return (
    <>
      <FullScreen handle={handle}>
        <main className="absolute bottom-0 h-screen w-screen">
          <section className="text-center h-full">
            <PlayBox brightnessValue={volumeValue * 8}>
              {sunListen ? (
                <SunAwake
                  svgColor={svgColor}
                  rad={rad}
                  yCoordinate={yCoord}
                  heightSpaceSun={"100vh"}
                />
              ) : (
                <SunSleep
                  svgColor={svgColor}
                  rad={rad}
                  yCoordinate={yCoord}
                  heightSpaceSun={"100vh"}
                />
              )}
            </PlayBox>
          </section>
          <section className="absolute sm:right-2 right-1 bottom-2 z-50 rounded-md bg-opacity-50 bg-orange-100 dark:bg-slate-800">
            <ToggleButton
              isOpen={isCardOpen}
              toggleCard={toggleCard}
              title={"Data of the sound"}
            />{" "}
            {isCardOpen && (
              <div className="w-fit sm:p-3 p-0 rounded-lg sm:px-6 px-2 fixed-square sm:w-fit ">
                <ProgressBar
                  title={"pitch"}
                  value={pitchValue}
                  minValue={0}
                  maxValue={500}
                />{" "}
                <Divider className="mt-2" />
                <ProgressBar
                  title={"intensity"}
                  value={volumeValue}
                  minValue={0}
                  maxValue={15}
                />{" "}
                <Divider className="my-2" />
                <ElementIndicator
                  elementStrings={noteStrings}
                  indicatedElement={note}
                  title={"note"}
                />
                <Divider className="my-2" />
                <ElementIndicator
                  elementStrings={vowels}
                  indicatedElement={vowel}
                  title={"vowel"}
                />
              </div>
            )}
          </section>
          <section className="absolute sm:left-2 left-1 bottom-2 z-50 bg-opacity-50 bg-orange-100 dark:bg-slate-800 rounded-lg px-2 pb-3">
            <div className="relative">
              <ToggleButton
                isOpen={isToggleOpen}
                toggleCard={toggleButton}
                title={""}
              />
            </div>
            {isToggleOpen ? (
              <section className="relative">
                <div className="justify-between place-content-center flex flex-col gap-2">
                  <button
                    onClick={handleStartListening}
                    className="bg-orange-100 dark:bg-slate-700  font-bold rounded border-b-2 border-green-500 hover:border-green-600 hover:bg-green-500 hover:text-white shadow-md py-2 px-6 inline-flex items-center"
                  >
                    <PlayCircle />
                    <span className="mr-2"> Start</span>
                  </button>
                  <button
                    onClick={handleStopListening}
                    className="bg-orange-100 dark:bg-slate-700 font-bold rounded border-b-2 border-red-500 hover:border-red-600 hover:bg-red-500 hover:text-white shadow-md py-2 px-6 inline-flex items-center"
                  >
                    <StopCircle />
                    <span className="mr-2">Stop</span>
                  </button>
                </div>
              </section>
            ) : (
              <section className="relative">
                <div className="justify-between place-content-left flex px-2">
                  <button onClick={handleStartListening}>
                    <PlayCircle className="hover:text-green-400" />
                  </button>
                  <button onClick={handleStopListening}>
                    <StopCircle className="hover:text-red-700" />
                  </button>
                </div>
              </section>
            )}
          </section>
        </main>
      </FullScreen>
      <section>
        <FullScreen handle={handle}>
          <button
            className="z-50 absolute sm:top-24 top-18 sm:left-2 left-1 text-white"
            onClick={handle.enter}
            style={{ display: handle.active ? "none" : "block" }}
          >
            <FullscreenOutlined/>
          </button>
          <button
            className="z-50 absolute sm:top-1 top-1 sm:right-2 right-1 text-white"
            onClick={handle.exit}
            style={{ display: handle.active ? "block" : "none" }}
          >
             <FullscreenExit/>
          </button>
        </FullScreen>
      </section>
    </>
  );
}
