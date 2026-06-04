"use client"
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const countryCodes = [
  { code: "+234", country: "NG", flag: "🇳🇬", name: "Nigeria" },
  { code: "+1", country: "US", flag: "🇺🇸", name: "United States" },
  { code: "+44", country: "GB", flag: "🇬🇧", name: "United Kingdom" },
  { code: "+233", country: "GH", flag: "🇬🇭", name: "Ghana" },
  { code: "+27", country: "ZA", flag: "🇿🇦", name: "South Africa" },
  { code: "+254", country: "KE", flag: "🇰🇪", name: "Kenya" },
  { code: "+225", country: "CI", flag: "🇨🇮", name: "Côte d'Ivoire" },
  { code: "+221", country: "SN", flag: "🇸🇳", name: "Senegal" },
  { code: "+212", country: "MA", flag: "🇲🇦", name: "Morocco" },
  { code: "+20", country: "EG", flag: "🇪🇬", name: "Egypt" },
  { code: "+91", country: "IN", flag: "🇮🇳", name: "India" },
  { code: "+86", country: "CN", flag: "🇨🇳", name: "China" },
  { code: "+49", country: "DE", flag: "🇩🇪", name: "Germany" },
  { code: "+33", country: "FR", flag: "🇫🇷", name: "France" },
  { code: "+971", country: "AE", flag: "🇦🇪", name: "UAE" },
  { code: "+966", country: "SA", flag: "🇸🇦", name: "Saudi Arabia" },
  { code: "+55", country: "BR", flag: "🇧🇷", name: "Brazil" },
  { code: "+61", country: "AU", flag: "🇦🇺", name: "Australia" },
  { code: "+81", country: "JP", flag: "🇯🇵", name: "Japan" },
  { code: "+82", country: "KR", flag: "🇰🇷", name: "South Korea" },
];

