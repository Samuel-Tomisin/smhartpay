"use client";

import { useState } from "react";
import {
  Star,
  Gift,
  Zap,
  Trophy,
  ArrowRight,
  CheckCircle2,
  Clock,
  ChevronDown,
  Flame,
  Crown,
  Sparkles,
  CreditCard,
  Smartphone,
  Send,
  ShoppingBag,
  Users,
  Info,
  TrendingUp,
  Coins,
} from "lucide-react";
import Footer2 from "@/Components/layout/footer2";
import Navbar from "@/Components/layout/Navbar";

// ── Types ──────────────────────────────────────────────────────────────────
interface Tier {
  id: string;
  name: string;
  minPoints: number;
  maxPoints: number | null;
  color: string;
  bg: string;
  border: string;
  icon: React.ReactNode;
  perks: string[];
  multiplier: string;
}

interface RewardItem {
  id: string;
  title: string;
  category: string;
  points: number;
  value: string;
  icon: React.ReactNode;
  popular?: boolean;
  featured?: boolean;
}

interface EarnMethod {
  icon: React.ReactNode;
  title: string;
  description: string;
  points: string;
  color: string;
}

interface Transaction {
  id: string;
  description: string;
  points: number;
  date: string;
  type: "earn" | "redeem";
}

// ── Data ──────────────────────────────────────────────────────────────────
const USER = {
  name: "Adaeze",
  tier: "Gold",
  points: 4_820,
  nextTier: "Platinum",
  pointsToNext: 1_180,
  totalEarned: 12_430,
  streak: 7,
};

const TIERS: Tier[] = [
  {
    id: "bronze",
    name: "Bronze",
    minPoints: 0,
    maxPoints: 999,
    color: "#92400e",
    bg: "#fef3c7",
    border: "#fde68a",
    icon: <Star size={18} />,
    multiplier: "1×",
    perks: ["1 point per ₦100 spent", "Access to standard rewards", "Birthday bonus points"],
  },
  {
    id: "silver",
    name: "Silver",
    minPoints: 1_000,
    maxPoints: 2_999,
    color: "#374151",
    bg: "#f3f4f6",
    border: "#d1d5db",
    icon: <Star size={18} />,
    multiplier: "1.5×",
    perks: ["1.5 points per ₦100 spent", "Priority customer support", "Exclusive Silver deals", "Monthly bonus challenge"],
  },
  {
    id: "gold",
    name: "Gold",
    minPoints: 3_000,
    maxPoints: 5_999,
    color: "#92400e",
    bg: "#fffbeb",
    border: "#fcd34d",
    icon: <Crown size={18} />,
    multiplier: "2×",
    perks: ["2 points per ₦100 spent", "Free transfers (3/month)", "Cashback on utility bills", "Dedicated account manager", "Early feature access"],
  },
  {
    id: "platinum",
    name: "Platinum",
    minPoints: 6_000,
    maxPoints: null,
    color: "#1e3a5f",
    bg: "#eff6ff",
    border: "#93c5fd",
    icon: <Crown size={18} />,
    multiplier: "3×",
    perks: ["3 points per ₦100 spent", "Unlimited free transfers", "5% cashback on all bills", "VIP support line", "Invite-only events", "Zero card fees"],
  },
];

const EARN_METHODS: EarnMethod[] = [
  { icon: <Send size={20} />,       title: "Send Money",         description: "Earn points on every transfer you make.",               points: "1 pt / ₦100",  color: "#EEF4FF" },
  { icon: <Smartphone size={20} />, title: "Buy Airtime & Data", description: "Top up for yourself or others and rack up points.",     points: "2 pts / ₦100", color: "#f0fdf4" },
  { icon: <Zap size={20} />,        title: "Pay Utility Bills",  description: "Electricity, TV, water — every bill pays you back.",     points: "2 pts / ₦100", color: "#fefce8" },
  { icon: <CreditCard size={20} />, title: "Card Spending",      description: "Use your SmhartPay card anywhere, online or in-store.", points: "3 pts / ₦100", color: "#fdf4ff" },
  { icon: <Users size={20} />,      title: "Refer a Friend",     description: "Get 500 bonus points for every friend who joins.",      points: "500 pts",      color: "#fff1f2" },
  { icon: <ShoppingBag size={20} />,title: "Daily Login",        description: "Log in every day to maintain and grow your streak.",    points: "10 pts/day",   color: "#f0f9ff" },
];

