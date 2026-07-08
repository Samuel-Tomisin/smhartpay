"use client";

import { useState } from "react";
import Link from "next/link";
import Footer from "@/Components/layout/footer";
import Navbar from "@/Components/layout/Navbar";
import Footer2 from "@/Components/layout/footer2";
import {
  ShoppingCart,
  Apple,
  Store,
  Gamepad2,
  Joystick,
  Monitor,
  PlayCircle,
  Film,
  Music,
  Tv,
  UtensilsCrossed,
  Pizza,
  Home,
  Car,
  Sparkles,
  Footprints,
  Smartphone,
  Gift,
  Zap,
  Globe,
  CreditCard,
  Wallet,
  Lock,
  type LucideIcon,
} from "lucide-react";

// ─── Store URLs ───────────────────────────────────────────────────
const APP_STORE_URL  = "https://apps.apple.com/your-app-link";
const PLAY_STORE_URL = "https://play.google.com/store/your-app-link";

// ═════════════════════════════════════════════════════════════════
// DATA
// ═════════════════════════════════════════════════════════════════

const categories = [
  { id: "all",          label: "All Cards" },
  { id: "shopping",     label: "Shopping" },
  { id: "gaming",       label: "Gaming" },
  { id: "streaming",    label: "Streaming" },
  { id: "food",         label: "Food & Dining" },
  { id: "travel",       label: "Travel" },
  { id: "lifestyle",    label: "Lifestyle" },
];

