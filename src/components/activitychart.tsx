"use client";
import { motion } from "framer-motion";
import { cardHoverVariants } from "@/lib/animation";

const HEAT = ["bg-[#1f1f2e]", "bg-violet-900/60", "bg-violet-700/70", "bg-violet-500/80", "bg-violet-400"];
const GRID = Array.from({ length: 14 }, () =>
  Array.from({ length: 7 }, (_, d) => {
    const r = Math.random();
    return r < 0.15 ? 0 : r < (d === 0 || d === 6 ? 0.3 : 0.6) ? 1 : r < 0.8 ? 2 : 3;
  })
);

export function ActivityChart() {
  return (
    <motion.article variants={cardHoverVariants} initial="rest" whileHover="hover" className="rounded-2xl bg-[#14141e] border border-white/5 p-5 md:col-span-2 text-white">
      <p className="text-xs text-white/50 uppercase tracking-wider mb-4">Activity Insights</p>
      <div className="flex gap-[3px]">
        {GRID.map((week, wi) => (
          <div key={wi} className="flex flex-col gap-[3px] flex-1">
            {week.map((level, di) => (
              <motion.div
                key={di} className={`rounded-[2px] ${HEAT[level]}`} style={{ height: 10 }}
                initial={{ opacity: 0, scale: 0.4 }} animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: (wi * 7 + di) * 0.003, type: "spring", stiffness: 400, damping: 20 }}
              />
            ))}
          </div>
        ))}
      </div>
    </motion.article>
  );
}