const REWARDS: RewardItem[] = [
  { id: "1",  title: "₦500 Airtime Voucher",      category: "Airtime",      points: 500,   value: "₦500",    icon: <Smartphone size={18} />, popular: true },
  { id: "2",  title: "₦1,000 Cashback",           category: "Cashback",     points: 950,   value: "₦1,000",  icon: <Coins size={18} />,      featured: true },
  { id: "3",  title: "1GB Data Bundle",           category: "Data",         points: 300,   value: "₦300",    icon: <Zap size={18} /> },
  { id: "4",  title: "₦2,500 Bill Payment Credit",category: "Bills",        points: 2_400, value: "₦2,500",  icon: <CreditCard size={18} />, popular: true },
  { id: "5",  title: "Free Transfer Pass (5×)",   category: "Transfers",    points: 800,   value: "₦1,000",  icon: <Send size={18} /> },
  { id: "6",  title: "₦5,000 Gift Card",          category: "Gift Cards",   points: 4_800, value: "₦5,000",  icon: <Gift size={18} />,       featured: true },
  { id: "7",  title: "10GB Data Bundle",          category: "Data",         points: 2_200, value: "₦2,500",  icon: <Zap size={18} />,        popular: true },
  { id: "8",  title: "Waived Card Fee (1 Month)", category: "Card",         points: 1_200, value: "₦1,500",  icon: <CreditCard size={18} /> },
];

const REWARD_CATEGORIES = ["All", "Airtime", "Data", "Cashback", "Bills", "Transfers", "Gift Cards", "Card"];

const RECENT_ACTIVITY: Transaction[] = [
  { id: "1", description: "Card spending — Shoprite",    points: +240,  date: "Today, 11:20 AM",    type: "earn" },
  { id: "2", description: "Redeemed ₦500 Airtime Voucher", points: -500, date: "Today, 9:00 AM",    type: "redeem" },
  { id: "3", description: "Electricity bill payment",   points: +180,  date: "Yesterday, 3:45 PM", type: "earn" },
  { id: "4", description: "Daily login streak (Day 7)", points: +70,   date: "Yesterday, 8:00 AM", type: "earn" },
  { id: "5", description: "Referral bonus — Emeka O.",  points: +500,  date: "Jun 3, 12:00 PM",    type: "earn" },
  { id: "6", description: "Airtime top-up — MTN",       points: +40,   date: "Jun 2, 6:30 PM",     type: "earn" },
];

// ── Helpers ────────────────────────────────────────────────────────────────
const currentTier = TIERS.find((t) => t.name === USER.tier)!;
const progressPct = Math.min(
  ((USER.points - currentTier.minPoints) /
    (currentTier.maxPoints! - currentTier.minPoints)) *
    100,
  100
);

// ── Sub-components ─────────────────────────────────────────────────────────
function StatCard({ value, label, sub }: { value: string; label: string; sub?: string }) {
  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-5 border border-white/20 flex flex-col">
      <span className="text-[26px] sm:text-[30px] font-bold text-white leading-none">{value}</span>
      <span className="text-[12px] text-blue-200 mt-1 font-medium">{label}</span>
      {sub && <span className="text-[11px] text-blue-300 mt-0.5">{sub}</span>}
    </div>
  );
}

