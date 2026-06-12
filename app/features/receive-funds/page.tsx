"use client";

import Footer from "@/Components/layout/footer";
import Navbar from "@/Components/layout/Navbar";
import { useState, useRef, useEffect } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

type ReceiveMethod = "account" | "qr" | "link" | "request";
type AccountType = "primary" | "savings";

type IncomingTransaction = {
  id: string;
  sender: string;
  initials: string;
  avatarColor: string;
  amount: number;
  note: string;
  date: string;
  status: "completed" | "pending";
  method: string;
};

// ─── Mock Data ────────────────────────────────────────────────────────────────

const ACCOUNTS = [
  {
    id: "primary" as AccountType,
    label: "Primary Account",
    bank: "SmhartPay MFB",
    accountNumber: "8012345678",
    accountName: "ADEBAYO MICHAEL JOHNSON",
    balance: 12480.50,
    sortCode: "000017",
  },
  {
    id: "savings" as AccountType,
    label: "Savings Account",
    bank: "SmhartPay MFB",
    accountNumber: "8098765432",
    accountName: "ADEBAYO MICHAEL JOHNSON",
    balance: 5340.00,
    sortCode: "000017",
  },
];

const INCOMING: IncomingTransaction[] = [
  {
    id: "in1",
    sender: "Sarah Kimani",
    initials: "SK",
    avatarColor: "bg-violet-100 text-violet-700",
    amount: 15000,
    note: "Rent contribution",
    date: "Today, 10:22 AM",
    status: "completed",
    method: "SmhartPay",
  },
  {
    id: "in2",
    sender: "Daniel Obi",
    initials: "DO",
    avatarColor: "bg-sky-100 text-sky-700",
    amount: 5000,
    note: "Lunch money 😄",
    date: "Today, 08:45 AM",
    status: "completed",
    method: "Bank Transfer",
  },
  {
    id: "in3",
    sender: "Freelance Client",
    initials: "FC",
    avatarColor: "bg-emerald-100 text-emerald-700",
    amount: 75000,
    note: "UI Design - Invoice #0041",
    date: "Yesterday, 3:00 PM",
    status: "completed",
    method: "Wire Transfer",
  },
  {
    id: "in4",
    sender: "Tunde Bello",
    initials: "TB",
    avatarColor: "bg-amber-100 text-amber-700",
    amount: 2500,
    note: "Owe from last week",
    date: "Yesterday, 11:10 AM",
    status: "pending",
    method: "SmhartPay",
  },
  {
    id: "in5",
    sender: "Ngozi Peters",
    initials: "NP",
    avatarColor: "bg-rose-100 text-rose-700",
    amount: 30000,
    note: "Project milestone",
    date: "Jun 4, 9:00 AM",
    status: "completed",
    method: "Bank Transfer",
  },
];

const SUGGESTED_AMOUNTS = [1000, 2500, 5000, 10000, 25000, 50000];

// ─── QR Code SVG (deterministic placeholder) ─────────────────────────────────

function QRCodeSVG({ value, size = 200 }: { value: string; size?: number }) {
  // Generate a deterministic pixel grid from the string
  const cells = 21;
  const cellSize = size / cells;
  const grid: boolean[][] = Array.from({ length: cells }, (_, r) =>
    Array.from({ length: cells }, (_, c) => {
      // Finder patterns (top-left, top-right, bottom-left)
      const inFinder = (
        (r < 7 && c < 7) ||
        (r < 7 && c >= cells - 7) ||
        (r >= cells - 7 && c < 7)
      );
      if (inFinder) {
        const lr = r % 7, lc = c % 7;
        const cr = (r >= cells - 7) ? r - (cells - 7) : r;
        const cc = (c >= cells - 7) ? c - (cells - 7) : c;
        return (cr === 0 || cr === 6 || lc === 0 || lc === 6 || (cr >= 2 && cr <= 4 && cc >= 2 && cc <= 4));
      }
      // Timing patterns
      if (r === 6 || c === 6) return (r + c) % 2 === 0;
      // Data modules - deterministic from string
      const hash = (value.charCodeAt((r * cells + c) % value.length) + r * 3 + c * 7) % 11;
      return hash < 5;
    })
  );

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} xmlns="http://www.w3.org/2000/svg">
      <rect width={size} height={size} fill="white" rx="8" />
      {grid.map((row, r) =>
        row.map((filled, c) =>
          filled ? (
            <rect
              key={`${r}-${c}`}
              x={c * cellSize}
              y={r * cellSize}
              width={cellSize}
              height={cellSize}
              fill="#0f172a"
            />
          ) : null
        )
      )}
      {/* Center logo space */}
      <rect x={size / 2 - 18} y={size / 2 - 18} width={36} height={36} fill="white" rx="4" />
      <text x={size / 2} y={size / 2 + 5} textAnchor="middle" fontSize="13" fontWeight="bold" fill="#10b981">S</text>
    </svg>
  );
}

