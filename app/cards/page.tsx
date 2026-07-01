"use client";

import Footer from "@/Components/layout/footer";
import Navbar from "@/Components/layout/Navbar";
import { AppStoreButton, PlayStoreButton } from "@/Components/ui/button";
import { ChevronRight, CreditCard, HandCoins, Nfc, Send, TvMinimalPlay, WalletCards } from "lucide-react";

export default function CardsPage() {
  return (
    <div className="bg-white">
      <Navbar />

      {/* ══════════════════════════════════════════
          1. HERO
      ══════════════════════════════════════════ */}
      <section className="px-5 py-14 sm:py-16 md:py-20">
  <div className="max-w-6xl mx-auto flex flex-col md:flex-row
    items-center justify-between gap-10 md:gap-8">

    {/* Text */}
    <div className="w-full md:w-1/2 text-center md:text-left">

      <h1 className="font-bold leading-tight text-[#1A202E]
        text-[28px] sm:text-[34px] md:text-[38px] lg:text-[44px]">
        Your Smart Card for a{" "}
        <span className="text-[#034EA2]">Borderless Financial Experience</span>
      </h1>

      <p className="text-[#64748B] leading-relaxed mt-4 mb-8
        text-[15px] sm:text-[16px] md:text-[17px]">
        Pay online, shop globally, manage subscriptions, and control
        your spending with SmhartPay Virtual and Physical Cards. Get SmhartPay below:
      </p>

      {/* <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
        <button className="bg-[#034EA2] text-white text-[14px] font-semibold
          px-6 py-3 rounded-xl hover:bg-blue-700 active:scale-95
          transition-all duration-150 cursor-pointer">
          Get SmhartPay Card
        </button>
      </div> */}
      <div className="gap-2">
      <AppStoreButton/> <PlayStoreButton/>
      </div>
    </div>

    {/* Card image */}
    <div className="w-full md:w-1/2 flex justify-center">
      <img
        src="/images/card.webp"
        alt="SmhartPay Card"
        className="w-[260px] sm:w-[320px] md:w-[380px] lg:w-[440px]
          h-auto object-contain drop-shadow-2xl"
        loading="eager"
      />
    </div>

  </div>
</section>

      {/* ══════════════════════════════════════════
          2. FEATURE CARDS
      ══════════════════════════════════════════ */}
      <section className="px-5 py-14 sm:py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto">

          <div className="text-center mb-10">
            <h2 className="font-bold text-[#1A202E] leading-tight
              text-[22px] sm:text-[26px] md:text-[30px]">
              Everything your card can do
            </h2>
            <p className="mt-3 text-[14px] sm:text-[15px] text-[#64748B] max-w-xl mx-auto">
              One card. Endless possibilities. Physical and virtual — built for
              the way you live and spend.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">

            {/* Card 1 */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm
              px-6 pt-7 pb-8 hover:shadow-md transition-shadow duration-200">
              <CreditCard
                className="mb-4 w-10 h-10 object-contain text-blue-900" />
              <h3 className="text-[15px] font-bold text-[#1A202E] mb-2">
                Fast Card Delivery
              </h3>
              <p className="text-[#64748B] text-[13px] sm:text-[14px] leading-relaxed">
                Pick up your card from us or choose our easy delivery option.
                Get your card in a few days and start using it immediately for
                online and offline transactions.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm
              px-6 pt-7 pb-8 hover:shadow-md transition-shadow duration-200">
              <TvMinimalPlay
                className="mb-4 w-10 h-10 object-contain text-blue-900" />
              <h3 className="text-[15px] font-bold text-[#1A202E] mb-2">
                Global Streaming Access
              </h3>
              <p className="text-[#64748B] text-[13px] sm:text-[14px] leading-relaxed">
                Our cards are accepted on Spotify, Netflix, Prime Video, and
                Showmax — subscribe to any platform anywhere in the world.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm
              px-6 pt-7 pb-8 hover:shadow-md transition-shadow duration-200">
              <WalletCards
                className="mb-4 w-10 h-10 object-contain text-blue-900" />
              <h3 className="text-[15px] font-bold text-[#1A202E] mb-2">
                Physical Card Flexibility
              </h3>
              <p className="text-[#64748B] text-[13px] sm:text-[14px] leading-relaxed">
                Experience the convenience of a physical card for in-person
                transactions. Customise your card with a unique design and
                carry it anywhere.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          3. REQUEST CARD — two-column
      ══════════════════════════════════════════ */}
      <section className="px-5 py-14 sm:py-16 md:py-20">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:justify-center sm:justify-center md:items-center lg:justify-between lg:
          items-center gap-10 md:gap-14 lg:gap-20">

          {/* Illustration */}
<div className="w-full md:w-1/2 flex justify-center">
  <img
    src="/images/ordercard.svg"
    alt="Order SmhartPay card illustration"
    className="w-[240px] sm:w-[300px] md:w-[360px] lg:w-[420px]
      h-auto object-contain"
    loading="lazy"
  />
</div>

          {/* Text */}
          <div className="w-full md:w-1/2 text-center md:text-left">

            <h2 className="font-bold text-[#1A202E] leading-tight
              text-[24px] text-[#40196D] sm:text-[28px] md:text-[30px] lg:text-[34px]">
              Request your card on the SmhartPay app
            </h2>

            <p className="text-[#64748B] leading-relaxed mt-4 mb-6
              text-[14px] sm:text-[15px] md:text-[16px]">
              You can pick up your card from us or we'll deliver it straight
              to your door — we deliver nationwide!
            </p>

            <a
              href="/features/cards"
              className="inline-flex items-center justify-between gap-1.5 text-[#40196D]
                font-semibold text-[14px] sm:text-[15px] hover:gap-3
                transition-all duration-150 group underline"
            >
              Learn How To Request A Card
              <ChevronRight
                size={18}
                className="group-hover:translate-x-1 transition-transform duration-150"
              />
            </a>
          </div>

        </div>
      </section>

      {/* ══════════════════════════════════════════
    Need to Pay with Cash Section
══════════════════════════════════════════ */}
<section className="px-6 md:px-20 py-16">
  <div className="flex flex-col max-w-6xl mx-auto md:flex-row justify-between items-center gap-10">
    <div className="max-w-md">
      <h2 className="text-[31.5px] leading-snug text-[#40196D] font-semibold">
        Need to pay with cash? Use your Smhartpay card at ATMs nationwide.
      </h2>
      <p className="text-sm text-gray-600 py-4">
        The Smhartpay card is accepted at ATMs across Nigeria.
      </p>
      <p className="underline text-sm text-[#40196D] cursor-pointer font-semibold flex items-center gap-1 hover:opacity-75 transition-opacity">
        Learn More About Cards <ChevronRight size={16} />
      </p>
    </div>
    <img src="/images/kuda.svg" alt="Smhartpay card at ATM" className="w-full max-w-xs md:max-w-sm" />
  </div>
</section>

{/* ══════════════════════════════════════════
    Block Card Section
══════════════════════════════════════════ */}
<section className="bg-white px-6 md:px-20 py-16">
  <div className="flex flex-col max-w-6xl mx-auto md:flex-row items-center justify-between gap-16">
    <div className="flex-shrink-0">
      <img src="/images/blockcard.svg" alt="Block your Smhartpay card" className="w-full max-w-xs md:max-w-sm" />
    </div>
    <div className="max-w-md">
      <h2 className="text-[31.5px] leading-snug text-[#40196D] font-extrabold">
        Turn off access, turn on safety.
      </h2>
      <p className="text-sm text-gray-600 py-4 leading-relaxed">
        Life happens. Milk spills. Debit cards go missing. If that ever happens,
        you can block your missing card on the app so no one can use it.
        We'd like to see them try.
      </p>
      <p className="text-sm text-[#40196D] font-semibold flex items-center gap-1 underline hover:opacity-75 transition-opacity cursor-pointer">
        Learn How To Block Your Card <ChevronRight size={16} />
      </p>
    </div>
  </div>
</section>

{/* ══════════════════════════════════════════
    More For You Section
══════════════════════════════════════════ */}
<section className="px-6 md:px-20 py-16">
  <div className="text-center mb-10 max-w-6xl mx-auto">
    <h2 className="text-[36px] text-[#40196D] font-bold">More For You</h2>
  </div>

  <div className="grid grid-cols-1 sm:grid-cols-2 max-w-6xl mx-auto lg:grid-cols-3 gap-6">

    {/* Card 1 — Transfer & Spend */}
    <div className="bg-white border border-gray-100 shadow-sm px-6 pt-7 pb-8 hover:shadow-md transition-shadow duration-200 flex flex-col">
      <Send  className="size-8 text-[#40196D]" />
      <h3 className="text-[#40196D] text-[22px] font-bold pt-8 pb-3">Transfer & Spend</h3>
      <p className="text-sm text-gray-600 leading-relaxed flex-1">
        Send money for free to any Nigerian account with 25 free transfers every month.
      </p>
      <p className="text-sm underline text-[#40196D] pt-8 flex items-center gap-1 cursor-pointer hover:opacity-75 transition-opacity">
        Learn More <ChevronRight size={14} />
      </p>
    </div>

    {/* Card 2 — Cardless Payment */}
    <div className="bg-white border border-gray-100 shadow-sm px-6 pt-7 pb-8 hover:shadow-md transition-shadow duration-200 flex flex-col">
      <Nfc className="size-8 text-[#40196D]" />
      <h3 className="text-[#40196D] text-[22px] font-bold pt-8 pb-3">Cardless Payment</h3>
      <p className="text-sm text-gray-600 leading-relaxed flex-1">
        Use Pay ID, Pay With USSD, or free transfers to make quick and safe payments without a debit card.
      </p>
      <p className="text-sm underline text-[#40196D] pt-8 flex items-center gap-1 cursor-pointer hover:opacity-75 transition-opacity">
        Learn More <ChevronRight size={14} />
      </p>
    </div>

    {/* Card 3 — Loans */}
    <div className="bg-white border border-gray-100 shadow-sm px-6 pt-7 pb-8 hover:shadow-md transition-shadow duration-200 flex flex-col">
      <HandCoins className="size-8 text-[#40196D]" />
      <h3 className="text-[#40196D] text-[22px] font-bold pt-8 pb-3">Loans</h3>
      <p className="text-sm text-gray-600 leading-relaxed flex-1">
        Get instant loans up to ₦150,000 in the Smhartpay loan app easily in Nigeria without paperwork.
      </p>
      <p className="text-sm underline text-[#40196D] pt-8 flex items-center gap-1 cursor-pointer hover:opacity-75 transition-opacity">
        Learn More <ChevronRight size={14} />
      </p>
    </div>

  </div>
</section>

{/* The money app for Africans. */}
<section className="bg-white px-5">
  <div className="max-w-6xl mx-auto bg-[#EFF1FF] mb-15 overflow-hidden">
    <div className="flex flex-col md:flex-row items-center justify-between gap-8 px-8 sm:px-10 md:px-14 py-12 md:py-0">

      {/* Text */}
      <div className="w-full md:w-1/2 text-center md:text-left">
        <h2 className="font-bold text-[#40196D] leading-tight
          text-[26px] sm:text-[30px] md:text-[32px] lg:text-[36px]">
          The money app for <br />Africans.
        </h2>
        <p className="text-[#64748B] text-[14px] sm:text-[15px] md:text-[16px]
          leading-relaxed pt-4 pb-6">
          Save, spend, send and invest money across borders.
        </p>
        <div className="flex justify-center md:justify-start">
          <button className="bg-[#40196D] text-white text-[14px] font-semibold
            px-6 py-3 rounded-xl hover:bg-purple-900 active:scale-95
            transition-all duration-150 cursor-pointer">
            Join SmhartPay
          </button>
        </div>
      </div>

      {/* Image */}
      <div className="w-full md:w-1/2 flex justify-center md:justify-end">
        <img
          src="/images/rotate.png"
          alt="SmhartPay app on mobile"
          className="w-[220px] sm:w-[280px] md:w-[340px] lg:w-[400px]
            h-auto object-contain"
          loading="lazy"
        />
      </div>

    </div>
  </div>
</section>
<Footer/>
    </div>
  );
}
