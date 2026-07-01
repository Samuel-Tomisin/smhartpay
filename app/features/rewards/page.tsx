"use client"

import Footer from "@/Components/layout/footer";
import Navbar from "@/Components/layout/Navbar"
import Button, { AppStoreButton } from "@/Components/ui/button";
import { PlayStoreButton } from "@/Components/ui/PlayStoreButton";
import { ChevronRight, HandCoins, Nfc, Send } from "lucide-react";

const AppStoreIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current shrink-0" xmlns="http://www.w3.org/2000/svg">
    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
  </svg>
);

const PlayStoreIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current shrink-0" xmlns="http://www.w3.org/2000/svg">
    <path d="M3.18 23.76c.3.17.64.22.98.15l12.49-7.21-2.79-2.79-10.68 9.85zM.35 1.28C.13 1.59 0 2.01 0 2.54v18.92c0 .53.13.95.35 1.26l.07.07 10.59-10.59v-.24L.42 1.21l-.07.07zM20.69 10.33l-2.99-1.73-3.14 3.14 3.14 3.14 3-1.73c.86-.49.86-1.29-.01-1.82zM3.18.24L15.67 7.45l-2.79 2.79L2.2.39C2.5.23 2.89.23 3.18.24z" />
  </svg>
);



export default function Rewards() {
  return (
    <div>
      <Navbar />
      {/* Hero section */}
    <div className="px-5 sm:px-8 lg:px-20 py-14 bg-white">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-black font-bold text-3xl sm:text-4xl md:text-5xl lg:text-[48px] leading-tight text-center">
          Make money from <span className="text-blue-700">airtime and bill</span> payments on SmhartPay Business!
        </h1>
        <p className="text-black flex items-center justify-center text-center py-3 text-sm sm:text-[14px] font-[600]">
          Whether you’re buying for yourself or selling, we’ll pay you 1.5% rewards on every airtime and bill payment you make.
        </p>
        <div className="flex flex-col items-center justify-center gap-4 py-6">
        <Button text={"Download SmhartPay Business App Below"}/>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 py-6">
        <AppStoreButton />
        <PlayStoreButton/>
        </div>
        </div>
      </div>
      <div>
        <img src="/images/guy.svg" alt="Rewards illustration" className="w-full h-auto object-contain max-w-6xl mx-auto"/>
      </div> 

{/* Cards section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 max-w-6xl mx-auto lg:grid-cols-3 gap-6 py-10">

    {/* Card 1 — Increase your streams of income. */}
    <div className="bg-white border border-gray-100 shadow-sm px-6 pt-5 pb-5 hover:shadow-md transition-shadow duration-200 flex flex-col">
      <img src="/images/stream.svg" alt="" className="size-12" />
      <p className="text-sm text-black font-bold leading-relaxed flex-1 pt-4">
        Increase your streams of income.
      </p>
    </div>

    {/* Card 2 — Sell airtime to make more money. */}
    <div className="bg-white border border-gray-100 shadow-sm px-6 pt-5 pb-5 hover:shadow-md transition-shadow duration-200 flex flex-col">
      <img src="/images/sellcard.svg" alt="Sell card" className="size-12"/>
      <p className="text-sm text-black font-bold leading-relaxed flex-1 pt-4">
        Sell airtime to make more money.
      </p>
    </div>

    {/* Card 3 — Earn 1.5% cashback instantly. */}
    <div className="bg-white border border-gray-100 shadow-sm px-6 pt-5 pb-5 hover:shadow-md transition-shadow duration-200 flex flex-col">
      <img src="/images/percentage.svg" alt="Percentage illustration" className="size-12" />
      <p className="text-sm text-black font-bold leading-relaxed flex-1 pt-4">
        Earn 1.5% cashback instantly.
      </p>
    </div>
  </div> 
  
  {/* Illustrations section */}
  <div className="flex flex-col lg:flex-row items-center justify-between gap-10 max-w-6xl mx-auto py-20">
    <div className="w-full lg:w-1/2">
      <img src="/images/fivemillion.svg" alt="Rewards illustration" className="w-full h-auto object-contain max-w-6xl mx-auto"/>
    </div>
    <div className="w-full lg:w-1/2 text-center lg:text-left">
      <h2 className="text-2xl sm:text-3xl lg:text-[31.5px] text-black font-bold">Increase your streams of income.</h2>
      <p className="text-black font-[400] py-3">
        Make money from cashbacks on every airtime and bill payment you make with your SmhartPay Business account.
      </p>
      <Button text={"Join SmhartPay Business"}/>
    </div>
  </div> 

{/*second illustration section */}

  <div className="flex flex-col lg:flex-row-reverse items-center justify-between gap-10 max-w-6xl mx-auto py-20">
    <div className="w-full lg:w-1/2 text-center lg:text-left">
    <h2 className="text-2xl sm:text-3xl lg:text-[31.5px] text-black font-bold">Sell airtime to make more money.</h2>
    <p className="text-black font-[400] py-3">
      Considering being an airtime vendor? Sell airtime with your SmhartPay Business account to make extra money from our 1.5% cashback.
    </p>
    <Button text={"Download SmhartPay Business"}/>
    </div>
    <div className="w-full lg:w-1/2">
      <img src="/images/tenthousand.svg" alt="Sell airtime illustration" className="w-full h-auto object-contain max-w-6xl mx-auto"/>
    </div>
  </div>

{/*third illustration section */}
<div className="flex flex-col lg:flex-row items-center justify-between gap-10 max-w-6xl mx-auto py-20">
  <div className="w-full lg:w-1/2">
    <img src="/images/transaction.svg" alt="Transaction illustration" className="w-full h-auto object-contain max-w-6xl mx-auto"/>
  </div>
  <div className="w-full lg:w-1/2 text-center lg:text-left">
    <h2 className="text-2xl sm:text-3xl lg:text-[31.5px] text-black font-bold">Earn 1.5% cashback instantly.</h2>
    <p className="text-black font-[400] py-3">
      Get your cashback whenever you buy airtime or pay a bill. We’ll credit your account immediately your transaction is completed.
    </p>
    <Button text={"Join SmhartPay Business"}/>
  </div>
</div>

{/* Rewards FAQs section */}
<div>

</div>

{/* Second to the last illustration section */}

<div className="px-6 sm:px-12 lg:px-20 py-14">
        <h2 className="text-black font-bold text-2xl sm:text-[31.5px] mb-8 text-center">More For You</h2>
        <div className="flex flex-wrap justify-center gap-5">
          <div className="flex-1 min-w-[260px] max-w-[320px] bg-white rounded-2xl border border-gray-100 shadow-sm px-6 pt-7 pb-8 hover:shadow-md transition-shadow duration-200">
            <img src="/images/pos.svg" alt="Bill Payments" className="w-10 h-10 object-contain" />
            <p className="pt-4 font-bold text-black text-lg">POS</p>
            <p className="pt-2 text-gray-600 text-sm leading-relaxed">Buy a physical POS, lease it for a one-time fee, or get a virtual POS to accept payments quickly.</p>
            <p className="text-black font-medium underline py-3 flex items-center gap-1 cursor-pointer">Learn more<ChevronRight/></p>
          </div>
          <div className="flex-1 min-w-[260px] max-w-[320px] bg-white rounded-2xl border border-gray-100 shadow-sm px-6 pt-7 pb-8 hover:shadow-md transition-shadow duration-200">
            <img src="/images/invoicing.svg" alt="Business Wallet" className="w-10 h-10 object-contain" />
            <p className="pt-4 font-bold text-black text-lg">Invoicing</p>
            <p className="pt-2 text-gray-600 text-sm leading-relaxed">Create and manage invoices easily, and sync your product catalogue for accurate pricing.</p>
            <p className="text-black font-medium underline py-3 flex items-center gap-1 cursor-pointer">Learn more<ChevronRight/></p>
          </div>
          <div className="flex-1 min-w-[260px] max-w-[320px] bg-white rounded-2xl border border-gray-100 shadow-sm px-6 pt-7 pb-8 hover:shadow-md transition-shadow duration-200">
            <img src="/images/bizloan.svg" alt="Business Loan" className="w-10 h-10 object-contain" />
            <p className="pt-4 font-bold text-black text-lg">Business Loan</p>
            <p className="pt-2 text-gray-600 text-sm leading-relaxed">Offer your staff loans with easy application, approval and disbursement through SmhartPay Business.</p>
            <p className="text-black font-medium underline py-3 flex items-center gap-1 cursor-pointer">Learn more<ChevronRight/></p>
          </div>
        </div>
      </div>

{/* Last illustration section */}
     
           <div className="px-4 sm:px-10 lg:px-20 mb-20">
             <div className="bg-blue-900 rounded-2xl flex flex-col lg:flex-row overflow-hidden">
             <div className="w-full lg:w-1/2 p-8 sm:p-12 lg:p-20 text-center lg:text-left">
               <h2 className="text-2xl sm:text-3xl lg:text-[31.5px] text-white font-bold">Move your business forward with softPOS</h2>
               <p className="text-white py-5">Business can find you anywhere. softPOS from Kuda helps you receive payments on the move with any smartphone connected to the internet.</p>
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
             <div className="w-full lg:w-1/2 flex items-center justify-center px-6 sm:pb-0 pb-8 lg:pb-0 lg:px-0">
               <img src="/images/eightthousand.svg" alt="" className="w-full max-w-xs sm:max-w-sm lg:max-w-md object-contain" />
             </div>
             </div>
           </div>
  </div>
  <Footer/> 
  </div>
  );
}