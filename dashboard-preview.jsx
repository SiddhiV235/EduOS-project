import { useState, useEffect, useRef } from "react";

// ─── Mock Data ───────────────────────────────────────────────────────────────
const COURSES = [
  { id: "1", title: "Advanced React Patterns", progress: 75, icon: "⚛", color: "#7c6ff7", glow: "rgba(124,111,247,0.15)" },
  { id: "2", title: "Machine Learning Foundations", progress: 42, icon: "🧠", color: "#22d3ee", glow: "rgba(34,211,238,0.12)" },
  { id: "3", title: "Database Design & SQL", progress: 91, icon: "🗄", color: "#34d399", glow: "rgba(52,211,153,0.12)" },
  { id: "4", title: "TypeScript Deep Dive", progress: 28, icon: "📦", color: "#fbbf24", glow: "rgba(251,191,36,0.12)" },
];

const NAV_ITEMS = [
  { icon: "⊞", label: "Dashboard", id: "dashboard" },
  { icon: "📖", label: "Courses", id: "courses" },
  { icon: "📊", label: "Analytics", id: "analytics" },
  { icon: "🔔", label: "Alerts", id: "notifications" },
  { icon: "⚙", label: "Settings", id: "settings" },
];

const STATS = [
  { icon: "⏱", label: "Hours This Week", value: "12.4", unit: "hrs", color: "#22d3ee" },
  { icon: "📗", label: "Lessons Done", value: "47", unit: "total", color: "#34d399" },
  { icon: "🏅", label: "Certificates", value: "3", unit: "earned", color: "#fbbf24" },
];

// ─── Animated Counter ────────────────────────────────────────────────────────
function AnimatedCounter({ target, duration = 1200, delay = 400 }) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    let start = null;
    let raf;
    const step = (ts) => {
      if (!start) start = ts + delay;
      if (ts < start) { raf = requestAnimationFrame(step); return; }
      const elapsed = ts - start;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(ease * target));
      if (progress < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, delay]);
  return <>{value}</>;
}

// ─── Heatmap ─────────────────────────────────────────────────────────────────
const HEATMAP = (() => {
  const grid = [];
  for (let w = 0; w < 14; w++) {
    const week = [];
    for (let d = 0; d < 7; d++) {
      const isWknd = d === 0 || d === 6;
      const r = Math.random();
      week.push(r < 0.15 ? 0 : r < (isWknd ? 0.4 : 0.65) ? 1 : r < 0.8 ? 2 : r < 0.92 ? 3 : 4);
    }
    grid.push(week);
  }
  return grid;
})();

const HEAT_COLORS = ["#1a1a26","rgba(109,40,217,0.35)","rgba(109,40,217,0.6)","rgba(124,111,247,0.75)","#7c6ff7"];