const giftCards = [
  // Shopping
  {
    id: 1, category: "shopping",
    name: "Amazon",
    tagline: "Shop millions of products worldwide",
    color: "from-orange-400 to-orange-600",
    textColor: "text-white",
    logo: ShoppingCart,
    denominations: ["$10", "$25", "$50", "$100", "$200"],
    currency: "USD",
    popular: true,
  },
  {
    id: 2, category: "shopping",
    name: "Apple",
    tagline: "App Store, iTunes & Apple services",
    color: "from-gray-700 to-gray-900",
    textColor: "text-white",
    logo: Apple,
    denominations: ["$15", "$25", "$50", "$100"],
    currency: "USD",
    popular: true,
  },
  {
    id: 3, category: "shopping",
    name: "Jumia",
    tagline: "Nigeria's largest online marketplace",
    color: "from-orange-500 to-red-500",
    textColor: "text-white",
    logo: Store,
    denominations: ["₦2,000", "₦5,000", "₦10,000", "₦20,000"],
    currency: "NGN",
    popular: false,
  },
  // Gaming
  {
    id: 4, category: "gaming",
    name: "PlayStation",
    tagline: "PSN wallet top-up for games & DLCs",
    color: "from-blue-600 to-blue-800",
    textColor: "text-white",
    logo: Gamepad2,
    denominations: ["$10", "$20", "$50", "$100"],
    currency: "USD",
    popular: true,
  },
  {
    id: 5, category: "gaming",
    name: "Xbox",
    tagline: "Microsoft Store & Xbox Game Pass",
    color: "from-green-500 to-green-700",
    textColor: "text-white",
    logo: Joystick,
    denominations: ["$10", "$25", "$50", "$100"],
    currency: "USD",
    popular: false,
  },
  {
    id: 6, category: "gaming",
    name: "Steam",
    tagline: "PC gaming — thousands of titles",
    color: "from-slate-600 to-slate-800",
    textColor: "text-white",
    logo: Monitor,
    denominations: ["$5", "$10", "$20", "$50", "$100"],
    currency: "USD",
    popular: false,
  },
  {
    id: 7, category: "gaming",
    name: "Google Play",
    tagline: "Apps, games & in-app purchases",
    color: "from-teal-400 to-teal-600",
    textColor: "text-white",
    logo: PlayCircle,
    denominations: ["$10", "$25", "$50"],
    currency: "USD",
    popular: false,
  },
  // Streaming
  {
    id: 8, category: "streaming",
    name: "Netflix",
    tagline: "Stream movies, series & documentaries",
    color: "from-red-600 to-red-800",
    textColor: "text-white",
    logo: Film,
    denominations: ["$15", "$25", "$50", "$100"],
    currency: "USD",
    popular: true,
  },
  {
    id: 9, category: "streaming",
    name: "Spotify",
    tagline: "Music, podcasts & audiobooks",
    color: "from-green-400 to-green-600",
    textColor: "text-white",
    logo: Music,
    denominations: ["$10", "$30", "$60"],
    currency: "USD",
    popular: false,
  },
  {
    id: 10, category: "streaming",
    name: "YouTube Premium",
    tagline: "Ad-free YouTube & YouTube Music",
    color: "from-red-500 to-red-700",
    textColor: "text-white",
    logo: Tv,
    denominations: ["$10", "$30"],
    currency: "USD",
    popular: false,
  },
  // Food
  {
    id: 11, category: "food",
    name: "Chowdeck",
    tagline: "Food delivery across Nigeria",
    color: "from-orange-400 to-amber-500",
    textColor: "text-white",
    logo: UtensilsCrossed,
    denominations: ["₦2,000", "₦5,000", "₦10,000"],
    currency: "NGN",
    popular: false,
  },
  {
    id: 12, category: "food",
    name: "Domino's Pizza",
    tagline: "Pizza delivery & dine-in vouchers",
    color: "from-blue-600 to-indigo-700",
    textColor: "text-white",
    logo: Pizza,
    denominations: ["₦3,000", "₦5,000", "₦10,000"],
    currency: "NGN",
    popular: false,
  },
  // Travel
  {
    id: 13, category: "travel",
    name: "Airbnb",
    tagline: "Unique stays & experiences worldwide",
    color: "from-rose-400 to-rose-600",
    textColor: "text-white",
    logo: Home,
    denominations: ["$25", "$50", "$100", "$250"],
    currency: "USD",
    popular: false,
  },
  {
    id: 14, category: "travel",
    name: "Uber",
    tagline: "Rides, Uber Eats & travel credits",
    color: "from-gray-800 to-black",
    textColor: "text-white",
    logo: Car,
    denominations: ["$10", "$25", "$50"],
    currency: "USD",
    popular: false,
  },
  // Lifestyle
  {
    id: 15, category: "lifestyle",
    name: "Sephora",
    tagline: "Beauty, skincare & fragrance",
    color: "from-pink-500 to-rose-600",
    textColor: "text-white",
    logo: Sparkles,
    denominations: ["$25", "$50", "$100"],
    currency: "USD",
    popular: false,
  },
  {
    id: 16, category: "lifestyle",
    name: "Nike",
    tagline: "Sportswear, footwear & gear",
    color: "from-gray-900 to-black",
    textColor: "text-white",
    logo: Footprints,
    denominations: ["$25", "$50", "$100", "$200"],
    currency: "USD",
    popular: false,
  },

  // ── ADD A NEW GIFT CARD BELOW ─────────────────────────────────
  // {
  //   id: 17, category: "shopping",   // match one of the category ids
  //   name: "Brand Name",
  //   tagline: "Short description of this brand",
  //   color: "from-blue-500 to-blue-700",
  //   textColor: "text-white",
  //   logo: Gift, // pick a lucide-react icon
  //   denominations: ["$10", "$25", "$50"],
  //   currency: "USD",
  //   popular: false,
  // },
];

const steps = [
  {
    number: "01",
    icon: Smartphone,
    title: "Open SmhartPay",
    description:
      "Log in to the SmhartPay app and navigate to the Gift Cards section from the home screen or the main menu.",
  },
  {
    number: "02",
    icon: Gift,
    title: "Choose Your Card",
    description:
      "Browse our catalogue, select the brand you want, pick your preferred denomination, and review the details.",
  },
  {
    number: "03",
    icon: Zap,
    title: "Pay & Receive Instantly",
    description:
      "Pay securely from your SmhartPay wallet. Your gift card code is delivered instantly to your email and in-app.",
  },
];

