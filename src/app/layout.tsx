import type { Metadata } from "next";
// @ts-ignore: CSS imports are handled by Next.js app router
import "./globals.css";

export const metadata: Metadata = {
  title: "EduOS — Learning Dashboard",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}