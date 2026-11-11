import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Clock, Calendar, Heart, Sparkles, Edit3 } from "lucide-react";

interface AnniversaryCounterProps {
  startDateStr: string;
  onEditDate: () => void;
  loverName: string;
}

interface TimeElapsed {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  totalDays: number;
}

export const AnniversaryCounter: React.FC<AnniversaryCounterProps> = ({
  startDateStr,
  onEditDate,
  loverName,
}) => {
  const [elapsed, setElapsed] = useState<TimeElapsed>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    totalDays: 0,
  });

  useEffect(() => {
    const calculateTime = () => {
      const start = new Date(startDateStr).getTime();
      const now = Date.now();
      const diffMs = Math.max(0, now - start);

      const totalSeconds = Math.floor(diffMs / 1000);
      const totalMinutes = Math.floor(totalSeconds / 60);
      const totalHours = Math.floor(totalMinutes / 60);
      const totalDays = Math.floor(totalHours / 24);

      const seconds = totalSeconds % 60;
      const minutes = totalMinutes % 60;
      const hours = totalHours % 24;

      setElapsed({
        days: totalDays,
        hours,
        minutes,
        seconds,
        totalDays,
      });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [startDateStr]);

  const units = [
    { label: "Days", value: elapsed.days },
    { label: "Hours", value: elapsed.hours },
    { label: "Minutes", value: elapsed.minutes },
    { label: "Seconds", value: elapsed.seconds },
  ];

  const formattedStartDate = new Date(startDateStr).toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <section className="relative w-full max-w-4xl mx-auto px-4 py-8 sm:py-12">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-white/90 via-rose-50/80 to-purple-50/70 p-6 sm:p-10 shadow-xl border border-rose-200/60 backdrop-blur-md">
        {/* Soft background glow */}
        <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-rose-300/20 blur-2xl" />
        <div className="pointer-events-none absolute -left-16 -bottom-16 h-48 w-48 rounded-full bg-purple-300/20 blur-2xl" />

        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-rose-600 text-xs font-semibold tracking-wider uppercase mb-1">
              <Clock className="h-3.5 w-3.5" />
              <span>Our Eternity Clock</span>
              <span className="text-rose-300">·</span>
              <span className="text-rose-700/80">Since {formattedStartDate}</span>
            </div>
            <h2 className="font-serif-display text-2xl sm:text-3xl font-bold text-rose-950">
              Every Second With You, {loverName}
            </h2>
          </div>

          <button
            onClick={onEditDate}
            className="self-start sm:self-auto inline-flex items-center gap-2 rounded-xl bg-white/80 border border-rose-200/80 px-3.5 py-1.5 text-xs font-medium text-rose-800 hover:bg-rose-100/60 hover:text-rose-950 transition-colors shadow-xs cursor-pointer"
          >
            <Calendar className="h-3.5 w-3.5 text-rose-500" />
            <span>Change Anniversary Date</span>
            <Edit3 className="h-3 w-3 text-rose-400" />
          </button>
        </div>

        {/* Live Counters Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6">
          {units.map((unit) => (
            <motion.div
              key={unit.label}
              whileHover={{ y: -2 }}
              className="relative overflow-hidden rounded-2xl bg-white/90 border border-rose-100 p-4 sm:p-5 text-center shadow-xs"
            >
              <div className="font-mono text-3xl sm:text-4xl md:text-5xl font-bold text-rose-900 tracking-tight tabular-nums">
                {String(unit.value).padStart(2, "0")}
              </div>
              <div className="text-xs font-semibold uppercase tracking-wider text-rose-500/90 mt-1">
                {unit.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Heartfelt milestone quote */}
        <div className="flex items-center justify-center gap-2 pt-2 text-center text-xs sm:text-sm text-rose-900/80 font-medium">
          <Heart className="h-4 w-4 fill-rose-500 text-rose-500 animate-romantic-pulse" />
          <span>
            That is <strong className="text-rose-700 font-semibold">{elapsed.totalDays.toLocaleString()} days</strong> of stolen glances, warm laughter, late-night talks, and falling deeper in love with you every sunrise.
          </span>
          <Sparkles className="h-4 w-4 text-amber-400" />
        </div>
      </div>
    </section>
  );
};
