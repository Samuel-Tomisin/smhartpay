"use client";

import Footer from "@/Components/layout/footer";
import Navbar from "@/Components/layout/Navbar";
import { useState, useEffect, useRef } from "react";

// ─── Section data — add or edit sections here ─────────────────────
const sections = [
  {
    id: "introduction",
    title: "INTRODUCTION",
    content: (
      <>
        <p className="text-gray-600 text-[14px] sm:text-[15px] leading-relaxed mb-4">
          SmhartPay ("we", "our", or "the App") is a licensed digital personal
          banking application regulated by the Central Bank of Nigeria (CBN),
          providing a wide range of financial services to diverse customers,
          including:
        </p>
        <ul className="list-disc pl-5 space-y-2 text-gray-600 text-[14px] sm:text-[15px] leading-relaxed mb-4">
          <li>Individuals</li>
          <li>Small and Medium Enterprises (SMEs)</li>
          <li>Large Corporates and Multinationals</li>
          <li>Governmental Agencies/Ministries, Departments, and Agencies (MDAs)</li>
          <li>Non-Governmental Organizations (NGOs) and Institutions</li>
        </ul>
        <p className="text-gray-800 text-[14px] sm:text-[15px] font-semibold leading-relaxed">
          Our banking services are accessible through multiple channels, including:
        </p>
        <p className="text-gray-600 text-[14px] sm:text-[15px] font-semibold leading-relaxed py-3">
          Our company collects the following data:
        </p>
        <ul className="list-disc pl-5 space-y-2 text-gray-600 text-[14px] sm:text-[15px] leading-relaxed mb-4">
          <li> Head Office Operations</li>
          <li> Electronic Banking Channels:</li>
        </ul>
        <ul className="list-disc pl-15 space-y-2 text-gray-600 text-[14px] sm:text-[15px] leading-relaxed mb-4">
          <li>Internet Banking</li>
          <li>Mobile Applications</li>
          <li>USSD Services</li>
        </ul>
        <p className="text-gray-600 text-[14px] sm:text-[15px] leading-relaxed mb-4">As part of our commitment to data protection and privacy, this Data Privacy Policy outlines how 
          we collect, process, store, and protect your personal data, in compliance with the Nigeria 
          Data Protection Act (NDPA) 2023 and other applicable regulatory frameworks.</p>
          <p className="text-gray-600 text-[14px] sm:text-[15px] leading-relaxed">
            For further details on how we handle your personal data, please refer to the full Privacy Policy.
          </p>
      </>
    ),
  },
  {
    id: "trust",
    title: "Your Trust is Our Priority",
    content: (
      <>
        <p className="text-gray-600 text-[14px] sm:text-[15px] leading-relaxed mb-4">
          At SmhartPay, we recognize that when you use our banking 
          services, you entrust us with your personal information. We take this responsibility seriously 
          and are committed to:
        </p>
        <ul className="list-disc pl-5 space-y-2 text-gray-600 text-[14px] sm:text-[15px] leading-relaxed">
          <li>Safeguarding your data using industry-standard security measures.</li>
          <li>Ensuring transparency in how we collect, use, and store your information.</li>
          <li>Empowering you with control over your personal data.</li>
        </ul>
        <p className="text-gray-600 text-[14px] sm:text-[15px] font-semibold leading-relaxed py-3">
          This Privacy Policy explains:
        </p>
        <ul className="list-disc pl-5 space-y-2 text-gray-600 text-[14px] sm:text-[15px] leading-relaxed">
          <li>What data we collect</li>
          <li>Why we collect it</li>
          <li>How you can manage, access, and delete your information</li>
        </ul>
        <p className="text-gray-600 text-[14px] sm:text-[15px] leading-relaxed mb-4">
          Our commitment to data privacy and security aligns with the Nigeria Data Protection Act 
          (NDPA) 2023 and other regulatory guidelines issued by the Central Bank of Nigeria (CBN).
        </p>
        <p className="text-gray-600 text-[14px] sm:text-[15px] font-semibold leading-relaxed py-3">
          For further details, please review the full Privacy Policy.
        </p>
        {/* ── ADD MORE CONTENT FOR THIS SECTION BELOW ── */}
      </>
    ),
  },
  {
    id: "commitment",
    title: "OUR COMMITMENT TO DATA PROCESSING PRINCIPLES",
    content: (
      <>
        <p className="text-gray-600 text-[14px] sm:text-[15px] leading-relaxed mb-4">
          SmhartPay is committed to processing your personal data in accordance
          with applicable data protection laws and regulations. We adhere to the
          following principles when handling your information:
        </p>
        <ul className="list-disc pl-5 space-y-2 text-gray-600 text-[14px] sm:text-[15px] leading-relaxed">
          <li>Lawfulness, fairness, and transparency</li>
          <li>Purpose limitation — data collected for specified, explicit, and legitimate purposes</li>
          <li>Data minimisation — only data necessary for the stated purpose is collected</li>
          <li>Accuracy — reasonable steps are taken to keep your data accurate and up to date</li>
          <li>Storage limitation — data is retained only as long as necessary</li>
          <li>Integrity and confidentiality — appropriate security measures are applied</li>
        </ul>
        {/* ── ADD MORE CONTENT FOR THIS SECTION BELOW ── */}
      </>
    ),
  },
  {
    id: "consent",
    title: "CONSENT OF DATA SUBJECT",
    content: (
      <>
        <p className="text-gray-600 text-[14px] sm:text-[15px] leading-relaxed mb-4">
          By using the SmhartPay app and its services, you consent to the
          collection, use, and processing of your personal data as described in
          this Privacy Policy. You have the right to withdraw your consent at
          any time by contacting our support team or through the app settings.
        </p>
        <p className="text-gray-600 text-[14px] sm:text-[15px] leading-relaxed">
          Withdrawal of consent may affect your ability to access certain
          features or services within the app.
        </p>
        {/* ── ADD MORE CONTENT FOR THIS SECTION BELOW ── */}
      </>
    ),
  },
  {
    id: "scope",
    title: "OUR SCOPE OF DATA PROCESSING",
    content: (
      <>
        <p className="text-gray-600 text-[14px] sm:text-[15px] leading-relaxed mb-4">
          SmhartPay processes personal data for the following purposes:
        </p>
        <ul className="list-disc pl-5 space-y-2 text-gray-600 text-[14px] sm:text-[15px] leading-relaxed mb-4">
          <li>Account creation, verification, and management</li>
          <li>Processing financial transactions and payments</li>
          <li>Complying with legal and regulatory obligations</li>
          <li>Fraud detection, prevention, and security monitoring</li>
          <li>Improving our products, services, and user experience</li>
          <li>Communicating service updates, offers, and notifications</li>
        </ul>
        {/* ── ADD MORE CONTENT FOR THIS SECTION BELOW ── */}
      </>
    ),
  },
  {
    id: "data-rights",
    title: "YOUR DATA RIGHTS",
    content: (
      <>
        <p className="text-gray-600 text-[14px] sm:text-[15px] leading-relaxed mb-4">
          As a SmhartPay user, you have the following rights regarding your
          personal data:
        </p>
        <ul className="list-disc pl-5 space-y-2 text-gray-600 text-[14px] sm:text-[15px] leading-relaxed">
          <li>Right to access your personal data</li>
          <li>Right to correction of inaccurate data</li>
          <li>Right to erasure ("right to be forgotten") where applicable</li>
          <li>Right to data portability</li>
          <li>Right to object to processing</li>
          <li>Right to lodge a complaint with the relevant supervisory authority</li>
        </ul>
        {/* ── ADD MORE CONTENT FOR THIS SECTION BELOW ── */}
      </>
    ),
  },
  {
    id: "data-sharing",
    title: "DATA SHARING AND DISCLOSURE",
    content: (
      <>
        <p className="text-gray-600 text-[14px] sm:text-[15px] leading-relaxed mb-4">
          SmhartPay may share your personal data with trusted third parties
          only where necessary and permitted by law, including:
        </p>
        <ul className="list-disc pl-5 space-y-2 text-gray-600 text-[14px] sm:text-[15px] leading-relaxed mb-4">
          <li>Regulatory and government authorities when required by law</li>
          <li>Payment processors and banking partners to facilitate transactions</li>
          <li>Identity verification and KYC service providers</li>
          <li>Fraud prevention and security monitoring partners</li>
        </ul>
        <p className="text-gray-600 text-[14px] sm:text-[15px] leading-relaxed">
          We do not sell your personal data to third parties under any
          circumstances.
        </p>
        {/* ── ADD MORE CONTENT FOR THIS SECTION BELOW ── */}
      </>
    ),
  },
  {
    id: "security",
    title: "DATA SECURITY",
    content: (
      <>
        <p className="text-gray-600 text-[14px] sm:text-[15px] leading-relaxed mb-4">
          We implement robust technical and organisational measures to protect
          your personal data against unauthorised access, loss, destruction, or
          alteration. These measures include:
        </p>
        <ul className="list-disc pl-5 space-y-2 text-gray-600 text-[14px] sm:text-[15px] leading-relaxed">
          <li>End-to-end encryption for data in transit and at rest</li>
          <li>Multi-factor authentication and access controls</li>
          <li>Regular security audits and vulnerability assessments</li>
          <li>Strict internal data access policies</li>
        </ul>
        {/* ── ADD MORE CONTENT FOR THIS SECTION BELOW ── */}
      </>
    ),
  },
  {
    id: "contact",
    title: "CONTACT US",
    content: (
      <>
        <p className="text-gray-600 text-[14px] sm:text-[15px] leading-relaxed mb-4">
          If you have any questions, concerns, or requests regarding this
          Privacy Policy or how your data is handled, please reach out to us:
        </p>
        <ul className="list-none space-y-2 text-gray-600 text-[14px] sm:text-[15px] leading-relaxed">
          <li><span className="font-semibold text-gray-800">Email:</span> privacy@smhartpay.com</li>
          <li><span className="font-semibold text-gray-800">Address:</span> SmhartPay, Lagos, Nigeria</li>
          <li><span className="font-semibold text-gray-800">Support:</span> Via in-app support centre</li>
        </ul>
        {/* ── ADD MORE CONTENT FOR THIS SECTION BELOW ── */}
      </>
    ),
  },

  // ── ADD A NEW SECTION BELOW FOLLOWING THIS TEMPLATE ──────────────
  // {
  //   id: "your-section-id",
  //   title: "YOUR SECTION TITLE",
  //   content: (
  //     <>
  //       <p className="text-gray-600 text-[14px] sm:text-[15px] leading-relaxed">
  //         Your content here...
  //       </p>
  //     </>
  //   ),
  // },
];

