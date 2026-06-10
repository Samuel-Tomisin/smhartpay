"use client";

import Link from "next/link";
import { useState, useEffect, useRef, useCallback } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

// ── Types ──────────────────────────────────────────────────────────────────
interface Testimonial {
  id: number;
  name: string;
  handle: string;
  location: string;
  avatar: string;
  rating: number;
  text: string;
  feature: string;
  featureColor: string;
  joined: string;
}

// ── Data ──────────────────────────────────────────────────────────────────
const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: "Adaeze Okonkwo",
    handle: "@adaeze_o",
    location: "Lagos, Nigeria",
    avatar: "AO",
    rating: 5,
    text: "I've tried so many banking apps and SmhartPay is just on another level. Sending money to my mum in Enugu is now as simple as sending a text. No failed transactions, no delays — it just works.",
    feature: "Transfers",
    featureColor: "#034EA2",
    joined: "Member since 2024",
  },
  {
    id: 2,
    name: "Emeka Nwosu",
    handle: "@emekanwosu",
    location: "Abuja, Nigeria",
    avatar: "EN",
    rating: 5,
    text: "The savings feature completely changed how I manage my money. I set a goal, automated my contributions, and hit my target in 4 months. The rewards on top were a pleasant surprise.",
    feature: "Savings",
    featureColor: "#065f46",
    joined: "Member since 2023",
  },
  {
    id: 3,
    name: "Fatima Al-Hassan",
    handle: "@fatimaah",
    location: "Kano, Nigeria",
    avatar: "FA",
    rating: 5,
    text: "As someone who runs a small business, being able to manage payments and track expenses from one app is invaluable. The virtual card alone saves me so much stress when paying online.",
    feature: "Virtual Cards",
    featureColor: "#7c3aed",
    joined: "Member since 2024",
  },
  {
    id: 4,
    name: "Chidi Okafor",
    handle: "@chidiokafor",
    location: "Port Harcourt, Nigeria",
    avatar: "CO",
    rating: 5,
    text: "I was sceptical at first, but after my first month the app has never let me down. Buying airtime and paying my electricity bill takes seconds. Customer support actually responds too!",
    feature: "VTU Services",
    featureColor: "#b45309",
    joined: "Member since 2023",
  },
  {
    id: 5,
    name: "Ngozi Adeleke",
    handle: "@ngozi_a",
    location: "Ibadan, Nigeria",
    avatar: "NA",
    rating: 5,
    text: "I recommended SmhartPay to my entire family and they all love it. The referral rewards were generous, and watching my points grow every week makes banking genuinely enjoyable.",
    feature: "Rewards",
    featureColor: "#be185d",
    joined: "Member since 2024",
  },
  {
    id: 6,
    name: "Tunde Fashola",
    handle: "@tundefashola",
    location: "Lagos, Nigeria",
    avatar: "TF",
    rating: 5,
    text: "The security features give me real peace of mind. Biometric login, instant transaction alerts, the ability to freeze my card in seconds — I actually feel like my money is protected.",
    feature: "Security",
    featureColor: "#0e7490",
    joined: "Member since 2023",
  },
];

const STATS = [
  { value: "500K+", label: "Happy Users" },
  { value: "4.9★",  label: "App Store Rating" },
  { value: "99.9%", label: "Uptime" },
  { value: "< 3s",  label: "Avg. Transfer Time" },
];

// ── Avatar ─────────────────────────────────────────────────────────────────
const AVATAR_GRADIENTS: Record<string, string> = {
  AO: "from-blue-500 to-blue-700",
  EN: "from-emerald-500 to-emerald-700",
  FA: "from-rose-500 to-rose-700",
  CO: "from-amber-500 to-amber-700",
  NA: "from-pink-500 to-pink-700",
  TF: "from-cyan-500 to-cyan-700",
};

function Avatar({
  initials,
  size = "md",
}: {
  initials: string;
  size?: "sm" | "md" | "lg";
}) {
  const sz =
    size === "lg"
      ? "w-14 h-14 text-[18px]"
      : size === "md"
      ? "w-11 h-11 text-[14px]"
      : "w-8 h-8 text-[11px]";
  return (
    <div
      className={`${sz} rounded-full bg-gradient-to-br ${
        AVATAR_GRADIENTS[initials] ?? "from-slate-500 to-slate-700"
      } flex items-center justify-center text-white font-bold flex-shrink-0`}
    >
      {initials}
    </div>
  );
}

