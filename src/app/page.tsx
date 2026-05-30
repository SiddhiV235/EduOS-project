import { Sidebar, MobileNav } from "@/components/sidebar";
import { HeroTile } from "@/components/herotile";
import { ActivityChart } from "@/components/activitychart";
// src/app/page.tsx
import { Suspense } from "react";

import { CourseGrid } from "@/components/coursegrid";
import CoursesLoading from "@/components/courseloading";

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen bg-[#06060c] text-[#f0efff] relative overflow-hidden">
      {/* Background glow meshes */}
      <div className="absolute top-1/4 left-1/4 w-[350px] h-[350px] rounded-full bg-violet-600/[0.03] filter blur-[100px] pointer-events-none z-0" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-fuchsia-600/[0.02] filter blur-[120px] pointer-events-none z-0" />

      <Sidebar />
      
      <main className="flex-1 overflow-auto pb-28 md:pb-8 relative z-10">
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-8">
          {/* Header */}
          <header className="mb-8 relative z-10 flex justify-between items-center select-none">
            <div>
              <span className="text-[10px] text-violet-400 font-semibold tracking-widest uppercase font-display bg-violet-500/[0.04] border border-violet-500/10 rounded-full px-2 py-0.5">
                Workspace
              </span>
              <h2 className="text-xl font-bold tracking-tight text-white/90 font-display mt-2">
                Student Dashboard
              </h2>
            </div>
            <div className="hidden sm:flex items-center gap-3">
              <span className="text-xs text-white/40">Status: <span className="text-emerald-400 font-semibold">Sync Active</span></span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            </div>
          </header>

          {/* Bento Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            
            <div className="md:col-span-2">
              <HeroTile />
            </div>

            {/* Live Courses Data Flow wrapped cleanly inside an RSC Suspense boundary */}
            <Suspense fallback={<CoursesLoading />}>
              <CourseGrid />
            </Suspense>

            <div className="md:col-span-2 lg:col-span-3">
              <ActivityChart />
            </div>

          </div>
        </div>
      </main>

      <MobileNav />
    </div>
  );
}