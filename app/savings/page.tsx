"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/Components/layout/Navbar";
import Footer2 from "@/Components/layout/footer2";

// ─── App Store URLs ───────────────────────────────────────────────
const APP_STORE_URL = "https://apps.apple.com/your-app-link";         // ← iOS link here
const PLAY_STORE_URL = "https://play.google.com/store/your-app-link"; // ← Android link here

// ─────────────────────────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────────────────────────

const savingsFeatures = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
        stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>
      </svg>
    ),
    title: "Goal-Based Savings",
    description:
      "Create personalised savings goals — whether for a new gadget, travel, education, or emergencies. Name your goal, set a target amount, and track every naira of progress.",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
        stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
    title: "Automated Contributions",
    description:
      "Set it and forget it. Schedule automatic deposits daily, weekly, or monthly and let SmhartPay grow your savings without lifting a finger.",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
        stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
      </svg>
    ),
    title: "Competitive Returns",
    description:
      "Earn interest on your savings balance. SmhartPay offers competitive rates that help your money work harder while it stays safely stored.",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
        stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/>
      </svg>
    ),
    title: "Multiple Savings Plans",
    description:
      "Run several savings plans at once. Keep your holiday fund separate from your emergency fund, all within the same app.",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
        stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
      </svg>
    ),
    title: "Real-Time Progress Tracking",
    description:
      "Watch your savings grow in real time. Visual progress bars and milestone alerts keep you motivated and on track every step of the way.",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
        stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
    title: "Safe & Secure",
    description:
      "Your savings are protected by bank-grade encryption, fraud monitoring, and compliance with CBN regulations. Your money is always safe with SmhartPay.",
  },
];

const savingsPlans = [
  {
    name: "Flex Save",
    badge: "Most Popular",
    badgeColor: "bg-[#034EA2] text-white",
    highlight: true,
    description: "Save at your own pace with no lock-in period. Deposit or withdraw anytime.",
    rate: "8%",
    period: "per annum",
    features: [
      "No minimum balance required",
      "Withdraw anytime, no penalties",
      "Earn interest on every naira saved",
      "Automated daily or weekly contributions",
      "Instant access from the app",
    ],
  },
  {
    name: "Target Save",
    badge: "Goal-Focused",
    badgeColor: "bg-gray-100 text-blue-700",
    highlight: false,
    description: "Lock funds towards a specific goal and earn higher interest on maturity.",
    rate: "12%",
    period: "per annum",
    features: [
      "Set a goal amount and deadline",
      "Higher interest rate on maturity",
      "Automated contributions",
      "Progress tracker with milestone alerts",
      "Early withdrawal with reduced interest",
    ],
  },
  {
    name: "Fixed Save",
    badge: "Maximum Returns",
    badgeColor: "bg-gray-100 text-blue-700",
    highlight: false,
    description: "Lock a fixed amount for a fixed period and enjoy the highest returns.",
    rate: "15%",
    period: "per annum",
    features: [
      "Fixed tenure: 30, 60, or 90 days",
      "Highest available interest rate",
      "Full payout on maturity",
      "Suitable for disciplined savers",
      "No partial withdrawals during tenure",
    ],
  },
];

const steps = [
  {
    number: "01",
    title: "Create a Savings Plan",
    description:
      "Open the SmhartPay app, tap on Savings, and choose a plan that fits your goal — Flex, Target, or Fixed Save.",
  },
  {
    number: "02",
    title: "Set Your Target & Schedule",
    description:
      "Name your goal, enter your target amount, set a deadline, and choose how often you want to contribute automatically.",
  },
  {
    number: "03",
    title: "Watch Your Money Grow",
    description:
      "Track your progress in real time, receive milestone notifications, and earn interest as your savings build up.",
  },
];

