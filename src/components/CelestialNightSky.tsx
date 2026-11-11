import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Heart, Sparkles, Moon, Star, X } from "lucide-react";
import { lofiAudio } from "../utils/audio.ts";

interface CelestialNightSkyProps {
  loverName: string;
  onSendKiss: () => void;
}

export const CelestialNightSky: React.FC<CelestialNightSkyProps> = ({ loverName, onSendKiss }) => {
  const [isFinalRevealOpen, setIsFinalRevealOpen] = useState(false);

  const handleReveal = () => {
    setIsFinalRevealOpen(true);
    lofiAudio.playKissChime();
    onSendKiss();
  };

  // Static twinkling stars positions
  const stars = [
    { top: "12%", left: "15%", size: 3, delay: "0s" },
    { top: "18%", left: "80%", size: 2.5, delay: "1.2s" },
    { top: "35%", left: "28%", size: 2, delay: "0.5s" },
    { top: "42%", left: "72%", size: 3.5, delay: "1.8s" },
    { top: "60%", left: "10%", size: 2, delay: "0.8s" },
    { top: "68%", left: "88%", size: 3, delay: "2.1s" },
    { top: "25%", left: "50%", size: 2, delay: "1.5s" },
    { top: "78%", left: "45%", size: 2.5, delay: "0.3s" },
    { top: "85%", left: "22%", size: 3, delay: "1.9s" },
    { top: "88%", left: "75%", size: 2, delay: "2.4s" },
  ];

  return (
    <section className="relative w-full overflow-hidden px-4 py-20 sm:py-28 text-white">
      {/* Deep Midnight Celestial Gradient Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 30%, #3b0724 0%, #1e051c 40%, #0c020d 85%, #050106 100%)",
        }}
      />

      {/* Constellation Glows */}
      <div className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 h-[400px] w-[500px] rounded-full bg-rose-600/20 blur-[100px]" />
      <div className="pointer-events-none absolute bottom-10 left-1/3 h-72 w-72 rounded-full bg-purple-600/20 blur-[90px]" />

      {/* Twinkling Stars */}
      {stars.map((star, idx) => (
        <div
          key={idx}
          className="pointer-events-none absolute rounded-full bg-white animate-sparkle"
          style={{
            top: star.top,
            left: star.left,
            width: `${star.size}px`,
            height: `${star.size}px`,
            animationDelay: star.delay,
            boxShadow: "0 0 8px rgba(255, 255, 255, 0.9)",
          }}
        />
      ))}

      {/* Content Container */}
      <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center">
        {/* Soft tag */}
        <div className="inline-flex items-center gap-2 text-rose-300 text-xs font-semibold tracking-widest uppercase mb-4">
          <Moon className="h-3.5 w-3.5 text-amber-300" />
          <span>Section 07 · The Final Surprise</span>
          <span className="text-rose-400">·</span>
          <span>Written In The Stars</span>
        </div>

        {/* Monumental Glowing Heart in Night Sky */}
        <div className="relative my-8 flex items-center justify-center">
          {/* Outer Nebula Rings */}
          <div className="absolute h-56 w-56 sm:h-72 sm:w-72 rounded-full bg-rose-500/15 blur-2xl animate-pulse" />
          <div className="absolute h-40 w-40 sm:h-52 sm:w-52 rounded-full bg-pink-500/25 blur-xl animate-ping" style={{ animationDuration: "4s" }} />

          {/* Majestic Heart */}
          <motion.div
            animate={{
              scale: [1, 1.08, 1],
              rotate: [0, 1.5, -1.5, 0],
            }}
            transition={{
              duration: 3.2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="relative z-10"
          >
            <Heart className="h-28 w-28 sm:h-36 sm:w-36 fill-rose-500 text-rose-400 drop-shadow-[0_0_40px_rgba(244,63,94,0.8)]" />
            <Sparkles className="absolute -top-2 -right-2 h-8 w-8 text-amber-200 animate-spin" style={{ animationDuration: "9s" }} />
          </motion.div>
        </div>

        {/* Required Celestial Quote */}
        <motion.blockquote
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-serif-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-rose-100 max-w-3xl mx-auto mb-8 leading-tight tracking-tight drop-shadow-md"
        >
          "If I could choose again, in every lifetime, in every universe, I'd still choose you. ❤️"
        </motion.blockquote>

        <p className="font-sans text-xs sm:text-sm text-rose-200/80 max-w-lg mx-auto mb-10 leading-relaxed">
          Through billions of galaxies and infinite moments in time, finding you will always be the greatest miracle of my life, {loverName}.
        </p>

        {/* The "One Last Thing..." Button */}
        <motion.button
          whileHover={{ scale: 1.06, y: -2 }}
          whileTap={{ scale: 0.96 }}
          onClick={handleReveal}
          className="group relative inline-flex items-center gap-3 px-9 py-4 sm:px-12 sm:py-5 rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 text-white font-serif-display text-lg sm:text-xl font-bold shadow-[0_0_35px_rgba(244,63,94,0.6)] hover:shadow-[0_0_50px_rgba(244,63,94,0.8)] transition-all cursor-pointer focus:outline-none"
        >
          <Sparkles className="h-5 w-5 text-amber-200" />
          <span>One Last Thing...</span>
          <Heart className="h-5 w-5 fill-white" />
        </motion.button>
      </div>

      {/* CLIMAX MODAL REVEAL */}
      <AnimatePresence>
        {isFinalRevealOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: 20 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="relative max-w-2xl w-full rounded-3xl bg-gradient-to-br from-rose-950 via-rose-900 to-purple-950 p-8 sm:p-12 text-center border-2 border-rose-400/50 shadow-[0_0_80px_rgba(225,29,72,0.5)] overflow-hidden"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsFinalRevealOpen(false)}
                className="absolute top-5 right-5 p-2 text-rose-300 hover:text-white rounded-full hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X className="h-6 w-6" />
              </button>

              {/* Glowing Heart Icon */}
              <div className="inline-flex items-center justify-center h-20 w-20 rounded-full bg-rose-500/20 text-rose-400 mb-6 mx-auto">
                <Heart className="h-10 w-10 fill-rose-500 animate-romantic-pulse" />
              </div>

              {/* Required Climax Declaration */}
              <h2 className="font-serif-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-6 leading-tight tracking-tight drop-shadow-[0_5px_15px_rgba(244,63,94,0.6)]">
                I LOVE YOU, MORE THAN WORDS COULD EVER EXPLAIN. ❤️
              </h2>

              <p className="font-cursive text-2xl sm:text-3xl text-rose-200 mb-8 font-normal leading-relaxed">
                Thank you for being the sweetest part of my reality, {loverName}.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-3">
                <button
                  onClick={() => {
                    onSendKiss();
                    lofiAudio.playKissChime();
                  }}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-rose-500 hover:bg-rose-400 text-white font-semibold text-sm transition-all shadow-md cursor-pointer"
                >
                  <span>Shower More Kisses 💋</span>
                </button>

                <button
                  onClick={() => setIsFinalRevealOpen(false)}
                  className="px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 text-rose-200 font-medium text-sm transition-colors cursor-pointer"
                >
                  Hold This In My Heart
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
