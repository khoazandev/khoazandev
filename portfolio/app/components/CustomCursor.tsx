"use client";

import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: 0, y: 0 });
  const outerPos = useRef({ x: 0, y: 0 });
  const [hovering, setHovering] = useState(false);
  const [clicking, setClicking] = useState(false);
  const [visible, setVisible] = useState(false);
  const animRef = useRef<number>(0);

  useEffect(() => {
    // Hide on touch / mobile
    if ("ontouchstart" in window) return;

    const onMove = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY };
      if (!visible) setVisible(true);

      // Inner dot follows instantly
      if (innerRef.current) {
        innerRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
      }
    };

    const onDown = () => setClicking(true);
    const onUp = () => setClicking(false);

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.classList.contains("skill-tag") ||
        target.classList.contains("filter-pill") ||
        target.classList.contains("project-card") ||
        target.classList.contains("contact-link")
      ) {
        setHovering(true);
      }
    };
    const onOut = () => setHovering(false);

    // Outer ring with smooth lerp
    const animate = () => {
      outerPos.current.x += (posRef.current.x - outerPos.current.x) * 0.12;
      outerPos.current.y += (posRef.current.y - outerPos.current.y) * 0.12;
      if (outerRef.current) {
        outerRef.current.style.transform = `translate(${outerPos.current.x}px, ${outerPos.current.y}px) translate(-50%, -50%)`;
      }
      animRef.current = requestAnimationFrame(animate);
    };
    animate();

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <>
      {/* Outer ring */}
      <div
        ref={outerRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: hovering ? 56 : 40,
          height: hovering ? 56 : 40,
          border: `2px solid rgba(0, 255, 136, ${hovering ? 0.8 : 0.4})`,
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 99999,
          transition: "width 0.3s, height 0.3s, border-color 0.3s",
          mixBlendMode: "difference",
          willChange: "transform",
        }}
      />
      {/* Inner dot */}
      <div
        ref={innerRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: clicking ? 12 : hovering ? 0 : 6,
          height: clicking ? 12 : hovering ? 0 : 6,
          background: "#00ff88",
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 99999,
          transition: "width 0.15s, height 0.15s",
          willChange: "transform",
        }}
      />
      <style jsx global>{`
        @media (pointer: fine) {
          * { cursor: none !important; }
        }
      `}</style>
    </>
  );
}
