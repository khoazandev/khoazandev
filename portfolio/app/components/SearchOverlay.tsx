"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiSearch, FiX } from "react-icons/fi";
import { useLocale } from "../i18n";

interface SearchResult {
  title: string;
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
      setTimeout(() => inputRef.current?.focus(), 100);
      setQuery("");
    }
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const allItems: SearchResult[] = [
    { title: "SmartHire AI", section: t("nav.projects"), href: "#projects" },
    { title: "IELTS_WEB", section: t("nav.projects"), href: "#projects" },
    { title: "Personal Finance Manager", section: t("nav.projects"), href: "#projects" },
    { title: "GamePlus", section: t("nav.projects"), href: "#projects" },
    { title: "Reroll-DoMiXi", section: t("nav.projects"), href: "#projects" },
    { title: "React / Next.js", section: t("nav.skills"), href: "#skills" },
    { title: "TypeScript", section: t("nav.skills"), href: "#skills" },
    { title: "Node.js / Express", section: t("nav.skills"), href: "#skills" },
    { title: "Docker / DevOps", section: t("nav.skills"), href: "#skills" },
    { title: "Tailwind CSS", section: t("nav.skills"), href: "#skills" },
    { title: t("about.title"), section: t("nav.about"), href: "#about" },
    { title: t("contact.title"), section: t("nav.contact"), href: "#contact" },
    { title: "Blog / Articles", section: "Blog", href: "#blog" },
  ];

  const q = query.toLowerCase();
  const results = q.length > 0
    ? allItems.filter(
        (item) =>
          item.title.toLowerCase().includes(q) ||
          item.section.toLowerCase().includes(q)
      )
    : [];

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="search-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <motion.div
            className="search-container"
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -30, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
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
              <button className="search-close-btn" onClick={onClose} aria-label="Close search">
                <FiX size={20} />
              </button>
            </div>

            {results.length > 0 && (
              <div className="search-results">
                {results.map((r, i) => (
                  <a
                    key={i}
                    href={r.href}
                    className="search-result-item"
                    onClick={onClose}
                  >
                    <span className="search-result-title">{r.title}</span>
                    <span className="search-result-section">{r.section}</span>
                  </a>
                ))}
              </div>
            )}

            {query.length > 0 && results.length === 0 && (
              <div className="search-no-results">
                {t("search.noResults")}
              </div>
            )}
          </motion.div>

          <div className="search-backdrop" onClick={onClose} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
