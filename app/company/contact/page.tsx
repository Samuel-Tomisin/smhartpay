"use client"

import Link from "next/link";
import Footer from "@/Components/layout/footer";
import Navbar from "@/Components/layout/Navbar";
import FAQs from "@/Components/sections/FAQAccordion";

export default function Contact() {
  return (
    <div>
      <Navbar />

      <div className="flex justify-center flex-col items-center px-4 bg-white sm:px-8 md:px-14 lg:px-20 py-12 sm:py-16 md:py-20 lg:py-28">

        {/* Heading */}
        <h1 className="text-3xl sm:text-4xl md:text-[42px] lg:text-[50px] font-bold text-black text-center">
          Contact Us
        </h1>

        {/* Subtext */}
        <p className="text-base sm:text-lg md:text-[20px] text-[#647FA1] text-center mt-3">
          Talk to us today, We'd love to hear from you.
        </p>

        {/* Contact Image */}
        <img
          src="/images/contact.svg"
          alt="contact image"
          className="w-full max-w-[260px] sm:max-w-[360px] md:max-w-[480px] lg:max-w-[580px] h-auto my-8 sm:my-10"
        />

        {/* CTA Button */}
        <Link href="https://gmail.com" target="_blank">
          <button className="rounded-2xl bg-[#034EA2] font-semibold px-6 py-4 text-white text-sm sm:text-[16px] cursor-pointer hover:bg-[#023d82] transition-colors duration-200 w-full sm:w-auto">
            Send a mail
          </button>
        </Link>

      </div>

      <FAQs />
      <Footer />
    </div>
  );
}