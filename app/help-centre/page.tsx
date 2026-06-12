"use client";

import { useState } from "react";
import Link from "next/link";
import Footer from "@/Components/layout/footer";
import Navbar from "@/Components/layout/Navbar";

// ─── Contact URLs — update when live ─────────────────────────────
const SUPPORT_EMAIL   = "support@smhartpay.com";          // ← email
const WHATSAPP_URL    = "https://wa.me/2349000000000";     // ← WhatsApp
const LIVE_CHAT_URL   = "#";                               // ← live chat
const APP_STORE_URL   = "https://apps.apple.com/your-app"; // ← iOS
const PLAY_STORE_URL  = "https://play.google.com/store";   // ← Android

// ═════════════════════════════════════════════════════════════════
// DATA
// ═════════════════════════════════════════════════════════════════

const categories = [
  {
    id: "getting-started",
    emoji: "🚀",
    title: "Getting Started",
    description: "Create your account, verify identity, and take your first steps.",
    count: 8,
    color: "bg-blue-50 text-[#034EA2] border-blue-100",
    iconBg: "bg-blue-100",
    articles: [
      { title: "How to create a SmhartPay account",         href: "#" },
      { title: "Verifying your identity (KYC)",              href: "#" },
      { title: "Setting up your PIN and biometrics",         href: "#" },
      { title: "How to fund your wallet for the first time", href: "#" },
      { title: "Understanding your account tiers",           href: "#" },
    ],
  },
  {
    id: "wallet-transfers",
    emoji: "💸",
    title: "Wallet & Transfers",
    description: "Fund your wallet, send and receive money with ease.",
    count: 10,
    color: "bg-green-50 text-green-700 border-green-100",
    iconBg: "bg-green-100",
    articles: [
      { title: "How to fund your SmhartPay wallet",          href: "#" },
      { title: "How to send money to a Nigerian bank",        href: "#" },
      { title: "How to receive funds from another user",      href: "#" },
      { title: "Transfer limits and how to increase them",    href: "#" },
      { title: "What to do if a transfer fails",             href: "#" },
    ],
  },
  {
    id: "cards",
    emoji: "💳",
    title: "Cards",
    description: "Create, manage, and use virtual and physical cards.",
    count: 9,
    color: "bg-purple-50 text-purple-700 border-purple-100",
    iconBg: "bg-purple-100",
    articles: [
      { title: "How to create a NGN virtual card",           href: "#" },
      { title: "How to create a USD virtual card",           href: "#" },
      { title: "How to request a physical Naira card",        href: "#" },
      { title: "How to freeze or unfreeze your card",        href: "#" },
      { title: "Card spending limits and how to adjust them", href: "#" },
    ],
  },
  {
    id: "savings",
    emoji: "🏦",
    title: "Savings",
    description: "Set goals, automate contributions, and grow your money.",
    count: 7,
    color: "bg-amber-50 text-amber-700 border-amber-100",
    iconBg: "bg-amber-100",
    articles: [
      { title: "How to create a savings plan",               href: "#" },
      { title: "Difference between Flex, Target & Fixed Save", href: "#" },
      { title: "How to withdraw from your savings",          href: "#" },
      { title: "How interest is calculated and paid",        href: "#" },
      { title: "Early withdrawal fees explained",            href: "#" },
    ],
  },
  {
    id: "bills-vtu",
    emoji: "📱",
    title: "Bills & VTU",
    description: "Buy airtime, data, pay electricity and cable TV bills.",
    count: 6,
    color: "bg-teal-50 text-teal-700 border-teal-100",
    iconBg: "bg-teal-100",
    articles: [
      { title: "How to buy airtime on SmhartPay",            href: "#" },
      { title: "How to purchase a data bundle",              href: "#" },
      { title: "How to pay electricity bills",               href: "#" },
      { title: "Supported bill payment providers",           href: "#" },
      { title: "What to do if a bill payment fails",         href: "#" },
    ],
  },
  {
    id: "rewards",
    emoji: "🎁",
    title: "Rewards & Cashback",
    description: "Understand your rewards, cashback, and referral bonuses.",
    count: 5,
    color: "bg-rose-50 text-rose-700 border-rose-100",
    iconBg: "bg-rose-100",
    articles: [
      { title: "How rewards and cashback work",              href: "#" },
      { title: "How to refer a friend and earn",             href: "#" },
      { title: "How to redeem your rewards",                 href: "#" },
      { title: "Why my cashback hasn't been credited",        href: "#" },
      { title: "Rewards terms and expiry policy",            href: "#" },
    ],
  },
  {
    id: "security",
    emoji: "🔒",
    title: "Security & Privacy",
    description: "Protect your account and understand how your data is used.",
    count: 7,
    color: "bg-gray-50 text-gray-700 border-gray-200",
    iconBg: "bg-gray-100",
    articles: [
      { title: "How to change your PIN",                     href: "#" },
      { title: "How to enable two-factor authentication",    href: "#" },
      { title: "What to do if your account is compromised",  href: "#" },
      { title: "How to report a suspicious transaction",     href: "#" },
      { title: "SmhartPay's data privacy practices",         href: "#" },
    ],
  },
  {
    id: "account",
    emoji: "👤",
    title: "Account Management",
    description: "Update your profile, manage settings, and close your account.",
    count: 6,
    color: "bg-indigo-50 text-indigo-700 border-indigo-100",
    iconBg: "bg-indigo-100",
    articles: [
      { title: "How to update your personal information",    href: "#" },
      { title: "How to change your phone number",            href: "#" },
      { title: "How to upgrade your account tier",           href: "#" },
      { title: "How to close your SmhartPay account",        href: "#" },
      { title: "How to recover a locked account",            href: "#" },
    ],
  },

  // ── ADD A NEW CATEGORY BELOW ──────────────────────────────────
  // {
  //   id: "your-category-id",
  //   emoji: "🔧",
  //   title: "Category Title",
  //   description: "Short description of what this covers.",
  //   count: 5,
  //   color: "bg-gray-50 text-gray-700 border-gray-200",
  //   iconBg: "bg-gray-100",
  //   articles: [
  //     { title: "Article title here", href: "#" },
  //   ],
  // },
];

