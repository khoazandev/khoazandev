"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 650);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className="preloader"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 100000,
            background: "var(--bg-primary)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 20,
          }}
        >
          <motion.div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "2.2rem",
              fontWeight: 700,
              overflow: "hidden",
            }}
          >
            <motion.span
              initial={{ y: 36, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              style={{ display: "inline-block", color: "var(--accent-green)" }}
            >
              khoa
            </motion.span>
            <motion.span
              initial={{ y: 36, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.08, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              style={{ display: "inline-block", color: "var(--text-muted)" }}
            >
              .dev
            </motion.span>
          </motion.div>

          <div
            style={{
              width: 140,
              height: 2,
              background: "var(--border-color)",
              borderRadius: 1,
              overflow: "hidden",
            }}
          >
            <motion.div
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              style={{
                height: "100%",
                background: "linear-gradient(90deg, var(--accent-green), var(--accent-blue))",
                borderRadius: 1,
              }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
