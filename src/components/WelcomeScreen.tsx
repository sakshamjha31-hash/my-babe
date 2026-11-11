import React from "react";
import { motion } from "motion/react";
import { Heart, Sparkles, Music } from "lucide-react";

interface WelcomeScreenProps {
  loverName: string;
  onOpen: () => void;
  onEasterEggHeart: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({
  loverName,
  onOpen,
  onEasterEggHeart,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden px-6 text-center select-none"
      style={{
        background: "radial-gradient(ellipse at center, #fff1f2 0%, #fce7f3 45%, #ede9fe 100%)",
      }}
    >
      {/* Decorative ambient background glows */}
      <div className="pointer-events-none absolute -top-24 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-rose-300/35 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 right-1/4 h-80 w-80 rounded-full bg-pink-200/40 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 left-1/4 h-80 w-80 rounded-full bg-purple-200/35 blur-3xl" />

      {/* Floating Sparkles */}
      <div className="pointer-events-none absolute top-12 left-12 animate-sparkle">
        <Sparkles className="h-6 w-6 text-rose-400" />
      </div>
      <div className="pointer-events-none absolute top-20 right-16 animate-sparkle" style={{ animationDelay: "1s" }}>
        <Sparkles className="h-5 w-5 text-pink-400" />
      </div>
      <div className="pointer-events-none absolute bottom-24 left-20 animate-sparkle" style={{ animationDelay: "1.5s" }}>
        <Sparkles className="h-5 w-5 text-rose-300" />
      </div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="relative z-10 max-w-xl mx-auto flex flex-col items-center"
      >
        {/* Soft tag */}
        <div className="inline-flex items-center gap-2 text-rose-600/80 text-xs sm:text-sm font-medium tracking-widest uppercase mb-4">
          <span className="h-px w-6 bg-rose-300"></span>
          <span>A Private Sanctuary Made Just For You</span>
          <span className="h-px w-6 bg-rose-300"></span>
        </div>

        {/* Grand Headline with personalized name */}
        <h1 className="font-serif-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-rose-950 mb-6 leading-tight">
          Hey, <span className="font-cursive text-5xl sm:text-6xl md:text-7xl font-normal text-rose-600 inline-block px-1">{loverName || "My Beautiful Girl"}</span> ❤️
        </h1>

        {/* Animated Glowing Pulsing Heart */}
        <div className="relative my-6 sm:my-8 flex items-center justify-center">
          {/* Pulsing halo layers */}
          <div className="absolute h-36 w-36 sm:h-44 sm:w-44 rounded-full bg-rose-500/20 blur-xl animate-ping" style={{ animationDuration: "3s" }} />
          <div className="absolute h-28 w-28 sm:h-36 sm:w-36 rounded-full bg-pink-400/30 blur-lg animate-pulse" />

          {/* Interactive heart with easter egg click */}
          <motion.button
            whileHover={{ scale: 1.12, rotate: [0, -5, 5, 0] }}
            whileTap={{ scale: 0.92 }}
            onClick={onEasterEggHeart}
            title="Click for a little secret surprise ❤️"
            className="group relative z-10 cursor-pointer rounded-full p-4 transition-transform focus:outline-none"
          >
            <div className="relative flex items-center justify-center">
              <Heart
                className="h-20 w-20 sm:h-24 sm:w-24 fill-rose-500 text-rose-500 drop-shadow-[0_10px_25px_rgba(225,29,72,0.45)] transition-all duration-300 group-hover:fill-rose-600 group-hover:drop-shadow-[0_12px_35px_rgba(225,29,72,0.6)]"
              />
              <Sparkles className="absolute -top-1 -right-1 h-6 w-6 text-amber-300 animate-spin" style={{ animationDuration: "8s" }} />
            </div>
          </motion.button>
        </div>

        {/* Emotional subtext */}
        <p className="text-rose-900/80 text-base sm:text-lg font-normal max-w-md mx-auto mb-8 sm:mb-10 leading-relaxed font-sans">
          Take a deep breath and leave everything else behind. Every single corner of this place was built to remind you how deeply and endlessly you are cherished.
        </p>

        {/* Action Button: "Open Your Little World 💌" */}
        <motion.button
          whileHover={{ scale: 1.04, y: -2 }}
          whileTap={{ scale: 0.97 }}
          onClick={onOpen}
          className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-rose-600 via-pink-600 to-rose-700 text-white font-medium text-base sm:text-lg shadow-[0_10px_30px_rgba(225,29,72,0.35)] hover:shadow-[0_14px_40px_rgba(225,29,72,0.5)] transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-rose-300/50 cursor-pointer"
        >
          <span>Open Your Little World</span>
          <span className="text-xl transition-transform duration-300 group-hover:translate-x-1">💌</span>
        </motion.button>

        <div className="mt-8 flex items-center gap-2 text-xs text-rose-800/60 font-sans">
          <Music className="h-3.5 w-3.5 text-rose-500" />
          <span>Soft lofi romantic melody is ready inside for you</span>
        </div>
      </motion.div>
    </motion.div>
  );
};
