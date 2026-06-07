"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/Components/layout/Navbar";
import Footer from "@/Components/layout/footer";

// ─── Store URLs ───────────────────────────────────────────────────
const APP_STORE_URL  = "https://apps.apple.com/your-app-link";          // ← iOS link
const PLAY_STORE_URL = "https://play.google.com/store/your-app-link";   // ← Android link

// ═════════════════════════════════════════════════════════════════
// DATA
// ═════════════════════════════════════════════════════════════════

const plans = [
  {
    name: "Starter",
    badge: "Free Forever",
    badgeColor: "bg-green-100 text-green-700",
    price: "₦0",
    period: "/ month",
    description: "Everything you need to get started with digital banking.",
    highlight: false,
    cta: "Get Started Free",
    features: [
      { label: "SmhartPay wallet",                  included: true },
      { label: "Fund wallet via bank transfer",      included: true },
      { label: "Send money to Nigerian banks",       included: true },
      { label: "Receive funds (any source)",         included: true },
      { label: "Airtime & data (VTU)",               included: true },
      { label: "1 NGN virtual card",                 included: true },
      { label: "Basic savings plan (Flex Save)",     included: true },
      { label: "Cashback on select transactions",    included: true },
      { label: "USD virtual card",                   included: false },
      { label: "Physical Naira card",                included: false },
      { label: "Fixed & Target Save plans",          included: false },
      { label: "Priority customer support",          included: false },
      { label: "Higher transfer limits",             included: false },
      { label: "Gift cards",                         included: false },
    ],
  },
  {
    name: "Plus",
    badge: "Most Popular",
    badgeColor: "bg-white/20 text-white",
    price: "₦1,500",
    period: "/ month",
    description: "Unlock the full SmhartPay experience with all features.",
    highlight: true,
    cta: "Upgrade to Plus",
    features: [
      { label: "Everything in Starter",             included: true },
      { label: "USD virtual card",                  included: true },
      { label: "Physical Naira card (free delivery)",included: true },
      { label: "Fixed & Target Save plans",         included: true },
      { label: "Priority customer support",         included: true },
      { label: "Higher transfer limits",            included: true },
      { label: "Gift cards (NGN & USD)",            included: true },
      { label: "Rewards multiplier (2×)",           included: true },
      { label: "Dedicated account manager",         included: false },
      { label: "Custom spending analytics",         included: false },
      { label: "API access",                        included: false },
      { label: "Team / sub-accounts",               included: false },
    ],
  },
  {
    name: "Business",
    badge: "For Teams",
    badgeColor: "bg-amber-100 text-amber-700",
    price: "₦5,000",
    period: "/ month",
    description: "Built for SMEs, freelancers, and growing businesses.",
    highlight: false,
    cta: "Contact Sales",
    features: [
      { label: "Everything in Plus",               included: true },
      { label: "Up to 10 sub-accounts",            included: true },
      { label: "Dedicated account manager",        included: true },
      { label: "Custom spending analytics",        included: true },
      { label: "API access",                       included: true },
      { label: "Bulk transfer support",            included: true },
      { label: "Custom transfer limits",           included: true },
      { label: "Business debit cards (up to 5)",   included: true },
      { label: "Monthly financial reports",        included: true },
      { label: "White-label options",              included: false },
    ],
  },
];

