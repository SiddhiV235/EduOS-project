import { Sidebar, MobileNav } from "@/components/sidebar";
import { HeroTile } from "@/components/herotile";
import { CourseCard } from "@/components/coursecard";
import { ActivityChart } from "@/components/activitychart";

// Fallback data satisfying database contracts
const MOCK_COURSES = [
  { id: "1", title: "Advanced React Patterns", progress: 75, icon_name: "Code2", created_at: "" },
  { id: "2", title: "Machine Learning Foundations", progress: 42, icon_name: "Brain", created_at: "" },
  { id: "3", title: "Database Design & SQL", progress: 91, icon_name: "Database", created_at: "" },
  { id: "4", title: "TypeScript Deep Dive", progress: 28, icon_name: "Layers", created_at: "" },
];

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
            {MOCK_COURSES.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
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