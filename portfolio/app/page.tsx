"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  FiSearch,
  FiMoon,
  FiSun,
  FiDownload,
  FiExternalLink,
  FiGithub,
  FiLinkedin,
  FiMail,
  FiPhone,
  FiCopy,
  FiCheck,
  FiCode,
  FiLayers,
  FiServer,
  FiSmartphone,
  FiCloud,
  FiTool,
  FiAward,
  FiBookOpen,
  FiCheckCircle,
  FiStar,
  FiBriefcase,
  FiCalendar,
} from "react-icons/fi";
import { useLocale } from "./i18n";
import { useTheme } from "./components/ThemeProvider";
import ParticleField from "./components/ParticleField";
import CustomCursor from "./components/CustomCursor";
import TiltCard from "./components/TiltCard";
import Preloader from "./components/Preloader";
import SearchOverlay from "./components/SearchOverlay";
import LiveChat from "./components/LiveChat";

const LINKEDIN_URL = "https://www.linkedin.com/in/khoazandev";

/* ================================================================
   SCROLL PROGRESS BAR (GPU-accelerated, zero React re-renders)
   ================================================================ */
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  return <motion.div className="scroll-progress" style={{ scaleX: scrollYProgress }} />;
}

/* ================================================================
   SCROLL REVEAL WRAPPER
   ================================================================ */
