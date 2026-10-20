"use client";

import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: 0, y: 0 });
  const outerPos = useRef({ x: 0, y: 0 });
  const visibleRef = useRef(false);
  const [hovering, setHovering] = useState(false);
  const [clicking, setClicking] = useState(false);
  const [visible, setVisible] = useState(false);
  const animRef = useRef<number>(0);

  useEffect(() => {
    if ("ontouchstart" in window || window.matchMedia("(pointer: coarse)").matches) return;

    const onMove = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY };
      if (!visibleRef.current) {
        visibleRef.current = true;
        outerPos.current = { x: e.clientX, y: e.clientY };
        setVisible(true);
      }

      if (innerRef.current) {
        innerRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
      }
    };

    const onDown = () => setClicking(true);
    const onUp = () => setClicking(false);

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive =
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.classList.contains("skill-tag") ||
        target.classList.contains("filter-pill") ||
        target.classList.contains("project-card") ||
        target.classList.contains("contact-link");
      setHovering(Boolean(isInteractive));
    };

    const animate = () => {
      outerPos.current.x += (posRef.current.x - outerPos.current.x) * 0.18;
      outerPos.current.y += (posRef.current.y - outerPos.current.y) * 0.18;
      if (outerRef.current) {
        outerRef.current.style.transform = `translate3d(${outerPos.current.x}px, ${outerPos.current.y}px, 0) translate(-50%, -50%)`;
      }
      animRef.current = requestAnimationFrame(animate);
    };
    animate();

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    document.addEventListener("mouseover", onOver);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.removeEventListener("mouseover", onOver);
    };
  }, []);

  if (!visible) return null;

  return (
    <>
      <div
        ref={outerRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: hovering ? 48 : 34,
          height: hovering ? 48 : 34,
          border: `1.5px solid rgba(0, 255, 136, ${hovering ? 0.85 : 0.4})`,
          background: hovering ? "rgba(0, 255, 136, 0.06)" : "transparent",
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 99999,
          transition: "width 0.2s, height 0.2s, border-color 0.2s, background 0.2s",
          willChange: "transform",
        }}
      />
      <div
        ref={innerRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: clicking ? 10 : hovering ? 8 : 6,
          height: clicking ? 10 : hovering ? 8 : 6,
          background: "var(--accent-green)",
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
