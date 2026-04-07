"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { FiSearch, FiMoon, FiSun, FiDownload, FiExternalLink, FiGithub, FiLinkedin, FiMail, FiYoutube } from "react-icons/fi";
import { useLocale } from "./i18n";
import { useTheme } from "./components/ThemeProvider";
import ParticleField from "./components/ParticleField";
import CustomCursor from "./components/CustomCursor";
import TiltCard from "./components/TiltCard";
import Preloader from "./components/Preloader";
import SearchOverlay from "./components/SearchOverlay";
import LiveChat from "./components/LiveChat";

/* ================================================================
   SCROLL PROGRESS BAR
   ================================================================ */
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const [progress, setProgress] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (v) => setProgress(v));

  return (
    <div
      className="scroll-progress"
      style={{ width: `${progress * 100}%` }}
    />
  );
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
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ================================================================
   NAVBAR
   ================================================================ */
function Navbar({
  onSearchOpen,
}: {
  onSearchOpen: () => void;
}) {
  const [open, setOpen] = useState(false);
  const { locale, setLocale, t } = useLocale();
  const { theme, toggleTheme } = useTheme();

  const links = [
    { label: t("nav.skills"), href: "#skills" },
    { label: t("nav.projects"), href: "#projects" },
    { label: t("nav.about"), href: "#about" },
    { label: t("nav.contact"), href: "#contact" },
  ];

  return (
    <motion.nav
      className="navbar"
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="navbar-inner">
        <a href="#" className="navbar-logo">
          khoa<span>.dev</span>
        </a>

        <ul className={`navbar-links ${open ? "open" : ""}`}>
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} onClick={() => setOpen(false)}>
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="navbar-right">
          <button className="icon-btn" onClick={onSearchOpen} aria-label="Search">
            <FiSearch size={18} />
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
   HERO
   ================================================================ */
function Hero() {
  const { t } = useLocale();

  const phrases = [
    t("hero.typing.0"),
    t("hero.typing.1"),
    t("hero.typing.2"),
    t("hero.typing.3"),
  ];
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
  }, [phrases[0]]); // reset when locale changes

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
      }, 55);
    } else if (!isDeleting && text.length === phrase.length) {
      setIsPaused(true);
    } else if (isDeleting && text.length > 0) {
      timerRef.current = setTimeout(() => {
        setText(phrase.slice(0, text.length - 1));
      }, 30);
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
  const opacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.15], [1, 0.95]);

  return (
    <motion.section className="hero" style={{ opacity, scale }}>
      {/* Aurora gradient orbs */}
      <div className="hero-aurora">
        <div className="hero-aurora-orb" />
        <div className="hero-aurora-orb" />
        <div className="hero-aurora-orb" />
      </div>

      {/* Profile Photo */}
      <motion.div
        className="hero-avatar"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="hero-avatar-glow" />
        <img src="/1dao2mang/avatar.jpg" alt="Lê Văn Khoa" className="hero-avatar-img" />
      </motion.div>

      <motion.div
        className="hero-badge"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        {t("hero.badge")}
      </motion.div>

      <motion.h1
        className="hero-name"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.7 }}
      >
        Lê Văn <span className="accent">Khoa</span>
      </motion.h1>

      <motion.p
        className="hero-tagline"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
      >
        {t("hero.tagline")}
      </motion.p>

      <motion.div
        className="hero-typing"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.0, duration: 0.5 }}
      >
        <span>&gt; </span>
        {text}
        <span className="cursor">|</span>
      </motion.div>

      <motion.div
        className="hero-cta"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.6 }}
      >
        <a href="#projects" className="btn btn-primary">
          {t("hero.cta.projects")}
        </a>
        <a
          href="https://github.com/1dao2mang"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-outline"
        >
          {t("hero.cta.github")}
        </a>
        <a href="/1dao2mang/CV_LeVanKhoa.pdf" download="CV_LeVanKhoa.pdf" className="btn btn-outline">
          <FiDownload size={16} />
          {t("hero.cta.cv")}
        </a>
      </motion.div>

      {/* Social links */}
      <motion.div
        className="hero-socials"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.6 }}
      >
        <a href="https://github.com/1dao2mang" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><FiGithub size={20} /></a>
        <a href="https://www.linkedin.com/in/khoazanday241204/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><FiLinkedin size={20} /></a>
        <a href="mailto:levankhoa2004@gmail.com" aria-label="Email"><FiMail size={20} /></a>
        <a href="https://youtube.com/@1dao2mang" target="_blank" rel="noopener noreferrer" aria-label="YouTube"><FiYoutube size={20} /></a>
      </motion.div>
    </motion.section>
  );
}

