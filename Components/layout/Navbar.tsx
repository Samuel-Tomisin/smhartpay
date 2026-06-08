"use client"

import Link from 'next/link';
import { useState } from "react";
import Button from "../ui/button";

const featuresItems = [
  { label: "Cards",         href: "/features/cards" },
  { label: "Gift Cards",    href: "/features/gift-cards" },
  { label: "Receive Funds", href: "/features/receive-funds" },
  { label: "Rewards",       href: "/features/rewards" },
  { label: "Savings",       href: "/features/savings" },
  { label: "Transfers",     href: "/features/transfers" },
  { label: "VTU",           href: "/features/vtu" },
  { label: "Wallet",        href: "/features/wallet" },
];

const companyItems = [
  { label: "About",    href: "/company/about" },
  { label: "Careers",  href: "/company/careers" },
  { label: "Contact",  href: "/company/contact" },
];

// ── Mobile icon map ──────────────────────────────────────────────────────────
// Each icon is a small inline SVG wrapped in a colored rounded square,
// matching the style shown in the DuraPayment screenshot.

function MobileIcon({ children, bg }: { children: React.ReactNode; bg: string }) {
  return (
    <span
      className="flex items-center justify-center w-7 h-7 rounded-lg flex-shrink-0"
      style={{ background: bg }}
    >
      {children}
    </span>
  );
}

const mobileNavIcons: Record<string, React.ReactNode> = {
  // Top-level links
  Home: (
    <MobileIcon bg="#EEF2FF">
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#4F46E5" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z"/><polyline points="9 21 9 12 15 12 15 21"/>
      </svg>
    </MobileIcon>
  ),
  Pricing: (
    <MobileIcon bg="#F0FDF4">
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/>
      </svg>
    </MobileIcon>
  ),
  Blog: (
    <MobileIcon bg="#FFF7ED">
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#EA580C" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/>
      </svg>
    </MobileIcon>
  ),
  "Help Centre": (
    <MobileIcon bg="#F0F9FF">
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#0284C7" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/>
      </svg>
    </MobileIcon>
  ),
  "Sign In": (
    <MobileIcon bg="#FDF4FF">
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#9333EA" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M15 3h4a2 2 0 012 2v14a2 2 0 01-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" y1="12" x2="3" y2="12"/>
      </svg>
    </MobileIcon>
  ),

  // Features sub-items
  Cards: (
    <MobileIcon bg="#EFF6FF">
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/>
      </svg>
    </MobileIcon>
  ),
  "Gift Cards": (
    <MobileIcon bg="#FFF1F2">
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#E11D48" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 12 20 22 4 22 4 12"/><rect x="2" y="7" width="20" height="5"/><line x1="12" y1="22" x2="12" y2="7"/><path d="M12 7H7.5a2.5 2.5 0 010-5C11 2 12 7 12 7z"/><path d="M12 7h4.5a2.5 2.5 0 000-5C13 2 12 7 12 7z"/>
      </svg>
    </MobileIcon>
  ),
  "Receive Funds": (
    <MobileIcon bg="#F0FDF4">
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 19 19 12"/>
      </svg>
    </MobileIcon>
  ),
  Rewards: (
    <MobileIcon bg="#FFFBEB">
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#D97706" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
      </svg>
    </MobileIcon>
  ),
  Savings: (
    <MobileIcon bg="#F0FDF4">
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#15803D" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16"/><line x1="3" y1="21" x2="21" y2="21"/><line x1="9" y1="10" x2="15" y2="10"/>
      </svg>
    </MobileIcon>
  ),
  Transfers: (
    <MobileIcon bg="#F5F3FF">
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#7C3AED" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 014-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 01-4 4H3"/>
      </svg>
    </MobileIcon>
  ),
  VTU: (
    <MobileIcon bg="#FFF7ED">
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#C2410C" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/>
      </svg>
    </MobileIcon>
  ),
  Wallet: (
    <MobileIcon bg="#EFF6FF">
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#1D4ED8" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 12V7H5a2 2 0 010-4h14v4"/><path d="M3 5v14a2 2 0 002 2h16v-5"/><path d="M18 12a2 2 0 000 4h4v-4z"/>
      </svg>
    </MobileIcon>
  ),

  // Company sub-items
  About: (
    <MobileIcon bg="#F0F9FF">
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#0369A1" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.58-7 8-7s8 3 8 7"/>
      </svg>
    </MobileIcon>
  ),
  Careers: (
    <MobileIcon bg="#FFF7ED">
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#EA580C" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/><line x1="12" y1="12" x2="12" y2="16"/><line x1="10" y1="14" x2="14" y2="14"/>
      </svg>
    </MobileIcon>
  ),
  Contact: (
    <MobileIcon bg="#F0FDF4">
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.67A2 2 0 012.18 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 8.15a16 16 0 006.94 6.94l1.51-1.51a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
      </svg>
    </MobileIcon>
  ),
};

interface DropdownProps {
  label: string;
  items: { label: string; href: string }[];
  isMobile?: boolean;
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`transition-transform duration-200 flex-shrink-0 ${open ? "rotate-180" : "rotate-0"}`}
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

