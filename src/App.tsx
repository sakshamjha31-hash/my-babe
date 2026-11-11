/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { WelcomeScreen } from "./components/WelcomeScreen.tsx";
import { TopNavbar } from "./components/TopNavbar.tsx";
import { AnniversaryCounter } from "./components/AnniversaryCounter.tsx";
import { LoveLetter } from "./components/LoveLetter.tsx";
import { ReasonsSection } from "./components/ReasonsSection.tsx";
import { PhotoGallery } from "./components/PhotoGallery.tsx";
import { LoveQuiz } from "./components/LoveQuiz.tsx";
import { OpenWhenEnvelopes } from "./components/OpenWhenEnvelopes.tsx";
import { SmileGenerator } from "./components/SmileGenerator.tsx";
import { CelestialNightSky } from "./components/CelestialNightSky.tsx";
import { LofiPlayer } from "./components/LofiPlayer.tsx";
import { HeartTrailCanvas } from "./components/HeartTrailCanvas.tsx";
import { PersonalizeModal } from "./components/PersonalizeModal.tsx";
import { EasterEggToast } from "./components/EasterEggToast.tsx";
import { Heart, Sparkles, SlidersHorizontal, ArrowUp } from "lucide-react";
import { lofiAudio } from "./utils/audio.ts";

