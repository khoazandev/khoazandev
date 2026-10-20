"use client";

import { createContext, useContext } from "react";

export type Locale = "en" | "vi";

const translations: Record<Locale, Record<string, string>> = {
  en: {
    "nav.experience": "Experience",
    "nav.projects": "Projects",
    "nav.skills": "Skills",
    "nav.about": "Education",
    "nav.contact": "Contact",
    "nav.searchHint": "Search",

    "hero.status": "Software Engineering Graduate (2026) · Open to Frontend / Full-Stack Roles",
    "hero.badge": "Ho Chi Minh City, Vietnam · Frontend Developer (React.js / Next.js)",
    "hero.tagline":
      "Software Engineering graduate specializing in Frontend Development (React.js, Next.js, TypeScript) with 2 internships at AdsAgency.vn & YOOT Edu and Top 16 National Olympiad in Informatics.",
    "hero.cta.projects": "Explore Projects",
    "hero.cta.experience": "Work Experience",
    "hero.cta.cv": "Download CV (EN)",
    "hero.typing.0": "Built 10+ SEO-optimized, responsive production websites",
    "hero.typing.1": "Engineered 20+ reusable React/TypeScript UI components",
    "hero.typing.2": "Boosted Lighthouse score from 68 to 88+ & PageSpeed 85+",
    "hero.typing.3": "Top 16 National Olympiad in Informatics (PROCON)",

    "stats.exp.value": "2 Internships",
    "stats.exp.label": "AdsAgency.vn & YOOT Edu",
    "stats.web.value": "10+ Websites",
    "stats.web.label": "Production & Campaign Pages",
    "stats.perf.value": "88+ Score",
    "stats.perf.label": "Lighthouse & PageSpeed",
    "stats.olympiad.value": "Top 16",
    "stats.olympiad.label": "National Informatics Olympiad",

    "exp.label": "// career journey",
    "exp.title": "Work Experience",
    "exp.0.company": "AdsAgency Vietnam Co., Ltd (AdsAgency.vn)",
    "exp.0.role": "Web Designer & Frontend Developer Intern",
    "exp.0.date": "Jul 2026 – Oct 2026",
    "exp.0.badge": "10+ Client Websites",
    "exp.0.b1":
      "Designed UI/UX mockups and developed frontend solutions for 10+ corporate websites and campaign landing pages, ensuring pixel-perfect responsiveness across all devices.",
    "exp.0.b2":
      "Directly collaborated with 3 enterprise clients to gather requirements, crafted interactive Figma prototypes, and delivered final production websites on schedule.",
    "exp.0.b3":
      "Maintained and refined client websites; optimized web performance (PageSpeed 85+) and on-page SEO structure to boost Google & Facebook Ads conversion rates.",
    "exp.1.company": "YOOT Technology and Training Co., Ltd (YOOT Edu)",
    "exp.1.role": "Frontend Developer Intern",
    "exp.1.date": "Apr 2026 – Jul 2026",
    "exp.1.badge": "Lighthouse 68 → 88+",
    "exp.1.b1":
      "Engineered and optimized 20+ reusable UI components across 6 key learning modules on the YOOT Edu platform using React.js, TypeScript, and TailwindCSS.",
    "exp.1.b2":
      "Integrated 15+ RESTful endpoints via Axios and Redux Toolkit; applied client-side caching to reduce course navigation latency by 35%.",
    "exp.1.b3":
      "Participated in Agile sprints, resolved 25+ UI defects, and achieved 100% viewport responsiveness, elevating Google Lighthouse Performance from 68 to 88+.",

    "about.label": "// education & background",
    "about.title": "About & Education",
    "about.p1":
      "I'm <strong>Lê Văn Khoa</strong>, a Software Engineering graduate (2026) from <strong>HUTECH</strong> specializing in <strong>Frontend Development (React.js, Next.js, TypeScript)</strong> with strong algorithmic problem-solving skills (Top 16 National Olympiad in Informatics).",
    "about.p2":
      "Through two hands-on internships at <strong>AdsAgency.vn</strong> and <strong>YOOT Edu</strong>, I have delivered 10+ production websites and 20+ reusable React components, integrated 15+ RESTful APIs with Redux Toolkit/Axios, and improved Lighthouse performance from 68 to 88+.",
    "about.p3":
      "I excel at translating Figma design systems into pixel-perfect, accessible, SEO-ready web applications and collaborating closely with product teams and enterprise clients.",
    "about.info.role.label": "Specialization",
    "about.info.role.value": "Frontend Developer (React / Next.js)",
    "about.info.stack.label": "State & API",
    "about.info.stack.value": "Zustand · Redux Toolkit · Axios",
    "about.info.location.label": "Location",
    "about.info.location.value": "Ho Chi Minh City, VN",
    "about.info.lang.label": "Languages",
    "about.info.lang.value": "English (B1) · Vietnamese",

    "edu.badge": "2022 – 2026",
    "edu.school": "Ho Chi Minh City University of Technology (HUTECH)",
    "edu.degree": "Bachelor of Software Engineering",
    "edu.gpa": "GPA: 3.3 / 4.0",
    "edu.club.title": "Relevant Coursework & Competitive Programming",
    "edu.club.desc":
      "Coursework: Data Structures & Algorithms, OOP, Database Systems, Web Development, Software Engineering. Represented HUTECH at the National Olympiad in Informatics (PROCON Division).",

    "skills.label": "// technical arsenal",
    "skills.title": "Skills & Technologies",
    "skills.cat.languages": "Programming Languages",
    "skills.cat.frontend": "Frontend & UI/UX",
    "skills.cat.state": "State Management & APIs",
    "skills.cat.tools": "Tools, AI & Optimization",
    "skills.cat.backend": "Backend & Databases",
    "skills.cat.mobile": "DevOps & CMS",

    "awards.label": "// honors & recognition",
    "awards.title": "Awards & Achievements",
    "awards.0.title": "Top 16 Nationally — Vietnam National Olympiad in Informatics (OLP)",
    "awards.0.desc":
      "Reached Top 16 nationwide in the PROCON competitive programming division representing HUTECH.",
    "awards.0.org": "Vietnam National Olympiad · 2025",
    "awards.1.title": "Consolation Prize — HUTECH PROCON Algorithmic Programming Contest",
    "awards.1.desc":
      "Awarded for algorithmic optimization and strategic problem-solving under intensive time constraints.",
    "awards.1.org": "HUTECH University · 2025",
    "awards.2.title": "Consolation Prize — Web & UI/UX Design \"Design Your Future\"",
    "awards.2.desc":
      "Recognized by CJ OliveNetworks Vina for creative web product design and UI/UX engineering.",
    "awards.2.org": "CJ OliveNetworks Vina · 2025",
    "awards.3.title": "3rd Prize — University Individual Programming Contest",
    "awards.3.desc":
      "Placed 3rd in individual competitive programming covering advanced data structures and algorithms.",
    "awards.3.org": "HUTECH University · 2024",

    "projects.label": "// featured engineering work",
    "projects.title": "Featured Projects",
    "projects.featured": "Flagship Project",
    "projects.liveDemo": "Live Demo",
    "projects.sourceCode": "Source Code",
    "projects.0.role": "Frontend Developer (Team of 5) · Dec 2024 – Jun 2025",
    "projects.0.desc":
      "Online recruitment & applicant management platform featuring pixel-perfect Figma-to-Next.js interfaces, drag-and-drop Kanban pipeline tracking, and a live-preview CV Builder.",
    "projects.0.h1": "Drag-and-drop Kanban & Live CV Builder (React Hook Form + Zod)",
    "projects.0.h2": "Global state with Zustand & Role-Based Route Guards",
    "projects.0.h3": "13+ RESTful APIs via Axios with auto JWT refresh interceptors",
    "projects.1.role": "Frontend Developer (Solo) · Aug 2024 – Nov 2024",
    "projects.1.desc":
      "Computer-delivered IELTS simulation SPA with an independent split-pane layout, browser Speaking recorder with real-time waveform visualizer, and AI Writing evaluation.",
    "projects.1.h1": "Browser Speaking recording via MediaRecorder API & waveform",
    "projects.1.h2": "Async Writing Band Score JSON grading via Google Gemini AI SDK",
    "projects.1.h3": "Resolved audio memory leaks & unit-tested scoring with Vitest",
    "projects.2.role": "Full-Stack Engineer · 2026",
    "projects.2.desc":
      "On-premise enterprise meeting protocol (DX-OS) with LiveKit WebRTC video rooms, mandatory agenda gates, Whisper real-time transcription, and Llama-3 meeting summaries.",
    "projects.2.h1": "LiveKit WebRTC video calling & AI Whisper/Llama-3 pipeline",
    "projects.2.h2": "35 automated backend tests & Docker/PostgreSQL architecture",
    "projects.3.role": "Frontend Developer · 2026",
    "projects.3.desc":
      "Modern React + Vite e-commerce frontend featuring dynamic product filtering, persistent shopping cart, validated checkout flow, protected routes, and an Admin Dashboard.",
    "projects.3.h1": "Context API + useReducer state & localStorage persistence",
    "projects.3.h2": "Admin CRUD dashboard, protected routes & checkout validation",
    "projects.4.role": "Backend Contributor · 2025–2026",
    "projects.4.desc":
      "Enterprise Spring Boot backend powering SmartHire with JWT authentication, Role-Based Access Control (RBAC), job/company management APIs, and Dockerized deployment.",
    "projects.4.h1": "Spring Security, JWT refresh rotation & RBAC permissions",
    "projects.4.h2": "RESTful API architecture, file storage & dashboard analytics",

    "contact.label": "// get in touch",
    "contact.title": "Let's Build Together",
    "contact.text":
      "Available for Frontend Developer (React.js / Next.js) and Full-Stack opportunities in Ho Chi Minh City or remote.",
    "contact.copy": "Copy",
    "contact.copied": "Copied!",
    "contact.phone": "0766 772 215",
    "contact.form.name": "Your Name",
    "contact.form.email": "Your Email",
    "contact.form.message": "Tell me about your role or project...",
    "contact.form.send": "Open Email Draft",
    "contact.form.success": "Email draft opened! Looking forward to speaking with you.",

    "search.placeholder": "Search experience, projects, skills, awards...",
    "search.noResults": "No matching results found.",
    "search.quickLinks": "Quick Jump",

    "chat.welcome": "Hi! I'm Khoa's portfolio assistant. Select a topic below or ask me anything!",
    "chat.autoReply":
      "Thanks for reaching out! You can email Khoa directly at levankhoa2004@gmail.com or call 0766 772 215.",
    "chat.status": "Online · Quick Assistant",
    "chat.inputPlaceholder": "Ask about experience, projects, skills...",
    "chat.q.exp": "Work Experience?",
    "chat.a.exp":
      "Khoa completed 2 internships in 2026: 1) Web Designer & Frontend Intern at AdsAgency.vn (Jul–Oct 2026, built 10+ client websites, PageSpeed 85+) and 2) Frontend Developer Intern at YOOT Edu (Apr–Jul 2026, built 20+ React/TS components, 15+ APIs, boosted Lighthouse from 68 to 88+).",
    "chat.q.stack": "Core Tech Stack?",
    "chat.a.stack":
      "React.js, Next.js, TypeScript, TailwindCSS, Redux Toolkit, Zustand, React Hook Form, Zod, Axios, RESTful APIs, Figma (pixel-perfect slicing), Vitest, and Google Gemini AI SDK.",
    "chat.q.projects": "Top Projects?",
    "chat.a.projects":
      "1) SmartHire (Next.js + TS + Zustand recruitment platform with drag-drop Kanban, Live CV Builder & 13+ APIs) and 2) IELTS Mock Test & AI Platform (React + Vite + Gemini AI SDK + MediaRecorder Speaking visualizer).",
    "chat.q.contact": "Contact & CV?",
    "chat.a.contact":
      "Email: levankhoa2004@gmail.com · Phone: 0766 772 215 · LinkedIn: linkedin.com/in/khoazandev.",

    "footer.text": "Engineered with Next.js 16, TypeScript & Framer Motion.",
  },

  vi: {
    "nav.experience": "Kinh nghiệm",
    "nav.projects": "Dự án",
    "nav.skills": "Kỹ năng",
    "nav.about": "Học vấn",
    "nav.contact": "Liên hệ",
    "nav.searchHint": "Tìm kiếm",

    "hero.status": "Kỹ sư Phần mềm tốt nghiệp (2026) · Sẵn sàng nhận việc Frontend / Full-Stack",
    "hero.badge": "TP. Hồ Chí Minh · Frontend Developer (React.js / Next.js)",
    "hero.tagline":
      "Kỹ sư Phần mềm định hướng chuyên sâu Frontend Development (React.js, Next.js, TypeScript), sở hữu kinh nghiệm thực chiến qua 2 kỳ thực tập tại AdsAgency.vn & YOOT Edu cùng Top 16 Olympic Tin học Sinh viên Toàn quốc.",
    "hero.cta.projects": "Xem dự án",
    "hero.cta.experience": "Kinh nghiệm làm việc",
    "hero.cta.cv": "Tải CV (VI)",
    "hero.typing.0": "Trực tiếp phát triển 10+ website/landing page chuẩn SEO",
    "hero.typing.1": "Xây dựng 20+ reusable UI components với React & TypeScript",
    "hero.typing.2": "Tối ưu Lighthouse từ 68 lên 88+ & PageSpeed 85+",
    "hero.typing.3": "Top 16 Olympic Tin học Sinh viên Toàn quốc (PROCON)",

    "stats.exp.value": "2 Công ty",
    "stats.exp.label": "AdsAgency.vn & YOOT Edu",
    "stats.web.value": "10+ Website",
    "stats.web.label": "Chuẩn SEO & Responsive",
    "stats.perf.value": "88+ Điểm",
    "stats.perf.label": "Lighthouse & PageSpeed",
    "stats.olympiad.value": "Top 16",
    "stats.olympiad.label": "Olympic Tin học Toàn quốc",

    "exp.label": "// kinh nghiệm thực chiến",
    "exp.title": "Kinh nghiệm làm việc",
    "exp.0.company": "Công ty TNHH AdsAgency Việt Nam (AdsAgency.vn)",
    "exp.0.role": "Thực tập sinh Thiết kế & Lập trình Web (Web Designer & Frontend Intern)",
    "exp.0.date": "07/2026 – 10/2026",
    "exp.0.badge": "10+ Website Khách hàng",
    "exp.0.b1":
      "Phụ trách thiết kế UI/UX và lập trình frontend cho hơn 10 website và landing page chiến dịch cho khách hàng doanh nghiệp; đảm bảo hiển thị Responsive chuẩn xác trên mọi thiết bị.",
    "exp.0.b2":
      "Trực tiếp làm việc với 3 đối tác khách hàng để tiếp nhận yêu cầu, tư vấn giải pháp, thiết kế mockup/wireframe trên Figma và hiện thực hóa thành website hoàn chỉnh đúng hạn.",
    "exp.0.b3":
      "Chỉnh sửa, bảo trì website khách hàng; tối ưu tốc độ tải trang (PageSpeed 85+) và cấu trúc chuẩn SEO On-page giúp gia tăng trải nghiệm người dùng và tỷ lệ chuyển đổi cho các chiến dịch Google/Facebook Ads.",
    "exp.1.company": "Công ty TNHH Công nghệ và Đào tạo YOOT (YOOT Edu)",
    "exp.1.role": "Thực tập sinh Lập trình Frontend (Frontend Developer Intern)",
    "exp.1.date": "04/2026 – 07/2026",
    "exp.1.badge": "Lighthouse 68 → 88+",
    "exp.1.b1":
      "Phát triển và tối ưu hơn 20 reusable UI components cùng 6 màn hình module khóa học trên nền tảng YOOT Edu bằng React.js, TypeScript và TailwindCSS.",
    "exp.1.b2":
      "Tích hợp 15+ RESTful APIs với Axios & Redux Toolkit; áp dụng kỹ thuật caching dữ liệu giúp giảm 35% thời gian phản hồi khi điều hướng bài học.",
    "exp.1.b3":
      "Tham gia sprint Agile, xử lý triệt để 25+ bug giao diện và chuẩn hóa responsive trên 100% thiết bị, nâng điểm Google Lighthouse Performance từ 68 lên 88+.",

    "about.label": "// tóm tắt & học vấn",
    "about.title": "Về tôi & Học vấn",
    "about.p1":
      "Mình là <strong>Lê Văn Khoa</strong>, Kỹ sư Phần mềm tốt nghiệp năm 2026 tại <strong>ĐH Công nghệ TP.HCM (HUTECH)</strong>, định hướng chuyên sâu <strong>Frontend Development (React.js, Next.js, TypeScript)</strong> và sở hữu tư duy thuật toán nhạy bén (Top 16 Olympic Tin học Sinh viên Toàn quốc).",
    "about.p2":
      "Qua 2 kỳ thực tập tại <strong>AdsAgency.vn</strong> và <strong>YOOT Edu</strong>, mình đã trực tiếp phát triển hơn 10 website/landing page chuẩn SEO, xây dựng 20+ reusable UI components, tích hợp 15+ RESTful APIs (giảm 35% độ trễ điều hướng) và nâng điểm Lighthouse từ 68 lên 88+.",
    "about.p3":
      "Chuyên sâu hệ sinh thái React.js, Next.js, TypeScript, quản lý state hiện đại (Redux Toolkit, Zustand) và chuyển đổi thiết kế Figma thành giao diện web chuẩn xác (pixel-perfect).",
    "about.info.role.label": "Định hướng",
    "about.info.role.value": "Frontend Developer (React / Next.js)",
    "about.info.stack.label": "State & API",
    "about.info.stack.value": "Zustand · Redux Toolkit · Axios",
    "about.info.location.label": "Địa điểm",
    "about.info.location.value": "TP. Hồ Chí Minh",
    "about.info.lang.label": "Ngoại ngữ",
    "about.info.lang.value": "Tiếng Anh (B1) · Tiếng Việt",

    "edu.badge": "2022 – 2026",
    "edu.school": "Trường Đại học Công nghệ TP.HCM (HUTECH)",
    "edu.degree": "Chuyên ngành: Kỹ thuật Phần mềm",
    "edu.gpa": "GPA: 3.3 / 4.0",
    "edu.club.title": "Môn học tiêu biểu & Đội tuyển Olympic",
    "edu.club.desc":
      "Cấu trúc dữ liệu & Giải thuật, Lập trình hướng đối tượng (OOP), Cơ sở dữ liệu, Lập trình Web, Công nghệ phần mềm. Đại diện trường thi đấu Olympic Tin học Sinh viên Toàn quốc (Khối PROCON).",

    "skills.label": "// kỹ năng chuyên môn",
    "skills.title": "Kỹ năng & Công nghệ",
    "skills.cat.languages": "Ngôn ngữ lập trình",
    "skills.cat.frontend": "Frontend & UI/UX",
    "skills.cat.state": "Quản lý State & Thư viện",
    "skills.cat.tools": "Công cụ, AI & Tối ưu",
    "skills.cat.backend": "Backend & Cơ sở dữ liệu",
    "skills.cat.mobile": "DevOps & CMS",

    "awards.label": "// giải thưởng & thành tích",
    "awards.title": "Giải thưởng & Thành tích",
    "awards.0.title": "Top 16 Toàn quốc — Olympic Tin học Sinh viên Việt Nam (Khối PROCON)",
    "awards.0.desc":
      "Lọt vào Top 16 toàn quốc bảng đấu phần mềm đối kháng PROCON, đại diện trường Đại học HUTECH.",
    "awards.0.org": "Hội Tin học Việt Nam · 2025",
    "awards.1.title": "Giải Khuyến khích — Cuộc thi Lập trình Thuật toán PROCON HUTECH",
    "awards.1.desc":
      "Được vinh danh nhờ giải pháp tối ưu thuật toán và chiến thuật xử lý dữ liệu thời gian thực.",
    "awards.1.org": "Đại học HUTECH · 2025",
    "awards.2.title": "Giải Khuyến khích — Thiết kế Web & UI/UX \"Design Your Future\"",
    "awards.2.desc":
      "Đạt giải thưởng sáng tạo sản phẩm web và thiết kế trải nghiệm giao diện người dùng (UI/UX).",
    "awards.2.org": "CJ OliveNetworks Vina · 2025",
    "awards.3.title": "Giải Ba — Olympic Tin học Cá nhân cấp Trường",
    "awards.3.desc":
      "Đạt Giải Ba nội dung lập trình thi đấu cá nhân về cấu trúc dữ liệu và giải thuật.",
    "awards.3.org": "Đại học HUTECH · 2024",

    "projects.label": "// dự án tiêu biểu",
    "projects.title": "Dự án Tiêu biểu",
    "projects.featured": "Dự án Trọng điểm",
    "projects.liveDemo": "Bản chạy thử",
    "projects.sourceCode": "Mã nguồn",
    "projects.0.role": "Frontend Developer (Nhóm 5 người) · 12/2024 – 06/2025",
    "projects.0.desc":
      "Nền tảng Tuyển dụng & Quản lý Ứng viên trực tuyến: xây dựng toàn bộ giao diện ứng viên & nhà tuyển dụng từ Figma, bảng Kanban kéo-thả và module CV Builder xem trước trực tiếp.",
    "projects.0.h1": "Bảng Kanban kéo-thả & CV Builder (React Hook Form + Zod)",
    "projects.0.h2": "Quản lý state bằng Zustand & phân quyền Role-Based Route Guards",
    "projects.0.h3": "Tích hợp 13+ RESTful APIs qua Axios interceptors tự làm mới JWT",
    "projects.1.role": "Frontend Developer (Dự án cá nhân) · 08/2024 – 11/2024",
    "projects.1.desc":
      "Ứng dụng SPA giao diện split-pane mô phỏng bài thi IELTS trên máy tính thực tế, thu âm bài thi Speaking kèm sóng âm và tích hợp AI chấm điểm Writing.",
    "projects.1.h1": "Thu âm Speaking bằng MediaRecorder API kèm visualizer sóng âm",
    "projects.1.h2": "Tích hợp Google Gemini AI SDK chấm điểm Writing trả về JSON",
    "projects.1.h3": "Xử lý triệt để memory leak audio & viết unit test với Vitest",
    "projects.2.role": "Full-Stack Engineer · 2026",
    "projects.2.desc":
      "Hệ điều hành phòng họp doanh nghiệp (DX-OS) tích hợp gọi video LiveKit WebRTC, kiểm duyệt chương trình họp (Agenda Gate), nhận diện giọng nói Whisper & tóm tắt AI Llama-3.",
    "projects.2.h1": "LiveKit WebRTC video call & luồng AI Whisper/Llama-3",
    "projects.2.h2": "35 bài test backend tự động & kiến trúc Docker/PostgreSQL",
    "projects.3.role": "Frontend Developer · 2026",
    "projects.3.desc":
      "Nền tảng thương mại điện tử React + Vite với bộ lọc sản phẩm động, giỏ hàng lưu trữ bền vững, luồng thanh toán xác thực form, route bảo vệ và trang quản trị Admin.",
    "projects.3.h1": "Quản lý state bằng Context API + useReducer & localStorage",
    "projects.3.h2": "Dashboard Admin CRUD, phân quyền route & kiểm tra thanh toán",
    "projects.4.role": "Backend Contributor · 2025–2026",
    "projects.4.desc":
      "Hệ thống Backend Spring Boot cung cấp API cho nền tảng SmartHire: xác thực JWT, phân quyền RBAC, quản lý tin tuyển dụng/doanh nghiệp và triển khai Docker.",
    "projects.4.h1": "Spring Security, JWT refresh token rotation & phân quyền RBAC",
    "projects.4.h2": "Kiến trúc RESTful API, lưu trữ file & thống kê dashboard",

    "contact.label": "// kết nối",
    "contact.title": "Liên hệ & Hợp tác",
    "contact.text":
      "Mình đang sẵn sàng cho các cơ hội Frontend Developer (React.js / Next.js) và Full-Stack tại TP. Hồ Chí Minh hoặc làm việc từ xa.",
    "contact.copy": "Sao chép",
    "contact.copied": "Đã chép!",
    "contact.phone": "0766 772 215",
    "contact.form.name": "Họ và tên của bạn",
    "contact.form.email": "Địa chỉ Email",
    "contact.form.message": "Nội dung trao đổi (vị trí tuyển dụng, dự án...)",
    "contact.form.send": "Mở Email soạn sẵn",
    "contact.form.success": "Đã mở ứng dụng Email! Cảm ơn bạn đã liên hệ.",

    "search.placeholder": "Tìm kiếm kinh nghiệm, dự án, kỹ năng, giải thưởng...",
    "search.noResults": "Không tìm thấy kết quả phù hợp.",
    "search.quickLinks": "Truy cập nhanh",

    "chat.welcome": "Xin chào! Mình là trợ lý portfolio của Khoa. Bạn có thể chọn câu hỏi nhanh bên dưới hoặc nhắn trực tiếp nhé!",
    "chat.autoReply":
      "Cảm ơn bạn đã nhắn tin! Bạn có thể liên hệ trực tiếp với Khoa qua email levankhoa2004@gmail.com hoặc SĐT 0766 772 215.",
    "chat.status": "Trực tuyến · Phản hồi tức thì",
    "chat.inputPlaceholder": "Hỏi về kinh nghiệm, dự án, kỹ năng...",
    "chat.q.exp": "Kinh nghiệm làm việc?",
    "chat.a.exp":
      "Khoa đã trải qua 2 kỳ thực tập: 1) Web Designer & Frontend Intern tại AdsAgency.vn (07/2026 – 10/2026: thiết kế & lập trình 10+ website/landing page, PageSpeed 85+) và 2) Frontend Developer Intern tại YOOT Edu (04/2026 – 07/2026: phát triển 20+ React/TS components, tích hợp 15+ APIs, nâng Lighthouse từ 68 lên 88+).",
    "chat.q.stack": "Tech Stack chính?",
    "chat.a.stack":
      "React.js, Next.js, TypeScript, TailwindCSS, Redux Toolkit, Zustand, React Hook Form, Zod, Axios, RESTful API, Figma (chuyển đổi pixel-perfect), Vitest, Google Gemini AI SDK và SEO On-page.",
    "chat.q.projects": "Dự án nổi bật?",
    "chat.a.projects":
      "1) SmartHire (Nền tảng tuyển dụng Next.js + TS + Zustand với Kanban kéo-thả, CV Builder & 13+ APIs) và 2) IELTS Mock Test & AI Platform (React + Vite + Gemini AI SDK chấm điểm Writing & thu âm Speaking sóng âm).",
    "chat.q.contact": "Liên hệ & Tải CV?",
    "chat.a.contact":
      "Email: levankhoa2004@gmail.com · SĐT: 0766 772 215 · LinkedIn: linkedin.com/in/khoazandev.",

    "footer.text": "Xây dựng với Next.js 16, TypeScript & Framer Motion.",
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
