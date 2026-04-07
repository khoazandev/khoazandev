"use client";

import { createContext, useContext } from "react";

export type Locale = "en" | "vi";

/* ============================================================
   TRANSLATION DICTIONARIES
   ============================================================ */
const translations: Record<Locale, Record<string, string>> = {
  en: {
    // Navbar
    "nav.home": "Home",
    "nav.skills": "Skills",
    "nav.projects": "Projects",
    "nav.about": "About",
    "nav.contact": "Contact",
    "nav.blog": "Blog",

    // Hero
    "hero.badge": "📍 Ho Chi Minh City, Vietnam",
    "hero.tagline":
      "Software Technology Student at HUTECH University, passionate about building modern web applications and cloud-native solutions.",
    "hero.cta.projects": "View Projects",
    "hero.cta.github": "GitHub ↗",
    "hero.cta.cv": "Download CV",
    "hero.typing.0": "Building web applications 🚀",
    "hero.typing.1": "Cloud infrastructure lover ☁️",
    "hero.typing.2": "Open-source contributor 💚",
    "hero.typing.3": "Always learning, always growing 📚",

    // About
    "about.label": "// about me",
    "about.title": "About Me",
    "about.p1":
      "I'm <strong>Lê Văn Khoa</strong>, a Software Technology student at <strong>Ho Chi Minh City University of Technology</strong> (HUTECH).",
    "about.p2":
      "I love building full-stack web applications with <strong>React, Next.js, and Node.js</strong>, deploying them on modern cloud platforms, and contributing to open-source projects. When I'm not coding, I'm competing in programming contests and sharpening my problem-solving skills.",
    "about.p3":
      "My goal is to become a well-rounded software engineer who creates impactful products that make technology more accessible.",
    "about.info.university.label": "University",
    "about.info.university.value": "HUTECH",
    "about.info.major.label": "Major",
    "about.info.major.value": "Software Technology",
    "about.info.location.label": "Location",
    "about.info.location.value": "HCM City",
    "about.info.focus.label": "Focus",
    "about.info.focus.value": "Full-Stack Web",

    // Skills
    "skills.label": "// tech stack",
    "skills.title": "Skills & Technologies",
    "skills.cat.languages": "Languages",
    "skills.cat.frontend": "Frontend",
    "skills.cat.backend": "Backend",
    "skills.cat.cloud": "Cloud & DevOps",
    "skills.cat.tools": "Tools & Services",
    "skills.cat.soft": "Soft Skills",
    "skills.soft.problem": "Problem Solving",
    "skills.soft.team": "Team Collaboration",
    "skills.soft.learner": "Fast Learner",

    // Awards
    "awards.label": "// achievements",
    "awards.title": "Awards & Recognition",
    "awards.0.title": "Procon 2025 OLP — Top 16",
    "awards.0.desc":
      "Reached Top 16 in the national Olympic Procon competition for innovative software projects.",
    "awards.1.title": "CJ Design Award — Encouragement Prize",
    "awards.1.desc":
      "Won an Encouragement Prize in the CJ Creative Design competition for UI/UX innovation.",
    "awards.2.title": "Procon HUTECH 2025 — Encouragement Prize",
    "awards.2.desc":
      "Earned an Encouragement Prize in the internal Procon competition at HUTECH University.",

    // Projects
    "projects.label": "// featured work",
    "projects.title": "My Projects",
    "projects.0.desc":
      "An AI-powered recruitment platform with smart CV analysis, job matching, AI interview simulations, and auto-generated cover letters — built with polished UI, Framer Motion animations, and mock data.",
    "projects.1.desc":
      "A full-stack IELTS practice platform with mock exams, real-time scoring, vocabulary flashcards, listening & reading modules, and a personal dashboard to track study progress.",
    "projects.2.desc":
      "A mobile finance tracker with income/expense logging, smart categories with icons, monthly/yearly chart reports, and biometric login (fingerprint / FaceID) for security.",
    "projects.3.desc":
      "A modular mobile gaming hub built with Flutter & Flame Engine — features Snake game, pause/restart overlays, light/dark themes, audio effects, and offline leaderboard.",
    "projects.4.desc":
      "An interactive web app for rerolling and randomizing character tiers (F → SSS+) for games — with animated transitions and shareable results.",

    // Contact
    "contact.label": "// get in touch",
    "contact.title": "Contact Me",
    "contact.text":
      "I'm always open to new opportunities, collaborations, and interesting conversations. Feel free to reach out!",
    "contact.form.name": "Your Name",
    "contact.form.email": "Your Email",
    "contact.form.message": "Your Message",
    "contact.form.send": "Send Message",
    "contact.form.success": "Message sent! I'll get back to you soon.",

    // Subscribe
    "subscribe.label": "// stay updated",
    "subscribe.title": "Subscribe",
    "subscribe.text": "Get notified about new articles, projects, and updates. No spam, ever.",
    "subscribe.placeholder": "your@email.com",
    "subscribe.btn": "Subscribe",
    "subscribe.success": "Thanks for subscribing! 🎉",

    // Blog
    "blog.label": "// technical docs",
    "blog.title": "Blog & Articles",
    "blog.readMore": "Read more →",

    // Search
    "search.placeholder": "Search projects, skills, articles...",
    "search.noResults": "No results found.",

    // Login
    "login.title": "Welcome Back",
    "login.subtitle": "Sign in to access exclusive content",
    "login.username": "Username",
    "login.password": "Password",
    "login.submit": "Sign In",
    "login.error.empty": "Please fill in all fields.",
    "login.logout": "Sign Out",

    // Chat
    "chat.welcome": "Hi! 👋 Welcome to my portfolio. How can I help you?",
    "chat.autoReply": "Thanks for your message! I'll respond as soon as possible. You can also reach me at levankhoa2004@gmail.com 📧",
    "chat.status": "Usually replies within a few hours",
    "chat.inputPlaceholder": "Type a message...",

    // YouTube
    "youtube.label": "YouTube",
    "youtube.subscribers": "subscribers",

    // Theme
    "theme.dark": "Dark",
    "theme.light": "Light",

    // Footer
    "footer.text": "Built with Next.js & Framer Motion.",
  },

  vi: {
    // Navbar
    "nav.home": "Trang chủ",
    "nav.skills": "Kỹ năng",
    "nav.projects": "Dự án",
    "nav.about": "Giới thiệu",
    "nav.contact": "Liên hệ",
    "nav.blog": "Blog",

    // Hero
    "hero.badge": "📍 TP. Hồ Chí Minh, Việt Nam",
    "hero.tagline":
      "Sinh viên Công nghệ Phần mềm tại Đại học HUTECH, đam mê xây dựng ứng dụng web hiện đại và giải pháp cloud.",
    "hero.cta.projects": "Xem dự án",
    "hero.cta.github": "GitHub ↗",
    "hero.cta.cv": "Tải CV",
    "hero.typing.0": "Xây dựng ứng dụng web 🚀",
    "hero.typing.1": "Yêu thích hạ tầng đám mây ☁️",
    "hero.typing.2": "Đóng góp mã nguồn mở 💚",
    "hero.typing.3": "Luôn học hỏi, luôn phát triển 📚",

    // About
    "about.label": "// giới thiệu",
    "about.title": "Về tôi",
    "about.p1":
      "Tôi là <strong>Lê Văn Khoa</strong>, sinh viên ngành Công nghệ Phần mềm tại <strong>Đại học Công nghệ TP.HCM</strong> (HUTECH).",
    "about.p2":
      "Tôi thích xây dựng ứng dụng web full-stack với <strong>React, Next.js và Node.js</strong>, triển khai trên nền tảng cloud hiện đại và đóng góp cho các dự án mã nguồn mở. Khi không code, tôi tham gia các cuộc thi lập trình để rèn luyện kỹ năng giải quyết vấn đề.",
    "about.p3":
      "Mục tiêu của tôi là trở thành một kỹ sư phần mềm toàn diện, tạo ra những sản phẩm có tác động tích cực, giúp công nghệ trở nên dễ tiếp cận hơn.",
    "about.info.university.label": "Trường",
    "about.info.university.value": "HUTECH",
    "about.info.major.label": "Ngành",
    "about.info.major.value": "Công nghệ Phần mềm",
    "about.info.location.label": "Địa điểm",
    "about.info.location.value": "TP. HCM",
    "about.info.focus.label": "Chuyên ngành",
    "about.info.focus.value": "Full-Stack Web",

    // Skills
    "skills.label": "// kỹ năng",
    "skills.title": "Kỹ năng & Công nghệ",
    "skills.cat.languages": "Ngôn ngữ",
    "skills.cat.frontend": "Frontend",
    "skills.cat.backend": "Backend",
    "skills.cat.cloud": "Cloud & DevOps",
    "skills.cat.tools": "Công cụ & Dịch vụ",
    "skills.cat.soft": "Kỹ năng mềm",
    "skills.soft.problem": "Giải quyết vấn đề",
    "skills.soft.team": "Làm việc nhóm",
    "skills.soft.learner": "Học nhanh",

    // Awards
    "awards.label": "// thành tích",
    "awards.title": "Giải thưởng & Thành tích",
    "awards.0.title": "Procon 2025 OLP — Top 16",
    "awards.0.desc":
      "Lọt vào Top 16 cuộc thi Olympic Procon toàn quốc cho các dự án phần mềm sáng tạo.",
    "awards.1.title": "Giải CJ Design — Giải Khuyến Khích",
    "awards.1.desc":
      "Đạt Giải Khuyến Khích cuộc thi CJ Creative Design về đổi mới UI/UX.",
    "awards.2.title": "Procon HUTECH 2025 — Giải Khuyến Khích",
    "awards.2.desc":
      "Nhận Giải Khuyến Khích cuộc thi Procon nội bộ tại Đại học HUTECH.",

    // Projects
    "projects.label": "// dự án tiêu biểu",
    "projects.title": "Dự án của tôi",
    "projects.0.desc":
      "Nền tảng tuyển dụng thông minh ứng dụng AI: phân tích CV, gợi ý việc làm phù hợp, phỏng vấn mô phỏng AI, và tạo thư giới thiệu tự động — giao diện đẹp mắt với Framer Motion.",
    "projects.1.desc":
      "Nền tảng luyện thi IELTS full-stack với bài thi thử chấm điểm tự động, flashcard từ vựng, module luyện nghe & đọc, và bảng theo dõi tiến trình cá nhân.",
    "projects.2.desc":
      "Ứng dụng quản lý chi tiêu cá nhân trên di động với ghi chép thu/chi, danh mục thông minh có icon, biểu đồ báo cáo tháng/năm, và đăng nhập sinh trắc học (vân tay / FaceID).",
    "projects.3.desc":
      "Nền tảng game di động modular dùng Flutter & Flame Engine — game Snake, overlay tạm dừng/khởi động lại, theme sáng/tối, hiệu ứng âm thanh, và bảng xếp hạng offline.",
    "projects.4.desc":
      "Ứng dụng web random/reroll tier nhân vật (F → SSS+) cho game — hiệu ứng chuyển cảnh mượt và link chia sẻ kết quả.",

    // Contact
    "contact.label": "// liên hệ",
    "contact.title": "Liên hệ",
    "contact.text":
      "Tôi luôn sẵn sàng đón nhận cơ hội mới, hợp tác và những cuộc trò chuyện thú vị. Đừng ngần ngại liên hệ với tôi!",
    "contact.form.name": "Họ & Tên",
    "contact.form.email": "Email của bạn",
    "contact.form.message": "Nội dung tin nhắn",
    "contact.form.send": "Gửi tin nhắn",
    "contact.form.success": "Tin nhắn đã gửi! Tôi sẽ phản hồi sớm nhất.",

    // Subscribe
    "subscribe.label": "// cập nhật mới",
    "subscribe.title": "Đăng ký nhận tin",
    "subscribe.text": "Nhận thông báo về bài viết, dự án mới. Không spam.",
    "subscribe.placeholder": "email@cuaban.com",
    "subscribe.btn": "Đăng ký",
    "subscribe.success": "Cảm ơn bạn đã đăng ký! 🎉",

    // Blog
    "blog.label": "// bài viết kỹ thuật",
    "blog.title": "Blog & Bài viết",
    "blog.readMore": "Đọc thêm →",

    // Search
    "search.placeholder": "Tìm dự án, kỹ năng, bài viết...",
    "search.noResults": "Không tìm thấy kết quả.",

    // Login
    "login.title": "Chào mừng trở lại",
    "login.subtitle": "Đăng nhập để xem nội dung đặc biệt",
    "login.username": "Tên đăng nhập",
    "login.password": "Mật khẩu",
    "login.submit": "Đăng nhập",
    "login.error.empty": "Vui lòng điền đầy đủ thông tin.",
    "login.logout": "Đăng xuất",

    // Chat
    "chat.welcome": "Xin chào! 👋 Chào mừng đến portfolio của tôi. Tôi có thể giúp gì cho bạn?",
    "chat.autoReply": "Cảm ơn tin nhắn của bạn! Tôi sẽ phản hồi sớm nhất có thể. Bạn cũng có thể liên hệ qua levankhoa2004@gmail.com 📧",
    "chat.status": "Thường phản hồi trong vài giờ",
    "chat.inputPlaceholder": "Nhập tin nhắn...",

    // YouTube
    "youtube.label": "YouTube",
    "youtube.subscribers": "người đăng ký",

    // Theme
    "theme.dark": "Tối",
    "theme.light": "Sáng",

    // Footer
    "footer.text": "Xây dựng với Next.js & Framer Motion.",
  },
};

/* ============================================================
   CONTEXT
   ============================================================ */
export interface LocaleContextValue {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: (key: string) => string;
}

export const LocaleContext = createContext<LocaleContextValue>({
  locale: "en",
  setLocale: () => {},
  t: (k) => k,
});

export function useLocale() {
  return useContext(LocaleContext);
}

export function getTranslator(locale: Locale) {
  return (key: string) => translations[locale]?.[key] ?? key;
}