const features = [
  {
    icon: Zap,
    title: "Instant Delivery",
    description:
      "Gift card codes are delivered instantly to your email and in-app notifications the moment payment is confirmed. No waiting.",
  },
  {
    icon: Globe,
    title: "Global Brands",
    description:
      "Shop from a growing catalogue of 50+ international and local brands — from Amazon and Netflix to Jumia and Chowdeck.",
  },
  {
    icon: CreditCard,
    title: "Pay from Your Wallet",
    description:
      "Purchase any gift card directly from your SmhartPay wallet balance. No card details required — simple and secure.",
  },
  {
    icon: Gift,
    title: "Send as a Gift",
    description:
      "Buy a gift card for someone else in seconds. Share the code via WhatsApp, email, or copy it directly from the app.",
  },
  {
    icon: Wallet,
    title: "Earn Cashback",
    description:
      "SmhartPay Plus and Business users earn cashback on every gift card purchase through our rewards programme.",
  },
  {
    icon: Lock,
    title: "Safe & Secure",
    description:
      "Every transaction is encrypted and protected. Gift card codes are stored securely in your app until you use them.",
  },

  // ── ADD MORE FEATURES BELOW ───────────────────────────────────
  // {
  //   icon: Sparkles, // pick a lucide-react icon
  //   title: "Feature Title",
  //   description: "Feature description here.",
  // },
];

const testimonials = [
  {
    quote: "I bought a Netflix gift card for my sister's birthday in 2 minutes. She got the code instantly. Absolutely love this feature!",
    name: "Funmi Adeyemi",
    role: "Marketing Professional, Lagos",
    avatar: "https://images.unsplash.com/photo-1615453262312-022a72d3842a?w=150&h=150&fit=crop&crop=faces&auto=format&q=80",
  },
  {
    quote: "I top up my PlayStation wallet every month through SmhartPay. It's the fastest and most reliable way to buy PSN cards in Nigeria.",
    name: "Chukwuemeka Obi",
    role: "Software Engineer, Abuja",
    avatar: "https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?w=150&h=150&fit=crop&crop=faces&auto=format&q=80",
  },
  {
    quote: "Sent an Amazon gift card to my cousin in the US without leaving the app. The conversion was fair and the process was seamless.",
    name: "Blessing Nwosu",
    role: "Business Owner, Port Harcourt",
    avatar: "https://images.unsplash.com/photo-1641932481849-9ac1cacf360c?w=150&h=150&fit=crop&crop=faces&auto=format&q=80",
  },

  // ── ADD MORE TESTIMONIALS BELOW ───────────────────────────────
  // {
  //   quote: "Your testimonial here.",
  //   name: "Full Name",
  //   role: "Role, City",
  //   avatar: "https://i.pravatar.cc/150?img=1",
  // },
];

const faqs = [
  {
    q: "How quickly do I receive my gift card code?",
    a: "Gift card codes are delivered instantly after payment is confirmed — typically within seconds. You will receive the code via in-app notification and email.",
  },
  {
    q: "Can I use my SmhartPay wallet to pay for gift cards?",
    a: "Yes. All gift card purchases are paid directly from your SmhartPay wallet balance. Ensure your wallet is funded before checkout.",
  },
  {
    q: "Can I send a gift card to someone else?",
    a: "Absolutely. After purchasing, you can copy the gift card code and share it with anyone via WhatsApp, SMS, or email directly from the app.",
  },
  {
    q: "Are gift cards refundable?",
    a: "Gift cards are non-refundable once delivered and the code has been revealed. Please ensure you select the correct brand and denomination before completing your purchase.",
  },
  {
    q: "What currencies are supported?",
    a: "We offer gift cards in both NGN and USD denominations. USD gift cards are purchased at the prevailing exchange rate at the time of the transaction.",
  },
  {
    q: "What happens if my gift card code doesn't work?",
    a: "If you encounter issues with a gift card code, please contact our support team immediately with your transaction reference. We will investigate and resolve the issue promptly.",
  },
  {
    q: "Is there a limit to how many gift cards I can buy?",
    a: "Starter plan users can purchase up to ₦50,000 worth of gift cards per month. Plus and Business users have higher limits. Limits are reviewed periodically.",
  },
  {
    q: "Do gift cards expire?",
    a: "Expiry dates vary by brand and are clearly shown before purchase. Always check the validity period before buying. SmhartPay is not responsible for expired codes that have not been redeemed.",
  },

  // ── ADD MORE FAQ ITEMS BELOW ──────────────────────────────────
  // { q: "Your question?", a: "Your answer." },
];

// ═════════════════════════════════════════════════════════════════
// SUB-COMPONENTS
// ═════════════════════════════════════════════════════════════════

