"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiUser, FiLock } from "react-icons/fi";
import { useLocale } from "../i18n";

export interface LoginState {
  isLoggedIn: boolean;
  username: string;
}

export default function LoginModal({
  open,
  onClose,
  onLogin,
}: {
  open: boolean;
  onClose: () => void;
  onLogin: (state: LoginState) => void;
}) {
  const { t } = useLocale();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    if (!username.trim() || !password.trim()) {
      setError(t("login.error.empty"));
      return;
    }
    // Mock login
    localStorage.setItem("portfolio-user", JSON.stringify({ username, isLoggedIn: true }));
    onLogin({ isLoggedIn: true, username });
    setUsername("");
    setPassword("");
    setError("");
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <motion.div
            className="modal-content login-modal"
            initial={{ y: -30, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: -30, opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <button className="modal-close" onClick={onClose}>
              <FiX size={20} />
            </button>

            <h2 className="modal-title">{t("login.title")}</h2>
            <p className="modal-subtitle">{t("login.subtitle")}</p>

            <div className="login-field">
              <FiUser size={18} />
              <input
                type="text"
                placeholder={t("login.username")}
                value={username}
                onChange={(e) => { setUsername(e.target.value); setError(""); }}
              />
            </div>

            <div className="login-field">
              <FiLock size={18} />
              <input
                type="password"
                placeholder={t("login.password")}
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError(""); }}
                onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              />
            </div>

            {error && <div className="login-error">{error}</div>}

            <button className="btn btn-primary login-btn" onClick={handleLogin}>
              {t("login.submit")}
            </button>
          </motion.div>
          <div className="modal-backdrop" onClick={onClose} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
