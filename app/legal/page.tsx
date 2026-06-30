"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Footer from "@/Components/layout/footer";
import Navbar from "@/Components/layout/Navbar";

// ─── Contact config — update when live ───────────────────────────
const LEGAL_EMAIL    = "legal@smhartpay.com";
const PRIVACY_EMAIL  = "privacy@smhartpay.com";
const DPO_EMAIL      = "dpo@smhartpay.com";
const SUPPORT_EMAIL  = "support@smhartpay.com";
const RC_NUMBER      = "RC 0000000";
const CBN_LICENCE    = "CBN/FSD/FINTECH/000000";
const NDIC_NUMBER    = "NDIC/000000";
const ADDRESS        = "SmhartPay Financial Services Ltd, Victoria Island, Lagos, Nigeria.";

// ═════════════════════════════════════════════════════════════════
// DATA
// ═════════════════════════════════════════════════════════════════

// ── Legal documents ───────────────────────────────────────────────
const legalDocuments = [
  {
    icon: "📄",
    title: "Terms of Use",
    description:
      "The complete terms governing your use of SmhartPay — including account creation, transactions, usage rules, liability, and your rights and obligations as a user.",
    updated: "1 January 2026",
    href: "/terms",
    badge: "Core",
    bg: "bg-blue-50",
    badgeColor: "bg-[#034EA2] text-white",
    border: "border-blue-100 hover:border-[#034EA2]/30",
  },
  {
    icon: "🔒",
    title: "Privacy Policy",
    description:
      "How SmhartPay collects, stores, processes, and protects your personal data under the Nigeria Data Protection Act (NDPA) 2023 and applicable CBN guidelines.",
    updated: "1 January 2026",
    href: "/privacy",
    badge: "Privacy",
    bg: "bg-purple-50",
    badgeColor: "bg-purple-600 text-white",
    border: "border-purple-100 hover:border-purple-300",
  },
  {
    icon: "🍪",
    title: "Cookie Policy",
    description:
      "Information on the cookies and tracking technologies used on our website, what data they collect, how long they are retained, and how to manage your preferences.",
    updated: "1 January 2026",
    href: "/cookies",
    badge: "Website",
    bg: "bg-amber-50",
    badgeColor: "bg-amber-500 text-white",
    border: "border-amber-100 hover:border-amber-300",
  },
  {
    icon: "⚖️",
    title: "Acceptable Use Policy",
    description:
      "The rules and restrictions on how you may use SmhartPay's platform and services, including a list of prohibited activities and the consequences of violations.",
    updated: "1 January 2026",
    href: "/acceptable-use",
    badge: "Usage",
    bg: "bg-green-50",
    badgeColor: "bg-green-600 text-white",
    border: "border-green-100 hover:border-green-300",
  },
  {
    icon: "🏦",
    title: "AML & KYC Policy",
    description:
      "Our Anti-Money Laundering (AML) and Know Your Customer (KYC) obligations, verification procedures, customer due diligence standards, and reporting requirements.",
    updated: "1 January 2026",
    href: "/aml-kyc",
    badge: "Compliance",
    bg: "bg-red-50",
    badgeColor: "bg-red-600 text-white",
    border: "border-red-100 hover:border-red-300",
  },
  {
    icon: "🤝",
    title: "Referral Programme Terms",
    description:
      "The specific terms governing SmhartPay's referral programme — including eligibility criteria, reward conditions, payment timelines, and programme limitations.",
    updated: "1 January 2026",
    href: "/referral-terms",
    badge: "Rewards",
    bg: "bg-teal-50",
    badgeColor: "bg-teal-600 text-white",
    border: "border-teal-100 hover:border-teal-300",
  },
  {
    icon: "💳",
    title: "Card Terms & Conditions",
    description:
      "Terms specific to SmhartPay NGN and USD virtual cards, physical Naira cards, card usage rules, spending limits, liability, and card dispute resolution procedures.",
    updated: "1 January 2026",
    href: "/card-terms",
    badge: "Cards",
    bg: "bg-indigo-50",
    badgeColor: "bg-indigo-600 text-white",
    border: "border-indigo-100 hover:border-indigo-300",
  },
  {
    icon: "💰",
    title: "Savings Terms",
    description:
      "The full terms governing SmhartPay Flex Save, Target Save, and Fixed Save plans — including interest rates, contribution rules, withdrawal conditions, and maturity terms.",
    updated: "1 January 2026",
    href: "/savings-terms",
    badge: "Savings",
    bg: "bg-orange-50",
    badgeColor: "bg-orange-500 text-white",
    border: "border-orange-100 hover:border-orange-300",
  },

  // ── ADD A NEW DOCUMENT BELOW ──────────────────────────────────
  // {
  //   icon: "📋",
  //   title: "Document Title",
  //   description: "Short description of this document.",
  //   updated: "1 January 2026",
  //   href: "/document-slug",
  //   badge: "Category",
  //   bg: "bg-gray-50",
  //   badgeColor: "bg-gray-600 text-white",
  //   border: "border-gray-100 hover:border-gray-300",
  // },
];

