# Khoa.dev Portfolio

Personal portfolio website for **Lê Văn Khoa**, built with **Next.js 16**, **React 19**, **TypeScript**, and **Framer Motion**. The site is designed as a static export for GitHub Pages.

## Features

- Responsive portfolio landing page with hero, skills, projects, about, and contact sections.
- English/Vietnamese language toggle.
- Dark/light theme support.
- Search overlay for projects, skills, and sections.
- Animated UI interactions using Framer Motion.
- Contact form that opens the user's email client.
- Floating chat widget with local auto-reply behavior.
- Static export deployment through GitHub Actions and GitHub Pages.

## Tech Stack

- **Framework:** Next.js 16 App Router
- **Runtime:** React 19
- **Language:** TypeScript
- **Animation:** Framer Motion
- **Icons:** React Icons
- **Deployment:** GitHub Pages

## Getting Started

Install dependencies:

```bash
npm ci
```

Run the development server:

```bash
npm run dev
```

Open:

```text
http://localhost:3000/khoazandev
```

## Available Scripts

```bash
npm run dev     # Start the local development server
npm run build   # Build and export the static site
npm run lint    # Run ESLint
```

After `npm run build`, the exported static files are written to `out/`.

## Project Structure

```text
portfolio/
├── app/
│   ├── components/        # Reusable UI components
│   ├── globals.css        # Global styles and theme tokens
│   ├── i18n.ts            # EN/VI translation dictionary
│   ├── layout.tsx         # Root layout and providers
│   └── page.tsx           # Main portfolio page
├── public/                # Avatar, CV, and static assets
├── next.config.ts         # Static export and GitHub Pages config
└── package.json
```

## Deployment

The app is configured for static export:

```ts
const nextConfig = {
  output: "export",
  basePath: "/khoazandev",
  images: {
    unoptimized: true,
  },
};
```

On pushes to `main`, `../.github/workflows/nextjs.yml` installs dependencies, builds the app from the `portfolio/` directory, uploads `portfolio/out`, and deploys it to GitHub Pages.

## Notes

- Public asset references include the `/khoazandev` base path for GitHub Pages.
- The CV file is stored at `public/CV_LeVanKhoa.pdf`.
- Contact messages are sent through a `mailto:` link, so no backend service is required.