const testimonials = [
  {
    quote:
      "I saved up for my daughter's school fees in 6 months using SmhartPay Target Save. The automated contributions made it effortless.",
    name: "Adaeze Obi",
    role: "Teacher, Enugu",
    avatar: "https://randomuser.me/api/portraits/women/75.jpg",
  },
  {
    quote:
      "Fixed Save gave me the discipline I needed. I locked my money and didn't touch it — came out with 15% returns. Absolutely worth it.",
    name: "Emeka Nnaji",
    role: "Engineer, Abuja",
    avatar: "https://randomuser.me/api/portraits/men/78.jpg",
  },
  {
    quote:
      "I love that I can have multiple savings goals at once. My emergency fund and travel fund are both growing side by side.",
    name: "Tolu Fashola",
    role: "Entrepreneur, Lagos",
    avatar: "https://randomuser.me/api/portraits/women/65.jpg",
  },
];

const faqs = [
  {
    question: "Is there a minimum amount to start saving?",
    answer:
      "No. You can start saving with as little as ₦100 on the Flex Save plan. There is no minimum balance requirement.",
  },
  {
    question: "Can I withdraw my savings at any time?",
    answer:
      "It depends on your plan. Flex Save allows withdrawals at any time with no penalty. Target and Fixed Save plans may have early withdrawal conditions.",
  },
  {
    question: "How is interest calculated and paid?",
    answer:
      "Interest is calculated on your daily balance and credited to your savings plan at the end of each month or on plan maturity, depending on the plan type.",
  },
  {
    question: "Are my savings insured?",
    answer:
      "Yes. Deposits on SmhartPay are insured by the Nigeria Deposit Insurance Corporation (NDIC) in accordance with applicable regulations.",
  },
  {
    question: "Can I run multiple savings plans at the same time?",
    answer:
      "Absolutely. You can create and manage as many savings plans as you need simultaneously within the SmhartPay app.",
  },
];

// ─────────────────────────────────────────────────────────────────
// SUB-COMPONENTS
// ─────────────────────────────────────────────────────────────────

function AppStoreButton() {
  return (
    <a href={APP_STORE_URL} target="_blank" rel="noopener noreferrer"
      className="inline-flex items-center gap-3 bg-gray-900 text-white px-5 py-3 rounded-xl
                 hover:bg-black active:scale-95 transition-all duration-150">
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
      className="inline-flex items-center gap-3 bg-gray-900 text-white px-5 py-3 rounded-xl
                 hover:bg-black active:scale-95 transition-all duration-150">
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

function CheckIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none"
      stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  );
}

