"use client";

import { useState } from "react";
import Navbar from "@/Components/layout/Navbar";
import Footer from "@/Components/layout/footer";

// ─── Types ────────────────────────────────────────────────────────────────────

type Transaction = {
  id: string;
  type: "credit" | "debit";
  title: string;
  subtitle: string;
  amount: number;
  date: string;
  category: "transfer" | "payment" | "topup" | "refund" | "withdrawal";
  status: "completed" | "pending" | "failed";
};

type Card = {
  id: string;
  label: string;
  last4: string;
  expiry: string;
  network: "visa" | "mastercard";
  color: string;
  balance: number;
};

// ─── Mock Data ────────────────────────────────────────────────────────────────

const CARDS: Card[] = [
  {
    id: "c1",
    label: "Primary",
    last4: "4821",
    expiry: "09/27",
    network: "visa",
    color: "from-slate-800 to-slate-600",
    balance: 12480.5,
  },
  {
    id: "c2",
    label: "Savings",
    last4: "7093",
    expiry: "03/26",
    network: "mastercard",
    color: "from-emerald-700 to-teal-600",
    balance: 5340.0,
  },
];

const TRANSACTIONS: Transaction[] = [
  {
    id: "t1",
    type: "credit",
    title: "Salary Deposit",
    subtitle: "Acme Corp · Direct Transfer",
    amount: 3200.0,
    date: "Today, 09:14 AM",
    category: "topup",
    status: "completed",
  },
  {
    id: "t2",
    type: "debit",
    title: "Netflix Subscription",
    subtitle: "Entertainment · Auto-pay",
    amount: 15.99,
    date: "Today, 08:00 AM",
    category: "payment",
    status: "completed",
  },
  {
    id: "t3",
    type: "debit",
    title: "Transfer to Sarah K.",
    subtitle: "Peer Transfer · SmhartPay",
    amount: 250.0,
    date: "Yesterday, 06:32 PM",
    category: "transfer",
    status: "completed",
  },
  {
    id: "t4",
    type: "credit",
    title: "Refund · Jumia Order",
    subtitle: "E-commerce · Order #88213",
    amount: 44.0,
    date: "Yesterday, 02:11 PM",
    category: "refund",
    status: "completed",
  },
  {
    id: "t5",
    type: "debit",
    title: "Konga Purchase",
    subtitle: "Shopping · Debit Card",
    amount: 128.75,
    date: "Jun 4, 11:45 AM",
    category: "payment",
    status: "completed",
  },
  {
    id: "t6",
    type: "debit",
    title: "ATM Withdrawal",
    subtitle: "UBA ATM · Victoria Island",
    amount: 500.0,
    date: "Jun 4, 10:00 AM",
    category: "withdrawal",
    status: "completed",
  },
  {
    id: "t7",
    type: "debit",
    title: "Airtime Top-up",
    subtitle: "MTN · 08012345678",
    amount: 10.0,
    date: "Jun 3, 04:20 PM",
    category: "topup",
    status: "pending",
  },
  {
    id: "t8",
    type: "credit",
    title: "Wire Transfer In",
    subtitle: "John A. · GTBank",
    amount: 800.0,
    date: "Jun 3, 01:55 PM",
    category: "transfer",
    status: "completed",
  },
];

const CATEGORY_ICONS: Record<Transaction["category"], string> = {
  transfer: "↔",
  payment: "🧾",
  topup: "⚡",
  refund: "↩",
  withdrawal: "🏧",
};

// ─── Sub-components ───────────────────────────────────────────────────────────