const popularArticles = [
  { title: "How to send money to a Nigerian bank",         category: "Wallet & Transfers", href: "#" },
  { title: "How to create a NGN virtual card",             category: "Cards",              href: "#" },
  { title: "How to verify your identity (KYC)",            category: "Getting Started",    href: "#" },
  { title: "Transfer limits and how to increase them",     category: "Wallet & Transfers", href: "#" },
  { title: "Difference between Flex, Target & Fixed Save", category: "Savings",            href: "#" },
  { title: "How to refer a friend and earn rewards",       category: "Rewards & Cashback", href: "#" },

  // ── ADD MORE POPULAR ARTICLES BELOW ──────────────────────────
  // { title: "Article title", category: "Category Name", href: "#" },
];

const contactOptions = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
        stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"
        strokeLinejoin="round" viewBox="0 0 24 24">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      </svg>
    ),
    title: "Live Chat",
    description: "Chat with a support agent in real time.",
    availability: "Mon – Fri, 8am – 8pm",
    cta: "Start Chat",
    href: LIVE_CHAT_URL,
    highlight: true,
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
        stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"
        strokeLinejoin="round" viewBox="0 0 24 24">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.28a16 16 0 0 0 5.93 5.93l1.18-1.18a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 15l.19 1.92z"/>
      </svg>
    ),
    title: "WhatsApp",
    description: "Send us a message on WhatsApp anytime.",
    availability: "24 / 7 — we reply within 2 hours",
    cta: "Message Us",
    href: WHATSAPP_URL,
    highlight: false,
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
        stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"
        strokeLinejoin="round" viewBox="0 0 24 24">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
        <polyline points="22,6 12,13 2,6"/>
      </svg>
    ),
    title: "Email Support",
    description: "Send us an email and we'll get back to you.",
    availability: "Response within 24 hours",
    cta: "Send Email",
    href: `mailto:${SUPPORT_EMAIL}`,
    highlight: false,
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
        stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"
        strokeLinejoin="round" viewBox="0 0 24 24">
        <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/>
        <line x1="12" y1="18" x2="12.01" y2="18"/>
      </svg>
    ),
    title: "In-App Support",
    description: "Raise a ticket directly from the SmhartPay app.",
    availability: "Fastest response for account issues",
    cta: "Open App",
    href: APP_STORE_URL,
    highlight: false,
  },

  // ── ADD MORE CONTACT OPTIONS BELOW ───────────────────────────
  // {
  //   icon: (...),
  //   title: "Channel Name",
  //   description: "Short description",
  //   availability: "Availability info",
  //   cta: "Button label",
  //   href: "#",
  //   highlight: false,
  // },
];

