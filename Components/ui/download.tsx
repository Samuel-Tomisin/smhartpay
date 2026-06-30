"use client";
import { ChevronRight } from "lucide-react";
import { Icon } from "next/dist/lib/metadata/types/metadata-types";
import Link from "next/link";

// ─── App Store URLs ───────────────────────────────────────────────
// Replace the placeholder strings with your real store links
// when they are available.

const APP_STORE_URL = "https://apps.apple.com/your-app-link";       // ← iOS link here
const PLAY_STORE_URL = "https://play.google.com/store/your-app-link"; // ← Android link here

// ─────────────────────────────────────────────────────────────────

type ButtonProps = {
  text: string;
  chevronRight: Icon;
  onClick?: () => void;
};

export default function Download({ text, chevronRight, onClick }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className="text-black text-[14px] font-semibold transition cursor-pointer flex gap-1 underline"
    >
      {text}<ChevronRight/>
    </button>
  );
}
