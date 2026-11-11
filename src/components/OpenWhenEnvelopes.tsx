import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Mail, Heart, Sparkles, X, Sun, CloudRain, ShieldAlert, AlertCircle, Compass } from "lucide-react";

interface EnvelopeItem {
  id: string;
  triggerTitle: string;
  emoji: string;
  tag: string;
  colorScheme: {
    bg: string;
    border: string;
    stamp: string;
    accent: string;
  };
  letterTitle: string;
  content: string[];
}

interface OpenWhenEnvelopesProps {
  loverName: string;
}

export const OpenWhenEnvelopes: React.FC<OpenWhenEnvelopesProps> = ({ loverName }) => {
  const envelopes: EnvelopeItem[] = [
    {
      id: "sad",
      triggerTitle: "Open when you're sad",
      emoji: "🌧️",
      tag: "For cloudy days",
      colorScheme: {
        bg: "from-blue-50/80 via-rose-50/80 to-purple-50/80",
        border: "border-blue-200/80",
        stamp: "bg-blue-600 text-white",
        accent: "text-blue-700",
      },
      letterTitle: "Hey my sweet girl, it's okay to not be okay...",
      content: [
        "First, take a deep, slow breath. Drop your shoulders, unclench your jaw, and let me remind you of something important: you don't have to be strong all the time.",
        "Whatever is hurting or feeling heavy right now, you don't have to carry it alone. I am right here with you, holding your hand through the storm.",
        "Your feelings are valid, and your gentle heart is precious. Cry if you need to, rest if you must. The storm will pass, the sun will warm your face again, and until it does, I will be your umbrella.",
        "I love you so, so much. You are never alone.",
      ],
    },
    {
      id: "miss-me",
      triggerTitle: "Open when you miss me",
      emoji: "💭",
      tag: "Across any distance",
      colorScheme: {
        bg: "from-purple-50/80 via-pink-50/80 to-rose-50/80",
        border: "border-purple-200/80",
        stamp: "bg-purple-600 text-white",
        accent: "text-purple-700",
      },
      letterTitle: "Close your eyes for three seconds...",
      content: [
        "If you close your eyes right now, imagine my arms wrapping tightly around you. Feel the warmth of my chest, my chin resting on your head, and my voice whispering in your ear that everything is going to be alright.",
        "Distance is just a test of how far love can travel, and I promise you my love travels across miles in a heartbeat.",
        "I miss your laugh, your voice, and the way your hand fits into mine like two matching puzzle pieces. Soon, we will be together again, and I won't let you go for hours.",
        "Think of me smiling at you right now. I love you endlessly.",
      ],
    },
    {
      id: "need-hug",
      triggerTitle: "Open when you need a hug",
      emoji: "🫂",
      tag: "Pure warmth",
      colorScheme: {
        bg: "from-rose-50/80 via-amber-50/70 to-pink-50/80",
        border: "border-rose-200/80",
        stamp: "bg-rose-600 text-white",
        accent: "text-rose-700",
      },
      letterTitle: "Wrapping you in the biggest, warmest squeeze...",
      content: [
        "Consider this envelope an official, unlimited redeemable coupon for the tightest, longest, most comforting hug in the world.",
        "Wrap your arms around yourself, squeeze tight, and know that my love is surrounding you like a soft, cozy blanket right at this moment.",
        "No matter what exhausted you today, you made it through. You are safe, you are cherished, and my arms will always be your favorite sanctuary.",
        "Squeeze tight! I'm sending you all my warmth right now.",
      ],
    },
    {
      id: "angry",
      triggerTitle: "Open when you're angry",
      emoji: "😤",
      tag: "Cooling down",
      colorScheme: {
        bg: "from-amber-50/80 via-orange-50/70 to-rose-50/80",
        border: "border-amber-200/80",
        stamp: "bg-amber-600 text-white",
        accent: "text-amber-700",
      },
      letterTitle: "Take a deep breath with me...",
      content: [
        "Even when things are frustrating, even if we had a silly disagreement or the world was unfair to you today—remember that it's always you and me against the problem, never you against me.",
        "Your feelings matter to me. I want to understand what's in your heart, listen without judging, and make things right.",
        "Take all the time you need to cool down. Drink a sip of water. I'm not going anywhere. When you're ready, I'll be right here waiting with open arms and a gentle ear.",
        "I love you through every emotion, even the fiery ones.",
      ],
    },
    {
      id: "doubt-love",
      triggerTitle: "Open when you doubt how much I love you",
      emoji: "🥺",
      tag: "Unshakable truth",
      colorScheme: {
        bg: "from-pink-50/80 via-rose-50/90 to-red-50/80",
        border: "border-pink-300/80",
        stamp: "bg-rose-700 text-white",
        accent: "text-rose-800",
      },
      letterTitle: "Never, ever doubt this truth...",
      content: [
        "If your mind ever plays tricks on you, if self-doubt whispers that you're hard to love or that you don't matter—listen to my voice loud and clear:",
        "You are the most precious, irreplaceable blessing in my entire existence. My love for you isn't temporary, it's not conditional, and it doesn't fade when days are messy.",
        "I love your flaws, your laughter, your quiet moments, and everything that makes you who you are. Loving you is the easiest, most natural decision I make every morning.",
        "You are deeply, passionately, and permanently loved by me. Always.",
      ],
    },
  ];

  const [activeEnvelope, setActiveEnvelope] = useState<EnvelopeItem | null>(null);
  const [openedIds, setOpenedIds] = useState<Record<string, boolean>>({});

  const handleOpenEnvelope = (item: EnvelopeItem) => {
    setActiveEnvelope(item);
    setOpenedIds((prev) => ({ ...prev, [item.id]: true }));
  };

  return (
    <section className="relative w-full max-w-6xl mx-auto px-4 py-12 sm:py-16">
      {/* Header */}
      <div className="text-center mb-10 sm:mb-12">
        <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-rose-600 mb-2">
          <Mail className="h-3.5 w-3.5" />
          <span>Section 05 · Open When You Need Love</span>
        </div>
        <h2 className="font-serif-display text-3xl sm:text-4xl font-bold text-rose-950">
          Letters For Your Heart, {loverName}
        </h2>
        <p className="text-xs sm:text-sm text-rose-800/70 mt-1 max-w-lg mx-auto font-sans">
          Special digital envelopes sealed with love. Click any envelope whenever you feel that emotion to open its letter.
        </p>
      </div>

      {/* 5 Envelopes Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {envelopes.map((env, index) => {
          const isOpened = !!openedIds[env.id];

          return (
            <motion.div
              key={env.id}
              whileHover={{ y: -6, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleOpenEnvelope(env)}
              className={`group relative overflow-hidden rounded-3xl bg-gradient-to-br ${env.colorScheme.bg} p-6 sm:p-7 shadow-md hover:shadow-xl border ${env.colorScheme.border} cursor-pointer transition-all flex flex-col justify-between h-56 sm:h-64 select-none`}
            >
              {/* Envelope Flap Geometry Aesthetic */}
              <div className="absolute top-0 left-0 right-0 h-16 border-b border-rose-200/60 bg-white/40 transform -skew-y-1 origin-top-left pointer-events-none" />

              {/* Top Bar with Stamp and Emoji */}
              <div className="relative z-10 flex items-center justify-between">
                <span className="text-3xl filter drop-shadow-xs">{env.emoji}</span>
                <div
                  className={`px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase shadow-xs flex items-center gap-1 ${env.colorScheme.stamp}`}
                >
                  <Heart className="h-3 w-3 fill-white" />
                  <span>{isOpened ? "Re-read" : "Sealed"}</span>
                </div>
              </div>

              {/* Title & Tag */}
              <div className="relative z-10 pt-4">
                <div className={`text-xs font-semibold uppercase tracking-wider mb-1 ${env.colorScheme.accent}`}>
                  {env.tag}
                </div>
                <h3 className="font-serif-display text-xl sm:text-2xl font-bold text-rose-950 leading-snug">
                  {env.triggerTitle}
                </h3>
              </div>

              {/* Bottom bar */}
              <div className="relative z-10 pt-3 border-t border-rose-200/50 flex items-center justify-between text-xs text-rose-700/80 font-medium">
                <span className="inline-flex items-center gap-1">
                  <span>💌 Click to open envelope</span>
                </span>
                <Sparkles className="h-3.5 w-3.5 text-amber-500" />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Opened Envelope Letter Modal */}
      <AnimatePresence>
        {activeEnvelope && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-rose-950/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="relative max-w-xl w-full rounded-3xl bg-[#fffefb] p-6 sm:p-10 shadow-2xl border-2 border-rose-200 overflow-hidden"
            >
              {/* Close button */}
              <button
                onClick={() => setActiveEnvelope(null)}
                className="absolute top-5 right-5 p-2 text-rose-400 hover:text-rose-700 rounded-full hover:bg-rose-50 transition-colors cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Top Envelope Header */}
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-rose-600 mb-2">
                <Heart className="h-3.5 w-3.5 fill-rose-500 text-rose-500" />
                <span>{activeEnvelope.triggerTitle}</span>
              </div>

              <h3 className="font-serif-display text-2xl sm:text-3xl font-bold text-rose-950 mb-6 leading-snug">
                {activeEnvelope.letterTitle}
              </h3>

              {/* Letter Paragraphs */}
              <div className="space-y-4 text-sm sm:text-base text-rose-900/90 font-sans leading-relaxed">
                {activeEnvelope.content.map((paragraph, pIdx) => (
                  <p key={pIdx}>{paragraph}</p>
                ))}
              </div>

              {/* Signature */}
              <div className="mt-8 pt-6 border-t border-rose-100 flex items-center justify-between text-xs text-rose-600 font-sans">
                <span className="font-cursive text-xl text-rose-800">
                  Always here for you, {loverName} ❤️
                </span>
                <button
                  onClick={() => setActiveEnvelope(null)}
                  className="px-4 py-2 rounded-xl bg-rose-100/80 hover:bg-rose-200/90 text-rose-900 font-medium transition-colors cursor-pointer"
                >
                  Fold &amp; Keep Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
