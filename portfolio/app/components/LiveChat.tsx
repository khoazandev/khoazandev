"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMessageCircle, FiX, FiSend } from "react-icons/fi";
import { useLocale } from "../i18n";

interface Message {
  id: number;
  text: string;
  from: "user" | "bot";
  time: string;
}

export default function LiveChat() {
  const { t, locale } = useLocale();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const bodyRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    setMessages([
      {
        id: 1,
        text: t("chat.welcome"),
        from: "bot",
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      },
    ]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locale]);

  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [messages, open]);

  const quickTopics = [
    { q: t("chat.q.exp"), a: t("chat.a.exp") },
    { q: t("chat.q.stack"), a: t("chat.a.stack") },
    { q: t("chat.q.projects"), a: t("chat.a.projects") },
    { q: t("chat.q.contact"), a: t("chat.a.contact") },
  ];

  const getBotReply = (userText: string) => {
    const low = userText.toLowerCase();
    if (low.includes("kinh nghiệm") || low.includes("exp") || low.includes("intern") || low.includes("thực tập") || low.includes("adsagency") || low.includes("yoot")) {
      return t("chat.a.exp");
    }
    if (low.includes("stack") || low.includes("skill") || low.includes("kỹ năng") || low.includes("công nghệ")) {
      return t("chat.a.stack");
    }
    if (low.includes("project") || low.includes("dự án") || low.includes("smarthire") || low.includes("ielts")) {
      return t("chat.a.projects");
    }
    if (low.includes("cv") || low.includes("email") || low.includes("liên hệ") || low.includes("contact") || low.includes("phone") || low.includes("sđt")) {
      return t("chat.a.contact");
    }
    return t("chat.autoReply");
  };

  const pushConversation = (userText: string, botText: string) => {
    const now = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    setMessages((prev) => [...prev, { id: Date.now(), text: userText, from: "user", time: now }]);
    setTimeout(() => {
      const replyTime = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, text: botText, from: "bot", time: replyTime },
      ]);
    }, 350);
  };

  const sendMessage = () => {
    if (!input.trim()) return;
    const text = input.trim();
    setInput("");
    pushConversation(text, getBotReply(text));
  };

  return (
    <>
      <motion.button
        className="chat-toggle"
        onClick={() => setOpen(!open)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        aria-label="Toggle chat"
      >
        {open ? <FiX size={24} /> : <FiMessageCircle size={24} />}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="chat-window"
            initial={{ opacity: 0, y: 20, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.92 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="chat-header">
              <div className="chat-header-info">
                <div className="chat-avatar-dot" />
                <div>
                  <div className="chat-header-name">khoa.dev AI</div>
                  <div className="chat-header-status">{t("chat.status")}</div>
                </div>
              </div>
              <button className="chat-close" onClick={() => setOpen(false)} aria-label="Close chat">
                <FiX size={18} />
              </button>
            </div>

            <div className="chat-body" ref={bodyRef}>
              {messages.map((msg) => (
                <div key={msg.id} className={`chat-msg chat-msg-${msg.from}`}>
                  <div className="chat-msg-bubble">{msg.text}</div>
                  <div className="chat-msg-time">{msg.time}</div>
                </div>
              ))}
            </div>

            <div className="chat-quick-chips">
              {quickTopics.map((topic) => (
                <button
                  key={topic.q}
                  type="button"
                  className="chat-chip"
                  onClick={() => pushConversation(topic.q, topic.a)}
                >
                  {topic.q}
                </button>
              ))}
            </div>

            <div className="chat-input-row">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                placeholder={t("chat.inputPlaceholder")}
                className="chat-input"
              />
              <button className="chat-send-btn" onClick={sendMessage} aria-label="Send message">
                <FiSend size={16} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
