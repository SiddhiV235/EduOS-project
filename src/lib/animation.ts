import type { Variants } from "framer-motion";

export const containerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } }
};

export const tileVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 280, damping: 22 } }
};

export const cardHoverVariants = {
  rest:  { scale: 1,     transition: { type: "spring", stiffness: 300, damping: 20 } },
  hover: { scale: 1.015, transition: { type: "spring", stiffness: 300, damping: 20 } }
};