"use client";

import { useState } from "react";
import {
  Smartphone,
  Wifi,
  Zap,
  Tv,
  Droplets,
  ShieldCheck,
  ChevronDown,
  Clock,
  CheckCircle2,
  ArrowRight,
  RefreshCw,
} from "lucide-react";
import Footer from "@/Components/layout/footer";
import Navbar from "@/Components/layout/Navbar";

// ── Types ──────────────────────────────────────────────────────────────────
type Tab = "airtime" | "data" | "electricity" | "tv" | "water";

interface Network {
  id: string;
  name: string;
  color: string;
  logo: string;
}

interface DataBundle {
  id: string;
  size: string;
  validity: string;
  price: string;
  popular?: boolean;
}

interface Transaction {
  id: string;
  type: string;
  detail: string;
  amount: string;
  date: string;
  status: "success" | "pending" | "failed";
}

// ── Constants ──────────────────────────────────────────────────────────────
const NETWORKS: Network[] = [
  { id: "mtn",    name: "MTN",    color: "#FFC107", logo: "M" },
  { id: "airtel", name: "Airtel", color: "#EF3340", logo: "A" },
  { id: "glo",    name: "Glo",    color: "#4CAF50", logo: "G" },
  { id: "9mobile",name: "9mobile",color: "#006B3F", logo: "9" },
];

const DATA_BUNDLES: DataBundle[] = [
  { id: "1", size: "500MB", validity: "1 Day",   price: "₦150" },
  { id: "2", size: "1GB",   validity: "1 Day",   price: "₦300" },
  { id: "3", size: "2GB",   validity: "3 Days",  price: "₦500",  popular: true },
  { id: "4", size: "5GB",   validity: "7 Days",  price: "₦1,500" },
  { id: "5", size: "10GB",  validity: "30 Days", price: "₦2,500", popular: true },
  { id: "6", size: "20GB",  validity: "30 Days", price: "₦4,000" },
  { id: "7", size: "50GB",  validity: "30 Days", price: "₦8,500" },
  { id: "8", size: "100GB", validity: "30 Days", price: "₦15,000" },
];

const TRANSACTIONS: Transaction[] = [
  { id: "1", type: "Airtime",     detail: "MTN • 08031234567",     amount: "₦500",    date: "Today, 10:42 AM",    status: "success" },
  { id: "2", type: "Data",        detail: "Airtel 2GB • 08051234567", amount: "₦500", date: "Today, 08:15 AM",    status: "success" },
  { id: "3", type: "Electricity", detail: "EKEDC • 45210987654",    amount: "₦5,000",  date: "Yesterday, 3:30 PM", status: "success" },
  { id: "4", type: "TV",          detail: "DSTV • Smart Plus",      amount: "₦4,615",  date: "Jun 3, 9:00 AM",     status: "pending" },
  { id: "5", type: "Airtime",     detail: "Glo • 08121234567",      amount: "₦200",    date: "Jun 2, 6:20 PM",     status: "success" },
];

const TABS: { id: Tab; label: string; icon: React.ReactNode }[] = [
  { id: "airtime",     label: "Airtime",     icon: <Smartphone size={18} /> },
  { id: "data",        label: "Data",        icon: <Wifi size={18} /> },
  { id: "electricity", label: "Electricity", icon: <Zap size={18} /> },
  { id: "tv",          label: "TV / Cable",  icon: <Tv size={18} /> },
  { id: "water",       label: "Water",       icon: <Droplets size={18} /> },
];

const QUICK_AMOUNTS = ["₦50", "₦100", "₦200", "₦500", "₦1,000", "₦2,000"];

// ── Sub-components ─────────────────────────────────────────────────────────

function NetworkSelector({
  selected,
  onSelect,
}: {
  selected: string;
  onSelect: (id: string) => void;
}) {
  return (
    <div className="flex gap-3 flex-wrap">
      {NETWORKS.map((n) => (
        <button
          key={n.id}
          onClick={() => onSelect(n.id)}
          className={`flex items-center gap-2 px-4 py-2 rounded-full border text-[13px] font-semibold transition-all duration-150 cursor-pointer ${
            selected === n.id
              ? "border-[#034EA2] bg-[#EEF4FF] text-[#034EA2]"
              : "border-gray-200 bg-white text-gray-500 hover:border-[#034EA2] hover:text-[#034EA2]"
          }`}
        >
          <span
            className="w-6 h-6 rounded-full flex items-center justify-center text-white text-[10px] font-black"
            style={{ background: n.color }}
          >
            {n.logo}
          </span>
          {n.name}
        </button>
      ))}
    </div>
  );
}

