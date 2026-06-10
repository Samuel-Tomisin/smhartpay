"use client"

import Link from "next/link";

export default function CTASection () {
    return(
        <div className="mt-20 pt-10 md:pt-12 lg:pt-15 px-6 md:px-10 lg:px-20">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10 md:gap-6">
                <div className="w-full md:w-1/2 text-center md:text-left">
                    <h1 className="text-[28px] sm:text-[32px] md:text-[34px] lg:text-[36px] font-semibold text-[#E5E7EB] leading-tight">
                        Download the Mobile App
                    </h1>
                    <p className="text-[#E5E7EB] text-[15px] sm:text-[17px] md:text-[20px] lg:text-[24px] py-4 md:py-5 leading-relaxed">
                        Download our mobile applications android {" "}
                        <br className="hidden lg:block" />
                        and IOS for easy and quick banking
                    </p>
                    <div className="flex items-center justify-center md:justify-start gap-2 md:gap-3">
                        <Link href="https://play.google.com/store/apps?hl=en" target="_blank">
                            <img src="./images/store2.svg" alt="" className="h-10 md:h-11 lg:h-auto w-auto cursor-pointer" />
                        </Link>
                        <Link href="https://www.apple.com/app-store/" target="_blank">
                            <img src="./images/store1.svg" alt="" className="h-10 md:h-11 lg:h-auto w-auto cursor-pointer" />
                        </Link>
                    </div>
                </div>
                <div className="flex justify-center w-full md:w-auto">
                    <img src="./images/phone3.png" alt="" className="w-[120px] sm:w-[160px] md:w-[200px] lg:w-auto h-auto" />
                </div>
            </div>
        </div>
    );
}