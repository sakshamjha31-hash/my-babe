import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Play, Pause, SkipForward, Volume2, VolumeX, Music, Heart, Disc3 } from "lucide-react";
import { lofiAudio } from "../utils/audio.ts";

export const LofiPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [trackName, setTrackName] = useState(lofiAudio.getCurrentTrackName());
  const [volume, setVolume] = useState(0.55);
  const [isMuted, setIsMuted] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const togglePlay = () => {
    const nextState = lofiAudio.toggle();
    setIsPlaying(nextState);
    setTrackName(lofiAudio.getCurrentTrackName());
  };

  const handleNextTrack = () => {
    const nextName = lofiAudio.nextTrack();
    setTrackName(nextName);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVol = parseFloat(e.target.value);
    setVolume(newVol);
    if (newVol > 0) setIsMuted(false);
    lofiAudio.setVolume(newVol);
  };

  const toggleMute = () => {
    if (isMuted) {
      lofiAudio.setVolume(volume);
      setIsMuted(false);
    } else {
      lofiAudio.setVolume(0);
      setIsMuted(true);
    }
  };

  return (
    <div className="fixed bottom-5 left-5 z-40 select-none">
      <div className="flex items-center gap-2">
        {/* Main Dock Container */}
        <div className="flex items-center gap-3 rounded-full bg-white/95 backdrop-blur-md px-4 py-2.5 shadow-[0_8px_30px_rgba(225,29,72,0.18)] border border-rose-200/90 text-rose-950">
          {/* Vinyl Disc Icon */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="relative flex items-center justify-center p-1 cursor-pointer focus:outline-none"
            title="Music settings"
          >
            <Disc3
              className={`h-5 w-5 text-rose-600 ${isPlaying ? "animate-spin" : ""}`}
              style={{ animationDuration: "5s" }}
            />
            {isPlaying && (
              <span className="absolute -top-1 -right-1 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
              </span>
            )}
          </button>

          {/* Track Name & Visualizer */}
          <div className="hidden sm:flex flex-col">
            <span className="text-xs font-semibold text-rose-950 truncate max-w-[140px]">
              {trackName}
            </span>
            <div className="flex items-center gap-1.5 text-[10px] text-rose-600/80 font-medium">
              <span>Lofi Romance Beats</span>
              {isPlaying && (
                <div className="flex items-end gap-0.5 h-2.5">
                  <span className="w-0.5 h-2 bg-rose-500 animate-pulse" />
                  <span className="w-0.5 h-3 bg-pink-500 animate-pulse" style={{ animationDelay: "0.2s" }} />
                  <span className="w-0.5 h-1.5 bg-rose-400 animate-pulse" style={{ animationDelay: "0.4s" }} />
                </div>
              )}
            </div>
          </div>

          {/* Play/Pause Button */}
          <button
            onClick={togglePlay}
            className="flex items-center justify-center h-8 w-8 rounded-full bg-gradient-to-r from-rose-600 to-pink-600 text-white shadow-xs hover:from-rose-700 hover:to-pink-700 transition-all cursor-pointer focus:outline-none"
            title={isPlaying ? "Pause background music" : "Play romantic lofi music"}
          >
            {isPlaying ? (
              <Pause className="h-4 w-4 fill-white" />
            ) : (
              <Play className="h-4 w-4 fill-white ml-0.5" />
            )}
          </button>

          {/* Next Track Button */}
          <button
            onClick={handleNextTrack}
            className="p-1 text-rose-600 hover:text-rose-950 transition-colors cursor-pointer"
            title="Next romantic track"
          >
            <SkipForward className="h-4 w-4" />
          </button>

          {/* Volume Mute */}
          <button
            onClick={toggleMute}
            className="p-1 text-rose-600 hover:text-rose-950 transition-colors cursor-pointer"
            title={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? (
              <VolumeX className="h-4 w-4 text-rose-400" />
            ) : (
              <Volume2 className="h-4 w-4" />
            )}
          </button>

          {/* Expanded volume slider on larger screens */}
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={isMuted ? 0 : volume}
            onChange={handleVolumeChange}
            className="hidden md:block w-16 h-1 bg-rose-200 rounded-lg appearance-none cursor-pointer accent-rose-600"
            title="Volume"
          />
        </div>
      </div>
    </div>
  );
};
