"use client"
import Link from 'next/link';

export default function Footer() {
    return (
        <div className="bg-[#FAFAF9] px-5 sm:px-10 md:px-16 lg:px-20">
            {/* Top section: logo + nav columns */}
            <div className="max-w-6xl mx-auto py-12 md:py-20 grid grid-cols-2 gap-8 sm:grid-cols-3 lg:flex lg:justify-between">
                {/* Brand + app store — full width on mobile */}
                <div className="col-span-2 sm:col-span-3 lg:col-span-1">
                    <img src="/images/logo.png" alt="" className="size-14 cursor-pointer"/>
                    <p className="text-[14px] py-6 text-[#7C8FB7]">
                        Download the SmhartPay app on Android <br />
                        and iOS for fast,secure, and convenient <br />
                        banking anytime, anywhere.
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

                {/* Product Links */}
                <div>
                    <h3 className="text-[16px] font-semibold pb-4 text-[#7C8FB7]">Product Links</h3>
                    <ul className="text-[14px] text-[#7C8FB7] space-y-1 flex flex-col">
                        <Link href="/transfer" className="cursor-pointer">Transfers</Link>
                        <Link href="/wallet" className="cursor-pointer">Wallet</Link>
                        <Link href="/savings" className="cursor-pointer">Savings</Link>
                        <Link href="/cards" className="cursor-pointer">Cards</Link>
                        <Link href="/rewards" className="cursor-pointer">Rewards</Link>
                        <Link href="/pricing" className="cursor-pointer">Pricing</Link>
                    </ul>
                </div>

                {/* Company Links */}
                <div>
                    <h3 className="text-[16px] font-semibold pb-4 text-[#7C8FB7]">Company Links</h3>
                    <ul className="text-[14px] text-[#7C8FB7] space-y-1 flex flex-col">
                        <Link href='/about' className="cursor-pointer">About</Link>
                        <Link href='/careers' className="cursor-pointer">Careers</Link>
                        <Link href='/contact' className="cursor-pointer">Contact</Link>
                    </ul>
                </div>

                {/* Resources Links */}
                <div>
                    <h3 className="text-[16px] font-semibold pb-4 text-[#7C8FB7]">Resources Links</h3>
                    <ul className="text-[14px] text-[#7C8FB7] space-y-1 flex flex-col">
                        <Link href="/help-centre" className="cursor-pointer">Help-Centre</Link>
                        <Link href="/faqs" className="cursor-pointer">FAQs</Link>
                        <Link href="/blog" className="cursor-pointer">Blog</Link>
                        <Link href="/security" className="cursor-pointer">Security</Link>
                    </ul>
                </div>

                {/* Legal Links */}
                <div>
                    <h3 className="text-[16px] font-semibold pb-4 text-[#7C8FB7] flex">Legal Links</h3>
                    <ul className="text-[14px] text-[#7C8FB7] space-y-1 flex flex-col">
                        <Link href="/terms-of-use" className="cursor-pointer">Terms of Use</Link>
                        <Link href="/privacy-policy" className="cursor-pointer">Privacy Policy</Link>
                        <Link href="/cookie-policy" className="cursor-pointer">Cookie Policy</Link>
                        <Link href="/legal" className="cursor-pointer">Legal</Link>
                    </ul>
                </div>
            </div>

            {/* Bottom section: socials + fund protection */}
            <div className="max-w-6xl mx-auto flex flex-col gap-8 md:flex-row md:justify-between pb-12 md:pb-20">
                <div>
                    <h3 className="text-[16px] font-semibold pb-4 text-[#7C8FB7]">Social Links</h3>
                    <div className='flex grayscale gap-2.5'>
                        <Link href="https://twitter.com" target="_blank">
                            <img src="/images/twitter.svg" alt="twitter logo" className="size-7 cursor-pointer" />
                        </Link>
                        <Link href="https://instagram.com" target="_blank">
                            <img src="/images/instagram.png" alt="instagram logo" className="size-7 cursor-pointer" />
                        </Link>
                        <Link href="https://facebook.com" target="_blank">
                            <img src="/images/facebook.svg" alt="facebook logo" className="size-7 cursor-pointer" />
                        </Link>
                        <Link href="https://linkedin.com" target="_blank">
                            <img src="/images/linkedin.png" alt="linkedin logo" className="size-7 cursor-pointer" />
                        </Link>
                    </div>
                </div>

                <div className="md:max-w-md">
                    <h3 className="text-[16px] font-semibold pb-4 text-[#7C8FB7]">Fund Protection details</h3>
                    <p className="text-[14px] text-[#7C8FB7]">
                        Your security comes first. SmhartPay uses encryption, secure
                        authentication, fraud monitoring, and compliance-driven processes
                        to deliver a safe and trusted banking experience.
                    </p>
                </div>
            </div>

            {/* Copyright bar */}
            <div className="max-w-6xl mx-auto pb-12 md:pb-20">
                <div className="border-t border-gray-200 w-full mb-4"></div>
                <h3 className="flex justify-center text-[13px] text-[#7C8FB7]">
                    © SmhartPay 2026, All Rights Reserved
                </h3>
            </div>
        </div>
    );
}