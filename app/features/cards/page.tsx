"use client";

import Footer from "@/Components/layout/footer";
import Navbar from "@/Components/layout/Navbar";
import { useState } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

type CardStatus = "active" | "frozen" | "blocked";
type CardType = "virtual" | "physical";
type CardNetwork = "visa" | "mastercard";

type CardData = {
  id: string;
  label: string;
  type: CardType;
  network: CardNetwork;
  last4: string;
  expiry: string;
  cvv: string;
  holderName: string;
  status: CardStatus;
  balance: number;
  spent: number;
  limit: number;
  color: string;
  issued: string;
};

type Transaction = {
  id: string;
  title: string;
  category: string;
  icon: string;
  amount: number;
  type: "debit" | "credit";
  date: string;
  cardId: string;
};

// ─── Mock Data ────────────────────────────────────────────────────────────────

const CARDS: CardData[] = [
  {
    id: "c1",
    label: "Primary",
    type: "physical",
    network: "visa",
    last4: "4821",
    expiry: "09/27",
    cvv: "412",
    holderName: "ADEBAYO MICHAEL",
    status: "active",
    balance: 12480.50,
    spent: 45200,
    limit: 100000,
    color: "card-dark",
    issued: "Oct 2023",
  },
  {
    id: "c2",
    label: "Savings",
    type: "physical",
    network: "mastercard",
    last4: "7093",
    expiry: "03/26",
    cvv: "881",
    holderName: "ADEBAYO MICHAEL",
    status: "active",
    balance: 5340.00,
    spent: 12800,
    limit: 50000,
    color: "card-green",
    issued: "Mar 2022",
  },
  {
    id: "c3",
    label: "Shopping",
    type: "virtual",
    network: "visa",
    last4: "2290",
    expiry: "12/25",
    cvv: "339",
    holderName: "ADEBAYO MICHAEL",
    status: "frozen",
    balance: 800.00,
    spent: 3100,
    limit: 10000,
    color: "card-gold",
    issued: "Jan 2024",
  },
];

const TRANSACTIONS: Transaction[] = [
  { id: "t1", title: "Shoprite Lagos", category: "Groceries", icon: "🛒", amount: 4820, type: "debit", date: "Today, 11:02 AM", cardId: "c1" },
  { id: "t2", title: "Spotify Premium", category: "Entertainment", icon: "🎵", amount: 1200, type: "debit", date: "Today, 08:00 AM", cardId: "c1" },
  { id: "t3", title: "Salary Inflow", category: "Income", icon: "💰", amount: 350000, type: "credit", date: "Yesterday, 09:00 AM", cardId: "c1" },
  { id: "t4", title: "Amazon Purchase", category: "Shopping", icon: "📦", amount: 18500, type: "debit", date: "Jun 4, 3:45 PM", cardId: "c3" },
  { id: "t5", title: "Netflix", category: "Entertainment", icon: "🎬", amount: 4200, type: "debit", date: "Jun 4, 12:00 AM", cardId: "c2" },
  { id: "t6", title: "Bolt Ride", category: "Transport", icon: "🚗", amount: 1600, type: "debit", date: "Jun 3, 07:30 PM", cardId: "c1" },
  { id: "t7", title: "Freelance Payment", category: "Income", icon: "💼", amount: 75000, type: "credit", date: "Jun 3, 02:00 PM", cardId: "c2" },
  { id: "t8", title: "DSTV Subscription", category: "Utilities", icon: "📺", amount: 9900, type: "debit", date: "Jun 2, 10:00 AM", cardId: "c1" },
];

// ─── Card Visual ──────────────────────────────────────────────────────────────

const CARD_GRADIENTS: Record<string, string> = {
  "card-dark": "from-[#0f0f1a] via-[#1a1a2e] to-[#16213e]",
  "card-green": "from-[#134e2a] via-[#1a6b38] to-[#0d7a45]",
  "card-gold": "from-[#78530a] via-[#b8740f] to-[#d4960a]",
};

