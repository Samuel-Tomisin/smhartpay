"use client"

import Footer from "@/Components/layout/footer";
import Navbar from "@/Components/layout/Navbar"
import JoinButton from "@/Components/ui/joinbutton2";
import { BanknoteArrowUp, Bell, ChevronRight, HandCoins, Apple, Play } from "lucide-react";


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


export default function ReceiveFund (){
  return (
    <div className="bg-white">
      <Navbar/>
      <div className="text-black flex flex-col items-center justify-center pt-12 sm:pt-18 px-4 sm:px-6 md:px-12 text-center bg-[#FAFAF9]">
        <div className="max-w-7xl mx-auto">
  <h1 className="text-[28px] sm:text-[36px] md:text-[48px] font-bold leading-tight max-w-7xl">
    Get paid faster and manage incoming funds effortlessly.
  </h1>
  <p className="text-[15px] sm:text-[16px] md:text-[18px] py-4 sm:py-6 max-w-7xl text-gray-600">
    Receive money instantly and keep track of every payment in one place with the SmhartPay Business app.
  </p>
  <div className="flex justify-center pb-8 sm:pb-12 pt-3 sm:pt-5 w-full sm:w-auto">
    <JoinButton text={"Open a SmhartPay Business Account"} />
  </div>
  <div className="w-full max-w-4xl mx-auto">
    <img src="/images/sendmoney.svg" alt="Send money illustration" className="w-full h-auto" />
  </div>
  </div>
</div>
      
      
      {/* Feature Cards */}
      <div className="max-w-7xl mx-auto flex flex-wrap items-stretch gap-5 px-6 sm:px-12 pt-10 lg:px-20 text-black font-bold pb-14">
        <div className="flex-1 min-w-[220px] bg-white rounded-2xl border border-gray-100 shadow-sm px-6 pt-7 pb-8 hover:shadow-md transition-shadow duration-200">
          <HandCoins className="text-brand-text"/>
          <p className="pt-6 pb-6">Receive funds from multiple customers seamlessly in one place.</p>
        </div>
        <div className="flex-1 min-w-[220px] bg-white rounded-2xl border border-gray-100 shadow-sm px-6 pt-7 pb-8 hover:shadow-md transition-shadow duration-200">
          <BanknoteArrowUp className="text-brand-text"/>
          <p className="pt-6 pb-6">Enjoy seamless incoming transfers from any Nigerian bank.</p>
        </div>
        <div className="flex-1 min-w-[220px] bg-white rounded-2xl border border-gray-100 shadow-sm px-6 pt-7 pb-8 hover:shadow-md transition-shadow duration-200">
          <Bell className="text-brand-text"/>
          <p className="pt-6 pb-6">Get notifications when you receive funds.</p>
        </div>
      </div>
      
      
      {/* Third Section */}
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-10 px-6 sm:px-12 lg:px-20 py-15">
        <div className="max-w-lg">
          <h2 className="text-black font-bold text-2xl sm:text-[31.5px] leading-snug">
            Receive funds from customers across all major Nigerian banks and payment channels.
          </h2>
          <p className="text-black pt-6 pb-4">
            Stay connected with airtime and data purchases across all major Nigerian networks.
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
            <div className="max-w-7xl mx-auto flex flex-col-reverse lg:flex-row items-center justify-between gap-10 px-6 sm:px-12 lg:px-20 py-20">
              <div className="flex justify-center">
                <img src="/images/internet.svg" alt="Internet" className="w-full max-w-xs sm:max-w-sm object-contain" />
              </div>
              <div className="max-w-lg">
                <h2 className="text-[31.5px] font-bold text-black leading-snug">
                  Receive funds from customers through multiple banking and payment channels.
                </h2>
                <p className="py-7 text-black text-[14px]">Enjoy seamless banking on the go by downloading the SmhartPay App from the App Store or Google Play Store.</p>
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
            <Footer/>
    </div>
  );
}