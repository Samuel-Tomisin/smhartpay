"use client";

import { useState } from "react";
import {
  Cookie,
  Shield,
  ToggleLeft,
  ToggleRight,
  ChevronRight,
  Info,
  BarChart2,
  Target,
  Settings,
  CheckCircle2,
  ExternalLink,
  ArrowUp,
} from "lucide-react";
import Navbar from "@/Components/layout/Navbar";
import Footer from "@/Components/layout/footer";

// ── Types ──────────────────────────────────────────────────────────────────
interface CookieCategory {
  id: string;
  icon: React.ReactNode;
  title: string;
  required: boolean;
  description: string;
  purpose: string;
  examples: string[];
  retention: string;
}

interface Section {
  id: string;
  title: string;
}

// ── Data ──────────────────────────────────────────────────────────────────
const LAST_UPDATED  = "June 5, 2026";
const EFFECTIVE_DATE = "June 5, 2026";

const SECTIONS: Section[] = [
  { id: "what-are-cookies",    title: "What Are Cookies?" },
  { id: "how-we-use",          title: "How We Use Cookies" },
  { id: "cookie-types",        title: "Types of Cookies We Use" },
  { id: "third-party",         title: "Third-Party Cookies" },
  { id: "your-choices",        title: "Your Cookie Choices" },
  { id: "manage-preferences",  title: "Manage Your Preferences" },
  { id: "updates",             title: "Updates to This Policy" },
  { id: "contact",             title: "Contact Us" },
];

const COOKIE_CATEGORIES: CookieCategory[] = [
  {
    id: "essential",
    icon: <Shield size={20} />,
    title: "Strictly Necessary Cookies",
    required: true,
    description:
      "These cookies are essential for the SmhartPay platform to function correctly. They enable core features such as secure login, session management, fraud prevention, and account authentication. Without these cookies, the services you have requested cannot be provided.",
    purpose: "Security, authentication, session management, and fraud detection.",
    examples: [
      "Session token cookies that keep you logged in during a visit",
      "CSRF protection tokens that guard against cross-site request forgery",
      "Load-balancing cookies that ensure consistent performance",
      "Cookie-consent cookies that remember your preferences",
    ],
    retention: "Session or up to 30 days",
  },
  {
    id: "functional",
    icon: <Settings size={20} />,
    title: "Functional Cookies",
    required: false,
    description:
      "Functional cookies allow SmhartPay to remember choices you make and provide enhanced, personalised features. They may be set by us or by third-party providers whose services we have added to our pages. If you disable these cookies, some features may not work as intended.",
    purpose: "Personalisation, language preferences, and UI customisation.",
    examples: [
      "Remembering your preferred language or currency display",
      "Storing your dashboard layout or widget arrangement",
      "Remembering if you have dismissed a notification or banner",
      "Keeping you logged in across sessions (if you choose 'Remember me')",
    ],
    retention: "Up to 12 months",
  },
  {
    id: "analytics",
    icon: <BarChart2 size={20} />,
    title: "Analytics & Performance Cookies",
    required: false,
    description:
      "These cookies collect information about how visitors interact with SmhartPay — which pages are visited most, where users drop off, and how features are used. All data is aggregated and anonymised. This helps us improve the quality and performance of our services.",
    purpose: "Understanding usage patterns, measuring feature effectiveness, and improving performance.",
    examples: [
      "Google Analytics cookies tracking page views and sessions",
      "Hotjar cookies recording anonymised heatmaps and scrollmaps",
      "A/B testing cookies that assign you to experiment variants",
      "Error-tracking cookies that help us identify and fix bugs",
    ],
    retention: "Up to 24 months",
  },
  {
    id: "marketing",
    icon: <Target size={20} />,
    title: "Marketing & Targeting Cookies",
    required: false,
    description:
      "Marketing cookies are used to deliver advertisements more relevant to you and your interests. They may also be used to limit the number of times you see an advertisement and to measure the effectiveness of advertising campaigns. They are usually placed by advertising networks with our permission.",
    purpose: "Delivering relevant ads, measuring campaign effectiveness, and retargeting.",
    examples: [
      "Meta Pixel cookies for Facebook and Instagram ad attribution",
      "Google Ads conversion tracking cookies",
      "LinkedIn Insight Tag for B2B campaign measurement",
      "Retargeting cookies that show relevant SmhartPay ads across the web",
    ],
    retention: "Up to 24 months",
  },
];

