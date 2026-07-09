"use client"
import { ArrowRight } from 'lucide-react';

export default function Mobile2 () {
    return (
        <div className="px-6 md:px-10 lg:px-20 py-10 md:py-12 lg:py-15">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10 md:gap-6">
                <div className="w-full md:w-1/2 text-center md:text-left">
                    <h1 className="text-[28px] text-black sm:text-[32px] md:text-[34px] lg:text-[36px] font-semibold leading-tight">
                        The Future of Banking Starts Here
                    </h1>
                    <p className="text-[15px] sm:text-[17px] md:text-[18px] lg:text-[20px] text-[#64748B] py-4 md:py-5 leading-relaxed">
                        From savings to investments and everyday transactions, we're{" "}
                        <br className="hidden lg:block" />
                        committed to helping you build lasting value.
                    </p>
                    <a href="/learn-more" className="inline-flex items-center justify-center md:justify-start w-full md:w-auto text-[#034EA2] gap-2 font-medium">
                        Learn More <ArrowRight />
                    </a>
                </div>
                <div className="flex justify-center w-full md:w-auto">
                    <img
  src="./images/phone2.png"
  alt="Phone showcasing SmhartPay's mobile app interface"
  className="w-[260px] sm:w-[300px] md:w-[360px] lg:size-105 h-auto lg:h-[420px] object-contain"
/>
                </div>
            </div>
        </div>
    );
}