export default function App() {
  const [hasEntered, setHasEntered] = useState<boolean>(() => {
    return sessionStorage.getItem("entered_world") === "true";
  });

  const [loverName, setLoverName] = useState<string>(() => {
    return localStorage.getItem("lover_name") || "My Beautiful Girl";
  });

  const [anniversaryDate, setAnniversaryDate] = useState<string>(() => {
    // Default to 1 year ago if not set
    const saved = localStorage.getItem("anniversary_date");
    if (saved) return saved;
    const d = new Date();
    d.setFullYear(d.getFullYear() - 1);
    return d.toISOString().split("T")[0];
  });

  const [kissTrigger, setKissTrigger] = useState(0);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [easterEggMessage, setEasterEggMessage] = useState<string | null>(null);

  const easterEggPool = [
    "Secret Love Note #1: You are officially declared the most beautiful, adorable person in the entire cosmos! 👑",
    "Secret Love Note #2: Thinking of you is my favorite habit, and holding your hand is my favorite hobby. 🥰",
    "Secret Love Note #3: You just unlocked an unlimited lifetime pass for warm cuddles, forehead kisses, and back rubs! 🎟️",
    "Secret Love Note #4: Plot twist: I loved you yesterday, I love you today, and I'll love you even more tomorrow! 💖",
    "Secret Love Note #5: In a room full of art, I would still stare at you. ✨",
  ];

  const handleOpenWorld = () => {
    setHasEntered(true);
    sessionStorage.setItem("entered_world", "true");
    // Start procedural romantic lofi beat softly
    lofiAudio.start();
    lofiAudio.playKissChime();
  };

  const handleSendKiss = () => {
    setKissTrigger((prev) => prev + 1);
    lofiAudio.playKissChime();
  };

  const handleSaveName = (newName: string) => {
    setLoverName(newName);
    localStorage.setItem("lover_name", newName);
  };

  const handleSaveDate = (newDate: string) => {
    setAnniversaryDate(newDate);
    localStorage.setItem("anniversary_date", newDate);
  };

  const triggerEasterEgg = () => {
    const randomMsg = easterEggPool[Math.floor(Math.random() * easterEggPool.length)];
    setEasterEggMessage(randomMsg);
    lofiAudio.playKissChime();
    setKissTrigger((prev) => prev + 1);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[#faf6f0] text-rose-950 font-sans selection:bg-rose-200 selection:text-rose-900 relative">
      {/* Interactive Cursor Trail & Kiss Shower Canvas */}
      <HeartTrailCanvas kissTrigger={kissTrigger} />

      {/* Secret Easter Egg Toast */}
      <EasterEggToast
        message={easterEggMessage}
        onClose={() => setEasterEggMessage(null)}
      />

      {/* Grand Welcome Entrance Overlay */}
      <AnimatePresence>
        {!hasEntered && (
          <WelcomeScreen
            loverName={loverName}
            onOpen={handleOpenWorld}
            onEasterEggHeart={triggerEasterEgg}
          />
        )}
      </AnimatePresence>

      {/* Main Love Experience */}
      {hasEntered && (
        <div className="relative z-10 flex flex-col min-h-screen">
          {/* Top Bar Contract compliant navigation */}
          <TopNavbar
            loverName={loverName}
            onSendKiss={handleSendKiss}
            onOpenSettings={() => setIsSettingsOpen(true)}
          />

          {/* Quick Personalization Pill Bar */}
          <div className="bg-rose-50/70 border-b border-rose-100 py-2 px-4 text-center text-xs text-rose-800 flex items-center justify-center gap-2">
            <span>Crafted with love for</span>
            <strong className="font-semibold text-rose-900 underline decoration-rose-300 underline-offset-2">
              {loverName}
            </strong>
            <button
              onClick={() => setIsSettingsOpen(true)}
              className="inline-flex items-center gap-1 text-[11px] font-medium text-rose-600 hover:text-rose-900 ml-1 cursor-pointer"
            >
              <SlidersHorizontal className="h-3 w-3" />
              <span>(customize name/date)</span>
            </button>
          </div>

          <main className="flex-1 pb-16">
            {/* Live Anniversary Counter */}
            <AnniversaryCounter
              startDateStr={anniversaryDate}
              loverName={loverName}
              onEditDate={() => setIsSettingsOpen(true)}
            />

            {/* A Message From My Heart */}
            <div id="letter">
              <LoveLetter loverName={loverName} />
            </div>

            {/* Why You're So Special */}
            <div id="reasons">
              <ReasonsSection loverName={loverName} />
            </div>

            {/* Our Little Love Gallery */}
            <div id="gallery">
              <PhotoGallery loverName={loverName} />
            </div>

            {/* A Little Love Quiz */}
            <div id="quiz">
              <LoveQuiz
                loverName={loverName}
                onSendKiss={handleSendKiss}
              />
            </div>

            {/* Open When You Need Love Envelopes */}
            <div id="envelopes">
              <OpenWhenEnvelopes loverName={loverName} />
            </div>

            {/* A Million Reasons to Smile Button */}
            <div id="smile">
              <SmileGenerator
                loverName={loverName}
                onHeartBurst={() => setKissTrigger((prev) => prev + 1)}
              />
            </div>

            {/* The Final Celestial Night Sky Surprise */}
            <div id="final">
              <CelestialNightSky
                loverName={loverName}
                onSendKiss={handleSendKiss}
              />
            </div>
          </main>

          {/* Quiet, Elegant Footer */}
          <footer className="relative z-10 border-t border-rose-100 bg-white/70 py-8 px-6 text-center text-xs text-rose-800/80">
            <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={triggerEasterEgg}
                  className="cursor-pointer hover:scale-125 transition-transform p-0.5"
                  title="Click me for a secret!"
                >
                  <Heart className="h-4 w-4 fill-rose-500 text-rose-500" />
                </button>
                <span className="font-medium">
                  Built purely with love for {loverName} · Today &amp; For All Tomorrows
                </span>
              </div>

              <div className="flex items-center gap-4 text-xs">
                <button
                  onClick={() => setIsSettingsOpen(true)}
                  className="hover:text-rose-950 transition-colors cursor-pointer"
                >
                  Personalize
                </button>
                <button
                  onClick={handleSendKiss}
                  className="hover:text-rose-950 transition-colors cursor-pointer"
                >
                  Send Kiss 💋
                </button>
                <button
                  onClick={scrollToTop}
                  className="inline-flex items-center gap-1 hover:text-rose-950 transition-colors cursor-pointer"
                >
                  <span>Back to top</span>
                  <ArrowUp className="h-3 w-3" />
                </button>
              </div>
            </div>
          </footer>

          {/* Floating Procedural Romantic Lofi Dock */}
          <LofiPlayer />

          {/* Personalization Modal */}
          <PersonalizeModal
            isOpen={isSettingsOpen}
            onClose={() => setIsSettingsOpen(false)}
            currentName={loverName}
            onSaveName={handleSaveName}
            currentDate={anniversaryDate}
            onSaveDate={handleSaveDate}
          />
        </div>
      )}
    </div>
  );
}