const CARD_SHIMMER: Record<string, string> = {
  "card-dark": "from-blue-400/10 via-purple-400/10 to-transparent",
  "card-green": "from-emerald-300/15 via-teal-300/10 to-transparent",
  "card-gold": "from-yellow-200/20 via-amber-300/10 to-transparent",
};

function CardVisual({
  card,
  reveal,
  onToggleReveal,
}: {
  card: CardData;
  reveal: boolean;
  onToggleReveal: () => void;
}) {
  const [flipped, setFlipped] = useState(false);

  const statusBadge: Record<CardStatus, string> = {
    active: "bg-emerald-400/20 text-emerald-300 border-emerald-400/30",
    frozen: "bg-sky-400/20 text-sky-300 border-sky-400/30",
    blocked: "bg-rose-400/20 text-rose-300 border-rose-400/30",
  };

  return (
    <div className="w-full select-none" style={{ perspective: "1200px" }}>
      <div
        className="relative w-full cursor-pointer"
        style={{
          height: "220px",
          transformStyle: "preserve-3d",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0)",
          transition: "transform 0.55s cubic-bezier(0.4,0,0.2,1)",
        }}
        onClick={() => setFlipped((f) => !f)}
      >
        {/* ── Front ── */}
        <div
          className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${CARD_GRADIENTS[card.color]} p-6 shadow-2xl overflow-hidden`}
          style={{ backfaceVisibility: "hidden" }}
        >
          {/* Shimmer overlay */}
          <div className={`pointer-events-none absolute inset-0 bg-gradient-to-tr ${CARD_SHIMMER[card.color]} rounded-3xl`} />
          {/* Decorative circles */}
          <div className="pointer-events-none absolute -right-10 -top-10 h-48 w-48 rounded-full bg-white/5" />
          <div className="pointer-events-none absolute -bottom-16 -left-10 h-56 w-56 rounded-full bg-white/5" />

          {/* Top row */}
          <div className="relative flex items-start justify-between mb-8">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">{card.type} card</p>
              <p className="text-sm font-semibold text-white/80 mt-0.5">{card.label}</p>
            </div>
            <div className="flex flex-col items-end gap-1.5">
              <span className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${statusBadge[card.status]}`}>
                {card.status}
              </span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-white/50">{card.network}</span>
            </div>
          </div>

          {/* Chip + PAN */}
          <div className="relative flex items-center gap-4 mb-5">
            <div className="h-8 w-11 rounded-md border border-white/20 bg-gradient-to-br from-amber-200/40 to-amber-300/20" />
            <p className="font-mono text-base tracking-[0.22em] text-white/90">
              {reveal ? `${card.last4.padStart(16, "•").replace(/(.{4})/g, "$1 ").trim()}` : `•••• •••• •••• ${card.last4}`}
            </p>
          </div>

          {/* Footer */}
          <div className="relative flex items-end justify-between">
            <div>
              <p className="text-[9px] uppercase tracking-widest text-white/30">Card Holder</p>
              <p className="font-mono text-xs text-white/80 mt-0.5">{card.holderName}</p>
            </div>
            <div className="text-center">
              <p className="text-[9px] uppercase tracking-widest text-white/30">Expires</p>
              <p className="font-mono text-xs text-white/80 mt-0.5">{card.expiry}</p>
            </div>
            <div className="text-right">
              <p className="text-[9px] uppercase tracking-widest text-white/30">Balance</p>
              <p className="text-sm font-bold text-white mt-0.5">
                ₦{card.balance.toLocaleString("en-NG", { minimumFractionDigits: 2 })}
              </p>
            </div>
          </div>
        </div>

        {/* ── Back ── */}
        <div
          className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${CARD_GRADIENTS[card.color]} p-6 shadow-2xl overflow-hidden`}
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent rounded-3xl" />
          {/* Magnetic strip */}
          <div className="mt-4 h-10 w-full bg-black/60 rounded-sm" />
          {/* Signature + CVV */}
          <div className="mt-4 flex items-center gap-3">
            <div className="flex-1 h-8 rounded bg-white/10 border border-white/10 px-3 flex items-center">
              <div className="h-0.5 w-full bg-white/20" />
            </div>
            <div className="flex flex-col items-center">
              <p className="text-[9px] text-white/40 uppercase tracking-widest">CVV</p>
              <p className="font-mono text-sm font-bold text-white">{reveal ? card.cvv : "•••"}</p>
            </div>
          </div>
          <button
            onClick={(e) => { e.stopPropagation(); onToggleReveal(); }}
            className="mt-4 text-xs text-white/50 hover:text-white/80 transition underline"
          >
            {reveal ? "Hide details" : "Reveal CVV"}
          </button>
          <p className="absolute bottom-5 left-1/2 -translate-x-1/2 text-[10px] text-white/25 whitespace-nowrap">
            Tap card to flip back
          </p>
        </div>
      </div>
      <p className="mt-2 text-center text-[11px] text-slate-400">Tap card to flip</p>
    </div>
  );
}

// ─── Toggle Switch ────────────────────────────────────────────────────────────

function Toggle({ value, onChange }: { value: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      onClick={() => onChange(!value)}
      className={`relative h-6 w-11 flex-shrink-0 rounded-full transition-colors ${value ? "bg-emerald-500" : "bg-slate-200 dark:bg-slate-700"}`}
    >
      <div className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow transition-transform ${value ? "translate-x-5" : "translate-x-1"}`} />
    </button>
  );
}