// ── Regulatory framework ──────────────────────────────────────────
const regulations = [
  {
    icon: "🏛️",
    regulator: "Central Bank of Nigeria",
    short: "CBN",
    licence: CBN_LICENCE,
    description:
      "SmhartPay operates under a licence issued by the Central Bank of Nigeria. We comply with all CBN guidelines, directives, and circulars governing digital financial services, payment systems, and consumer protection in Nigeria.",
    color: "border-l-[#034EA2]",
  },
  {
    icon: "🛡️",
    regulator: "Nigeria Deposit Insurance Corporation",
    short: "NDIC",
    licence: NDIC_NUMBER,
    description:
      "Customer deposits held within SmhartPay are insured by the NDIC up to the applicable statutory limit per depositor. In the unlikely event of SmhartPay's failure, your deposits are protected under the NDIC Act.",
    color: "border-l-green-500",
  },
  {
    icon: "📊",
    regulator: "Nigeria Data Protection Commission",
    short: "NDPC",
    licence: "NDPC/2026/REG/000000",
    description:
      "SmhartPay processes personal data in accordance with the Nigeria Data Protection Act (NDPA) 2023 and regulations issued by the NDPC. We have a registered Data Protection Officer (DPO) and conduct regular compliance audits.",
    color: "border-l-purple-500",
  },
  {
    icon: "⚖️",
    regulator: "Federal Competition & Consumer Protection Commission",
    short: "FCCPC",
    licence: "FCCPC/REG/000000",
    description:
      "We comply with FCCPC guidelines on fair consumer treatment, transparent pricing, and digital financial services. Customers have the right to lodge complaints with the FCCPC where matters remain unresolved.",
    color: "border-l-amber-500",
  },

  // ── ADD MORE REGULATORY BODIES BELOW ─────────────────────────
  // {
  //   icon: "🏅",
  //   regulator: "Regulator Name",
  //   short: "SHORT",
  //   licence: "Licence number",
  //   description: "Compliance description.",
  //   color: "border-l-gray-500",
  // },
];

// ── Key policy highlights (accordion sections) ───────────────────
const highlights = [
  {
    section: "Account & Identity",
    icon: "👤",
    points: [
      "You must be at least 18 years of age to open a SmhartPay account.",
      "All users must complete KYC identity verification to access full account features.",
      "Providing false, misleading, or fraudulent information during registration is strictly prohibited.",
      "SmhartPay reserves the right to suspend or close accounts that violate our Terms of Use.",
      "You are responsible for maintaining the confidentiality of your login credentials and PIN.",
      "Any unauthorised access to your account must be reported to us immediately.",
    ],
  },
  {
    section: "Transactions & Payments",
    icon: "💸",
    points: [
      "All transactions are subject to daily and monthly limits based on your account verification tier.",
      "Applicable transaction fees are displayed transparently before you confirm any payment.",
      "SmhartPay is not liable for delays caused by third-party banking networks or system downtime.",
      "Fraudulent or disputed transactions must be reported within 24 hours for fastest resolution.",
      "Reversals and chargebacks are subject to SmhartPay's dispute resolution policy and timelines.",
      "Bulk or automated transfers may be subject to additional verification requirements.",
    ],
  },
  {
    section: "Data & Privacy",
    icon: "🔒",
    points: [
      "We collect only the minimum personal data necessary to provide our services to you.",
      "Your personal data is never sold or rented to third parties under any circumstances.",
      "You have the right to access, correct, port, or request deletion of your personal data.",
      "All personal data is encrypted in transit and at rest using industry-standard protocols.",
      "Data retention periods comply with CBN, NDPC, and other applicable regulatory requirements.",
      "You may withdraw consent for marketing communications at any time via the app or email.",
    ],
  },
  {
    section: "Cards (Virtual & Physical)",
    icon: "💳",
    points: [
      "NGN virtual cards are available to all verified SmhartPay users at no creation fee.",
      "USD virtual cards are available to SmhartPay Plus and Business plan holders.",
      "Physical Naira card requests are subject to identity verification and address confirmation.",
      "Lost, stolen, or compromised cards must be frozen immediately via the app.",
      "SmhartPay is not liable for unauthorised card transactions that are not promptly reported.",
      "Card spending limits are set per account plan and can be adjusted within the app.",
    ],
  },
  {
    section: "Savings",
    icon: "🏦",
    points: [
      "Flex Save is available to all verified users with no minimum balance requirement.",
      "Target Save and Fixed Save plans are available to SmhartPay Plus and Business users.",
      "Interest rates are subject to change and will be communicated in advance.",
      "Early withdrawal from Target Save or Fixed Save plans may attract a fee.",
      "All savings balances are covered by NDIC deposit insurance up to the statutory limit.",
      "SmhartPay does not guarantee returns beyond the stated interest rates for each plan.",
    ],
  },
  {
    section: "Prohibited Activities",
    icon: "🚫",
    points: [
      "Using SmhartPay to fund or facilitate illegal activities of any kind is strictly prohibited.",
      "Money laundering, terrorism financing, and fraud are criminal offences and will be reported.",
      "Creating multiple accounts to circumvent limits or policies is not permitted.",
      "Using SmhartPay for gambling, Ponzi schemes, or other prohibited financial activities is banned.",
      "Attempting to reverse-engineer, hack, or exploit the SmhartPay platform is a criminal offence.",
      "Sharing account access or credentials with other individuals is a violation of our Terms.",
    ],
  },

  // ── ADD A NEW HIGHLIGHT SECTION BELOW ─────────────────────────
  // {
  //   section: "Section Title",
  //   icon: "📋",
  //   points: [
  //     "Point one here.",
  //     "Point two here.",
  //   ],
  // },
];

