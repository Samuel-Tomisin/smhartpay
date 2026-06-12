"use client";

import { useState } from "react";
import {
  Shield,
  Lock,
  Eye,
  EyeOff,
  Fingerprint,
  Smartphone,
  AlertTriangle,
  CheckCircle2,
  ChevronDown,
  ArrowRight,
  Bell,
  Key,
  RefreshCw,
  Wifi,
  Globe,
  UserCheck,
  FileText,
  Phone,
  Mail,
  ShieldAlert,
  ShieldCheck,
  Activity,
  Layers,
  Server,
  Cpu,
} from "lucide-react";
import Footer from "@/Components/layout/footer";
import Navbar from "@/Components/layout/Navbar";
import Footer2 from "@/Components/layout/footer2";

// ── Types ──────────────────────────────────────────────────────────────────
interface SecurityFeature {
  icon: React.ReactNode;
  title: string;
  description: string;
  badge?: string;
  badgeColor?: string;
}

interface SecurityPillar {
  icon: React.ReactNode;
  title: string;
  headline: string;
  description: string;
  points: string[];
  accent: string;
  bg: string;
}

interface Tip {
  icon: React.ReactNode;
  title: string;
  description: string;
  priority: "critical" | "high" | "medium";
}

interface FaqItem {
  q: string;
  a: string;
}

// ── Data ──────────────────────────────────────────────────────────────────

const SECURITY_PILLARS: SecurityPillar[] = [
  {
    icon: <Lock size={28} />,
    title: "Encryption",
    headline: "256-bit AES Encryption",
    description:
      "Every byte of data transmitted between your device and SmhartPay's servers is protected with military-grade AES-256 encryption — the same standard used by global banks and government agencies.",
    points: [
      "End-to-end encryption on all data in transit",
      "Encrypted data at rest in our secure data centres",
      "TLS 1.3 protocol enforced on all connections",
      "Zero plaintext storage of sensitive credentials",
    ],
    accent: "#034EA2",
    bg: "#EEF4FF",
  },
  {
    icon: <UserCheck size={28} />,
    title: "Authentication",
    headline: "Multi-Layer Identity Verification",
    description:
      "SmhartPay uses a layered authentication architecture that combines what you know, what you have, and who you are — making unauthorised access practically impossible.",
    points: [
      "Biometric login (fingerprint and face ID)",
      "Time-based OTP (TOTP) two-factor authentication",
      "Device binding and trusted device management",
      "Adaptive risk-based authentication engine",
    ],
    accent: "#065f46",
    bg: "#ecfdf5",
  },
  {
    icon: <Activity size={28} />,
    title: "Fraud Monitoring",
    headline: "Real-Time Fraud Detection",
    description:
      "Our AI-powered fraud detection engine analyses every transaction in milliseconds, scoring risk across hundreds of signals to stop fraudulent activity before it affects your account.",
    points: [
      "AI/ML-based anomaly detection on every transaction",
      "Velocity checks and behavioural pattern analysis",
      "Instant transaction blocking on suspicious activity",
      "24/7 human fraud operations team on standby",
    ],
    accent: "#7c3aed",
    bg: "#f5f3ff",
  },
  {
    icon: <Layers size={28} />,
    title: "Compliance",
    headline: "Regulated & Audited",
    description:
      "SmhartPay operates under the full regulatory oversight of the Central Bank of Nigeria (CBN) and adheres to NDIC deposit insurance requirements, NDPR data privacy law, and global AML/KYC standards.",
    points: [
      "Licensed and regulated by the CBN",
      "Deposits insured by the NDIC",
      "NDPR-compliant data handling practices",
      "Regular third-party security audits and pen testing",
    ],
    accent: "#b45309",
    bg: "#fffbeb",
  },
];

