"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LayoutDashboard, BookOpen, BarChart3, Settings, GraduationCap } from "lucide-react";

const NAV = [
  { icon: LayoutDashboard, label: "Dashboard", id: "dashboard" },
  { icon: BookOpen,        label: "Courses",   id: "courses"   },
  { icon: BarChart3,       label: "Analytics", id: "analytics" },
  { icon: Settings,        label: "Settings",  id: "settings"  },
];

export function Sidebar() {
  const [active, setActive] = useState("dashboard");
  const [collapsed, setCollapsed] = useState(false);

  return (
    <motion.nav 
      animate={{ width: collapsed ? 64 : 220 }}
      className="hidden md:flex flex-col h-screen bg-[#0f0f17] border-r border-white/5 relative flex-shrink-0"
    >
      <div className="flex items-center gap-3 px-4 py-5 border-b border-white/5">
        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-600 flex items-center justify-center">
          <GraduationCap size={16} className="text-white" />
        </div>
        {!collapsed && <span className="text-sm font-semibold text-white">EduOS</span>}
      </div>
      <div className="flex flex-col gap-1 p-2 flex-1">
        {NAV.map(({ icon: Icon, label, id }) => (
          <button key={id} onClick={() => setActive(id)} className="relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-left w-full text-white">
            {active === id && (
              <motion.div layoutId="nav-highlight" className="absolute inset-0 bg-violet-500/10 rounded-xl" />
            )}
            <Icon size={18} className="relative z-10" />
            {!collapsed && <span className="relative z-10 text-sm">{label}</span>}
          </button>
        ))}
      </div>
      <button onClick={() => setCollapsed(!collapsed)} className="absolute top-[74px] -right-3 w-6 h-6 rounded-full bg-[#1a1a26] border border-white/10 text-white text-xs flex items-center justify-center">
        {collapsed ? "›" : "‹"}
      </button>
    </motion.nav>
  );
}

export function MobileNav() {
  const [active, setActive] = useState("dashboard");
  return (
    <nav className="fixed bottom-0 inset-x-0 md:hidden bg-[#0f0f17]/90 backdrop-blur-lg border-t border-white/5 flex justify-around py-2 z-50">
      {NAV.map(({ icon: Icon, id }) => (
        <button key={id} onClick={() => setActive(id)} className="relative p-3 text-white">
          {active === id && <motion.div layoutId="mobile-highlight" className="absolute inset-0 bg-violet-500/10 rounded-xl" />}
          <Icon size={20} className="relative z-10" />
        </button>
      ))}
    </nav>
  );
}