// ─── Stat Pill ────────────────────────────────────────────────────────────────

function StatPill({ label, value, sub, accent }: { label: string; value: string; sub?: string; accent?: string }) {
  return (
    <div className="flex flex-col gap-1 rounded-2xl bg-white p-4 ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-800">
      <p className="text-[11px] font-medium uppercase tracking-widest text-slate-400">{label}</p>
      <p className={`text-xl font-bold ${accent ?? "text-slate-900 dark:text-white"}`}>{value}</p>
      {sub && <p className="text-xs text-slate-400">{sub}</p>}
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function CardPage() {
  const [activeCardId, setActiveCardId] = useState(CARDS[0].id);
  const [revealDetails, setRevealDetails] = useState(false);
  const [showAddCard, setShowAddCard] = useState(false);
  const [showLimitModal, setShowLimitModal] = useState(false);
  const [txFilter, setTxFilter] = useState<"all" | "debit" | "credit">("all");
  const [activeTab, setActiveTab] = useState<"overview" | "settings" | "transactions">("overview");

  const card = CARDS.find((c) => c.id === activeCardId)!;
  const cardTxns = TRANSACTIONS.filter((t) => t.cardId === activeCardId);
  const filteredTxns = txFilter === "all" ? cardTxns : cardTxns.filter((t) => t.type === txFilter);

  const [controls, setControls] = useState({
    contactless: true,
    onlinePurchases: true,
    internationalUse: false,
    atmWithdrawals: true,
    posPayments: true,
    notifications: true,
  });

  const spentPct = Math.min((card.spent / card.limit) * 100, 100);

  const statusActions: Record<CardStatus, { label: string; next: CardStatus; color: string }> = {
    active: { label: "Freeze Card", next: "frozen", color: "text-sky-600 bg-sky-50 hover:bg-sky-100 dark:bg-sky-900/20 dark:text-sky-400" },
    frozen: { label: "Unfreeze Card", next: "active", color: "text-emerald-600 bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-900/20 dark:text-emerald-400" },
    blocked: { label: "Card Blocked", next: "blocked", color: "text-rose-400 bg-rose-50 dark:bg-rose-900/20 cursor-not-allowed" },
  };

  const [cardStatuses, setCardStatuses] = useState<Record<string, CardStatus>>(
    Object.fromEntries(CARDS.map((c) => [c.id, c.status]))
  );

  const currentStatus = cardStatuses[activeCardId];
  const statusAction = statusActions[currentStatus];

  const toggleStatus = () => {
    if (currentStatus === "blocked") return;
    setCardStatuses((s) => ({ ...s, [activeCardId]: statusAction.next }));
  };

  return (
    <div>
        <Navbar />
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8">

        {/* ── Header ─────────────────────────────────────────────────────── */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-medium text-slate-400">SmhartPay</p>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">My Cards</h1>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setShowAddCard(true)}
              className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
            >
              <span>＋</span> New Card
            </button>
            <button className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400">
              ⚙
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">

          {/* ── LEFT COLUMN ─────────────────────────────────────────────── */}
          <div className="flex flex-col gap-5">

            {/* Card selector */}
            <div className="rounded-2xl bg-white p-5 ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-800">
              {/* Card visual */}
              <CardVisual
                card={{ ...card, status: currentStatus }}
                reveal={revealDetails}
                onToggleReveal={() => setRevealDetails((r) => !r)}
              />

              {/* Card tabs */}
              <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
                {CARDS.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => { setActiveCardId(c.id); setRevealDetails(false); }}
                    className={`flex-shrink-0 flex flex-col items-start gap-0.5 rounded-xl border px-3 py-2 transition ${
                      c.id === activeCardId
                        ? "border-emerald-400 bg-emerald-50 dark:bg-emerald-900/20"
                        : "border-slate-200 hover:border-slate-300 dark:border-slate-700 dark:hover:border-slate-600"
                    }`}
                  >
                    <p className={`text-xs font-semibold ${c.id === activeCardId ? "text-emerald-700 dark:text-emerald-400" : "text-slate-600 dark:text-slate-400"}`}>
                      {c.label}
                    </p>
                    <p className="font-mono text-[10px] text-slate-400">···· {c.last4}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Quick card info */}
            <div className="rounded-2xl bg-white p-5 ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-800">
              <h3 className="mb-4 text-sm font-semibold text-slate-600 dark:text-slate-400">Card Details</h3>
              <div className="flex flex-col gap-3">
                {[
                  ["Type", card.type.charAt(0).toUpperCase() + card.type.slice(1)],
                  ["Network", card.network.toUpperCase()],
                  ["Issued", card.issued],
                  ["Expiry", card.expiry],
                  ["Status", currentStatus.charAt(0).toUpperCase() + currentStatus.slice(1)],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between text-sm">
                    <span className="text-slate-400">{k}</span>
                    <span className={`font-medium ${
                      k === "Status"
                        ? currentStatus === "active" ? "text-emerald-600 dark:text-emerald-400"
                        : currentStatus === "frozen" ? "text-sky-600 dark:text-sky-400"
                        : "text-rose-500"
                        : "text-slate-700 dark:text-slate-200"
                    }`}>{v}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick actions */}
            <div className="rounded-2xl bg-white p-5 ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-800">
              <h3 className="mb-4 text-sm font-semibold text-slate-600 dark:text-slate-400">Card Actions</h3>
              <div className="flex flex-col gap-2">
                <button
                  onClick={toggleStatus}
                  className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${statusAction.color}`}
                >
                  <span>{currentStatus === "frozen" ? "❄️" : currentStatus === "blocked" ? "🚫" : "🔒"}</span>
                  {statusAction.label}
                </button>
                <button
                  onClick={() => setShowLimitModal(true)}
                  className="flex w-full items-center gap-3 rounded-xl bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-100 dark:bg-slate-800/60 dark:text-slate-300 dark:hover:bg-slate-800"
                >
                  <span>📊</span> Manage Limits
                </button>
                <button className="flex w-full items-center gap-3 rounded-xl bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-100 dark:bg-slate-800/60 dark:text-slate-300 dark:hover:bg-slate-800">
                  <span>📱</span> Add to Apple/Google Pay
                </button>
                <button className="flex w-full items-center gap-3 rounded-xl bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-100 dark:bg-slate-800/60 dark:text-slate-300 dark:hover:bg-slate-800">
                  <span>📋</span> Request Statement
                </button>
                <button className="flex w-full items-center gap-3 rounded-xl bg-rose-50 px-4 py-3 text-sm font-medium text-rose-600 hover:bg-rose-100 dark:bg-rose-900/20 dark:text-rose-400">
                  <span>🚫</span> Report Lost / Stolen
                </button>
              </div>
            </div>
          </div>

          {/* ── RIGHT COLUMN ────────────────────────────────────────────── */}
          <div className="flex flex-col gap-5 lg:col-span-2">

            {/* Stats row */}
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              <StatPill
                label="Balance"
                value={`₦${(card.balance / 1000).toFixed(1)}k`}
                sub="Available"
                accent="text-slate-900 dark:text-white"
              />
              <StatPill
                label="Spent"
                value={`₦${(card.spent / 1000).toFixed(1)}k`}
                sub="This month"
                accent="text-rose-500"
              />
              <StatPill
                label="Limit"
                value={`₦${(card.limit / 1000).toFixed(0)}k`}
                sub="Monthly cap"
              />
              <StatPill
                label="Utilization"
                value={`${spentPct.toFixed(0)}%`}
                sub="Of limit used"
                accent={spentPct > 80 ? "text-rose-500" : spentPct > 50 ? "text-amber-500" : "text-emerald-600 dark:text-emerald-400"}
              />
            </div>

            {/* Spending progress */}
            <div className="rounded-2xl bg-white p-5 ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-800">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300">Monthly Spending</h3>
                <span className="text-xs text-slate-400">₦{card.spent.toLocaleString("en-NG")} / ₦{card.limit.toLocaleString("en-NG")}</span>
              </div>
              <div className="h-3 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                <div
                  className={`h-3 rounded-full transition-all duration-700 ${
                    spentPct > 80 ? "bg-rose-400" : spentPct > 50 ? "bg-amber-400" : "bg-emerald-500"
                  }`}
                  style={{ width: `${spentPct}%` }}
                />
              </div>
              <div className="mt-3 grid grid-cols-3 gap-2">
                {[
                  { label: "Shopping", pct: 38, color: "bg-violet-400" },
                  { label: "Food & Dining", pct: 27, color: "bg-orange-400" },
                  { label: "Bills & Utilities", pct: 21, color: "bg-sky-400" },
                  { label: "Transport", pct: 9, color: "bg-pink-400" },
                  { label: "Entertainment", pct: 5, color: "bg-emerald-400" },
                ].map(({ label, pct, color }) => (
                  <div key={label} className="flex items-center gap-2">
                    <div className={`h-2 w-2 flex-shrink-0 rounded-full ${color}`} />
                    <div className="min-w-0">
                      <p className="truncate text-[10px] text-slate-500 dark:text-slate-400">{label}</p>
                      <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">{pct}%</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tab navigation */}
            <div className="flex gap-1 rounded-xl bg-slate-100 p-1 dark:bg-slate-800/60">
              {(["overview", "transactions", "settings"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setActiveTab(t)}
                  className={`flex-1 rounded-lg py-2 text-xs font-semibold capitalize transition ${
                    activeTab === t
                      ? "bg-white shadow-sm text-slate-800 dark:bg-slate-900 dark:text-white"
                      : "text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            {/* ── OVERVIEW TAB ────────────────────────────────────────────── */}
            {activeTab === "overview" && (
              <div className="flex flex-col gap-4">
                {/* Security score */}
                <div className="rounded-2xl bg-white p-5 ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-800">
                  <h3 className="mb-4 text-sm font-semibold text-slate-700 dark:text-slate-300">Security Score</h3>
                  <div className="flex items-center gap-6">
                    <div className="relative flex-shrink-0">
                      <svg width="80" height="80" viewBox="0 0 80 80">
                        <circle cx="40" cy="40" r="32" fill="none" stroke="#f1f5f9" strokeWidth="8" />
                        <circle
                          cx="40" cy="40" r="32"
                          fill="none"
                          stroke="#10b981"
                          strokeWidth="8"
                          strokeDasharray={`${2 * Math.PI * 32}`}
                          strokeDashoffset={`${2 * Math.PI * 32 * (1 - 0.78)}`}
                          strokeLinecap="round"
                          transform="rotate(-90 40 40)"
                        />
                      </svg>
                      <span className="absolute inset-0 flex items-center justify-center text-sm font-bold text-slate-800 dark:text-white">78%</span>
                    </div>
                    <div className="flex flex-col gap-2 text-sm">
                      {[
                        { label: "2FA Enabled", ok: true },
                        { label: "Transaction Alerts", ok: true },
                        { label: "International Use Off", ok: false },
                        { label: "Spending Limit Set", ok: true },
                      ].map(({ label, ok }) => (
                        <div key={label} className="flex items-center gap-2">
                          <span className={ok ? "text-emerald-500" : "text-amber-400"}>
                            {ok ? "✓" : "⚠"}
                          </span>
                          <span className={ok ? "text-slate-600 dark:text-slate-400" : "text-amber-600 dark:text-amber-400"}>
                            {label}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Recent activity for this card */}
                <div className="rounded-2xl bg-white p-5 ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-800">
                  <h3 className="mb-4 text-sm font-semibold text-slate-700 dark:text-slate-300">Recent Activity</h3>
                  {cardTxns.slice(0, 4).map((tx) => (
                    <div key={tx.id} className="flex items-center gap-3 rounded-xl px-3 py-2.5 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition">
                      <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-slate-100 text-lg dark:bg-slate-800">
                        {tx.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="truncate text-sm font-medium text-slate-800 dark:text-slate-100">{tx.title}</p>
                        <p className="text-xs text-slate-400">{tx.date}</p>
                      </div>
                      <span className={`text-sm font-semibold ${tx.type === "credit" ? "text-emerald-600 dark:text-emerald-400" : "text-slate-800 dark:text-slate-100"}`}>
                        {tx.type === "credit" ? "+" : "−"}₦{tx.amount.toLocaleString("en-NG")}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Linked accounts / services */}
                <div className="rounded-2xl bg-white p-5 ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-800">
                  <h3 className="mb-4 text-sm font-semibold text-slate-700 dark:text-slate-300">Linked Subscriptions</h3>
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                    {[
                      { name: "Spotify", icon: "🎵", amount: "₦1,200/mo" },
                      { name: "Netflix", icon: "🎬", amount: "₦4,200/mo" },
                      { name: "DSTV", icon: "📺", amount: "₦9,900/mo" },
                      { name: "iCloud", icon: "☁️", amount: "₦499/mo" },
                    ].map(({ name, icon, amount }) => (
                      <div key={name} className="flex flex-col items-center gap-2 rounded-xl bg-slate-50 p-3 text-center dark:bg-slate-800/60">
                        <span className="text-2xl">{icon}</span>
                        <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">{name}</p>
                        <p className="text-[10px] text-slate-400">{amount}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ── TRANSACTIONS TAB ─────────────────────────────────────────── */}
            {activeTab === "transactions" && (
              <div className="rounded-2xl bg-white ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-800">
                <div className="border-b border-slate-100 p-5 dark:border-slate-800">
                  <div className="mb-3 flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300">Transactions</h3>
                    <button className="text-xs font-medium text-emerald-600 hover:underline dark:text-emerald-400">Export</button>
                  </div>
                  <div className="flex gap-2">
                    {(["all", "debit", "credit"] as const).map((f) => (
                      <button
                        key={f}
                        onClick={() => setTxFilter(f)}
                        className={`rounded-full px-3 py-1 text-xs font-medium transition ${
                          txFilter === f
                            ? "bg-emerald-500 text-white"
                            : "bg-slate-100 text-slate-500 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-400"
                        }`}
                      >
                        {f.charAt(0).toUpperCase() + f.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="p-3">
                  {filteredTxns.length === 0 ? (
                    <p className="py-10 text-center text-sm text-slate-400">No transactions found.</p>
                  ) : (
                    filteredTxns.map((tx) => (
                      <div key={tx.id} className="flex items-center gap-3 rounded-xl px-3 py-3 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition">
                        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-slate-100 text-xl dark:bg-slate-800">
                          {tx.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="truncate text-sm font-medium text-slate-800 dark:text-slate-100">{tx.title}</p>
                          <p className="text-xs text-slate-400">{tx.category} · {tx.date}</p>
                        </div>
                        <div className="flex flex-col items-end gap-1">
                          <span className={`text-sm font-semibold ${tx.type === "credit" ? "text-emerald-600 dark:text-emerald-400" : "text-slate-800 dark:text-slate-100"}`}>
                            {tx.type === "credit" ? "+" : "−"}₦{tx.amount.toLocaleString("en-NG")}
                          </span>
                          <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${
                            tx.type === "credit"
                              ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400"
                              : "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400"
                          }`}>
                            {tx.type}
                          </span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
                <div className="border-t border-slate-100 p-4 dark:border-slate-800">
                  <button className="w-full rounded-xl border border-slate-200 py-2.5 text-sm font-medium text-slate-500 hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800">
                    Load more
                  </button>
                </div>
              </div>
            )}

            {/* ── SETTINGS TAB ─────────────────────────────────────────────── */}
            {activeTab === "settings" && (
              <div className="flex flex-col gap-4">
                {/* Card controls */}
                <div className="rounded-2xl bg-white p-5 ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-800">
                  <h3 className="mb-4 text-sm font-semibold text-slate-700 dark:text-slate-300">Card Controls</h3>
                  <div className="flex flex-col gap-0 divide-y divide-slate-100 dark:divide-slate-800">
                    {(
                      [
                        { key: "contactless", label: "Contactless Payments", desc: "Tap-to-pay and NFC transactions" },
                        { key: "onlinePurchases", label: "Online Purchases", desc: "E-commerce and web payments" },
                        { key: "internationalUse", label: "International Use", desc: "Payments outside Nigeria" },
                        { key: "atmWithdrawals", label: "ATM Withdrawals", desc: "Cash withdrawals at ATMs" },
                        { key: "posPayments", label: "POS Payments", desc: "In-store point-of-sale terminals" },
                        { key: "notifications", label: "Transaction Alerts", desc: "Get notified on every transaction" },
                      ] as const
                    ).map(({ key, label, desc }) => (
                      <div key={key} className="flex items-center justify-between py-3.5">
                        <div>
                          <p className="text-sm font-medium text-slate-700 dark:text-slate-300">{label}</p>
                          <p className="text-xs text-slate-400">{desc}</p>
                        </div>
                        <Toggle
                          value={controls[key]}
                          onChange={(v) => setControls((c) => ({ ...c, [key]: v }))}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* PIN management */}
                <div className="rounded-2xl bg-white p-5 ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-800">
                  <h3 className="mb-4 text-sm font-semibold text-slate-700 dark:text-slate-300">PIN & Security</h3>
                  <div className="flex flex-col gap-2">
                    {[
                      { label: "Change Card PIN", icon: "🔑" },
                      { label: "View Card Number", icon: "👁" },
                      { label: "Enable Biometric Auth", icon: "🔏" },
                    ].map(({ label, icon }) => (
                      <button key={label} className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3 hover:bg-slate-100 dark:bg-slate-800/60 dark:hover:bg-slate-800 transition">
                        <div className="flex items-center gap-3">
                          <span>{icon}</span>
                          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{label}</span>
                        </div>
                        <span className="text-slate-300 dark:text-slate-600">›</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Danger zone */}
                <div className="rounded-2xl bg-white p-5 ring-1 ring-rose-200 dark:bg-slate-900 dark:ring-rose-900/40">
                  <h3 className="mb-4 text-sm font-semibold text-rose-600 dark:text-rose-400">Danger Zone</h3>
                  <div className="flex flex-col gap-2">
                    {[
                      { label: "Report Card Lost", icon: "📋" },
                      { label: "Report Card Stolen", icon: "🚨" },
                      { label: "Permanently Block Card", icon: "🚫" },
                    ].map(({ label, icon }) => (
                      <button key={label} className="flex items-center gap-3 rounded-xl bg-rose-50 px-4 py-3 text-sm font-medium text-rose-600 hover:bg-rose-100 dark:bg-rose-900/20 dark:text-rose-400 dark:hover:bg-rose-900/30 transition">
                        <span>{icon}</span>
                        {label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── ADD CARD MODAL ───────────────────────────────────────────────────── */}
      {showAddCard && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm"
          onClick={() => setShowAddCard(false)}
        >
          <div
            className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl dark:bg-slate-900"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-5 flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-800 dark:text-white">Add New Card</h3>
              <button onClick={() => setShowAddCard(false)} className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800">✕</button>
            </div>

            {/* Card type */}
            <div className="mb-4 grid grid-cols-2 gap-3">
              {(["physical", "virtual"] as const).map((t) => (
                <button key={t} className="flex flex-col items-center gap-2 rounded-xl border-2 border-slate-200 p-4 hover:border-emerald-400 dark:border-slate-700 transition capitalize">
                  <span className="text-2xl">{t === "physical" ? "💳" : "🌐"}</span>
                  <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">{t}</span>
                </button>
              ))}
            </div>

            <div className="flex flex-col gap-3">
              <input type="text" placeholder="Card label (e.g. Travel)" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none focus:border-emerald-400 dark:border-slate-700 dark:bg-slate-800 dark:text-white" />
              <input type="text" placeholder="Card number" maxLength={19} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none focus:border-emerald-400 dark:border-slate-700 dark:bg-slate-800 dark:text-white" />
              <div className="grid grid-cols-2 gap-3">
                <input type="text" placeholder="MM / YY" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none focus:border-emerald-400 dark:border-slate-700 dark:bg-slate-800 dark:text-white" />
                <input type="text" placeholder="CVV" maxLength={4} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none focus:border-emerald-400 dark:border-slate-700 dark:bg-slate-800 dark:text-white" />
              </div>
              <input type="text" placeholder="Cardholder name" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none focus:border-emerald-400 dark:border-slate-700 dark:bg-slate-800 dark:text-white" />
              <button
                onClick={() => setShowAddCard(false)}
                className="mt-1 w-full rounded-xl bg-emerald-500 py-3 text-sm font-bold text-white hover:bg-emerald-600 active:scale-[0.98] transition"
              >
                Add Card
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── LIMIT MODAL ─────────────────────────────────────────────────────── */}
      {showLimitModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm"
          onClick={() => setShowLimitModal(false)}
        >
          <div
            className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl dark:bg-slate-900"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-5 flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-800 dark:text-white">Manage Limits</h3>
              <button onClick={() => setShowLimitModal(false)} className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800">✕</button>
            </div>
            <div className="flex flex-col gap-4">
              {[
                { label: "Daily spending limit", value: "50,000" },
                { label: "Monthly spending limit", value: "100,000" },
                { label: "Single transaction max", value: "20,000" },
                { label: "ATM daily withdrawal", value: "30,000" },
              ].map(({ label, value }) => (
                <div key={label}>
                  <label className="mb-1.5 block text-xs font-medium text-slate-500 dark:text-slate-400">{label}</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-slate-400">₦</span>
                    <input
                      type="text"
                      defaultValue={value}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 pl-7 pr-4 py-2.5 text-sm outline-none focus:border-emerald-400 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                    />
                  </div>
                </div>
              ))}
              <button
                onClick={() => setShowLimitModal(false)}
                className="w-full rounded-xl bg-emerald-500 py-3 text-sm font-bold text-white hover:bg-emerald-600 active:scale-[0.98] transition"
              >
                Save Limits
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
    <Footer/>
    </div>
  );
}