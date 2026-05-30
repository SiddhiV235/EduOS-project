"use client";
import { motion } from "framer-motion";
import { Flame, Trophy, Sparkles } from "lucide-react";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const STREAK = [true, true, true, true, false, false, false]; // Active Mon-Thu

const heroVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: { 
      type: "spring", 
      stiffness: 260, 
      damping: 22,
      staggerChildren: 0.05,
      delayChildren: 0.1
    }
  },
  hover: {
    scale: 1.01,
    borderColor: "rgba(124,111,247,0.25)",
    boxShadow: "0 15px 35px -10px rgba(124,111,247,0.12), 0 0 0 1px rgba(124,111,247,0.15)",
    transition: { type: "spring", stiffness: 300, damping: 20 }
  }
};

const dotVariants = {
  hidden: { opacity: 0, scale: 0.5 },
  show: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 300, damping: 15 } }
};

export function HeroTile() {
  return (
    <motion.article 
      variants={heroVariants} 
      initial="hidden" 
      animate="show" 
      whileHover="hover"
      className="relative overflow-hidden rounded-2xl bg-[#0e0e16]/80 border border-white/5 p-6 text-white min-h-[200px] flex flex-col justify-between"
    >
      {/* Abstract radial mesh bg */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(124,111,247,0.12),transparent_70%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_80%,rgba(34,211,238,0.06),transparent_60%)] pointer-events-none" />
      
      {/* Blurred glow circle in top right */}
      <div className="absolute -top-16 -right-16 w-44 h-44 bg-violet-600/10 rounded-full filter blur-[40px] pointer-events-none" />
      
      {/* SVG Grain Overlay */}
      <div className="absolute inset-0 opacity-[0.025] pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }} />

      <div className="relative z-10 flex flex-col gap-2">
        <div className="flex items-center gap-1.5 text-violet-400 font-medium tracking-widest text-[10px] uppercase font-display">
          <Sparkles size={10} className="animate-pulse" />
          <span>Dashboard Overview</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight leading-tight">
          Welcome back,{" "}
          <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent font-display">
            Arjun.
          </span>
        </h1>
        <p className="text-xs text-white/50 max-w-md">
          You&apos;ve completed <strong className="text-white/80 font-semibold">4 modules</strong> this week. Keep up the high performance!
        </p>
      </div>

      <div className="relative z-10 flex flex-wrap items-center gap-4 mt-6 pt-4 border-t border-white/5">
        {/* Streak badge */}
        <div className="flex items-center gap-2 bg-amber-500/[0.06] border border-amber-500/25 rounded-xl px-3.5 py-2 text-amber-400 shadow-[0_0_15px_rgba(251,191,36,0.05)]">
          <Flame size={15} className="fill-amber-500 animate-bounce" style={{ animationDuration: "2s" }} /> 
          <div className="flex flex-col">
            <span className="text-sm font-bold leading-none">14 Days</span>
            <span className="text-[9px] text-amber-500/70 font-medium tracking-wide">learning streak</span>
          </div>
        </div>

        {/* Weekly dots */}
        <div className="flex gap-2.5 items-center">
          {DAYS.map((day, i) => {
            const active = STREAK[i];
            return (
              <div key={day} className="flex flex-col items-center gap-1.5">
                <motion.div 
                  variants={dotVariants}
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs transition-all duration-300 ${
                    active 
                      ? "bg-amber-500/20 border border-amber-500/40 text-amber-300 shadow-[0_0_10px_rgba(251,191,36,0.15)]" 
                      : "bg-[#141420] border border-white/5 text-white/30"
                  }`}
                >
                  {active ? <Flame size={12} className="fill-amber-500/80 text-amber-400" /> : day[0]}
                </motion.div>
                <span className="text-[9px] text-white/30 font-medium">{day[0]}</span>
              </div>
            );
          })}
        </div>

        {/* XP Badge */}
        <div className="ml-auto flex items-center gap-2.5 bg-violet-500/[0.06] border border-violet-500/25 rounded-xl px-3.5 py-2 text-violet-300 shadow-[0_0_15px_rgba(124,111,247,0.05)]">
          <Trophy size={14} className="text-violet-400 animate-pulse" /> 
          <div className="flex flex-col">
            <span className="text-sm font-bold leading-none">1,240 XP</span>
            <span className="text-[9px] text-violet-400/70 font-medium tracking-wide">total points</span>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

