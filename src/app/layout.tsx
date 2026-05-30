import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Outfit } from "next/font/google";
// @ts-ignore: CSS imports are handled by Next.js app router
import "./globals.css";

const bodyFont = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const displayFont = Outfit({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "EduOS — Learning Dashboard",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${bodyFont.variable} ${displayFont.variable}`}>
      <body className="antialiased font-body bg-[#06060c] text-[#f0efff]">{children}</body>
    </html>
  );
}