function FormInput({
  label,
  placeholder,
  type = "text",
  value,
  onChange,
}: {
  label: string;
  placeholder: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[13px] font-medium text-gray-600">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-[14px] text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-[#034EA2] focus:ring-2 focus:ring-[#034EA2]/10 transition-all"
      />
    </div>
  );
}

function SelectInput({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[13px] font-medium text-gray-600">{label}</label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full appearance-none border border-gray-200 rounded-xl px-4 py-3 text-[14px] text-gray-800 focus:outline-none focus:border-[#034EA2] focus:ring-2 focus:ring-[#034EA2]/10 transition-all bg-white cursor-pointer"
        >
          {options.map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>
        <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
      </div>
    </div>
  );
}

function SubmitButton({ label }: { label: string }) {
  return (
    <button className="w-full bg-[#034EA2] hover:bg-[#023d82] active:scale-[0.98] text-white font-semibold py-3.5 rounded-xl text-[15px] transition-all duration-150 flex items-center justify-center gap-2 cursor-pointer mt-2">
      {label} <ArrowRight size={18} />
    </button>
  );
}

// ── Tab Panels ─────────────────────────────────────────────────────────────

function AirtimePanel() {
  const [network, setNetwork] = useState("mtn");
  const [phone, setPhone] = useState("");
  const [amount, setAmount] = useState("");

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-1.5">
        <label className="text-[13px] font-medium text-gray-600">Select Network</label>
        <NetworkSelector selected={network} onSelect={setNetwork} />
      </div>
      <FormInput label="Phone Number" placeholder="08XXXXXXXXX" type="tel" value={phone} onChange={setPhone} />
      <div className="flex flex-col gap-1.5">
        <label className="text-[13px] font-medium text-gray-600">Amount</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount (e.g. 500)"
          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-[14px] text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-[#034EA2] focus:ring-2 focus:ring-[#034EA2]/10 transition-all"
        />
        <div className="flex flex-wrap gap-2 mt-1">
          {QUICK_AMOUNTS.map((a) => (
            <button
              key={a}
              onClick={() => setAmount(a.replace("₦", "").replace(",", ""))}
              className="px-3 py-1 rounded-full bg-[#EEF4FF] text-[#034EA2] text-[12px] font-medium hover:bg-[#034EA2] hover:text-white transition-colors cursor-pointer"
            >
              {a}
            </button>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-2">
        <input type="checkbox" id="self" className="accent-[#034EA2] w-4 h-4 cursor-pointer" defaultChecked />
        <label htmlFor="self" className="text-[13px] text-gray-600 cursor-pointer">Top up my own number</label>
      </div>
      <SubmitButton label="Buy Airtime" />
    </div>
  );
}

function DataPanel() {
  const [network, setNetwork] = useState("mtn");
  const [phone, setPhone]     = useState("");
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-1.5">
        <label className="text-[13px] font-medium text-gray-600">Select Network</label>
        <NetworkSelector selected={network} onSelect={setNetwork} />
      </div>
      <FormInput label="Phone Number" placeholder="08XXXXXXXXX" type="tel" value={phone} onChange={setPhone} />
      <div className="flex flex-col gap-2">
        <label className="text-[13px] font-medium text-gray-600">Choose Bundle</label>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {DATA_BUNDLES.map((b) => (
            <button
              key={b.id}
              onClick={() => setSelected(b.id)}
              className={`relative flex flex-col items-center justify-center p-3 rounded-xl border text-center transition-all duration-150 cursor-pointer ${
                selected === b.id
                  ? "border-[#034EA2] bg-[#EEF4FF]"
                  : "border-gray-200 bg-white hover:border-[#034EA2]/50"
              }`}
            >
              {b.popular && (
                <span className="absolute -top-2 left-1/2 -translate-x-1/2 bg-[#034EA2] text-white text-[9px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap">
                  POPULAR
                </span>
              )}
              <span className="text-[15px] font-bold text-gray-800">{b.size}</span>
              <span className="text-[11px] text-gray-400 mt-0.5">{b.validity}</span>
              <span className="text-[13px] font-semibold text-[#034EA2] mt-1">{b.price}</span>
            </button>
          ))}
        </div>
      </div>
      <SubmitButton label="Buy Data" />
    </div>
  );
}

function ElectricityPanel() {
  const [disco, setDisco] = useState("EKEDC");
  const [meter, setMeter] = useState("");
  const [type, setType]   = useState("Prepaid");
  const [amount, setAmount] = useState("");

  return (
    <div className="flex flex-col gap-5">
      <SelectInput
        label="Distribution Company (DISCO)"
        options={["EKEDC", "IKEDC", "AEDC", "PHEDC", "KEDCO", "IBEDC", "BEDC", "EEDC"]}
        value={disco}
        onChange={setDisco}
      />
      <SelectInput label="Meter Type" options={["Prepaid", "Postpaid"]} value={type} onChange={setType} />
      <FormInput label="Meter Number" placeholder="Enter meter number" value={meter} onChange={setMeter} />
      <div className="flex flex-col gap-1.5">
        <label className="text-[13px] font-medium text-gray-600">Amount (₦)</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Minimum ₦1,000"
          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-[14px] text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-[#034EA2] focus:ring-2 focus:ring-[#034EA2]/10 transition-all"
        />
        <div className="flex flex-wrap gap-2 mt-1">
          {["₦1,000","₦2,000","₦5,000","₦10,000","₦20,000"].map((a) => (
            <button
              key={a}
              onClick={() => setAmount(a.replace("₦","").replace(",",""))}
              className="px-3 py-1 rounded-full bg-[#EEF4FF] text-[#034EA2] text-[12px] font-medium hover:bg-[#034EA2] hover:text-white transition-colors cursor-pointer"
            >
              {a}
            </button>
          ))}
        </div>
      </div>
      <SubmitButton label="Pay Electricity Bill" />
    </div>
  );
}

function TVPanel() {
  const [provider, setProvider]   = useState("DSTV");
  const [smartcard, setSmartcard] = useState("");
  const [plan, setPlan]           = useState("Select a plan");

  const plans: Record<string, string[]> = {
    DSTV:    ["Padi – ₦2,950", "Yanga – ₦3,900", "Confam – ₦6,200", "Compact – ₦11,000", "Compact Plus – ₦16,600", "Premium – ₦24,500"],
    GOTV:    ["Lite – ₦900", "Jinja – ₦2,250", "Jolli – ₦3,800", "Max – ₦5,700", "Supa – ₦7,200"],
    Startimes: ["Nova – ₦900", "Basic – ₦1,850", "Smart – ₦2,600", "Classic – ₦3,100", "Super – ₦5,200"],
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-1.5">
        <label className="text-[13px] font-medium text-gray-600">Cable Provider</label>
        <div className="flex gap-3 flex-wrap">
          {["DSTV", "GOTV", "Startimes"].map((p) => (
            <button
              key={p}
              onClick={() => { setProvider(p); setPlan("Select a plan"); }}
              className={`px-5 py-2 rounded-full border text-[13px] font-semibold transition-all cursor-pointer ${
                provider === p
                  ? "border-[#034EA2] bg-[#EEF4FF] text-[#034EA2]"
                  : "border-gray-200 text-gray-500 hover:border-[#034EA2] hover:text-[#034EA2]"
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>
      <FormInput label="Smart Card / IUC Number" placeholder="Enter smartcard number" value={smartcard} onChange={setSmartcard} />
      <SelectInput label="Subscription Plan" options={["Select a plan", ...(plans[provider] ?? [])]} value={plan} onChange={setPlan} />
      <SubmitButton label="Pay TV Subscription" />
    </div>
  );
}

function WaterPanel() {
  const [state, setState]     = useState("Lagos");
  const [account, setAccount] = useState("");
  const [amount, setAmount]   = useState("");

  return (
    <div className="flex flex-col gap-5">
      <SelectInput
        label="State"
        options={["Lagos", "Abuja", "Rivers", "Ogun", "Oyo", "Kano", "Kaduna"]}
        value={state}
        onChange={setState}
      />
      <FormInput label="Account / Customer Number" placeholder="Enter account number" value={account} onChange={setAccount} />
      <div className="flex flex-col gap-1.5">
        <label className="text-[13px] font-medium text-gray-600">Amount (₦)</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount"
          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-[14px] text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-[#034EA2] focus:ring-2 focus:ring-[#034EA2]/10 transition-all"
        />
      </div>
      <SubmitButton label="Pay Water Bill" />
    </div>
  );
}

// ── Main Page ──────────────────────────────────────────────────────────────
export default function VTUPage() {
  const [activeTab, setActiveTab] = useState<Tab>("airtime");

  const renderPanel = () => {
    switch (activeTab) {
      case "airtime":     return <AirtimePanel />;
      case "data":        return <DataPanel />;
      case "electricity": return <ElectricityPanel />;
      case "tv":          return <TVPanel />;
      case "water":       return <WaterPanel />;
    }
  };

  const statusStyle = (s: Transaction["status"]) => {
    if (s === "success") return "text-emerald-600 bg-emerald-50";
    if (s === "pending") return "text-amber-600 bg-amber-50";
    return "text-red-500 bg-red-50";
  };

  const tabIcon = (id: Tab) => TABS.find((t) => t.id === id)?.icon;

  return (
    <div>
      <Navbar />
    <div className="min-h-screen bg-[#F5F7FB] px-4 sm:px-6 md:px-10 lg:px-20 py-10 md:py-14">
      <div className="max-w-6xl mx-auto flex flex-col gap-8">

        {/* ── Page Header ── */}
        <div>
          <h1 className="text-[24px] sm:text-[28px] md:text-[32px] font-bold text-[#1A202E]">
            VTU Services
          </h1>
          <p className="text-[14px] sm:text-[15px] text-[#64748B] mt-1">
            Buy airtime, data, pay bills and more — instantly and securely.
          </p>
        </div>

        {/* ── Trust Bar ── */}
        <div className="bg-[#034EA2] rounded-2xl px-5 sm:px-8 py-4 flex flex-wrap items-center gap-4 sm:gap-8">
          {[
            { icon: <ShieldCheck size={18} />, text: "Secured & Encrypted" },
            { icon: <Zap size={18} />,         text: "Instant Delivery" },
            { icon: <RefreshCw size={18} />,   text: "24/7 Availability" },
            { icon: <CheckCircle2 size={18} />,text: "100% Reliable" },
          ].map(({ icon, text }) => (
            <div key={text} className="flex items-center gap-2 text-white text-[13px] font-medium">
              <span className="opacity-80">{icon}</span>
              {text}
            </div>
          ))}
        </div>

        {/* ── Main Content: Form + History ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6">

          {/* ── Left: VTU Form Card ── */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">

            {/* Tab bar */}
            <div className="flex overflow-x-auto border-b border-gray-100 scrollbar-hide">
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 sm:px-6 py-4 text-[13px] sm:text-[14px] font-semibold whitespace-nowrap transition-all duration-150 cursor-pointer border-b-2 -mb-px ${
                    activeTab === tab.id
                      ? "border-[#034EA2] text-[#034EA2] bg-[#EEF4FF]/50"
                      : "border-transparent text-gray-400 hover:text-gray-700"
                  }`}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Active panel */}
            <div className="p-5 sm:p-7">
              {/* Panel heading */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-9 h-9 rounded-xl bg-[#EEF4FF] flex items-center justify-center text-[#034EA2]">
                  {tabIcon(activeTab)}
                </div>
                <div>
                  <h2 className="text-[15px] font-bold text-gray-800">
                    {TABS.find((t) => t.id === activeTab)?.label}
                  </h2>
                  <p className="text-[12px] text-gray-400">
                    Fill in the details below to proceed
                  </p>
                </div>
              </div>

              {renderPanel()}
            </div>
          </div>

          {/* ── Right: Wallet Balance + Recent Transactions ── */}
          <div className="flex flex-col gap-5">

            {/* Wallet balance card */}
            <div className="bg-[#034EA2] rounded-2xl p-6 text-white">
              <p className="text-[13px] opacity-70 mb-1">Wallet Balance</p>
              <h2 className="text-[32px] font-bold leading-none">₦24,500<span className="text-[16px] font-normal opacity-60">.00</span></h2>
              <div className="mt-5 pt-4 border-t border-white/20 flex items-center justify-between">
                <div>
                  <p className="text-[11px] opacity-60">Today's Spend</p>
                  <p className="text-[15px] font-semibold">₦1,000</p>
                </div>
                <div className="text-right">
                  <p className="text-[11px] opacity-60">This Month</p>
                  <p className="text-[15px] font-semibold">₦12,350</p>
                </div>
                <button className="bg-white/20 hover:bg-white/30 transition-colors px-4 py-2 rounded-xl text-[13px] font-semibold cursor-pointer">
                  Top Up
                </button>
              </div>
            </div>

            {/* Recent transactions */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 flex-1">
              <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
                <div className="flex items-center gap-2 text-gray-800 font-semibold text-[14px]">
                  <Clock size={15} className="text-[#034EA2]" />
                  Recent Transactions
                </div>
                <a href="/transactions" className="text-[12px] text-[#034EA2] font-medium hover:underline flex items-center gap-1">
                  See all <ArrowRight size={13} />
                </a>
              </div>
              <div className="divide-y divide-gray-50">
                {TRANSACTIONS.map((tx) => (
                  <div key={tx.id} className="flex items-center justify-between px-5 py-3.5 hover:bg-gray-50/60 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#EEF4FF] flex items-center justify-center text-[#034EA2] flex-shrink-0">
                        {tx.type === "Airtime"     && <Smartphone size={14} />}
                        {tx.type === "Data"        && <Wifi size={14} />}
                        {tx.type === "Electricity" && <Zap size={14} />}
                        {tx.type === "TV"          && <Tv size={14} />}
                        {tx.type === "Water"       && <Droplets size={14} />}
                      </div>
                      <div>
                        <p className="text-[13px] font-semibold text-gray-800 leading-tight">{tx.type}</p>
                        <p className="text-[11px] text-gray-400">{tx.detail}</p>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0 ml-3">
                      <p className="text-[13px] font-semibold text-gray-800">{tx.amount}</p>
                      <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${statusStyle(tx.status)}`}>
                        {tx.status.charAt(0).toUpperCase() + tx.status.slice(1)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── How It Works ── */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm px-6 sm:px-8 py-8">
          <h2 className="text-[17px] sm:text-[19px] font-bold text-gray-900 mb-6">How It Works</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { step: "01", title: "Select a Service",   desc: "Choose from airtime, data, electricity, TV, or water bills.",       icon: <Smartphone size={22} /> },
              { step: "02", title: "Enter Details",      desc: "Fill in the recipient's phone number, meter, or account details.",   icon: <Wifi size={22} /> },
              { step: "03", title: "Confirm & Pay",      desc: "Review your order and complete payment from your SmhartPay wallet.", icon: <CheckCircle2 size={22} /> },
            ].map(({ step, title, desc, icon }) => (
              <div key={step} className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-xl bg-[#EEF4FF] flex items-center justify-center text-[#034EA2] flex-shrink-0">
                  {icon}
                </div>
                <div>
                  <p className="text-[11px] font-bold text-[#034EA2] tracking-widest mb-1">STEP {step}</p>
                  <h3 className="text-[14px] font-semibold text-gray-800 mb-1">{title}</h3>
                  <p className="text-[13px] text-[#64748B] leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── FAQ ── */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm px-6 sm:px-8 py-8">
          <h2 className="text-[17px] sm:text-[19px] font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
          <div className="flex flex-col divide-y divide-gray-100">
            {[
              { q: "How fast is airtime or data delivery?",          a: "Airtime and data are delivered instantly upon successful payment, 24/7." },
              { q: "What happens if my transaction fails?",           a: "Failed transactions are automatically reversed to your wallet within minutes. If it takes longer, contact support." },
              { q: "Can I buy for another person?",                  a: "Yes. Simply uncheck 'Top up my own number' and enter the beneficiary's phone number." },
              { q: "Is there a transaction limit?",                  a: "Limits depend on your account verification level. Fully verified accounts enjoy higher limits." },
              { q: "Which electricity providers are supported?",     a: "We support all major DISCOs in Nigeria including EKEDC, IKEDC, AEDC, PHEDC, KEDCO, IBEDC, BEDC, and EEDC." },
            ].map(({ q, a }) => (
              <details key={q} className="group py-4">
                <summary className="flex items-center justify-between cursor-pointer list-none text-[14px] font-semibold text-gray-700 group-open:text-[#034EA2]">
                  {q}
                  <ChevronDown size={16} className="text-gray-400 group-open:rotate-180 transition-transform flex-shrink-0 ml-4" />
                </summary>
                <p className="mt-3 text-[13px] text-[#64748B] leading-relaxed">{a}</p>
              </details>
            ))}
          </div>
        </div>

      </div>
    </div>
    <Footer />
    </div>
  );
}