/* ================================================================
   SKILLS
   ================================================================ */
function Skills() {
  const { t } = useLocale();

  const skillsData = [
    { category: t("skills.cat.languages"), items: ["TypeScript", "JavaScript", "Python"], icon: "💻" },
    { category: t("skills.cat.frontend"), items: ["React", "Next.js", "HTML/CSS", "Tailwind CSS"], icon: "🎨" },
    { category: t("skills.cat.backend"), items: ["Node.js", "Express", "REST APIs", "Prisma"], icon: "⚙️" },
    { category: t("skills.cat.cloud"), items: ["AWS", "GCP", "Cloudflare", "Vercel", "GitHub Actions", "Docker"], icon: "☁️" },
    { category: t("skills.cat.tools"), items: ["Git", "Figma", "Postman", "Vitest", "ESLint"], icon: "🔧" },
    { category: t("skills.cat.soft"), items: [t("skills.soft.problem"), t("skills.soft.team"), t("skills.soft.learner")], icon: "🧠" },
  ];

  return (
    <section id="skills" className="section">
      <ScrollReveal>
        <div className="section-label">{t("skills.label")}</div>
        <h2 className="section-title">{t("skills.title")}</h2>
      </ScrollReveal>

      <div className="skills-grid">
        {skillsData.map((cat, i) => (
          <ScrollReveal key={cat.category} delay={i * 0.08}>
            <TiltCard>
              <div className="skill-category">
                <div className="skill-category-header">
                  <span className="skill-category-icon">{cat.icon}</span>
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
   PROJECTS
   ================================================================ */
function Projects() {
  const { t } = useLocale();
  const [activeFilter, setActiveFilter] = useState("All");

  const projectsData = [
    {
      title: "SmartHire AI",
      desc: t("projects.0.desc"),
      tech: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
      github: "https://github.com/tuananhit1612/smart-hire-web",
      live: "https://tuananhit1612.github.io/smart-hire-web/",
    },
    {
      title: "IELTS_WEB",
      desc: t("projects.1.desc"),
      tech: ["React", "TypeScript", "Vite", "Tailwind CSS", "Zustand"],
      github: "https://github.com/1dao2mang/IELTS_WEB",
      live: "https://1dao2mang.github.io/IELTS_WEB/",
    },
    {
      title: "Personal Finance Manager",
      desc: t("projects.2.desc"),
      tech: ["Flutter", "Dart", "SQLite"],
      github: "https://github.com/1dao2mang/Personal-Finance-Manager",
    },
    {
      title: "GamePlus",
      desc: t("projects.3.desc"),
      tech: ["Flutter", "Flame Engine", "FastAPI"],
      github: "https://github.com/1dao2mang/game_plus",
    },
    {
      title: "Reroll-DoMiXi",
      desc: t("projects.4.desc"),
      tech: ["Next.js", "TypeScript", "CSS"],
      github: "https://github.com/1dao2mang/Reroll-DoMiXi",
    },
  ];

  const allTechs = useMemo(() => {
    const set = new Set<string>();
    projectsData.forEach((p) => p.tech.forEach((t) => set.add(t)));
    return ["All", ...Array.from(set).sort()];
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filtered = activeFilter === "All"
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
          {allTechs.map((tech: string) => (
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
          <ScrollReveal key={p.title} delay={i * 0.08}>
            <TiltCard>
              <div className="project-card">
                <div className="project-header">
                  <span className="project-folder-icon">📂</span>
                  <div className="project-links">
                    <a href={p.github} target="_blank" rel="noopener noreferrer" aria-label={`GitHub: ${p.title}`}>
                      <FiGithub size={18} />
                    </a>
                    {p.live && (
                      <a href={p.live} target="_blank" rel="noopener noreferrer" aria-label={`Live: ${p.title}`}>
                        <FiExternalLink size={18} />
                      </a>
                    )}
                  </div>
                </div>
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
                <div className="project-tech">
                  {p.tech.map((tech, j) => (
                    <span key={tech}>
                      {tech}
                      {j < p.tech.length - 1 && " · "}
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
   ABOUT (with Awards integrated)
   ================================================================ */
function About() {
  const { t } = useLocale();

  const infoCards = [
    { label: t("about.info.university.label"), value: t("about.info.university.value") },
    { label: t("about.info.major.label"), value: t("about.info.major.value") },
    { label: t("about.info.location.label"), value: t("about.info.location.value") },
    { label: t("about.info.focus.label"), value: t("about.info.focus.value") },
  ];

  const awardsData = [
    { icon: "🏆", title: t("awards.0.title"), desc: t("awards.0.desc"), year: "2025" },
    { icon: "🎨", title: t("awards.1.title"), desc: t("awards.1.desc"), year: "2025" },
    { icon: "💻", title: t("awards.2.title"), desc: t("awards.2.desc"), year: "2025" },
  ];

  return (
    <section id="about" className="section">
      <ScrollReveal>
        <div className="section-label">{t("about.label")}</div>
        <h2 className="section-title">{t("about.title")}</h2>
      </ScrollReveal>

      <div className="about-content">
        <ScrollReveal delay={0.1}>
          <div className="about-text">
            <p dangerouslySetInnerHTML={{ __html: t("about.p1") }} />
            <p dangerouslySetInnerHTML={{ __html: t("about.p2") }} />
            <p>{t("about.p3")}</p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div className="about-info-grid">
            {infoCards.map((card) => (
              <div className="about-info-card" key={card.label}>
                <div className="label">{card.label}</div>
                <div className="value">{card.value}</div>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>

      {/* Awards integrated */}
      <div className="awards-section">
        <ScrollReveal>
          <div className="section-label">{t("awards.label")}</div>
          <h3 className="section-subtitle">{t("awards.title")}</h3>
        </ScrollReveal>
        <div className="awards-list">
          {awardsData.map((award, i) => (
            <ScrollReveal key={award.title} delay={i * 0.1}>
              <div className="award-card">
                <div className="award-icon">{award.icon}</div>
                <div className="award-info">
                  <h3>{award.title}</h3>
                  <p className="award-desc">{award.desc}</p>
                  <span className="award-year">{award.year}</span>
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
  const { t } = useLocale();
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = `Portfolio Contact from ${formData.name}`;
    const body = `Name: ${formData.name}%0AEmail: ${formData.email}%0A%0A${formData.message}`;
    window.open(`mailto:levankhoa2004@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`);
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
              <a href="mailto:levankhoa2004@gmail.com" className="contact-link">
                <span className="icon"><FiMail size={20} /></span>
                levankhoa2004@gmail.com
              </a>
              <a href="https://github.com/1dao2mang" target="_blank" rel="noopener noreferrer" className="contact-link">
                <span className="icon"><FiGithub size={20} /></span>
                GitHub
              </a>
              <a href="https://www.linkedin.com/in/khoazanday241204/" target="_blank" rel="noopener noreferrer" className="contact-link">
                <span className="icon"><FiLinkedin size={20} /></span>
                LinkedIn
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
   SUBSCRIBE
   ================================================================ */
function Subscribe() {
  const { t } = useLocale();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    // Mock: store in localStorage
    const subs = JSON.parse(localStorage.getItem("portfolio-subs") || "[]");
    subs.push({ email, date: new Date().toISOString() });
    localStorage.setItem("portfolio-subs", JSON.stringify(subs));
    setSubscribed(true);
    setEmail("");
    setTimeout(() => setSubscribed(false), 4000);
  };

  return (
    <section id="subscribe" className="section subscribe-section">
      <div className="subscribe-bg-pattern" />
      <ScrollReveal>
        <div className="subscribe-content">
          <div className="section-label">{t("subscribe.label")}</div>
          <h2 className="section-title">{t("subscribe.title")}</h2>
          <p className="subscribe-text">{t("subscribe.text")}</p>
          <form className="subscribe-form" onSubmit={handleSubscribe}>
            <input
              type="email"
              placeholder={t("subscribe.placeholder")}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit" className="btn btn-primary">
              {t("subscribe.btn")}
            </button>
          </form>
          {subscribed && (
            <motion.p
              className="subscribe-success"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {t("subscribe.success")}
            </motion.p>
          )}
        </div>
      </ScrollReveal>
    </section>
  );
}

/* ================================================================
   BLOG / TECHNICAL DOCS
   ================================================================ */
function Blog() {
  const { t } = useLocale();

  const articles = [
    {
      title: "Building a Design System with Tailwind CSS",
      excerpt: "Learn how to create a scalable, consistent design system using Tailwind CSS utility classes and custom configuration.",
      tags: ["Tailwind CSS", "Design System", "Frontend"],
      date: "Mar 2026",
      readTime: "8 min read",
    },
    {
      title: "CI/CD Pipeline with GitHub Actions",
      excerpt: "Step-by-step guide to setting up automated testing, linting, and deployment using GitHub Actions for Next.js projects.",
      tags: ["DevOps", "GitHub Actions", "CI/CD"],
      date: "Feb 2026",
      readTime: "12 min read",
    },
    {
      title: "State Management: Zustand vs Redux",
      excerpt: "A practical comparison of Zustand and Redux Toolkit for state management in modern React applications.",
      tags: ["React", "Zustand", "Redux"],
      date: "Jan 2026",
      readTime: "10 min read",
    },
    {
      title: "Docker for Frontend Developers",
      excerpt: "Why and how frontend developers should use Docker for local development, testing, and consistent deployments.",
      tags: ["Docker", "DevOps", "Frontend"],
      date: "Dec 2025",
      readTime: "6 min read",
    },
  ];

  return (
    <section id="blog" className="section">
      <ScrollReveal>
        <div className="section-label">{t("blog.label")}</div>
        <h2 className="section-title">{t("blog.title")}</h2>
      </ScrollReveal>

      <div className="blog-grid">
        {articles.map((article, i) => (
          <ScrollReveal key={article.title} delay={i * 0.08}>
            <div className="blog-card">
              <div className="blog-card-meta">
                <span className="blog-date">{article.date}</span>
                <span className="blog-readtime">{article.readTime}</span>
              </div>
              <h3 className="blog-card-title">{article.title}</h3>
              <p className="blog-card-excerpt">{article.excerpt}</p>
              <div className="blog-card-tags">
                {article.tags.map((tag) => (
                  <span key={tag} className="blog-tag">{tag}</span>
                ))}
              </div>
              <a href="#" className="blog-read-more">{t("blog.readMore")}</a>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}

/* ================================================================
   YOUTUBE BADGE
   ================================================================ */
function YouTubeBadge() {
  const { t } = useLocale();
  return (
    <div className="youtube-badge">
      <FiYoutube size={20} />
      <div className="youtube-info">
        <span className="youtube-count">1dao2mang</span>
        <span className="youtube-label">{t("youtube.label")}</span>
      </div>
    </div>
  );
}

/* ================================================================
   PAGE
   ================================================================ */
export default function Home() {
  const { t } = useLocale();
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <>
      <Preloader />
      <ScrollProgress />
      <ParticleField />
      <CustomCursor />

      {/* Floating background orbs */}
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
        <Skills />
        <Projects />
        <About />
        <Contact />
      </main>

      <footer className="footer">
        <div className="footer-content">
          <p>
            © 2025 <a href="https://github.com/1dao2mang">Lê Văn Khoa</a>.{" "}
            {t("footer.text")}
          </p>
        </div>
      </footer>
    </>
  );
}