// ─── Course Card ─────────────────────────────────────────────────────────────
function CourseCard({ course, index, visible }) {
  const [hovered, setHovered] = useState(false);
  const [animProg, setAnimProg] = useState(0);

  useEffect(() => {
    if (!visible) return;
    let start = null;
    const delay = 400 + index * 80;
    let raf;
    const step = (ts) => {
      if (!start) start = ts + delay;
      if (ts < start) { raf = requestAnimationFrame(step); return; }
      const elapsed = ts - start;
      const p = Math.min(elapsed / 1200, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      setAnimProg(Math.round(ease * course.progress));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [visible, course.progress, index]);

  return (
    <article
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        overflow: "hidden",
        borderRadius: 16,
        background: "#14141e",
        border: `1px solid ${hovered ? course.color + "44" : "rgba(255,255,255,0.06)"}`,
        padding: "20px",
        minHeight: 180,
        transform: hovered ? "scale(1.015)" : "scale(1)",
        transition: "transform 0.35s cubic-bezier(0.34,1.56,0.64,1), border-color 0.25s, box-shadow 0.3s",
        boxShadow: hovered ? `0 0 0 1px ${course.color}44, 0 0 28px ${course.glow}` : "none",
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        gap: 12,
      }}
    >
      {/* Gradient mesh bg */}
      <div style={{ position:"absolute",inset:0, background:`radial-gradient(ellipse at 20% 20%, ${course.glow} 0%, transparent 65%)`, pointerEvents:"none" }} />
      {/* Grain texture */}
      <div style={{ position:"absolute",inset:0, backgroundImage:"url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E\")", borderRadius:"inherit", pointerEvents:"none" }} />

      <div style={{ position:"relative", zIndex:1, display:"flex", flexDirection:"column", gap:10, flex:1 }}>
        {/* Icon */}
        <div style={{ width:40, height:40, borderRadius:12, background:"#1a1a26", border:"1px solid rgba(255,255,255,0.07)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:18 }}>
          {course.icon}
        </div>

        {/* Title */}
        <div style={{ flex:1 }}>
          <div style={{ fontSize:14, fontWeight:500, color:"#f0efff", lineHeight:1.4 }}>{course.title}</div>
          <div style={{ fontSize:11, color:"rgba(240,239,255,0.35)", marginTop:4 }}>Active course</div>
        </div>

        {/* Progress */}
        <div>
          <div style={{ display:"flex", justifyContent:"space-between", marginBottom:8 }}>
            <span style={{ fontSize:11, color:"rgba(240,239,255,0.5)" }}>Progress</span>
            <span style={{ fontSize:12, fontWeight:500, color:"#f0efff", fontVariantNumeric:"tabular-nums" }}>{animProg}%</span>
          </div>
          <div style={{ height:6, borderRadius:3, background:"#1f1f2e", overflow:"hidden" }}>
            <div style={{ height:"100%", borderRadius:3, width:`${animProg}%`, background:`linear-gradient(90deg, ${course.color}, ${course.color}bb)`, transition:"none" }} />
          </div>
        </div>
      </div>
    </article>
  );
}

// ─── Main Dashboard ───────────────────────────────────────────────────────────
export default function Dashboard() {
  const [activeNav, setActiveNav] = useState("dashboard");
  const [collapsed, setCollapsed] = useState(false);
  const [visible, setVisible] = useState(false);
  const [tilesVisible, setTilesVisible] = useState([]);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!visible) return;
    const timers = Array.from({ length: 10 }, (_, i) =>
      setTimeout(() => setTilesVisible(prev => [...prev, i]), 80 + i * 65)
    );
    return () => timers.forEach(clearTimeout);
  }, [visible]);

  const isTileVisible = (i) => tilesVisible.includes(i);

  return (
    <div style={{ display:"flex", minHeight:"100vh", background:"#0a0a0f", fontFamily:"'DM Sans', system-ui, sans-serif", color:"#f0efff" }}>

      {/* Sidebar */}
      <nav style={{
        width: collapsed ? 64 : 216,
        minHeight:"100vh",
        background:"#0f0f17",
        borderRight:"1px solid rgba(255,255,255,0.06)",
        display:"flex",
        flexDirection:"column",
        flexShrink:0,
        transition:"width 0.35s cubic-bezier(0.34,1.2,0.64,1)",
        overflow:"hidden",
        position:"relative",
      }}>
        {/* Logo */}
        <div style={{ display:"flex", alignItems:"center", gap:12, padding:"20px 16px", borderBottom:"1px solid rgba(255,255,255,0.06)" }}>
          <div style={{ width:32, height:32, borderRadius:10, background:"linear-gradient(135deg,#7c6ff7,#a855f7)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:16, flexShrink:0 }}>🎓</div>
          <span style={{ fontSize:14, fontWeight:600, whiteSpace:"nowrap", opacity: collapsed ? 0 : 1, transition:"opacity 0.2s" }}>EduOS</span>
        </div>

        {/* Nav items */}
        <div style={{ flex:1, padding:8, display:"flex", flexDirection:"column", gap:2 }}>
          {NAV_ITEMS.map(({ icon, label, id }) => (
            <button key={id} onClick={() => setActiveNav(id)}
              style={{ position:"relative", display:"flex", alignItems:"center", gap:12, padding:"10px 8px", borderRadius:12, border:"none", background:"transparent", cursor:"pointer", width:"100%", textAlign:"left" }}>
              {activeNav === id && (
                <div style={{ position:"absolute", inset:0, background:"rgba(124,111,247,0.12)", borderRadius:12 }} />
              )}
              <span style={{ fontSize:16, flexShrink:0, position:"relative", zIndex:1 }}>{icon}</span>
              <span style={{ fontSize:13, fontWeight: activeNav === id ? 500 : 400, color: activeNav === id ? "#f0efff" : "rgba(240,239,255,0.45)", whiteSpace:"nowrap", position:"relative", zIndex:1, opacity: collapsed ? 0 : 1, transition:"opacity 0.15s" }}>
                {label}
              </span>
            </button>
          ))}
        </div>

        {/* Avatar */}
        <div style={{ padding:"12px 8px", borderTop:"1px solid rgba(255,255,255,0.06)", display:"flex", alignItems:"center", gap:10 }}>
          <div style={{ width:28, height:28, borderRadius:"50%", background:"linear-gradient(135deg,#7c6ff7,#a855f7)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:10, fontWeight:700, flexShrink:0 }}>AR</div>
          <div style={{ opacity: collapsed ? 0 : 1, transition:"opacity 0.15s" }}>
            <div style={{ fontSize:12, fontWeight:500 }}>Arjun R.</div>
            <div style={{ fontSize:10, color:"rgba(240,239,255,0.35)" }}>Pro Plan</div>
          </div>
        </div>

        {/* Collapse toggle */}
        <button onClick={() => setCollapsed(c => !c)}
          style={{ position:"absolute", top:78, right:-12, width:24, height:24, borderRadius:"50%", background:"#1a1a26", border:"1px solid rgba(255,255,255,0.08)", display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", fontSize:10, color:"rgba(240,239,255,0.5)", zIndex:10, transition:"color 0.15s" }}>
          {collapsed ? "›" : "‹"}
        </button>
      </nav>

      {/* Main content */}
      <main style={{ flex:1, overflow:"auto", padding:"32px 24px", maxWidth:960 }}>
        <header style={{ marginBottom:32 }}>
          <div style={{ fontSize:10, color:"rgba(240,239,255,0.3)", letterSpacing:"0.12em", textTransform:"uppercase", marginBottom:4 }}>Dashboard</div>
          <div style={{ fontSize:22, fontWeight:400, fontFamily:"'DM Serif Display', serif" }}>Your Learning Hub</div>
        </header>

        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:16 }}>

          {/* Hero tile — col span 2 */}
          <div style={{
            gridColumn:"span 2",
            opacity: isTileVisible(0) ? 1 : 0,
            transform: isTileVisible(0) ? "translateY(0)" : "translateY(20px)",
            transition:"opacity 0.45s ease, transform 0.45s cubic-bezier(0.34,1.3,0.64,1)",
          }}>
            <HeroTile />
          </div>

          {/* Stats */}
          {STATS.map((stat, i) => (
            <div key={stat.id} style={{
              opacity: isTileVisible(1 + i) ? 1 : 0,
              transform: isTileVisible(1 + i) ? "translateY(0)" : "translateY(20px)",
              transition:`opacity 0.45s ease, transform 0.45s cubic-bezier(0.34,1.3,0.64,1)`,
            }}>
              <StatCard stat={stat} />
            </div>
          ))}

          {/* Section heading */}
          <div style={{ gridColumn:"span 3", display:"flex", alignItems:"center", gap:8, marginTop:8,
            opacity: isTileVisible(4) ? 1 : 0, transition:"opacity 0.4s ease" }}>
            <span style={{ fontSize:11, color:"rgba(240,239,255,0.35)", textTransform:"uppercase", letterSpacing:"0.1em" }}>Active Courses</span>
            <div style={{ flex:1, height:"1px", background:"rgba(255,255,255,0.05)" }} />
            <span style={{ fontSize:11, color:"rgba(124,111,247,0.7)" }}>4 enrolled</span>
          </div>

          {/* Course cards */}
          {COURSES.map((course, i) => (
            <div key={course.id} style={{
              opacity: isTileVisible(5 + i) ? 1 : 0,
              transform: isTileVisible(5 + i) ? "translateY(0)" : "translateY(24px)",
              transition:`opacity 0.5s ease, transform 0.5s cubic-bezier(0.34,1.3,0.64,1)`,
            }}>
              <CourseCard course={course} index={i} visible={isTileVisible(5 + i)} />
            </div>
          ))}

          {/* Activity tile — col span 2 */}
          <div style={{
            gridColumn:"span 2",
            opacity: isTileVisible(9) ? 1 : 0,
            transform: isTileVisible(9) ? "translateY(0)" : "translateY(20px)",
            transition:"opacity 0.45s ease, transform 0.45s cubic-bezier(0.34,1.3,0.64,1)",
          }}>
            <ActivityTile />
          </div>

        </div>
      </main>
    </div>
  );
}

// ─── Hero Tile ────────────────────────────────────────────────────────────────
function HeroTile() {
  const [hovered, setHovered] = useState(false);
  const STREAK = [true, true, true, true, false, true, true];
  const DAYS = ["M","T","W","T","F","S","S"];

  return (
    <article onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{
        position:"relative", overflow:"hidden", borderRadius:16,
        background:"#14141e", border:`1px solid ${hovered ? "rgba(124,111,247,0.28)" : "rgba(255,255,255,0.06)"}`,
        padding:"24px", minHeight:200, display:"flex", flexDirection:"column", justifyContent:"space-between",
        transform: hovered ? "scale(1.015)" : "scale(1)",
        transition:"transform 0.35s cubic-bezier(0.34,1.56,0.64,1), border-color 0.25s, box-shadow 0.3s",
        boxShadow: hovered ? "0 0 0 1px rgba(124,111,247,0.25),0 0 36px rgba(124,111,247,0.1)" : "none",
      }}>
      <div style={{ position:"absolute", inset:0, background:"linear-gradient(135deg, rgba(124,111,247,0.1) 0%, rgba(168,85,247,0.06) 40%, rgba(34,211,238,0.04) 100%)", pointerEvents:"none" }} />
      <div style={{ position:"absolute", top:-60, right:-60, width:220, height:220, background:"rgba(124,111,247,0.08)", borderRadius:"50%", filter:"blur(40px)", pointerEvents:"none" }} />

      <div style={{ position:"relative", zIndex:1 }}>
        <div style={{ fontSize:11, color:"rgba(240,239,255,0.3)", textTransform:"uppercase", letterSpacing:"0.12em", marginBottom:6 }}>Good afternoon</div>
        <div style={{ fontSize:28, fontFamily:"'DM Serif Display', serif", lineHeight:1.2 }}>
          Welcome back, <span style={{ background:"linear-gradient(135deg,#7c6ff7,#22d3ee)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>Arjun.</span>
        </div>
        <div style={{ fontSize:13, color:"rgba(240,239,255,0.55)", marginTop:8 }}>
          You've completed <strong style={{ color:"#f0efff", fontWeight:500 }}>3 lessons</strong> this week. Keep going!
        </div>
      </div>

      <div style={{ position:"relative", zIndex:1, display:"flex", alignItems:"center", gap:16, flexWrap:"wrap" }}>
        {/* Streak badge */}
        <div style={{ display:"flex", alignItems:"center", gap:8, background:"rgba(251,191,36,0.08)", border:"1px solid rgba(251,191,36,0.2)", borderRadius:12, padding:"8px 12px" }}>
          <span>🔥</span>
          <span style={{ fontSize:14, fontWeight:600, color:"#fde68a", fontVariantNumeric:"tabular-nums" }}>14</span>
          <span style={{ fontSize:11, color:"rgba(251,191,36,0.65)" }}>day streak</span>
        </div>

        {/* Weekly dots */}
        <div style={{ display:"flex", gap:6, alignItems:"flex-end" }}>
          {DAYS.map((day, i) => (
            <div key={i} style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:4 }}>
              <div style={{ width:24, height:24, borderRadius:"50%", background: STREAK[i] ? "rgba(251,191,36,0.15)" : "#1f1f2e", border:`1px solid ${STREAK[i] ? "rgba(251,191,36,0.4)" : "rgba(255,255,255,0.06)"}`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:10 }}>
                {STREAK[i] ? "🔥" : ""}
              </div>
              <span style={{ fontSize:9, color:"rgba(240,239,255,0.3)" }}>{day}</span>
            </div>
          ))}
        </div>

        <div style={{ marginLeft:"auto", display:"flex", alignItems:"center", gap:6, background:"rgba(124,111,247,0.08)", border:"1px solid rgba(124,111,247,0.2)", borderRadius:12, padding:"8px 12px" }}>
          <span>🏆</span>
          <span style={{ fontSize:12, fontWeight:500, color:"#c4b5fd" }}>1,240 XP</span>
        </div>
      </div>
    </article>
  );
}

// ─── Stat Card ────────────────────────────────────────────────────────────────
function StatCard({ stat }) {
  const [hovered, setHovered] = useState(false);
  return (
    <article onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{
        position:"relative", overflow:"hidden", borderRadius:16,
        background:"#14141e", border:`1px solid ${hovered ? stat.color + "33" : "rgba(255,255,255,0.06)"}`,
        padding:"20px", minHeight:110, display:"flex", flexDirection:"column", gap:12,
        transform: hovered ? "scale(1.015)" : "scale(1)",
        transition:"transform 0.3s cubic-bezier(0.34,1.56,0.64,1), border-color 0.25s",
      }}>
      <div style={{ position:"absolute", inset:0, background:`radial-gradient(ellipse at 20% 20%, ${stat.color}12 0%, transparent 60%)`, pointerEvents:"none" }} />
      <div style={{ position:"relative", zIndex:1, fontSize:18 }}>{stat.icon}</div>
      <div style={{ position:"relative", zIndex:1 }}>
        <div style={{ fontSize:22, fontWeight:600, color:"#f0efff", fontVariantNumeric:"tabular-nums", lineHeight:1 }}>
          {stat.value}<span style={{ fontSize:12, fontWeight:400, color:"rgba(240,239,255,0.35)", marginLeft:4 }}>{stat.unit}</span>
        </div>
        <div style={{ fontSize:11, color:"rgba(240,239,255,0.45)", marginTop:4 }}>{stat.label}</div>
      </div>
    </article>
  );
}

// ─── Activity Tile ────────────────────────────────────────────────────────────
function ActivityTile() {
  const [hovered, setHovered] = useState(false);
  const activeDays = HEATMAP.flat().filter(v => v > 0).length;

  return (
    <article onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{
        position:"relative", overflow:"hidden", borderRadius:16,
        background:"#14141e", border:`1px solid ${hovered ? "rgba(124,111,247,0.2)" : "rgba(255,255,255,0.06)"}`,
        padding:"20px",
        transform: hovered ? "scale(1.015)" : "scale(1)",
        transition:"transform 0.35s cubic-bezier(0.34,1.56,0.64,1), border-color 0.25s",
      }}>
      <div style={{ position:"absolute", inset:0, background:"radial-gradient(ellipse at 10% 10%, rgba(124,111,247,0.06) 0%, transparent 60%)", pointerEvents:"none" }} />

      <div style={{ position:"relative", zIndex:1 }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:16 }}>
          <div style={{ display:"flex", alignItems:"center", gap:8 }}>
            <span style={{ fontSize:13 }}>📈</span>
            <span style={{ fontSize:11, color:"rgba(240,239,255,0.45)", textTransform:"uppercase", letterSpacing:"0.1em" }}>Activity</span>
          </div>
          <span style={{ fontSize:11, color:"rgba(240,239,255,0.3)" }}>{activeDays} active days</span>
        </div>

        {/* Heatmap */}
        <div style={{ display:"flex", gap:3, overflow:"hidden" }}>
          <div style={{ display:"flex", flexDirection:"column", gap:3, marginRight:4 }}>
            {["","M","","W","","F",""].map((d,i) => (
              <div key={i} style={{ height:10, fontSize:8, color:"rgba(240,239,255,0.3)", display:"flex", alignItems:"center", width:20 }}>{d}</div>
            ))}
          </div>
          {HEATMAP.map((week, wi) => (
            <div key={wi} style={{ display:"flex", flexDirection:"column", gap:3, flex:1 }}>
              {week.map((level, di) => (
                <div key={di} style={{ height:10, borderRadius:2, background:HEAT_COLORS[level], transition:"background 0.2s" }} />
              ))}
            </div>
          ))}
        </div>

        {/* Legend */}
        <div style={{ display:"flex", alignItems:"center", gap:4, marginTop:12, justifyContent:"flex-end" }}>
          <span style={{ fontSize:10, color:"rgba(240,239,255,0.3)" }}>Less</span>
          {HEAT_COLORS.map((c, i) => <div key={i} style={{ width:10, height:10, borderRadius:2, background:c }} />)}
          <span style={{ fontSize:10, color:"rgba(240,239,255,0.3)" }}>More</span>
        </div>
      </div>
    </article>
  );
}
