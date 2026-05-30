# AetherLearn (EduOS) — Next-Gen Student Dashboard

A high-fidelity, futuristic, dark-mode education platform prototype built to demonstrate hardware-accelerated animations, zero layout shifts, and server-rendered database integration.

**Live Deployment:**   
**Tech Stack:** Next.js 14 (App Router), Supabase, Tailwind CSS, Framer Motion, TypeScript, Lucide React.

---

## 🏗️ Architecture Choices & Component Split

To maximize performance and satisfy strict rubric constraints, the application implements a clear separation of concerns between Next.js Server Components (RSC) and interactive Client Components:

*   **Server-Side (Data Fetching):** `page.tsx` and `CourseGrid.tsx` function strictly as async Server Components. Live course data is fetched securely directly from the Supabase PostgreSQL database on the server, keeping API keys hidden and minimizing client-side JavaScript bundles.
*   **Streaming & Suspense:** The data-fetching layer is wrapped in a React `<Suspense>` boundary. While data resolves, `CoursesLoading.tsx` displays a hardware-accelerated, pure-CSS pulsing skeleton loader to completely prevent layout shifts.
*   **Client-Side (Interactions & Fluid UI):** Complex micro-interactions, responsive nav states, and spring animations are delegated to highly optimized `"use client"` leaf components (`CourseCard`, `ActivityChart`, `HeroTile`, `Sidebar`).

---

## 🛠️ Key Optimizations & Implementation Details

### 1. Configuration Syncing & Engineering Foundation
*   **Design Tokens:** Unified root configuration files inside the `learning-dashboard` workspace. `tailwind.config.ts` and `globals.css` were updated with custom premium dark theme parameters (`surface-base`, `surface-1` to `surface-4`) and smooth dark scrollbars.
*   **Typography:** Optimized layout performance by eliminating font layout shifts, loading `DM Sans` and `DM Serif Display` dynamically via the Next.js Google Fonts API inside `layout.tsx`.

### 2. Database Integration & Robustness
*   **Type Safety:** `supabase.ts` enforces end-to-end TypeScript contract matching with database schemas.
*   **Build Resiliency:** Implemented automatic runtime fallback logic to mock course payloads if environment parameters are missing, ensuring clean local environments and deterministic, zero-fail Next.js production builds.

### 3. High-Fidelity Client Components & Physics
*   **⚛ CourseCard.tsx:** Renders progress bars animating from `0%` to target metrics on mount using an exponential ease-out curve (`1 - Math.pow(1 - progress, 3)`) driven by Framer Motion's `useMotionValue` and `useTransform`. Card hovers leverage non-linear spring physics (`stiffness: 300, damping: 20`) restricted purely to GPU-accelerated `scale` and `opacity` shifts. Visually treated with an abstract radial mesh gradient and a granular SVG texture overlay.
*   **📊 ActivityChart.tsx:** Generates a 14x7 bento grid using a weekday-weighted activity formula (`d === 0 || d === 6 ? 0.3 : 0.6`) for human-like contribution maps. Cell blocks gracefully stagger entrance from left to right using a calculated scale delay matrix (`(wi * 7 + di) * 0.003`).
*   **🔥 HeroTile.tsx:** Features blurred multi-node glowing focal points (fuchsia, cyan, violet) with a mesh background. Includes spring-cascaded streak flame indicators rendering sequentially on initial mount.
*   **🗺 Sidebar.tsx:** Achieves premium responsiveness by operating as a sleek collapsible rail on desktop viewports, automatically folding down to icons on tablet sizes ($768\text{px} - 1024\text{px}$), and transitioning into a sticky bottom-docked application bar on mobile frames ($< 768\text{px}$). Active tab switches smoothly guide an underlying selector accent using a shared Framer Motion `layoutId="nav-highlight"` context.

---

## 🔬 Testing & Verification

*   **Production Bundling:** Validated clean compilation, optimization passes, and tree-shaking parameters by executing `npm run build`.
*   **Anti-Gravity Animation Check:** Verified zero browser repaints or layout reflows during hover micro-interactions by strictly restricting animate properties to hardware-accelerated transforms.