// ── Star Rating ────────────────────────────────────────────────────────────
function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={13}
          className={
            i < rating
              ? "text-amber-400 fill-amber-400"
              : "text-gray-300 fill-gray-200"
          }
        />
      ))}
    </div>
  );
}

// ── Testimonial Card ───────────────────────────────────────────────────────
function TestimonialCard({
  testimonial,
  featured = false,
}: {
  testimonial: Testimonial;
  featured?: boolean;
}) {
  return (
    <div
      className={`relative flex flex-col h-full rounded-2xl transition-all duration-300 overflow-hidden
        ${
          featured
            ? "bg-[#034EA2] shadow-xl shadow-[#034EA2]/20"
            : "bg-white border border-gray-100 hover:border-[#034EA2]/20 hover:shadow-md"
        }`}
    >
      {/* Feature tag */}
      <div className="absolute top-5 right-5">
        <span
          className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${
            featured ? "bg-white/20 text-white" : "text-white"
          }`}
          style={featured ? undefined : { background: testimonial.featureColor }}
        >
          {testimonial.feature}
        </span>
      </div>

      <div className="p-6 flex flex-col gap-4 flex-1">
        {/* Quote icon */}
        <Quote
          size={28}
          className={`${featured ? "text-white/30" : "text-[#034EA2]/15"} -mb-1`}
          aria-hidden="true"
        />

        {/* Review text */}
        <p
          className={`text-[13px] sm:text-[14px] leading-relaxed flex-1 ${
            featured ? "text-blue-100" : "text-[#374151]"
          }`}
        >
          "{testimonial.text}"
        </p>

        {/* Rating */}
        <StarRating rating={testimonial.rating} />

        {/* Divider */}
        <div className={`h-px ${featured ? "bg-white/20" : "bg-gray-100"}`} />

        {/* Author */}
        <div className="flex items-center gap-3">
          <Avatar initials={testimonial.avatar} size="md" />
          <div className="min-w-0">
            <p
              className={`text-[14px] font-bold leading-tight truncate ${
                featured ? "text-white" : "text-gray-900"
              }`}
            >
              {testimonial.name}
            </p>
            <p
              className={`text-[11px] mt-0.5 ${
                featured ? "text-blue-200" : "text-gray-400"
              }`}
            >
              {testimonial.location} · {testimonial.joined}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Main Section ───────────────────────────────────────────────────────────
export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [visibleCount, setVisibleCount] = useState(3);
  const autoplayRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const total = TESTIMONIALS.length;

  // Responsive visible count
  useEffect(() => {
    const update = () => {
      if (window.innerWidth < 640) setVisibleCount(1);
      else if (window.innerWidth < 1024) setVisibleCount(2);
      else setVisibleCount(3);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const maxIndex = total - visibleCount;

  const goTo = useCallback(
    (idx: number) => {
      if (isAnimating) return;
      setIsAnimating(true);
      setActiveIndex(Math.max(0, Math.min(idx, maxIndex)));
      setTimeout(() => setIsAnimating(false), 350);
    },
    [isAnimating, maxIndex],
  );

  const prev = () => goTo(activeIndex - 1);
  const next = () => goTo(activeIndex === maxIndex ? 0 : activeIndex + 1);

  // Autoplay
  useEffect(() => {
    autoplayRef.current = setInterval(() => {
      setActiveIndex((i) => (i >= maxIndex ? 0 : i + 1));
    }, 4500);
    return () => {
      if (autoplayRef.current) clearInterval(autoplayRef.current);
    };
  }, [maxIndex]);

  const pauseAutoplay = () => {
    if (autoplayRef.current) clearInterval(autoplayRef.current);
  };

  const visible = TESTIMONIALS.slice(activeIndex, activeIndex + visibleCount);

  return (
    <>
      <style>{`
        @keyframes slide-in {
          from { opacity: 0; transform: translateX(24px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        .slide-in { animation: slide-in 0.35s ease both; }

        @keyframes count-up {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .count-up { animation: count-up 0.5s ease both; }
      `}</style>

      {/*
        ✅ FIX: removed md:px-10 lg:px-20 from the section.
           max-w-6xl mx-auto on the inner div already centres and
           caps the width on large screens — no extra px needed here.
           Keep only px-5 for small-screen edge breathing room.
      */}
      <section
        className="relative bg-[#F5F7FB] px-5 py-14 md:py-20 overflow-hidden"
        style={{ fontFamily: "Inter, Helvetica, sans-serif" }}
        onMouseEnter={pauseAutoplay}
      >
        {/* Subtle background pattern */}
        <div
          className="absolute inset-0 opacity-[0.025] pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle, #034EA2 1px, transparent 1px)",
            backgroundSize: "36px 36px",
          }}
        />

        {/* ✅ max-w-6xl mx-auto is already here — this is correct */}
        <div className="max-w-5xl mx-auto relative z-10">

          {/* ── Header ── */}
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-10 md:mb-12">
            <div>
              {/* Eyebrow */}
              <div className="flex items-center gap-2 mb-3">
                <div className="flex -space-x-2">
                  {["AO", "EN", "FA"].map((i) => (
                    <Avatar key={i} initials={i} size="sm" />
                  ))}
                </div>
                <span className="text-[12px] font-semibold text-[#64748B]">
                  500,000+ users trust SmhartPay
                </span>
              </div>

              <h2 className="text-[26px] sm:text-[30px] md:text-[36px] font-bold text-[#1A202E] leading-tight">
                Loved by Nigerians{" "}
                <br className="hidden sm:block" />
                <span className="text-[#034EA2]">Across Every City</span>
              </h2>
            </div>

            {/* Nav arrows */}
            <div className="flex items-center gap-3 self-start sm:self-auto">
              <button
                onClick={prev}
                disabled={activeIndex === 0}
                className="w-10 h-10 rounded-full border border-gray-200 bg-white hover:border-[#034EA2] hover:text-[#034EA2] disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center transition-all cursor-pointer"
                aria-label="Previous testimonials"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={next}
                className="w-10 h-10 rounded-full bg-[#034EA2] hover:bg-[#023d82] text-white flex items-center justify-center transition-all cursor-pointer"
                aria-label="Next testimonials"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

          {/* ── Cards carousel ── */}
          <div
            className={`grid gap-4 mb-8 ${
              visibleCount === 1
                ? "grid-cols-1"
                : visibleCount === 2
                ? "grid-cols-2"
                : "grid-cols-3"
            }`}
          >
            {visible.map((t, i) => (
              <div
                key={`${t.id}-${activeIndex}`}
                className="slide-in"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <TestimonialCard
                  testimonial={t}
                  featured={visibleCount === 3 && i === 1}
                />
              </div>
            ))}
          </div>

          {/* ── Dot indicators ── */}
          <div className="flex justify-center gap-2 mb-10 md:mb-12">
            {Array.from({ length: maxIndex + 1 }).map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`rounded-full transition-all duration-300 cursor-pointer ${
                  i === activeIndex
                    ? "w-6 h-2 bg-[#034EA2]"
                    : "w-2 h-2 bg-gray-300 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>

          {/* ── Stats strip ── */}
          <div className="bg-white rounded-2xl border border-gray-100 px-5 sm:px-8 py-5 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-0 sm:divide-x sm:divide-gray-100">
            {STATS.map(({ value, label }, i) => (
              <div
                key={label}
                className="flex flex-col items-center justify-center text-center px-4 count-up"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <span className="text-[24px] sm:text-[28px] font-bold text-[#034EA2]">
                  {value}
                </span>
                <span className="text-[12px] text-[#64748B] mt-0.5 font-medium">
                  {label}
                </span>
              </div>
            ))}
          </div>

          {/* ── CTA ── */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 text-center">
            <p className="text-[14px] text-[#64748B]">
              Join over 500,000 Nigerians already banking smarter.
            </p>
            <div className="flex items-center justify-center md:justify-start gap-2 md:gap-3">
              <Link href="https://play.google.com/store/apps?hl=en" target="_blank">
                <img
                  src="./images/store2.svg"
                  alt="Get it on Google Play"
                  className="h-10 md:h-11 lg:h-auto w-auto cursor-pointer"
                />
              </Link>
              <Link href="https://www.apple.com/app-store/" target="_blank">
                <img
                  src="./images/store1.svg"
                  alt="Download on the App Store"
                  className="h-10 md:h-11 lg:h-auto w-auto cursor-pointer"
                />
              </Link>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}