function CardVisual({ card, active }: { card: Card; active: boolean }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className={`relative cursor-pointer transition-all duration-300 ${
        active ? "scale-100 opacity-100" : "scale-95 opacity-60"
      }`}
      style={{ perspective: "1000px" }}
      onClick={() => setFlipped((f) => !f)}
    >
      <div
        className="relative w-full"
        style={{
          height: "200px",
          transformStyle: "preserve-3d",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
          transition: "transform 0.5s cubic-bezier(0.4,0,0.2,1)",
        }}
      >
        {/* Front */}
        <div
          className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${card.color} p-6 text-white shadow-xl`}
          style={{ backfaceVisibility: "hidden" }}
        >
          {/* Chip */}
          <div className="mb-6 flex items-start justify-between">
            <div>
              <p className="text-[11px] font-medium uppercase tracking-widest text-white/60">
                {card.label} Card
              </p>
            </div>
            <div className="h-8 w-12 rounded-md border border-white/20 bg-amber-300/30" />
          </div>

          {/* PAN */}
          <p className="mb-6 font-mono text-lg tracking-[0.25em] text-white/90">
            •••• •••• •••• {card.last4}
          </p>

          {/* Footer */}
          <div className="flex items-end justify-between">
            <div>
              <p className="text-[10px] uppercase tracking-widest text-white/50">
                Expires
              </p>
              <p className="font-mono text-sm text-white/90">{card.expiry}</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] uppercase tracking-widest text-white/50">
                Balance
              </p>
              <p className="text-lg font-semibold text-white">
                ${card.balance.toLocaleString("en-US", { minimumFractionDigits: 2 })}
              </p>
            </div>
          </div>

          {/* Network badge */}
          <div className="absolute right-5 top-5 text-xs font-bold uppercase tracking-widest text-white/70">
            {card.network}
          </div>

          {/* Decorative circle */}
          <div className="pointer-events-none absolute -right-8 -top-8 h-40 w-40 rounded-full bg-white/5" />
          <div className="pointer-events-none absolute -bottom-12 -left-8 h-48 w-48 rounded-full bg-white/5" />
        </div>

        {/* Back */}
        <div
          className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${card.color} p-6 text-white shadow-xl`}
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <div className="mt-4 h-10 w-full bg-black/40" />
          <div className="mt-4 flex items-center justify-end gap-3">
            <div className="h-8 w-28 rounded bg-white/20 px-3 text-right font-mono text-sm leading-8 text-white/80">
              ***
            </div>
            <p className="text-xs text-white/60">CVV</p>
          </div>
          <p className="mt-8 text-center text-xs text-white/40">
            Tap to flip back
          </p>
        </div>
      </div>

      <p className="mt-2 text-center text-xs text-slate-400">
        Tap card to flip
      </p>
    </div>
  );
}

function QuickAction({
  icon,
  label,
  onClick,
}: {
  icon: string;
  label: string;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="group flex flex-col items-center gap-2 rounded-xl p-3 transition-all hover:bg-slate-100 dark:hover:bg-slate-800"
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-xl transition-all group-hover:bg-emerald-50 group-hover:text-emerald-600 dark:bg-slate-800 dark:group-hover:bg-emerald-900/30 dark:group-hover:text-emerald-400">
        {icon}
      </div>
      <span className="text-xs font-medium text-slate-600 dark:text-slate-400">
        {label}
      </span>
    </button>
  );
}