function AppStoreButton({ dark = false }: { dark?: boolean }) {
  return (
    <a href="https://apps.apple.com/your-app-link" target="_blank" rel="noopener noreferrer"
      className={`inline-flex items-center gap-3 px-5 py-3 rounded-xl
        active:scale-95 transition-all duration-150
        ${dark
          ? "bg-gray-900 text-white hover:bg-black"
          : "bg-white text-gray-900 hover:bg-gray-50"}`}>
      <svg className={`w-5 h-5 flex-shrink-0 ${dark ? "fill-white" : "fill-gray-900"}`}
        viewBox="0 0 24 24">
        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
      </svg>
      <div className="flex flex-col leading-none text-left">
        <span className={`text-[10px] ${dark ? "text-gray-300" : "text-gray-500"}`}>
          Download on the
        </span>
        <span className="text-[14px] font-semibold">App Store</span>
      </div>
    </a>
  );
}

function PlayStoreButton({ dark = false }: { dark?: boolean }) {
  return (
    <a href="https://play.google.com/store/your-app-link" target="_blank" rel="noopener noreferrer"
      className={`inline-flex items-center gap-3 px-5 py-3 rounded-xl
        active:scale-95 transition-all duration-150
        ${dark
          ? "bg-gray-900 text-white hover:bg-black"
          : "bg-white text-gray-900 hover:bg-gray-50"}`}>
      <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24">
        <path d="M3.18 23.76c.3.16.64.2.99.1l.1-.06 11.04-11.04-2.29-2.29L3.18.24z" fill="#EA4335"/>
        <path d="M20.7 10.7l-2.6-1.48-2.59 2.59 2.59 2.59 2.62-1.5c.75-.43.75-1.77-.02-2.2z" fill="#FBBC04"/>
        <path d="M3.18.24C2.83.14 2.49.18 2.19.34L12.4 10.56l2.29-2.29L3.18.24z" fill="#4285F4"/>
        <path d="M2.19.34C1.7.62 1.38 1.18 1.38 1.98v20.04c0 .8.32 1.36.81 1.64l.1.06L13.61 12 2.19.34z" fill="#34A853"/>
      </svg>
      <div className="flex flex-col leading-none text-left">
        <span className={`text-[10px] ${dark ? "text-gray-300" : "text-gray-500"}`}>
          Get it on
        </span>
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
          className={`flex-shrink-0 transition-transform duration-300
            ${isOpen ? "rotate-180 text-[#034EA2]" : "text-gray-400"}`}>
          <polyline points="6 9 12 15 18 9"/>
        </svg>
      </button>
      <div className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{ maxHeight: isOpen ? "220px" : "0px" }}>
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

// ── Gift card display card ────────────────────────────────────────
function GiftCardTile({ card }: { card: typeof giftCards[0] }) {
  const Logo = card.logo;
  return (
    <div className="group cursor-pointer">
      {/* Card face */}
      <div className={`relative bg-gradient-to-br ${card.color} rounded-2xl p-5
        aspect-[16/10] flex flex-col justify-between
        shadow-sm group-hover:shadow-lg group-hover:-translate-y-1
        transition-all duration-200 overflow-hidden`}>

        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-white"/>
          <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full bg-white"/>
        </div>

        {/* Popular badge */}
        {card.popular && (
          <span className="absolute top-3 right-3 text-[10px] font-bold
            bg-yellow-400 text-yellow-900 px-2 py-0.5 rounded-full z-10">
            Popular
          </span>
        )}

        {/* Logo + name */}
        <div className="flex items-center gap-2 z-10">
          <Logo className={`w-6 h-6 ${card.textColor}`} strokeWidth={2} />
          <span className={`text-[15px] font-bold ${card.textColor}`}>
            {card.name}
          </span>
        </div>

        {/* Currency tag */}
        <div className="z-10">
          <span className={`text-[10px] font-semibold opacity-70 ${card.textColor}`}>
            {card.currency} GIFT CARD
          </span>
        </div>
      </div>

      {/* Card info below */}
      <div className="mt-3 px-1">
        <p className="text-[13px] font-semibold text-gray-900">{card.name}</p>
        <p className="text-[12px] text-gray-400 mt-0.5 leading-snug">{card.tagline}</p>
        <div className="flex flex-wrap gap-1 mt-2">
          {card.denominations.slice(0, 3).map((d) => (
            <span key={d}
              className="text-[11px] font-medium bg-gray-100 text-gray-600
                px-2 py-0.5 rounded-full">
              {d}
            </span>
          ))}
          {card.denominations.length > 3 && (
            <span className="text-[11px] font-medium text-gray-400">
              +{card.denominations.length - 3} more
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════════
// MAIN PAGE
// ═════════════════════════════════════════════════════════════════

export default function GiftCardsPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [openFaq, setOpenFaq]               = useState<number | null>(null);
  const [showAll, setShowAll]               = useState(false);

  const filtered = activeCategory === "all"
    ? giftCards
    : giftCards.filter((c) => c.category === activeCategory);

  const displayed = showAll ? filtered : filtered.slice(0, 8);

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

            {/* Left: text */}
            <div className="flex-1 text-center lg:text-left">
              <span className="inline-block text-[12px] font-semibold bg-white/15
                px-4 py-1.5 rounded-full mb-5 tracking-wide uppercase">
                SmhartPay Gift Cards
              </span>
              <h1 className="font-bold leading-tight mb-5
                text-[32px] sm:text-[40px] md:text-[48px] lg:text-[52px]">
                The perfect gift,
                <span className="text-black"> every time.</span>
              </h1>
              <p className="text-blue-100 leading-relaxed mb-8
                max-w-xl mx-auto lg:mx-0
                text-[15px] sm:text-[16px] md:text-[17px]">
                Buy gift cards for 50+ global and local brands instantly
                from your SmhartPay wallet. Shopping, gaming, streaming,
                food, travel and more — all in one place.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                <AppStoreButton />
                <PlayStoreButton />
              </div>
              {/* Quick trust points */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-x-5 gap-y-2 mt-7">
                {["Instant delivery", "50+ brands", "NGN & USD", "Earn cashback"].map((t) => (
                  <span key={t}
                    className="flex items-center gap-1.5 text-[13px] text-blue-200">
                    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" fill="none"
                      stroke="currentColor" strokeWidth="3" strokeLinecap="round"
                      strokeLinejoin="round" viewBox="0 0 24 24" className="text-yellow-300">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Right: floating cards preview */}
            <div className="w-full max-w-sm lg:max-w-xs xl:max-w-sm flex-shrink-0">
              <div className="grid grid-cols-2 gap-3">
                {[
                  { name: "Amazon",      color: "from-orange-400 to-orange-600",  },
                  { name: "Netflix",     color: "from-red-600 to-red-800",        },
                  { name: "PlayStation", color: "from-blue-600 to-blue-800",      },
                  { name: "Spotify",     color: "from-green-400 to-green-600",   },
                ].map((card, i) => (
                  <div key={i}
                    className={`bg-gradient-to-br ${card.color} rounded-2xl p-4
                      aspect-[4/3] flex flex-col justify-between
                      shadow-lg relative overflow-hidden
                      ${i === 0 ? "col-span-1" : ""}`}>
                    <div className="absolute -top-4 -right-4 w-16 h-16 rounded-full bg-white/10"/>
                    <div className="absolute -bottom-5 -left-5 w-20 h-20 rounded-full bg-white/10"/>
                    {/* <span className="text-2xl z-10">{card.logo}</span> */}
                    <span className="text-[14px] font-bold text-white z-10">
                      {card.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          2. STATS STRIP
      ══════════════════════════════════════════ */}
      <section className="px-5 py-8 sm:px-8 md:px-10 border-b border-gray-100">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            {[
              { value: "50+",      label: "Brands available" },
              { value: "Instant",  label: "Code delivery" },
              { value: "NGN & USD", label: "Currencies" },
              { value: "24/7",     label: "Purchase anytime" },
            ].map((stat) => (
              <div key={stat.label}
                className="bg-gray-50 rounded-2xl py-4 px-3 border border-gray-100">
                <p className="text-[20px] sm:text-[24px] font-black text-[#034EA2]">
                  {stat.value}
                </p>
                <p className="text-[12px] text-gray-500 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          3. HOW IT WORKS
      ══════════════════════════════════════════ */}
      <section className="px-5 py-16 sm:px-8 sm:py-20 md:px-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block text-[12px] font-semibold text-[#034EA2]
              bg-blue-50 px-4 py-1.5 rounded-full mb-4 tracking-wide uppercase">
              How It Works
            </span>
            <h2 className="font-bold text-gray-900
              text-[24px] sm:text-[28px] md:text-[34px]">
              Get your gift card in 3 easy steps
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8">
            {steps.map((step, i) => {
              const StepIcon = step.icon;
              return (
              <div key={i}
                className="relative bg-white rounded-2xl p-6 sm:p-7 border
                  border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200">
                <span className="text-[44px] font-black text-black leading-none block mb-2">
                  {step.number}
                </span>
                <StepIcon className="w-8 h-8 text-[#034EA2] block mb-4" strokeWidth={2} />
                <h3 className="text-[16px] sm:text-[17px] font-bold text-gray-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-[13px] sm:text-[14px] text-gray-500 leading-relaxed">
                  {step.description}
                </p>
                {/* Connector */}
                {i < steps.length - 1 && (
                  <div className="hidden sm:flex absolute -right-4 top-1/2 -translate-y-1/2 z-10
                    items-center justify-center w-8 h-8">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none"
                      stroke="#034EA2" strokeWidth="2" strokeLinecap="round"
                      strokeLinejoin="round" viewBox="0 0 24 24">
                      <line x1="5" y1="12" x2="19" y2="12"/>
                      <polyline points="12 5 19 12 12 19"/>
                    </svg>
                  </div>
                )}
              </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          4. GIFT CARD CATALOGUE
      ══════════════════════════════════════════ */}
      <section className="px-5 py-16 sm:px-8 sm:py-20 md:px-10 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <span className="inline-block text-[12px] font-semibold text-[#034EA2]
              bg-blue-50 px-4 py-1.5 rounded-full mb-4 tracking-wide uppercase">
              Catalogue
            </span>
            <h2 className="font-bold text-gray-900
              text-[24px] sm:text-[28px] md:text-[34px]">
              Browse our gift card collection
            </h2>
            <p className="mt-3 text-[14px] sm:text-[15px] text-gray-500 max-w-xl mx-auto">
              From shopping and gaming to streaming and food — we have
              something for everyone.
            </p>
          </div>

          {/* Category filter tabs */}
          <div className="flex gap-2 overflow-x-auto pb-3 mb-8 scrollbar-hide">
            {categories.map((cat) => (
              <button key={cat.id} onClick={() => {
                setActiveCategory(cat.id);
                setShowAll(false);
              }}
                className={`flex-shrink-0 px-4 py-2 rounded-full text-[13px]
                  font-semibold transition-all duration-150 whitespace-nowrap
                  ${activeCategory === cat.id
                    ? "bg-[#034EA2] text-white"
                    : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-100"}`}>
                {cat.label}
              </button>
            ))}
          </div>

          {/* Cards grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-6">
            {displayed.map((card) => (
              <GiftCardTile key={card.id} card={card} />
            ))}
          </div>

          {/* Show more */}
          {filtered.length > 8 && (
            <div className="text-center mt-10">
              <button onClick={() => setShowAll(!showAll)}
                className="px-8 py-3 rounded-xl border border-[#034EA2] text-[#034EA2]
                  text-[14px] font-semibold hover:bg-[#034EA2] hover:text-white
                  transition-all duration-150 active:scale-95">
                {showAll
                  ? "Show less"
                  : `View all ${filtered.length} cards`}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ══════════════════════════════════════════
          5. FEATURES
      ══════════════════════════════════════════ */}
      <section className="px-5 py-16 sm:px-8 sm:py-20 md:px-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block text-[12px] font-semibold text-[#034EA2]
              bg-blue-50 px-4 py-1.5 rounded-full mb-4 tracking-wide uppercase">
              Features
            </span>
            <h2 className="font-bold text-gray-900
              text-[24px] sm:text-[28px] md:text-[34px]">
              Why buy gift cards on SmhartPay?
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {features.map((feature) => {
              const FeatureIcon = feature.icon;
              return (
              <div key={feature.title}
                className="bg-white rounded-2xl border border-gray-100 p-6
                  hover:shadow-md hover:border-blue-100 transition-all duration-200 group">
                <FeatureIcon className="w-8 h-8 text-[#034EA2] block mb-4" strokeWidth={2} />
                <h3 className="text-[15px] sm:text-[16px] font-bold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-[13px] sm:text-[14px] text-gray-500 leading-relaxed">
                  {feature.description}
                </p>
              </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          6. APP DOWNLOAD BANNER (MID-PAGE)
      ══════════════════════════════════════════ */}
      <section className="px-5 py-10 sm:px-8 md:px-10 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="bg-gradient-to-br from-[#034EA2] to-[#0369cc]
            rounded-3xl p-8 sm:p-10 md:p-12
            flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="text-center lg:text-left">
              <h2 className="text-[22px] sm:text-[26px] md:text-[30px]
                font-bold text-white leading-tight mb-3">
                Ready to buy your first gift card?
              </h2>
              <p className="text-blue-200 text-[14px] sm:text-[15px] leading-relaxed
                max-w-md mx-auto lg:mx-0">
                Download SmhartPay and browse 50+ brands in your pocket.
                Instant delivery, zero hassle.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
              <AppStoreButton />
              <PlayStoreButton />
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          7. TESTIMONIALS
      ══════════════════════════════════════════ */}
      <section className="px-5 py-16 sm:px-8 sm:py-20 md:px-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block text-[12px] font-semibold text-[#034EA2]
              bg-blue-50 px-4 py-1.5 rounded-full mb-4 tracking-wide uppercase">
              What users say
            </span>
            <h2 className="font-bold text-gray-900
              text-[24px] sm:text-[28px] md:text-[34px]">
              Nigerians gifting smarter every day
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {testimonials.map((t, i) => (
              <div key={i}
                className="bg-white rounded-2xl border border-gray-100 p-6
                  hover:shadow-md transition-shadow duration-200">
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <svg key={j} width="14" height="14" viewBox="0 0 24 24"
                      fill="#FBBF24">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                    </svg>
                  ))}
                </div>
                <p className="text-[13px] sm:text-[14px] text-gray-600
                  leading-relaxed mb-5 italic">
                  "{t.quote}"
                </p>
                <div className="flex items-center gap-3">
                  <img src={t.avatar} alt={t.name}
                    className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                    loading="lazy"/>
                  <div>
                    <p className="text-[13px] font-semibold text-gray-900">{t.name}</p>
                    <p className="text-[12px] text-gray-400">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          8. FAQ
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
              Gift card questions answered
            </h2>
          </div>
          <div className="max-w-3xl mx-auto">
            <div className="border-t border-gray-200"/>
            {faqs.map((faq, i) => (
              <FAQItem key={i} q={faq.q} a={faq.a}
                isOpen={openFaq === i}
                onToggle={() => setOpenFaq(openFaq === i ? null : i)}/>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/help-centre"
              className="text-[#034EA2] text-[14px] font-semibold hover:underline">
              Visit Help Centre for more answers →
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          9. FINAL CTA
      ══════════════════════════════════════════ */}
      <section className="px-5 py-16 sm:px-8 sm:py-20 md:px-10">
        <div className="max-w-6xl mx-auto text-center">
          <Gift className="w-10 h-10 text-[#034EA2] mx-auto block mb-5" strokeWidth={2} />
          <h2 className="font-bold text-gray-900 mb-4
            text-[24px] sm:text-[30px] md:text-[36px]">
            Give the gift of choice
          </h2>
          <p className="text-[14px] sm:text-[15px] text-gray-500 max-w-xl
            mx-auto mb-8 leading-relaxed">
            Whether it's a birthday, anniversary, celebration, or just because —
            a SmhartPay gift card is always the right choice. Buy one in seconds.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <AppStoreButton dark />
            <PlayStoreButton dark />
          </div>
          <p className="mt-6 text-[13px] text-gray-400">
            Questions?{" "}
            <Link href="/contact"
              className="text-[#034EA2] font-medium hover:underline">
              Contact our support team →
            </Link>
          </p>
        </div>
        {/* ── ADD MORE CONTENT BELOW ── */}
      </section>

    </main>
    <Footer/>
    </div>
  );
}