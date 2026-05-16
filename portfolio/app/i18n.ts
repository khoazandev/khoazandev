"use client";

import { createContext, useContext } from "react";

export type Locale = "en" | "vi";

const translations: Record<Locale, Record<string, string>> = {
  en: {
    "nav.skills": "Skills",
    "nav.projects": "Projects",
    "nav.about": "About",
    "nav.contact": "Contact",

    "hero.badge": "Based in Ho Chi Minh City, Vietnam",
    "hero.tagline":
      "Full-stack developer focused on polished, reliable web products across frontend, APIs, and deployment.",
    "hero.cta.projects": "View Projects",
    "hero.cta.github": "GitHub",
    "hero.cta.cv": "Download CV",
    "hero.typing.0": "Building production-minded web apps",
    "hero.typing.1": "Designing clean frontend experiences",
    "hero.typing.2": "Shipping APIs, dashboards, and auth flows",
    "hero.typing.3": "Learning fast through real projects",

    "about.label": "// about me",
    "about.title": "About Me",
    "about.p1":
      "I'm <strong>Lê Văn Khoa</strong>, a full-stack developer focused on practical web products with <strong>Next.js, React, Node.js, and Spring Boot</strong>.",
    "about.p2":
      "I enjoy translating product ideas into responsive interfaces, API designs, dashboards, authentication flows, and maintainable deployments.",
    "about.p3":
      "I'm open to Software Engineer Intern and Frontend Developer Intern roles where I can contribute across product, frontend, and backend work.",
    "about.info.role.label": "Role",
    "about.info.role.value": "Full-Stack Developer",
    "about.info.stack.label": "Core Stack",
    "about.info.stack.value": "Next.js / Spring Boot",
    "about.info.location.label": "Location",
    "about.info.location.value": "HCM City",
    "about.info.focus.label": "Focus",
    "about.info.focus.value": "Product Web Apps",

    "skills.label": "// core stack",
    "skills.title": "Skills & Technologies",
    "skills.cat.languages": "Languages",
    "skills.cat.frontend": "Frontend",
    "skills.cat.backend": "Backend",
    "skills.cat.cloud": "Deployment",
    "skills.cat.tools": "Tools",
    "skills.cat.soft": "Working Style",
    "skills.soft.problem": "Problem Solving",
    "skills.soft.team": "Team Collaboration",
    "skills.soft.learner": "Fast Learner",

    "awards.label": "// achievements",
    "awards.title": "Awards & Recognition",
    "awards.0.title": "Procon 2025 OLP — Top 16",
    "awards.0.desc":
      "Reached Top 16 in a national Procon competition for innovative software projects.",
    "awards.1.title": "CJ Design Award — Encouragement Prize",
    "awards.1.desc":
      "Won an Encouragement Prize in a creative design competition for UI/UX innovation.",
    "awards.2.title": "Procon 2025 — Encouragement Prize",
    "awards.2.desc":
      "Earned an Encouragement Prize in an internal software project competition.",

    "projects.label": "// featured work",
    "projects.title": "My Projects",
    "projects.0.desc":
      "An AI-powered recruitment platform with smart CV analysis, job matching, interview simulations, and recruiter dashboards.",
    "projects.1.desc":
      "A full-stack IELTS practice platform with mock exams, scoring flows, vocabulary tools, listening and reading modules, and progress tracking.",
    "projects.2.desc":
      "A mobile finance tracker with income/expense logging, category management, reports, and biometric login.",
    "projects.3.desc":
      "A modular mobile gaming hub built with Flutter and Flame Engine, including Snake gameplay, themes, audio effects, and offline leaderboard support.",
    "projects.4.desc":
      "An interactive web app for rerolling and randomizing character tiers for games, with animated transitions and shareable results.",

    "contact.label": "// get in touch",
    "contact.title": "Contact Me",
    "contact.text":
      "Open to internship opportunities, frontend work, and full-stack product collaboration.",
    "contact.form.name": "Your Name",
    "contact.form.email": "Your Email",
    "contact.form.message": "Your Message",
    "contact.form.send": "Open Email Draft",
    "contact.form.success": "Email draft opened. Thanks for reaching out.",

    "search.placeholder": "Search projects, skills, and sections...",
    "search.noResults": "No results found.",

    "chat.welcome": "Hi. Welcome to my portfolio. How can I help?",
    "chat.autoReply":
      "Thanks for your message. You can also reach me directly at levankhoa2004@gmail.com.",
    "chat.status": "Usually replies within a few hours",
    "chat.inputPlaceholder": "Type a message...",

    "footer.text": "Built with Next.js & Framer Motion.",
  },

  vi: {
    "nav.skills": "Kỹ năng",
    "nav.projects": "Dự án",
    "nav.about": "Giới thiệu",
    "nav.contact": "Liên hệ",

    "hero.badge": "TP. Hồ Chí Minh, Việt Nam",
    "hero.tagline":
      "Full-stack developer tập trung xây dựng sản phẩm web chỉn chu, ổn định từ giao diện, API đến triển khai.",
    "hero.cta.projects": "Xem dự án",
    "hero.cta.github": "GitHub",
    "hero.cta.cv": "Tải CV",
    "hero.typing.0": "Xây dựng web app theo hướng sản phẩm",
    "hero.typing.1": "Thiết kế trải nghiệm frontend gọn gàng",
    "hero.typing.2": "Xử lý API, dashboard và auth flow",
    "hero.typing.3": "Học nhanh qua dự án thực tế",

    "about.label": "// giới thiệu",
    "about.title": "Về tôi",
    "about.p1":
      "Tôi là <strong>Lê Văn Khoa</strong>, full-stack developer tập trung xây dựng sản phẩm web thực tế với <strong>Next.js, React, Node.js và Spring Boot</strong>.",
    "about.p2":
      "Tôi thích biến ý tưởng sản phẩm thành giao diện responsive, thiết kế API rõ ràng, dashboard, luồng xác thực và quy trình triển khai dễ bảo trì.",
    "about.p3":
      "Tôi đang mở cơ hội cho các vai trò Software Engineer Intern và Frontend Developer Intern, nơi tôi có thể đóng góp vào sản phẩm thật và phát triển trong môi trường kỹ thuật tốt.",
    "about.info.role.label": "Vai trò",
    "about.info.role.value": "Full-Stack Developer",
    "about.info.stack.label": "Core Stack",
    "about.info.stack.value": "Next.js / Spring Boot",
    "about.info.location.label": "Địa điểm",
    "about.info.location.value": "TP. HCM",
    "about.info.focus.label": "Tập trung",
    "about.info.focus.value": "Product Web Apps",

    "skills.label": "// kỹ năng chính",
    "skills.title": "Kỹ năng & Công nghệ",
    "skills.cat.languages": "Ngôn ngữ",
    "skills.cat.frontend": "Frontend",
    "skills.cat.backend": "Backend",
    "skills.cat.cloud": "Triển khai",
    "skills.cat.tools": "Công cụ",
    "skills.cat.soft": "Cách làm việc",
    "skills.soft.problem": "Giải quyết vấn đề",
    "skills.soft.team": "Làm việc nhóm",
    "skills.soft.learner": "Học nhanh",

    "awards.label": "// thành tích",
    "awards.title": "Giải thưởng & Thành tích",
    "awards.0.title": "Procon 2025 OLP — Top 16",
    "awards.0.desc":
      "Lọt vào Top 16 một cuộc thi Procon toàn quốc cho các dự án phần mềm sáng tạo.",
    "awards.1.title": "CJ Design Award — Giải Khuyến Khích",
    "awards.1.desc":
      "Đạt Giải Khuyến Khích trong cuộc thi thiết kế sáng tạo về đổi mới UI/UX.",
    "awards.2.title": "Procon 2025 — Giải Khuyến Khích",
    "awards.2.desc":
      "Nhận Giải Khuyến Khích trong một cuộc thi dự án phần mềm nội bộ.",

    "projects.label": "// dự án tiêu biểu",
    "projects.title": "Dự án của tôi",
    "projects.0.desc":
      "Nền tảng tuyển dụng thông minh ứng dụng AI: phân tích CV, gợi ý việc làm, phỏng vấn mô phỏng và dashboard cho nhà tuyển dụng.",
    "projects.1.desc":
      "Nền tảng luyện thi IELTS full-stack với bài thi thử, scoring flow, công cụ từ vựng, module nghe/đọc và theo dõi tiến độ.",
    "projects.2.desc":
      "Ứng dụng quản lý chi tiêu cá nhân trên di động với ghi chép thu/chi, quản lý danh mục, báo cáo và đăng nhập sinh trắc học.",
    "projects.3.desc":
      "Nền tảng game di động modular dùng Flutter và Flame Engine, gồm gameplay Snake, theme, hiệu ứng âm thanh và bảng xếp hạng offline.",
    "projects.4.desc":
      "Ứng dụng web random/reroll tier nhân vật cho game, có hiệu ứng chuyển cảnh và link chia sẻ kết quả.",

    "contact.label": "// liên hệ",
    "contact.title": "Liên hệ",
    "contact.text":
      "Tôi đang mở cơ hội thực tập, frontend work và hợp tác phát triển sản phẩm full-stack.",
    "contact.form.name": "Họ & Tên",
    "contact.form.email": "Email của bạn",
    "contact.form.message": "Nội dung tin nhắn",
    "contact.form.send": "Mở email draft",
    "contact.form.success": "Đã mở email draft. Cảm ơn bạn đã liên hệ.",

    "search.placeholder": "Tìm dự án, kỹ năng và section...",
    "search.noResults": "Không tìm thấy kết quả.",

    "chat.welcome": "Xin chào. Cảm ơn bạn đã ghé portfolio của tôi.",
    "chat.autoReply":
      "Cảm ơn tin nhắn của bạn. Bạn cũng có thể liên hệ trực tiếp qua levankhoa2004@gmail.com.",
    "chat.status": "Thường phản hồi trong vài giờ",
    "chat.inputPlaceholder": "Nhập tin nhắn...",

    "footer.text": "Xây dựng với Next.js & Framer Motion.",
  },
};

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
