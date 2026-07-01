"use client"

import Footer from "@/Components/layout/footer";
import Navbar from "@/Components/layout/Navbar";
import { ChevronRight } from "lucide-react";

const AppStoreIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg">
    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
  </svg>
);

const PlayStoreIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg">
    <path d="M3.18 23.76c.3.17.64.22.98.15l12.49-7.21-2.79-2.79-10.68 9.85zM.35 1.28C.13 1.59 0 2.01 0 2.54v18.92c0 .53.13.95.35 1.26l.07.07 10.59-10.59v-.24L.42 1.21l-.07.07zM20.69 10.33l-2.99-1.73-3.14 3.14 3.14 3.14 3-1.73c.86-.49.86-1.29-.01-1.82zM3.18.24L15.67 7.45l-2.79 2.79L2.2.39C2.5.23 2.89.23 3.18.24z" />
  </svg>
);

export default function VTUSection() {
  return (
    <div className="bg-white">
      <Navbar />

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto">
      <div className="flex flex-col items-center justify-center pt-18 px-6 text-center">
        <h1 className="text-3xl sm:text-4xl lg:text-[48px] font-bold text-[#034EA2] leading-tight">
          Recharge{" "}
          <span className="text-black">
            your business phones easily on the Smhartpay app.
          </span>
        </h1>
        <p className="text-black py-8 text-sm sm:text-base max-w-xl">
          Buy Airtel, Glo, MTN and 9Mobile airtime and internet data any time.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 pb-10">
          <a
            href="https://apps.apple.com"
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-pointer px-7 py-4 bg-[#034EA2] text-[15px] text-white gap-3 rounded-2xl flex items-center justify-center hover:bg-blue-800 transition-colors"
          >
            <AppStoreIcon /> Download on App Store
          </a>
          <a
            href="https://play.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-pointer px-7 py-4 bg-[#034EA2] text-[15px] text-white gap-3 rounded-2xl flex items-center justify-center hover:bg-blue-800 transition-colors"
          >
            <PlayStoreIcon /> Get it on Google Play
          </a>
        </div>
        <div className="pt-8 pb-12">
          <img src="/images/callingwoman.svg" alt="Woman using SmhartPay" className="w-full max-w-sm sm:max-w-md object-contain" />
        </div>
      </div>

      {/* Feature Cards */}
      <div className="flex flex-wrap items-stretch gap-5 px-6 sm:px-12 lg:px-20 text-black font-bold pb-14">
        <div className="flex-1 min-w-[220px] bg-white rounded-2xl border border-gray-100 shadow-sm px-6 pt-7 pb-8 hover:shadow-md transition-shadow duration-200">
          <img src="/images/network.svg" alt="network" />
          <p className="pt-6 pb-6">Buy airtime from any Nigerian mobile network.</p>
        </div>
        <div className="flex-1 min-w-[220px] bg-white rounded-2xl border border-gray-100 shadow-sm px-6 pt-7 pb-8 hover:shadow-md transition-shadow duration-200">
          <img src="/images/businessphone.svg" alt="Business Phone" />
          <p className="pt-6 pb-6">Top up your business phone in a few seconds.</p>
        </div>
        <div className="flex-1 min-w-[220px] bg-white rounded-2xl border border-gray-100 shadow-sm px-6 pt-7 pb-8 hover:shadow-md transition-shadow duration-200">
          <img src="/images/inline.svg" alt="Data plans" />
          <p className="pt-6 pb-6">Subscribe to your favourite mobile and modem data plans easily.</p>
        </div>
      </div>

      {/* Third Section */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-10 px-6 sm:px-12 lg:px-20 py-15">
        <div className="max-w-lg">
          <h2 className="text-black font-bold text-2xl sm:text-[31.5px] leading-snug">
            Find all Nigerian mobile networks on Smhartpay.
          </h2>
          <p className="text-black pt-6 pb-4">
            Buy Airtel, Glo, MTN and 9Mobile airtime and internet data for business directly from your account.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="https://apps.apple.com"
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-pointer text-white bg-[#034EA2] flex items-center gap-2 p-3 rounded-2xl hover:bg-blue-800 transition-colors"
            >
              <AppStoreIcon /> Join on App Store <ChevronRight />
            </a>
            <a
              href="https://play.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-pointer text-white bg-[#034EA2] flex items-center gap-2 p-3 rounded-2xl hover:bg-blue-800 transition-colors"
            >
              <PlayStoreIcon /> Join on Google Play <ChevronRight />
            </a>
          </div>
        </div>
        <div className="flex justify-center">
          <img src="/images/fivemillion.svg" alt="Five million users" className="w-full max-w-xs sm:max-w-sm object-contain" />
        </div>
      </div>

      {/* Fourth Section */}
      <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-10 px-6 sm:px-12 lg:px-20 py-20">
        <div className="flex justify-center">
          <img src="/images/internet.svg" alt="Internet" className="w-full max-w-xs sm:max-w-sm object-contain" />
        </div>
        <div className="max-w-lg">
          <h2 className="text-[31.5px] font-bold text-black leading-snug">
            Subscribe to your favourite data plan for business.
          </h2>
          <p className="py-7 text-black text-[14px]">Buy any data plan quickly without an airtime recharge.</p>
          <div className="flex flex-wrap gap-3">
            <a
              href="https://apps.apple.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[14px] text-[#034EA2] underline flex items-center cursor-pointer hover:text-blue-800"
            >
              <AppStoreIcon /> Download on App Store <ChevronRight />
            </a>
            <a
              href="https://play.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[14px] text-[#034EA2] underline flex items-center cursor-pointer hover:text-blue-800"
            >
              <PlayStoreIcon /> Download on Google Play <ChevronRight />
            </a>
          </div>
        </div>
      </div>

      {/* Fifth Section */}
      <div className="px-6 sm:px-12 lg:px-20 py-20 flex flex-col lg:flex-row items-center justify-between gap-10">
        <div className="max-w-lg">
          <h2 className="text-[31.5px] text-black font-bold leading-snug">Get your airtime top-up in seconds.</h2>
          <p className="text-black py-5">
            You'll get your airtime or data soon after you complete your purchase on the app.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="https://apps.apple.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#034EA2] text-white flex items-center gap-2 p-3 rounded-2xl cursor-pointer hover:bg-blue-800 transition-colors"
            >
              <AppStoreIcon /> Join on App Store <ChevronRight />
            </a>
            <a
              href="https://play.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#034EA2] text-white flex items-center gap-2 p-3 rounded-2xl cursor-pointer hover:bg-blue-800 transition-colors"
            >
              <PlayStoreIcon /> Join on Google Play <ChevronRight />
            </a>
          </div>
        </div>
        <div className="flex justify-center">
          <img src="/images/onefifty.svg" alt="Fast top-up" className="w-full max-w-xs sm:max-w-sm object-contain" />
        </div>
      </div>

      {/* Sixth Section */}
      <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-10 px-6 sm:px-12 lg:px-20 py-10">
        <div className="flex justify-center">
          <img src="/images/cardaccount.svg" alt="Card account" className="w-full max-w-xs sm:max-w-sm object-contain" />
        </div>
        <div className="max-w-lg">
          <h2 className="text-black text-[31.5px] font-bold leading-snug">Send airtime to your staff.</h2>
          <p className="text-black text-[14px] py-3">
            Recharge any Nigerian phone number from your SmhartPay app even when you're abroad.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="https://apps.apple.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[14px] text-[#034EA2] underline flex items-center cursor-pointer hover:text-blue-800"
            >
              <AppStoreIcon /> Download on App Store <ChevronRight />
            </a>
            <a
              href="https://play.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[14px] text-[#034EA2] underline flex items-center cursor-pointer hover:text-blue-800"
            >
              <PlayStoreIcon /> Download on Google Play <ChevronRight />
            </a>
          </div>
        </div>
      </div>

      {/* Seventh Section – More For You */}
      <div className="px-6 sm:px-12 lg:px-20 py-14">
        <h2 className="text-black font-bold text-2xl sm:text-[31.5px] mb-8 text-center">More For You</h2>
        <div className="flex flex-wrap justify-center gap-5">
          <div className="flex-1 min-w-[220px] max-w-[320px] bg-white rounded-2xl border border-gray-100 shadow-sm px-6 pt-7 pb-8 hover:shadow-md transition-shadow duration-200">
            <img src="/images/pos.svg" alt="Bill Payments" className="w-10 h-10 object-contain" />
            <p className="pt-4 font-bold text-black text-lg">POS</p>
            <p className="pt-2 text-gray-600 text-sm leading-relaxed">Buy a physical POS, lease it for a one-time fee, or get a virtual POS to accept payments quickly.</p>
            <p className="text-black font-medium underline py-3 flex cursor-pointer">Learn more<ChevronRight/></p>
          </div>
          <div className="flex-1 min-w-[220px] max-w-[320px] bg-white rounded-2xl border border-gray-100 shadow-sm px-6 pt-7 pb-8 hover:shadow-md transition-shadow duration-200">
            <img src="/images/invoicing.svg" alt="Business Wallet" className="w-10 h-10 object-contain" />
            <p className="pt-4 font-bold text-black text-lg">Invoicing</p>
            <p className="pt-2 text-gray-600 text-sm leading-relaxed">Create and manage invoices easily, and sync your product catalogue for accurate pricing.</p>
            <p className="text-black font-medium underline py-3 flex cursor-pointer">Learn more<ChevronRight/></p>
          </div>
          <div className="flex-1 min-w-[220px] max-w-[320px] bg-white rounded-2xl border border-gray-100 shadow-sm px-6 pt-7 pb-8 hover:shadow-md transition-shadow duration-200">
            <img src="/images/virtualpos.svg" alt="Bulk Recharge" className="w-10 h-10 object-contain" />
            <p className="pt-4 font-bold text-black text-lg">Virtual POS</p>
            <p className="pt-2 text-gray-600 text-sm leading-relaxed">Empower your salespeople to accept payments instantly at all your business locations.</p>
            <p className="text-black font-medium underline py-3 flex cursor-pointer">Learn more<ChevronRight/></p>
          </div>
        </div>
      </div>

      { /* Eight Section */ }

      <div className="px-4 sm:px-10 lg:px-20 mb-20">
        <div className="bg-blue-900 rounded-2xl flex flex-col lg:flex-row overflow-hidden">
        <div className="w-full lg:w-1/2 p-8 sm:p-12 lg:p-20 text-center lg:text-left">
                       <h2 className="text-2xl sm:text-3xl lg:text-[31.5px] text-white font-bold">Move your business forward with softPOS</h2>
                       <p className="text-white py-5">Business can find you anywhere. softPOS from SmhartPay helps you receive payments on the move with any smartphone connected to the internet.</p>
                     <div className="flex flex-wrap items-center justify-center lg:justify-start text-black text-[12px] py-2 gap-4">
                       <div className="flex items-center gap-2">
                         <p>Fully Licensed by the CBN</p>
                         <img src="/images/cbn.svg" alt="cbn logo" className="h-5 w-auto"/>
                       </div>
                       <div className="flex items-center gap-2">
                         <p>Deposits Insured by</p>
                         <img src="/images/ndic.svg" alt="ndic logo" className="h-5 w-auto"/>
                       </div>
                      </div>
                       <div className="flex flex-wrap justify-center lg:justify-start gap-3">
                         <a 
                           href="https://apps.apple.com"
                           target="_blank"
                           rel="noopener noreferrer"
                           className="text-[14px] text-white underline flex items-center gap-1 cursor-pointer hover:text-black"
                         >
                           <AppStoreIcon /> Download on App Store <ChevronRight />
                         </a>
                         <a 
                           href="https://play.google.com"
                           target="_blank"
                           rel="noopener noreferrer"
                           className="text-[14px] text-white underline flex items-center gap-1 cursor-pointer hover:text-black"
                         >
                           <PlayStoreIcon /> Download on Google Play <ChevronRight />
                         </a>
                       </div>
                     </div>
        <div className="flex justify-center lg:justify-end pt-0 lg:pt-20 pb-8 lg:pb-0 px-6 lg:px-0">
          <img src="/images/eightthousand.svg" alt="" className="w-full max-w-xs sm:max-w-sm lg:max-w-md object-contain hidden md:block" />
        </div>
        </div>
      </div>
      </div>
      <Footer/>
    </div>
  );
}