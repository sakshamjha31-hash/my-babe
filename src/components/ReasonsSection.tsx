import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Heart, Sparkles, Smile, Coffee, Sun, Compass, Star, Plus, RotateCw, X } from "lucide-react";

interface ReasonItem {
  id: string;
  title: string;
  subtitle: string;
  frontIcon: string;
  frontNote: string;
  deepLetter: string;
  isFlipped?: boolean;
  liked?: boolean;
}

interface ReasonsSectionProps {
  loverName: string;
}

export const ReasonsSection: React.FC<ReasonsSectionProps> = ({ loverName }) => {
  const initialReasons: ReasonItem[] = [
    {
      id: "smile",
      title: "Your Beautiful Smile",
      subtitle: "The light of my world",
      frontIcon: "✨",
      frontNote: "It has the power to melt any bad day in a single second.",
      deepLetter:
        "Whenever you smile genuinely—crinkling your eyes with that soft laugh—everything inside me calms down. It’s my favorite view in this whole universe, and I want to spend all my tomorrows giving you reasons to wear it.",
    },
    {
      id: "habits",
      title: "Your Cute Little Habits",
      subtitle: "The little things only I know",
      frontIcon: "☕",
      frontNote: "The adorable gestures you do without even realizing.",
      deepLetter:
        "The way you scrunch your nose when you're thinking, how you tuck your hair behind your ear, and the little excited dance you do when good food arrives. You are endlessly endearing to me.",
    },
    {
      id: "happiness",
      title: "The Way You Make Me Happy",
      subtitle: "Unconditional warmth",
      frontIcon: "💖",
      frontNote: "True peace whenever I am near you.",
      deepLetter:
        "You make happiness feel completely natural. With you, I don't have to pretend or put up any walls. Being by your side feels like home in the truest, most comforting sense.",
    },
    {
      id: "heart",
      title: "Your Beautiful Heart",
      subtitle: "Pure, kind, and empathetic",
      frontIcon: "🌸",
      frontNote: "The gentleness and care you show to the world.",
      deepLetter:
        "Your kindness isn't just something you show; it's who you are. The way you listen to others, care for the little things, and love so wholeheartedly inspires me to be a better person every day.",
    },
    {
      id: "magic",
      title: "The Way You Make Ordinary Moments Magical",
      subtitle: "Turning days into memories",
      frontIcon: "🌟",
      frontNote: "Errands, walks, and car rides feel like adventures.",
      deepLetter:
        "We could be doing grocery shopping, waiting in traffic, or lying on the floor talking about nothing—and somehow it becomes the highlight of my week. You bring magic into the ordinary.",
    },
    {
      id: "you",
      title: "Simply Because You're YOU",
      subtitle: "The one and only",
      frontIcon: "👑",
      frontNote: "Unique, irreplaceable, and completely mine.",
      deepLetter:
        "Even if I wrote down a thousand reasons, the biggest truth is that I love you simply for being yourself. In every lifetime, in every reality, I would find you and fall for you all over again.",
    },
  ];

  const [reasons, setReasons] = useState<ReasonItem[]>(initialReasons);
  const [flippedIds, setFlippedIds] = useState<Record<string, boolean>>({});
  const [likedIds, setLikedIds] = useState<Record<string, boolean>>({});
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newNote, setNewNote] = useState("");
  const [newLetter, setNewLetter] = useState("");

  const toggleFlip = (id: string) => {
    setFlippedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleLike = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setLikedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleAddReason = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    const newReason: ReasonItem = {
      id: `custom-${Date.now()}`,
      title: newTitle.trim(),
      subtitle: "A personal memory",
      frontIcon: "💌",
      frontNote: newNote.trim() || "A special reason from my heart.",
      deepLetter: newLetter.trim() || "Every single thing about you makes me fall in love again.",
    };
    setReasons((prev) => [...prev, newReason]);
    setNewTitle("");
    setNewNote("");
    setNewLetter("");
    setIsAddModalOpen(false);
  };

  return (
    <section className="relative w-full max-w-6xl mx-auto px-4 py-12 sm:py-16">
      {/* Header */}
      <div className="text-center mb-10 sm:mb-12">
        <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-rose-600 mb-2">
          <Sparkles className="h-3.5 w-3.5" />
          <span>Section 02 · Why You're So Special</span>
        </div>
        <h2 className="font-serif-display text-3xl sm:text-4xl font-bold text-rose-950">
          Reasons Why I Love You, {loverName}
        </h2>
        <p className="text-xs sm:text-sm text-rose-800/70 mt-1 max-w-lg mx-auto font-sans">
          Click or tap any card to flip it over and read the deeper story behind each reason.
        </p>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reasons.map((reason, index) => {
          const isFlipped = !!flippedIds[reason.id];
          const isLiked = !!likedIds[reason.id];

          return (
            <div
              key={reason.id}
              className="relative h-72 sm:h-80 perspective-1000 cursor-pointer select-none"
              onClick={() => toggleFlip(reason.id)}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08, duration: 0.5 }}
                className="relative h-full w-full rounded-3xl transition-transform duration-500 preserve-3d"
                style={{
                  transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
                }}
              >
                {/* FRONT FACE */}
                <div
                  className="absolute inset-0 h-full w-full rounded-3xl bg-gradient-to-br from-white via-rose-50/70 to-pink-50/60 p-6 sm:p-7 shadow-md border border-rose-200/70 backface-hidden flex flex-col justify-between hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-3xl">{reason.frontIcon}</span>
                    <button
                      onClick={(e) => toggleLike(e, reason.id)}
                      className={`p-2 rounded-full transition-colors ${
                        isLiked ? "bg-rose-100 text-rose-600" : "text-rose-300 hover:text-rose-500 hover:bg-rose-50"
                      }`}
                    >
                      <Heart className={`h-5 w-5 ${isLiked ? "fill-rose-500" : ""}`} />
                    </button>
                  </div>

                  <div>
                    <span className="text-xs font-semibold tracking-wider uppercase text-rose-500">
                      Reason #{index + 1}
                    </span>
                    <h3 className="font-serif-display text-xl sm:text-2xl font-bold text-rose-950 mt-1 mb-2">
                      {reason.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-rose-800/80 font-sans leading-relaxed">
                      {reason.frontNote}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-rose-100 text-xs text-rose-600 font-medium">
                    <span className="flex items-center gap-1">
                      <RotateCw className="h-3 w-3" /> Tap to read story
                    </span>
                    <span className="text-rose-400">· · ·</span>
                  </div>
                </div>

                {/* BACK FACE */}
                <div
                  className="absolute inset-0 h-full w-full rounded-3xl bg-gradient-to-br from-rose-900 via-rose-950 to-pink-950 p-6 sm:p-7 text-white shadow-xl border border-rose-800/60 backface-hidden flex flex-col justify-between"
                  style={{ transform: "rotateY(180deg)" }}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs uppercase tracking-widest text-rose-300 font-semibold">
                        {reason.title}
                      </span>
                      <Heart className="h-4 w-4 fill-rose-400 text-rose-400" />
                    </div>
                    <p className="font-sans text-xs sm:text-sm text-rose-100/95 leading-relaxed pt-2">
                      {reason.deepLetter}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-rose-800/60 flex items-center justify-between text-xs text-rose-300">
                    <span className="italic font-cursive text-base text-rose-200">forever yours</span>
                    <span className="flex items-center gap-1 text-xs">
                      <RotateCw className="h-3 w-3" /> Tap to flip back
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>
          );
        })}
      </div>

      {/* Button to add custom reason */}
      <div className="mt-8 text-center">
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/90 border border-rose-200 text-xs sm:text-sm font-semibold text-rose-800 hover:bg-rose-50 shadow-xs hover:shadow-md transition-all cursor-pointer"
        >
          <Plus className="h-4 w-4 text-rose-500" />
          <span>Add Another Reason I Love You</span>
        </button>
      </div>

      {/* Add Reason Modal */}
      <AnimatePresence>
        {isAddModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAddModalOpen(false)}
              className="fixed inset-0 bg-rose-950/40 backdrop-blur-xs"
            />
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative z-10 w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl border border-rose-200"
            >
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="absolute top-4 right-4 p-2 text-rose-400 hover:text-rose-600 rounded-full"
              >
                <X className="h-5 w-5" />
              </button>

              <h3 className="font-serif-display text-xl font-bold text-rose-950 mb-2">
                Add A Special Reason
              </h3>
              <p className="text-xs text-rose-700/80 mb-4">
                Write down an intimate memory, cute habit, or reason you love her.
              </p>

              <form onSubmit={handleAddReason} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-rose-900 mb-1">
                    Card Title
                  </label>
                  <input
                    type="text"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="e.g. The way you hold my arm when we walk"
                    required
                    className="w-full rounded-xl border border-rose-200 bg-rose-50/30 px-3.5 py-2 text-sm text-rose-950 focus:border-rose-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-rose-900 mb-1">
                    Short Front Note
                  </label>
                  <input
                    type="text"
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    placeholder="A quick 1-line teaser"
                    className="w-full rounded-xl border border-rose-200 bg-rose-50/30 px-3.5 py-2 text-sm text-rose-950 focus:border-rose-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-rose-900 mb-1">
                    Heartfelt Back Story
                  </label>
                  <textarea
                    rows={3}
                    value={newLetter}
                    onChange={(e) => setNewLetter(e.target.value)}
                    placeholder="What does this mean to you and why do you cherish it?"
                    className="w-full rounded-xl border border-rose-200 bg-rose-50/30 px-3.5 py-2 text-sm text-rose-950 focus:border-rose-400 focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 py-2.5 text-sm font-semibold text-white shadow-md hover:from-rose-700 hover:to-pink-700 transition-colors cursor-pointer"
                >
                  Save New Reason
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
