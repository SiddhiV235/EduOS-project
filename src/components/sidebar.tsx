"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LayoutDashboard, BookOpen, BarChart3, Settings, GraduationCap, Sparkles } from "lucide-react";

const NAV = [
  { icon: LayoutDashboard, label: "Dashboard", id: "dashboard" },
  { icon: BookOpen,        label: "Courses",   id: "courses"   },
  { icon: BarChart3,       label: "Analytics", id: "analytics" },
  { icon: Settings,        label: "Settings",  id: "settings"  },
];

export function Sidebar() {
  const [active, setActive] = useState("dashboard");
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setCollapsed(true);
      } else {
        setCollapsed(false);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <aside className="hidden md:block flex-shrink-0 relative z-30">
      <motion.nav 
        animate={{ width: collapsed ? 72 : 220 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="flex flex-col h-screen bg-[#0a0a0f]/60 backdrop-blur-xl border-r border-white/5 relative overflow-hidden"
      >
        {/* Glow behind logo */}
        <div className="absolute -top-10 -left-10 w-32 h-32 bg-violet-600/10 rounded-full filter blur-2xl pointer-events-none" />
        
        {/* Logo */}
        <div className="flex items-center gap-3 px-5 py-6 border-b border-white/5 relative z-10">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-500 via-fuchsia-500 to-cyan-500 flex items-center justify-center shadow-[0_0_15px_rgba(124,111,247,0.3)]">
            <GraduationCap size={16} className="text-white" />
          </div>
          <AnimatePresence initial={false}>
            {!collapsed && (
              <motion.span 
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.2 }}
                className="text-sm font-semibold text-white tracking-wide font-display overflow-hidden whitespace-nowrap"
              >
                EduOS
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        {/* Nav list */}
        <div className="flex flex-col gap-1.5 p-3 flex-1 relative z-10">
          {NAV.map(({ icon: Icon, label, id }) => {
            const isActive = active === id;
            return (
              <button 
                key={id} 
                onClick={() => setActive(id)} 
                className="relative flex items-center gap-3 px-3 py-3 rounded-xl text-left w-full transition-colors duration-200"
                style={{ color: isActive ? "#ffffff" : "rgba(240,239,255,0.4)" }}
              >
                {/* Accent line on left */}
                {isActive && (
                  <motion.div 
                    layoutId="active-line"
                    className="absolute left-0 top-2.5 bottom-2.5 w-1 rounded-r-full bg-gradient-to-b from-violet-400 to-fuchsia-500"
                    transition={{ type: "spring", stiffness: 350, damping: 25 }}
                  />
                )}
                {/* Background highlight */}
                {isActive && (
                  <motion.div 
                    layoutId="nav-highlight" 
                    className="absolute inset-0 bg-violet-500/[0.08] border border-violet-500/10 rounded-xl"
                    transition={{ type: "spring", stiffness: 350, damping: 25 }}
                  />
                )}
                <Icon size={18} className={`relative z-10 transition-transform duration-200 ${isActive ? "text-violet-400 scale-105" : "text-white/40"}`} />
                <AnimatePresence initial={false}>
                  {!collapsed && (
                    <motion.span 
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.15 }}
                      className="relative z-10 text-xs font-medium tracking-wide overflow-hidden whitespace-nowrap"
                    >
                      {label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            );
          })}
        </div>

        {/* Profile Card */}
        <div className="p-3 border-t border-white/5 bg-[#0d0d16]/30 relative z-10">
          <div className="flex items-center gap-3 px-2 py-2 rounded-xl">
            <div className="relative">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-violet-600 to-cyan-500 flex items-center justify-center text-xs font-bold text-white shadow-md">
                AR
              </div>
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-[#0a0a0f]" />
            </div>
            <AnimatePresence initial={false}>
              {!collapsed && (
                <motion.div 
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: "auto" }}
                  exit={{ opacity: 0, width: 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex flex-col overflow-hidden whitespace-nowrap"
                >
                  <span className="text-xs font-semibold text-white/90">Arjun R.</span>
                  <span className="text-[10px] text-violet-400/70 font-medium flex items-center gap-1">
                    <Sparkles size={8} /> Pro Learner
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Collapse toggle button */}
        <button 
          onClick={() => setCollapsed(!collapsed)} 
          className="absolute top-[22px] -right-1 translate-x-1/2 w-6 h-6 rounded-full bg-[#12121e] border border-white/10 text-white/60 hover:text-white hover:border-violet-500/40 text-xs flex items-center justify-center shadow-lg transition-all duration-200 z-20 cursor-pointer"
        >
          {collapsed ? "›" : "‹"}
        </button>
      </motion.nav>
    </aside>
  );
}

export function MobileNav() {
  const [active, setActive] = useState("dashboard");
  return (
    <nav className="fixed bottom-0 inset-x-0 md:hidden bg-[#07070c]/80 backdrop-blur-xl border-t border-white/5 flex justify-around py-3 z-50 shadow-[0_-10px_30px_rgba(0,0,0,0.5)]">
      {NAV.map(({ icon: Icon, id }) => {
        const isActive = active === id;
        return (
          <button 
            key={id} 
            onClick={() => setActive(id)} 
            className="relative p-2.5 text-white/50 hover:text-white transition-colors"
          >
            {isActive && (
              <motion.div 
                layoutId="mobile-highlight" 
                className="absolute inset-0 bg-violet-500/10 border border-violet-500/10 rounded-xl"
                transition={{ type: "spring", stiffness: 380, damping: 28 }}
              />
            )}
            <Icon 
              size={20} 
              className={`relative z-10 transition-all ${isActive ? "text-violet-400 scale-110" : "text-white/40"}`} 
            />
          </button>
        );
      })}
    </nav>
  );
}