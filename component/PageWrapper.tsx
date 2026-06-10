// components/PageWrapper.tsx
"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";

export default function PageWrapper({ children } : { children: ReactNode }) {
  return (
    <motion.main
      initial={{ opacity: 1, filter: "blur(8px)" }}
      animate={{ opacity: 1, filter: "blur(0px)" }}
      transition={{ duration: 0.35, ease: "easeOut" }}
    >
      {children}
    </motion.main>
  );
}
/*页面转换动画*/