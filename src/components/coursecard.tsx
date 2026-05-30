"use client";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect } from "react";
import { Code2, Brain, Database, Layers, BookOpen, LucideIcon } from "lucide-react";
import type { Course } from "@/types";

const ICON_MAP: Record<string, LucideIcon> = {
  Code2,
  Brain,
  Database,
  Layers,
  BookOpen
};

interface ThemeProps {
  color: string;
  glow: string;
  gradient: string;
}

const getCourseTheme = (iconName: string): ThemeProps => {
  switch (iconName) {
    case "Code2":
      return {
        color: "text-violet-400 border-violet-500/20",
        glow: "rgba(124,111,247,0.15)",
        gradient: "from-violet-500 to-fuchsia-500"
      };
    case "Brain":
      return {
        color: "text-cyan-400 border-cyan-500/20",
        glow: "rgba(34,211,238,0.15)",
        gradient: "from-cyan-500 to-emerald-500"
      };
    case "Database":
      return {
        color: "text-emerald-400 border-emerald-500/20",
        glow: "rgba(52,211,153,0.15)",
        gradient: "from-emerald-500 to-teal-500"
      };
    case "Layers":
      return {
        color: "text-amber-400 border-amber-500/20",
        glow: "rgba(251,191,36,0.15)",
        gradient: "from-amber-500 to-orange-500"
      };
    default:
      return {
        color: "text-violet-400 border-violet-500/20",
        glow: "rgba(124,111,247,0.15)",
        gradient: "from-violet-500 to-fuchsia-500"
      };
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 15 },
  show: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 22,
      delay: index * 0.08 + 0.15
    }
  }),
  hover: {
    scale: 1.015,
    y: -3,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20
    }
  }
};

export function CourseCard({ course, index = 0 }: { course: Course; index?: number }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, v => Math.round(v));
  const theme = getCourseTheme(course.icon_name);
  const IconComponent = ICON_MAP[course.icon_name] || BookOpen;

  useEffect(() => {
    animate(count, course.progress, { duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.4 });
  }, [count, course.progress]);

  return (
    <motion.article
      variants={cardVariants}
      custom={index}
      initial="hidden"
      animate="show"
      whileHover="hover"
      className="relative overflow-hidden rounded-2xl bg-[#0e0e16]/80 border border-white/5 p-5 flex flex-col gap-4 min-h-[180px] group cursor-pointer"
    >
      {/* Background radial glow */}
      <div 
        className="absolute inset-0 pointer-events-none transition-opacity duration-300 group-hover:opacity-100" 
        style={{ 
          background: `radial-gradient(ellipse at 20% 20%, ${theme.glow} 0%, transparent 65%)` 
        }} 
      />
      
      {/* SVG Grain Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.025] pointer-events-none" 
        style={{ 
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` 
        }} 
      />

      {/* Glow outline on hover */}
      <motion.div 
        className={`absolute inset-0 border rounded-2xl pointer-events-none`}
        initial={{ opacity: 0, borderColor: "rgba(255,255,255,0)" }}
        whileHover={{ 
          opacity: 1, 
          borderColor: "rgba(255,255,255,0.08)",
          boxShadow: `0 0 25px ${theme.glow}` 
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      />
      
      {/* Header Info */}
      <div className="flex justify-between items-start relative z-10">
        <div className={`p-2.5 rounded-xl bg-[#141424] border border-white/5 shadow-md ${theme.color} group-hover:scale-105 transition-transform duration-300`}>
          <IconComponent size={18} />
        </div>
        <span className="text-[10px] text-white/30 uppercase tracking-widest font-semibold font-display bg-white/[0.02] border border-white/5 rounded-full px-2 py-0.5">
          Active
        </span>
      </div>

      {/* Title */}
      <div className="flex-1 relative z-10">
        <h3 className="text-sm font-semibold text-white/90 group-hover:text-white transition-colors line-clamp-2 leading-snug">
          {course.title}
        </h3>
        <p className="text-[10px] text-white/35 mt-1 font-medium tracking-wide">Standard Learning Path</p>
      </div>

      {/* Progress Section */}
      <div className="space-y-2.5 relative z-10">
        <div className="flex justify-between items-center text-[10px] font-medium text-white/40">
          <span>Overall Progress</span>
          <span className="tabular-nums font-semibold text-white/70">
            <motion.span>{rounded}</motion.span>%
          </span>
        </div>
        <div className="h-1.5 rounded-full bg-[#12121e] overflow-hidden">
          <motion.div 
            className={`h-full rounded-full bg-gradient-to-r ${theme.gradient}`}
            initial={{ width: "0%" }}
            animate={{ width: `${course.progress}%` }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
          />
        </div>
      </div>
    </motion.article>
  );
}