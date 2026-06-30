"use client"

import Footer from "@/Components/layout/footer";
import Navbar from "@/Components/layout/Navbar"

export default function About() {
  return (
    <div>
      <Navbar />
      <div className="flex flex-col items-center bg-white px-4 sm:px-8 md:px-14 lg:px-20 py-12 sm:py-16 md:py-20 lg:py-30">

        {/* Heading */}
        <h1 className="text-3xl sm:text-4xl md:text-[42px] text-black lg:text-[50px] font-bold text-center">
          About SmhartPay
        </h1>

        {/* Subtext */}
        <p className="text-base sm:text-lg md:text-[18px] lg:text-[20px] text-[#647FA1] text-center mt-4 max-w-3xl leading-relaxed">
          Our mission is simple: make everyday financial management effortless.
          Our dedicated team of experts works around the clock to streamline your experience,
          eliminate unnecessary hassles, and ensure you can focus on what matters most.
        </p>

        {/* Orbit Image */}
        <img
          src="/images/orbit.png"
          alt="dashboard"
          className="w-full max-w-[280px] sm:max-w-[380px] md:max-w-[500px] lg:max-w-[600px] h-auto my-8 sm:my-10"
        />

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-5xl">

          {/* Mission Card */}
          <div className="bg-[#FBFDFE] rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
            <h2 className="text-xl sm:text-2xl md:text-[28px] font-semibold text-black mb-4">
              Our Mission
            </h2>
            <p className="text-sm sm:text-[15px] leading-7 text-[#647FA1]">
              To leverage technology and innovation to make financial services more
              accessible, affordable, and impactful. Through trusted partnerships and
              customer-centric solutions, we empower businesses and individuals to
              achieve sustainable financial growth and economic prosperity.
            </p>
          </div>

          {/* Vision Card */}
          <div className="bg-[#FBFDFE] rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
            <h2 className="text-xl sm:text-2xl md:text-[28px] font-semibold text-black mb-4">
              Our Vision
            </h2>
            <p className="text-sm sm:text-[15px] text-[#647FA1] leading-7">
              To be a leading catalyst for financial inclusion, providing customized
              financial services that enable unbanked and underbanked individuals and
              businesses to thrive in a rapidly evolving economy.
            </p>
          </div>

        </div>
      </div>
      <Footer />
    </div>
  );
}