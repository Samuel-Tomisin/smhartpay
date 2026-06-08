"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Getstarted() {
  return (
    // ✅ Only small-screen breathing room on the section.
    // max-w-6xl mx-auto handles centring and width cap on large screens.
    <section className="text-white px-5 py-12 sm:py-16 md:py-20">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 md:gap-6 text-center md:text-left">

        {/* Description text */}
        <p className="text-[18px] sm:text-[20px] md:text-[22px] lg:text-[24px] leading-relaxed">
          Open an account tailored to your needs and{" "}
          <br className="hidden lg:block" />
          enjoy seamless, secure, and rewarding banking{" "}
          <br className="hidden lg:block" />
          experiences every day.
        </p>

        {/* CTA button */}
        <Link href="/get-started">
          <button
            className=" cursor-pointer
              rounded-lg border border-white text-white
              text-[14px] md:text-[15px] lg:text-[16px] font-semibold
              py-3 px-6 md:px-7
              flex items-center gap-2 whitespace-nowrap shrink-0
              hover:bg-white hover:text-[#034EA2]
              active:scale-95 transition-all duration-150
            "
          >
            Get Started
            <ArrowRight size={18} className="animate-bounce" />
          </button>
        </Link>

      </div>
    </section>
  );
}