const SECURITY_FEATURES: SecurityFeature[] = [
  {
    icon: <Fingerprint size={20} />,
    title: "Biometric Authentication",
    description: "Log in with your fingerprint or face — your biometric data never leaves your device.",
    badge: "Active",
    badgeColor: "emerald",
  },
  {
    icon: <Key size={20} />,
    title: "Two-Factor Authentication",
    description: "Add a second layer of security with TOTP or SMS verification on every login.",
    badge: "Recommended",
    badgeColor: "blue",
  },
  {
    icon: <Bell size={20} />,
    title: "Instant Transaction Alerts",
    description: "Get real-time push notifications and SMS alerts for every account activity.",
    badge: "Active",
    badgeColor: "emerald",
  },
  {
    icon: <Smartphone size={20} />,
    title: "Device Management",
    description: "View and revoke access to all devices connected to your SmhartPay account.",
  },
  {
    icon: <RefreshCw size={20} />,
    title: "Automatic Session Timeout",
    description: "Sessions expire automatically after inactivity, locking your account without action.",
    badge: "Active",
    badgeColor: "emerald",
  },
  {
    icon: <Globe size={20} />,
    title: "Login Location Detection",
    description: "We flag and block login attempts from unusual or unrecognised locations.",
  },
  {
    icon: <Eye size={20} />,
    title: "Transaction PIN",
    description: "Every transfer requires a separate transaction PIN distinct from your login credentials.",
    badge: "Active",
    badgeColor: "emerald",
  },
  {
    icon: <Server size={20} />,
    title: "Secure Infrastructure",
    description: "Hosted on ISO 27001-certified cloud infrastructure with multi-region redundancy.",
    badge: "Enterprise",
    badgeColor: "purple",
  },
];

const SAFETY_TIPS: Tip[] = [
  {
    icon: <Key size={18} />,
    title: "Never share your PIN or password",
    description:
      "SmhartPay staff will never ask for your PIN, transaction password, or OTP code — by phone, email, SMS, or any other channel. If anyone requests this, it is fraud.",
    priority: "critical",
  },
  {
    icon: <Wifi size={18} />,
    title: "Avoid public Wi-Fi for transactions",
    description:
      "Public networks are vulnerable to interception. Always use mobile data or a trusted private Wi-Fi network when accessing your SmhartPay account.",
    priority: "high",
  },
  {
    icon: <Smartphone size={18} />,
    title: "Keep your app updated",
    description:
      "App updates contain critical security patches. Enable auto-updates in your device settings to always have the latest protections.",
    priority: "high",
  },
  {
    icon: <AlertTriangle size={18} />,
    title: "Watch out for phishing",
    description:
      "Always verify that emails or SMS messages are from @smhartpay.com. Do not click links in unsolicited messages. Type our URL directly into your browser.",
    priority: "critical",
  },
  {
    icon: <Lock size={18} />,
    title: "Enable screen lock on your device",
    description:
      "A PIN, password, or biometric lock on your phone is your first line of defence if your device is lost or stolen.",
    priority: "medium",
  },
  {
    icon: <UserCheck size={18} />,
    title: "Enable 2FA on your account",
    description:
      "Two-factor authentication dramatically reduces the risk of account takeover, even if your password is compromised.",
    priority: "high",
  },
];

const FAQS: FaqItem[] = [
  {
    q: "What should I do if I notice an unauthorised transaction?",
    a: "Immediately freeze your account from the app (Settings → Security → Freeze Account), then contact our support team at security@smhartpay.com or call our 24/7 fraud hotline. We will investigate and, where applicable, initiate a chargeback within 3–5 business days.",
  },
  {
    q: "Is my money protected if SmhartPay is hacked?",
    a: "Yes. Customer deposits are insured by the Nigeria Deposit Insurance Corporation (NDIC) up to the applicable limit. Additionally, SmhartPay maintains cyber insurance and a dedicated security incident reserve fund to cover losses arising from breaches.",
  },
  {
    q: "How does SmhartPay handle my personal data?",
    a: "We comply fully with the Nigeria Data Protection Regulation (NDPR). Your data is encrypted, never sold to third parties, and retained only as long as required for regulatory compliance. You can request a copy or deletion of your data at any time.",
  },
  {
    q: "What is biometric authentication and is it safe?",
    a: "Biometric authentication uses your fingerprint or face to verify your identity. Critically, the biometric data itself is processed and stored exclusively on your device by your operating system — SmhartPay never receives or stores your raw biometric data.",
  },
  {
    q: "Can I use SmhartPay on multiple devices?",
    a: "Yes, but each device must be individually verified. You can view and manage all authorised devices from Settings → Security → Trusted Devices, and remotely revoke access to any device at any time.",
  },
  {
    q: "How do I report a security vulnerability?",
    a: "SmhartPay operates a responsible disclosure programme. If you discover a security vulnerability, please report it to security@smhartpay.com with full details. We acknowledge reports within 24 hours and aim to resolve confirmed vulnerabilities within 30 days.",
  },
];

