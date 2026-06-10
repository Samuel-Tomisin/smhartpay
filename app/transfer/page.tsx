"use client";

import Footer from "@/Components/layout/footer";
import Footer2 from "@/Components/layout/footer2";
import Navbar from "@/Components/layout/Navbar";
import { useState, useRef, useEffect } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

type Recipient = {
  id: string;
  name: string;
  initials: string;
  bank: string;
  accountNumber: string;
  recent?: boolean;
  avatarColor: string;
};

type TransferMethod = "bank" | "smhartpay" | "international";
type TransferStep = "form" | "review" | "success";

// ─── Mock Data ────────────────────────────────────────────────────────────────

const RECENT_RECIPIENTS: Recipient[] = [
  {
    id: "r1",
    name: "Sarah Kimani",
    initials: "SK",
    bank: "GTBank",
    accountNumber: "0123456789",
    recent: true,
    avatarColor: "bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300",
  },
  {
    id: "r2",
    name: "Daniel Obi",
    initials: "DO",
    bank: "Access Bank",
    accountNumber: "0987654321",
    recent: true,
    avatarColor: "bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-300",
  },
  {
    id: "r3",
    name: "Amaka Eze",
    initials: "AE",
    bank: "Zenith Bank",
    accountNumber: "2034567891",
    recent: true,
    avatarColor: "bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300",
  },
  {
    id: "r4",
    name: "Tunde Bello",
    initials: "TB",
    bank: "First Bank",
    accountNumber: "3045678912",
    recent: true,
    avatarColor: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
  },
  {
    id: "r5",
    name: "Ngozi Peters",
    initials: "NP",
    bank: "UBA",
    accountNumber: "4056789123",
    recent: true,
    avatarColor: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
  },
];

const BANKS = [
  "Access Bank", "Citibank", "Ecobank", "Fidelity Bank",
  "First Bank", "First City Monument Bank", "GTBank",
  "Heritage Bank", "Jaiz Bank", "Keystone Bank",
  "Polaris Bank", "Providus Bank", "Stanbic IBTC",
  "Standard Chartered", "Sterling Bank", "SunTrust Bank",
  "Union Bank", "United Bank for Africa (UBA)", "Unity Bank",
  "Wema Bank", "Zenith Bank",
];

const SOURCE_CARDS = [
  { id: "c1", label: "Primary · ···· 4821", balance: 12480.50 },
  { id: "c2", label: "Savings · ···· 7093", balance: 5340.00 },
];

const QUICK_AMOUNTS = [500, 1000, 2000, 5000, 10000, 50000];

// ─── Avatar ───────────────────────────────────────────────────────────────────

function Avatar({ initials, color, size = "md" }: { initials: string; color: string; size?: "sm" | "md" | "lg" }) {
  const sizes = { sm: "h-8 w-8 text-xs", md: "h-10 w-10 text-sm", lg: "h-14 w-14 text-lg" };
  return (
    <div className={`flex flex-shrink-0 items-center justify-center rounded-full font-semibold ${sizes[size]} ${color}`}>
      {initials}
    </div>
  );
}

// ─── Step Indicator ───────────────────────────────────────────────────────────