// ── Change log ────────────────────────────────────────────────────
const changeLog = [
  { date: "1 Jan 2026",  document: "Terms of Use",            change: "Revised transfer limits, updated liability clauses, and added bulk transfer terms." },
  { date: "1 Jan 2026",  document: "Privacy Policy",          change: "Updated to reflect NDPA 2023 requirements and NDPC registration obligations." },
  { date: "1 Jan 2026",  document: "Cookie Policy",           change: "Added analytics and marketing cookie disclosures; updated retention periods." },
  { date: "1 Jan 2026",  document: "AML & KYC Policy",        change: "Updated KYC tier document requirements and enhanced due diligence procedures." },
  { date: "1 Jan 2026",  document: "Card Terms",              change: "Added USD virtual card terms and physical card delivery conditions." },
  { date: "1 Jan 2026",  document: "Savings Terms",           change: "Added Fixed Save plan terms and early withdrawal fee schedule." },
  { date: "1 Jan 2026",  document: "Referral Programme Terms", change: "Added referral expiry clause and per-user referral cap." },

  // ── ADD MORE CHANGELOG ENTRIES BELOW ─────────────────────────
  // { date: "DD Mon YYYY", document: "Document Name", change: "Description of what changed." },
];

// ── FAQ ───────────────────────────────────────────────────────────
const faqs = [
  {
    q: "Which law governs SmhartPay's Terms of Use?",
    a: "SmhartPay's Terms of Use are governed by the laws of the Federal Republic of Nigeria. Any disputes arising from the use of our services shall be resolved in accordance with Nigerian law and through competent Nigerian courts or arbitration as specified in the Terms.",
  },
  {
    q: "How do I submit a data subject access request?",
    a: `To exercise your rights under the NDPA — including the right to access, correct, or delete your personal data — please email our Data Protection Officer at ${DPO_EMAIL} with your full name, registered email address, and a description of your request. We will respond within 30 days.`,
  },
  {
    q: "How do I report a legal or compliance concern?",
    a: `Legal and compliance concerns — including suspected fraud, AML issues, or regulatory violations — should be directed to ${LEGAL_EMAIL}. We treat all reports seriously and respond within a reasonable timeframe. Where required, we may escalate reports to the relevant regulatory authorities.`,
  },
  {
    q: "How will I be notified when SmhartPay's policies change?",
    a: "We will notify users of material changes to our policies via in-app notification and email at least 30 days before the changes take effect, where required by law. Minor updates may be made with shorter notice. Continued use of the platform after the effective date constitutes acceptance of the updated terms.",
  },
  {
    q: "How long does SmhartPay retain my personal data?",
    a: "We retain your personal data for as long as your account is active and for a period thereafter as required by applicable regulations — typically 5 to 7 years after account closure, in line with CBN and NDPC requirements. The full details of our retention schedule are set out in our Privacy Policy.",
  },
  {
    q: "Is SmhartPay compliant with anti-money laundering laws?",
    a: "Yes. SmhartPay operates a full AML/CFT compliance programme in accordance with Nigeria's Money Laundering (Prevention and Prohibition) Act and all applicable CBN AML/CFT circulars. We conduct customer due diligence on all users, monitor transactions, and file Suspicious Transaction Reports (STRs) with the NFIU as required by law.",
  },
  {
    q: "How can I make a complaint about SmhartPay?",
    a: `You can submit a complaint through our in-app support centre, by emailing ${SUPPORT_EMAIL}, or via our Contact page. If your complaint is not resolved to your satisfaction, you have the right to escalate to the Central Bank of Nigeria (CBN), the NDPC, or the FCCPC as appropriate.`,
  },
  {
    q: "Does SmhartPay share data with the government?",
    a: "SmhartPay will share customer data with regulatory authorities, law enforcement agencies, and other government bodies where we are required to do so by applicable law, a court order, or a regulatory directive. We will notify affected users where we are legally permitted to do so.",
  },

  // ── ADD MORE FAQ ITEMS BELOW ──────────────────────────────────
  // { q: "Your question?", a: "Your answer." },
];

