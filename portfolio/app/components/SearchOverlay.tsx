"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiSearch, FiX, FiArrowUpRight } from "react-icons/fi";
import { useLocale } from "../i18n";

interface SearchResult {
  title: string;
  subtitle: string;
  section: string;
  href: string;
}

export default function SearchOverlay({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { t } = useLocale();
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 60);
    }
  }, [open]);

  const handleClose = useCallback(() => {
    setQuery("");
    onClose();
  }, [onClose]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) handleClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, handleClose]);

  const allItems: SearchResult[] = [
    { title: "AdsAgency.vn — Web Designer & Frontend Intern", subtitle: "07/2026 – 10/2026 · 10+ Websites · PageSpeed 85+ · Figma", section: t("nav.experience"), href: "#experience" },
    { title: "YOOT Edu — Frontend Developer Intern", subtitle: "04/2026 – 07/2026 · React.js · TypeScript · Redux Toolkit · Lighthouse 88+", section: t("nav.experience"), href: "#experience" },
    { title: "SmartHire – Recruitment Platform", subtitle: "Next.js · TypeScript · Zustand · Kanban · CV Builder", section: t("nav.projects"), href: "#projects" },
    { title: "IELTS Mock Test & AI Platform", subtitle: "React.js · Vite · Gemini AI SDK · MediaRecorder API", section: t("nav.projects"), href: "#projects" },
    { title: "Axiom – Enterprise Meeting OS", subtitle: "Next.js 16 · FastAPI · LiveKit WebRTC · Whisper/Llama-3 AI", section: t("nav.projects"), href: "#projects" },
    { title: "NovaCart – E-Commerce Platform", subtitle: "React.js · Vite · Context API + useReducer · Admin Dashboard", section: t("nav.projects"), href: "#projects" },
    { title: "SmartHire – Enterprise Backend API", subtitle: "Java · Spring Boot · Spring Security · JWT & RBAC", section: t("nav.projects"), href: "#projects" },
    { title: "React.js / Next.js / TypeScript / TailwindCSS", subtitle: "Frontend & Pixel-Perfect Figma Slicing", section: t("nav.skills"), href: "#skills" },
    { title: "Redux Toolkit / Zustand / React Hook Form / Zod", subtitle: "State Management, Validation & Axios Interceptors", section: t("nav.skills"), href: "#skills" },
    { title: "Top 16 National Olympiad in Informatics (OLP)", subtitle: "PROCON Division · 2025", section: t("nav.about"), href: "#about" },
    { title: "HUTECH — Software Engineering (2022–2026)", subtitle: "GPA: 3.3 / 4.0", section: t("nav.about"), href: "#about" },
    { title: t("contact.title"), subtitle: "levankhoa2004@gmail.com · 0766 772 215", section: t("nav.contact"), href: "#contact" },
  ];

  const q = query.trim().toLowerCase();
  const results = q.length > 0
    ? allItems.filter(
        (item) =>
          item.title.toLowerCase().includes(q) ||
          item.subtitle.toLowerCase().includes(q) ||
          item.section.toLowerCase().includes(q),
      )
    : allItems.slice(0, 6);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="search-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            className="search-container"
            initial={{ y: -24, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: -24, opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="search-input-row">
              <FiSearch size={20} />
              <input
                ref={inputRef}
                type="text"
                className="search-input"
                placeholder={t("search.placeholder")}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <button className="search-close-btn" onClick={handleClose} aria-label="Close search">
                <FiX size={20} />
              </button>
            </div>

            {results.length > 0 ? (
              <div className="search-results">
                {q.length === 0 && (
                  <div className="search-group-label">{t("search.quickLinks")}</div>
                )}
                {results.map((r, i) => (
                  <a
                    key={i}
                    href={r.href}
                    className="search-result-item"
                    onClick={handleClose}
                  >
                    <div>
                      <div className="search-result-title">{r.title}</div>
                      <div className="search-result-sub">{r.subtitle}</div>
                    </div>
                    <span className="search-result-section">
                      {r.section} <FiArrowUpRight size={14} />
                    </span>
                  </a>
                ))}
              </div>
            ) : (
              <div className="search-no-results">
                {t("search.noResults")}
              </div>
            )}
          </motion.div>

          <div className="search-backdrop" onClick={handleClose} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
