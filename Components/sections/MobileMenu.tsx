"use client"
import { ArrowRight } from 'lucide-react';

export default function Mobile () {
    return (
        <div className="px-6 md:px-10 lg:px-20 py-12 md:py-16 lg:py-20">
            <div className="max-w-6xl mx-auto flex flex-col-reverse md:flex-row items-center justify-between gap-10 md:gap-6">
                <div className="flex justify-center w-full md:w-auto">
                    <img src="./images/image.jpg" alt="" className="w-[260px] sm:w-[300px] md:w-[360px] lg:size-105 h-auto" />
                </div>
                <div className="w-full md:w-1/2 text-center md:text-right">
                    <h1 className="text-[28px] sm:text-[32px] md:text-[34px] lg:text-[36px] text-[#1A202E] font-semibold leading-tight">
                        Convenient savings solutions designed around your lifestyle.
                    </h1>
                    <p className="text-[15px] sm:text-[17px] md:text-[18px] lg:text-[20px] text-[#64748B] pt-4 pb-6 leading-relaxed">
                        Banking is evolving—stay ahead with a smarter 
                        way to manage your money. Save, earn, transfer funds, 
                        and pay bills effortlessly, all from one secure platform.
                    </p>
                    <a href="/learn-more" className="inline-flex items-center justify-center md:justify-end w-full md:w-auto text-[#034EA2] gap-2 font-medium">
                        Learn More <ArrowRight />
                    </a>
                </div>
            </div>
        </div>
    );
}