function TxRow({ tx }: { tx: Transaction }) {
  const isCredit = tx.type === "credit";

  const statusColors: Record<Transaction["status"], string> = {
    completed: "text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 dark:text-emerald-400",
    pending: "text-amber-600 bg-amber-50 dark:bg-amber-900/20 dark:text-amber-400",
    failed: "text-red-600 bg-red-50 dark:bg-red-900/20 dark:text-red-400",
  };

  return (
    <div className="group flex items-center gap-4 rounded-xl px-4 py-3 transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/50">
      {/* Icon */}
      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-slate-100 text-lg dark:bg-slate-800">
        {CATEGORY_ICONS[tx.category]}
      </div>

      {/* Meta */}
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-slate-800 dark:text-slate-100">
          {tx.title}
        </p>
        <p className="truncate text-xs text-slate-400">{tx.subtitle}</p>
      </div>

      {/* Right */}
      <div className="flex flex-col items-end gap-1">
        <span
          className={`text-sm font-semibold ${
            isCredit
              ? "text-emerald-600 dark:text-emerald-400"
              : "text-slate-800 dark:text-slate-100"
          }`}
        >
          {isCredit ? "+" : "−"}${tx.amount.toFixed(2)}
        </span>
        <span
          className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${statusColors[tx.status]}`}
        >
          {tx.status}
        </span>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function WalletPage() {
  const [activeCard, setActiveCard] = useState(0);
  const [txFilter, setTxFilter] = useState<"all" | Transaction["category"]>(
    "all"
  );
  const [showAddCard, setShowAddCard] = useState(false);

  const totalBalance = CARDS.reduce((s, c) => s + c.balance, 0);

  const filteredTx =
    txFilter === "all"
      ? TRANSACTIONS
      : TRANSACTIONS.filter((t) => t.category === txFilter);

  const monthlyIn = TRANSACTIONS.filter((t) => t.type === "credit").reduce(
    (s, t) => s + t.amount,
    0
  );
  const monthlyOut = TRANSACTIONS.filter((t) => t.type === "debit").reduce(
    (s, t) => s + t.amount,
    0
  );

  return (
    <div>
        <Navbar />
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8">

        {/* ── Header ─────────────────────────────────────────────────────── */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-medium text-slate-400">Good morning,</p>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
              My Wallet
            </h1>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setShowAddCard(true)}
              className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
            >
              <span>＋</span> Add Card
            </button>
            <button className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200">
              🔔
            </button>
          </div>
        </div>

        {/* ── Balance overview ────────────────────────────────────────────── */}
        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-800">
            <p className="mb-1 text-xs font-medium uppercase tracking-widest text-slate-400">
              Total Balance
            </p>
            <p className="text-3xl font-bold text-slate-900 dark:text-white">
              ${totalBalance.toLocaleString("en-US", { minimumFractionDigits: 2 })}
            </p>
            <p className="mt-1 text-xs text-emerald-500">
              ↑ 4.2% from last month
            </p>
          </div>
          <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-800">
            <p className="mb-1 text-xs font-medium uppercase tracking-widest text-slate-400">
              Money In
            </p>
            <p className="text-2xl font-bold text-emerald-600">
              +${monthlyIn.toFixed(2)}
            </p>
            <p className="mt-1 text-xs text-slate-400">This month</p>
          </div>
          <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-800">
            <p className="mb-1 text-xs font-medium uppercase tracking-widest text-slate-400">
              Money Out
            </p>
            <p className="text-2xl font-bold text-rose-500">
              −${monthlyOut.toFixed(2)}
            </p>
            <p className="mt-1 text-xs text-slate-400">This month</p>
          </div>
        </div>

        {/* ── Main grid ───────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">

          {/* Left column */}
          <div className="flex flex-col gap-6">

            {/* Cards carousel */}
            <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-800">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                  My Cards
                </h2>
                <div className="flex gap-1">
                  {CARDS.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveCard(i)}
                      className={`h-1.5 rounded-full transition-all ${
                        i === activeCard
                          ? "w-6 bg-emerald-500"
                          : "w-1.5 bg-slate-300 dark:bg-slate-600"
                      }`}
                    />
                  ))}
                </div>
              </div>

              <CardVisual card={CARDS[activeCard]} active={true} />

              <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
                {CARDS.map((c, i) => (
                  <button
                    key={c.id}
                    onClick={() => setActiveCard(i)}
                    className={`flex-shrink-0 rounded-lg border px-3 py-1.5 text-xs font-medium transition ${
                      i === activeCard
                        ? "border-emerald-500 bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400"
                        : "border-slate-200 text-slate-500 hover:border-slate-300 dark:border-slate-700 dark:text-slate-400"
                    }`}
                  >
                    ···· {c.last4}
                  </button>
                ))}
              </div>
            </section>

            {/* Quick actions */}
            <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-800">
              <h2 className="mb-4 text-sm font-semibold text-slate-700 dark:text-slate-300">
                Quick Actions
              </h2>
              <div className="grid grid-cols-4 gap-1">
                <QuickAction icon="⬆️" label="Send" />
                <QuickAction icon="⬇️" label="Receive" />
                <QuickAction icon="🔄" label="Transfer" />
                <QuickAction icon="📱" label="Top-up" />
              </div>
            </section>

            {/* Spending breakdown */}
            <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-800">
              <h2 className="mb-4 text-sm font-semibold text-slate-700 dark:text-slate-300">
                Spending Breakdown
              </h2>
              {[
                { label: "Payments", pct: 48, color: "bg-violet-500" },
                { label: "Transfers", pct: 29, color: "bg-emerald-500" },
                { label: "Withdrawals", pct: 15, color: "bg-amber-400" },
                { label: "Top-ups", pct: 8, color: "bg-sky-400" },
              ].map(({ label, pct, color }) => (
                <div key={label} className="mb-3">
                  <div className="mb-1 flex justify-between text-xs text-slate-500">
                    <span>{label}</span>
                    <span className="font-medium text-slate-700 dark:text-slate-300">
                      {pct}%
                    </span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-slate-100 dark:bg-slate-800">
                    <div
                      className={`h-1.5 rounded-full ${color} transition-all duration-700`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </section>
          </div>

          {/* Right column — transactions */}
          <div className="lg:col-span-2">
            <section className="rounded-2xl bg-white shadow-sm ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-800">
              <div className="sticky top-0 z-10 rounded-t-2xl bg-white px-6 pt-6 dark:bg-slate-900">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                    Transactions
                  </h2>
                  <button className="text-xs font-medium text-emerald-600 hover:underline dark:text-emerald-400">
                    Export CSV
                  </button>
                </div>

                {/* Search */}
                <div className="relative mb-4">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                    🔍
                  </span>
                  <input
                    type="text"
                    placeholder="Search transactions…"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pl-9 pr-4 text-sm outline-none focus:border-emerald-400 focus:ring-2 
                    focus:ring-emerald-100 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder-slate-500"
                  />
                </div>

                {/* Filters */}
                <div className="mb-2 flex gap-2 overflow-x-auto pb-2">
                  {(
                    [
                      "all",
                      "payment",
                      "transfer",
                      "topup",
                      "refund",
                      "withdrawal",
                    ] as const
                  ).map((f) => (
                    <button
                      key={f}
                      onClick={() => setTxFilter(f)}
                      className={`flex-shrink-0 rounded-full px-3 py-1 text-xs font-medium transition ${
                        txFilter === f
                          ? "bg-emerald-500 text-white"
                          : "bg-slate-100 text-slate-500 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700"
                      }`}
                    >
                      {f.charAt(0).toUpperCase() + f.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {/* List */}
              <div className="px-2 pb-4 pt-2">
                {filteredTx.length === 0 ? (
                  <div className="py-16 text-center text-sm text-slate-400">
                    No transactions found.
                  </div>
                ) : (
                  filteredTx.map((tx) => <TxRow key={tx.id} tx={tx} />)
                )}
              </div>

              {/* Load more */}
              <div className="border-t border-slate-100 px-6 py-4 dark:border-slate-800">
                <button className="w-full rounded-xl border border-slate-200 py-2.5 text-sm font-medium text-slate-500 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-800">
                  Load more transactions
                </button>
              </div>
            </section>
          </div>
        </div>

        {/* ── Security & Settings strip ────────────────────────────────────── */}
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {[
            {
              icon: "🔒",
              title: "Card Freeze",
              desc: "Instantly freeze your card",
              cta: "Manage",
            },
            {
              icon: "📊",
              title: "Spending Limits",
              desc: "Set daily & monthly caps",
              cta: "Configure",
            },
            {
              icon: "🛡️",
              title: "2FA Security",
              desc: "Two-factor authentication on",
              cta: "Review",
            },
          ].map(({ icon, title, desc, cta }) => (
            <div
              key={title}
              className="flex items-center gap-4 rounded-2xl bg-white px-5 py-4 shadow-sm ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-800"
            >
              <span className="text-2xl">{icon}</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">
                  {title}
                </p>
                <p className="truncate text-xs text-slate-400">{desc}</p>
              </div>
              <button className="flex-shrink-0 rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-600 transition hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700">
                {cta}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* ── Add Card Modal ───────────────────────────────────────────────────── */}
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
              <h3 className="text-base font-semibold text-slate-800 dark:text-white">
                Add New Card
              </h3>
              <button
                onClick={() => setShowAddCard(false)}
                className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                ✕
              </button>
            </div>
            <div className="flex flex-col gap-3">
              <input
                type="text"
                placeholder="Card number"
                maxLength={19}
                className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-emerald-400 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
              <input
                type="text"
                placeholder="Cardholder name"
                className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-emerald-400 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
              <div className="flex gap-3">
                <input
                  type="text"
                  placeholder="MM / YY"
                  className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-emerald-400 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
                <input
                  type="text"
                  placeholder="CVV"
                  maxLength={4}
                  className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-emerald-400 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
              </div>
              <button
                onClick={() => setShowAddCard(false)}
                className="mt-2 w-full rounded-xl bg-emerald-500 py-3 text-sm font-semibold text-white transition hover:bg-emerald-600 active:scale-[0.98]"
              >
                Add Card
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
    <Footer />
    </div>
  );
}