export default function SignIn() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"individual" | "corporate">("individual");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(countryCodes[0]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [search, setSearch] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
        setSearch("");
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredCountries = countryCodes.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.code.includes(search) ||
      c.country.toLowerCase().includes(search.toLowerCase())
  );

  function handleTabSwitch(tab: "individual" | "corporate") {
    setActiveTab(tab);
    router.push(tab === "individual" ? "/signin" : "/signin/corporate");
  }

  function handleContinue() {
    if (activeTab === "individual") {
      router.push("/signin/verify");
    } else {
      router.push("/signin/corporate/verify");
    }
  }

  return (
    <div className="min-h-screen bg-white">

      {/* Navbar */}
      <div className="flex justify-between items-center px-5 sm:px-10 pt-5 pb-4 border-b border-gray-100">
        <Link href="/">
          <img src="/images/logo.png" alt="Logo" className="h-10 w-auto" />
        </Link>
        <p className="text-sm sm:text-[16px] text-[#647FA1]">
          Don't have an account Yet?{" "}
          <Link href="/create-account">
            <span className="cursor-pointer font-semibold text-black hover:text-[#034EA2] transition-colors duration-200">
              Create Account
            </span>
          </Link>
        </p>
      </div>

      {/* Main Content */}
      <div className="flex flex-col items-center px-4 sm:px-8 py-10 sm:py-16">

        {/* URL Security Banner */}
        <div className="w-full max-w-[460px] rounded-2xl bg-gradient-to-r from-[#1a4fa8] to-[#2563eb] p-5 flex items-center justify-between gap-4 mb-8 shadow-md">
          <div>
            <p className="text-white text-sm mb-1">Please verify you are using the right URL</p>
            <Link
              href="https://online.safehavenmfb.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white text-sm font-medium underline underline-offset-2"
            >
              https://online.safehavenmfb.com
            </Link>
          </div>
          <div className="shrink-0 w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
        </div>

        {/* Form */}
        <div className="w-full max-w-[460px]">
          <h1 className="text-2xl sm:text-[28px] font-bold text-[#0d1b2e] mb-1">Sign In</h1>
          <p className="text-[#647FA1] text-sm sm:text-[15px] mb-6">
            Hey Welcome back. Please enter your details
          </p>

          {/* Tab Toggle */}
          <div className="flex w-full rounded-xl bg-[#EEF3FB] p-1 mb-6">
            <button
              onClick={() => handleTabSwitch("individual")}
              className={`flex-1 py-2.5 rounded-lg text-sm sm:text-[15px] font-semibold transition-all duration-200 cursor-pointer ${
                activeTab === "individual"
                  ? "bg-white text-[#034EA2] shadow-sm"
                  : "text-[#647FA1] hover:text-[#034EA2]"
              }`}
            >
              Individual
            </button>
            <button
              onClick={() => handleTabSwitch("corporate")}
              className={`flex-1 py-2.5 rounded-lg text-sm sm:text-[15px] font-semibold transition-all duration-200 cursor-pointer ${
                activeTab === "corporate"
                  ? "bg-white text-[#034EA2] shadow-sm"
                  : "text-[#647FA1] hover:text-[#034EA2]"
              }`}
            >
              Corporate
            </button>
          </div>

          {/* INDIVIDUAL: Phone + Country Dropdown */}
          {activeTab === "individual" && (
            <div className="flex gap-2 mb-6 relative" ref={dropdownRef}>

              {/* Country Code Trigger */}
              <button
                onClick={() => { setDropdownOpen(!dropdownOpen); setSearch(""); }}
                className="flex items-center gap-1.5 px-3 py-3 rounded-xl border border-gray-200 bg-[#F8FAFC] min-w-[110px] hover:border-[#034EA2] transition-colors duration-200 cursor-pointer"
              >
                <span className="text-lg">{selectedCountry.flag}</span>
                <span className="text-sm font-medium text-[#0d1b2e]">{selectedCountry.code}</span>
                <svg xmlns="http://www.w3.org/2000/svg" className={`w-4 h-4 text-[#647FA1] transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Dropdown */}
              {dropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-72 bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 overflow-hidden">
                  {/* Search */}
                  <div className="p-3 border-b border-gray-100">
                    <input
                      type="text"
                      placeholder="Search country..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-[#F8FAFC] text-sm text-[#0d1b2e] placeholder:text-[#aab8cc] outline-none focus:border-[#034EA2]"
                      autoFocus
                    />
                  </div>
                  {/* Country List */}
                  <ul className="max-h-56 overflow-y-auto">
                    {filteredCountries.length > 0 ? (
                      filteredCountries.map((c) => (
                        <li key={c.code + c.country}>
                          <button
                            onClick={() => {
                              setSelectedCountry(c);
                              setDropdownOpen(false);
                              setSearch("");
                            }}
                            className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-[#EEF3FB] transition-colors duration-150 cursor-pointer ${
                              selectedCountry.country === c.country ? "bg-[#EEF3FB] text-[#034EA2] font-semibold" : "text-[#0d1b2e]"
                            }`}
                          >
                            <span className="text-lg">{c.flag}</span>
                            <span className="flex-1 text-left">{c.name}</span>
                            <span className="text-[#647FA1] font-medium">{c.code}</span>
                          </button>
                        </li>
                      ))
                    ) : (
                      <li className="px-4 py-4 text-sm text-[#647FA1] text-center">No results found</li>
                    )}
                  </ul>
                </div>
              )}

              {/* Phone Input */}
              <input
                type="tel"
                placeholder="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="flex-1 px-4 py-3 rounded-xl border border-gray-200 bg-[#F8FAFC] text-[#0d1b2e] text-sm sm:text-[15px] placeholder:text-[#aab8cc] outline-none focus:border-[#034EA2] focus:ring-2 focus:ring-[#034EA2]/10 transition-all duration-200"
              />
            </div>
          )}

          {/* CORPORATE: Email Input */}
          {activeTab === "corporate" && (
            <div className="mb-6">
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-[#F8FAFC] text-[#0d1b2e] text-sm sm:text-[15px] placeholder:text-[#aab8cc] outline-none focus:border-[#034EA2] focus:ring-2 focus:ring-[#034EA2]/10 transition-all duration-200"
              />
            </div>
          )}

          {/* Continue Button */}
          <button
            onClick={handleContinue}
            className="w-full py-3.5 rounded-xl bg-[#034EA2] hover:bg-[#023d82] text-white font-semibold text-sm sm:text-[16px] transition-colors duration-200 cursor-pointer shadow-md shadow-[#034EA2]/20"
          >
            Continue
          </button>

          {/* Having Issues */}
          <p className="text-center text-sm text-[#647FA1] mt-5">
            Having Issues?{" "}
            <Link href="/signin-email">
              <span className="font-semibold text-[#034EA2] cursor-pointer hover:underline">Use Email</span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}