const PRIORITY_CONFIG = {
  critical: { label: "Critical",  bg: "bg-red-50",    text: "text-red-700",    border: "border-red-200",   dot: "bg-red-500" },
  high:     { label: "High",      bg: "bg-amber-50",  text: "text-amber-700",  border: "border-amber-200", dot: "bg-amber-500" },
  medium:   { label: "Medium",    bg: "bg-blue-50",   text: "text-blue-700",   border: "border-blue-200",  dot: "bg-blue-400" },
};

const BADGE_CONFIG: Record<string, { bg: string; text: string }> = {
  emerald: { bg: "bg-emerald-50", text: "text-emerald-700" },
  blue:    { bg: "bg-blue-50",    text: "text-[#034EA2]" },
  purple:  { bg: "bg-purple-50",  text: "text-purple-700" },
};

// ── Sub-components ─────────────────────────────────────────────────────────

function PillarCard({ pillar, index }: { pillar: SecurityPillar; index: number }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div
      className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-200"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      {/* Coloured top bar */}
      <div className="h-1.5 w-full" style={{ background: pillar.accent }} />

      <div className="p-6 sm:p-7">
        {/* Icon + title */}
        <div className="flex items-start gap-4 mb-4">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: pillar.bg, color: pillar.accent }}
          >
            {pillar.icon}
          </div>
          <div>
            <p className="text-[11px] font-bold uppercase tracking-widest mb-1" style={{ color: pillar.accent }}>
              {pillar.title}
            </p>
            <h3 className="text-[15px] sm:text-[16px] font-bold text-gray-900 leading-snug">
              {pillar.headline}
            </h3>
          </div>
        </div>

        <p className="text-[13px] text-[#64748B] leading-relaxed mb-4">{pillar.description}</p>

        {/* Expandable checklist */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-1.5 text-[12px] font-semibold cursor-pointer transition-colors"
          style={{ color: pillar.accent }}
        >
          {expanded ? "Hide details" : "See how it works"}
          <ChevronDown size={14} className={`transition-transform duration-200 ${expanded ? "rotate-180" : ""}`} />
        </button>

        <div
          className="overflow-hidden transition-all duration-300"
          style={{ maxHeight: expanded ? "300px" : "0px" }}
        >
          <ul className="mt-4 flex flex-col gap-2.5">
            {pillar.points.map((pt, i) => (
              <li key={i} className="flex items-start gap-2.5 text-[13px] text-[#64748B]">
                <CheckCircle2 size={14} className="flex-shrink-0 mt-0.5" style={{ color: pillar.accent }} />
                {pt}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function FeatureCard({ feature }: { feature: SecurityFeature }) {
  const badgeCfg = feature.badge && feature.badgeColor ? BADGE_CONFIG[feature.badgeColor] : null;
  return (
    <div className="flex items-start gap-4 p-5 bg-white rounded-2xl border border-gray-100 hover:shadow-sm hover:border-[#034EA2]/20 transition-all group">
      <div className="w-10 h-10 rounded-xl bg-[#EEF4FF] text-[#034EA2] flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
        {feature.icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap mb-1">
          <h3 className="text-[13px] sm:text-[14px] font-bold text-gray-900">{feature.title}</h3>
          {feature.badge && badgeCfg && (
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${badgeCfg.bg} ${badgeCfg.text}`}>
              {feature.badge}
            </span>
          )}
        </div>
        <p className="text-[12px] text-[#64748B] leading-relaxed">{feature.description}</p>
      </div>
    </div>
  );
}

function TipCard({ tip }: { tip: Tip }) {
  const cfg = PRIORITY_CONFIG[tip.priority];
  return (
    <div className={`flex items-start gap-4 p-5 rounded-2xl border ${cfg.bg} ${cfg.border}`}>
      <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 bg-white ${cfg.text}`}>
        {tip.icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap mb-1">
          <h3 className={`text-[13px] font-bold ${cfg.text}`}>{tip.title}</h3>
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full bg-white ${cfg.text}`}>
            <span className={`inline-block w-1.5 h-1.5 rounded-full mr-1 ${cfg.dot}`} />
            {cfg.label}
          </span>
        </div>
        <p className="text-[12px] text-gray-600 leading-relaxed">{tip.description}</p>
      </div>
    </div>
  );
}

// ── Main Page ──────────────────────────────────────────────────────────────
export default function SecurityPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [showPin, setShowPin] = useState(false);

  return (
    <div>
      <Navbar />
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500;600&display=swap"
        rel="stylesheet"
      />

      <style>{`
        @keyframes pulse-ring {
          0%   { transform: scale(1);   opacity: 0.4; }
          100% { transform: scale(1.6); opacity: 0; }
        }
        .pulse-ring::before,
        .pulse-ring::after {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 50%;
          background: #034EA2;
          animation: pulse-ring 2.2s ease-out infinite;
        }
        .pulse-ring::after { animation-delay: 1.1s; }

        @keyframes fade-up {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .fade-up { animation: fade-up 0.5s ease both; }

        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      <div className="min-h-screen bg-[#F5F7FB]" style={{ fontFamily: "'DM Sans', sans-serif" }}>

        {/* ════════════════════════════════════════
            HERO
        ════════════════════════════════════════ */}
        <section className="relative bg-[#0a1628] overflow-hidden px-4 sm:px-6 md:px-10 lg:px-20 pt-16 pb-20 md:pt-24 md:pb-28">

          {/* Background grid pattern */}
          <div
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{
              backgroundImage: "linear-gradient(#3b82f6 1px, transparent 1px), linear-gradient(90deg, #3b82f6 1px, transparent 1px)",
              backgroundSize: "48px 48px",
            }}
          />
          {/* Radial glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full pointer-events-none"
            style={{ background: "radial-gradient(ellipse, rgba(3,78,162,0.35) 0%, transparent 70%)" }}
          />

          <div className="max-w-6xl mx-auto relative z-10">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-12">

              {/* Left */}
              <div className="fade-up lg:max-w-[55%]">
                <div className="flex items-center gap-2 mb-6">
                  <span className="flex items-center gap-1.5 bg-[#034EA2]/30 border border-[#034EA2]/50 text-blue-300 text-[12px] font-semibold px-3 py-1.5 rounded-full">
                    <ShieldCheck size={13} /> Regulated by CBN · Insured by NDIC
                  </span>
                </div>

                <h1
                  className="text-[34px] sm:text-[46px] md:text-[54px] font-bold text-white leading-tight mb-5"
                  style={{ fontFamily: "'Syne', sans-serif" }}
                >
                  Your Security Is <br />
                  <span className="text-[#60a5fa]">Our Architecture</span>
                </h1>

                <p className="text-[15px] sm:text-[17px] text-slate-400 leading-relaxed max-w-xl mb-8">
                  SmhartPay was built with security at the foundation — not as an afterthought. Every feature, transaction, and byte of data is protected by multiple layers of defence.
                </p>

                <div className="flex flex-wrap gap-3">
                  <a
                    href="#how-we-protect"
                    className="bg-[#034EA2] hover:bg-[#023d82] text-white font-semibold px-6 py-3 rounded-xl text-[14px] flex items-center gap-2 transition-colors"
                  >
                    See Our Protections <ArrowRight size={16} />
                  </a>
                  <a
                    href="#report"
                    className="border border-slate-600 hover:border-slate-400 text-slate-300 hover:text-white font-semibold px-6 py-3 rounded-xl text-[14px] transition-colors"
                  >
                    Report an Issue
                  </a>
                </div>
              </div>

              {/* Right — animated shield */}
              <div className="flex justify-center lg:justify-end fade-up" style={{ animationDelay: "200ms" }}>
                <div className="relative flex items-center justify-center w-56 h-56 sm:w-64 sm:h-64">
                  {/* Pulse rings */}
                  <div className="pulse-ring relative w-24 h-24 rounded-full bg-[#034EA2] flex items-center justify-center">
                    <Shield size={40} className="text-white relative z-10" />
                  </div>

                  {/* Orbiting badges */}
                  {[
                    { icon: <Lock size={14} />,        label: "AES-256",   angle: 0 },
                    { icon: <Cpu size={14} />,          label: "AI Fraud",  angle: 90 },
                    { icon: <Fingerprint size={14} />,  label: "Biometric", angle: 180 },
                    { icon: <FileText size={14} />,     label: "CBN",       angle: 270 },
                  ].map(({ icon, label, angle }) => {
                    const rad = (angle * Math.PI) / 180;
                    const r   = 100;
                    const x   = Math.cos(rad) * r;
                    const y   = Math.sin(rad) * r;
                    return (
                      <div
                        key={label}
                        className="absolute flex flex-col items-center gap-1"
                        style={{ left: `calc(50% + ${x}px - 28px)`, top: `calc(50% + ${y}px - 28px)` }}
                      >
                        <div className="w-14 h-14 rounded-2xl bg-[#0f1f3d] border border-slate-700 flex flex-col items-center justify-center gap-1 text-blue-400">
                          {icon}
                          <span className="text-[9px] font-bold text-slate-400">{label}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Stats bar */}
            <div className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
              {[
                { value: "256-bit",  label: "AES Encryption" },
                { value: "99.99%",   label: "Uptime SLA" },
                { value: "< 50ms",   label: "Fraud Detection" },
                { value: "24/7",     label: "Security Ops" },
              ].map(({ value, label }) => (
                <div key={label} className="bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-center">
                  <p className="text-[22px] sm:text-[26px] font-bold text-white" style={{ fontFamily: "'Syne', sans-serif" }}>
                    {value}
                  </p>
                  <p className="text-[11px] text-slate-400 mt-0.5 font-medium">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════
            FOUR PILLARS
        ════════════════════════════════════════ */}
        <section id="how-we-protect" className="px-4 sm:px-6 md:px-10 lg:px-20 py-14 md:py-20 scroll-mt-8">
          <div className="max-w-6xl mx-auto">
            <div className="mb-10">
              <h2
                className="text-[22px] sm:text-[26px] md:text-[30px] font-bold text-[#1A202E]"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                Our Four Security Pillars
              </h2>
              <p className="text-[14px] sm:text-[15px] text-[#64748B] mt-2 max-w-2xl">
                Security at SmhartPay is not a single feature — it's a multi-layered system designed so that no single failure can compromise your account or your money.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {SECURITY_PILLARS.map((pillar, i) => (
                <PillarCard key={pillar.title} pillar={pillar} index={i} />
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════
            SECURITY FEATURES
        ════════════════════════════════════════ */}
        <section className="bg-white border-y border-gray-100 px-4 sm:px-6 md:px-10 lg:px-20 py-14 md:py-20">
          <div className="max-w-6xl mx-auto">
            <div className="mb-10">
              <h2
                className="text-[22px] sm:text-[26px] md:text-[30px] font-bold text-[#1A202E]"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                Built-In Security Features
              </h2>
              <p className="text-[14px] sm:text-[15px] text-[#64748B] mt-2 max-w-2xl">
                Every SmhartPay account comes equipped with a comprehensive suite of security tools — active by default.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {SECURITY_FEATURES.map((f) => (
                <FeatureCard key={f.title} feature={f} />
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════
            INTERACTIVE — TRANSACTION PIN DEMO
        ════════════════════════════════════════ */}
        <section className="px-4 sm:px-6 md:px-10 lg:px-20 py-14 md:py-20">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-8 items-center">

              {/* Left copy */}
              <div className="lg:w-1/2">
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#034EA2] mb-3 block">
                  Defence In Depth
                </span>
                <h2
                  className="text-[22px] sm:text-[26px] md:text-[30px] font-bold text-[#1A202E] mb-4"
                  style={{ fontFamily: "'Syne', sans-serif" }}
                >
                  Multiple Layers, One Seamless Experience
                </h2>
                <p className="text-[14px] text-[#64748B] leading-relaxed mb-6">
                  SmhartPay enforces separate credentials for login and transactions. Even if someone gains access to your account, they cannot move money without your unique transaction PIN — which is never stored in recoverable form.
                </p>
                <ul className="flex flex-col gap-3">
                  {[
                    { label: "Login password",        note: "Gets you into the app" },
                    { label: "Biometric verification",note: "Confirms your identity" },
                    { label: "Transaction PIN",       note: "Authorises money movement" },
                    { label: "OTP confirmation",      note: "Final real-time check" },
                  ].map(({ label, note }, i) => (
                    <li key={label} className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-full bg-[#034EA2] text-white text-[12px] font-bold flex items-center justify-center flex-shrink-0">
                        {i + 1}
                      </div>
                      <div>
                        <span className="text-[13px] font-semibold text-gray-800">{label}</span>
                        <span className="text-[12px] text-gray-400 ml-2">— {note}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Right — mock PIN card */}
              <div className="lg:w-1/2 flex justify-center">
                <div className="bg-[#0a1628] rounded-2xl p-6 sm:p-8 w-full max-w-sm border border-slate-700 shadow-xl">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-9 h-9 rounded-xl bg-[#034EA2] flex items-center justify-center">
                      <Shield size={18} className="text-white" />
                    </div>
                    <div>
                      <p className="text-white text-[13px] font-semibold">SmhartPay</p>
                      <p className="text-slate-400 text-[11px]">Transaction Security</p>
                    </div>
                  </div>

                  <p className="text-slate-400 text-[12px] mb-2">Send ₦50,000 to Emeka Obi</p>
                  <p className="text-white text-[18px] font-bold mb-6">Enter Transaction PIN</p>

                  {/* PIN dots */}
                  <div className="flex justify-center gap-4 mb-6">
                    {[0, 1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className={`w-4 h-4 rounded-full border-2 transition-all duration-200 ${
                          i < 3
                            ? "bg-[#034EA2] border-[#034EA2]"
                            : "bg-transparent border-slate-600"
                        }`}
                      />
                    ))}
                  </div>

                  {/* Keypad */}
                  <div className="grid grid-cols-3 gap-3">
                    {[1,2,3,4,5,6,7,8,9,"*",0,"⌫"].map((k) => (
                      <button
                        key={k}
                        className="bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl py-3 text-white text-[16px] font-semibold transition-colors cursor-pointer active:scale-95"
                      >
                        {k}
                      </button>
                    ))}
                  </div>

                  <div className="flex items-center gap-2 mt-5 bg-emerald-900/30 border border-emerald-800/50 rounded-xl px-4 py-3">
                    <ShieldCheck size={14} className="text-emerald-400 flex-shrink-0" />
                    <p className="text-[11px] text-emerald-400">Your PIN is encrypted and never stored in plaintext</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════
            SAFETY TIPS
        ════════════════════════════════════════ */}
        <section className="bg-white border-y border-gray-100 px-4 sm:px-6 md:px-10 lg:px-20 py-14 md:py-20">
          <div className="max-w-6xl mx-auto">
            <div className="mb-10">
              <h2
                className="text-[22px] sm:text-[26px] md:text-[30px] font-bold text-[#1A202E]"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                How to Stay Safe
              </h2>
              <p className="text-[14px] sm:text-[15px] text-[#64748B] mt-2 max-w-2xl">
                Technology protects you — but your habits matter too. Follow these practices to keep your account and money safe.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {SAFETY_TIPS.map((tip) => (
                <TipCard key={tip.title} tip={tip} />
              ))}
            </div>

            {/* Scam warning callout */}
            <div className="mt-6 flex items-start gap-4 bg-red-50 border border-red-200 rounded-2xl p-5 sm:p-6">
              <ShieldAlert size={22} className="text-red-500 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-[14px] font-bold text-red-700 mb-1">
                  SmhartPay will NEVER ask for your PIN, password, or OTP
                </h3>
                <p className="text-[13px] text-red-600 leading-relaxed">
                  If you receive a call, email, or message from someone claiming to be from SmhartPay and asking for sensitive credentials, it is a scam. Hang up or delete the message and report it immediately to{" "}
                  <a href="mailto:security@smhartpay.com" className="font-semibold underline">
                    security@smhartpay.com
                  </a>.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════
            COMPLIANCE BADGES
        ════════════════════════════════════════ */}
        <section className="px-4 sm:px-6 md:px-10 lg:px-20 py-14 md:py-20">
          <div className="max-w-6xl mx-auto">
            <div className="mb-8">
              <h2
                className="text-[22px] sm:text-[26px] md:text-[30px] font-bold text-[#1A202E]"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                Regulated, Certified & Audited
              </h2>
              <p className="text-[14px] sm:text-[15px] text-[#64748B] mt-2">
                SmhartPay meets the highest regulatory and security standards in Nigeria and globally.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                {
                  icon: <img src="./images/cbn.svg" alt="CBN" className="h-8 w-auto" />,
                  title: "CBN Licensed",
                  desc: "Fully licensed and regulated by the Central Bank of Nigeria.",
                },
                {
                  icon: <img src="./images/ndic.svg" alt="NDIC" className="h-8 w-auto" />,
                  title: "NDIC Insured",
                  desc: "Customer deposits are insured by the Nigeria Deposit Insurance Corporation.",
                },
                {
                  icon: <Shield size={28} className="text-[#034EA2]" />,
                  title: "ISO 27001",
                  desc: "Our infrastructure meets ISO 27001 information security management standards.",
                },
                {
                  icon: <FileText size={28} className="text-[#034EA2]" />,
                  title: "NDPR Compliant",
                  desc: "Data handled in full compliance with the Nigeria Data Protection Regulation.",
                },
              ].map(({ icon, title, desc }) => (
                <div
                  key={title}
                  className="bg-white rounded-2xl border border-gray-100 p-6 flex flex-col gap-4 hover:shadow-sm hover:border-[#034EA2]/20 transition-all"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#EEF4FF] flex items-center justify-center">
                    {icon}
                  </div>
                  <div>
                    <h3 className="text-[14px] font-bold text-gray-900 mb-1">{title}</h3>
                    <p className="text-[12px] text-[#64748B] leading-relaxed">{desc}</p>
                  </div>
                  <CheckCircle2 size={16} className="text-emerald-500 mt-auto" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════
            FAQ
        ════════════════════════════════════════ */}
        <section className="bg-white border-t border-gray-100 px-4 sm:px-6 md:px-10 lg:px-20 py-14 md:py-20">
          <div className="max-w-6xl mx-auto">
            <div className="mb-8">
              <h2
                className="text-[22px] sm:text-[26px] md:text-[30px] font-bold text-[#1A202E]"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                Security FAQs
              </h2>
              <p className="text-[14px] text-[#64748B] mt-2">
                Answers to the questions we hear most about keeping your account safe.
              </p>
            </div>

            <div className="flex flex-col divide-y divide-gray-100 max-w-3xl">
              {FAQS.map(({ q, a }, i) => (
                <details
                  key={i}
                  className="group py-5"
                  open={openFaq === i}
                  onClick={(e) => { e.preventDefault(); setOpenFaq(openFaq === i ? null : i); }}
                >
                  <summary className="flex items-start justify-between cursor-pointer list-none text-[14px] font-semibold text-gray-700 group-open:text-[#034EA2] gap-4">
                    <span>{q}</span>
                    <ChevronDown
                      size={16}
                      className={`flex-shrink-0 mt-0.5 transition-transform text-gray-400 ${openFaq === i ? "rotate-180 text-[#034EA2]" : ""}`}
                    />
                  </summary>
                  {openFaq === i && (
                    <p className="mt-3 text-[13px] text-[#64748B] leading-relaxed">{a}</p>
                  )}
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════
            REPORT / CONTACT
        ════════════════════════════════════════ */}
        <section id="report" className="px-4 sm:px-6 md:px-10 lg:px-20 py-14 md:py-20 scroll-mt-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

              {/* Report a vulnerability */}
              <div className="bg-[#0a1628] rounded-2xl p-6 sm:p-8 border border-slate-700">
                <div className="w-11 h-11 rounded-xl bg-[#034EA2] flex items-center justify-center mb-5">
                  <ShieldAlert size={20} className="text-white" />
                </div>
                <h3
                  className="text-[18px] font-bold text-white mb-2"
                  style={{ fontFamily: "'Syne', sans-serif" }}
                >
                  Report a Vulnerability
                </h3>
                <p className="text-[13px] text-slate-400 leading-relaxed mb-5">
                  Found a security issue? We operate a responsible disclosure programme. Report it confidentially and we'll acknowledge within 24 hours.
                </p>
                <a
                  href="mailto:security@smhartpay.com"
                  className="flex items-center gap-2 text-[13px] font-semibold text-blue-400 hover:text-blue-300 transition-colors"
                >
                  <Mail size={15} /> security@smhartpay.com
                </a>
              </div>

              {/* Report fraud / get help */}
              <div className="bg-red-50 rounded-2xl p-6 sm:p-8 border border-red-200">
                <div className="w-11 h-11 rounded-xl bg-red-500 flex items-center justify-center mb-5">
                  <AlertTriangle size={20} className="text-white" />
                </div>
                <h3
                  className="text-[18px] font-bold text-red-800 mb-2"
                  style={{ fontFamily: "'Syne', sans-serif" }}
                >
                  Suspect Fraud on Your Account?
                </h3>
                <p className="text-[13px] text-red-600 leading-relaxed mb-5">
                  Act immediately. Freeze your account via the app and contact our 24/7 fraud response team. Every minute matters.
                </p>
                <div className="flex flex-col gap-3">
                  <a
                    href="tel:+2340000000000"
                    className="flex items-center gap-2 text-[13px] font-semibold text-red-700 hover:text-red-900 transition-colors"
                  >
                    <Phone size={15} /> Fraud Hotline: 0800-SMHART (24/7)
                  </a>
                  <a
                    href="mailto:fraud@smhartpay.com"
                    className="flex items-center gap-2 text-[13px] font-semibold text-red-700 hover:text-red-900 transition-colors"
                  >
                    <Mail size={15} /> fraud@smhartpay.com
                  </a>
                </div>
              </div>
            </div>

            {/* Bottom links */}
            <div className="mt-8 flex flex-wrap gap-4 text-[13px] text-[#64748B]">
              <span>Related:</span>
              {[
                { label: "Privacy Policy",  href: "/Privacy-Policy" },
                { label: "Cookie Policy",   href: "/Cookie-Policy" },
                { label: "Terms of Use",    href: "/Terms-of-Use" },
                { label: "Help Centre",     href: "/Help-Centre" },
              ].map(({ label, href }) => (
                <a key={label} href={href} className="text-[#034EA2] hover:underline font-medium">
                  {label}
                </a>
              ))}
            </div>
          </div>
        </section>

      </div>
    </>
    <Footer2 />
    </div>
  );
}