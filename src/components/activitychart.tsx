"use client";
import { motion } from "framer-motion";
import { Activity, Sparkles } from "lucide-react";

const HEAT_COLORS = [
  "bg-white/[0.02] border border-white/[0.02]",
  "bg-violet-950/30 border border-violet-900/10",
  "bg-violet-800/40 border border-violet-700/10",
  "bg-violet-500/60 border border-violet-400/20",
  "bg-gradient-to-br from-violet-400 via-fuchsia-400 to-cyan-400 shadow-[0_0_12px_rgba(168,85,247,0.25)] border-none"
];

// 14 weeks x 7 days
const GRID = Array.from({ length: 15 }, () =>
  Array.from({ length: 7 }, (_, d) => {
    const isWeekend = d === 0 || d === 6;
    const r = Math.random();
    return r < 0.15 ? 0 : r < (isWeekend ? 0.35 : 0.6) ? 1 : r < 0.8 ? 2 : r < 0.93 ? 3 : 4;
  })
);

const chartVariants = {
  hidden: { opacity: 0, y: 15 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 22,
      delay: 0.3
    }
  },
  hover: {
    scale: 1.01,
    borderColor: "rgba(124,111,247,0.2)",
    boxShadow: "0 15px 35px -10px rgba(124,111,247,0.08)",
    transition: { type: "spring", stiffness: 300, damping: 20 }
  }
};

export function ActivityChart() {
  const activeDays = GRID.flat().filter(v => v > 0).length;

  return (
    <motion.article 
      variants={chartVariants} 
      initial="hidden" 
      animate="show" 
      whileHover="hover"
      className="rounded-2xl bg-[#0e0e16]/80 border border-white/5 p-6 md:col-span-2 text-white relative overflow-hidden flex flex-col gap-4"
    >
      {/* Background radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_10%_10%,rgba(124,111,247,0.05),transparent_60%)] pointer-events-none" />

      {/* Header */}
      <div className="flex justify-between items-center relative z-10">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-violet-500/10 border border-violet-500/20 text-violet-400">
            <Activity size={14} className="animate-pulse" />
          </div>
          <div>
            <h3 className="text-xs font-semibold tracking-wider uppercase text-white/40 font-display">Learning Activity</h3>
            <p className="text-[10px] text-white/25 mt-0.5">Mock Contribution Graph</p>
          </div>
        </div>
        <div className="text-right">
          <span className="text-xs font-bold text-violet-400">{activeDays} active days</span>
          <p className="text-[9px] text-white/30">this semester</p>
        </div>
      </div>

      {/* Graph Area */}
      <div className="relative z-10 flex gap-2 overflow-x-auto pb-2 scrollbar-none">
        {/* Row labels */}
        <div className="flex flex-col justify-between text-[8px] text-white/20 select-none pr-1 pt-1.5 pb-1.5 font-medium">
          <span>Mon</span>
          <span>Wed</span>
          <span>Fri</span>
          <span>Sun</span>
        </div>

        {/* Heatmap Grid */}
        <div className="flex gap-[3.5px] flex-1">
          {GRID.map((week, wi) => (
            <div key={wi} className="flex flex-col gap-[3.5px] flex-1">
              {week.map((level, di) => (
                <motion.div
                  key={di} 
                  className={`h-2.5 rounded-[2.5px] w-full transition-all duration-300 ${HEAT_COLORS[level]}`}
                  initial={{ opacity: 0, scale: 0.6 }} 
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ 
                    delay: 0.45 + (wi * 7 + di) * 0.002, 
                    type: "spring", 
                    stiffness: 400, 
                    damping: 20 
                  }}
                  whileHover={{ scale: 1.25, zIndex: 10 }}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Footer Legend */}
      <div className="relative z-10 flex items-center justify-between mt-2 pt-3 border-t border-white/5">
        <div className="flex items-center gap-1.5 text-[9px] text-white/30 font-medium">
          <Sparkles size={10} className="text-violet-400" />
          <span>Staggered coordinate entrance triggers GPU-accelerated spring animations</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-[9px] text-white/35 font-medium">Less</span>
          <div className="flex gap-1">
            {HEAT_COLORS.map((c, i) => (
              <div key={i} className={`w-2.5 h-2.5 rounded-[2px] ${c.split(" ").slice(0, 2).join(" ")}`} />
            ))}
          </div>
          <span className="text-[9px] text-white/35 font-medium">More</span>
        </div>
      </div>
    </motion.article>
  );
}