function ScrollReveal({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ================================================================
   NAVBAR
   ================================================================ */
function Navbar({ onSearchOpen }: { onSearchOpen: () => void }) {
  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState("");
  const { locale, setLocale, t } = useLocale();
  const { theme, toggleTheme } = useTheme();

  const links = [
    { id: "experience", label: t("nav.experience"), href: "#experience" },
    { id: "projects", label: t("nav.projects"), href: "#projects" },
    { id: "skills", label: t("nav.skills"), href: "#skills" },
    { id: "about", label: t("nav.about"), href: "#about" },
    { id: "contact", label: t("nav.contact"), href: "#contact" },
  ];

  useEffect(() => {
    const sections = ["experience", "projects", "skills", "about", "contact"]
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: "-30% 0px -55% 0px" },
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <motion.nav
      className="navbar"
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="navbar-inner">
        <a href="#" className="navbar-logo" onClick={() => setActiveId("")}>
          khoa<span>.dev</span>
        </a>

        <ul className={`navbar-links ${open ? "open" : ""}`}>
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className={activeId === l.id ? "active" : ""}
                onClick={() => setOpen(false)}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="navbar-right">
          <button
            className="search-trigger-btn"
            onClick={onSearchOpen}
            aria-label="Search"
          >
            <FiSearch size={15} />
            <span className="search-trigger-text">{t("nav.searchHint")}</span>
            <kbd className="search-kbd">⌘K</kbd>
          </button>

          <button className="icon-btn" onClick={toggleTheme} aria-label="Theme toggle">
            {theme === "dark" ? <FiSun size={18} /> : <FiMoon size={18} />}
          </button>

          <button
            className="lang-toggle"
            onClick={() => setLocale(locale === "en" ? "vi" : "en")}
            aria-label="Toggle language"
          >
            <span className={locale === "en" ? "active" : ""}>EN</span>
            <span className="lang-divider">/</span>
            <span className={locale === "vi" ? "active" : ""}>VI</span>
          </button>

          <button
            className="mobile-menu-btn"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? "✕" : "☰"}
          </button>
        </div>
      </div>
    </motion.nav>
  );
}

/* ================================================================
   HERO + STATS BAR
   ================================================================ */
function Hero() {
  const { t, locale } = useLocale();
  const cvPath = locale === "vi" ? "/khoazandev/CV_LeVanKhoa_VI.pdf" : "/khoazandev/CV_LeVanKhoa.pdf";
  const cvFileName = locale === "vi" ? "CV_LeVanKhoa_VI.pdf" : "CV_LeVanKhoa_EN.pdf";

  const phrases = [
    t("hero.typing.0"),
    t("hero.typing.1"),
    t("hero.typing.2"),
    t("hero.typing.3"),
  ];
  const typingResetKey = phrases.join("|");
  const [current, setCurrent] = useState(0);
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setText("");
    setCurrent(0);
    setIsDeleting(false);
    setIsPaused(false);
  }, [typingResetKey]);

  useEffect(() => {
    const phrase = phrases[current];

    if (isPaused) {
      timerRef.current = setTimeout(() => {
        setIsPaused(false);
        setIsDeleting(true);
      }, 1800);
      return () => {
        if (timerRef.current) clearTimeout(timerRef.current);
      };
    }

    if (!isDeleting && text.length < phrase.length) {
      timerRef.current = setTimeout(() => {
        setText(phrase.slice(0, text.length + 1));
      }, 48);
    } else if (!isDeleting && text.length === phrase.length) {
      setIsPaused(true);
    } else if (isDeleting && text.length > 0) {
      timerRef.current = setTimeout(() => {
        setText(phrase.slice(0, text.length - 1));
      }, 26);
    } else if (isDeleting && text.length === 0) {
      setIsDeleting(false);
      setCurrent((c) => (c + 1) % phrases.length);
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, isDeleting, current, isPaused]);

  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.32], [1, 0.15]);
  const y = useTransform(scrollYProgress, [0, 0.32], [0, 40]);

  const stats = [
    { value: t("stats.exp.value"), label: t("stats.exp.label") },
    { value: t("stats.web.value"), label: t("stats.web.label") },
    { value: t("stats.perf.value"), label: t("stats.perf.label") },
    { value: t("stats.olympiad.value"), label: t("stats.olympiad.label") },
  ];

  return (
    <motion.section className="hero" style={{ opacity, y }}>
      <div className="hero-aurora">
        <div className="hero-aurora-orb" />
        <div className="hero-aurora-orb" />
        <div className="hero-aurora-orb" />
      </div>

      {/* Availability Status Pill */}
      <motion.a
        href="#contact"
        className="hero-status-pill"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5 }}
      >
        <span className="status-dot" />
        <span>{t("hero.status")}</span>
      </motion.a>

      {/* Profile Photo */}
      <motion.div
        className="hero-avatar"
        initial={{ opacity: 0, scale: 0.65 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="hero-avatar-glow" />
        <Image
          src="/khoazandev/avatar.jpg"
          alt="Lê Văn Khoa"
          width={152}
          height={152}
          priority
          className="hero-avatar-img"
        />
      </motion.div>

      <motion.div
        className="hero-badge"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        {t("hero.badge")}
      </motion.div>

      <motion.h1
        className="hero-name"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        Lê Văn <span className="accent">Khoa</span>
      </motion.h1>

      <motion.p
        className="hero-tagline"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        {t("hero.tagline")}
      </motion.p>

      <motion.div
        className="hero-typing"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.65, duration: 0.4 }}
      >
        <span className="prompt">&gt; </span>
        {text}
        <span className="cursor">|</span>
      </motion.div>

      <motion.div
        className="hero-cta"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.75, duration: 0.5 }}
      >
        <a href="#experience" className="btn btn-primary">
          <FiBriefcase size={16} />
          {t("hero.cta.experience")}
        </a>
        <a href="#projects" className="btn btn-outline">
          {t("hero.cta.projects")}
        </a>
        <a
          href={cvPath}
          download={cvFileName}
          className="btn btn-outline"
        >
          <FiDownload size={16} />
          {t("hero.cta.cv")}
        </a>
      </motion.div>

      <motion.div
        className="hero-socials"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.5 }}
      >
        <a href="https://github.com/khoazandev" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
          <FiGithub size={20} />
        </a>
        <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
          <FiLinkedin size={20} />
        </a>
        <a href="mailto:levankhoa2004@gmail.com" aria-label="Email">
          <FiMail size={20} />
        </a>
        <a href="tel:0766772215" aria-label="Phone">
          <FiPhone size={19} />
        </a>
      </motion.div>

      {/* Key Metrics Strip */}
      <motion.div
        className="hero-stats-strip"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0, duration: 0.6 }}
      >
        {stats.map((s) => (
          <div className="hero-stat-item" key={s.label}>
            <div className="hero-stat-value">{s.value}</div>
            <div className="hero-stat-label">{s.label}</div>
          </div>
        ))}
      </motion.div>
    </motion.section>
  );
}

/* ================================================================
   WORK EXPERIENCE TIMELINE
   ================================================================ */
