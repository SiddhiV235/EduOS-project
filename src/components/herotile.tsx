"use client";
import { motion } from "framer-motion";
import { cardHoverVariants } from "@/lib/animation";
import { Flame, Trophy } from "lucide-react";

export function HeroTile() {
  return (
    <motion.article variants={cardHoverVariants} initial="rest" whileHover="hover" className="relative overflow-hidden rounded-2xl bg-[#14141e] border border-white/5 p-6 md:col-span-2 text-white">
      <div className="absolute inset-0 bg-gradient-to-br from-violet-600/10 via-fuchsia-600/5 to-cyan-600/5 pointer-events-none" />
      <div className="relative z-10 flex flex-col gap-4 h-full justify-between">
        <div>
          <p className="text-xs text-white/30 uppercase tracking-widest mb-1">Good afternoon</p>
          <h1 className="text-3xl font-bold">Welcome back, <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">Arjun.</span></h1>
        </div>
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 rounded-xl px-3 py-2 text-amber-400">
            <Flame size={16} /> <span className="text-sm font-semibold">14 Day Streak</span>
          </div>
          <div className="ml-auto flex items-center gap-2 bg-violet-500/10 border border-violet-500/20 rounded-xl px-3 py-2 text-violet-300">
            <Trophy size={14} /> <span className="text-xs font-medium">1,240 XP</span>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
