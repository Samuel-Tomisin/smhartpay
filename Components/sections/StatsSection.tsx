"use client"
import Link from "next/link";
import { ArrowRight } from 'lucide-react';

export default function Getstarted () {
    return (
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-6 py-12 md:py-16 lg:py-20 px-6 md:px-10 lg:px-20 text-white text-center md:text-left">
            <p className="text-[18px] sm:text-[20px] md:text-[22px] lg:text-[24px] leading-relaxed">
                Open an account tailored to your needs and {" "}
                <br className="hidden lg:block" />
                enjoy seamless, secure, and rewarding banking {" "}
                <br className="hidden lg:block" />
                experiences every day.
            </p>
            <Link href="/get-started">
                <button className="rounded-sm border-[1] border-white text-white text-[14px] md:text-[15px] lg:text-[16px] font-semibold py-3 px-6 md:px-7 flex items-center gap-2 whitespace-nowrap shrink-0">
                    Get Started<ArrowRight className="animate-bounce"/>
                </button>
            </Link>
        </div>
    );
}