// src/components/CoursesLoading.tsx
export default function CoursesLoading() {
  return (
    <>
      {Array.from({ length: 4 }).map((_, i) => (
        <div 
          key={i} 
          className="rounded-2xl border border-white/5 bg-[#0e0e16]/80 p-5 flex flex-col gap-4 min-h-[180px] animate-pulse select-none"
        >
          {/* Icon skeleton */}
          <div className="w-[38px] h-[38px] rounded-xl bg-white/[0.03] border border-white/5" />
          
          {/* Title skeleton */}
          <div className="flex-1 space-y-2 mt-1">
            <div className="h-3.5 bg-white/[0.03] rounded-md w-4/5" />
            <div className="h-2.5 bg-white/[0.02] rounded-md w-2/5" />
          </div>

          {/* Progress skeleton */}
          <div className="space-y-2">
            <div className="flex justify-between">
              <div className="h-2.5 bg-white/[0.02] rounded-md w-1/4" />
              <div className="h-2.5 bg-white/[0.03] rounded-md w-1/12" />
            </div>
            <div className="h-1.5 bg-white/[0.02] rounded-full w-full" />
          </div>
        </div>
      ))}
    </>
  );
}