// ── Contact channels ──────────────────────────────────────────────
const contacts = [
  {
    emoji: "⚖️",
    title: "Legal Team",
    desc: "For legal notices, formal correspondence, IP matters, and dispute escalations.",
    email: LEGAL_EMAIL,
    cta: "Email Legal Team",
  },
  {
    emoji: "🔐",
    title: "Data Protection Officer",
    desc: "For NDPA data subject rights requests, privacy concerns, and DPO correspondence.",
    email: DPO_EMAIL,
    cta: "Contact DPO",
  },
  {
    emoji: "🛡️",
    title: "Privacy Enquiries",
    desc: "For questions about how your personal data is collected, used, and stored.",
    email: PRIVACY_EMAIL,
    cta: "Email Privacy Team",
  },
  {
    emoji: "💬",
    title: "General Support",
    desc: "For account, transaction, product, and general customer service enquiries.",
    email: SUPPORT_EMAIL,
    cta: "Contact Support",
  },

  // ── ADD MORE CONTACT CHANNELS BELOW ──────────────────────────
  // {
  //   emoji: "📋",
  //   title: "Channel Name",
  //   desc: "Channel description.",
  //   email: "email@smhartpay.com",
  //   cta: "Button Label",
  // },
];

// ═════════════════════════════════════════════════════════════════
// SUB-COMPONENTS
// ═════════════════════════════════════════════════════════════════

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round"
      strokeLinejoin="round" viewBox="0 0 24 24"
      className={`flex-shrink-0 transition-transform duration-300
        ${open ? "rotate-180 text-[#034EA2]" : "text-gray-400"}`}>
      <polyline points="6 9 12 15 18 9"/>
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none"
      stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
      strokeLinejoin="round" viewBox="0 0 24 24">
      <line x1="5" y1="12" x2="19" y2="12"/>
      <polyline points="12 5 19 12 12 19"/>
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" fill="none"
      stroke="currentColor" strokeWidth="3" strokeLinecap="round"
      strokeLinejoin="round" viewBox="0 0 24 24">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  );
}

