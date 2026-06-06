"use client";

import { useState, useEffect, useRef } from "react";

// ─────────────────────────────────────────────────────────────────
// CATEGORIES (right sidebar) — add new categories here
// ─────────────────────────────────────────────────────────────────
const categories = [
  {
    id: "personal-banking",
    label: "SmhartPay Personal Banking General Terms and Conditions and Services",
  },
  {
    id: "corporate-banking",
    label: "SmhartPay Corporate Banking General Terms and Conditions and Services",
  },
  {
    id: "virtual-banking",
    label: "SmhartPay Virtual Banking General Terms and Conditions and Services",
  },
  {
    id: "customer-api",
    label: "Customer API Usage Terms and Conditions",
  },
  // ── ADD A NEW CATEGORY BELOW ──
  // {
  //   id: "your-category-id",
  //   label: "Your Category Label",
  // },
];

// ─────────────────────────────────────────────────────────────────
// SECTIONS (main body content)
// Each section belongs to a categoryId — it shows when that
// category is active. Add new sections inside any category below.
// ─────────────────────────────────────────────────────────────────
const sections: {
  id: string;
  categoryId: string;
  title?: string;
  isHeading?: boolean;
  content: React.ReactNode;
}[] = [

  // ── PERSONAL BANKING ─────────────────────────────────────────
  {
    id: "personal-heading",
    categoryId: "personal-banking",
    isHeading: true,
    content: (
      <h2 className="text-[15px] sm:text-[16px] md:text-[17px] font-bold text-[#034EA2] uppercase leading-snug mb-6">
        SmhartPay Personal Banking General Terms and Conditions and Services
      </h2>
    ),
  },
  {
    id: "personal-intro",
    categoryId: "personal-banking",
    title: "INTRODUCTION",
    content: (
      <>
        <p className="text-gray-600 text-[14px] sm:text-[15px] leading-relaxed mb-3">
          These terms guide the general relationship between SmhartPay ("we",
          "us", "our") and the Customer ("you", "your", "yours") and are
          binding immediately upon opening an account with us.
        </p>
        <p className="text-gray-600 text-[14px] sm:text-[15px] leading-relaxed mb-3">
          Some other products and services may be offered by SmhartPay as part
          of the platform and each of them has its own Terms and/or conditions,
          and you are bound by those specific terms as well.
        </p>
        <p className="text-gray-600 text-[14px] sm:text-[15px] leading-relaxed">
          You are encouraged to read these Terms carefully and to pay attention
          to the clauses contained herein.
        </p>
        {/* ── ADD MORE INTRO CONTENT BELOW ── */}
      </>
    ),
  },
  {
    id: "personal-account",
    categoryId: "personal-banking",
    title: "1.   YOUR ACCOUNT – OPENING, ACCESS, USAGE",
    content: (
      <>
        <div className="space-y-4 text-gray-600 text-[14px] sm:text-[15px] leading-relaxed">
          <div className="flex gap-4">
            <span className="font-bold text-gray-800 flex-shrink-0">1.1.</span>
            <p>
              We have no obligation to open or maintain an already opened
              account except where you provide all required documents and
              complete the KYC procedure as may be required from time to time.
            </p>
          </div>
          <div className="flex gap-4">
            <span className="font-bold text-gray-800 flex-shrink-0">1.2.</span>
            <p>
              You are responsible for maintaining the confidentiality of your
              login credentials and are fully responsible for all activities
              that occur under your account.
            </p>
          </div>
          <div className="flex gap-4">
            <span className="font-bold text-gray-800 flex-shrink-0">1.3.</span>
            <p>
              You agree to notify us immediately of any unauthorised use of
              your account or any other breach of security.
            </p>
          </div>
          {/* ── ADD MORE CLAUSES BELOW ── */}
        </div>
      </>
    ),
  },
  {
    id: "personal-transactions",
    categoryId: "personal-banking",
    title: "2.   TRANSACTIONS AND PAYMENTS",
    content: (
      <>
        <div className="space-y-4 text-gray-600 text-[14px] sm:text-[15px] leading-relaxed">
          <div className="flex gap-4">
            <span className="font-bold text-gray-800 flex-shrink-0">2.1.</span>
            <p>
              All transactions carried out on the SmhartPay platform are
              subject to available account balance, applicable limits, and
              regulatory requirements.
            </p>
          </div>
          <div className="flex gap-4">
            <span className="font-bold text-gray-800 flex-shrink-0">2.2.</span>
            <p>
              SmhartPay reserves the right to decline or reverse any
              transaction that is suspected to be fraudulent, erroneous, or in
              violation of these Terms.
            </p>
          </div>
          <div className="flex gap-4">
            <span className="font-bold text-gray-800 flex-shrink-0">2.3.</span>
            <p>
              Transaction fees and applicable charges will be disclosed to you
              prior to completing a transaction where required by law.
            </p>
          </div>
          {/* ── ADD MORE CLAUSES BELOW ── */}
        </div>
      </>
    ),
  },
  {
    id: "personal-liability",
    categoryId: "personal-banking",
    title: "3.   LIABILITY AND INDEMNITY",
    content: (
      <>
        <div className="space-y-4 text-gray-600 text-[14px] sm:text-[15px] leading-relaxed">
          <div className="flex gap-4">
            <span className="font-bold text-gray-800 flex-shrink-0">3.1.</span>
            <p>
              SmhartPay shall not be liable for any indirect, incidental, or
              consequential loss or damage arising from your use of the
              platform, except where prohibited by applicable law.
            </p>
          </div>
          <div className="flex gap-4">
            <span className="font-bold text-gray-800 flex-shrink-0">3.2.</span>
            <p>
              You agree to indemnify and hold SmhartPay harmless from any
              claims, losses, or expenses arising out of your breach of these
              Terms or misuse of the platform.
            </p>
          </div>
          {/* ── ADD MORE CLAUSES BELOW ── */}
        </div>
      </>
    ),
  },

  // ── CORPORATE BANKING ────────────────────────────────────────
  {
    id: "corporate-heading",
    categoryId: "corporate-banking",
    isHeading: true,
    content: (
      <h2 className="text-[15px] sm:text-[16px] md:text-[17px] font-bold text-[#034EA2] uppercase leading-snug mb-6">
        SmhartPay Corporate Banking General Terms and Conditions and Services
      </h2>
    ),
  },
  {
    id: "corporate-intro",
    categoryId: "corporate-banking",
    title: "INTRODUCTION",
    content: (
      <>
        <p className="text-gray-600 text-[14px] sm:text-[15px] leading-relaxed mb-3">
          These Corporate Banking Terms govern the relationship between
          SmhartPay and registered businesses, enterprises, and corporate
          entities using our platform for business financial operations.
        </p>
        <p className="text-gray-600 text-[14px] sm:text-[15px] leading-relaxed">
          Corporate accounts are subject to additional verification, regulatory
          compliance, and usage policies as defined herein.
        </p>
        {/* ── ADD MORE CORPORATE INTRO CONTENT BELOW ── */}
      </>
    ),
  },
  {
    id: "corporate-eligibility",
    categoryId: "corporate-banking",
    title: "1.   ELIGIBILITY AND ACCOUNT OPENING",
    content: (
      <>
        <div className="space-y-4 text-gray-600 text-[14px] sm:text-[15px] leading-relaxed">
          <div className="flex gap-4">
            <span className="font-bold text-gray-800 flex-shrink-0">1.1.</span>
            <p>
              Corporate accounts are available to duly registered businesses
              and legal entities operating within Nigeria.
            </p>
          </div>
          <div className="flex gap-4">
            <span className="font-bold text-gray-800 flex-shrink-0">1.2.</span>
            <p>
              Applicants must provide valid Certificate of Incorporation, Memorandum
              and Articles of Association, and other documents as required by
              applicable law and SmhartPay policy.
            </p>
          </div>
          {/* ── ADD MORE CLAUSES BELOW ── */}
        </div>
      </>
    ),
  },

  // ── VIRTUAL BANKING ──────────────────────────────────────────
  {
    id: "virtual-heading",
    categoryId: "virtual-banking",
    isHeading: true,
    content: (
      <h2 className="text-[15px] sm:text-[16px] md:text-[17px] font-bold text-[#034EA2] uppercase leading-snug mb-6">
        SmhartPay Virtual Banking General Terms and Conditions and Services
      </h2>
    ),
  },
  {
    id: "virtual-intro",
    categoryId: "virtual-banking",
    title: "INTRODUCTION",
    content: (
      <>
        <p className="text-gray-600 text-[14px] sm:text-[15px] leading-relaxed mb-3">
          These terms govern the use of SmhartPay virtual card and virtual
          banking services, including NGN and USD virtual cards, online
          payments, and digital wallet features.
        </p>
        {/* ── ADD MORE VIRTUAL INTRO CONTENT BELOW ── */}
      </>
    ),
  },
  {
    id: "virtual-usage",
    categoryId: "virtual-banking",
    title: "1.   VIRTUAL CARD USAGE",
    content: (
      <>
        <div className="space-y-4 text-gray-600 text-[14px] sm:text-[15px] leading-relaxed">
          <div className="flex gap-4">
            <span className="font-bold text-gray-800 flex-shrink-0">1.1.</span>
            <p>
              Virtual cards issued by SmhartPay are for online transactions only
              and may not be used at physical POS terminals or ATMs unless
              otherwise specified.
            </p>
          </div>
          <div className="flex gap-4">
            <span className="font-bold text-gray-800 flex-shrink-0">1.2.</span>
            <p>
              SmhartPay reserves the right to suspend or terminate virtual card
              services in cases of suspicious activity, policy violations, or
              regulatory requirements.
            </p>
          </div>
          {/* ── ADD MORE CLAUSES BELOW ── */}
        </div>
      </>
    ),
  },

  // ── CUSTOMER API ─────────────────────────────────────────────
  {
    id: "api-heading",
    categoryId: "customer-api",
    isHeading: true,
    content: (
      <h2 className="text-[15px] sm:text-[16px] md:text-[17px] font-bold text-[#034EA2] uppercase leading-snug mb-6">
        Customer API Usage Terms and Conditions
      </h2>
    ),
  },
  {
    id: "api-intro",
    categoryId: "customer-api",
    title: "INTRODUCTION",
    content: (
      <>
        <p className="text-gray-600 text-[14px] sm:text-[15px] leading-relaxed mb-3">
          These API Terms govern access to and use of SmhartPay developer APIs,
          SDKs, and integration tools. By accessing the SmhartPay API, you agree
          to be bound by these terms.
        </p>
        {/* ── ADD MORE API INTRO CONTENT BELOW ── */}
      </>
    ),
  },
  {
    id: "api-access",
    categoryId: "customer-api",
    title: "1.   API ACCESS AND CREDENTIALS",
    content: (
      <>
        <div className="space-y-4 text-gray-600 text-[14px] sm:text-[15px] leading-relaxed">
          <div className="flex gap-4">
            <span className="font-bold text-gray-800 flex-shrink-0">1.1.</span>
            <p>
              API credentials are issued solely for the registered entity and
              must not be shared with third parties without prior written
              approval from SmhartPay.
            </p>
          </div>
          <div className="flex gap-4">
            <span className="font-bold text-gray-800 flex-shrink-0">1.2.</span>
            <p>
              You are responsible for maintaining the confidentiality and
              security of all API keys and access tokens issued to your account.
            </p>
          </div>
          {/* ── ADD MORE CLAUSES BELOW ── */}
        </div>
      </>
    ),
  },

  // ── ADD A NEW SECTION BELOW FOLLOWING THIS TEMPLATE ──────────
  // {
  //   id: "unique-section-id",
  //   categoryId: "personal-banking", // match one of the category ids above
  //   title: "X.   YOUR SECTION TITLE",
  //   content: (
  //     <>
  //       <p className="text-gray-600 text-[14px] sm:text-[15px] leading-relaxed">
  //         Your content here...
  //       </p>
  //       {/* ── ADD MORE CONTENT BELOW ── */}
  //     </>
  //   ),
  // },
];

