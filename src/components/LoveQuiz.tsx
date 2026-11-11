import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { HelpCircle, Heart, Sparkles, CheckCircle2, RotateCcw, Award, Smile } from "lucide-react";
import { lofiAudio } from "../utils/audio.ts";

interface QuizQuestion {
  id: number;
  question: string;
  options: {
    text: string;
    isSuperSweet: boolean;
    feedback: string;
  }[];
}

interface LoveQuizProps {
  loverName: string;
  onSendKiss: () => void;
}

export const LoveQuiz: React.FC<LoveQuizProps> = ({ loverName, onSendKiss }) => {
  const questions: QuizQuestion[] = [
    {
      id: 1,
      question: "Who fell in love first, and who fell harder? 🥺",
      options: [
        {
          text: "I fell first, and I definitely fell the hardest! ❤️",
          isSuperSweet: true,
          feedback: "Aww! The truth is, my heart was yours before I even realized it. 🥰",
        },
        {
          text: "We fell at the exact same magical second ✨",
          isSuperSweet: true,
          feedback: "Like a scene straight out of a dreamy romantic film! 🎬",
        },
        {
          text: "You fell first, but I'm never ever letting you go 🔒",
          isSuperSweet: true,
          feedback: "Deal! You're stuck with me forever and always! 💖",
        },
        {
          text: "Doesn't matter—we love each other to the moon! 🌙",
          isSuperSweet: true,
          feedback: "To the moon, the stars, and past the galaxies! 🚀",
        },
      ],
    },
    {
      id: 2,
      question: "What is our absolute favorite couple superpower? 🦸‍♀️",
      options: [
        {
          text: "Knowing what the other is thinking with just one eye glance 👀",
          isSuperSweet: true,
          feedback: "We don't even need words, our souls speak fluent love! 🔮",
        },
        {
          text: "Eating midnight snacks and laughing till our stomachs hurt 🍕",
          isSuperSweet: true,
          feedback: "My favorite late-night memory every single time! 😋",
        },
        {
          text: "Giving the warmest hugs that make the entire world vanish 🤗",
          isSuperSweet: true,
          feedback: "Your hug is literally my safe space in this whole world. 🏠",
        },
        {
          text: "All of the above, obviously! 👑",
          isSuperSweet: true,
          feedback: "100% correct! We are unstoppable together! 🌟",
        },
      ],
    },
    {
      id: 3,
      question: "If you're having a grumpy or tired day, what is my #1 mission? 🌧️",
      options: [
        {
          text: "Bring you your favorite comfort food and treats 🍫",
          isSuperSweet: true,
          feedback: "Snacks make everything 10x better, delivered with a forehead kiss! 💋",
        },
        {
          text: "Wrap you like a warm blanket burrito and cuddle you 🌯",
          isSuperSweet: true,
          feedback: "Burrito mode activated! Maximum warmth and safety. 🫂",
        },
        {
          text: "Listen to you vent and remind you how amazing you are 👂",
          isSuperSweet: true,
          feedback: "Always your #1 listener and your biggest cheerleader. 📣",
        },
        {
          text: "The ultimate royal treatment with all of the above! 💅",
          isSuperSweet: true,
          feedback: "You deserve nothing less than royalty treatment, princess! 👑",
        },
      ],
    },
    {
      id: 4,
      question: "Across every lifetime and every universe, how long will I love you? 🌌",
      options: [
        {
          text: "Past the edge of the galaxy and beyond forever ✨",
          isSuperSweet: true,
          feedback: "Even eternity isn't long enough to love you! 💫",
        },
        {
          text: "Every single breath of every lifetime we get ❤️",
          isSuperSweet: true,
          feedback: "I will look for you in every life, and I'll find you again! 🧭",
        },
        {
          text: "Until the stars stop shining (and even after that) 🌠",
          isSuperSweet: true,
          feedback: "My love will outshine every star in the sky for you! 🌟",
        },
        {
          text: "Forever and a million days more ♾️",
          isSuperSweet: true,
          feedback: "Signed, sealed, and etched into my heart forever! 💌",
        },
      ],
    },
  ];

  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const currentQ = questions[currentIdx];

  const handleSelect = (optIndex: number) => {
    if (selectedOption !== null) return;
    setSelectedOption(optIndex);
    lofiAudio.playKissChime();
    setScore((prev) => prev + 1);
  };

  const handleNext = () => {
    if (currentIdx < questions.length - 1) {
      setCurrentIdx((prev) => prev + 1);
      setSelectedOption(null);
    } else {
      setIsCompleted(true);
      lofiAudio.playKissChime();
      onSendKiss();
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setSelectedOption(null);
    setScore(0);
    setIsCompleted(false);
  };

  return (
    <section className="relative w-full max-w-3xl mx-auto px-4 py-12 sm:py-16">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-rose-600 mb-2">
          <HelpCircle className="h-3.5 w-3.5" />
          <span>Section 04 · A Little Love Quiz</span>
        </div>
        <h2 className="font-serif-display text-3xl sm:text-4xl font-bold text-rose-950">
          How Well Do You Know My Heart?
        </h2>
        <p className="text-xs sm:text-sm text-rose-800/70 mt-1 font-sans">
          A cute little quiz celebrating our love, funny moments, and sweet memories.
        </p>
      </div>

      <div className="relative overflow-hidden rounded-3xl bg-white/95 border border-rose-200/80 p-6 sm:p-10 shadow-xl backdrop-blur-sm">
        {/* Soft background tint */}
        <div className="pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full bg-rose-200/30 blur-xl" />

        {!isCompleted ? (
          <div>
            {/* Progress Bar & Counter */}
            <div className="flex items-center justify-between text-xs text-rose-600 font-medium mb-3">
              <span>Question {currentIdx + 1} of {questions.length}</span>
              <span>Our Love Score: {score * 25}%</span>
            </div>
            <div className="h-2 w-full bg-rose-100 rounded-full overflow-hidden mb-6">
              <motion.div
                className="h-full bg-gradient-to-r from-rose-500 to-pink-500 rounded-full"
                animate={{ width: `${((currentIdx + 1) / questions.length) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>

            {/* Question Text */}
            <h3 className="font-serif-display text-xl sm:text-2xl font-bold text-rose-950 mb-6">
              {currentQ.question}
            </h3>

            {/* Options List */}
            <div className="space-y-3 mb-6">
              {currentQ.options.map((opt, oIdx) => {
                const isChosen = selectedOption === oIdx;

                return (
                  <motion.button
                    key={oIdx}
                    whileHover={{ scale: selectedOption === null ? 1.01 : 1 }}
                    whileTap={{ scale: selectedOption === null ? 0.99 : 1 }}
                    disabled={selectedOption !== null}
                    onClick={() => handleSelect(oIdx)}
                    className={`w-full text-left p-4 rounded-2xl border transition-all flex items-center justify-between cursor-pointer ${
                      isChosen
                        ? "bg-rose-100/80 border-rose-400 text-rose-950 shadow-xs"
                        : "bg-rose-50/40 border-rose-100/90 text-rose-900 hover:bg-rose-100/50 hover:border-rose-200"
                    }`}
                  >
                    <span className="text-sm font-medium pr-3">{opt.text}</span>
                    {isChosen && (
                      <CheckCircle2 className="h-5 w-5 text-rose-600 shrink-0" />
                    )}
                  </motion.button>
                );
              })}
            </div>

            {/* Feedback Message */}
            <AnimatePresence>
              {selectedOption !== null && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-pink-50 to-rose-50 border border-rose-200 text-center"
                >
                  <p className="font-cursive text-xl text-rose-800">
                    "{currentQ.options[selectedOption].feedback}"
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Next Button */}
            {selectedOption !== null && (
              <div className="flex justify-end">
                <button
                  onClick={handleNext}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-rose-600 to-pink-600 text-white font-semibold text-sm shadow-md hover:from-rose-700 hover:to-pink-700 transition-all cursor-pointer"
                >
                  <span>{currentIdx < questions.length - 1 ? "Next Question" : "See Final Result"}</span>
                  <Sparkles className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>
        ) : (
          /* COMPLETION VIEW */
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-6"
          >
            <div className="inline-flex items-center justify-center h-20 w-20 rounded-full bg-rose-100 text-rose-600 mb-4 shadow-inner">
              <Award className="h-10 w-10 text-rose-600 animate-bounce" />
            </div>

            <div className="text-xs font-semibold uppercase tracking-widest text-rose-500 mb-2">
              Perfect 100% Soulmate Score
            </div>

            {/* Required Ending Message */}
            <h3 className="font-serif-display text-2xl sm:text-4xl font-bold text-rose-950 mb-4 leading-snug">
              "You will always be my favorite person ❤️"
            </h3>

            <p className="font-sans text-sm sm:text-base text-rose-800/90 max-w-md mx-auto mb-8 leading-relaxed">
              No matter what quiz you take, there is only one correct answer in this universe: I love you more than all the words in every dictionary, {loverName}!
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={onSendKiss}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-rose-600 to-pink-600 text-white font-medium text-sm shadow-md hover:from-rose-700 hover:to-pink-700 transition-all cursor-pointer"
              >
                <span>Send Me A Kiss 💋</span>
              </button>

              <button
                onClick={handleRestart}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white border border-rose-200 text-rose-800 hover:bg-rose-50 font-medium text-sm transition-colors cursor-pointer"
              >
                <RotateCcw className="h-4 w-4 text-rose-500" />
                <span>Play Again</span>
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};
