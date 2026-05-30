"use client";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect } from "react";
import * as Icons from "lucide-react";
import { cardHoverVariants } from "@/lib/animation";
import type { Course } from "@/types";

export function CourseCard({ course }: { course: Course }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, v => Math.round(v));

  useEffect(() => {
    animate(count, course.progress, { duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.4 });
  }, [count, course.progress]);

  return (
    <motion.article
      variants={cardHoverVariants} initial="rest" whileHover="hover"
      className="relative overflow-hidden rounded-2xl bg-[#14141e] border border-white/5 p-5 flex flex-col gap-3 min-h-[180px]"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_20%,rgba(124,111,247,0.15),transparent_65%)] pointer-events-none" />
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }} />
      
      <div className="text-violet-400"><Icons.BookOpen size={18} /></div>
      <div className="flex-1">
        <h3 className="text-sm font-medium text-white">{course.title}</h3>
        <p className="text-xs text-white/30 mt-1">Active course</p>
      </div>
      <div className="space-y-2">
        <div className="flex justify-between text-xs text-white/50">
          <span>Progress</span>
          <span className="tabular-nums"><motion.span>{rounded}</motion.span>%</span>
        </div>
        <div className="h-1.5 rounded-full bg-[#1f1f2e] overflow-hidden">
          <div className="h-full rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500" style={{ width: `${course.progress}%` }} />
        </div>
      </div>
    </motion.article>
  );
}