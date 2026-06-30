"use client";
import Link from "next/link";


export function PlayStoreButton() {
  return (
    <Link
      href="https://play.google.com/store/your-app-link"
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-3 bg-black text-white px-5 py-3 rounded-xl hover:bg-zinc-800 active:scale-95 transition-all duration-150"
    >
      {/* Google Play icon */}
      <svg
        className="w-6 h-6 flex-shrink-0"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path d="M3.18 23.76c.3.16.64.2.99.1l.1-.06 11.04-11.04-2.29-2.29L3.18 23.76z" fill="#EA4335"/>
        <path d="M20.7 10.7l-2.6-1.48-2.59 2.59 2.59 2.59 2.62-1.5c.75-.43.75-1.77-.02-2.2z" fill="#FBBC04"/>
        <path d="M3.18.24C2.83.14 2.49.18 2.19.34L12.4 10.56l2.29-2.29L3.18.24z" fill="#4285F4"/>
        <path d="M2.19.34C1.7.62 1.38 1.18 1.38 1.98v20.04c0 .8.32 1.36.81 1.64l.1.06L13.61 12 2.19.34z" fill="#34A853"/>
      </svg>

      <div className="flex flex-col leading-none text-left">
        <span className="text-[10px] text-gray-300 font-normal">Get it on</span>
        <span className="text-[15px] font-semibold tracking-tight">Google Play</span>
      </div>
    </Link>
  );
}