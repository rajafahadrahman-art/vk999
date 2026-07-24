"use client";

import Link from "next/link";
import { FormEvent, useMemo, useState } from "react";

type Message = { role: "bot" | "user"; text: string; href?: string; linkLabel?: string };

const knowledge = [
  {
    keys: ["download", "apk", "install", "android"],
    answer:
      "Open the VK999 Download guide, tap Download VK999 APK, wait for the file, enable install permission for your browser, then install from Downloads.",
    href: "/vk999-download/",
    linkLabel: "Open VK999 Download",
  },
  {
    keys: ["not installing", "app not installed", "parse", "blocked", "permission"],
    answer:
      "Android may block unknown sources. Enable Allow from this source for your browser, delete incomplete APKs, free storage, and download a fresh copy.",
    href: "/vk999-download/",
    linkLabel: "Fix installation issues",
  },
  {
    keys: ["login", "sign in", "log in"],
    answer:
      "Open the app, choose Login, enter your registered mobile number or account ID with the correct password, then complete any OTP check.",
    href: "/vk999-login/",
    linkLabel: "Open VK999 Login",
  },
  {
    keys: ["register", "sign up", "create account"],
    answer:
      "Use Register in the app, enter an active mobile number, create a strong password, confirm the OTP, then finish registration.",
    href: "/vk999-login/",
    linkLabel: "Registration guide",
  },
  {
    keys: ["password", "reset", "forgot"],
    answer:
      "Use Forgot Password on the login screen, verify your registered number with an OTP, then create a new unique password.",
    href: "/vk999-login/",
    linkLabel: "Password recovery",
  },
  {
    keys: ["deposit", "jazzcash", "easypaisa", "add money", "recharge"],
    answer:
      "Log in, open Wallet/Deposit, choose a method shown in-app, send the exact amount, then submit the transaction reference.",
    href: "/vk999-deposit-guide/",
    linkLabel: "Open Deposit Guide",
  },
  {
    keys: ["deposit pending", "balance not", "payment pending"],
    answer:
      "Keep your receipt and transaction ID, wait for the normal processing period, then contact verified in-app support if the balance stays unchanged.",
    href: "/vk999-deposit-guide/",
    linkLabel: "Pending deposit help",
  },
  {
    keys: ["withdraw", "cash out", "withdrawal"],
    answer:
      "Open Withdraw, choose JazzCash, Easypaisa or bank transfer, enter receiving details and amount, then confirm with your withdrawal PIN.",
    href: "/vk999-withdrawal-guide/",
    linkLabel: "Open Withdrawal Guide",
  },
  {
    keys: ["withdrawal pending", "rejected", "payout"],
    answer:
      "Pending or rejected withdrawals often need verification, matching account names, or a valid withdrawable balance. Check the status message before resubmitting.",
    href: "/vk999-withdrawal-guide/",
    linkLabel: "Withdrawal troubleshooting",
  },
  {
    keys: ["android available", "available on android"],
    answer:
      "VK999 is mainly associated with Android APK access. Check the download guide for installation steps and device preparation tips.",
    href: "/vk999-download/",
    linkLabel: "Android download guide",
  },
];

const fallback =
  "I can help with VK999 download, login, deposit, withdrawal and account access guides. For account-specific issues, use the verified in-app support option.";

const quickQuestions = [
  "How do I download VK999?",
  "How do I log in?",
  "How can I deposit?",
  "How can I withdraw?",
  "Why is my APK not installing?",
  "Why is my deposit pending?",
  "Why is my withdrawal pending?",
  "Is VK999 available on Android?",
  "How can I reset my password?",
];

function answerFor(input: string): Message {
  const q = input.toLowerCase();
  const match = knowledge.find((item) => item.keys.some((key) => q.includes(key)));
  if (!match) return { role: "bot", text: fallback };
  return {
    role: "bot",
    text: match.answer,
    href: match.href,
    linkLabel: match.linkLabel,
  };
}

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "bot",
      text: "Hi! I can help with VK999 download, login, deposit and withdrawal guides. I never ask for passwords, OTPs or banking details.",
    },
  ]);

  const visibleQuick = useMemo(() => quickQuestions.slice(0, open ? 9 : 0), [open]);

  const ask = (text: string) => {
    const cleaned = text.trim();
    if (!cleaned) return;
    setMessages((prev) => [...prev, { role: "user", text: cleaned }, answerFor(cleaned)]);
    setInput("");
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    ask(input);
  };

  const reset = () => {
    setMessages([
      {
        role: "bot",
        text: "Chat reset. Ask about VK999 download, login, deposit or withdrawal.",
      },
    ]);
    setInput("");
  };

  return (
    <div className="chatbot-root">
      {open && (
        <div
          className="chatbot-panel"
          role="dialog"
          aria-modal="true"
          aria-label="VK999 help chatbot"
        >
          <div className="chatbot-header">
            <strong>VK999 Help</strong>
            <div className="chatbot-actions">
              <button type="button" className="btn btn-ghost" onClick={reset} aria-label="Reset chat">
                Reset
              </button>
              <button
                type="button"
                className="btn btn-ghost"
                onClick={() => setOpen(false)}
                aria-label="Close chat"
              >
                Close
              </button>
            </div>
          </div>
          <div className="chatbot-messages" aria-live="polite">
            {messages.map((msg, index) => (
              <div key={index} className={`chat-bubble ${msg.role}`}>
                <p style={{ margin: 0 }}>{msg.text}</p>
                {msg.href && msg.linkLabel ? (
                  <Link href={msg.href} onClick={() => setOpen(false)}>
                    {msg.linkLabel}
                  </Link>
                ) : null}
              </div>
            ))}
          </div>
          <div className="quick-questions">
            {visibleQuick.map((q) => (
              <button key={q} type="button" onClick={() => ask(q)}>
                {q}
              </button>
            ))}
          </div>
          <form className="chatbot-form" onSubmit={onSubmit}>
            <label htmlFor="chatbot-input" className="visually-hidden" style={{ position: "absolute", left: "-9999px" }}>
              Ask a question
            </label>
            <input
              id="chatbot-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about download, login..."
              autoComplete="off"
            />
            <button type="submit" className="btn btn-primary">
              Send
            </button>
          </form>
        </div>
      )}
      <button
        type="button"
        className="chatbot-toggle"
        aria-label={open ? "Close help chat" : "Open help chat"}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M4 6a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3H10l-4 4v-4H7a3 3 0 0 1-3-3V6Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
}