const faqs = [
  {
    q: "How do I reset my SmhartPay PIN?",
    a: "Open the SmhartPay app, go to Settings → Security → Change PIN. You will need to verify your identity with your registered phone number before setting a new PIN.",
  },
  {
    q: "What should I do if a transfer is debited but not received?",
    a: "If a transfer is debited from your wallet but not received by the recipient, please wait up to 24 hours for the bank to process. If unresolved, contact our support team with the transaction reference number.",
  },
  {
    q: "How long does account verification (KYC) take?",
    a: "KYC verification is typically completed within minutes for BVN-linked accounts. In rare cases, it may take up to 24 hours. You will be notified in the app once your verification is approved.",
  },
  {
    q: "Can I use SmhartPay outside Nigeria?",
    a: "You can manage your account from anywhere, but some features such as local transfers and VTU are currently available to Nigerian residents only. USD virtual cards can be used for international online purchases.",
  },
  {
    q: "How do I dispute a transaction I didn't authorise?",
    a: "To dispute an unauthorised transaction, go to the transaction in your app, tap 'Report Issue', and follow the prompts. Alternatively, contact our support team immediately with your transaction details.",
  },
  {
    q: "Is there a SmhartPay web app or only mobile?",
    a: "SmhartPay is currently available as a mobile app on iOS and Android. A web dashboard is in development and will be available soon.",
  },

  // ── ADD MORE FAQs BELOW ───────────────────────────────────────
  // { q: "Your question?", a: "Your answer." },
];

// ═════════════════════════════════════════════════════════════════
// SUB-COMPONENTS
// ═════════════════════════════════════════════════════════════════

function SearchIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round"
      strokeLinejoin="round" viewBox="0 0 24 24" className="text-gray-400 flex-shrink-0">
      <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none"
      stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
      strokeLinejoin="round" viewBox="0 0 24 24" className="flex-shrink-0 text-gray-400">
      <polyline points="9 18 15 12 9 6"/>
    </svg>
  );
}

