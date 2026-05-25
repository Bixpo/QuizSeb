import { useState } from "react";
import { Header } from "./components/Header";
import type { Question } from "./types";
import quizData from "./data/quiz.json";
import {
  BrainCircuit,
  Trophy,
  Play,
  Star,
} from "lucide-react";
import { QuestionCard } from "./components/QuestionCard";
import { motion } from "framer-motion";

export const App = () => {
  // RANDOMIZA perguntas
  const [questions] = useState<Question[]>(
    [...quizData].sort(() => Math.random() - 0.5)
  );

  const [currentQuestionIndex, setCurrentQuestionIndex] =
    useState<number>(0);

  const [score, setScore] = useState<number>(0);

  const [isFinished, setIsFinished] =
    useState<boolean>(false);

  const [gameStarted, setGameStarted] =
    useState<boolean>(false);

  const handleAnswer = (isCorrect: boolean) => {
    if (isCorrect) {
      setScore((prev) => prev + 1);
    }

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      setIsFinished(true);
    }
  };

  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <BrainCircuit className="w-16 h-16 text-yellow-400 mb-4" />

          <div className="text-slate-300 text-xl font-medium">
            Carregando Quiz...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen overflow-hidden relative bg-gradient-to-br from-green-900 via-emerald-800 to-blue-950 text-white">
      
      {/* BOLAS ANIMADAS */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-72 h-72 bg-yellow-400/10 rounded-full blur-3xl top-0 left-0 animate-pulse" />

        <div className="absolute w-96 h-96 bg-green-400/10 rounded-full blur-3xl bottom-0 right-0 animate-pulse" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 py-10">
        <Header />

        {/* TELA INICIAL */}
        {!gameStarted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center text-center mt-20"
          >
            <motion.div
              animate={{
                rotate: [0, 10, -10, 0],
              }}
              transition={{
                repeat: Infinity,
                duration: 4,
              }}
            >
              <Trophy className="w-28 h-28 text-yellow-400 mb-8 drop-shadow-2xl" />
            </motion.div>

            <h1 className="text-6xl font-black mb-6 bg-gradient-to-r from-yellow-300 to-yellow-500 bg-clip-text text-transparent">
              QUIZ COPA DO MUNDO
            </h1>

            <p className="text-xl text-slate-200 max-w-2xl mb-10">
              Teste seus conhecimentos sobre as Copas do Mundo,
              jogadores históricos e momentos inesquecíveis.
            </p>

            <div className="flex gap-6 mb-10 flex-wrap justify-center">
              <div className="bg-white/10 backdrop-blur-lg px-6 py-4 rounded-2xl border border-white/10">
                <div className="text-3xl font-black text-yellow-400">
                  30
                </div>

                <div className="text-slate-300">
                  Perguntas
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-lg px-6 py-4 rounded-2xl border border-white/10">
                <div className="text-3xl font-black text-emerald-400">
                  15s
                </div>

                <div className="text-slate-300">
                  Por pergunta
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-lg px-6 py-4 rounded-2xl border border-white/10">
                <div className="text-3xl font-black text-blue-400">
                  3
                </div>

                <div className="text-slate-300">
                  Dificuldades
                </div>
              </div>
            </div>

            <motion.button
              whileHover={{
                scale: 1.05,
              }}
              whileTap={{
                scale: 0.95,
              }}
              onClick={() => setGameStarted(true)}
              className="flex items-center gap-3 bg-yellow-400 hover:bg-yellow-300 text-slate-900 font-black text-xl px-10 py-5 rounded-2xl shadow-2xl transition-all"
            >
              <Play className="w-7 h-7" />
              COMEÇAR QUIZ
            </motion.button>
          </motion.div>
        ) : !isFinished ? (
          // QUIZ
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full max-w-2xl mx-auto"
          >
            {/* TOPO */}
            <div className="flex items-center justify-between mb-6 bg-white/10 backdrop-blur-lg border border-white/10 rounded-2xl px-6 py-4">
              <div>
                <div className="text-sm text-slate-300">
                  Pergunta
                </div>

                <div className="text-2xl font-black">
                  {currentQuestionIndex + 1} /{" "}
                  {questions.length}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Star className="text-yellow-400" />

                <span className="text-2xl font-black">
                  {score}
                </span>
              </div>
            </div>

            {/* BARRA */}
            <div className="w-full h-4 bg-white/10 rounded-full overflow-hidden mb-8">
              <motion.div
                initial={{ width: 0 }}
                animate={{
                  width: `${
                    ((currentQuestionIndex + 1) /
                      questions.length) *
                    100
                  }%`,
                }}
                className="h-full bg-gradient-to-r from-yellow-400 to-emerald-400"
              />
            </div>

            <QuestionCard
              key={currentQuestionIndex}
              question={questions[currentQuestionIndex]}
              onAnswer={handleAnswer}
            />
          </motion.div>
        ) : (
          // RESULTADO FINAL
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.8,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            className="text-center mt-20"
          >
            <motion.div
              animate={{
                y: [0, -15, 0],
              }}
              transition={{
                repeat: Infinity,
                duration: 2,
              }}
            >
              <Trophy className="w-32 h-32 mx-auto text-yellow-400 mb-8" />
            </motion.div>

            <h2 className="text-6xl font-black mb-6 bg-gradient-to-r from-yellow-300 to-yellow-500 bg-clip-text text-transparent">
              QUIZ FINALIZADO
            </h2>

            <div className="bg-white/10 backdrop-blur-lg border border-white/10 rounded-3xl p-10 max-w-xl mx-auto">
              <p className="text-2xl text-slate-200 mb-4">
                Você acertou
              </p>

              <div className="text-7xl font-black text-yellow-400 mb-4">
                {score}
              </div>

              <p className="text-xl text-slate-300 mb-8">
                de {questions.length} perguntas
              </p>

              <button
                onClick={() => window.location.reload()}
                className="bg-yellow-400 hover:bg-yellow-300 text-slate-900 font-black px-8 py-4 rounded-2xl text-xl transition-all"
              >
                Jogar Novamente
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};