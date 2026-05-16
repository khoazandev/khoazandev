"use client";

import { useState, useMemo } from "react";
import { LocaleContext, getTranslator, type Locale } from "./i18n";
import ThemeProvider from "./components/ThemeProvider";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [locale, setLocale] = useState<Locale>("en");
  const t = useMemo(() => getTranslator(locale), [locale]);

  const ctx = useMemo(
    () => ({ locale, setLocale, t }),
    [locale, t],
  );

  return (
    <html lang={locale} data-theme="dark">
      <head>
        <title>Lê Văn Khoa — Full-Stack Developer</title>
        <meta
          name="description"
          content="Portfolio of Lê Văn Khoa — full-stack developer focused on polished web products with Next.js, React, Node.js, and Spring Boot."
        />
      </head>
      <body>
        <ThemeProvider>
          <LocaleContext.Provider value={ctx}>
            {children}
          </LocaleContext.Provider>
        </ThemeProvider>
      </body>
    </html>
  );
}
