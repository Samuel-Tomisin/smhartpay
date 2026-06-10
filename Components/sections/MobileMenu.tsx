"use client"
import { ArrowRight } from 'lucide-react';

export default function Mobile() {
  return (
    <div className="px-6 md:px-10 lg:px-20 py-12 md:py-16 lg:py-20">
      <div className="max-w-6xl mx-auto flex flex-col-reverse md:flex-row items-center justify-between gap-12 md:gap-8 lg:gap-12">

        {/* Image Section */}
        <div className="flex justify-center w-full md:w-auto shrink-0">
          <div className="relative flex items-center justify-center w-[280px] sm:w-[320px] md:w-[380px] lg:w-[420px]">

            {/* Decorative background blob */}
            <div
              className="absolute inset-0 rounded-[40%_60%_55%_45%_/_45%_55%_60%_40%]"
              style={{ background: 'linear-gradient(135deg, #EBF3FF 0%, #D6E8FF 60%, #C2DBFF 100%)' }}
            />

            {/* Soft inner glow ring */}
            <div
              className="absolute inset-4 rounded-[38%_62%_52%_48%_/_48%_52%_62%_38%] opacity-50"
              style={{ background: 'linear-gradient(135deg, #FFFFFF 0%, #E0EDFF 100%)' }}
            />

            {/* Phone image */}
            <img
              src="./images/hand2.png"
              alt="Mobile banking app"
              className="relative z-10 w-[200px] sm:w-[230px] md:w-[270px] lg:w-[300px] h-auto drop-shadow-2xl"
              style={{ filter: 'drop-shadow(0 24px 40px rgba(3, 78, 162, 0.18))' }}
            />

            {/* Floating badge — top right */}
            <div
              className="absolute top-4 right-0 z-20 flex items-center gap-2 bg-white rounded-2xl px-3 py-2 shadow-lg border border-blue-50"
              style={{ boxShadow: '0 4px 20px rgba(3,78,162,0.12)' }}
            >
              <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: '#EBF3FF' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#034EA2" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
              </div>
              <div>
                <p className="text-[10px] text-gray-400 leading-none mb-0.5">Total Balance</p>
                <p className="text-[13px] font-semibold text-[#1A202E] leading-none">$24,500.00</p>
              </div>
            </div>

            {/* Floating badge — bottom left */}
            <div
              className="absolute bottom-6 left-0 z-20 flex items-center gap-2 bg-white rounded-2xl px-3 py-2 shadow-lg border border-blue-50"
              style={{ boxShadow: '0 4px 20px rgba(3,78,162,0.12)' }}
            >
              <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: '#E8F5EE' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                  <polyline points="17 6 23 6 23 12" />
                </svg>
              </div>
              <div>
                <p className="text-[10px] text-gray-400 leading-none mb-0.5">Monthly Savings</p>
                <p className="text-[13px] font-semibold text-[#16A34A] leading-none">+12.4%</p>
              </div>
            </div>
          </div>
        </div>

        {/* Text Section */}
        <div className="w-full md:w-1/2 text-center md:text-right">
          <h1 className="text-[28px] sm:text-[32px] md:text-[34px] lg:text-[36px] text-[#1A202E] font-semibold leading-tight">
            Convenient savings solutions designed around your lifestyle.
          </h1>
          <p className="text-[15px] sm:text-[17px] md:text-[18px] lg:text-[20px] text-[#64748B] pt-4 pb-6 leading-relaxed">
            Banking is evolving—stay ahead with a smarter way to manage your money. Save, earn, transfer funds, and pay bills effortlessly, all from one secure platform.
          </p>
          <a
            href="/learn-more"
            className="inline-flex items-center justify-center md:justify-end w-full md:w-auto text-[#034EA2] gap-2 font-medium"
          >
            Learn More <ArrowRight size={18} />
          </a>
        </div>

      </div>
    </div>
  );
}