const THIRD_PARTY_PROVIDERS = [
  { name: "Google Analytics",  purpose: "Usage analytics and performance measurement", link: "https://policies.google.com/privacy" },
  { name: "Google Ads",        purpose: "Advertising and conversion tracking",          link: "https://policies.google.com/privacy" },
  { name: "Meta (Facebook)",   purpose: "Social advertising and audience targeting",    link: "https://www.facebook.com/privacy/policy" },
  { name: "Hotjar",            purpose: "Heatmaps, session recordings, and UX research",link: "https://www.hotjar.com/legal/policies/privacy" },
  { name: "LinkedIn",          purpose: "Professional network advertising",             link: "https://www.linkedin.com/legal/privacy-policy" },
  { name: "Sentry",            purpose: "Application error tracking and monitoring",    link: "https://sentry.io/privacy" },
];

// ── Preference state type ──────────────────────────────────────────────────
type Preferences = {
  functional: boolean;
  analytics:  boolean;
  marketing:  boolean;
};

// ── Toggle Switch ──────────────────────────────────────────────────────────
function Toggle({
  enabled,
  disabled,
  onToggle,
}: {
  enabled: boolean;
  disabled?: boolean;
  onToggle?: () => void;
}) {
  return (
    <button
      onClick={!disabled ? onToggle : undefined}
      aria-pressed={enabled}
      disabled={disabled}
      className={`relative w-11 h-6 rounded-full transition-colors duration-200 flex-shrink-0 ${
        disabled
          ? "bg-[#034EA2] cursor-not-allowed opacity-80"
          : enabled
          ? "bg-[#034EA2] cursor-pointer"
          : "bg-gray-200 cursor-pointer hover:bg-gray-300"
      }`}
    >
      <span
        className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 ${
          enabled ? "translate-x-5" : "translate-x-0"
        }`}
      />
    </button>
  );
}

// ── Cookie Category Card ───────────────────────────────────────────────────
function CategoryCard({
  category,
  enabled,
  onToggle,
}: {
  category: CookieCategory;
  enabled: boolean;
  onToggle: () => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className={`bg-white rounded-2xl border transition-all duration-200 overflow-hidden ${
      enabled ? "border-[#034EA2]/20 shadow-sm" : "border-gray-100"
    }`}>
      {/* Header row */}
      <div className="flex items-start gap-4 p-5 sm:p-6">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
          enabled ? "bg-[#EEF4FF] text-[#034EA2]" : "bg-gray-100 text-gray-400"
        }`}>
          {category.icon}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-[14px] sm:text-[15px] font-bold text-gray-900">{category.title}</h3>
              {category.required && (
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#034EA2] text-white">
                  REQUIRED
                </span>
              )}
            </div>
            <Toggle
              enabled={enabled}
              disabled={category.required}
              onToggle={onToggle}
            />
          </div>
          <p className="text-[13px] text-[#64748B] mt-2 leading-relaxed line-clamp-2">
            {category.description}
          </p>

          <button
            onClick={() => setOpen(!open)}
            className="flex items-center gap-1 mt-3 text-[12px] text-[#034EA2] font-medium hover:underline cursor-pointer"
          >
            {open ? "Show less" : "Learn more"}
            <ChevronRight size={13} className={`transition-transform ${open ? "rotate-90" : ""}`} />
          </button>
        </div>
      </div>

      {/* Expanded details */}
      <div
        className="overflow-hidden transition-all duration-300"
        style={{ maxHeight: open ? "600px" : "0px" }}
      >
        <div className="px-5 sm:px-6 pb-6 flex flex-col gap-4 border-t border-gray-50 pt-4">
          <div>
            <p className="text-[12px] font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Purpose</p>
            <p className="text-[13px] text-[#64748B]">{category.purpose}</p>
          </div>
          <div>
            <p className="text-[12px] font-semibold text-gray-500 uppercase tracking-wider mb-2">Examples</p>
            <ul className="flex flex-col gap-1.5">
              {category.examples.map((ex, i) => (
                <li key={i} className="flex items-start gap-2 text-[13px] text-[#64748B]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#034EA2] mt-1.5 flex-shrink-0" />
                  {ex}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-[12px] font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Retention Period</p>
            <p className="text-[13px] text-[#64748B]">{category.retention}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Scroll to top ──────────────────────────────────────────────────────────
function ScrollToTop() {
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-6 right-6 w-10 h-10 bg-[#034EA2] hover:bg-[#023d82] text-white rounded-full flex items-center justify-center shadow-lg transition-colors cursor-pointer z-40"
      aria-label="Scroll to top"
    >
      <ArrowUp size={16} />
    </button>
  );
}

// ── Main Page ──────────────────────────────────────────────────────────────
export default function CookiePolicyPage() {
  const [preferences, setPreferences] = useState<Preferences>({
    functional: true,
    analytics:  true,
    marketing:  false,
  });
  const [saved, setSaved] = useState(false);

  const toggle = (key: keyof Preferences) => {
    setPreferences((p) => ({ ...p, [key]: !p[key] }));
    setSaved(false);
  };

  const savePreferences = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const acceptAll = () => {
    setPreferences({ functional: true, analytics: true, marketing: true });
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const rejectAll = () => {
    setPreferences({ functional: false, analytics: false, marketing: false });
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const getEnabled = (id: string) => {
    if (id === "essential") return true;
    return preferences[id as keyof Preferences] ?? false;
  };

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div>
      <Navbar />
      <>
        <link
          href="https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />

        <div className="min-h-screen bg-[#F5F7FB]" style={{ fontFamily: "'DM Sans', sans-serif" }}>

          {/* ── Hero Banner ── */}
          <section className="bg-[#034EA2] px-4 sm:px-6 md:px-10 lg:px-20 pt-14 pb-16 md:pt-20 md:pb-20">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center text-white">
                <Cookie size={20} />
              </div>
              <span className="text-blue-200 text-[13px] font-medium">Legal</span>
            </div>
            <h1
              className="text-[32px] sm:text-[42px] md:text-[50px] font-bold text-white leading-tight mb-4"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              Cookie Policy
            </h1>
            <p className="text-blue-100 text-[14px] sm:text-[16px] max-w-2xl leading-relaxed">
              This policy explains what cookies are, how SmhartPay uses them, and the choices you have.
              We are committed to being transparent about the data we collect and how it is used.
            </p>
            <div className="flex flex-wrap gap-4 mt-6 text-[13px] text-blue-200">
              <span className="flex items-center gap-1.5"><Info size={13} /> Last updated: {LAST_UPDATED}</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 size={13} /> Effective: {EFFECTIVE_DATE}</span>
            </div>
          </div>
        </section>

        {/* ── Main Layout: Sidebar + Content ── */}
        <div className="px-4 sm:px-6 md:px-10 lg:px-20 py-12 md:py-16">
          <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-8 items-start">

            {/* ── Sidebar TOC ── */}
            <aside className="hidden lg:block w-56 flex-shrink-0 sticky top-8">
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-4">Contents</p>
              <nav className="flex flex-col gap-1">
                {SECTIONS.map(({ id, title }) => (
                  <button
                    key={id}
                    onClick={() => scrollTo(id)}
                    className="text-left text-[13px] text-[#64748B] hover:text-[#034EA2] py-1.5 px-3 rounded-lg hover:bg-[#EEF4FF] transition-colors cursor-pointer"
                  >
                    {title}
                  </button>
                ))}
              </nav>

              {/* Quick links */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-3">Related</p>
                {[
                  { label: "Privacy Policy",  href: "/privacy-policy" },
                  { label: "Terms of Use",    href: "/terms-of-use" },
                  { label: "Help Centre",     href: "/help-centre" },
                ].map(({ label, href }) => (
                  <a
                    key={label}
                    href={href}
                    className="flex items-center gap-1.5 text-[13px] text-[#7C8FB7] hover:text-[#034EA2] py-1.5 transition-colors"
                  >
                    {label} <ExternalLink size={11} />
                  </a>
                ))}
              </div>
            </aside>

            {/* ── Content ── */}
            <div className="flex-1 min-w-0 flex flex-col gap-10">

              {/* ── 1. What Are Cookies ── */}
              <section id="what-are-cookies" className="scroll-mt-8">
                <div className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8">
                  <h2 className="text-[18px] sm:text-[20px] font-bold text-[#1A202E] mb-4" style={{ fontFamily: "'Syne', sans-serif" }}>
                    1. What Are Cookies?
                  </h2>
                  <div className="flex flex-col gap-4 text-[14px] text-[#64748B] leading-relaxed">
                    <p>
                      Cookies are small text files that are placed on your device (computer, smartphone, or tablet) when you visit a website or use an application. They are widely used to make websites work, or work more efficiently, as well as to provide information to the owners of the site.
                    </p>
                    <p>
                      Cookies can be <strong className="text-gray-700">session cookies</strong> — which are temporary and are deleted when you close your browser — or <strong className="text-gray-700">persistent cookies</strong>, which remain on your device for a set period or until you delete them.
                    </p>
                    <p>
                      Cookies can also be <strong className="text-gray-700">first-party cookies</strong> (set by SmhartPay directly) or <strong className="text-gray-700">third-party cookies</strong> (set by a third-party service we use, such as an analytics provider). Similar technologies, such as web beacons, pixel tags, and local storage, may also be used for comparable purposes and are covered by this policy.
                    </p>

                    {/* Info callout */}
                    <div className="flex items-start gap-3 bg-[#EEF4FF] rounded-xl p-4 mt-2">
                      <Info size={16} className="text-[#034EA2] flex-shrink-0 mt-0.5" />
                      <p className="text-[13px] text-[#034EA2]">
                        Cookies do not contain executable code and cannot carry viruses or malware. They cannot access other information on your device beyond what is stored within the cookie itself.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* ── 2. How We Use Cookies ── */}
              <section id="how-we-use" className="scroll-mt-8">
                <div className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8">
                  <h2 className="text-[18px] sm:text-[20px] font-bold text-[#1A202E] mb-4" style={{ fontFamily: "'Syne', sans-serif" }}>
                    2. How We Use Cookies
                  </h2>
                  <p className="text-[14px] text-[#64748B] leading-relaxed mb-5">
                    SmhartPay uses cookies and similar tracking technologies for the following purposes:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { icon: <Shield size={16} />,    title: "Security & Fraud Prevention", desc: "Detecting and preventing fraudulent activity, protecting your account from unauthorised access." },
                      { icon: <Settings size={16} />,  title: "Service Delivery",            desc: "Enabling core features such as login, wallet access, and transaction processing." },
                      { icon: <BarChart2 size={16} />, title: "Analytics & Improvement",     desc: "Understanding how users interact with our platform so we can fix issues and improve the experience." },
                      { icon: <Target size={16} />,    title: "Marketing & Advertising",     desc: "Delivering relevant promotions and measuring the performance of our advertising campaigns." },
                    ].map(({ icon, title, desc }) => (
                      <div key={title} className="flex items-start gap-3 p-4 bg-[#F5F7FB] rounded-xl">
                        <div className="w-8 h-8 rounded-lg bg-[#EEF4FF] flex items-center justify-center text-[#034EA2] flex-shrink-0">
                          {icon}
                        </div>
                        <div>
                          <p className="text-[13px] font-semibold text-gray-800 mb-1">{title}</p>
                          <p className="text-[12px] text-[#64748B] leading-relaxed">{desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* ── 3. Types of Cookies ── */}
              <section id="cookie-types" className="scroll-mt-8">
                <h2 className="text-[18px] sm:text-[20px] font-bold text-[#1A202E] mb-4" style={{ fontFamily: "'Syne', sans-serif" }}>
                  3. Types of Cookies We Use
                </h2>
                <div className="flex flex-col gap-4">
                  {COOKIE_CATEGORIES.map((cat) => (
                    <CategoryCard
                      key={cat.id}
                      category={cat}
                      enabled={getEnabled(cat.id)}
                      onToggle={() => !cat.required && toggle(cat.id as keyof Preferences)}
                    />
                  ))}
                </div>
              </section>

              {/* ── 4. Third-Party Cookies ── */}
              <section id="third-party" className="scroll-mt-8">
                <div className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8">
                  <h2 className="text-[18px] sm:text-[20px] font-bold text-[#1A202E] mb-2" style={{ fontFamily: "'Syne', sans-serif" }}>
                    4. Third-Party Cookies
                  </h2>
                  <p className="text-[14px] text-[#64748B] leading-relaxed mb-6">
                    Some cookies on SmhartPay are placed by third-party services that appear on our pages. We do not control these cookies — please refer to each provider's privacy policy for more information on how they use your data.
                  </p>
                  <div className="overflow-x-auto -mx-6 sm:mx-0">
                    <table className="w-full min-w-[520px] sm:min-w-0 border-collapse text-[13px] mx-6 sm:mx-0" style={{ width: "calc(100% - 3rem)" }}>
                      <thead>
                        <tr className="bg-[#F5F7FB]">
                          <th className="text-left text-[11px] font-bold text-gray-500 uppercase tracking-wider px-4 py-3 rounded-l-xl">Provider</th>
                          <th className="text-left text-[11px] font-bold text-gray-500 uppercase tracking-wider px-4 py-3">Purpose</th>
                          <th className="text-left text-[11px] font-bold text-gray-500 uppercase tracking-wider px-4 py-3 rounded-r-xl">Privacy Policy</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {THIRD_PARTY_PROVIDERS.map(({ name, purpose, link }) => (
                          <tr key={name} className="hover:bg-[#F5F7FB]/60 transition-colors">
                            <td className="px-4 py-3.5 font-semibold text-gray-800 whitespace-nowrap">{name}</td>
                            <td className="px-4 py-3.5 text-[#64748B]">{purpose}</td>
                            <td className="px-4 py-3.5">
                              <a
                                href={link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1 text-[#034EA2] hover:underline font-medium whitespace-nowrap"
                              >
                                View <ExternalLink size={11} />
                              </a>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </section>

              {/* ── 5. Your Choices ── */}
              <section id="your-choices" className="scroll-mt-8">
                <div className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8">
                  <h2 className="text-[18px] sm:text-[20px] font-bold text-[#1A202E] mb-4" style={{ fontFamily: "'Syne', sans-serif" }}>
                    5. Your Cookie Choices
                  </h2>
                  <div className="flex flex-col gap-4 text-[14px] text-[#64748B] leading-relaxed">
                    <p>
                      You have the right to decide whether to accept or reject non-essential cookies. You can exercise your cookie preferences using the preference panel below, or by using the controls built into your browser.
                    </p>
                    <p>
                      Please note that if you choose to block or delete cookies, some parts of SmhartPay may not function correctly. Strictly necessary cookies cannot be disabled as they are essential for the platform to operate securely.
                    </p>

                    {/* Browser instructions */}
                    <div className="mt-2">
                      <p className="text-[13px] font-semibold text-gray-700 mb-3">How to manage cookies in your browser:</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {[
                          { browser: "Google Chrome",   url: "https://support.google.com/chrome/answer/95647" },
                          { browser: "Mozilla Firefox", url: "https://support.mozilla.org/en-US/kb/cookies-information-websites-store-on-your-computer" },
                          { browser: "Apple Safari",    url: "https://support.apple.com/en-gb/guide/safari/sfri11471/mac" },
                          { browser: "Microsoft Edge",  url: "https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge" },
                        ].map(({ browser, url }) => (
                          <a
                            key={browser}
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-between gap-2 px-4 py-3 bg-[#F5F7FB] rounded-xl hover:bg-[#EEF4FF] transition-colors text-[13px] text-gray-700 font-medium group"
                          >
                            {browser}
                            <ExternalLink size={13} className="text-gray-400 group-hover:text-[#034EA2] transition-colors" />
                          </a>
                        ))}
                      </div>
                    </div>

                    <p className="text-[13px]">
                      You may also opt out of interest-based advertising through the{" "}
                      <a href="http://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer" className="text-[#034EA2] hover:underline font-medium">
                        Digital Advertising Alliance
                      </a>{" "}
                      or the{" "}
                      <a href="https://www.youronlinechoices.eu/" target="_blank" rel="noopener noreferrer" className="text-[#034EA2] hover:underline font-medium">
                        European Interactive Digital Advertising Alliance
                      </a>.
                    </p>
                  </div>
                </div>
              </section>

              {/* ── 6. Manage Preferences ── */}
              <section id="manage-preferences" className="scroll-mt-8">
                <div className="bg-white rounded-2xl border border-[#034EA2]/20 shadow-sm p-6 sm:p-8">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-9 h-9 rounded-xl bg-[#EEF4FF] flex items-center justify-center text-[#034EA2]">
                      <ToggleRight size={18} />
                    </div>
                    <h2 className="text-[18px] sm:text-[20px] font-bold text-[#1A202E]" style={{ fontFamily: "'Syne', sans-serif" }}>
                      6. Manage Your Preferences
                    </h2>
                  </div>
                  <p className="text-[14px] text-[#64748B] leading-relaxed mb-6">
                    Use the toggles below to customise which categories of cookies SmhartPay may use. Strictly necessary cookies are always active and cannot be disabled.
                  </p>

                  {/* Summary toggles */}
                  <div className="flex flex-col divide-y divide-gray-100 mb-6">
                    {[
                      { id: "essential",  label: "Strictly Necessary", required: true  },
                      { id: "functional", label: "Functional",          required: false },
                      { id: "analytics",  label: "Analytics & Performance", required: false },
                      { id: "marketing",  label: "Marketing & Targeting",   required: false },
                    ].map(({ id, label, required }) => (
                      <div key={id} className="flex items-center justify-between gap-4 py-4">
                        <div>
                          <p className="text-[14px] font-semibold text-gray-800">{label}</p>
                          {required && <p className="text-[12px] text-[#034EA2] mt-0.5">Always active</p>}
                        </div>
                        <Toggle
                          enabled={getEnabled(id)}
                          disabled={required}
                          onToggle={() => !required && toggle(id as keyof Preferences)}
                        />
                      </div>
                    ))}
                  </div>

                  {/* Action buttons */}
                  <div className="flex flex-wrap gap-3">
                    <button
                      onClick={savePreferences}
                      className="flex items-center gap-2 bg-[#034EA2] hover:bg-[#023d82] text-white font-semibold px-5 py-2.5 rounded-xl text-[13px] transition-colors cursor-pointer"
                    >
                      {saved ? <><CheckCircle2 size={15} /> Saved!</> : <><ToggleRight size={15} /> Save Preferences</>}
                    </button>
                    <button
                      onClick={acceptAll}
                      className="border border-gray-200 hover:bg-gray-50 text-gray-700 font-semibold px-5 py-2.5 rounded-xl text-[13px] transition-colors cursor-pointer"
                    >
                      Accept All
                    </button>
                    <button
                      onClick={rejectAll}
                      className="border border-gray-200 hover:bg-gray-50 text-gray-500 font-medium px-5 py-2.5 rounded-xl text-[13px] transition-colors cursor-pointer"
                    >
                      Reject Non-Essential
                    </button>
                  </div>
                </div>
              </section>

              {/* ── 7. Updates ── */}
              <section id="updates" className="scroll-mt-8">
                <div className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8">
                  <h2 className="text-[18px] sm:text-[20px] font-bold text-[#1A202E] mb-4" style={{ fontFamily: "'Syne', sans-serif" }}>
                    7. Updates to This Policy
                  </h2>
                  <div className="flex flex-col gap-4 text-[14px] text-[#64748B] leading-relaxed">
                    <p>
                      We may update this Cookie Policy from time to time to reflect changes in the cookies we use, changes in applicable law, or for other operational, legal, or regulatory reasons. Any changes will be posted on this page with an updated "Last Updated" date at the top.
                    </p>
                    <p>
                      We encourage you to review this policy periodically to stay informed about how we use cookies. Where changes are material, we may also notify you directly through the SmhartPay app or via email.
                    </p>
                    <p>
                      Your continued use of SmhartPay after any changes to this Cookie Policy constitutes your acceptance of the updated terms.
                    </p>
                  </div>
                </div>
              </section>

              {/* ── 8. Contact ── */}
              <section id="contact" className="scroll-mt-8">
                <div className="bg-[#1A202E] rounded-2xl p-6 sm:p-8">
                  <h2 className="text-[18px] sm:text-[20px] font-bold text-white mb-2" style={{ fontFamily: "'Syne', sans-serif" }}>
                    8. Contact Us
                  </h2>
                  <p className="text-[14px] text-gray-400 leading-relaxed mb-6">
                    If you have any questions, concerns, or requests regarding this Cookie Policy or the way SmhartPay uses cookies, please get in touch with our Data Privacy team.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {[
                      { label: "Email",    value: "privacy@smhartpay.com",   href: "mailto:privacy@smhartpay.com" },
                      { label: "Website",  value: "smhartpay.com/contact",    href: "/contact" },
                      { label: "Address",  value: "Lagos, Nigeria",           href: undefined },
                    ].map(({ label, value, href }) => (
                      <div key={label} className="bg-white/10 rounded-xl p-4">
                        <p className="text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-1">{label}</p>
                        {href ? (
                          <a href={href} className="text-[13px] text-white hover:text-blue-300 transition-colors font-medium">
                            {value}
                          </a>
                        ) : (
                          <p className="text-[13px] text-white font-medium">{value}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </section>

            </div>
          </div>
        </div>

        <ScrollToTop />
      </div>
    </>
    <Footer />
    </div>
  );
}