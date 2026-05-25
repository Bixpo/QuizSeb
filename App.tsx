import React, { useState } from "react";
import { Header } from "./components/Header";
import type { Question } from "./types";
import quizData from "./data/quiz.json";
import { BrainCircuit } from "lucide-react";
import { QuestionCard } from "./components/QuestionCard";

export const App = () => {
  console.log("APP NOVO");
  const questions: Question[] = quizData;

  const [currentQuestionIndex, setCurrentQuestionIndex] =
    useState<number>(0);

  const [score, setScore] = useState<number>(0);

  const handleAnswer = (isCorrect: boolean) => {
    console.log("HANDLE ANSWER");

    if (isCorrect) {
      setScore((prev) => prev + 1);
    }

    setCurrentQuestionIndex((prev) => prev + 1);
  };

  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <BrainCircuit className="w-12 h-12 text-indigo-300 mb-4" />

          <div className="text-slate-400 font-medium">
            Loading quiz...
          </div>
        </div>
      </div>
    );
  }

  console.log("RENDER APP");
  console.log("QUESTAO ATUAL:", currentQuestionIndex);
  console.log(
    "PERGUNTA:",
    questions[currentQuestionIndex]
  );

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-indigo-100 selection:text-indigo-900">
      <div className="max-w-3xl mx-auto px-4 py-12 md:py-20">
        <Header />

        <main>
          {currentQuestionIndex >= questions.length ? (
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-4">
                Resultado do Quiz
              </h2>

              <p className="text-lg">
                Você acertou {score} de {questions.length} questões
              </p>
            </div>
          ) : (
            <div className="w-full max-w-2xl mx-auto">
              <div className="mb-4 font-semibold">
                Questão {currentQuestionIndex + 1} de{" "}
                {questions.length}
              </div>

              <QuestionCard
                key={currentQuestionIndex}
                question={questions[currentQuestionIndex]}
                onAnswer={handleAnswer}
              />
            </div>
          )}
        </main>
      </div>
    </div>
  );
};