import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Smile, Heart, Sparkles, RefreshCw, Copy, Check } from "lucide-react";
import { lofiAudio } from "../utils/audio.ts";

interface SmileGeneratorProps {
  loverName: string;
  onHeartBurst: () => void;
}

export const SmileGenerator: React.FC<SmileGeneratorProps> = ({ loverName, onHeartBurst }) => {
  const compliments = [
    `Your smile is literally the prettiest thing I have ever seen in my life, ${loverName}.`,
    `You make even the most boring Monday morning feel exciting.`,
    `I don't think you realize how effortlessly cute you are when you're focusing on something.`,
    `The sound of your laugh is my absolute favorite sound in the world.`,
    `You are my safest harbor and my wildest adventure all in one.`,
    `If being breathtaking was a crime, you'd be serving life without parole.`,
    `Even on your messiest hair, sweatpants day, you are still the prettiest girl on earth to me.`,
    `You have the warmest heart, and anyone who knows you is blessed. Especially me!`,
    `I love the cute way your eyes light up when you talk about things you love.`,
    `Holding your hand makes everything in life instantly 10x better.`,
    `You are the easiest person to talk to, and the hardest person to stop thinking about.`,
    `You give the kind of hugs that make you forget every single worry.`,
    `Thank you for being my favorite notification, my favorite hello, and my hardest goodbye.`,
    `You're smarter than you give yourself credit for, and braver than you know.`,
    `Just a reminder: you look stunning today, and I am so deeply in love with you!`,
    `If I could give you one superpower, it would be the ability to see yourself through my eyes.`,
    `My favorite place in this entire world is right next to you.`,
    `You are the person I want to tell good news to first, and bad news to for comfort.`,
    `Your existence made my life infinitely softer, happier, and brighter.`,
    `I would choose you over and over, in a heartbeat, without any hesitation.`,
    `You have this magical way of making me laugh even when I'm grumpy.`,
    `You're not just my girlfriend, you're my best friend, my soulmate, and my whole heart.`,
    `Every love song makes 100% sense now because every lyric reminds me of you.`,
    `I fall a little bit more in love with you with each sunrise.`,
    `You are completely irreplaceable, ${loverName}. Never forget that!`,
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [clickCount, setClickCount] = useState(1);
  const [copied, setCopied] = useState(false);

  const handleClickSmile = () => {
    let nextIdx = Math.floor(Math.random() * compliments.length);
    if (nextIdx === currentIndex) {
      nextIdx = (nextIdx + 1) % compliments.length;
    }
    setCurrentIndex(nextIdx);
    setClickCount((prev) => prev + 1);
    lofiAudio.playKissChime();
    onHeartBurst();
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(compliments[currentIndex]);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <section className="relative w-full max-w-4xl mx-auto px-4 py-12 sm:py-16">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-rose-100/70 via-pink-50/80 to-purple-100/60 p-6 sm:p-10 md:p-12 shadow-xl border border-rose-200/80 text-center backdrop-blur-md">
        {/* Glow ambient */}
        <div className="pointer-events-none absolute -top-12 -left-12 h-40 w-40 rounded-full bg-rose-400/20 blur-2xl" />
        <div className="pointer-events-none absolute -bottom-12 -right-12 h-40 w-40 rounded-full bg-pink-400/20 blur-2xl" />

        {/* Header */}
        <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-rose-600 mb-2">
          <Smile className="h-3.5 w-3.5" />
          <span>Section 06 · A Million Reasons to Smile</span>
        </div>
        <h2 className="font-serif-display text-3xl sm:text-4xl font-bold text-rose-950 mb-2">
          Instant Smile Machine
        </h2>
        <p className="text-xs sm:text-sm text-rose-800/80 max-w-md mx-auto mb-8 font-sans">
          Feeling down, tired, or just need a sweet reminder of how loved you are? Tap the button below as many times as you like!
        </p>

        {/* The Big Interactive Button */}
        <motion.button
          whileHover={{ scale: 1.05, y: -3 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleClickSmile}
          className="group relative inline-flex items-center gap-3 px-8 py-4 sm:px-10 sm:py-5 rounded-full bg-gradient-to-r from-rose-600 via-pink-600 to-rose-700 text-white font-serif-display text-lg sm:text-xl font-bold shadow-[0_10px_30px_rgba(225,29,72,0.35)] hover:shadow-[0_14px_40px_rgba(225,29,72,0.5)] transition-all cursor-pointer focus:outline-none"
        >
          <Heart className="h-6 w-6 fill-white animate-romantic-pulse" />
          <span>Click if you need a smile 🥺</span>
          <Sparkles className="h-5 w-5 text-amber-200 animate-spin" style={{ animationDuration: "6s" }} />
        </motion.button>

        {/* Compliment Display Box */}
        <div className="mt-10 relative max-w-xl mx-auto min-h-[140px] flex items-center justify-center p-6 sm:p-8 rounded-2xl bg-white/95 border border-rose-200/80 shadow-md">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 15, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -15, scale: 0.96 }}
              transition={{ duration: 0.35 }}
              className="w-full"
            >
              <p className="font-cursive text-2xl sm:text-3xl text-rose-900 leading-relaxed font-normal">
                "{compliments[currentIndex]}"
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Footer Metrics & Actions */}
        <div className="mt-6 flex items-center justify-center gap-6 text-xs text-rose-700 font-medium">
          <div className="flex items-center gap-1.5">
            <Heart className="h-3.5 w-3.5 fill-rose-500 text-rose-500" />
            <span>Smiles Delivered: <strong>{clickCount}</strong></span>
          </div>

          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-1 hover:text-rose-900 transition-colors cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5 text-emerald-600" />
                <span className="text-emerald-700 font-semibold">Saved to heart!</span>
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5" />
                <span>Copy this note</span>
              </>
            )}
          </button>
        </div>
      </div>
    </section>
  );
};