function StepIndicator({ step }: { step: TransferStep }) {
  const steps: { key: TransferStep; label: string }[] = [
    { key: "form", label: "Details" },
    { key: "review", label: "Review" },
    { key: "success", label: "Done" },
  ];
  const idx = steps.findIndex((s) => s.key === step);

  return (
    <div className="flex items-center gap-0">
      {steps.map((s, i) => (
        <div key={s.key} className="flex items-center">
          <div className="flex flex-col items-center gap-1">
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold transition-all ${
                i < idx
                  ? "bg-emerald-500 text-white"
                  : i === idx
                  ? "bg-emerald-500 text-white ring-4 ring-emerald-100 dark:ring-emerald-900/40"
                  : "bg-slate-100 text-slate-400 dark:bg-slate-800"
              }`}
            >
              {i < idx ? "✓" : i + 1}
            </div>
            <span className={`text-[10px] font-medium ${i === idx ? "text-emerald-600 dark:text-emerald-400" : "text-slate-400"}`}>
              {s.label}
            </span>
          </div>
          {i < steps.length - 1 && (
            <div className={`mb-4 h-px w-12 sm:w-20 transition-all ${i < idx ? "bg-emerald-400" : "bg-slate-200 dark:bg-slate-700"}`} />
          )}
        </div>
      ))}
    </div>
  );
}

// ─── Recipient Card ───────────────────────────────────────────────────────────

function RecipientCard({ r, selected, onSelect }: { r: Recipient; selected: boolean; onSelect: () => void }) {
  return (
    <button
      onClick={onSelect}
      className={`flex w-full flex-col items-center gap-2 rounded-xl p-3 transition-all ${
        selected
          ? "bg-emerald-50 ring-2 ring-emerald-400 dark:bg-emerald-900/20 dark:ring-emerald-500"
          : "bg-slate-50 hover:bg-slate-100 dark:bg-slate-800/60 dark:hover:bg-slate-800"
      }`}
    >
      <Avatar initials={r.initials} color={r.avatarColor} size="md" />
      <div className="w-full text-center">
        <p className="truncate text-xs font-semibold text-slate-800 dark:text-slate-100">{r.name.split(" ")[0]}</p>
        <p className="truncate text-[10px] text-slate-400">{r.bank}</p>
      </div>
    </button>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function TransferPage() {
  const [step, setStep] = useState<TransferStep>("form");
  const [method, setMethod] = useState<TransferMethod>("bank");
  const [selectedRecipient, setSelectedRecipient] = useState<Recipient | null>(null);
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [bankName, setBankName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [accountName, setAccountName] = useState("");
  const [sourceCard, setSourceCard] = useState(SOURCE_CARDS[0].id);
  const [pin, setPin] = useState(["", "", "", ""]);
  const [saveRecipient, setSaveRecipient] = useState(false);
  const [bankSearch, setBankSearch] = useState("");
  const [bankDropdownOpen, setBankDropdownOpen] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [recipientSearch, setRecipientSearch] = useState("");
  const pinRefs = [useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null)];

  const numAmount = parseFloat(amount.replace(/,/g, "")) || 0;
  const fee = numAmount > 0 ? (numAmount >= 5000 ? 52.5 : 26.25) : 0;
  const total = numAmount + fee;
  const selectedSource = SOURCE_CARDS.find((c) => c.id === sourceCard)!;
  const insufficient = total > selectedSource.balance;

  // Filter bank list
  const filteredBanks = BANKS.filter((b) => b.toLowerCase().includes(bankSearch.toLowerCase()));

  // Format amount display
  const formatAmount = (val: string) => {
    const digits = val.replace(/[^\d.]/g, "");
    const [int, dec] = digits.split(".");
    const formatted = parseInt(int || "0", 10).toLocaleString("en-NG");
    return dec !== undefined ? `${formatted}.${dec.slice(0, 2)}` : formatted;
  };

  // Simulate account verification
  useEffect(() => {
    if (accountNumber.length === 10 && bankName) {
      setVerifying(true);
      setAccountName("");
      const t = setTimeout(() => {
        setAccountName("ADEBAYO MICHAEL JOHNSON");
        setVerifying(false);
      }, 1400);
      return () => clearTimeout(t);
    } else {
      setAccountName("");
    }
  }, [accountNumber, bankName]);

  // PIN input handler
  const handlePin = (i: number, val: string) => {
    const v = val.replace(/\D/, "");
    const next = [...pin];
    next[i] = v;
    setPin(next);
    if (v && i < 3) pinRefs[i + 1].current?.focus();
    if (!v && i > 0) pinRefs[i - 1].current?.focus();
  };

  const canProceed = () => {
    if (method === "bank") {
      return accountNumber.length === 10 && bankName && accountName && numAmount > 0 && !insufficient;
    }
    if (method === "smhartpay") {
      return selectedRecipient && numAmount > 0 && !insufficient;
    }
    return numAmount > 0 && !insufficient;
  };

  const handleReview = () => setStep("review");

  const handleConfirm = () => {
    if (pin.join("").length < 4) return;
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      setStep("success");
    }, 2200);
  };

  const handleReset = () => {
    setStep("form");
    setAmount("");
    setNote("");
    setAccountNumber("");
    setAccountName("");
    setBankName("");
    setSelectedRecipient(null);
    setPin(["", "", "", ""]);
  };

  const filteredRecipients = RECENT_RECIPIENTS.filter((r) =>
    r.name.toLowerCase().includes(recipientSearch.toLowerCase())
  );

  return (
    <div>
      <Navbar />
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8">

        {/* ── Header ─────────────────────────────────────────────────────── */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-medium text-slate-400">SmhartPay</p>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Send Money</h1>
          </div>
          <StepIndicator step={step} />
        </div>

        {/* ── SUCCESS STATE ───────────────────────────────────────────────── */}
        {step === "success" && (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-emerald-100 text-5xl dark:bg-emerald-900/30">
              ✓
            </div>
            <h2 className="mb-2 text-2xl font-bold text-slate-900 dark:text-white">Transfer Successful!</h2>
            <p className="mb-1 text-slate-500 dark:text-slate-400">
              <span className="font-semibold text-slate-800 dark:text-slate-200">
                ₦{numAmount.toLocaleString("en-NG", { minimumFractionDigits: 2 })}
              </span>{" "}
              has been sent
            </p>
            <p className="mb-8 text-sm text-slate-400">
              Ref: TRF-{Math.random().toString(36).slice(2, 10).toUpperCase()}
            </p>

            <div className="mb-8 w-full max-w-sm rounded-2xl bg-white p-6 ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-800">
              <div className="flex flex-col gap-3 text-sm">
                {[
                  ["Recipient", method === "smhartpay" ? selectedRecipient?.name : accountName],
                  ["Bank", method === "smhartpay" ? selectedRecipient?.bank : bankName],
                  ["Amount", `₦${numAmount.toLocaleString("en-NG", { minimumFractionDigits: 2 })}`],
                  ["Fee", `₦${fee.toFixed(2)}`],
                  ["Date", new Date().toLocaleDateString("en-NG", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" })],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between">
                    <span className="text-slate-400">{k}</span>
                    <span className="font-medium text-slate-800 dark:text-slate-100">{v}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex w-full max-w-sm flex-col gap-3">
              <button className="w-full rounded-xl bg-emerald-500 py-3 text-sm font-semibold text-white hover:bg-emerald-600 active:scale-[0.98]">
                Download Receipt
              </button>
              <button onClick={handleReset} className="w-full rounded-xl border border-slate-200 py-3 text-sm font-medium text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800">
                New Transfer
              </button>
            </div>
          </div>
        )}

        {/* ── REVIEW STATE ────────────────────────────────────────────────── */}
        {step === "review" && (
          <div className="mx-auto max-w-lg">
            <div className="mb-6 rounded-2xl bg-white p-6 ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-800">
              <h2 className="mb-5 text-base font-semibold text-slate-800 dark:text-white">Confirm Transfer</h2>

              {/* Recipient row */}
              <div className="mb-5 flex items-center gap-4 rounded-xl bg-slate-50 p-4 dark:bg-slate-800/60">
                {method === "smhartpay" && selectedRecipient ? (
                  <>
                    <Avatar initials={selectedRecipient.initials} color={selectedRecipient.avatarColor} size="lg" />
                    <div>
                      <p className="font-semibold text-slate-800 dark:text-slate-100">{selectedRecipient.name}</p>
                      <p className="text-sm text-slate-400">{selectedRecipient.bank} · {selectedRecipient.accountNumber}</p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-200 text-2xl dark:bg-slate-700">🏦</div>
                    <div>
                      <p className="font-semibold text-slate-800 dark:text-slate-100">{accountName}</p>
                      <p className="text-sm text-slate-400">{bankName} · {accountNumber}</p>
                    </div>
                  </>
                )}
              </div>

              {/* Amount */}
              <div className="mb-5 text-center">
                <p className="text-4xl font-bold text-slate-900 dark:text-white">
                  ₦{numAmount.toLocaleString("en-NG", { minimumFractionDigits: 2 })}
                </p>
                {note && <p className="mt-1 text-sm text-slate-400">"{note}"</p>}
              </div>

              {/* Breakdown */}
              <div className="mb-5 flex flex-col gap-2 rounded-xl bg-slate-50 p-4 text-sm dark:bg-slate-800/60">
                {[
                  ["From", selectedSource.label],
                  ["Transfer amount", `₦${numAmount.toLocaleString("en-NG", { minimumFractionDigits: 2 })}`],
                  ["Transaction fee", `₦${fee.toFixed(2)}`],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between">
                    <span className="text-slate-400">{k}</span>
                    <span className="font-medium text-slate-700 dark:text-slate-200">{v}</span>
                  </div>
                ))}
                <div className="border-t border-slate-200 pt-2 dark:border-slate-700">
                  <div className="flex justify-between font-semibold">
                    <span className="text-slate-700 dark:text-slate-200">Total deducted</span>
                    <span className="text-slate-900 dark:text-white">₦{total.toLocaleString("en-NG", { minimumFractionDigits: 2 })}</span>
                  </div>
                </div>
              </div>

              {/* PIN entry */}
              <div className="mb-5">
                <p className="mb-3 text-sm font-medium text-slate-600 dark:text-slate-400">Enter your 4-digit PIN</p>
                <div className="flex justify-center gap-3">
                  {pin.map((p, i) => (
                    <input
                      key={i}
                      ref={pinRefs[i]}
                      type="password"
                      inputMode="numeric"
                      maxLength={1}
                      value={p}
                      onChange={(e) => handlePin(i, e.target.value)}
                      className="h-14 w-14 rounded-xl border-2 border-slate-200 bg-slate-50 text-center text-xl font-bold text-slate-800 outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                    />
                  ))}
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setStep("form")}
                  className="flex-1 rounded-xl border border-slate-200 py-3 text-sm font-medium text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                >
                  Edit
                </button>
                <button
                  onClick={handleConfirm}
                  disabled={pin.join("").length < 4 || processing}
                  className="flex-[2] rounded-xl bg-emerald-500 py-3 text-sm font-semibold text-white transition hover:bg-emerald-600 active:scale-[0.98] disabled:opacity-50"
                >
                  {processing ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      Processing…
                    </span>
                  ) : (
                    "Confirm & Send"
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ── FORM STATE ──────────────────────────────────────────────────── */}
        {step === "form" && (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">

            {/* ── Left: Transfer form ─────────────────────────────────────── */}
            <div className="flex flex-col gap-5 lg:col-span-2">

              {/* Method selector */}
              <div className="rounded-2xl bg-white p-6 ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-800">
                <h2 className="mb-4 text-sm font-semibold text-slate-700 dark:text-slate-300">Transfer Method</h2>
                <div className="grid grid-cols-3 gap-3">
                  {(
                    [
                      { key: "bank", icon: "🏦", label: "Bank Transfer" },
                      { key: "smhartpay", icon: "⚡", label: "SmhartPay" },
                      { key: "international", icon: "🌍", label: "International" },
                    ] as const
                  ).map(({ key, icon, label }) => (
                    <button
                      key={key}
                      onClick={() => setMethod(key)}
                      className={`flex flex-col items-center gap-2 rounded-xl p-4 transition-all ${
                        method === key
                          ? "bg-emerald-50 ring-2 ring-emerald-400 dark:bg-emerald-900/20 dark:ring-emerald-500"
                          : "bg-slate-50 hover:bg-slate-100 dark:bg-slate-800/60 dark:hover:bg-slate-800"
                      }`}
                    >
                      <span className="text-2xl">{icon}</span>
                      <span className="text-center text-xs font-medium text-slate-700 dark:text-slate-300">{label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* ── BANK TRANSFER FORM ─────────────────────────────────────── */}
              {method === "bank" && (
                <div className="rounded-2xl bg-white p-6 ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-800">
                  <h2 className="mb-5 text-sm font-semibold text-slate-700 dark:text-slate-300">Recipient Details</h2>

                  {/* Bank selector */}
                  <div className="relative mb-4">
                    <label className="mb-1.5 block text-xs font-medium text-slate-500 dark:text-slate-400">Bank Name</label>
                    <button
                      onClick={() => setBankDropdownOpen((o) => !o)}
                      className="flex w-full items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 transition hover:border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
                    >
                      <span className={bankName ? "" : "text-slate-400"}>{bankName || "Select a bank"}</span>
                      <span className={`transition-transform ${bankDropdownOpen ? "rotate-180" : ""}`}>▾</span>
                    </button>
                    {bankDropdownOpen && (
                      <div className="absolute z-20 mt-1 w-full overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl dark:border-slate-700 dark:bg-slate-900">
                        <div className="p-2">
                          <input
                            autoFocus
                            type="text"
                            placeholder="Search banks…"
                            value={bankSearch}
                            onChange={(e) => setBankSearch(e.target.value)}
                            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                          />
                        </div>
                        <div className="max-h-48 overflow-y-auto">
                          {filteredBanks.map((b) => (
                            <button
                              key={b}
                              onClick={() => { setBankName(b); setBankDropdownOpen(false); setBankSearch(""); }}
                              className={`w-full px-4 py-2.5 text-left text-sm hover:bg-slate-50 dark:hover:bg-slate-800 ${
                                bankName === b ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400" : "text-slate-700 dark:text-slate-300"
                              }`}
                            >
                              {b}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Account number */}
                  <div className="mb-4">
                    <label className="mb-1.5 block text-xs font-medium text-slate-500 dark:text-slate-400">Account Number</label>
                    <input
                      type="text"
                      inputMode="numeric"
                      maxLength={10}
                      placeholder="10-digit account number"
                      value={accountNumber}
                      onChange={(e) => setAccountNumber(e.target.value.replace(/\D/g, ""))}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder-slate-500"
                    />
                  </div>

                  {/* Account name (verified) */}
                  <div className="mb-2 min-h-[52px] rounded-xl border border-dashed border-slate-200 bg-slate-50 px-4 py-3 dark:border-slate-700 dark:bg-slate-800/60">
                    {verifying ? (
                      <div className="flex items-center gap-2 text-sm text-slate-400">
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-slate-300 border-t-emerald-500" />
                        Verifying account…
                      </div>
                    ) : accountName ? (
                      <div className="flex items-center gap-2">
                        <span className="text-emerald-500">✓</span>
                        <span className="text-sm font-semibold text-slate-800 dark:text-slate-100">{accountName}</span>
                      </div>
                    ) : (
                      <p className="text-xs text-slate-400">Account name will appear after verification</p>
                    )}
                  </div>
                </div>
              )}

              {/* ── SMHARTPAY TRANSFER ─────────────────────────────────────── */}
              {method === "smhartpay" && (
                <div className="rounded-2xl bg-white p-6 ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-800">
                  <h2 className="mb-4 text-sm font-semibold text-slate-700 dark:text-slate-300">Recent Recipients</h2>

                  {/* Search */}
                  <div className="relative mb-4">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">🔍</span>
                    <input
                      type="text"
                      placeholder="Search by name…"
                      value={recipientSearch}
                      onChange={(e) => setRecipientSearch(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-9 pr-4 text-sm outline-none focus:border-emerald-400 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder-slate-500"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-3 sm:grid-cols-5">
                    {filteredRecipients.map((r) => (
                      <RecipientCard
                        key={r.id}
                        r={r}
                        selected={selectedRecipient?.id === r.id}
                        onSelect={() => setSelectedRecipient(r)}
                      />
                    ))}
                  </div>

                  {selectedRecipient && (
                    <div className="mt-4 flex items-center gap-3 rounded-xl bg-emerald-50 p-3 dark:bg-emerald-900/20">
                      <Avatar initials={selectedRecipient.initials} color={selectedRecipient.avatarColor} size="sm" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">{selectedRecipient.name}</p>
                        <p className="text-xs text-slate-400">{selectedRecipient.bank} · {selectedRecipient.accountNumber}</p>
                      </div>
                      <button onClick={() => setSelectedRecipient(null)} className="text-slate-400 hover:text-slate-600">✕</button>
                    </div>
                  )}
                </div>
              )}

              {/* ── INTERNATIONAL TRANSFER ────────────────────────────────── */}
              {method === "international" && (
                <div className="rounded-2xl bg-white p-6 ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-800">
                  <h2 className="mb-5 text-sm font-semibold text-slate-700 dark:text-slate-300">International Wire Transfer</h2>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {[
                      { label: "Beneficiary Name", placeholder: "Full legal name" },
                      { label: "Beneficiary Bank", placeholder: "Bank name" },
                      { label: "IBAN / Account No.", placeholder: "IBAN or account number" },
                      { label: "SWIFT / BIC Code", placeholder: "e.g. BARCGB22" },
                      { label: "Routing Number", placeholder: "For USD transfers" },
                      { label: "Beneficiary Country", placeholder: "Select country" },
                    ].map(({ label, placeholder }) => (
                      <div key={label}>
                        <label className="mb-1.5 block text-xs font-medium text-slate-500 dark:text-slate-400">{label}</label>
                        <input
                          type="text"
                          placeholder={placeholder}
                          className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder-slate-500"
                        />
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 rounded-xl bg-amber-50 p-3 text-xs text-amber-700 dark:bg-amber-900/20 dark:text-amber-400">
                    ⚠️ International transfers may take 1–3 business days. Additional FX fees apply.
                  </div>
                </div>
              )}

              {/* ── Amount section ─────────────────────────────────────────── */}
              <div className="rounded-2xl bg-white p-6 ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-800">
                <h2 className="mb-4 text-sm font-semibold text-slate-700 dark:text-slate-300">Amount</h2>

                {/* Source card */}
                <div className="mb-4">
                  <label className="mb-1.5 block text-xs font-medium text-slate-500 dark:text-slate-400">From</label>
                  <div className="flex gap-2">
                    {SOURCE_CARDS.map((c) => (
                      <button
                        key={c.id}
                        onClick={() => setSourceCard(c.id)}
                        className={`flex-1 rounded-xl border px-3 py-2.5 text-left transition ${
                          sourceCard === c.id
                            ? "border-emerald-400 bg-emerald-50 dark:bg-emerald-900/20"
                            : "border-slate-200 hover:border-slate-300 dark:border-slate-700"
                        }`}
                      >
                        <p className="text-xs font-medium text-slate-700 dark:text-slate-300">{c.label}</p>
                        <p className="text-xs text-slate-400">₦{c.balance.toLocaleString("en-NG", { minimumFractionDigits: 2 })}</p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Amount input */}
                <div className="mb-4">
                  <label className="mb-1.5 block text-xs font-medium text-slate-500 dark:text-slate-400">Amount (₦)</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg font-bold text-slate-400">₦</span>
                    <input
                      type="text"
                      inputMode="decimal"
                      placeholder="0.00"
                      value={amount}
                      onChange={(e) => setAmount(formatAmount(e.target.value))}
                      className={`w-full rounded-xl border bg-slate-50 py-4 pl-9 pr-4 text-xl font-bold outline-none transition focus:ring-2 dark:bg-slate-800 dark:text-white dark:placeholder-slate-600 ${
                        insufficient
                          ? "border-rose-400 focus:border-rose-400 focus:ring-rose-100 dark:focus:ring-rose-900/30"
                          : "border-slate-200 focus:border-emerald-400 focus:ring-emerald-100"
                      }`}
                    />
                  </div>
                  {insufficient && (
                    <p className="mt-1 text-xs text-rose-500">Insufficient balance (available: ₦{selectedSource.balance.toLocaleString("en-NG", { minimumFractionDigits: 2 })})</p>
                  )}
                </div>

                {/* Quick amounts */}
                <div className="mb-4 flex flex-wrap gap-2">
                  {QUICK_AMOUNTS.map((q) => (
                    <button
                      key={q}
                      onClick={() => setAmount(q.toLocaleString("en-NG"))}
                      className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 transition hover:border-emerald-400 hover:bg-emerald-50 hover:text-emerald-700 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-emerald-900/20 dark:hover:text-emerald-400"
                    >
                      ₦{q.toLocaleString("en-NG")}
                    </button>
                  ))}
                </div>

                {/* Note */}
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-slate-500 dark:text-slate-400">Narration / Note <span className="text-slate-300">(optional)</span></label>
                  <input
                    type="text"
                    placeholder="e.g. School fees payment"
                    value={note}
                    maxLength={100}
                    onChange={(e) => setNote(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder-slate-500"
                  />
                </div>
              </div>

              {/* Schedule transfer */}
              <div className="rounded-2xl bg-white p-6 ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-800">
                <h2 className="mb-4 text-sm font-semibold text-slate-700 dark:text-slate-300">Schedule (Optional)</h2>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-slate-500 dark:text-slate-400">Transfer Date</label>
                    <input
                      type="date"
                      defaultValue={new Date().toISOString().slice(0, 10)}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-emerald-400 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-slate-500 dark:text-slate-400">Repeat</label>
                    <select className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-emerald-400 dark:border-slate-700 dark:bg-slate-800 dark:text-white">
                      <option value="once">One-time</option>
                      <option value="daily">Daily</option>
                      <option value="weekly">Weekly</option>
                      <option value="monthly">Monthly</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Save recipient */}
              <label className="flex cursor-pointer items-center gap-3 rounded-2xl bg-white px-5 py-4 ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-800">
                <div
                  onClick={() => setSaveRecipient((s) => !s)}
                  className={`relative h-6 w-11 flex-shrink-0 rounded-full transition-colors ${saveRecipient ? "bg-emerald-500" : "bg-slate-200 dark:bg-slate-700"}`}
                >
                  <div className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow transition-transform ${saveRecipient ? "translate-x-5" : "translate-x-1"}`} />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-700 dark:text-slate-300">Save recipient</p>
                  <p className="text-xs text-slate-400">Add this person to your frequent recipients list</p>
                </div>
              </label>

              {/* Submit button */}
              <button
                onClick={handleReview}
                disabled={!canProceed()}
                className="w-full rounded-2xl bg-emerald-500 py-4 text-base font-bold text-white shadow-lg shadow-emerald-200 transition hover:bg-emerald-600 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none dark:shadow-none"
              >
                Review Transfer →
              </button>
            </div>

            {/* ── Right: Summary sidebar ──────────────────────────────────── */}
            <div className="flex flex-col gap-5">

              {/* Transfer summary */}
              <div className="rounded-2xl bg-white p-6 ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-800">
                <h2 className="mb-4 text-sm font-semibold text-slate-700 dark:text-slate-300">Summary</h2>
                <div className="flex flex-col gap-3 text-sm">
                  {[
                    ["Method", method === "bank" ? "Bank Transfer" : method === "smhartpay" ? "SmhartPay" : "International"],
                    ["From", selectedSource.label],
                    ["To", method === "smhartpay" ? (selectedRecipient?.name || "—") : (accountName || "—")],
                    ["Amount", numAmount > 0 ? `₦${numAmount.toLocaleString("en-NG", { minimumFractionDigits: 2 })}` : "—"],
                    ["Fee", fee > 0 ? `₦${fee.toFixed(2)}` : "—"],
                  ].map(([k, v]) => (
                    <div key={k} className="flex justify-between">
                      <span className="text-slate-400">{k}</span>
                      <span className="font-medium text-slate-700 dark:text-slate-200 text-right max-w-[160px] truncate">{v}</span>
                    </div>
                  ))}
                  {numAmount > 0 && (
                    <div className="border-t border-slate-100 pt-3 dark:border-slate-800">
                      <div className="flex justify-between font-bold">
                        <span className="text-slate-700 dark:text-slate-200">Total</span>
                        <span className="text-slate-900 dark:text-white">₦{total.toLocaleString("en-NG", { minimumFractionDigits: 2 })}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Balance widget */}
              <div className="rounded-2xl bg-emerald-500 p-5 text-white">
                <p className="mb-1 text-xs font-medium text-white/70">Available Balance</p>
                <p className="text-2xl font-bold">₦{selectedSource.balance.toLocaleString("en-NG", { minimumFractionDigits: 2 })}</p>
                <p className="mt-1 text-xs text-white/60">{selectedSource.label}</p>
                {numAmount > 0 && !insufficient && (
                  <div className="mt-3 border-t border-white/20 pt-3">
                    <p className="text-xs text-white/70">After transfer</p>
                    <p className="text-lg font-semibold">₦{(selectedSource.balance - total).toLocaleString("en-NG", { minimumFractionDigits: 2 })}</p>
                  </div>
                )}
              </div>

              {/* Transfer limits */}
              <div className="rounded-2xl bg-white p-5 ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-800">
                <h2 className="mb-3 text-sm font-semibold text-slate-700 dark:text-slate-300">Transfer Limits</h2>
                <div className="flex flex-col gap-3">
                  {[
                    { label: "Daily limit", used: 45000, max: 200000 },
                    { label: "Single transfer", used: numAmount, max: 50000 },
                  ].map(({ label, used, max }) => {
                    const pct = Math.min((used / max) * 100, 100);
                    return (
                      <div key={label}>
                        <div className="mb-1 flex justify-between text-xs text-slate-500">
                          <span>{label}</span>
                          <span>₦{max.toLocaleString("en-NG")}</span>
                        </div>
                        <div className="h-1.5 w-full rounded-full bg-slate-100 dark:bg-slate-800">
                          <div
                            className={`h-1.5 rounded-full transition-all ${pct > 85 ? "bg-rose-400" : "bg-emerald-400"}`}
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Tips */}
              <div className="rounded-2xl bg-slate-50 p-5 ring-1 ring-slate-200 dark:bg-slate-800/60 dark:ring-slate-700">
                <p className="mb-2 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">Quick Tips</p>
                <ul className="flex flex-col gap-2 text-xs text-slate-500 dark:text-slate-400">
                  <li>• SmhartPay transfers are instant and free</li>
                  <li>• Bank transfers settle within 10 minutes</li>
                  <li>• International wires take 1–3 business days</li>
                  <li>• Set a schedule for recurring payments</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
    <Footer />
  </div>
  );
}