import { Sidebar, MobileNav } from "@/components/sidebar";
import { HeroTile } from "@/components/herotile";
import { CourseCard } from "@/components/coursecard";
import { ActivityChart } from "@/components/activitychart";
// src/app/page.tsx
import { Suspense } from "react";

import { CourseGrid } from "@/components/coursegrid";
import CoursesLoading from "@/components/courseloading";

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen bg-[#0a0a0f]">
      <Sidebar />
      
      <main className="flex-1 overflow-auto pb-20 md:pb-0">
        <div className="max-w-5xl mx-auto px-4 md:px-6 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            
            <div className="md:col-span-2">
              <HeroTile />
            </div>

            {/* Live Courses Data Flow wrapped cleanly inside an RSC Suspense boundary */}
            <Suspense fallback={<CoursesLoading />}>
              <CourseGrid />
            </Suspense>

            <div className="md:col-span-2">
              <ActivityChart />
            </div>

          </div>
        </div>
      </main>

      <MobileNav />
    </div>
  );
}