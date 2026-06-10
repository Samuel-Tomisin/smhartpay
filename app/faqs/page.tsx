"use client";

import Footer from "@/Components/layout/footer";
import Navbar from "@/Components/layout/Navbar";
import { useState } from "react";

const faqs = [
  {
    question: "What is SmhartPay?",
    answer:
      "SmhartPay is a digital personal banking app that helps you manage your everyday finances in one place. With SmhartPay, you can fund your wallet, send and receive money, buy airtime and data, save towards your goals, create virtual cards, order a physical card, and earn rewards on qualifying transactions.",
  },
  {
    question: "How do I create a SmhartPay account?",
    answer:
      "Creating an account is simple. Download the SmhartPay app from the App Store or Google Play Store, sign up with your phone number and email address, verify your identity, and start using your account within minutes.",
  },
  {
    question: "Is my money safe with SmhartPay?",
    answer:
      "Yes. SmhartPay uses advanced security measures including data encryption, secure authentication, fraud monitoring, and compliance with applicable financial regulations. Your account is protected with industry-standard security practices to help keep your funds and personal information safe.",
  },
  {
    question: "How can I fund my SmhartPay wallet?",
    answer:
      "You can fund your wallet through bank transfers, linked bank accounts, debit cards, or by receiving money directly from other users. Available funding methods may vary based on your account verification level.",
  },
  {
    question: "Can I send money to other banks in Nigeria?",
    answer:
      "Yes. SmhartPay allows you to transfer money quickly and securely to bank accounts across Nigeria. Simply enter the recipient's account details, confirm the transaction, and your transfer will be processed instantly or within the applicable banking timelines.",
  },
  {
    question: "How do virtual cards work?",
    answer:
      "SmhartPay offers virtual cards that can be used for online payments, subscriptions, and international purchases where supported. You can create, manage, fund, freeze, and monitor your virtual cards directly from the app for greater convenience and security.",
  },
  {
    question: "Can I request a physical SmhartPay card?",
    answer:
      "Yes. Eligible users can request a SmhartPay physical Naira card directly through the app. Once approved, the card can be delivered to your preferred address and used for ATM withdrawals, POS payments, and everyday spending.",
  },
  {
    question: "How does the Savings feature work?",
    answer:
      "The Savings feature helps you set aside money towards personal goals. You can create savings plans, automate contributions, track progress, and build better financial habits while keeping your savings organized within the app.",
  },
  {
    question: "What rewards and cashback benefits does SmhartPay offer?",
    answer:
      "SmhartPay rewards users through cashback offers, promotional campaigns, referral bonuses, and transaction-based rewards. Available offers may vary over time and will be displayed within the app when applicable.",
  },
  {
    question: "How can I contact SmhartPay support?",
    answer:
      "Our support team is available to assist you with account, transaction, and technical issues. You can contact us through the in-app support center, email, live chat, or the Contact page on our website. We aim to respond to all inquiries as quickly as possible.",
  },
];

// ─── Chevron icon ─────────────────────────────────────────────────

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`flex-shrink-0 transition-transform duration-300 ${
        open ? "rotate-180 text-[#034EA2]" : "rotate-0 text-gray-400"
      }`}
      aria-hidden="true"
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

// ─── Single FAQ item ──────────────────────────────────────────────

function FAQItem({
  question,
  answer,
  isOpen,
  onToggle,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-gray-200">

      {/* ── Question row ── */}
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        className="w-full flex items-center justify-between gap-6 py-5 sm:py-6 text-left group cursor-pointer"
      >
        <span
          className={`
            text-[14px] sm:text-[15px] md:text-[16px] leading-snug font-medium
            transition-colors duration-150
            ${isOpen ? "text-gray-900 font-semibold" : "text-gray-700 group-hover:text-gray-900"}
          `}
        >
          {question}
        </span>
        <ChevronIcon open={isOpen} />
      </button>

      {/* ── Answer panel ── */}
      <div
        className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{ maxHeight: isOpen ? "400px" : "0px" }}
      >
        <div className="pb-6">

          {/* "Answer" label with blue line — matches the screenshot */}
          <div className="flex items-center gap-3 mb-3">
            <span className="w-8 h-[2px] bg-[#034EA2] rounded-full inline-block" />
            <span className="text-[13px] sm:text-[14px] font-semibold text-[#034EA2]">
              Answer
            </span>
          </div>

          {/* Answer text */}
          <p className="text-[13px] sm:text-[14px] md:text-[15px] text-gray-600 leading-relaxed">
            {answer}
          </p>
        </div>
      </div>

    </div>
  );
}

// ─── FAQ Section ──────────────────────────────────────────────────

export default function FAQs() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div>
        {/* <Navbar/> */}
    <section className="
      px-5 py-14
      sm:px-10 sm:py-16
      md:px-14 md:py-20
      lg:px-20
      bg-white
    ">
      <div className="max-w-6xl mx-auto">

        {/* ── Heading ── */}
        <h2 className="
          font-bold text-gray-900 mb-8
          text-[24px]
          sm:text-[28px]
          md:text-[32px]
          lg:text-[36px]
        ">
          Frequently Asked Questions
        </h2>

        {/* ── Top divider ── */}
        <div className="border-t border-gray-200" />

        {/* ── FAQ list ── */}
        <div>
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onToggle={() => toggle(index)}
            />
          ))}
        </div>

        {/* ── Bottom CTA ── */}
        <p className="mt-10 text-[13px] sm:text-[14px] text-gray-500">
          Still have questions?{" "}
          <a
            href="/contact"
            className="text-[#7C8FB7] font-medium hover:underline"
          >
            Contact our help centre →
          </a>
        </p>

      </div>
    </section>
    {/* <Footer/> */}
    </div>
  );
}