const transactionFees = [
  {
    category: "Wallet Funding",
    rows: [
      { service: "Bank transfer (USSD / internet banking)", starter: "Free", plus: "Free", business: "Free" },
      { service: "Debit card funding",                      starter: "1.5% (max ₦2,000)", plus: "1% (max ₦1,500)", business: "0.5% (max ₦1,000)" },
      { service: "Receive funds from another user",         starter: "Free", plus: "Free", business: "Free" },
    ],
  },
  {
    category: "Transfers",
    rows: [
      { service: "SmhartPay to SmhartPay",                  starter: "Free", plus: "Free", business: "Free" },
      { service: "Transfer to Nigerian bank (same day)",    starter: "₦50",  plus: "₦25",  business: "₦10" },
      { service: "NIP instant transfer (other banks)",      starter: "₦50",  plus: "₦25",  business: "₦10" },
    ],
  },
  {
    category: "Cards",
    rows: [
      { service: "NGN virtual card creation",               starter: "Free", plus: "Free", business: "Free" },
      { service: "USD virtual card creation",               starter: "—",    plus: "$1",   business: "$1" },
      { service: "Physical Naira card issuance",            starter: "₦1,500", plus: "Free", business: "Free" },
      { service: "Card maintenance (monthly)",              starter: "₦100", plus: "Free", business: "Free" },
      { service: "ATM withdrawal (SmhartPay ATMs)",         starter: "Free", plus: "Free", business: "Free" },
      { service: "ATM withdrawal (other banks)",            starter: "₦100", plus: "₦65",  business: "₦50" },
    ],
  },
  {
    category: "Savings",
    rows: [
      { service: "Flex Save — open / close",                starter: "Free", plus: "Free", business: "Free" },
      { service: "Target Save — early withdrawal fee",      starter: "—",    plus: "1%",   business: "0.5%" },
      { service: "Fixed Save — early breakage fee",         starter: "—",    plus: "2%",   business: "1%" },
    ],
  },
  {
    category: "Bills & VTU",
    rows: [
      { service: "Airtime top-up",                          starter: "Free", plus: "Free", business: "Free" },
      { service: "Data bundle purchase",                    starter: "Free", plus: "Free", business: "Free" },
      { service: "Electricity / cable TV bills",           starter: "₦100", plus: "₦50",  business: "₦25" },
      { service: "Gift card purchase",                      starter: "—",    plus: "1%",   business: "0.75%" },
    ],
  },

  // ── ADD A NEW FEE CATEGORY BELOW ─────────────────────────────
  // {
  //   category: "Your Category",
  //   rows: [
  //     { service: "Service name", starter: "Fee", plus: "Fee", business: "Fee" },
  //   ],
  // },
];

const transferLimits = [
  { label: "Daily transfer limit",              starter: "₦200,000",  plus: "₦1,000,000",  business: "₦5,000,000" },
  { label: "Single transaction limit",          starter: "₦100,000",  plus: "₦500,000",    business: "₦2,000,000" },
  { label: "Monthly wallet funding limit",      starter: "₦500,000",  plus: "₦5,000,000",  business: "Unlimited" },
  { label: "USD virtual card spend limit",      starter: "—",          plus: "$500/month",  business: "$5,000/month" },
  { label: "Savings balance limit",             starter: "₦500,000",  plus: "₦10,000,000", business: "Unlimited" },

  // ── ADD MORE LIMIT ROWS BELOW ─────────────────────────────────
  // { label: "Your Limit Label", starter: "Value", plus: "Value", business: "Value" },
];

const faqs = [
  {
    q: "Is the Starter plan really free?",
    a: "Yes, completely. You can open a SmhartPay account and use core features — wallet, transfers, VTU, and basic savings — at no monthly cost, forever.",
  },
  {
    q: "Are there hidden fees I should know about?",
    a: "No hidden fees. All applicable transaction charges are listed transparently in our fee table above. You will always see the fee before confirming any transaction in the app.",
  },
  {
    q: "Can I upgrade or downgrade my plan anytime?",
    a: "Yes. You can upgrade or downgrade your plan at any time from within the app. Changes take effect at the start of your next billing cycle.",
  },
  {
    q: "How are transfer fees charged?",
    a: "Transfer fees are deducted from your wallet balance at the time of the transaction. The fee is displayed in the confirmation screen before you approve the transfer.",
  },
  {
    q: "What happens if I exceed my daily transfer limit?",
    a: "Transactions that exceed your plan's daily limit will be declined. You can upgrade your plan for higher limits or contact support to request a temporary limit increase where eligible.",
  },
  {
    q: "Does SmhartPay charge for receiving money?",
    a: "No. Receiving money into your SmhartPay wallet from any source — bank transfer, another user, or funding — is always free across all plans.",
  },

  // ── ADD MORE FAQ ITEMS BELOW ──────────────────────────────────
  // { q: "Your question here?", a: "Your answer here." },
];

