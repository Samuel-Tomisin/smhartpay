"use client"

import Link from 'next/link';
import { useState, useRef, useEffect } from "react";
import Button from "../ui/button";

const featuresItems = [
  { label: "Cards",         href: "/features/cards" },
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
          className="flex items-center justify-between w-full py-3 font-semibold text-[14px] text-blue-600 hover:text-blue-900 transition-colors"
        >
          {label}
          <ChevronIcon open={open} />
        </button>

        <div
          className="overflow-hidden transition-all duration-300 ease-in-out"
          style={{ maxHeight: open ? `${items.length * 44}px` : "0px" }}
        >
          <div className="pl-4 pb-2 flex flex-col border-l-2 border-blue-100 ml-1">
            {items.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="py-2 text-[13px] text-blue-500 hover:text-blue-900 transition-colors"
              >
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
      <button className="flex items-center gap-1 cursor-pointer font-semibold text-[14px] text-blue-600 hover:text-blue-900 transition-colors">
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
            className="block px-4 py-3 text-[13px] text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
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
        className="transition-all duration-300 origin-center"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{
          transform: open ? "translateY(6px) rotate(45deg)" : "none",
          transformOrigin: "center",
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
        className="transition-all duration-300"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{
          transform: open ? "translateY(-6px) rotate(-45deg)" : "none",
          transformOrigin: "center",
        }}
      />
    </svg>
  );
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="relative bg-white sticky top-0 z-50 border-b border-gray-100 shadow-sm shadow-blue-50">

      {/* ── Top bar ── */}
      <div className="flex justify-between items-center px-4 sm:px-8 lg:px-14 xl:px-20 py-3">

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
            <Link href="/" className="cursor-pointer hover:text-blue-900 hover:font-bold text-blue-600 transition-colors">Home</Link>
            <Dropdown label="Features" items={featuresItems} />
            <Link href="/pricing" className="cursor-pointer hover:text-blue-900 hover:font-bold text-blue-600 transition-colors">Pricing</Link>
            <Link href="/blog" className="cursor-pointer hover:text-blue-900 hover:font-bold text-blue-600 transition-colors">Blog</Link>
            <Link href="/help-centre" className="cursor-pointer hover:text-blue-900 hover:font-bold text-blue-600 transition-colors">Help-Centre</Link>
            <Dropdown label="Company" items={companyItems} />
            <Link href="/sign-in" className="cursor-pointer hover:text-blue-900 hover:font-bold text-blue-200 transition-colors">Sign In</Link>
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

{/* Mobile / Tablet Menu */}
<div
  className={`lg:hidden absolute top-full left-0 w-full bg-white border-t border-gray-100 shadow-lg z-50 overflow-hidden transition-all duration-300 ease-in-out ${
    mobileOpen
      ? "max-h-[700px] opacity-100"
      : "max-h-0 opacity-0"
  }`}
>
  <div className="px-4 sm:px-8 py-2 flex flex-col">

    <Link
      href="/"
      onClick={() => setMobileOpen(false)}
      className="py-3 font-semibold text-[14px] text-blue-600 border-b border-gray-100"
    >
      Home
    </Link>

    <Dropdown
      label="Features"
      items={featuresItems}
      isMobile
    />

    <Link
      href="/pricing"
      onClick={() => setMobileOpen(false)}
      className="py-3 font-semibold text-[14px] text-blue-600 border-b border-gray-100"
    >
      Pricing
    </Link>

    <Link
      href="/blog"
      onClick={() => setMobileOpen(false)}
      className="py-3 font-semibold text-[14px] text-blue-600 border-b border-gray-100"
    >
      Blog
    </Link>

    <Link
      href="/help-centre"
      onClick={() => setMobileOpen(false)}
      className="py-3 font-semibold text-[14px] text-blue-600 border-b border-gray-100"
    >
      Help Centre
    </Link>

    <Dropdown
      label="Company"
      items={companyItems}
      isMobile
    />

    <Link
      href="/sign-in"
      onClick={() => setMobileOpen(false)}
      className="py-3 font-semibold text-[14px] text-blue-600 border-b border-gray-100"
    >
      Sign In
    </Link>

    <div className="py-4">
      <Button text="Download SmhartPay" />
    </div>

  </div>
</div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.18s ease-out forwards;
        }
      `}
      </style>
    </nav>
  );
}