// ─── Sticky Table of Contents ─────────────────────────────────────

function TableOfContents({
  activeId,
  onSelect,
}: {
  activeId: string;
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
        <span className="text-[16px] sm:text-[17px] font-bold text-gray-900 cursor-pointer">
          Content
        </span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
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

      {/* Links */}
      <div
        className="overflow-y-auto transition-all duration-300"
        style={{ maxHeight: collapsed ? "0px" : "420px" }}
      >
        <div className="px-4 pb-4 flex flex-col divide-y divide-gray-100">
          {sections.map((section) => {
            const isActive = activeId === section.id;
            return (
              <button
                key={section.id}
                onClick={() => onSelect(section.id)}
                className={`
                  text-left py-3 text-[12px] sm:text-[13px] font-semibold
                  uppercase tracking-wide leading-snug transition-colors duration-150
                  flex items-start gap-2.5
                  ${isActive
                    ? "text-[#034EA2]"
                    : "text-gray-400 hover:text-gray-700"
                  }
                `}
              >
                {/* Active dot */}
                <span
                  className={`
                    mt-[3px] flex-shrink-0 w-2 h-2 rounded-full transition-all duration-200
                    ${isActive ? "bg-[#034EA2] opacity-100" : "opacity-0 w-0"}
                  `}
                />
                {section.title}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─── Main Privacy Policy Page ─────────────────────────────────────

export default function PrivacyPolicy() {
  const [activeId, setActiveId] = useState(sections[0].id);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  // Scroll to section when TOC link is clicked
  const scrollToSection = (id: string) => {
    const el = sectionRefs.current[id];
    if (el) {
      const offset = 100;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
      setActiveId(id);
    }
  };

  // Highlight TOC item based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY + 160;
      let current = sections[0].id;
      for (const section of sections) {
        const el = sectionRefs.current[section.id];
        if (el && el.offsetTop <= scrollY) {
          current = section.id;
        }
      }
      setActiveId(current);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div>
      <Navbar/>
    <div className="bg-[white] bg-cover bg-center min-h-screen">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 md:px-10 py-14 sm:py-16 md:py-20">

        {/* ── Page title ── */}
        <h1 className="
          font-bold text-gray-900 mb-10
          text-[28px] sm:text-[34px] md:text-[40px] lg:text-[44px]
        ">
          Privacy Policy
        </h1>

        {/* ── Two-column layout ── */}
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-14 xl:gap-16 items-start">

          {/* ── Left: main content ── */}
          <div className="flex-1 min-w-0">
            {sections.map((section) => (
              <div
                key={section.id}
                id={section.id}
                ref={(el) => { sectionRefs.current[section.id] = el; }}
                className="mb-10 sm:mb-12 scroll-mt-28"
              >
                {/* Section title */}
                <h2 className="
                  text-[12px] sm:text-[13px] font-bold tracking-widest
                  text-gray-800 uppercase mb-4
                ">
                  {section.title}
                </h2>

                {/* Section content */}
                {section.content}
              </div>
            ))}
          </div>

          {/* ── Right: sticky table of contents ── */}
          <div className="w-full lg:w-[260px] xl:w-[280px] flex-shrink-0">
            <div className="lg:sticky lg:top-28">
              <TableOfContents
                activeId={activeId}
                onSelect={scrollToSection}
              />
            </div>
          </div>

        </div>
      </div>
    </div>
    <Footer/>
    </div>
  );
}