function Experience() {
  const { t } = useLocale();

  const experiences = [
    {
      company: t("exp.0.company"),
      role: t("exp.0.role"),
      date: t("exp.0.date"),
      badge: t("exp.0.badge"),
      bullets: [t("exp.0.b1"), t("exp.0.b2"), t("exp.0.b3")],
      tech: ["Figma", "HTML5", "CSS3", "JavaScript", "TailwindCSS", "WordPress", "On-page SEO", "PageSpeed Insights"],
    },
    {
      company: t("exp.1.company"),
      role: t("exp.1.role"),
      date: t("exp.1.date"),
      badge: t("exp.1.badge"),
      bullets: [t("exp.1.b1"), t("exp.1.b2"), t("exp.1.b3")],
      tech: ["React.js", "TypeScript", "TailwindCSS", "Redux Toolkit", "Axios", "RESTful API", "Git"],
    },
  ];

  return (
    <section id="experience" className="section">
      <ScrollReveal>
        <div className="section-label">{t("exp.label")}</div>
        <h2 className="section-title">{t("exp.title")}</h2>
      </ScrollReveal>

      <div className="exp-timeline">
        {experiences.map((exp, i) => (
          <ScrollReveal key={exp.company} delay={i * 0.1}>
            <TiltCard>
              <div className="exp-card">
                <div className="exp-node-dot" />
                <div className="exp-header">
                  <div className="exp-title-group">
                    <div className="exp-role-row">
                      <span className="exp-icon-box">
                        <FiBriefcase size={18} />
                      </span>
                      <span className="exp-role">{exp.role}</span>
                      <span className="exp-highlight-badge">{exp.badge}</span>
                    </div>
                    <h3 className="exp-company">{exp.company}</h3>
                  </div>
                  <div className="exp-date">
                    <FiCalendar size={14} />
                    <span>{exp.date}</span>
                  </div>
                </div>

                <ul className="exp-bullets">
                  {exp.bullets.map((b) => (
                    <li key={b}>
                      <FiCheckCircle size={15} className="exp-bullet-icon" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>

                <div className="exp-tech-list">
                  {exp.tech.map((tech) => (
                    <span key={tech} className="project-tech-pill">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </TiltCard>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}

/* ================================================================
   PROJECTS (Flagship Spotlight with Live Previews + Filterable Grid)
   ================================================================ */
function Projects() {
  const { t } = useLocale();
  const [activeFilter, setActiveFilter] = useState("All");

  const projectsData = [
    {
      title: "SmartHire – Recruitment Platform",
      role: t("projects.0.role"),
      desc: t("projects.0.desc"),
      featured: true,
      preview: "/khoazandev/project-smarthire.png",
      accent: "linear-gradient(135deg, rgba(0, 255, 136, 0.16), rgba(59, 130, 246, 0.14))",
      highlights: [t("projects.0.h1"), t("projects.0.h2"), t("projects.0.h3")],
      tech: ["Next.js", "TypeScript", "Zustand", "TailwindCSS", "Axios", "React Hook Form", "Zod"],
      github: "https://github.com/khoazandev/smart-hire-web",
      live: "https://khoazandev.github.io/smart-hire-web/",
    },
    {
      title: "IELTS Mock Test & AI Platform",
      role: t("projects.1.role"),
      desc: t("projects.1.desc"),
      featured: true,
      preview: "/khoazandev/project-ielts.png",
      accent: "linear-gradient(135deg, rgba(59, 130, 246, 0.16), rgba(168, 85, 247, 0.14))",
      highlights: [t("projects.1.h1"), t("projects.1.h2"), t("projects.1.h3")],
      tech: ["React.js", "TypeScript", "Vite", "Zustand", "TailwindCSS", "Vitest", "Gemini AI SDK", "MediaRecorder API"],
      github: "https://github.com/khoazandev/IELTS_WEB",
      live: "https://khoazandev.github.io/IELTS_WEB/",
    },
    {
      title: "Axiom – Enterprise Meeting OS",
      role: t("projects.2.role"),
      desc: t("projects.2.desc"),
      featured: false,
      accent: "linear-gradient(135deg, rgba(0, 255, 136, 0.1), rgba(16, 185, 129, 0.08))",
      highlights: [t("projects.2.h1"), t("projects.2.h2")],
      tech: ["Next.js", "TypeScript", "FastAPI", "LiveKit WebRTC", "Docker"],
      github: "https://github.com/khoazandev/Axiom-meeting-protocol",
    },
    {
      title: "NovaCart – E-Commerce Platform",
      role: t("projects.3.role"),
      desc: t("projects.3.desc"),
      featured: false,
      accent: "linear-gradient(135deg, rgba(168, 85, 247, 0.12), rgba(59, 130, 246, 0.08))",
      highlights: [t("projects.3.h1"), t("projects.3.h2")],
      tech: ["React.js", "Vite", "React Router", "Context API"],
      github: "https://github.com/khoazandev/NovaCart",
    },
    {
      title: "SmartHire – Enterprise Backend API",
      role: t("projects.4.role"),
      desc: t("projects.4.desc"),
      featured: false,
      accent: "linear-gradient(135deg, rgba(59, 130, 246, 0.12), rgba(0, 255, 136, 0.08))",
      highlights: [t("projects.4.h1"), t("projects.4.h2")],
      tech: ["Java", "Spring Boot", "Spring Security", "MySQL", "Docker"],
      github: "https://github.com/khoazandev/smart-hire-backend",
    },
  ];

  const allTechs = useMemo(() => {
    return ["All", "Next.js", "React.js", "TypeScript", "Zustand", "TailwindCSS", "Gemini AI SDK", "Spring Boot", "FastAPI"];
  }, []);

  const filtered =
    activeFilter === "All"
      ? projectsData
      : projectsData.filter((p) => p.tech.includes(activeFilter));

  return (
    <section id="projects" className="section">
      <ScrollReveal>
        <div className="section-label">{t("projects.label")}</div>
        <h2 className="section-title">{t("projects.title")}</h2>
      </ScrollReveal>

      <ScrollReveal>
        <div className="project-filters">
          {allTechs.map((tech) => (
            <button
              key={tech}
              className={`filter-pill${activeFilter === tech ? " active" : ""}`}
              onClick={() => setActiveFilter(tech)}
            >
              {tech}
            </button>
          ))}
        </div>
      </ScrollReveal>

      <div className="projects-grid">
        {filtered.map((p, i) => (
          <ScrollReveal key={p.title} delay={i * 0.07}>
            <TiltCard className={p.featured ? "featured-tilt" : ""}>
              <div className={`project-card${p.featured ? " project-card-featured" : ""}`}>
                {p.preview && (
                  <a
                    href={p.live || p.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-preview-wrap"
                    aria-label={p.title}
                  >
                    <div className="project-browser-bar">
                      <span className="browser-dot red" />
                      <span className="browser-dot yellow" />
                      <span className="browser-dot green" />
                      <span className="browser-url">{p.live?.replace("https://", "")}</span>
                    </div>
                    <div className="project-preview-img-box">
                      <Image
                        src={p.preview}
                        alt={p.title}
                        width={640}
                        height={360}
                        className="project-preview-img"
                      />
                    </div>
                  </a>
                )}

                <div className="project-banner" style={{ background: p.accent }}>
                  <div className="project-meta-top">
                    <span className="project-role-tag">{p.role}</span>
                    {p.featured && (
                      <span className="project-featured-badge">
                        <FiStar size={12} /> {t("projects.featured")}
                      </span>
                    )}
                  </div>
                  <h3>{p.title}</h3>
                </div>

                <div className="project-body">
                  <p className="project-desc">{p.desc}</p>

                  <ul className="project-highlights">
                    {p.highlights.map((h) => (
                      <li key={h}>
                        <FiCheckCircle size={14} className="highlight-icon" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="project-tech-pills">
                    {p.tech.map((tech) => (
                      <span className="project-tech-pill" key={tech}>
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="project-actions">
                    {p.live && (
                      <a
                        href={p.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-action-btn primary"
                      >
                        <FiExternalLink size={15} />
                        {t("projects.liveDemo")}
                      </a>
                    )}
                    <a
                      href={p.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-action-btn"
                    >
                      <FiGithub size={15} />
                      {t("projects.sourceCode")}
                    </a>
                  </div>
                </div>
              </div>
            </TiltCard>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}

/* ================================================================
   SKILLS
   ================================================================ */
function Skills() {
  const { t } = useLocale();

  const skillsData = [
    {
      category: t("skills.cat.languages"),
      items: ["JavaScript (ES6+)", "TypeScript", "HTML5 / CSS3", "C/C++ (Algorithms)", "Java", "Python"],
      icon: <FiCode size={20} />,
    },
    {
      category: t("skills.cat.frontend"),
      items: ["React.js", "Next.js", "TailwindCSS", "Framer Motion", "Responsive Web", "Figma (Pixel-Perfect UI/UX)"],
      icon: <FiLayers size={20} />,
    },
    {
      category: t("skills.cat.state"),
      items: ["Redux Toolkit", "Zustand", "React Hook Form", "Zod Validation", "Axios Interceptors", "RESTful APIs"],
      icon: <FiCloud size={20} />,
    },
    {
      category: t("skills.cat.tools"),
      items: ["Git / GitHub", "Vite & Vitest", "Google Gemini AI SDK", "MediaRecorder API", "On-page SEO", "PageSpeed / Lighthouse"],
      icon: <FiTool size={20} />,
    },
    {
      category: t("skills.cat.backend"),
      items: ["Spring Boot", "Node.js / Express", "FastAPI", "Prisma ORM", "MySQL / PostgreSQL", "JWT & RBAC"],
      icon: <FiServer size={20} />,
    },
    {
      category: t("skills.cat.mobile"),
      items: ["Docker", "GitHub Actions CI/CD", "LiveKit WebRTC", "WordPress", "Vercel", "Cloudflare"],
      icon: <FiSmartphone size={20} />,
    },
  ];

  return (
    <section id="skills" className="section">
      <ScrollReveal>
        <div className="section-label">{t("skills.label")}</div>
        <h2 className="section-title">{t("skills.title")}</h2>
      </ScrollReveal>

      <div className="skills-grid">
        {skillsData.map((cat, i) => (
          <ScrollReveal key={cat.category} delay={i * 0.07}>
            <TiltCard>
              <div className="skill-category">
                <div className="skill-category-header">
                  <span className="skill-category-icon-box">{cat.icon}</span>
                  <div className="skill-category-title">{cat.category}</div>
                </div>
                <div className="skill-tags">
                  {cat.items.map((skill) => (
                    <span className="skill-tag" key={skill}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </TiltCard>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}

/* ================================================================
   ABOUT, EDUCATION & AWARDS
   ================================================================ */
function About() {
  const { t } = useLocale();

  const infoCards = [
    { label: t("about.info.role.label"), value: t("about.info.role.value") },
    { label: t("about.info.stack.label"), value: t("about.info.stack.value") },
    { label: t("about.info.location.label"), value: t("about.info.location.value") },
    { label: t("about.info.lang.label"), value: t("about.info.lang.value") },
  ];

  const awardsData = [
    { title: t("awards.0.title"), desc: t("awards.0.desc"), org: t("awards.0.org"), badge: "Top 16" },
    { title: t("awards.1.title"), desc: t("awards.1.desc"), org: t("awards.1.org"), badge: "PROCON" },
    { title: t("awards.2.title"), desc: t("awards.2.desc"), org: t("awards.2.org"), badge: "UI/UX" },
    { title: t("awards.3.title"), desc: t("awards.3.desc"), org: t("awards.3.org"), badge: "3rd Prize" },
  ];

  return (
    <section id="about" className="section">
      <ScrollReveal>
        <div className="section-label">{t("about.label")}</div>
        <h2 className="section-title">{t("about.title")}</h2>
      </ScrollReveal>

      <div className="about-content">
        <ScrollReveal delay={0.08}>
          <div className="about-text">
            <p dangerouslySetInnerHTML={{ __html: t("about.p1") }} />
            <p dangerouslySetInnerHTML={{ __html: t("about.p2") }} />
            <p>{t("about.p3")}</p>

            <div className="about-info-grid">
              {infoCards.map((card) => (
                <div className="about-info-card" key={card.label}>
                  <div className="label">{card.label}</div>
                  <div className="value">{card.value}</div>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.16}>
          <div className="education-card">
            <div className="edu-header">
              <span className="edu-icon-box">
                <FiBookOpen size={22} />
              </span>
              <span className="edu-badge">{t("edu.badge")}</span>
            </div>
            <h3 className="edu-school">{t("edu.school")}</h3>
            <p className="edu-degree">{t("edu.degree")}</p>
            <div className="edu-gpa-pill">{t("edu.gpa")}</div>

            <div className="edu-divider" />

            <div className="edu-club">
              <h4>{t("edu.club.title")}</h4>
              <p>{t("edu.club.desc")}</p>
            </div>
          </div>
        </ScrollReveal>
      </div>

      {/* Honors & Awards */}
      <div className="awards-section">
        <ScrollReveal>
          <div className="section-label">{t("awards.label")}</div>
          <h3 className="section-subtitle">{t("awards.title")}</h3>
        </ScrollReveal>
        <div className="awards-grid">
          {awardsData.map((award, i) => (
            <ScrollReveal key={award.title} delay={i * 0.08}>
              <div className="award-card">
                <div className="award-icon">
                  <FiAward size={22} />
                </div>
                <div className="award-info">
                  <div className="award-top-row">
                    <span className="award-year">{award.org}</span>
                    <span className="award-badge-pill">{award.badge}</span>
                  </div>
                  <h3>{award.title}</h3>
                  <p className="award-desc">{award.desc}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   CONTACT
   ================================================================ */
function Contact() {
  const { t, locale } = useLocale();
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [copied, setCopied] = useState(false);
  const cvPath = locale === "vi" ? "/khoazandev/CV_LeVanKhoa_VI.pdf" : "/khoazandev/CV_LeVanKhoa.pdf";
  const cvFileName = locale === "vi" ? "CV_LeVanKhoa_VI.pdf" : "CV_LeVanKhoa_EN.pdf";

  const copyEmail = () => {
    navigator.clipboard.writeText("levankhoa2004@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = `Portfolio Contact from ${formData.name}`;
    const body = `Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`;
    window.location.href = `mailto:levankhoa2004@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <section id="contact" className="section">
      <ScrollReveal>
        <div className="section-label">{t("contact.label")}</div>
        <h2 className="section-title">{t("contact.title")}</h2>
      </ScrollReveal>

      <div className="contact-grid">
        <ScrollReveal delay={0.1}>
          <div className="contact-info-side">
            <p className="contact-desc">{t("contact.text")}</p>
            <div className="contact-links-vertical">
              <div className="contact-link-row">
                <a href="mailto:levankhoa2004@gmail.com" className="contact-link flex-1">
                  <span className="icon"><FiMail size={20} /></span>
                  <span>levankhoa2004@gmail.com</span>
                </a>
                <button
                  type="button"
                  className="copy-email-btn"
                  onClick={copyEmail}
                  aria-label="Copy email"
                >
                  {copied ? <FiCheck size={16} /> : <FiCopy size={16} />}
                  <span>{copied ? t("contact.copied") : t("contact.copy")}</span>
                </button>
              </div>

              <a href="tel:0766772215" className="contact-link">
                <span className="icon"><FiPhone size={20} /></span>
                <span>{t("contact.phone")}</span>
              </a>

              <a href="https://github.com/khoazandev" target="_blank" rel="noopener noreferrer" className="contact-link">
                <span className="icon"><FiGithub size={20} /></span>
                <span>github.com/khoazandev</span>
              </a>

              <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className="contact-link">
                <span className="icon"><FiLinkedin size={20} /></span>
                <span>linkedin.com/in/khoazandev</span>
              </a>

              <a
                href={cvPath}
                download={cvFileName}
                className="contact-link highlight-cv"
              >
                <span className="icon"><FiDownload size={20} /></span>
                <span>{t("hero.cta.cv")} — {cvFileName}</span>
              </a>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                placeholder={t("contact.form.name")}
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                placeholder={t("contact.form.email")}
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <textarea
                placeholder={t("contact.form.message")}
                rows={5}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">
              <FiMail size={16} />
              {t("contact.form.send")}
            </button>
            {sent && (
              <motion.p
                className="form-success"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {t("contact.form.success")}
              </motion.p>
            )}
          </form>
        </ScrollReveal>
      </div>
    </section>
  );
}

/* ================================================================
   PAGE
   ================================================================ */
export default function Home() {
  const { t } = useLocale();
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <>
      <Preloader />
      <ScrollProgress />
      <ParticleField />
      <CustomCursor />

      <div className="floating-orbs">
        <div className="floating-orb" />
        <div className="floating-orb" />
        <div className="floating-orb" />
      </div>

      <Navbar onSearchOpen={() => setSearchOpen(true)} />

      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
      <LiveChat />

      <main>
        <Hero />
        <Experience />
        <Projects />
        <Skills />
        <About />
        <Contact />
      </main>

      <footer className="footer">
        <div className="footer-content">
          <p>
            © 2026{" "}
            <a href="https://github.com/khoazandev" target="_blank" rel="noopener noreferrer">
              Lê Văn Khoa
            </a>
            . {t("footer.text")}
          </p>
        </div>
      </footer>
    </>
  );
}