function FAQItem({ q, a, isOpen, onToggle }: {
  q: string; a: string; isOpen: boolean; onToggle: () => void;
}) {
  return (
    <div className="border-b border-gray-200">
      <button onClick={onToggle} aria-expanded={isOpen}
        className="w-full flex items-center justify-between gap-6 py-5 text-left group cursor-pointer">
        <span className={`text-[14px] sm:text-[15px] font-medium leading-snug transition-colors
          ${isOpen ? "text-[#034EA2] font-semibold" : "text-gray-700 group-hover:text-gray-900"}`}>
          {q}
        </span>
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none"
          stroke="currentColor" strokeWidth="2" strokeLinecap="round"
          strokeLinejoin="round" viewBox="0 0 24 24"
          className={`flex-shrink-0 transition-transform duration-300
            ${isOpen ? "rotate-180 text-[#034EA2]" : "text-gray-400"}`}>
          <polyline points="6 9 12 15 18 9"/>
        </svg>
      </button>
      <div className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{ maxHeight: isOpen ? "200px" : "0px" }}>
        <div className="pb-5">
          <div className="flex items-center gap-3 mb-3">
            <span className="w-7 h-[2px] bg-[#034EA2] rounded-full"/>
            <span className="text-[12px] font-semibold text-[#034EA2]">Answer</span>
          </div>
          <p className="text-[13px] sm:text-[14px] text-gray-500 leading-relaxed">{a}</p>
        </div>
      </div>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════════
// MAIN PAGE
// ═════════════════════════════════════════════════════════════════

export default function HelpCentrePage() {
  const [search, setSearch]           = useState("");
  const [openFaq, setOpenFaq]         = useState<number | null>(null);
  const [openCategory, setOpenCategory] = useState<string | null>(null);

  // Filter all articles across categories by search term
  const searchResults = search.trim().length > 1
    ? categories.flatMap((cat) =>
        cat.articles
          .filter((a) => a.title.toLowerCase().includes(search.toLowerCase()))
          .map((a) => ({ ...a, category: cat.title }))
      )
    : [];

  return (
    <div>
      <Navbar />
    <main className="bg-white">

      {/* ══════════════════════════════════════════
          1. HERO + SEARCH
      ══════════════════════════════════════════ */}
      <section className="bg-gradient-to-br from-[#034EA2] via-[#0457b5] to-[#0369cc]
        text-white px-5 py-16 sm:px-8 sm:py-20 md:px-10 md:py-24">
        <div className="max-w-6xl mx-auto text-center">
          <span className="inline-block text-[12px] font-semibold bg-white/15
            px-4 py-1.5 rounded-full mb-5 tracking-wide uppercase">
            Help Centre
          </span>
          <h1 className="font-bold leading-tight mb-4
            text-[30px] sm:text-[38px] md:text-[48px] lg:text-[54px]">
            How can we help you?
          </h1>
          <p className="text-blue-200 max-w-xl mx-auto leading-relaxed mb-8
            text-[14px] sm:text-[15px] md:text-[16px]">
            Search our Help Centre or browse by category below.
            Our support team is always here if you need more help.
          </p>

          {/* Search bar */}
          <div className="relative max-w-xl mx-auto">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <SearchIcon />
            </div>
            <input
              type="text"
              placeholder="Search for help articles…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-4 rounded-2xl bg-white text-gray-800
                text-[14px] sm:text-[15px] placeholder:text-gray-400 outline-none
                focus:ring-2 focus:ring-white/50 shadow-xl"
            />
            {search && (
              <button onClick={() => setSearch("")}
                className="absolute inset-y-0 right-4 flex items-center text-gray-400 hover:text-gray-600">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none"
                  stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
                  strokeLinejoin="round" viewBox="0 0 24 24">
                  <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            )}
          </div>

          {/* Quick links */}
          <div className="flex flex-wrap justify-center gap-2 mt-6">
            {["Fund wallet", "Virtual card", "Transfer money", "Reset PIN", "KYC verification"].map((tag) => (
              <button key={tag} onClick={() => setSearch(tag)}
                className="text-[12px] sm:text-[13px] bg-white/10 hover:bg-white/20
                  border border-white/20 text-white px-4 py-1.5 rounded-full
                  transition-colors duration-150">
                {tag}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Search results */}
      {search.trim().length > 1 && (
        <section className="px-5 py-10 sm:px-8 md:px-10 bg-gray-50 border-b border-gray-100">
          <div className="max-w-6xl mx-auto">
            <p className="text-[13px] text-gray-500 mb-4">
              {searchResults.length > 0
                ? `${searchResults.length} result${searchResults.length !== 1 ? "s" : ""} for "${search}"`
                : `No results found for "${search}"`}
            </p>
            {searchResults.length > 0 ? (
              <div className="flex flex-col gap-2">
                {searchResults.map((r, i) => (
                  <a key={i} href={r.href}
                    className="flex items-center justify-between bg-white border
                      border-gray-100 rounded-xl px-5 py-4 hover:border-[#034EA2]/30
                      hover:shadow-sm transition-all duration-150 group">
                    <div>
                      <p className="text-[14px] font-medium text-gray-800 group-hover:text-[#034EA2] transition-colors">
                        {r.title}
                      </p>
                      <p className="text-[12px] text-gray-400 mt-0.5">{r.category}</p>
                    </div>
                    <ChevronRight />
                  </a>
                ))}
              </div>
            ) : (
              <div className="bg-white border border-gray-100 rounded-2xl p-8 text-center">
                <p className="text-gray-400 text-[14px]">
                  Try different keywords or{" "}
                  <button onClick={() => setSearch("")}
                    className="text-[#034EA2] font-medium hover:underline">
                    browse all categories
                  </button>
                </p>
              </div>
            )}
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════
          2. STATS STRIP
      ══════════════════════════════════════════ */}
      <section className="px-5 py-8 sm:px-8 md:px-10 border-b border-gray-100">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            {[
              { value: "50+",    label: "Help articles" },
              { value: "< 2hrs", label: "Avg. response time" },
              { value: "24/7",   label: "WhatsApp support" },
              { value: "4.8★",   label: "Support satisfaction" },
            ].map((stat) => (
              <div key={stat.label}
                className="bg-gray-50 rounded-2xl py-4 px-3 border border-gray-100">
                <p className="text-[22px] sm:text-[26px] font-black text-[#034EA2]">
                  {stat.value}
                </p>
                <p className="text-[12px] text-gray-500 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          3. CATEGORIES GRID
      ══════════════════════════════════════════ */}
      <section className="px-5 py-16 sm:px-8 sm:py-20 md:px-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <span className="inline-block text-[12px] font-semibold text-[#034EA2]
              bg-blue-50 px-4 py-1.5 rounded-full mb-4 tracking-wide uppercase">
              Browse by Topic
            </span>
            <h2 className="font-bold text-gray-900
              text-[24px] sm:text-[28px] md:text-[34px]">
              What do you need help with?
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {categories.map((cat) => (
              <div key={cat.id}
                className="bg-white rounded-2xl border border-gray-100
                  hover:shadow-md hover:border-gray-200 transition-all duration-200 overflow-hidden">

                {/* Card header — clickable to expand */}
                <button
                  onClick={() => setOpenCategory(openCategory === cat.id ? null : cat.id)}
                  className="w-full text-left p-5 cursor-pointer">
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center
                    text-xl mb-4 ${cat.iconBg}`}>
                    {cat.emoji}
                  </div>
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="text-[15px] font-bold text-gray-900 leading-snug">
                        {cat.title}
                      </h3>
                      <p className="text-[12px] text-gray-400 mt-0.5">
                        {cat.count} articles
                      </p>
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none"
                      stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
                      strokeLinejoin="round" viewBox="0 0 24 24"
                      className={`flex-shrink-0 mt-1 text-gray-400 transition-transform duration-300
                        ${openCategory === cat.id ? "rotate-180" : ""}`}>
                      <polyline points="6 9 12 15 18 9"/>
                    </svg>
                  </div>
                  <p className="text-[13px] text-gray-500 mt-2 leading-relaxed">
                    {cat.description}
                  </p>
                </button>

                {/* Expandable article list */}
                <div className="overflow-hidden transition-all duration-300 ease-in-out"
                  style={{ maxHeight: openCategory === cat.id ? "400px" : "0px" }}>
                  <div className="border-t border-gray-100 px-5 py-3 flex flex-col gap-0">
                    {cat.articles.map((article) => (
                      <a key={article.title} href={article.href}
                        className="flex items-center justify-between py-2.5 text-[13px]
                          text-gray-600 hover:text-[#034EA2] transition-colors
                          border-b border-gray-50 last:border-0 group">
                        <span className="flex-1 leading-snug">{article.title}</span>
                        <ChevronRight />
                      </a>
                    ))}
                    <a href={`/help-centre/${cat.id}`}
                      className="mt-2 mb-1 text-[12px] font-semibold text-[#034EA2]
                        hover:underline">
                      View all {cat.count} articles →
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          4. POPULAR ARTICLES
      ══════════════════════════════════════════ */}
      <section className="px-5 py-16 sm:px-8 sm:py-20 md:px-10 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <span className="inline-block text-[12px] font-semibold text-[#034EA2]
              bg-blue-50 px-4 py-1.5 rounded-full mb-4 tracking-wide uppercase">
              Top Articles
            </span>
            <h2 className="font-bold text-gray-900
              text-[24px] sm:text-[28px] md:text-[34px]">
              Most read help articles
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {popularArticles.map((article, i) => (
              <a key={i} href={article.href}
                className="bg-white rounded-2xl border border-gray-100 p-5
                  hover:shadow-md hover:border-[#034EA2]/20 transition-all duration-200 group">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="text-[11px] font-semibold text-[#034EA2]
                      bg-blue-50 px-2.5 py-1 rounded-full">
                      {article.category}
                    </span>
                    <p className="mt-3 text-[14px] font-medium text-gray-800
                      group-hover:text-[#034EA2] transition-colors leading-snug">
                      {article.title}
                    </p>
                  </div>
                  <div className="flex-shrink-0 mt-1">
                    <ChevronRight />
                  </div>
                </div>
              </a>
            ))}
          </div>

          {/* ── ADD MORE POPULAR ARTICLES in the popularArticles array above ── */}
        </div>
      </section>

      {/* ══════════════════════════════════════════
          5. CONTACT OPTIONS
      ══════════════════════════════════════════ */}
      <section className="px-5 py-16 sm:px-8 sm:py-20 md:px-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <span className="inline-block text-[12px] font-semibold text-[#034EA2]
              bg-blue-50 px-4 py-1.5 rounded-full mb-4 tracking-wide uppercase">
              Contact Support
            </span>
            <h2 className="font-bold text-gray-900
              text-[24px] sm:text-[28px] md:text-[34px]">
              Still need help? We're here.
            </h2>
            <p className="mt-3 text-[14px] sm:text-[15px] text-gray-500 max-w-xl mx-auto">
              Choose your preferred way to reach our support team.
              We aim to respond to every enquiry as quickly as possible.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {contactOptions.map((opt) => (
              <a key={opt.title} href={opt.href}
                target={opt.href.startsWith("http") ? "_blank" : "_self"}
                rel="noopener noreferrer"
                className={`rounded-2xl p-6 flex flex-col gap-4 border
                  transition-all duration-200 hover:shadow-lg group
                  ${opt.highlight
                    ? "bg-[#034EA2] border-[#034EA2] text-white"
                    : "bg-white border-gray-100 hover:border-[#034EA2]/20"}`}>

                <div className={`w-12 h-12 rounded-xl flex items-center justify-center
                  transition-colors duration-200
                  ${opt.highlight
                    ? "bg-white/15 text-white"
                    : "bg-blue-50 text-[#034EA2] group-hover:bg-[#034EA2] group-hover:text-white"}`}>
                  {opt.icon}
                </div>

                <div className="flex-1">
                  <h3 className={`text-[15px] font-bold mb-1
                    ${opt.highlight ? "text-white" : "text-gray-900"}`}>
                    {opt.title}
                  </h3>
                  <p className={`text-[13px] leading-relaxed mb-2
                    ${opt.highlight ? "text-blue-200" : "text-gray-500"}`}>
                    {opt.description}
                  </p>
                  <p className={`text-[11px] font-medium
                    ${opt.highlight ? "text-blue-300" : "text-gray-400"}`}>
                    {opt.availability}
                  </p>
                </div>

                <span className={`inline-flex items-center gap-1.5 text-[13px] font-semibold
                  transition-colors duration-150
                  ${opt.highlight ? "text-white" : "text-[#034EA2]"}`}>
                  {opt.cta}
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none"
                    stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
                    strokeLinejoin="round" viewBox="0 0 24 24">
                    <line x1="5" y1="12" x2="19" y2="12"/>
                    <polyline points="12 5 19 12 12 19"/>
                  </svg>
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          6. FAQ
      ══════════════════════════════════════════ */}
      <section className="px-5 py-16 sm:px-8 sm:py-20 md:px-10 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <span className="inline-block text-[12px] font-semibold text-[#034EA2]
              bg-blue-50 px-4 py-1.5 rounded-full mb-4 tracking-wide uppercase">
              FAQs
            </span>
            <h2 className="font-bold text-gray-900
              text-[24px] sm:text-[28px] md:text-[34px]">
              Common questions
            </h2>
          </div>
          <div className="max-w-3xl mx-auto">
            <div className="border-t border-gray-200" />
            {faqs.map((faq, i) => (
              <FAQItem key={i} q={faq.q} a={faq.a}
                isOpen={openFaq === i}
                onToggle={() => setOpenFaq(openFaq === i ? null : i)} />
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/faqs"
              className="text-[#034EA2] text-[14px] font-semibold hover:underline">
              View all FAQs →
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          7. FINAL BANNER
      ══════════════════════════════════════════ */}
      <section className="px-5 py-16 sm:px-8 sm:py-20 md:px-10">
        <div className="max-w-6xl mx-auto">
          <div className="bg-gradient-to-br from-[#034EA2] to-[#0369cc]
            rounded-3xl px-8 py-12 sm:px-12 sm:py-14
            flex flex-col lg:flex-row items-center justify-between gap-8">

            <div className="text-center lg:text-left">
              <h2 className="text-[22px] sm:text-[26px] md:text-[30px]
                font-bold text-white mb-3 leading-tight">
                Get the best support experience<br className="hidden sm:block" />
                from within the app
              </h2>
              <p className="text-blue-200 text-[14px] sm:text-[15px] leading-relaxed max-w-md mx-auto lg:mx-0">
                The fastest way to resolve account and transaction issues
                is through in-app support. Download SmhartPay to get started.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-3 flex-shrink-0">
              <a href={APP_STORE_URL} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-white text-gray-900
                  px-5 py-3 rounded-xl hover:bg-gray-100 active:scale-95 transition-all duration-150">
                <svg className="w-5 h-5 fill-gray-900 flex-shrink-0" viewBox="0 0 24 24">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
                <div className="flex flex-col leading-none text-left">
                  <span className="text-[10px] text-gray-500">Download on the</span>
                  <span className="text-[14px] font-semibold">App Store</span>
                </div>
              </a>
              <a href={PLAY_STORE_URL} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-white text-gray-900
                  px-5 py-3 rounded-xl hover:bg-gray-100 active:scale-95 transition-all duration-150">
                <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24">
                  <path d="M3.18 23.76c.3.16.64.2.99.1l.1-.06 11.04-11.04-2.29-2.29L3.18 23.76z" fill="#EA4335"/>
                  <path d="M20.7 10.7l-2.6-1.48-2.59 2.59 2.59 2.59 2.62-1.5c.75-.43.75-1.77-.02-2.2z" fill="#FBBC04"/>
                  <path d="M3.18.24C2.83.14 2.49.18 2.19.34L12.4 10.56l2.29-2.29L3.18.24z" fill="#4285F4"/>
                  <path d="M2.19.34C1.7.62 1.38 1.18 1.38 1.98v20.04c0 .8.32 1.36.81 1.64l.1.06L13.61 12 2.19.34z" fill="#34A853"/>
                </svg>
                <div className="flex flex-col leading-none text-left">
                  <span className="text-[10px] text-gray-500">Get it on</span>
                  <span className="text-[14px] font-semibold">Google Play</span>
                </div>
              </a>
            </div>
          </div>
          {/* ── ADD MORE CONTENT BELOW ── */}
        </div>
      </section>

    </main>
    <Footer />
    </div>
  );
}