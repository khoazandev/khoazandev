"use client";

import { useState } from "react";
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
  const { t } = useLocale();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: t("chat.welcome"),
      from: "bot",
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);

  const sendMessage = () => {
    if (!input.trim()) return;
    const now = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    const userMsg: Message = { id: Date.now(), text: input, from: "user", time: now };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    // Auto-reply
    setTimeout(() => {
      const reply: Message = {
        id: Date.now() + 1,
        text: t("chat.autoReply"),
        from: "bot",
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, reply]);
    }, 1000);
  };

  return (
    <>
      {/* Toggle Button */}
      <motion.button
        className="chat-toggle"
        onClick={() => setOpen(!open)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Toggle chat"
      >
        {open ? <FiX size={24} /> : <FiMessageCircle size={24} />}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="chat-window"
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="chat-header">
              <div className="chat-header-info">
                <div className="chat-avatar-dot" />
                <div>
                  <div className="chat-header-name">Khoa.dev</div>
                  <div className="chat-header-status">{t("chat.status")}</div>
                </div>
              </div>
              <button className="chat-close" onClick={() => setOpen(false)}>
                <FiX size={18} />
              </button>
            </div>

            <div className="chat-body">
              {messages.map((msg) => (
                <div key={msg.id} className={`chat-msg chat-msg-${msg.from}`}>
                  <div className="chat-msg-bubble">{msg.text}</div>
                  <div className="chat-msg-time">{msg.time}</div>
                </div>
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
              <button className="chat-send-btn" onClick={sendMessage}>
                <FiSend size={18} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