function Dropdown({ label, items, isMobile = false }: DropdownProps) {
  const [open, setOpen] = useState(false);

  /* ── Mobile accordion ── */
  if (isMobile) {
    return (
      <div className="border-b border-gray-100 last:border-0">
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center justify-between w-full py-3 font-semibold text-[14px] text-blue-900 hover:text-blue-600 transition-colors"
        >
          {label}
          <ChevronIcon open={open} />
        </button>

        <div
          className="overflow-hidden transition-all duration-300 ease-in-out"
          style={{ maxHeight: open ? `${items.length * 52}px` : "0px" }}
        >
          <div className="pl-2 pb-2 flex flex-col border-l-2 border-blue-100 ml-1">
            {items.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="flex items-center gap-3 py-2 text-[13px] text-blue-900 hover:text-blue-600 transition-colors"
              >
                {mobileNavIcons[item.label] ?? null}
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    );
  }

  /* ── Desktop hover dropdown ── */
  return (
    <div className="relative group">
      <button className="flex items-center gap-1 cursor-pointer font-semibold text-[14px] text-blue-900 hover:text-blue-600 transition-colors">
        {label}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="transition-transform duration-200 group-hover:rotate-180"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-52 bg-white border border-gray-100 rounded-xl shadow-xl shadow-blue-100/40 py-2 z-50 opacity-0 invisible translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-200">
        <div className="absolute -top-[6px] left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-l border-t border-gray-100 rotate-45" />
        {items.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="block px-4 py-3 text-[13px] text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
          >
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

function HamburgerIcon({ open }: { open: boolean }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path
        d="M3 6 L21 6"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{
          transform: open ? "translateY(6px) rotate(45deg)" : "none",
          transformOrigin: "center",
          transition: "transform 0.3s",
        }}
      />
      <path
        d="M3 12 L21 12"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ opacity: open ? 0 : 1, transition: "opacity 0.2s" }}
      />
      <path
        d="M3 18 L21 18"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{
          transform: open ? "translateY(-6px) rotate(-45deg)" : "none",
          transformOrigin: "center",
          transition: "transform 0.3s",
        }}
      />
    </svg>
  );
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="bg-white sticky top-0 z-50 border-b border-gray-100 shadow-sm shadow-blue-50">

      {/* ── Top bar ── */}
      <div className="w-full px-4 sm:px-6">
        <div className="max-w-6xl mx-auto flex justify-between items-center py-3">

          {/* Logo */}
          <Link href="/">
            <img
              src="/images/logo.png"
              alt="SmhartPay Logo"
              className="w-12 h-12 sm:w-14 sm:h-14 cursor-pointer object-contain"
            />
          </Link>

          <div className="flex items-center">
            {/* Desktop links — hidden below lg */}
            <div className="hidden lg:flex items-center gap-6 xl:gap-7 font-semibold text-[14px]">
              <Link href="/" className="cursor-pointer hover:text-blue-600 hover:font-bold text-blue-900 transition-colors">Home</Link>
              <Dropdown label="Features" items={featuresItems} />
              <Link href="/pricing" className="cursor-pointer hover:text-blue-600 hover:font-bold text-blue-900 transition-colors">Pricing</Link>
              <Link href="/blog" className="cursor-pointer hover:text-blue-600 hover:font-bold text-blue-900 transition-colors">Blog</Link>
              <Link href="/help-centre" className="cursor-pointer hover:text-blue-600 hover:font-bold text-blue-900 transition-colors">Help-Centre</Link>
              <Dropdown label="Company" items={companyItems} />
              <Link href="/sign-in" className="cursor-pointer hover:text-blue-600 hover:font-bold text-blue-900 transition-colors">Sign In</Link>
            </div>

            {/* Desktop CTA */}
            <div className="hidden lg:block ml-4 xl:ml-7">
              <Button text="Download SmhartPay" />
            </div>
          </div>

          {/* Hamburger button — visible below lg */}
          <button
            onClick={() => setMobileOpen((prev) => !prev)}
            className="lg:hidden p-2 rounded-lg text-blue-600 hover:bg-blue-50 active:bg-blue-100 transition-colors"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            <HamburgerIcon open={mobileOpen} />
          </button>

        </div>
      </div>

      {/* Mobile / Tablet Menu */}
      <div
        className={`lg:hidden w-full bg-white border-t border-gray-100 shadow-lg z-50 overflow-hidden transition-all duration-300 ease-in-out ${
          mobileOpen ? "max-h-[700px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-2 flex flex-col">

          <Link
            href="/"
            onClick={() => setMobileOpen(false)}
            className="flex items-center gap-3 py-3 font-semibold text-[14px] text-blue-600 border-b border-gray-100"
          >
            {mobileNavIcons["Home"]}
            Home
          </Link>

          <Dropdown label="Features" items={featuresItems} isMobile />

          <Link
            href="/pricing"
            onClick={() => setMobileOpen(false)}
            className="flex items-center gap-3 py-3 font-semibold text-[14px] text-blue-600 border-b border-gray-100"
          >
            {mobileNavIcons["Pricing"]}
            Pricing
          </Link>

          <Link
            href="/blog"
            onClick={() => setMobileOpen(false)}
            className="flex items-center gap-3 py-3 font-semibold text-[14px] text-blue-600 border-b border-gray-100"
          >
            {mobileNavIcons["Blog"]}
            Blog
          </Link>

          <Link
            href="/help-centre"
            onClick={() => setMobileOpen(false)}
            className="flex items-center gap-3 py-3 font-semibold text-[14px] text-blue-600 border-b border-gray-100"
          >
            {mobileNavIcons["Help Centre"]}
            Help Centre
          </Link>

          <Dropdown label="Company" items={companyItems} isMobile />

          <Link
            href="/sign-in"
            onClick={() => setMobileOpen(false)}
            className="flex items-center gap-3 py-3 font-semibold text-[14px] text-blue-600 border-b border-gray-100"
          >
            {mobileNavIcons["Sign In"]}
            Sign In
          </Link>

          <div className="py-4">
            <Button text="Download SmhartPay" />
          </div>

        </div>
      </div>

    </nav>
  );
}