// ── FAQ accordion item ────────────────────────────────────────────
function FAQItem({ q, a, isOpen, onToggle }: {
  q: string; a: string; isOpen: boolean; onToggle: () => void;
}) {
  return (
    <div className="border-b border-gray-200">
      <button onClick={onToggle} aria-expanded={isOpen}
        className="w-full flex items-center justify-between gap-6
          py-5 text-left group cursor-pointer">
        <span className={`text-[14px] sm:text-[15px] font-medium leading-snug
          transition-colors
          ${isOpen ? "text-[#034EA2] font-semibold" : "text-gray-700 group-hover:text-gray-900"}`}>
          {q}
        </span>
        <ChevronIcon open={isOpen} />
      </button>
      <div className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{ maxHeight: isOpen ? "300px" : "0px" }}>
        <div className="pb-6">
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

// ── Highlight accordion item ──────────────────────────────────────
function HighlightItem({ section, icon, points, isOpen, onToggle }: {
  section: string; icon: string; points: string[];
  isOpen: boolean; onToggle: () => void;
}) {
  return (
    <div className={`rounded-2xl border overflow-hidden transition-all duration-200
      ${isOpen ? "border-[#034EA2]/20 shadow-sm" : "border-gray-100 hover:border-gray-200"}`}>
      <button onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left cursor-pointer">
        <div className="flex items-center gap-3">
          <span className="text-xl">{icon}</span>
          <span className={`text-[14px] sm:text-[15px] font-semibold transition-colors
            ${isOpen ? "text-[#034EA2]" : "text-gray-800"}`}>
            {section}
          </span>
        </div>
        <ChevronIcon open={isOpen} />
      </button>
      <div className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{ maxHeight: isOpen ? `${points.length * 56}px` : "0px" }}>
        <ul className="px-5 pb-5 border-t border-gray-50 flex flex-col gap-3">
          {points.map((point, i) => (
            <li key={i} className="flex items-start gap-3 pt-3">
              <span className="flex-shrink-0 mt-0.5 w-5 h-5 rounded-full
                bg-blue-50 text-[#034EA2] flex items-center justify-center">
                <CheckIcon />
              </span>
              <span className="text-[13px] sm:text-[14px] text-gray-600 leading-relaxed">
                {point}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// ── Sticky TOC sidebar ────────────────────────────────────────────
const tocSections = [
  { id: "documents",    label: "Legal Documents" },
  { id: "regulatory",  label: "Regulatory Framework" },
  { id: "highlights",  label: "Key Policy Points" },
  { id: "changelog",   label: "Change Log" },
  { id: "faq",         label: "FAQs" },
  { id: "contact",     label: "Contact Legal Team" },
];

function TableOfContents({ activeId }: { activeId: string }) {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 110;
    window.scrollTo({ top, behavior: "smooth" });
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
      <div className="px-5 py-4 border-b border-gray-100">
        <p className="text-[13px] font-bold text-gray-900">On this page</p>
      </div>
      <div className="px-4 py-3 flex flex-col">
        {tocSections.map((s) => {
          const isActive = activeId === s.id;
          return (
            <button key={s.id} onClick={() => scrollTo(s.id)}
              className={`text-left py-2.5 px-2 rounded-lg text-[13px] font-medium
                transition-colors duration-150 flex items-center gap-2.5
                ${isActive
                  ? "text-[#034EA2] bg-blue-50"
                  : "text-gray-500 hover:text-gray-800 hover:bg-gray-50"}`}>
              <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 transition-all
                ${isActive ? "bg-[#034EA2]" : "bg-transparent"}`}/>
              {s.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════════
// MAIN PAGE
// ═════════════════════════════════════════════════════════════════

export default function LegalPage() {
  const [openFaq, setOpenFaq]         = useState<number | null>(null);
  const [openSection, setOpenSection] = useState<number | null>(0);
  const [activeId, setActiveId]       = useState("documents");
  const sectionRefs                   = useRef<Record<string, HTMLElement | null>>({});

  // Scroll-spy
  useEffect(() => {
    const handler = () => {
      const scrollY = window.scrollY + 140;
      let current = tocSections[0].id;
      tocSections.forEach((s) => {
        const el = sectionRefs.current[s.id];
        if (el && el.offsetTop <= scrollY) current = s.id;
      });
      setActiveId(current);
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const setRef = (id: string) => (el: HTMLElement | null) => {
    sectionRefs.current[id] = el;
  };

  return (
    <div>
      <Navbar/>
    <main className="bg-white">

      {/* ══════════════════════════════════════════
          HERO
      ══════════════════════════════════════════ */}
      <section className="bg-gradient-to-br from-[#034EA2] via-[#0457b5] to-[#0369cc]
        text-white px-5 py-16 sm:px-8 sm:py-20 md:px-10 md:py-24">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row items-start gap-10 lg:gap-16">

            {/* Text */}
            <div className="flex-1 text-center lg:text-left">
              <span className="inline-block text-[12px] font-semibold bg-white/15
                px-4 py-1.5 rounded-full mb-5 tracking-wide uppercase">
                Legal & Compliance
              </span>
              <h1 className="font-bold leading-tight mb-5
                text-[30px] sm:text-[38px] md:text-[46px] lg:text-[50px]">
                Built on transparency.
                <span className="block text-black">Governed by law.</span>
              </h1>
              <p className="text-blue-100 leading-relaxed mb-8
                max-w-xl mx-auto lg:mx-0
                text-[14px] sm:text-[15px] md:text-[16px]">
                SmhartPay operates within a fully regulated framework under
                the oversight of the CBN, NDIC, and NDPC. This page brings
                together every legal document, regulatory disclosure, and
                compliance policy in one clear and accessible place.
              </p>

              {/* Compliance badges */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-3">
                {[
                  "✓ CBN Licensed",
                  "✓ NDIC Insured",
                  "✓ NDPA Compliant",
                  "✓ FCCPC Registered",
                ].map((item) => (
                  <span key={item}
                    className="text-[12px] sm:text-[13px] font-semibold
                      bg-white/10 border border-white/20 text-white
                      px-4 py-2 rounded-full">
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* Company info card */}
            <div className="w-full lg:w-[300px] xl:w-[320px] flex-shrink-0 mx-auto lg:mx-0">
              <div className="bg-white/10 border border-white/20 rounded-2xl
                p-6 backdrop-blur-sm">
                <p className="text-[11px] font-bold text-blue-200 uppercase
                  tracking-widest mb-5">
                  Company Information
                </p>
                <div className="flex flex-col gap-4">
                  {[
                    { label: "Legal Entity",        value: "SmhartPay Financial Services Ltd" },
                    { label: "RC Number",            value: RC_NUMBER },
                    { label: "CBN Licence No.",      value: CBN_LICENCE },
                    { label: "NDIC Number",          value: NDIC_NUMBER },
                    { label: "Registered Address",   value: ADDRESS },
                    { label: "Legal Email",          value: LEGAL_EMAIL },
                    { label: "Data Protection Email",value: DPO_EMAIL },
                  ].map((item) => (
                    <div key={item.label}
                      className="border-b border-white/10 pb-3.5 last:border-0 last:pb-0">
                      <p className="text-[10px] text-blue-300 uppercase tracking-wide mb-1">
                        {item.label}
                      </p>
                      <p className="text-[12px] sm:text-[13px] text-white
                        font-medium leading-snug break-words">
                        {item.value}
                      </p>
                    </div>
                  ))}
                  {/* ── ADD MORE COMPANY INFO FIELDS ABOVE ── */}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          MAIN CONTENT + STICKY TOC
      ══════════════════════════════════════════ */}
      <div className="max-w-6xl mx-auto px-5 sm:px-8 md:px-10 py-16 sm:py-20">
        <div className="flex flex-col lg:flex-row gap-10 xl:gap-14 items-start">

          {/* ── Main content ── */}
          <div className="flex-1 min-w-0 flex flex-col gap-20">

            {/* ── 1. Legal Documents ── */}
            <div id="documents" ref={setRef("documents")} className="scroll-mt-28">
              <div className="mb-8">
                <span className="inline-block text-[12px] font-semibold text-[#034EA2]
                  bg-blue-50 px-4 py-1.5 rounded-full mb-4 tracking-wide uppercase">
                  Legal Documents
                </span>
                <h2 className="font-bold text-gray-900
                  text-[22px] sm:text-[26px] md:text-[30px]">
                  All our policies in one place
                </h2>
                <p className="mt-2 text-[14px] sm:text-[15px] text-gray-500 leading-relaxed">
                  All SmhartPay legal documents are written in plain English.
                  Click any document to read the full version.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {legalDocuments.map((doc) => (
                  <Link key={doc.title} href={doc.href}
                    className={`group bg-white rounded-2xl border p-5
                      transition-all duration-200 hover:shadow-md flex flex-col gap-3
                      ${doc.border}`}>
                    <div className="flex items-start justify-between gap-2">
                      <div className={`w-10 h-10 rounded-xl ${doc.bg}
                        flex items-center justify-center text-xl flex-shrink-0`}>
                        {doc.icon}
                      </div>
                      <span className={`text-[11px] font-bold px-3 py-1
                        rounded-full flex-shrink-0 ${doc.badgeColor}`}>
                        {doc.badge}
                      </span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-[14px] sm:text-[15px] font-bold text-gray-900
                        group-hover:text-[#034EA2] transition-colors mb-1.5">
                        {doc.title}
                      </h3>
                      <p className="text-[12px] sm:text-[13px] text-gray-500 leading-relaxed">
                        {doc.description}
                      </p>
                    </div>
                    <div className="flex items-center justify-between
                      pt-3 border-t border-gray-100">
                      <span className="text-[11px] text-gray-400">
                        Updated {doc.updated}
                      </span>
                      <span className="flex items-center gap-1 text-[13px]
                        font-semibold text-[#034EA2]
                        group-hover:gap-2 transition-all">
                        Read <ArrowIcon />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* ── 2. Regulatory framework ── */}
            <div id="regulatory" ref={setRef("regulatory")} className="scroll-mt-28">
              <div className="mb-8">
                <span className="inline-block text-[12px] font-semibold text-[#034EA2]
                  bg-blue-50 px-4 py-1.5 rounded-full mb-4 tracking-wide uppercase">
                  Regulatory
                </span>
                <h2 className="font-bold text-gray-900
                  text-[22px] sm:text-[26px] md:text-[30px]">
                  Our regulatory framework
                </h2>
                <p className="mt-2 text-[14px] sm:text-[15px] text-gray-500 leading-relaxed">
                  SmhartPay operates within a fully licensed and regulated
                  financial services framework in Nigeria.
                </p>
              </div>
              <div className="flex flex-col gap-4">
                {regulations.map((reg, i) => (
                  <div key={i}
                    className={`bg-white rounded-2xl border border-gray-100
                      border-l-4 ${reg.color} p-5 sm:p-6
                      hover:shadow-sm transition-shadow duration-200`}>
                    <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                      <div className="flex items-center gap-3 sm:flex-shrink-0">
                        <span className="text-2xl">{reg.icon}</span>
                        <div className="sm:hidden">
                          <p className="text-[14px] font-bold text-gray-900">
                            {reg.short}
                          </p>
                          <p className="text-[11px] text-gray-400">{reg.licence}</p>
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="hidden sm:block mb-2">
                          <p className="text-[15px] font-bold text-gray-900">
                            {reg.regulator}
                            <span className="ml-2 text-[12px] font-normal
                              text-gray-400">({reg.short})</span>
                          </p>
                          <p className="text-[12px] text-gray-400 mt-0.5">
                            Licence / Reg: {reg.licence}
                          </p>
                        </div>
                        <p className="text-[13px] sm:text-[14px] text-gray-600 leading-relaxed">
                          {reg.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── 3. Key Policy Highlights ── */}
            <div id="highlights" ref={setRef("highlights")} className="scroll-mt-28">
              <div className="mb-8">
                <span className="inline-block text-[12px] font-semibold text-[#034EA2]
                  bg-blue-50 px-4 py-1.5 rounded-full mb-4 tracking-wide uppercase">
                  Key Points
                </span>
                <h2 className="font-bold text-gray-900
                  text-[22px] sm:text-[26px] md:text-[30px]">
                  What our policies mean for you
                </h2>
                <p className="mt-2 text-[14px] sm:text-[15px] text-gray-500 leading-relaxed">
                  A plain-English summary of the most important points across
                  our legal documents. Always refer to the full documents for
                  the complete and binding version.
                </p>
              </div>
              <div className="flex flex-col gap-3">
                {highlights.map((item, i) => (
                  <HighlightItem key={i}
                    section={item.section}
                    icon={item.icon}
                    points={item.points}
                    isOpen={openSection === i}
                    onToggle={() => setOpenSection(openSection === i ? null : i)}
                  />
                ))}
              </div>
            </div>

            {/* ── 4. Change Log ── */}
            <div id="changelog" ref={setRef("changelog")} className="scroll-mt-28">
              <div className="mb-8">
                <span className="inline-block text-[12px] font-semibold text-[#034EA2]
                  bg-blue-50 px-4 py-1.5 rounded-full mb-4 tracking-wide uppercase">
                  Change Log
                </span>
                <h2 className="font-bold text-gray-900
                  text-[22px] sm:text-[26px] md:text-[30px]">
                  Recent policy updates
                </h2>
                <p className="mt-2 text-[14px] sm:text-[15px] text-gray-500 leading-relaxed">
                  We maintain a transparent record of every update to our legal
                  documents. You can always see what changed and when.
                </p>
              </div>
              <div className="rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
                {/* Header */}
                <div className="hidden sm:grid sm:grid-cols-[130px_180px_1fr]
                  bg-gray-50 border-b border-gray-100 px-5 py-3">
                  {["Date", "Document", "What Changed"].map((h) => (
                    <span key={h}
                      className="text-[11px] font-bold text-gray-500 uppercase tracking-wide">
                      {h}
                    </span>
                  ))}
                </div>
                {changeLog.map((entry, i) => (
                  <div key={i}
                    className={`flex flex-col sm:grid sm:grid-cols-[130px_180px_1fr]
                      px-5 py-4 border-b border-gray-50 last:border-0 gap-1 sm:gap-0
                      sm:items-start
                      ${i % 2 === 0 ? "bg-white" : "bg-gray-50/40"}`}>
                    <span className="text-[12px] sm:text-[13px] text-gray-400">
                      {entry.date}
                    </span>
                    <span className="text-[13px] font-semibold text-[#034EA2]">
                      {entry.document}
                    </span>
                    <span className="text-[13px] text-gray-600 leading-snug">
                      {entry.change}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* ── 5. FAQ ── */}
            <div id="faq" ref={setRef("faq")} className="scroll-mt-28">
              <div className="mb-8">
                <span className="inline-block text-[12px] font-semibold text-[#034EA2]
                  bg-blue-50 px-4 py-1.5 rounded-full mb-4 tracking-wide uppercase">
                  FAQs
                </span>
                <h2 className="font-bold text-gray-900
                  text-[22px] sm:text-[26px] md:text-[30px]">
                  Legal questions answered
                </h2>
                <p className="mt-2 text-[14px] sm:text-[15px] text-gray-500 leading-relaxed">
                  Common questions about SmhartPay's legal obligations,
                  your rights, and our compliance practices.
                </p>
              </div>
              <div className="border-t border-gray-200"/>
              {faqs.map((faq, i) => (
                <FAQItem key={i} q={faq.q} a={faq.a}
                  isOpen={openFaq === i}
                  onToggle={() => setOpenFaq(openFaq === i ? null : i)}/>
              ))}
            </div>

            {/* ── 6. Contact Legal Team ── */}
            <div id="contact" ref={setRef("contact")} className="scroll-mt-28">
              <div className="mb-8">
                <span className="inline-block text-[12px] font-semibold text-[#034EA2]
                  bg-blue-50 px-4 py-1.5 rounded-full mb-4 tracking-wide uppercase">
                  Contact
                </span>
                <h2 className="font-bold text-gray-900
                  text-[22px] sm:text-[26px] md:text-[30px]">
                  Have a legal or compliance enquiry?
                </h2>
                <p className="mt-2 text-[14px] sm:text-[15px] text-gray-500 leading-relaxed">
                  Our legal and compliance team is available for formal
                  enquiries, data subject requests, and regulatory matters.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {contacts.map((c) => (
                  <a key={c.title} href={`mailto:${c.email}`}
                    className="group bg-white rounded-2xl border border-gray-100 p-5
                      hover:shadow-md hover:border-[#034EA2]/20
                      transition-all duration-200 flex flex-col gap-3">
                    <span className="text-3xl">{c.emoji}</span>
                    <div>
                      <h3 className="text-[15px] font-bold text-gray-900
                        group-hover:text-[#034EA2] transition-colors mb-1">
                        {c.title}
                      </h3>
                      <p className="text-[13px] text-gray-500 leading-relaxed mb-2">
                        {c.desc}
                      </p>
                      <p className="text-[12px] text-[#034EA2] font-medium break-all">
                        {c.email}
                      </p>
                    </div>
                    <span className="inline-flex items-center gap-1.5
                      text-[13px] font-semibold text-[#034EA2]
                      group-hover:gap-2.5 transition-all mt-auto">
                      {c.cta} <ArrowIcon />
                    </span>
                  </a>
                ))}
              </div>

              {/* Final commitment banner */}
              <div className="mt-8 bg-gradient-to-br from-[#034EA2] to-[#0369cc]
                rounded-2xl px-6 py-8 sm:px-8 sm:py-10 text-center">
                <p className="text-[12px] font-bold text-blue-200 uppercase
                  tracking-widest mb-3">
                  Our Commitment
                </p>
                <h3 className="text-[18px] sm:text-[22px] font-bold text-white
                  leading-snug mb-3 max-w-lg mx-auto">
                  Trust is earned through transparency, not just promised.
                </h3>
                <p className="text-blue-200 text-[13px] sm:text-[14px]
                  leading-relaxed max-w-md mx-auto mb-6">
                  SmhartPay is committed to full regulatory compliance,
                  honest communication, and respect for every customer's
                  legal rights. If you ever have concerns, we want to hear from you.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Link href="/contact"
                    className="inline-block bg-white text-[#034EA2] font-semibold
                      text-[13px] sm:text-[14px] px-6 py-2.5 rounded-xl
                      hover:bg-blue-50 active:scale-95 transition-all">
                    Contact Us
                  </Link>
                  <Link href="/help-centre"
                    className="inline-block bg-white/10 border border-white/20
                      text-white font-semibold text-[13px] sm:text-[14px]
                      px-6 py-2.5 rounded-xl hover:bg-white/20
                      active:scale-95 transition-all">
                    Help Centre
                  </Link>
                </div>
              </div>
              {/* ── ADD MORE CONTENT BELOW ── */}
            </div>

          </div>

          {/* ── Sticky TOC sidebar (desktop only) ── */}
          <div className="hidden lg:block w-[220px] xl:w-[240px] flex-shrink-0">
            <div className="sticky top-28">
              <TableOfContents activeId={activeId} />
            </div>
          </div>

        </div>
      </div>

    </main>
    <Footer/>
    </div>
  );
}