function FAQItem({ question, answer, isOpen, onToggle }: {
  question: string; answer: string; isOpen: boolean; onToggle: () => void;
}) {
  return (
    <div className="border-b border-gray-200">
      <button onClick={onToggle} aria-expanded={isOpen}
        className="w-full flex items-center justify-between gap-6 py-5 text-left group cursor-pointer">
        <span className={`text-[14px] sm:text-[15px] font-medium leading-snug transition-colors
          ${isOpen ? "text-[#034EA2] font-semibold" : "text-gray-700 group-hover:text-gray-900"}`}>
          {question}
        </span>
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none"
          stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"
          className={`flex-shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180 text-[#034EA2]" : "text-gray-400"}`}>
          <polyline points="6 9 12 15 18 9"/>
        </svg>
      </button>
      <div className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{ maxHeight: isOpen ? "200px" : "0px" }}>
        <div className="pb-5">
          <div className="flex items-center gap-3 mb-3">
            <span className="w-7 h-[2px] bg-[#034EA2] rounded-full" />
            <span className="text-[12px] font-semibold text-[#034EA2]">Answer</span>
          </div>
          <p className="text-[13px] sm:text-[14px] text-gray-500 leading-relaxed">{answer}</p>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// MAIN PAGE
// ─────────────────────────────────────────────────────────────────

export default function SavingsPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div>
        <Navbar />
    <main className="bg-white">

      {/* ══════════════════════════════════════════
          1. HERO
      ══════════════════════════════════════════ */}
      <section className="bg-gradient-to-br from-[#034EA2] via-[#0457b5] to-[#0369cc]
        text-white px-5 py-16 sm:px-8 sm:py-20 md:px-10 md:py-24">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

            {/* Text */}
            <div className="flex-1 text-center lg:text-left">
              <span className="inline-block text-[12px] font-semibold bg-white/15
                px-4 py-1.5 rounded-full mb-5 tracking-wide uppercase">
                SmhartPay Savings
              </span>
              <h1 className="font-bold leading-tight mb-5
                text-[32px] sm:text-[40px] md:text-[48px] lg:text-[52px]">
                Save Towards What <span className="text-black">Matters Most</span>
              </h1>
              <p className="text-blue-100 leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0
                text-[15px] sm:text-[16px] md:text-[17px]">
                Set goals, automate your contributions, and earn competitive interest —
                all from the SmhartPay app. Your savings journey starts today.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                <AppStoreButton />
                <PlayStoreButton />
              </div>
              {/* Trust note */}
              <p className="mt-6 text-[12px] text-blue-200 flex items-center gap-4">
               Deposit Insured By <img src="/images/ndic.svg" alt="" />Licensed by <img src="/images/cbn.svg" alt="" />
              </p>
            </div>

            {/* Stats cards */}
            <div className="grid grid-cols-2 gap-4 w-full max-w-sm lg:max-w-xs xl:max-w-sm flex-shrink-0">
              {[
                { value: "₦0", label: "Minimum to start" },
                { value: "15%", label: "Interest p.a. (Fixed Save)" },
                { value: "3", label: "Savings plan types" },
                { value: "24/7", label: "Access via app" },
              ].map((stat) => (
                <div key={stat.label}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-5 text-center border border-white/20">
                  <p className="text-[24px] sm:text-[28px] font-bold text-white">{stat.value}</p>
                  <p className="text-[12px] sm:text-[13px] text-blue-200 mt-1 leading-snug">{stat.label}</p>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          2. HOW IT WORKS
      ══════════════════════════════════════════ */}
      <section className="px-5 py-16 sm:px-8 sm:py-20 md:px-10 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block text-[12px] font-semibold text-[#034EA2]
              bg-blue-50 px-4 py-1.5 rounded-full mb-4 tracking-wide uppercase">
              How It Works
            </span>
            <h2 className="font-extrabold text-black
              text-[24px] sm:text-[28px] md:text-[34px]">
              Start saving in 3 simple steps
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8">
            {steps.map((step, i) => (
              <div key={i} className="relative bg-white rounded-2xl p-6 sm:p-7
                border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200">
                {/* Step number */}
                <span className="text-[42px] sm:text-[48px] font-black text-black leading-none block mb-4">
                  {step.number}
                </span>
                <h3 className="text-[16px] sm:text-[17px] font-bold text-gray-900 mb-3">
                  {step.title}
                </h3>
                <p className="text-[13px] sm:text-[14px] text-gray-500 leading-relaxed">
                  {step.description}
                </p>
                {/* Connector arrow — between cards on desktop */}
                {i < steps.length - 1 && (
                  <div className="hidden sm:block absolute -right-4 top-1/2 -translate-y-1/2 z-10">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                      stroke="#034EA2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12"/>
                      <polyline points="12 5 19 12 12 19"/>
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          3. SAVINGS PLANS
      ══════════════════════════════════════════ */}
      <section className="px-5 py-16 sm:px-8 sm:py-20 md:px-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block text-[12px] font-semibold text-[#034EA2]
              bg-blue-50 px-4 py-1.5 rounded-full mb-4 tracking-wide uppercase">
              Savings Plans
            </span>
            <h2 className="font-bold text-gray-900
              text-[24px] sm:text-[28px] md:text-[34px]">
              Choose the plan that works for you
            </h2>
            <p className="mt-3 text-[14px] sm:text-[15px] text-gray-500 max-w-xl mx-auto">
              Whether you're saving casually or working towards a fixed goal,
              SmhartPay has a plan built for your lifestyle.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {savingsPlans.map((plan) => (
              <div key={plan.name}
                className={`relative rounded-2xl p-6 sm:p-7 flex flex-col border
                  transition-shadow duration-200 hover:shadow-lg
                  ${plan.highlight
                    ? "bg-[#034EA2] border-[#034EA2] text-white shadow-lg shadow-blue-200"
                    : "bg-white border-gray-100 text-gray-900"
                  }`}>

                {/* Badge */}
                <span className={`inline-block self-start text-[11px] font-bold
                  px-3 py-1 rounded-full mb-5 ${plan.badgeColor}`}>
                  {plan.badge}
                </span>

                {/* Plan name */}
                <h3 className={`text-[20px] sm:text-[22px] font-bold mb-2
                  ${plan.highlight ? "text-white" : "text-gray-900"}`}>
                  {plan.name}
                </h3>

                {/* Description */}
                <p className={`text-[13px] sm:text-[14px] leading-relaxed mb-6
                  ${plan.highlight ? "text-blue-200" : "text-gray-500"}`}>
                  {plan.description}
                </p>

                {/* Rate */}
                <div className={`rounded-xl p-4 mb-6 text-center
                  ${plan.highlight ? "bg-white/10" : "bg-gray-50 border border-gray-100"}`}>
                  <span className={`text-[36px] sm:text-[40px] font-black
                    ${plan.highlight ? "text-" : "text-[#034EA2]"}`}>
                    {plan.rate}
                  </span>
                  <span className={`text-[13px] ml-1
                    ${plan.highlight ? "text-blue-200" : "text-gray-400"}`}>
                    {plan.period}
                  </span>
                </div>

                {/* Features */}
                <ul className="flex flex-col gap-3 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5">
                      <span className={`mt-0.5 flex-shrink-0
                        ${plan.highlight ? "text-black" : "text-[#034EA2]"}`}>
                        <CheckIcon />
                      </span>
                      <span className={`text-[13px] sm:text-[14px] leading-snug
                        ${plan.highlight ? "text-blue-100" : "text-gray-600"}`}>
                        {f}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <a href={APP_STORE_URL} target="_blank" rel="noopener noreferrer"
                  className={`mt-8 block text-center text-[14px] font-semibold py-3 rounded-xl
                    transition-all duration-150 active:scale-95
                    ${plan.highlight
                      ? "bg-white text-[#034EA2] hover:bg-blue-50"
                      : "bg-[#034EA2] text-white hover:bg-blue-700"
                    }`}>
                  Start {plan.name}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          4. FEATURES GRID
      ══════════════════════════════════════════ */}
      <section className="px-5 py-16 sm:px-8 sm:py-20 md:px-10 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block text-[12px] font-semibold text-[#034EA2]
              bg-blue-50 px-4 py-1.5 rounded-full mb-4 tracking-wide uppercase">
              Features
            </span>
            <h2 className="font-bold text-gray-900
              text-[24px] sm:text-[28px] md:text-[34px]">
              Everything you need to save smarter
            </h2>
            <p className="mt-3 text-[14px] sm:text-[15px] text-gray-500 max-w-xl mx-auto">
              SmhartPay Savings is built around your goals — flexible, intelligent,
              and always working for you in the background.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {savingsFeatures.map((feature) => (
              <div key={feature.title}
                className="bg-white rounded-2xl p-6 border border-gray-100
                  hover:shadow-md hover:border-blue-100 transition-all duration-200 group">
                <div className="w-11 h-11 rounded-xl bg-blue-50 text-[#034EA2]
                  flex items-center justify-center mb-4
                  group-hover:bg-[#034EA2] group-hover:text-white transition-colors duration-200">
                  {feature.icon}
                </div>
                <h3 className="text-[15px] sm:text-[16px] font-bold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-[13px] sm:text-[14px] text-gray-500 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          {/* ── ADD MORE FEATURES BELOW ── */}
        </div>
      </section>

      {/* ══════════════════════════════════════════
          5. APP MOCKUP + DOWNLOAD CTA
      ══════════════════════════════════════════ */}
      <section className="px-5 py-16 sm:px-8 sm:py-20 md:px-10">
        <div className="max-w-6xl mx-auto">
          <div className="bg-gradient-to-br from-[#034EA2] to-[#0369cc]
            rounded-3xl p-8 sm:p-10 md:p-14
            flex flex-col lg:flex-row items-center gap-10 lg:gap-14">

            {/* Text */}
            <div className="flex-1 text-center lg:text-left">
              <h2 className="text-[24px] sm:text-[30px] md:text-[36px]
                font-bold text-white leading-tight mb-4">
                Your savings goal is one tap away
              </h2>
              <p className="text-blue-200 text-[14px] sm:text-[15px] leading-relaxed mb-8 max-w-md mx-auto lg:mx-0">
                Download SmhartPay today and start your first savings plan in under
                2 minutes. No paperwork, no queues — just smart, simple saving.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                <AppStoreButton />
                <PlayStoreButton />
              </div>
            </div>

            {/* Mockup image */}
            <div className="flex-shrink-0">
              <img
                src="/images/fivemillion.svg"
                alt="SmhartPay savings feature screenshot"
                className="w-[180px] sm:w-[220px] md:w-[260px] h-auto object-contain"
                loading="lazy"
              />
            </div>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          6. TESTIMONIALS
      ══════════════════════════════════════════ */}
      <section className="px-5 py-16 sm:px-8 sm:py-20 md:px-10 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block text-[12px] font-semibold text-[#034EA2]
              bg-blue-50 px-4 py-1.5 rounded-full mb-4 tracking-wide uppercase">
              Testimonials
            </span>
            <h2 className="font-bold text-gray-900
              text-[24px] sm:text-[28px] md:text-[34px]">
              Nigerians saving smarter every day
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {testimonials.map((t) => (
              <div key={t.name}
                className="bg-white rounded-2xl p-6 border border-gray-100
                  hover:shadow-md transition-shadow duration-200">
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="#FBBF24">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                    </svg>
                  ))}
                </div>
                <p className="text-[13px] sm:text-[14px] text-gray-600 leading-relaxed mb-5 italic">
                  "{t.quote}"
                </p>
                <div className="flex items-center gap-3">
                  <img src={t.avatar} alt={t.name}
                    className="w-10 h-10 rounded-full object-cover flex-shrink-0" loading="lazy"/>
                  <div>
                    <p className="text-[13px] font-semibold text-gray-900">{t.name}</p>
                    <p className="text-[12px] text-gray-400">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* ── ADD MORE TESTIMONIALS BELOW ── */}
        </div>
      </section>

      {/* ══════════════════════════════════════════
          7. FAQ
      ══════════════════════════════════════════ */}
      <section className="px-5 py-16 sm:px-8 sm:py-20 md:px-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <span className="inline-block text-[12px] font-semibold text-[#034EA2]
              bg-blue-50 px-4 py-1.5 rounded-full mb-4 tracking-wide uppercase">
              FAQs
            </span>
            <h2 className="font-bold text-gray-900
              text-[24px] sm:text-[28px] md:text-[34px]">
              Savings questions answered
            </h2>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="border-t border-gray-200" />
            {faqs.map((faq, i) => (
              <FAQItem
                key={i}
                question={faq.question}
                answer={faq.answer}
                isOpen={openFaq === i}
                onToggle={() => setOpenFaq(openFaq === i ? null : i)}
              />
            ))}
          </div>

          {/* ── ADD MORE FAQS BELOW (copy the object format in the faqs array) ── */}
        </div>
      </section>

      {/* ══════════════════════════════════════════
          8. FINAL CTA BANNER
      ══════════════════════════════════════════ */}
      <section className="px-5 py-16 sm:px-8 sm:py-20 md:px-10 bg-gray-50">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="font-bold text-gray-900 mb-4
            text-[24px] sm:text-[30px] md:text-[36px]">
            Ready to start saving?
          </h2>
          <p className="text-[14px] sm:text-[15px] text-gray-500 max-w-xl mx-auto mb-8 leading-relaxed">
            Join thousands of Nigerians building better financial habits with
            SmhartPay. Download the app and create your first savings plan today.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <AppStoreButton />
            <PlayStoreButton />
          </div>
          <p className="mt-6 text-[13px] text-gray-400">
            Have questions?{" "}
            <Link href="/help-centre" className="text-[#034EA2] font-medium hover:underline">
              Visit our Help Centre →
            </Link>
          </p>
        </div>

        {/* ── ADD MORE CONTENT TO THIS SECTION BELOW ── */}
      </section>

    </main>
    <Footer/>
    </div>
  );
}