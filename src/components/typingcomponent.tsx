"use client";

import { useCallback, useEffect, useState } from "react";
import { Card } from "./ui/card";
import { motion } from "motion/react"

const sampleText =
  "The quick brown fox jumps over the lazy dog. Pack my box with five dozen liquor jugs. How vexingly quick daft zebras jump! The five boxing wizards jump quickly.";

export default function TypingComponent() {
  const [input, setInput] = useState("");
  const [startTime, setStartTime] = useState<number | null>(null);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [isFinished, setIsFinished] = useState<boolean>(false);

  const words = sampleText.split("");

  const calculateStatsOfPlayer = useCallback(() => {
    if (!startTime) return;

    const timeInMinute = (Date.now() - startTime) / 60000;
    const wordTyped = input.trim().split(" ").length;
    // Should be total char in correctly typed word / 5 normalized to 60sec
    const wpm = Math.round(wordTyped / timeInMinute);

    const correctChar = input
      .split("")
      .filter((char, index) => char === sampleText[index]).length;
    const currentAccuracy = Math.round((correctChar / input.length) * 100);

    setWpm(wpm);
    setAccuracy(currentAccuracy);
  }, [input, startTime]);

  const reset = useCallback(() => {
    setInput('');
    setWpm(0);
    setStartTime(null)
    setAccuracy(100);
  }, [])

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
                  : "text-gray-400 dark:text-gray-600"
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

      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.12)] lg:mb-10 mb-4 dark:text-gray-800 dark:shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
        {render()}
      </div>

      <div className="relative w-full mb-4">
        <textarea
          className={`w-full h-32 p-4 rounded-sm backdrop-blur-sm inset-2 shadow-sm lg:shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)] border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none font-mono dark:bg-white/80 dark:text-background dark:placeholder:text-gray-600/90 dark:shadow-2xl shadow-blue-500/20`}
          value={input}
          disabled = {isFinished}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Start Writing.."
        />
      </div>

      {isFinished && <div className="flex justify-center items-center mb-4 p-4 text-foreground">
          Congratulation you have finished the test
      </div>}

      <motion.div
      initial={{
        opacity : 0,
      }}
      animate={{
        opacity : 1
      }}
      transition={{
        duration : 0.3,
        ease : "easeInOut"
      }}
      className="flex justify-center">
            <button className="px-6 py-2 font-medium bg-blue-600 text-white w-fit cursor-pointer transition-all hover:shadow-[-3px_3px_0px_black] shadow-none hover:translate-x-[3px] hover:translate-y-[3px]" onClick={reset}>
              Reset
            </button>
      </motion.div>
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
        <Card className="w-16 h-16 p-4 flex justify-center items-center backdrop-blur-lg font-bold rounded-md mb-2 shadow-[0_8px_30px_rgb(0,0,0,0.12)] dark:shadow-[rgba(0,_0,_0,_0.4)_0px_30px_90px]">
          {" "}
          {type === "WPM" ? wpm : accuracy}
        </Card>
        <span className="text-blue-600/80 font-semibold font-mono text-xl z-10 dark:text-gray-200">
            {type === "WPM" ? "WPM" : "Accuracy"}
        </span>
      </div>
    )
}