// ─── Categories sidebar ───────────────────────────────────────────

function CategoriesSidebar({
  activeCategory,
  onSelect,
}: {
  activeCategory: string;
  onSelect: (id: string) => void;
}) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
      {/* Header */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="w-full flex items-center justify-between px-5 py-4 cursor-pointer"
      >
        <span className="text-[16px] sm:text-[17px] font-bold text-gray-900">
          Categories
        </span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16" height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`text-gray-500 transition-transform duration-300 ${
            collapsed ? "rotate-180" : "rotate-0"
          }`}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {/* Category list */}
      <div
        className="overflow-y-auto transition-all duration-300"
        style={{ maxHeight: collapsed ? "0px" : "460px" }}
      >
        <div className="px-4 pb-4 flex flex-col divide-y divide-gray-100">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => onSelect(cat.id)}
                className={`
                  text-left py-4 text-[13px] sm:text-[14px] font-semibold
                  leading-snug transition-colors duration-150
                  flex items-start gap-2.5
                  ${isActive
                    ? "text-[#034EA2]"
                    : "text-gray-400 hover:text-gray-700"
                  }
                `}
              >
                <span
                  className={`
                    mt-1 flex-shrink-0 w-2 h-2 rounded-full transition-all duration-200
                    ${isActive ? "bg-[#034EA2] opacity-100" : "opacity-0 w-0"}
                  `}
                />
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─── Main Terms & Conditions Page ────────────────────────────────

export default function TermsofUse() {
  const [activeCategory, setActiveCategory] = useState(categories[0].id);
  const topRef = useRef<HTMLDivElement>(null);

  const activeSections = sections.filter(
    (s) => s.categoryId === activeCategory
  );

  const handleCategorySelect = (id: string) => {
    setActiveCategory(id);
    if (topRef.current) {
      const offset = 100;
      const top =
        topRef.current.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 md:px-10 py-14 sm:py-16 md:py-20">

        {/* ── Page title ── */}
        <h1 className="
          font-bold text-gray-900 mb-10
          text-[28px] sm:text-[34px] md:text-[40px] lg:text-[44px]
        ">
          Terms and Conditions
        </h1>

        {/* ── Two-column layout ── */}
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-14 xl:gap-16 items-start">

          {/* ── Left: main content ── */}
          <div className="flex-1 min-w-0" ref={topRef}>
            {activeSections.map((section) => (
              <div key={section.id} className="mb-8 scroll-mt-28">

                {/* Section heading label (e.g. "INTRODUCTION") */}
                {!section.isHeading && section.title && (
                  <h3 className="text-[12px] sm:text-[13px] font-bold tracking-widest text-gray-800 uppercase mb-3">
                    {section.title}
                  </h3>
                )}

                {/* Section content */}
                {section.content}
              </div>
            ))}
          </div>

          {/* ── Right: sticky categories sidebar ── */}
          <div className="w-full lg:w-[260px] xl:w-[280px] flex-shrink-0">
            <div className="lg:sticky lg:top-28">
              <CategoriesSidebar
                activeCategory={activeCategory}
                onSelect={handleCategorySelect}
              />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}