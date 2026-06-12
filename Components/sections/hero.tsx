"use client";

import Button from "../ui/button";

export default function Hero() {
  return (
    <section className="
      px-5 py-12
      sm:px-10 sm:py-16
      md:px-14 md:py-20
      lg:px-20 lg:py-24
    ">
      <div className="
        max-w-6xl mx-auto
        flex flex-col items-center gap-10
        lg:flex-row lg:items-center lg:justify-between lg:gap-8
      ">

        {/* ── Left: text content ── */}
        <div className="w-full text-center lg:text-left lg:max-w-[48%]">

          {/* Heading */}
          <h1 className="
            font-bold leading-tight text-black
            text-[28px]
            sm:text-[38px]
            md:text-[46px]
            lg:text-[48px]
            xl:text-[54px]
          ">
            Your All-In-One Safe{" "}
            <span className="block">Digital Banking App</span>
          </h1>

          {/* Subtext */}
          <p className="
            text-[#515f72] leading-relaxed
            text-[15px] mt-4 max-w-xl mx-auto
            sm:text-[17px] sm:mt-5
            md:text-[19px]
            lg:text-[20px] lg:mx-0
            xl:text-[22px]
          ">
            Built for seamless money management.{" "}
            Secure, fast, and user-friendly.
          </p>

          {/* CTA Button */}
          <div className="mt-6 sm:mt-7 flex justify-center lg:justify-start">
            <Button text="Get Started" />
          </div>

          {/* Trust badges */}
          <div className="
            flex flex-col items-center gap-4 mt-8
            sm:flex-row sm:justify-center sm:gap-8
            lg:justify-start
          ">
            <div className="flex items-center gap-2.5">
              <p className="text-[13px] text-[#ADB5BF] whitespace-nowrap">
                Licensed By
              </p>
              <img
                src="./images/cbn.svg"
                alt="Central Bank of Nigeria logo"
                className="h-6 w-auto sm:h-7 md:h-8"
                loading="lazy"
              />
            </div>

            <div className="hidden sm:block w-px h-8 bg-gray-200" />

            <div className="flex items-center gap-2.5">
              <p className="text-[13px] text-[#ADB5BF] whitespace-nowrap">
                Deposit Insured By
              </p>
              <img
                src="./images/ndic.svg"
                alt="Nigeria Deposit Insurance Corporation logo"
                className="h-6 w-auto sm:h-7 md:h-8 object-contain"
                loading="lazy"
              />
            </div>
          </div>
        </div>

        {/* ── Mockup image ── */}
        <div className="w-full lg:w-[52%] flex justify-center lg:justify-end">
          <img
            src="./images/laptop.png"
            alt="SmhartPay laptop app screenshot"
            className="
              w-[85%]
              sm:w-[75%]
              md:w-[70%]
              lg:w-full
              xl:w-full
              max-w-[680px]
              h-auto object-contain
            "
            loading="lazy"
          />
        </div>

      </div>
    </section>
  );
}