function RewardCard({
  item,
  userPoints,
}: {
  item: RewardItem;
  userPoints: number;
}) {
  const canRedeem = userPoints >= item.points;

  return (
    <div className={`relative bg-white rounded-2xl border overflow-hidden flex flex-col transition-all duration-200 hover:shadow-md group ${
      item.featured ? "border-[#034EA2]/30 shadow-sm" : "border-gray-100"
    }`}>
      {/* Badge */}
      {(item.featured || item.popular) && (
        <div className={`absolute top-3 right-3 text-[10px] font-bold px-2 py-0.5 rounded-full ${
          item.featured ? "bg-[#034EA2] text-white" : "bg-amber-100 text-amber-700"
        }`}>
          {item.featured ? "✦ FEATURED" : "🔥 POPULAR"}
        </div>
      )}

      <div className="p-5 flex flex-col gap-3 flex-1">
        {/* Icon + category */}
        <div className="flex items-center gap-2">
          <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${
            item.featured ? "bg-[#EEF4FF] text-[#034EA2]" : "bg-[#F5F7FB] text-gray-500"
          }`}>
            {item.icon}
          </div>
          <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wide">{item.category}</span>
        </div>

        <div>
          <h3 className="text-[14px] font-bold text-gray-900 leading-tight mb-1">{item.title}</h3>
          <p className="text-[12px] text-gray-400">Value: <span className="font-semibold text-gray-600">{item.value}</span></p>
        </div>

        {/* Points cost */}
        <div className="flex items-center gap-1.5 mt-auto">
          <Star size={13} className="text-amber-500 fill-amber-500" />
          <span className="text-[14px] font-bold text-gray-800">{item.points.toLocaleString()}</span>
          <span className="text-[12px] text-gray-400">points</span>
        </div>
      </div>

      {/* Redeem button */}
      <div className="px-5 pb-5">
        <button
          disabled={!canRedeem}
          className={`w-full py-2.5 rounded-xl text-[13px] font-semibold flex items-center justify-center gap-1.5 transition-all duration-150 ${
            canRedeem
              ? "bg-[#034EA2] hover:bg-[#023d82] text-white cursor-pointer active:scale-[0.98]"
              : "bg-gray-100 text-gray-400 cursor-not-allowed"
          }`}
        >
          {canRedeem ? (
            <><Gift size={14} /> Redeem</>
          ) : (
            <><Info size={13} /> {item.points - userPoints} pts needed</>
          )}
        </button>
      </div>
    </div>
  );
}

// ── Main Page ──────────────────────────────────────────────────────────────
export default function RewardsPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const filteredRewards =
    activeCategory === "All"
      ? REWARDS
      : REWARDS.filter((r) => r.category === activeCategory);

  return (
    <div>
      <Navbar/>
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500;600&display=swap"
        rel="stylesheet"
      />

      <div className="min-h-screen bg-[#F5F7FB]" style={{ fontFamily: "'DM Sans', sans-serif" }}>

        {/* ════════════════════════════════════════
            HERO — Points Dashboard
        ════════════════════════════════════════ */}
        <section className="bg-[#034EA2] px-4 sm:px-6 md:px-10 lg:px-20 pt-12 pb-16 md:pt-16 md:pb-20 relative overflow-hidden">
          {/* Decorative circles */}
          <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-white/5 pointer-events-none" />
          <div className="absolute -bottom-10 -left-10 w-48 h-48 rounded-full bg-white/5 pointer-events-none" />

          <div className="max-w-6xl mx-auto relative z-10">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8">

              {/* Left — greeting + progress */}
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles size={16} className="text-amber-300" />
                  <span className="text-blue-200 text-[13px] font-medium">SmhartPay Rewards</span>
                </div>

                <h1
                  className="text-[28px] sm:text-[36px] md:text-[42px] font-bold text-white leading-tight mb-2"
                  style={{ fontFamily: "'Syne', sans-serif" }}
                >
                  Welcome back, {USER.name}!
                </h1>

                {/* Tier badge */}
                <div className="flex items-center gap-2 mb-6">
                  <span className="flex items-center gap-1.5 bg-amber-400/20 border border-amber-300/30 text-amber-200 text-[12px] font-bold px-3 py-1 rounded-full">
                    <Crown size={12} /> {USER.tier} Member
                  </span>
                  {USER.streak > 0 && (
                    <span className="flex items-center gap-1 bg-orange-400/20 border border-orange-300/30 text-orange-200 text-[12px] font-bold px-3 py-1 rounded-full">
                      <Flame size={12} /> {USER.streak}-day streak
                    </span>
                  )}
                </div>

                {/* Points balance */}
                <div className="mb-6">
                  <div className="flex items-end gap-2 mb-1">
                    <span className="text-[52px] sm:text-[64px] font-bold text-white leading-none" style={{ fontFamily: "'Syne', sans-serif" }}>
                      {USER.points.toLocaleString()}
                    </span>
                    <span className="text-blue-300 text-[16px] font-medium mb-3">points</span>
                  </div>
                  <p className="text-blue-200 text-[13px]">
                    Earn <span className="text-white font-semibold">{USER.pointsToNext.toLocaleString()} more points</span> to reach{" "}
                    <span className="text-amber-300 font-semibold">{USER.nextTier}</span>
                  </p>
                </div>

                {/* Progress bar */}
                <div className="max-w-md">
                  <div className="flex justify-between text-[11px] text-blue-300 mb-2">
                    <span>{USER.tier} — {currentTier.minPoints.toLocaleString()} pts</span>
                    <span>{USER.nextTier} — {(currentTier.maxPoints! + 1).toLocaleString()} pts</span>
                  </div>
                  <div className="h-3 bg-white/20 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-amber-300 to-amber-400 rounded-full transition-all duration-700"
                      style={{ width: `${progressPct}%` }}
                    />
                  </div>
                  <p className="text-[11px] text-blue-300 mt-1.5 text-right">{Math.round(progressPct)}% to {USER.nextTier}</p>
                </div>
              </div>

              {/* Right — stats grid */}
              <div className="grid grid-cols-2 gap-3 lg:w-72 lg:flex-shrink-0">
                <StatCard value={USER.points.toLocaleString()} label="Available Points" sub="Redeemable now" />
                <StatCard value={USER.totalEarned.toLocaleString()} label="Total Earned" sub="All time" />
                <StatCard value={currentTier.multiplier} label="Your Multiplier" sub="Points per ₦100" />
                <StatCard value={`${USER.streak}`} label="Day Streak" sub="+10 pts/day" />
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════
            TIER OVERVIEW
        ════════════════════════════════════════ */}
        <section className="px-4 sm:px-6 md:px-10 lg:px-20 py-12 md:py-16">
          <div className="max-w-6xl mx-auto">
            <div className="mb-8">
              <h2
                className="text-[20px] sm:text-[24px] md:text-[28px] font-bold text-[#1A202E]"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                Rewards Tiers
              </h2>
              <p className="text-[14px] text-[#64748B] mt-1">
                The more you use SmhartPay, the more you earn — and the better your benefits get.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {TIERS.map((tier) => {
                const isActive = tier.name === USER.tier;
                return (
                  <div
                    key={tier.id}
                    className={`relative rounded-2xl border-2 p-5 flex flex-col gap-4 transition-all ${
                      isActive
                        ? "border-[#034EA2] shadow-md bg-white"
                        : "border-transparent bg-white hover:border-gray-200"
                    }`}
                  >
                    {isActive && (
                      <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#034EA2] text-white text-[10px] font-bold px-3 py-1 rounded-full whitespace-nowrap">
                        YOUR TIER
                      </span>
                    )}

                    {/* Tier header */}
                    <div className="flex items-center justify-between">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center"
                        style={{ background: tier.bg, color: tier.color }}
                      >
                        {tier.icon}
                      </div>
                      <span
                        className="text-[12px] font-bold px-2.5 py-1 rounded-full"
                        style={{ background: tier.bg, color: tier.color }}
                      >
                        {tier.multiplier}
                      </span>
                    </div>

                    <div>
                      <h3
                        className="text-[16px] font-bold mb-0.5"
                        style={{ color: tier.color }}
                      >
                        {tier.name}
                      </h3>
                      <p className="text-[12px] text-gray-400">
                        {tier.minPoints.toLocaleString()}
                        {tier.maxPoints ? `–${tier.maxPoints.toLocaleString()}` : "+"} pts
                      </p>
                    </div>

                    <ul className="flex flex-col gap-2">
                      {tier.perks.map((perk, i) => (
                        <li key={i} className="flex items-start gap-2 text-[12px] text-[#64748B]">
                          <CheckCircle2 size={13} className="text-[#034EA2] flex-shrink-0 mt-0.5" />
                          {perk}
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════
            HOW TO EARN
        ════════════════════════════════════════ */}
        <section className="bg-white border-y border-gray-100 px-4 sm:px-6 md:px-10 lg:px-20 py-12 md:py-16">
          <div className="max-w-6xl mx-auto">
            <div className="mb-8">
              <h2
                className="text-[20px] sm:text-[24px] md:text-[28px] font-bold text-[#1A202E]"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                How to Earn Points
              </h2>
              <p className="text-[14px] text-[#64748B] mt-1">
                Every action on SmhartPay puts points in your pocket.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {EARN_METHODS.map(({ icon, title, description, points, color }) => (
                <div
                  key={title}
                  className="flex items-start gap-4 p-5 rounded-2xl border border-gray-100 hover:shadow-sm hover:border-[#034EA2]/20 transition-all group cursor-default"
                >
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 text-[#034EA2] group-hover:scale-110 transition-transform"
                    style={{ background: color }}
                  >
                    {icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 flex-wrap">
                      <h3 className="text-[14px] font-bold text-gray-900">{title}</h3>
                      <span className="flex items-center gap-1 bg-amber-50 text-amber-700 text-[11px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap flex-shrink-0">
                        <Star size={10} className="fill-white" /> {points}
                      </span>
                    </div>
                    <p className="text-[12px] text-[#64748B] mt-1 leading-relaxed">{description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Multiplier callout */}
            <div className="mt-6 flex items-start gap-3 bg-[#EEF4FF] rounded-2xl p-5 border border-[#034EA2]/10">
              <TrendingUp size={18} className="text-[#034EA2] flex-shrink-0 mt-0.5" />
              <p className="text-[13px] text-[#034EA2] leading-relaxed">
                <strong>Tier multipliers apply to all earn methods.</strong> As a Gold member, you currently earn{" "}
                <strong>2× points</strong> on everything. Reach Platinum to unlock 3× points on all transactions.
              </p>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════
            REDEEM REWARDS
        ════════════════════════════════════════ */}
        <section className="px-4 sm:px-6 md:px-10 lg:px-20 py-12 md:py-16">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6">
              <div>
                <h2
                  className="text-[20px] sm:text-[24px] md:text-[28px] font-bold text-[#1A202E]"
                  style={{ fontFamily: "'Syne', sans-serif" }}
                >
                  Redeem Your Points
                </h2>
                <p className="text-[14px] text-[#64748B] mt-1">
                  You have <span className="font-bold text-[#034EA2]">{USER.points.toLocaleString()} points</span> available.
                </p>
              </div>
              <div className="flex items-center gap-1.5 text-[13px] text-[#64748B] bg-white border border-gray-200 px-3 py-2 rounded-xl">
                <Star size={13} className="text-amber-500 fill-amber-500" />
                {USER.points.toLocaleString()} pts available
              </div>
            </div>

            {/* Category filter */}
            <div className="flex gap-2 flex-wrap mb-6">
              {REWARD_CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-1.5 rounded-full text-[12px] font-semibold transition-all cursor-pointer ${
                    activeCategory === cat
                      ? "bg-[#034EA2] text-white"
                      : "bg-white border border-gray-200 text-gray-600 hover:border-[#034EA2]/50 hover:text-[#034EA2]"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Rewards grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {filteredRewards.map((item) => (
                <RewardCard key={item.id} item={item} userPoints={USER.points} />
              ))}
            </div>

            {filteredRewards.length === 0 && (
              <div className="bg-white rounded-2xl border border-gray-100 py-14 flex flex-col items-center gap-3 text-center">
                <Gift size={32} className="text-gray-300" />
                <p className="text-[14px] font-semibold text-gray-600">No rewards in this category yet.</p>
                <p className="text-[13px] text-gray-400">Check back soon — new rewards are added regularly.</p>
              </div>
            )}
          </div>
        </section>

        {/* ════════════════════════════════════════
            RECENT ACTIVITY
        ════════════════════════════════════════ */}
        <section className="bg-white border-y border-gray-100 px-4 sm:px-6 md:px-10 lg:px-20 py-12 md:py-16">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <h2
                className="text-[20px] sm:text-[24px] md:text-[28px] font-bold text-[#1A202E]"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                Points Activity
              </h2>
              <a
                href="/transactions"
                className="flex items-center gap-1 text-[13px] text-[#034EA2] font-medium hover:underline"
              >
                View all <ArrowRight size={13} />
              </a>
            </div>

            <div className="flex flex-col divide-y divide-gray-50">
              {RECENT_ACTIVITY.map((tx) => (
                <div key={tx.id} className="flex items-center justify-between gap-4 py-4 hover:bg-gray-50/60 px-2 rounded-xl transition-colors">
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 ${
                      tx.type === "earn" ? "bg-emerald-50 text-emerald-600" : "bg-orange-50 text-orange-600"
                    }`}>
                      {tx.type === "earn" ? <TrendingUp size={15} /> : <Gift size={15} />}
                    </div>
                    <div>
                      <p className="text-[13px] font-semibold text-gray-800 leading-tight">{tx.description}</p>
                      <div className="flex items-center gap-1 mt-0.5 text-[11px] text-gray-400">
                        <Clock size={10} /> {tx.date}
                      </div>
                    </div>
                  </div>
                  <span className={`text-[14px] font-bold flex-shrink-0 ${
                    tx.type === "earn" ? "text-emerald-600" : "text-orange-500"
                  }`}>
                    {tx.type === "earn" ? "+" : ""}{tx.points.toLocaleString()} pts
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════
            FAQ
        ════════════════════════════════════════ */}
        <section className="bg-white border-t border-gray-100 px-4 sm:px-6 md:px-10 lg:px-20 py-12 md:py-16">
          <div className="max-w-6xl mx-auto">
            <div className="mb-8">
              <h2
                className="text-[20px] sm:text-[24px] md:text-[28px] font-bold text-[#1A202E]"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                Frequently Asked Questions
              </h2>
              <p className="text-[14px] text-[#64748B] mt-1">Everything you need to know about SmhartPay Rewards.</p>
            </div>

            <div className="flex flex-col divide-y divide-gray-100 max-w-3xl">
              {[
                {
                  q: "When do my points expire?",
                  a: "Points are valid for 12 months from the date they were earned. Any activity (earning or redeeming) within a 12-month period resets the expiry clock on all your points.",
                },
                {
                  q: "How quickly are points credited after a transaction?",
                  a: "Points are credited to your account within minutes of a completed transaction. Referral bonuses are credited once your referred friend completes their first transaction.",
                },
                {
                  q: "Can I transfer my points to someone else?",
                  a: "Points are non-transferable and are tied to your individual SmhartPay account. They cannot be sold, gifted, or moved to another user's account.",
                },
                {
                  q: "What happens to my tier if my points drop?",
                  a: "Your tier is calculated based on your cumulative points earned over a rolling 12-month period. If your earned points fall below a tier threshold, you will be moved to the appropriate tier at the next monthly review.",
                },
                {
                  q: "Is there a minimum number of points needed to redeem?",
                  a: "Yes. The minimum redemption is 300 points. Different rewards have different point requirements, which are displayed on each reward card.",
                },
                {
                  q: "How do I climb tiers faster?",
                  a: "Use your SmhartPay card for everyday spending, pay your utility bills through the app, maintain your daily login streak, and refer friends. Card spending earns the highest base rate at 3 pts per ₦100, and your tier multiplier applies on top.",
                },
              ].map(({ q, a }, i) => (
                <details
                  key={i}
                  className="group py-4"
                  open={openFaq === i}
                  onClick={(e) => {
                    e.preventDefault();
                    setOpenFaq(openFaq === i ? null : i);
                  }}
                >
                  <summary className="flex items-center justify-between cursor-pointer list-none text-[14px] font-semibold text-gray-700 group-open:text-[#034EA2]">
                    {q}
                    <ChevronDown
                      size={16}
                      className={`text-gray-400 transition-transform flex-shrink-0 ml-4 ${openFaq === i ? "rotate-180 text-[#034EA2]" : ""}`}
                    />
                  </summary>
                  {openFaq === i && (
                    <p className="mt-3 text-[13px] text-[#64748B] leading-relaxed">{a}</p>
                  )}
                </details>
              ))}
            </div>

            {/* Still have questions */}
            <p className="mt-8 text-[13px] text-gray-500">
              Still have questions?{" "}
              <a href="/contact" className="text-[#034EA2] font-medium hover:underline">
                Contact our support team →
              </a>
            </p>
          </div>
        </section>

        {/* ════════════════════════════════════════
            DOWNLOAD CTA
        ════════════════════════════════════════ */}
        <section className="bg-[#034EA2] px-4 sm:px-6 md:px-10 lg:px-20 py-12 md:py-16 relative overflow-hidden">
          <div className="absolute -top-16 -right-16 w-60 h-60 rounded-full bg-white/5 pointer-events-none" />
          <div className="max-w-6xl mx-auto relative z-10">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
              <div>
                <h2
                  className="text-[22px] sm:text-[26px] font-bold text-white mb-2"
                  style={{ fontFamily: "'Syne', sans-serif" }}
                >
                  Start Earning on the Go
                </h2>
                <p className="text-blue-200 text-[14px] max-w-md">
                  Download the SmhartPay app to track your points, redeem rewards, and level up your tier — anytime, anywhere.
                </p>
              </div>
              <div className="flex flex-wrap gap-3 justify-center sm:justify-end flex-shrink-0">
                <a href="https://play.google.com/store" target="_blank" rel="noopener noreferrer">
                  <img src="/images/store2.svg" alt="Google Play" className="h-11 w-auto cursor-pointer" />
                </a>
                <a href="https://www.apple.com/app-store/" target="_blank" rel="noopener noreferrer">
                  <img src="/images/store1.svg" alt="App Store" className="h-11 w-auto cursor-pointer" />
                </a>
              </div>
            </div>
          </div>
        </section>

      </div>
    </>
    <Footer2/>
    </div>
  );
}