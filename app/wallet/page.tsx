"use client"

import Footer from "@/Components/layout/footer";
import Navbar from "@/Components/layout/Navbar";
import Button, { AppStoreButton, PlayStoreButton } from "@/Components/ui/button";

export default function Wallet () {
  return (
    <div>
      <Navbar/>

      {/* HERO */}
      <div className="bg-[url('/images/bg.png')] bg-cover bg-center bg-no-repeat min-h-screen flex items-center">
        <div className="flex flex-col px-6 py-16 sm:px-10 lg:px-20 lg:py-20">
          <h1 className="text-[36px] sm:text-[52px] lg:text-[70px] text-white font-bold leading-tight max-w-3xl">
            The wallet built for football fans
          </h1>
          <p className="text-[15px] sm:text-[18px] text-white max-w-xl">
            Smhartpay digital wallet is built for the way you spend. Fund your favourite
            platforms in seconds, send money globally and pay online. Sign Up below:
          </p>
          <div className="flex flex-wrap items-center gap-3 py-4">
            <AppStoreButton/> <PlayStoreButton/>
          </div>
        </div>
      </div>

      {/* FEATURE CARDS */}
      <div className="bg-white">
        <div>
          <h2 className="text-[28px] sm:text-[38px] lg:text-[50px] text-[#40196D] font-bold text-center px-6 py-10 lg:py-15">
            Your Complete Payment Solution
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-6 py-10 sm:px-10 lg:px-20 lg:py-15">
          {/* Card 1 — Pay Online */}
          <div className="bg-white border border-gray-100 shadow-sm px-6 pt-7 pb-8 hover:shadow-md transition-shadow duration-200 flex flex-col">
            <img src="/images/mobilewallet.svg" alt="" className="size-18 grayscale"/>
            <h3 className="text-[#40196D] text-[20px] sm:text-[22px] font-bold pt-8 pb-3">Pay Online</h3>
            <p className="text-sm text-gray-600 leading-relaxed flex-1 py-3">
              Make payments without sharing your bank details.
            </p>
            <Button text={"Learn More"}/>
          </div>

          {/* Card 2 — Send Money */}
          <div className="bg-white border border-gray-100 shadow-sm px-6 pt-7 pb-8 hover:shadow-md transition-shadow duration-200 flex flex-col">
            <img src="/images/send.svg" alt="" className="size-18 grayscale"/>
            <h3 className="text-[#40196D] text-[20px] sm:text-[22px] font-bold pt-8 pb-3">Send Money</h3>
            <p className="text-sm text-gray-600 leading-relaxed flex-1 py-3">
              Send to a bank account or another SmhartPay customer.
            </p>
            <Button text={"Learn More"}/>
          </div>

          {/* Card 3 — Loyalty Rewards */}
          <div className="bg-white border border-gray-100 shadow-sm px-6 pt-7 pb-8 hover:shadow-md transition-shadow duration-200 flex flex-col">
            <img src="/images/star.svg" alt="" className="size-18 grayscale" />
            <h3 className="text-[#40196D] text-[20px] sm:text-[22px] font-bold pt-8 pb-3">Loyalty Rewards</h3>
            <p className="text-sm text-gray-600 leading-relaxed flex-1 py-3">
              Use your SmhartPay wallet to unlock VIP benefits and earn Knect points on every transaction.
            </p>
            <Button text={"Learn More"}/>
          </div>

          {/* Card 4 — Crypto */}
          <div className="bg-white border border-gray-100 shadow-sm px-6 pt-7 pb-8 hover:shadow-md transition-shadow duration-200 flex flex-col">
            <img src="/images/crypto.svg" alt="" className="size-18 grayscale" />
            <h3 className="text-[#40196D] text-[20px] sm:text-[22px] font-bold pt-8 pb-3">Crypto</h3>
            <p className="text-sm text-gray-600 leading-relaxed flex-1 py-3">
              Over 40 different cryptocurrencies.
            </p>
            <Button text={"Learn More"}/>
          </div>
        </div>
      </div>

      {/* RATE ALERTS */}
      <div className="px-6 py-10 sm:px-10 lg:px-20 bg-white">
        <div className="flex flex-col lg:flex-row items-stretch bg-white overflow-hidden rounded-md">
          <div className="w-full lg:w-1/2">
            <img src="/images/handphone.webp" alt="" className="w-full h-full object-cover"/>
          </div>
          <div className="px-6 py-8 sm:px-10 lg:px-15 lg:py-10 bg-blue-900 w-full lg:w-1/2 flex flex-col justify-center">
            <h2 className="text-[26px] sm:text-[32px] lg:text-[40px] text-white font-bold">
              Stay ahead of the rate
            </h2>
            <p className="text-[15px] sm:text-[18px] text-white">
              Download and take control of your FX with SmhartPay rate alerts. Set your
              target rate and get notified the moment it hits.
            </p>
            <ul className="text-white text-[15px] sm:text-[18px] py-3 list-disc pl-5">
              <li>Custom rate notifications</li>
              <li>Daily updates, if you want</li>
              <li>Smarter conversions, better timing</li>
            </ul>
            <div className="flex flex-wrap gap-3 py-1">
              <AppStoreButton/> <PlayStoreButton/>
            </div>
          </div>
        </div>
      </div>

      {/* SMOOTH EXPERIENCE */}
      <div className="bg-white py-10 px-6 sm:px-10 lg:py-15 lg:px-20">
        <div className="flex flex-col lg:flex-row justify-between items-center lg:items-start gap-10 py-10 lg:py-15">
          {/* Left text column */}
          <div className="text-black max-w-xl text-center lg:text-left">
            <h2 className="text-[26px] sm:text-[32px] lg:text-[40px] font-semibold leading-tight">
              The online wallet for people who care for smooth experience
            </h2>
            <p className="py-3">
              SmhartPay has been helping to make it, send it and spend it for
              millions of customers since 2026.
            </p>
            <p className="py-3">
              So wherever you are and whatever you want to do with your money,
              just smhartPay it.
            </p>
            <Button text={"Open a SmhartPay account"} />
          </div>

          {/* Right image column */}
          <div className="relative w-full max-w-[420px] h-[240px] sm:h-[300px] mx-auto lg:mx-0">
            {/* small image, top right */}
            <img
              src="/images/lady.webp"
              alt=""
              className="absolute top-0 right-0 w-[55%] h-[55%] object-cover rounded-md"
            />
            {/* large image, lower left, overlapping below the small one */}
            <img
              src="/images/openteeth.webp"
              alt=""
              className="absolute bottom-0 left-0 w-[85%] h-[90%] object-cover rounded-md"
            />
          </div>
        </div>
      </div>

      <Footer/>
    </div>
  );
}