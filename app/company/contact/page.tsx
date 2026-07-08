"use client"

import Link from "next/link";
import Footer from "@/Components/layout/footer";
import Navbar from "@/Components/layout/Navbar";
import FAQs from "@/Components/sections/FAQAccordion";
import Button from "@/Components/ui/button";

export default function Contact() {
  return (
    <div>
      <Navbar />

      <div className="flex justify-center flex-col items-center px-4 bg-white sm:px-8 md:px-14 lg:px-20 py-8 sm:py-16 md:py-20 lg:py-28">

        {/* Heading */}
        <h1 className="text-3xl sm:text-4xl md:text-[42px] lg:text-[50px] font-bold text-black text-center">
          Contact Us
        </h1>
        

        {/* Subtext */}
        <p className="text-base sm:text-lg md:text-[20px] text-[#647FA1] text-center mt-3">
          Talk to us today, We'd love to hear from you.
        </p>

        <div className="w-full max-w-6xl mx-auto">
          <div className="max-w-6xl mx-auto pt-4 pb-2">
            <h2 className="text-black font-semibold">Your Name</h2>
            <input type="text" placeholder="Enter your name" className="text-black border border-gray-300 rounded-md py-2 px-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full max-w-6xl mx-auto" />
          </div>
          <div className="max-w-6xl mx-auto pt-4 pb-2">
            <h2 className="text-black font-semibold">Your Email</h2>
            <input type="email" placeholder="Enter your email" className="text-black border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full max-w-6xl mx-auto" />
          </div>
          <div className="max-w-6xl mx-auto pt-4 pb-2">
            <h2 className="text-black font-semibold">Phone Number</h2>
            <input type="tel" placeholder="Enter your phone number" className="text-black border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full max-w-6xl mx-auto" />
          </div>
          <div className="max-w-6xl mx-auto pt-4 pb-2">
            <h2 className="text-black font-semibold">Your Message</h2>
            <textarea placeholder="Enter your message" className="text-black border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full h-32 resize-none"></textarea>
          </div>
        </div>


        {/* CTA Button */}

        <Button text="Send Message" onClick={() => { /* Handle button click */ }} />

        {/* <button className="rounded-2xl bg-[#023d82] font-semibold px-6 py-4 text-white text-sm sm:text-[16px] cursor-pointer hover:bg-[#023d82] transition-colors duration-200 w-full sm:w-auto">
          Send Message
        </button> */}
      </div>

      <FAQs />
      <Footer />
    </div>
  );
}