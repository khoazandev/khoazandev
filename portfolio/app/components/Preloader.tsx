"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className="preloader"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 100000,
            background: "#0a0a0f",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 24,
          }}
        >
          {/* Logo text reveal */}
          <motion.div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "2.2rem",
              fontWeight: 700,
              overflow: "hidden",
            }}
          >
            <motion.span
              initial={{ y: 60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              style={{ display: "inline-block", color: "#00ff88" }}
            >
              khoa
            </motion.span>
            <motion.span
              initial={{ y: 60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              style={{ display: "inline-block", color: "#71717a" }}
            >
              .dev
            </motion.span>
          </motion.div>

          {/* Progress bar */}
          <div
            style={{
              width: 160,
              height: 2,
              background: "rgba(255,255,255,0.06)",
              borderRadius: 1,
              overflow: "hidden",
            }}
          >
            <motion.div
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 1.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              style={{
                height: "100%",
                background: "linear-gradient(90deg, #00ff88, #3b82f6)",
                borderRadius: 1,
              }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
