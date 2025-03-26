"use client";

import { useCallback, useEffect, useState } from "react";
import { Card } from "./ui/card";

const sampleText =
  "The quick brown fox jumps over the lazy dog. Pack my box with five dozen liquor jugs. How vexingly quick daft zebras jump! The five boxing wizards jump quickly.";

export default function TypingComponent() {
  const [input, setInput] = useState("");
  const [startTime, setStartTime] = useState<number | null>(null);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [isFinished, setIsFinished] = useState<boolean>(false);

  const words = sampleText.split("");

  console.log(input.length);

  const calculateStatsOfPlayer = useCallback(() => {
    if (!startTime) return;

    const timeInMinute = (Date.now() - startTime) / 60000;
    const wordTyped = input.trim().split(" ").length;
    const wpm = Math.round(wordTyped / timeInMinute);

    const correctChar = input
      .split("")
      .filter((char, index) => char === sampleText[index]).length;
    const currentAccuracy = Math.round((correctChar / input.length) * 100);

    setWpm(wpm);
    setAccuracy(currentAccuracy);
  }, [input, startTime]);

  useEffect(() => {
    if (input.length === 1 && !startTime) {
      setStartTime(Date.now());
    }

    if (input.length > 0) {
      calculateStatsOfPlayer();
    }

    if (input.length > sampleText.length) {
      setIsFinished(true);
    }
  }, [input, startTime, calculateStatsOfPlayer]);


  const render = () => {
    return (
      <div className="text-lg leading-relaxed font-mono transition-colors duration-150">
        {words.map((char, index) => {
          const absoluteIndex = words.slice(0, index).join("").length;
          const isTyped = input.length > absoluteIndex;
          const isCorrectIndex = input[index] === char;

          return (
            <span
              key={index}
              className={`${
                isTyped
                  ? isCorrectIndex
                    ? "text-gray-600 dark:text-black"
                    : "text-red-600"
                  : "text-gray-300 dark:text-gray-500"
              } ${char === " " && "mr-2"}`}
            >
              {char}
            </span>
          );
        })}
      </div>
    );
  };

  return (
    <div className="flex flex-col justify-center items-center max-w-4xl mx-auto px-4 w-full">
      <div className="flex items-center justify-between mb-8 w-40 dark:text-white">
        <WpmOrAccuracy type={"WPM"} wpm={wpm} />
        <WpmOrAccuracy type={"Accuracy"} accuracy={accuracy}/>
      </div>

      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-sm mb-6 dark:text-gray-800">
        {render()}
      </div>

      <div className="relative w-full">
        <textarea
          className="w-full h-32 p-4 rounded-xl backdrop-blur-sm shadow-sm border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none font-mono dark:bg-white/80 dark:text-background dark:placeholder:text-gray-600/90"
          value={input}
          disabled = {isFinished}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Start Writing.."
        />
      </div>
    </div>
  );
}

type WpmAccuracy = "WPM" | "Accuracy"


function WpmOrAccuracy({
    type,
    wpm,
    accuracy
} : {
    type : WpmAccuracy, wpm? : number | null , accuracy? : number | null
}){
    return (
        <div className="flex flex-col items-center">
        <Card className="p-4 backdrop-blur-lg shadow-sm font-bold rounded-md mb-2">
          {" "}
          {type === "WPM" ? wpm : accuracy}
        </Card>
        <span className="text-blue-600/80 backdrop-blur-md font-semibold font-mono dark:text-gray-300">
            {type === "WPM" ? "WPM" : "Accuracy"}
        </span>
      </div>
    )
}