"use client"
import Link from "next/link";


export function AppStoreButton() {
  return (
    <Link
      href="https://apps.apple.com/your-app-link"
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-3 bg-black text-white px-5 py-3 rounded-xl hover:bg-zinc-800 active:scale-95 transition-all duration-150"
    >
      {/* Apple icon */}
      <svg
        className="w-6 h-6 fill-white flex-shrink-0"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
      </svg>

      <div className="flex flex-col leading-none text-left">
        <span className="text-[10px] text-gray-300 font-normal">Download on the</span>
        <span className="text-[15px] font-semibold tracking-tight">App Store</span>
      </div>
    </Link>
  );
}