// ═════════════════════════════════════════════════════════════════
// REUSABLE COMPONENTS
// ═════════════════════════════════════════════════════════════════

function CheckIcon({ size = 16 }: { size?: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} fill="none"
      stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
      strokeLinejoin="round" viewBox="0 0 24 24">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function CrossIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="none"
      stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
      strokeLinejoin="round" viewBox="0 0 24 24">
      <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

function AppStoreButton() {
  return (
    <a href={APP_STORE_URL} target="_blank" rel="noopener noreferrer"
      className="inline-flex items-center gap-3 bg-gray-900 text-white
        px-5 py-3 rounded-xl hover:bg-black active:scale-95 transition-all duration-150">
      <svg className="w-5 h-5 fill-white flex-shrink-0" viewBox="0 0 24 24">
        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
      </svg>
      <div className="flex flex-col leading-none text-left">
        <span className="text-[10px] text-gray-300">Download on the</span>
        <span className="text-[14px] font-semibold">App Store</span>
      </div>
    </a>
  );
}

function PlayStoreButton() {
  return (
    <a href={PLAY_STORE_URL} target="_blank" rel="noopener noreferrer"
      className="inline-flex items-center gap-3 bg-gray-900 text-white
        px-5 py-3 rounded-xl hover:bg-black active:scale-95 transition-all duration-150">
      <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24">
        <path d="M3.18 23.76c.3.16.64.2.99.1l.1-.06 11.04-11.04-2.29-2.29L3.18 23.76z" fill="#EA4335"/>
        <path d="M20.7 10.7l-2.6-1.48-2.59 2.59 2.59 2.59 2.62-1.5c.75-.43.75-1.77-.02-2.2z" fill="#FBBC04"/>
        <path d="M3.18.24C2.83.14 2.49.18 2.19.34L12.4 10.56l2.29-2.29L3.18.24z" fill="#4285F4"/>
        <path d="M2.19.34C1.7.62 1.38 1.18 1.38 1.98v20.04c0 .8.32 1.36.81 1.64l.1.06L13.61 12 2.19.34z" fill="#34A853"/>
      </svg>
      <div className="flex flex-col leading-none text-left">
        <span className="text-[10px] text-gray-300">Get it on</span>
        <span className="text-[14px] font-semibold">Google Play</span>
      </div>
    </a>
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
          className={`flex-shrink-0 transition-transform duration-300 ${
            isOpen ? "rotate-180 text-[#034EA2]" : "text-gray-400"}`}>
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      <div className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{ maxHeight: isOpen ? "200px" : "0px" }}>
        <div className="pb-5">
          <div className="flex items-center gap-3 mb-3">
            <span className="w-7 h-[2px] bg-[#034EA2] rounded-full" />
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

export default function PricingPage() {
  const [openFaq, setOpenFaq]     = useState<number | null>(null);
  const [billing, setBilling]     = useState<"monthly" | "annual">("monthly");
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div>
        <Navbar />
    <main className="bg-white">

      {/* ══════════════════════════════════════════
          1. HERO
      ══════════════════════════════════════════ */}
      <section className="bg-gradient-to-br from-[#034EA2] via-[#0457b5] to-[#0369cc]
        text-white px-5 py-16 sm:px-8 sm:py-20 md:px-10 md:py-24">
        <div className="max-w-6xl mx-auto text-center">
          <span className="inline-block text-[12px] font-semibold bg-white/15
            px-4 py-1.5 rounded-full mb-5 tracking-wide uppercase">
            Transparent Pricing
          </span>
          <h1 className="font-bold leading-tight mb-5
            text-[32px] sm:text-[40px] md:text-[50px] lg:text-[56px]">
            Simple, honest pricing.<br className="hidden sm:block" />
            <span className="text-yellow-300"> No surprises.</span>
          </h1>
          <p className="text-blue-100 max-w-2xl mx-auto leading-relaxed mb-10
            text-[15px] sm:text-[16px] md:text-[17px]">
            Start free and only pay for what you need. Every fee is shown
            upfront — in the app and right here on this page.
          </p>

          {/* Billing toggle */}
          <div className="inline-flex items-center bg-white/10 border border-white/20
            rounded-full p-1 gap-1 mb-2">
            {(["monthly", "annual"] as const).map((b) => (
              <button key={b} onClick={() => setBilling(b)}
                className={`px-5 py-2 rounded-full text-[13px] font-semibold
                  transition-all duration-200 capitalize
                  ${billing === b
                    ? "bg-white text-[#034EA2] shadow-sm"
                    : "text-white/70 hover:text-white"}`}>
                {b === "annual" ? "Annual (save 20%)" : "Monthly"}
              </button>
            ))}
          </div>
          {billing === "annual" && (
            <p className="text-yellow-300 text-[12px] font-medium mt-2">
              🎉 2 months free when you pay annually
            </p>
          )}
        </div>
      </section>

      {/* ══════════════════════════════════════════
          2. PLAN CARDS
      ══════════════════════════════════════════ */}
      <section className="px-5 py-16 sm:px-8 sm:py-20 md:px-10 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((plan) => {
              const annualPrice =
                plan.price === "₦0" ? "₦0"
                : plan.price === "₦1,500" ? "₦14,400"
                : "₦48,000";
              const displayPrice = billing === "annual" ? annualPrice : plan.price;
              const displayPeriod = billing === "annual" ? "/ year" : plan.period;

              return (
                <div key={plan.name}
                  className={`relative rounded-2xl p-6 sm:p-7 flex flex-col border
                    transition-all duration-200 hover:shadow-xl
                    ${plan.highlight
                      ? "bg-[#034EA2] border-[#034EA2] text-white shadow-lg shadow-blue-200"
                      : "bg-white border-gray-100"}`}>

                  {/* Badge */}
                  <span className={`self-start text-[11px] font-bold px-3 py-1
                    rounded-full mb-5 ${plan.badgeColor}`}>
                    {plan.badge}
                  </span>

                  {/* Name + description */}
                  <h2 className={`text-[22px] sm:text-[24px] font-bold mb-1
                    ${plan.highlight ? "text-white" : "text-gray-900"}`}>
                    {plan.name}
                  </h2>
                  <p className={`text-[13px] leading-relaxed mb-6
                    ${plan.highlight ? "text-blue-200" : "text-gray-500"}`}>
                    {plan.description}
                  </p>

                  {/* Price */}
                  <div className={`rounded-xl p-4 mb-6
                    ${plan.highlight ? "bg-white/10" : "bg-gray-50 border border-gray-100"}`}>
                    <span className={`text-[36px] sm:text-[40px] font-black
                      ${plan.highlight ? "text-yellow-300" : "text-[#034EA2]"}`}>
                      {displayPrice}
                    </span>
                    <span className={`text-[13px] ml-1
                      ${plan.highlight ? "text-blue-200" : "text-gray-400"}`}>
                      {displayPeriod}
                    </span>
                    {billing === "annual" && plan.price !== "₦0" && (
                      <p className={`text-[11px] mt-1 ${plan.highlight ? "text-yellow-200" : "text-green-600"}`}>
                        Save 20% vs monthly
                      </p>
                    )}
                  </div>

                  {/* Feature list */}
                  <ul className="flex flex-col gap-2.5 flex-1 mb-6">
                    {plan.features.map((f) => (
                      <li key={f.label} className="flex items-start gap-2.5">
                        <span className={`mt-0.5 flex-shrink-0 ${
                          f.included
                            ? plan.highlight ? "text-yellow-300" : "text-[#034EA2]"
                            : "text-gray-300"}`}>
                          {f.included ? <CheckIcon /> : <CrossIcon />}
                        </span>
                        <span className={`text-[13px] leading-snug
                          ${f.included
                            ? plan.highlight ? "text-blue-100" : "text-gray-700"
                            : "text-gray-300 line-through"}`}>
                          {f.label}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <a href={plan.name === "Business" ? "/contact" : APP_STORE_URL}
                    target={plan.name === "Business" ? "_self" : "_blank"}
                    rel="noopener noreferrer"
                    className={`block text-center text-[14px] font-semibold py-3
                      rounded-xl transition-all duration-150 active:scale-95
                      ${plan.highlight
                        ? "bg-white text-[#034EA2] hover:bg-blue-50"
                        : "bg-[#034EA2] text-white hover:bg-blue-700"}`}>
                    {plan.cta}
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          3. TRANSACTION FEES TABLE
      ══════════════════════════════════════════ */}
      <section className="px-5 py-16 sm:px-8 sm:py-20 md:px-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <span className="inline-block text-[12px] font-semibold text-[#034EA2]
              bg-blue-50 px-4 py-1.5 rounded-full mb-4 tracking-wide uppercase">
              Fee Schedule
            </span>
            <h2 className="font-bold text-gray-900
              text-[24px] sm:text-[28px] md:text-[34px]">
              Transaction fees at a glance
            </h2>
            <p className="mt-3 text-[14px] sm:text-[15px] text-gray-500 max-w-xl mx-auto">
              Every charge is listed below. No fine print, no surprises.
            </p>
          </div>

          {/* Category tabs (mobile-friendly) */}
          <div className="flex gap-2 overflow-x-auto pb-2 mb-6 scrollbar-hide">
            {transactionFees.map((cat, i) => (
              <button key={cat.category} onClick={() => setActiveTab(i)}
                className={`flex-shrink-0 px-4 py-2 rounded-full text-[13px]
                  font-semibold transition-all duration-150 whitespace-nowrap
                  ${activeTab === i
                    ? "bg-[#034EA2] text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>
                {cat.category}
              </button>
            ))}
          </div>

          {/* Table */}
          <div className="rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
            {/* Table header */}
            <div className="grid grid-cols-[1fr_repeat(3,_80px)] sm:grid-cols-[1fr_repeat(3,_110px)]
              md:grid-cols-[1fr_repeat(3,_140px)] bg-gray-50 border-b border-gray-100">
              <div className="px-4 sm:px-5 py-3.5 text-[12px] font-bold text-gray-500 uppercase tracking-wide">
                Service
              </div>
              {["Starter", "Plus", "Business"].map((h) => (
                <div key={h} className={`px-3 sm:px-4 py-3.5 text-center
                  text-[12px] font-bold uppercase tracking-wide
                  ${h === "Plus" ? "text-[#034EA2]" : "text-gray-500"}`}>
                  {h}
                </div>
              ))}
            </div>

            {/* Rows */}
            {transactionFees[activeTab].rows.map((row, i) => (
              <div key={i}
                className={`grid grid-cols-[1fr_repeat(3,_80px)]
                  sm:grid-cols-[1fr_repeat(3,_110px)]
                  md:grid-cols-[1fr_repeat(3,_140px)]
                  border-b border-gray-50 last:border-0
                  ${i % 2 === 0 ? "bg-white" : "bg-gray-50/50"}`}>
                <div className="px-4 sm:px-5 py-4 text-[13px] sm:text-[14px] text-gray-700">
                  {row.service}
                </div>
                {[row.starter, row.plus, row.business].map((val, j) => (
                  <div key={j}
                    className={`px-3 sm:px-4 py-4 text-center text-[12px] sm:text-[13px]
                      font-medium
                      ${val === "Free"  ? "text-green-600" :
                        val === "—"     ? "text-gray-300"  : "text-gray-700"}`}>
                    {val}
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* ── ADD MORE FEE CATEGORIES in the transactionFees array above ── */}
        </div>
      </section>

      {/* ══════════════════════════════════════════
          4. TRANSFER LIMITS
      ══════════════════════════════════════════ */}
      <section className="px-5 py-16 sm:px-8 sm:py-20 md:px-10 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <span className="inline-block text-[12px] font-semibold text-[#034EA2]
              bg-blue-50 px-4 py-1.5 rounded-full mb-4 tracking-wide uppercase">
              Limits
            </span>
            <h2 className="font-bold text-gray-900
              text-[24px] sm:text-[28px] md:text-[34px]">
              Transfer & account limits by plan
            </h2>
            <p className="mt-3 text-[14px] sm:text-[15px] text-gray-500 max-w-xl mx-auto">
              Limits increase as you upgrade. Upgrade anytime from the app.
            </p>
          </div>

          <div className="rounded-2xl border border-gray-100 overflow-hidden shadow-sm bg-white">
            {/* Header */}
            <div className="grid grid-cols-[1fr_repeat(3,_90px)] sm:grid-cols-[1fr_repeat(3,_130px)]
              md:grid-cols-[1fr_repeat(3,_160px)] bg-gray-50 border-b border-gray-100">
              <div className="px-4 sm:px-5 py-3.5 text-[12px] font-bold text-gray-500 uppercase tracking-wide">
                Limit Type
              </div>
              {["Starter", "Plus", "Business"].map((h) => (
                <div key={h} className={`px-3 sm:px-4 py-3.5 text-center
                  text-[12px] font-bold uppercase tracking-wide
                  ${h === "Plus" ? "text-[#034EA2]" : "text-gray-500"}`}>
                  {h}
                </div>
              ))}
            </div>
            {transferLimits.map((row, i) => (
              <div key={i}
                className={`grid grid-cols-[1fr_repeat(3,_90px)]
                  sm:grid-cols-[1fr_repeat(3,_130px)]
                  md:grid-cols-[1fr_repeat(3,_160px)]
                  border-b border-gray-50 last:border-0
                  ${i % 2 === 0 ? "bg-white" : "bg-gray-50/50"}`}>
                <div className="px-4 sm:px-5 py-4 text-[13px] sm:text-[14px] text-gray-700 font-medium">
                  {row.label}
                </div>
                {[row.starter, row.plus, row.business].map((val, j) => (
                  <div key={j}
                    className={`px-3 sm:px-4 py-4 text-center text-[12px] sm:text-[13px] font-semibold
                      ${val === "Unlimited" ? "text-green-600" :
                        val === "—"         ? "text-gray-300"  : "text-gray-800"}`}>
                    {val}
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* ── ADD MORE LIMIT ROWS in the transferLimits array above ── */}
        </div>
      </section>

      {/* ══════════════════════════════════════════
          5. TRUST STRIP
      ══════════════════════════════════════════ */}
      <section className="px-5 py-12 sm:px-8 md:px-10 border-y border-gray-100">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            {[
              { icon: "🔒", title: "Bank-grade encryption",  sub: "Your data is always protected" },
              { icon: "🏦", title: "CBN regulated",          sub: "Licensed and compliant" },
              { icon: "🛡️", title: "NDIC insured",           sub: "Deposits protected" },
              { icon: "⚡", title: "Instant transfers",       sub: "Real-time payments 24/7" },
            ].map((item) => (
              <div key={item.title} className="flex flex-col items-center gap-2">
                <span className="text-3xl">{item.icon}</span>
                <p className="text-[13px] sm:text-[14px] font-semibold text-gray-900">{item.title}</p>
                <p className="text-[12px] text-gray-400 leading-snug">{item.sub}</p>
              </div>
            ))}
          </div>
          {/* ── ADD MORE TRUST ITEMS ABOVE ── */}
        </div>
      </section>

      {/* ══════════════════════════════════════════
          6. COMPARE ALL FEATURES TABLE
      ══════════════════════════════════════════ */}
      <section className="px-5 py-16 sm:px-8 sm:py-20 md:px-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <span className="inline-block text-[12px] font-semibold text-[#034EA2]
              bg-blue-50 px-4 py-1.5 rounded-full mb-4 tracking-wide uppercase">
              Compare
            </span>
            <h2 className="font-bold text-gray-900
              text-[24px] sm:text-[28px] md:text-[34px]">
              Full feature comparison
            </h2>
          </div>

          <div className="rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
            {/* Header row */}
            <div className="grid grid-cols-[1fr_repeat(3,_80px)] sm:grid-cols-[1fr_repeat(3,_110px)]
              md:grid-cols-[1fr_repeat(3,_150px)] bg-gray-50 border-b border-gray-100">
              <div className="px-4 sm:px-5 py-4 text-[12px] font-bold text-gray-500 uppercase tracking-wide">
                Feature
              </div>
              {["Starter","Plus","Business"].map((h) => (
                <div key={h} className={`px-3 py-4 text-center text-[13px] font-bold
                  ${h === "Plus" ? "text-[#034EA2] bg-blue-50/40" : "text-gray-700"}`}>
                  {h}
                </div>
              ))}
            </div>

            {[
              { label: "Wallet & funding",               s: true,  p: true,  b: true  },
              { label: "Send money to Nigerian banks",    s: true,  p: true,  b: true  },
              { label: "Receive funds",                   s: true,  p: true,  b: true  },
              { label: "Airtime & data (VTU)",            s: true,  p: true,  b: true  },
              { label: "Electricity & cable TV bills",    s: true,  p: true,  b: true  },
              { label: "NGN virtual card",                s: true,  p: true,  b: true  },
              { label: "USD virtual card",                s: false, p: true,  b: true  },
              { label: "Physical Naira card",             s: false, p: true,  b: true  },
              { label: "Flex Save (basic savings)",       s: true,  p: true,  b: true  },
              { label: "Target Save & Fixed Save",        s: false, p: true,  b: true  },
              { label: "Gift cards",                      s: false, p: true,  b: true  },
              { label: "Cashback & rewards",              s: true,  p: true,  b: true  },
              { label: "Rewards multiplier (2×)",         s: false, p: true,  b: true  },
              { label: "Priority support",                s: false, p: true,  b: true  },
              { label: "Sub-accounts (up to 10)",         s: false, p: false, b: true  },
              { label: "Dedicated account manager",       s: false, p: false, b: true  },
              { label: "Bulk transfers",                  s: false, p: false, b: true  },
              { label: "API access",                      s: false, p: false, b: true  },
              { label: "Monthly financial reports",       s: false, p: false, b: true  },
              // ── ADD MORE FEATURE ROWS BELOW ──
              // { label: "Your feature", s: false, p: false, b: true },
            ].map((row, i) => (
              <div key={i}
                className={`grid grid-cols-[1fr_repeat(3,_80px)]
                  sm:grid-cols-[1fr_repeat(3,_110px)]
                  md:grid-cols-[1fr_repeat(3,_150px)]
                  border-b border-gray-50 last:border-0
                  ${i % 2 === 0 ? "bg-white" : "bg-gray-50/40"}`}>
                <div className="px-4 sm:px-5 py-3.5 text-[13px] sm:text-[14px] text-gray-700">
                  {row.label}
                </div>
                {([row.s, row.p, row.b] as boolean[]).map((val, j) => (
                  <div key={j}
                    className={`px-3 py-3.5 flex items-center justify-center
                      ${j === 1 ? "bg-blue-50/20" : ""}`}>
                    {val
                      ? <span className="text-[#034EA2]"><CheckIcon size={15} /></span>
                      : <span className="text-gray-300"><CrossIcon /></span>
                    }
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          7. FAQ
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
              Pricing questions answered
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
        </div>
      </section>

      {/* ══════════════════════════════════════════
          8. FINAL CTA
      ══════════════════════════════════════════ */}
      <section className="px-5 py-16 sm:px-8 sm:py-20 md:px-10">
        <div className="max-w-6xl mx-auto">
          <div className="bg-gradient-to-br from-[#034EA2] to-[#0369cc]
            rounded-3xl px-8 py-12 sm:px-12 sm:py-16 text-center">
            <h2 className="font-bold text-white mb-4
              text-[24px] sm:text-[30px] md:text-[36px]">
              Start free. Upgrade when you're ready.
            </h2>
            <p className="text-blue-200 max-w-xl mx-auto mb-8 leading-relaxed
              text-[14px] sm:text-[15px]">
              Download SmhartPay today — no credit card needed. Explore all
              Starter features free, and upgrade to Plus or Business at any time.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center mb-6">
              <AppStoreButton />
              <PlayStoreButton />
            </div>
            <p className="text-blue-200 text-[13px]">
              Questions about pricing?{" "}
              <Link href="/contact"
                className="text-white font-semibold underline hover:no-underline">
                Talk to our team →
              </Link>
            </p>
          </div>
          {/* ── ADD MORE CONTENT BELOW ── */}
        </div>
      </section>

    </main>
    <Footer />
    </div>
  );
}