// ─── Copy Button ──────────────────────────────────────────────────────────────

function CopyButton({ text, label = "Copy" }: { text: string; label?: string }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard?.writeText(text).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button
      onClick={copy}
      className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
        copied
          ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
          : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-slate-600"
      }`}
    >
      <span>{copied ? "✓" : "⎘"}</span>
      {copied ? "Copied!" : label}
    </button>
  );
}

// ─── Share Button ─────────────────────────────────────────────────────────────

function ShareButton({ data }: { data: { title: string; text: string; url?: string } }) {
  const [shared, setShared] = useState(false);
  const share = async () => {
    try {
      if (navigator.share) {
        await navigator.share(data);
      } else {
        navigator.clipboard?.writeText(data.text).catch(() => {});
      }
      setShared(true);
      setTimeout(() => setShared(false), 2000);
    } catch {}
  };
  return (
    <button
      onClick={share}
      className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
        shared
          ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
          : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-slate-600"
      }`}
    >
      <span>{shared ? "✓" : "↗"}</span>
      {shared ? "Shared!" : "Share"}
    </button>
  );
}

// ─── Method Tab ───────────────────────────────────────────────────────────────

function MethodTab({
  icon,
  label,
  active,
  onClick,
}: {
  icon: string;
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-1 flex-col items-center gap-1.5 rounded-2xl py-4 px-3 transition-all ${
        active
          ? "bg-emerald-500 text-white shadow-lg shadow-emerald-200 dark:shadow-emerald-900/40"
          : "bg-white text-slate-500 ring-1 ring-slate-200 hover:bg-slate-50 dark:bg-slate-900 dark:ring-slate-800 dark:text-slate-400 dark:hover:bg-slate-800"
      }`}
    >
      <span className="text-2xl">{icon}</span>
      <span className={`text-[11px] font-semibold ${active ? "text-white" : ""}`}>{label}</span>
    </button>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function ReceiveFundsPage() {
  const [method, setMethod] = useState<ReceiveMethod>("account");
  const [activeAccount, setActiveAccount] = useState<AccountType>("primary");
  const [requestAmount, setRequestAmount] = useState("");
  const [requestNote, setRequestNote] = useState("");
  const [requestSent, setRequestSent] = useState(false);
  const [linkGenerated, setLinkGenerated] = useState(false);
  const [linkAmount, setLinkAmount] = useState("");
  const [linkNote, setLinkNote] = useState("");
  const [linkExpiry, setLinkExpiry] = useState("24h");
  const [requestTo, setRequestTo] = useState("");
  const [qrDownloaded, setQrDownloaded] = useState(false);

  const account = ACCOUNTS.find((a) => a.id === activeAccount)!;
  const paymentLink = `https://pay.smhartpay.com/r/${account.accountNumber.slice(-6)}${linkAmount ? `?amt=${linkAmount}` : ""}`;
  const totalReceived = INCOMING.filter((t) => t.status === "completed").reduce((s, t) => s + t.amount, 0);
  const pendingAmount = INCOMING.filter((t) => t.status === "pending").reduce((s, t) => s + t.amount, 0);

  const handleSendRequest = () => {
    if (!requestTo || !requestAmount) return;
    setRequestSent(true);
    setTimeout(() => setRequestSent(false), 3000);
    setRequestTo("");
    setRequestAmount("");
    setRequestNote("");
  };

  const handleGenerateLink = () => {
    setLinkGenerated(true);
  };

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-slate-50 bg-white">
      <div className="max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8 ">
    {/* <div className="min-h-screen bg-slate-50 dark:bg-slate-950"> */}
      {/* <div className="max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8"> */}

        {/* ── Header ─────────────────────────────────────────────────────── */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-medium text-slate-400">SmhartPay</p>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Receive Funds</h1>
          </div>
          {/* Quick stats */}
          <div className="flex gap-3">
            <div className="rounded-xl bg-white px-4 py-2.5 ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-800 text-right">
              <p className="text-[10px] font-medium uppercase tracking-widest text-slate-400">Received Today</p>
              <p className="text-base font-bold text-emerald-600 dark:text-emerald-400">
                +₦{totalReceived.toLocaleString("en-NG", { minimumFractionDigits: 2 })}
              </p>
            </div>
            {pendingAmount > 0 && (
              <div className="rounded-xl bg-white px-4 py-2.5 ring-1 ring-amber-200 dark:bg-slate-900 dark:ring-amber-800/40 text-right">
                <p className="text-[10px] font-medium uppercase tracking-widest text-amber-400">Pending</p>
                <p className="text-base font-bold text-amber-600 dark:text-amber-400">
                  ₦{pendingAmount.toLocaleString("en-NG", { minimumFractionDigits: 2 })}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* ── Method selector ─────────────────────────────────────────────── */}
        <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <MethodTab icon="🏦" label="Bank Details" active={method === "account"} onClick={() => setMethod("account")} />
          <MethodTab icon="📲" label="QR Code" active={method === "qr"} onClick={() => setMethod("qr")} />
          <MethodTab icon="🔗" label="Pay Link" active={method === "link"} onClick={() => setMethod("link")} />
          <MethodTab icon="📨" label="Request" active={method === "request"} onClick={() => setMethod("request")} />
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">

          {/* ── LEFT / MAIN PANEL ───────────────────────────────────────── */}
          <div className="flex flex-col gap-5 lg:col-span-2">

            {/* Account selector */}
            <div className="flex gap-3">
              {ACCOUNTS.map((acc) => (
                <button
                  key={acc.id}
                  onClick={() => setActiveAccount(acc.id)}
                  className={`flex-1 rounded-2xl p-4 text-left transition-all ${
                    activeAccount === acc.id
                      ? "bg-emerald-500 text-white shadow-lg shadow-emerald-200 dark:shadow-emerald-900/30"
                      : "bg-white ring-1 ring-slate-200 hover:bg-slate-50 dark:bg-slate-900 dark:ring-slate-800 dark:hover:bg-slate-800"
                  }`}
                >
                  <p className={`text-xs font-semibold uppercase tracking-widest ${activeAccount === acc.id ? "text-white/70" : "text-slate-400"}`}>
                    {acc.label}
                  </p>
                  <p className={`mt-1 text-lg font-bold ${activeAccount === acc.id ? "text-white" : "text-slate-900 dark:text-white"}`}>
                    ₦{acc.balance.toLocaleString("en-NG", { minimumFractionDigits: 2 })}
                  </p>
                  <p className={`mt-0.5 font-mono text-xs ${activeAccount === acc.id ? "text-white/60" : "text-slate-400"}`}>
                    ···· {acc.accountNumber.slice(-4)}
                  </p>
                </button>
              ))}
            </div>

            {/* ── BANK DETAILS METHOD ─────────────────────────────────────── */}
            {method === "account" && (
              <div className="rounded-2xl bg-white p-6 ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-800">
                <div className="mb-5 flex items-center justify-between">
                  <h2 className="text-sm font-bold text-slate-700 dark:text-slate-300">Bank Account Details</h2>
                  <ShareButton data={{ title: "My SmhartPay Account", text: `Bank: ${account.bank}\nAccount: ${account.accountNumber}\nName: ${account.accountName}` }} />
                </div>

                {/* Hero account number display */}
                <div className="mb-6 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 p-6 text-white relative overflow-hidden">
                  <div className="pointer-events-none absolute -right-8 -top-8 h-40 w-40 rounded-full bg-emerald-500/10" />
                  <div className="pointer-events-none absolute -bottom-10 -left-6 h-36 w-36 rounded-full bg-emerald-400/5" />
                  <p className="relative text-xs font-medium uppercase tracking-widest text-white/40 mb-1">{account.bank}</p>
                  <p className="relative font-mono text-3xl font-bold tracking-[0.15em] text-white mb-2">
                    {account.accountNumber.replace(/(\d{4})(\d{3})(\d{3})/, "$1 $2 $3")}
                  </p>
                  <p className="relative text-sm font-semibold text-white/70">{account.accountName}</p>
                  <div className="relative mt-4 flex items-center gap-2">
                    <CopyButton text={account.accountNumber} label="Copy Number" />
                  </div>
                </div>

                {/* Details grid */}
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {[
                    { label: "Account Name", value: account.accountName, copyable: true },
                    { label: "Account Number", value: account.accountNumber, copyable: true },
                    { label: "Bank Name", value: account.bank, copyable: false },
                    { label: "Sort Code", value: account.sortCode, copyable: true },
                    { label: "Account Type", value: "Current Account", copyable: false },
                    { label: "Currency", value: "Nigerian Naira (₦ NGN)", copyable: false },
                  ].map(({ label, value, copyable }) => (
                    <div key={label} className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3 dark:bg-slate-800/60">
                      <div className="min-w-0 flex-1">
                        <p className="text-[10px] font-medium uppercase tracking-widest text-slate-400">{label}</p>
                        <p className="mt-0.5 truncate text-sm font-semibold text-slate-800 dark:text-slate-100">{value}</p>
                      </div>
                      {copyable && <CopyButton text={value} />}
                    </div>
                  ))}
                </div>

                {/* Share buttons row */}
                <div className="mt-5">
                  <p className="mb-3 text-xs font-medium text-slate-400 uppercase tracking-widest">Share via</p>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { icon: "💬", label: "WhatsApp" },
                      { icon: "✉️", label: "Email" },
                      { icon: "📋", label: "Copy All" },
                      { icon: "📤", label: "More" },
                    ].map(({ icon, label }) => (
                      <button
                        key={label}
                        className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50 hover:border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
                      >
                        <span>{icon}</span> {label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ── QR CODE METHOD ──────────────────────────────────────────── */}
            {method === "qr" && (
              <div className="rounded-2xl bg-white p-6 ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-800">
                <div className="mb-5 flex items-center justify-between">
                  <h2 className="text-sm font-bold text-slate-700 dark:text-slate-300">QR Code</h2>
                  <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-semibold text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400">
                    Scan to Pay
                  </span>
                </div>

                {/* QR display */}
                <div className="flex flex-col items-center">
                  <div className="relative mb-6 rounded-3xl bg-white p-6 shadow-xl ring-1 ring-slate-100 dark:bg-white">
                    <QRCodeSVG value={`smhartpay:${account.accountNumber}`} size={220} />
                    {/* Corner decorators */}
                    <div className="absolute left-3 top-3 h-6 w-6 rounded-tl-xl border-l-2 border-t-2 border-emerald-500" />
                    <div className="absolute right-3 top-3 h-6 w-6 rounded-tr-xl border-r-2 border-t-2 border-emerald-500" />
                    <div className="absolute bottom-3 left-3 h-6 w-6 rounded-bl-xl border-b-2 border-l-2 border-emerald-500" />
                    <div className="absolute bottom-3 right-3 h-6 w-6 rounded-br-xl border-b-2 border-r-2 border-emerald-500" />
                  </div>

                  <div className="mb-4 text-center">
                    <p className="text-sm font-bold text-slate-800 dark:text-slate-100">{account.accountName}</p>
                    <p className="font-mono text-xs text-slate-400">{account.bank} · {account.accountNumber}</p>
                  </div>

                  {/* Optional amount for QR */}
                  <div className="mb-5 w-full max-w-xs">
                    <label className="mb-1.5 block text-xs font-medium text-slate-400">Set amount on QR (optional)</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 font-bold text-slate-400">₦</span>
                      <input
                        type="text"
                        inputMode="decimal"
                        placeholder="Any amount"
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-7 pr-4 text-sm outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder-slate-500"
                      />
                    </div>
                  </div>

                  <div className="flex w-full max-w-xs flex-col gap-2">
                    <button
                      onClick={() => setQrDownloaded(true)}
                      className="w-full rounded-xl bg-emerald-500 py-3 text-sm font-bold text-white hover:bg-emerald-600 active:scale-[0.98] transition"
                    >
                      {qrDownloaded ? "✓ Saved to Device" : "⬇ Download QR Code"}
                    </button>
                    <div className="flex gap-2">
                      <button className="flex-1 rounded-xl border border-slate-200 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300">
                        💬 Share on WhatsApp
                      </button>
                      <button className="flex-1 rounded-xl border border-slate-200 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300">
                        🖨 Print
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ── PAYMENT LINK METHOD ─────────────────────────────────────── */}
            {method === "link" && (
              <div className="rounded-2xl bg-white p-6 ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-800">
                <div className="mb-5 flex items-center justify-between">
                  <h2 className="text-sm font-bold text-slate-700 dark:text-slate-300">Payment Link</h2>
                  <span className="rounded-full bg-sky-50 px-2.5 py-1 text-[10px] font-semibold text-sky-700 dark:bg-sky-900/20 dark:text-sky-400">
                    Shareable Link
                  </span>
                </div>

                <div className="flex flex-col gap-4">
                  {/* Amount */}
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-slate-400">Amount (₦) <span className="text-slate-300">— optional</span></label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 font-bold text-slate-400">₦</span>
                      <input
                        type="text"
                        inputMode="decimal"
                        placeholder="Leave blank for any amount"
                        value={linkAmount}
                        onChange={(e) => { setLinkAmount(e.target.value); setLinkGenerated(false); }}
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-7 pr-4 text-sm outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder-slate-500"
                      />
                    </div>
                  </div>

                  {/* Quick amounts */}
                  <div className="flex flex-wrap gap-2">
                    {SUGGESTED_AMOUNTS.map((amt) => (
                      <button
                        key={amt}
                        onClick={() => { setLinkAmount(amt.toLocaleString("en-NG")); setLinkGenerated(false); }}
                        className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 transition hover:border-emerald-400 hover:bg-emerald-50 hover:text-emerald-700 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-emerald-900/20 dark:hover:text-emerald-400"
                      >
                        ₦{amt.toLocaleString("en-NG")}
                      </button>
                    ))}
                  </div>

                  {/* Note */}
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-slate-400">Note / Description</label>
                    <input
                      type="text"
                      placeholder="e.g. Payment for design work"
                      value={linkNote}
                      onChange={(e) => { setLinkNote(e.target.value); setLinkGenerated(false); }}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder-slate-500"
                    />
                  </div>

                  {/* Expiry */}
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-slate-400">Link Expiry</label>
                    <div className="flex gap-2">
                      {(["1h", "24h", "7d", "30d", "never"] as const).map((e) => (
                        <button
                          key={e}
                          onClick={() => setLinkExpiry(e)}
                          className={`flex-1 rounded-xl border py-2 text-xs font-semibold transition ${
                            linkExpiry === e
                              ? "border-emerald-400 bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400"
                              : "border-slate-200 text-slate-500 hover:border-slate-300 dark:border-slate-700 dark:text-slate-400"
                          }`}
                        >
                          {e}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={handleGenerateLink}
                    className="w-full rounded-xl bg-emerald-500 py-3 text-sm font-bold text-white hover:bg-emerald-600 active:scale-[0.98] transition shadow-lg shadow-emerald-100 dark:shadow-none"
                  >
                    {linkGenerated ? "Regenerate Link" : "Generate Payment Link"}
                  </button>

                  {/* Generated link display */}
                  {linkGenerated && (
                    <div className="rounded-2xl bg-slate-50 p-4 ring-1 ring-emerald-200 dark:bg-slate-800/60 dark:ring-emerald-800/40">
                      <div className="mb-3 flex items-center justify-between">
                        <span className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                          <span className="h-2 w-2 rounded-full bg-emerald-500 inline-block animate-pulse" />
                          Link Active · Expires in {linkExpiry}
                        </span>
                        <CopyButton text={paymentLink} label="Copy Link" />
                      </div>
                      <p className="break-all font-mono text-xs text-slate-500 dark:text-slate-400">{paymentLink}</p>
                      <div className="mt-3 flex gap-2">
                        <button className="flex-1 rounded-xl border border-slate-200 py-2 text-xs font-medium text-slate-600 hover:bg-white dark:border-slate-600 dark:text-slate-300">
                          💬 WhatsApp
                        </button>
                        <button className="flex-1 rounded-xl border border-slate-200 py-2 text-xs font-medium text-slate-600 hover:bg-white dark:border-slate-600 dark:text-slate-300">
                          ✉️ Email
                        </button>
                        <button className="flex-1 rounded-xl border border-slate-200 py-2 text-xs font-medium text-slate-600 hover:bg-white dark:border-slate-600 dark:text-slate-300">
                          📤 More
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* ── REQUEST MONEY METHOD ────────────────────────────────────── */}
            {method === "request" && (
              <div className="rounded-2xl bg-white p-6 ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-800">
                <div className="mb-5 flex items-center justify-between">
                  <h2 className="text-sm font-bold text-slate-700 dark:text-slate-300">Request Money</h2>
                  <span className="rounded-full bg-violet-50 px-2.5 py-1 text-[10px] font-semibold text-violet-700 dark:bg-violet-900/20 dark:text-violet-400">
                    Send Request
                  </span>
                </div>

                {requestSent ? (
                  <div className="flex flex-col items-center py-10 text-center">
                    <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 text-4xl dark:bg-emerald-900/30">
                      ✓
                    </div>
                    <h3 className="text-base font-bold text-slate-800 dark:text-white">Request Sent!</h3>
                    <p className="mt-1 text-sm text-slate-400">Your payment request has been sent to {requestTo}</p>
                    <button
                      onClick={() => setRequestSent(false)}
                      className="mt-6 rounded-xl bg-emerald-500 px-6 py-2.5 text-sm font-semibold text-white hover:bg-emerald-600"
                    >
                      Send Another
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col gap-4">
                    {/* Request from */}
                    <div>
                      <label className="mb-1.5 block text-xs font-medium text-slate-400">Request from</label>
                      <input
                        type="text"
                        placeholder="Name, phone number or email"
                        value={requestTo}
                        onChange={(e) => setRequestTo(e.target.value)}
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder-slate-500"
                      />
                    </div>

                    {/* Suggested contacts */}
                    <div>
                      <p className="mb-2 text-xs font-medium text-slate-400">Recent contacts</p>
                      <div className="flex gap-3 overflow-x-auto pb-1">
                        {[
                          { name: "Sarah K.", init: "SK", color: "bg-violet-100 text-violet-700" },
                          { name: "Daniel O.", init: "DO", color: "bg-sky-100 text-sky-700" },
                          { name: "Tunde B.", init: "TB", color: "bg-amber-100 text-amber-700" },
                          { name: "Ngozi P.", init: "NP", color: "bg-rose-100 text-rose-700" },
                        ].map(({ name, init, color }) => (
                          <button
                            key={name}
                            onClick={() => setRequestTo(name)}
                            className={`flex flex-shrink-0 flex-col items-center gap-1.5 rounded-xl p-3 transition ${
                              requestTo === name ? "ring-2 ring-emerald-400 bg-emerald-50 dark:bg-emerald-900/20" : "hover:bg-slate-50 dark:hover:bg-slate-800/60"
                            }`}
                          >
                            <div className={`flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold ${color}`}>{init}</div>
                            <span className="text-[10px] font-medium text-slate-600 dark:text-slate-400">{name}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Amount */}
                    <div>
                      <label className="mb-1.5 block text-xs font-medium text-slate-400">Amount (₦)</label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-lg font-bold text-slate-400">₦</span>
                        <input
                          type="text"
                          inputMode="decimal"
                          placeholder="0.00"
                          value={requestAmount}
                          onChange={(e) => setRequestAmount(e.target.value)}
                          className="w-full rounded-xl border border-slate-200 bg-slate-50 py-4 pl-9 pr-4 text-xl font-bold outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder-slate-600"
                        />
                      </div>
                    </div>

                    {/* Quick amounts */}
                    <div className="flex flex-wrap gap-2">
                      {SUGGESTED_AMOUNTS.map((amt) => (
                        <button
                          key={amt}
                          onClick={() => setRequestAmount(amt.toLocaleString("en-NG"))}
                          className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 transition hover:border-emerald-400 hover:bg-emerald-50 hover:text-emerald-700 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-emerald-900/20 dark:hover:text-emerald-400"
                        >
                          ₦{amt.toLocaleString("en-NG")}
                        </button>
                      ))}
                    </div>

                    {/* Note */}
                    <div>
                      <label className="mb-1.5 block text-xs font-medium text-slate-400">Note / Reason</label>
                      <textarea
                        rows={2}
                        placeholder="e.g. Dinner last Friday 🍽"
                        value={requestNote}
                        onChange={(e) => setRequestNote(e.target.value)}
                        className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder-slate-500"
                      />
                    </div>

                    {/* Delivery method */}
                    <div>
                      <label className="mb-2 block text-xs font-medium text-slate-400">Send via</label>
                      <div className="flex gap-2">
                        {["SMS", "WhatsApp", "Email", "SmhartPay"].map((via) => (
                          <button
                            key={via}
                            className="flex-1 rounded-xl border border-slate-200 py-2 text-xs font-medium text-slate-500 hover:border-emerald-400 hover:bg-emerald-50 hover:text-emerald-700 transition dark:border-slate-700 dark:text-slate-400"
                          >
                            {via}
                          </button>
                        ))}
                      </div>
                    </div>

                    <button
                      onClick={handleSendRequest}
                      disabled={!requestTo || !requestAmount}
                      className="w-full rounded-xl bg-emerald-500 py-3.5 text-sm font-bold text-white hover:bg-emerald-600 active:scale-[0.98] transition shadow-lg shadow-emerald-100 dark:shadow-none disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      Send Payment Request
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* ── RIGHT SIDEBAR ────────────────────────────────────────────── */}
          <div className="flex flex-col gap-5">

            {/* Balance card */}
            <div className="rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-700 p-5 text-white shadow-lg shadow-emerald-200/50 dark:shadow-none">
              <p className="text-xs font-medium uppercase tracking-widest text-white/60">Available Balance</p>
              <p className="mt-1 text-3xl font-bold">
                ₦{account.balance.toLocaleString("en-NG", { minimumFractionDigits: 2 })}
              </p>
              <p className="mt-1 text-xs text-white/60">{account.label} · {account.bank}</p>
              <div className="mt-4 h-px w-full bg-white/10" />
              <div className="mt-3 flex justify-between text-xs">
                <div>
                  <p className="text-white/50">Account No.</p>
                  <p className="font-mono font-semibold text-white/90">{account.accountNumber}</p>
                </div>
                <div className="text-right">
                  <p className="text-white/50">Sort Code</p>
                  <p className="font-mono font-semibold text-white/90">{account.sortCode}</p>
                </div>
              </div>
            </div>

            {/* Incoming transactions */}
            <div className="rounded-2xl bg-white ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-800">
              <div className="border-b border-slate-100 px-5 py-4 dark:border-slate-800 flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-700 dark:text-slate-300">Incoming Payments</h3>
                <button className="text-xs font-medium text-emerald-600 hover:underline dark:text-emerald-400">See all</button>
              </div>
              <div className="p-3">
                {INCOMING.map((tx) => (
                  <div key={tx.id} className="flex items-center gap-3 rounded-xl px-3 py-2.5 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition">
                    <div className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full text-xs font-bold ${tx.avatarColor}`}>
                      {tx.initials}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="truncate text-xs font-semibold text-slate-800 dark:text-slate-100">{tx.sender}</p>
                      <p className="truncate text-[10px] text-slate-400">{tx.note}</p>
                      <p className="text-[10px] text-slate-300 dark:text-slate-600">{tx.date}</p>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                        +₦{tx.amount.toLocaleString("en-NG")}
                      </span>
                      <span className={`rounded-full px-1.5 py-0.5 text-[9px] font-semibold ${
                        tx.status === "completed"
                          ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400"
                          : "bg-amber-50 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400"
                      }`}>
                        {tx.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tips / info */}
            <div className="rounded-2xl bg-slate-50 p-5 ring-1 ring-slate-200 dark:bg-slate-800/60 dark:ring-slate-700">
              <p className="mb-3 text-[10px] font-bold uppercase tracking-widest text-slate-400">How to receive</p>
              <ul className="flex flex-col gap-3">
                {[
                  { icon: "🏦", tip: "Share your account number for bank transfers" },
                  { icon: "📲", tip: "Show your QR code for instant SmhartPay transfers" },
                  { icon: "🔗", tip: "Send a pay link via chat or email — no app needed" },
                  { icon: "📨", tip: "Request money directly from contacts in-app" },
                ].map(({ icon, tip }) => (
                  <li key={tip} className="flex items-start gap-2.5">
                    <span className="mt-0.5 flex-shrink-0 text-base">{icon}</span>
                    <span className="text-xs text-slate-500 dark:text-slate-400">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Security note */}
            <div className="flex items-start gap-3 rounded-2xl bg-amber-50 p-4 ring-1 ring-amber-200 dark:bg-amber-900/10 dark:ring-amber-800/30">
              <span className="flex-shrink-0 text-xl">🔒</span>
              <div>
                <p className="text-xs font-bold text-amber-800 dark:text-amber-400">Stay Safe</p>
                <p className="mt-0.5 text-xs text-amber-700/80 dark:text-amber-500">
                  Never share your PIN or OTP with anyone, even if they claim to be from SmhartPay.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </div>
  );
}