// src/components/CoursesLoading.tsx
export default function CoursesLoading() {
  return (
    <>
      {Array.from({ length: 4 }).map((_, i) => (
        <div 
          key={i} 
          className="rounded-2xl border border-white/5 animate-pulse bg-gradient-to-r from-[#14141e] via-[#1f1f2e] to-[#14141e] min-h-[180px]"
        />
      ))}
    </>
  );
}