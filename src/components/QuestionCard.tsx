import  { useEffect, useState } from "react";
import type { Question } from "../types";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  XCircle,
  Timer,
} from "lucide-react";

import correctSoundFile from "../assets/sounds/correct.mp3";
import wrongSoundFile from "../assets/sounds/wrong.mp3";

interface QuestionCardProps {
  question: Question;
  onAnswer: (isCorrect: boolean) => void;
}

export const QuestionCard = ({
  question,
  onAnswer,
}: QuestionCardProps) => {
  const [selectedOption, setSelectedOption] =
    useState<string | null>(null);

  const [isAnswered, setIsAnswered] =
    useState(false);

  const [shuffledOptions, setShuffledOptions] =
    useState<string[]>([]);

  const [timeLeft, setTimeLeft] = useState(15);

  // SONS
  const correctSound = new Audio(correctSoundFile);

  const wrongSound = new Audio(wrongSoundFile);

  // RANDOMIZA OPÇÕES
  useEffect(() => {
    const shuffled = [...question.options].sort(
      () => Math.random() - 0.5
    );

    setShuffledOptions(shuffled);

    setSelectedOption(null);

    setIsAnswered(false);

    setTimeLeft(15);
  }, [question]);

  // TIMER
  useEffect(() => {
    if (isAnswered) return;

    if (timeLeft <= 0) {
      setIsAnswered(true);

      wrongSound.play();

      setTimeout(() => {
        onAnswer(false);
      }, 1000);

      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft, isAnswered]);

  const handleOptionClick = (option: string) => {
    if (isAnswered) return;

    setSelectedOption(option);

    setIsAnswered(true);

    const isCorrect = option === question.answer;

    // TOCA SOM
    if (isCorrect) {
      correctSound.play();
    } else {
      wrongSound.play();
    }

    setTimeout(() => {
      onAnswer(isCorrect);
    }, 1000);
  };

  return (
    <motion.div
      key={question.id}
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 md:p-8 w-full max-w-2xl mx-auto"
    >
      <div className="flex items-center justify-between mb-4">
        <span className="px-3 py-1 rounded-full text-sm font-semibold bg-indigo-100 text-indigo-700">
          {question.difficulty}
        </span>

        <div className="flex items-center gap-2 bg-rose-100 text-rose-700 px-3 py-1 rounded-full font-semibold">
          <Timer className="w-4 h-4" />
          {timeLeft}s
        </div>
      </div>

      <h2 className="text-2xl font-semibold text-slate-800 mb-6 leading-relaxed">
        {question.question}
      </h2>

      <div className="space-y-3">
        {shuffledOptions.map((option, index) => {
          const isSelected =
            selectedOption === option;

          const isCorrect =
            option === question.answer;

          let buttonClass =
            "w-full text-left p-4 rounded-xl border-2 transition-all duration-200 flex items-center justify-between";

          if (!isAnswered) {
            buttonClass +=
              " border-slate-100 hover:border-indigo-200 hover:bg-indigo-50/50 text-slate-700";
          } else {
            if (isCorrect) {
              buttonClass +=
                " border-emerald-500 bg-emerald-50 text-emerald-800";
            } else if (
              isSelected &&
              !isCorrect
            ) {
              buttonClass +=
                " border-rose-500 bg-rose-50 text-rose-800";
            } else {
              buttonClass +=
                " border-slate-100 text-slate-400 opacity-50";
            }
          }

          return (
            <button
              key={index}
              className={buttonClass}
              onClick={() =>
                handleOptionClick(option)
              }
              disabled={isAnswered}
            >
              <span className="font-medium text-lg">
                {option}
              </span>

              {isAnswered && isCorrect && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                >
                  <CheckCircle2 className="w-6 h-6 text-emerald-500" />
                </motion.div>
              )}

              {isAnswered &&
                isSelected &&
                !isCorrect && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                  >
                    <XCircle className="w-6 h-6 text-rose-500" />
                  </motion.div>
                )}
            </button>
          );
        })}
      </div>
    </motion.div>
  );
};