"use client";

import Footer from "@/Components/layout/footer";
import Navbar from "@/Components/layout/Navbar";
import Button from "@/Components/ui/button";
import Download from "@/Components/ui/download";

const FEATURE_CARDS = [
  {
    icon: "/images/secureinline.svg",
    alt: "ATM withdrawal",
    text: "Withdraw cash for payments free of charge at over 3,000 ATMs.",
  },
  {
    icon: "/images/payicon.svg",
    alt: "Free transfers",
    text: "Get 25 free transfers on the first day of every month.",
  },
  {
    icon: "/images/paymentlink.svg",
    alt: "Payment link",
    text: "Send money free of charge without an account number.",
  },
];

const CONTENT_ROWS = [
  {
    image: "/images/sendfree.svg",
    imageAlt: "Send free illustration",
    title: "Free transfers will make your life easier.",
    body: "We believe in moving money quickly and free of charge, so you can count on getting 25 free transfers to other banks every month forever.",
    cta: null,
    imageLeft: true,
  },
  {
    image: "/images/cardentry.svg",
    imageAlt: "Card entry illustration",
    title: "SmhartPay debit card = A simpler life",
    body: "You can't avoid spending. That's how you pay for your needs. Pick up your SmhartPay card or have us deliver it to your address and never pay a card maintenance fee.",
    cta: { text: "Learn More About Cards" },
    imageLeft: false,
  },
  {
    image: "/images/naira.svg",
    imageAlt: "Naira cash illustration",
    title: "Need to pay with cash? Withdraw it for free.",
    body: "Transfers are best but if you need to pay with cash, you can withdraw free of charge with your Kuda Card at over 3,000 ATMs.",
    cta: null,
    imageLeft: true,
  },
  {
    image: "/images/share.svg",
    imageAlt: "Share money illustration",
    title: "Send money without an account number.",
    body: "There's more than one way to send money for free. Create a SmhartPay Username for quick transfers to other SmhartPay Usernames.",
    cta: null,
    imageLeft: false,
  },
  {
    image: "/images/payid.svg",
    imageAlt: "Pay ID illustration",
    title: "Pay online without a debit card.",
    body: "Pay directly from your SmhartPay account on online stores with Pay ID, no card needed.",
    cta: null,
    imageLeft: true,
  },
];

export default function Transfer() {
  return (
    <div className="bg-white">
      <Navbar />

      {/* HERO SECTION */}
      <section className="flex flex-col-reverse lg:flex-row items-center justify-between gap-10 px-6 sm:px-12 lg:px-20 pt-10 pb-14">
        <div className="max-w-xl">
          <h1 className="text-[36px] sm:text-[42px] font-bold text-[#40196D] leading-tight">
            Send money for free, <br className="hidden sm:block" /> every day.
          </h1>
          <p className="py-4 text-black text-[14px] leading-relaxed">
            Your Kuda account comes with 25 free transfers to other banks every
            month. That's up to 15,000 naira saved on transfers every year.
          </p>
          <Button text="Join SmhartPay" />
        </div>
        <div className="flex-shrink-0">
          <img
            src="/images/newspend.png"
            alt="SmhartPay app spending screen"
            className="w-full max-w-sm lg:max-w-md object-contain"
          />
        </div>
      </section>

      {/* FEATURE CARDS */}
      <section className="flex flex-wrap items-stretch gap-5 px-6 sm:px-12 lg:px-20 pb-14">
        {FEATURE_CARDS.map(({ icon, alt, text }) => (
          <div
            key={alt}
            className="flex-1 min-w-[220px] bg-white rounded-2xl border border-gray-100 shadow-sm px-6 pt-7 pb-8 hover:shadow-md transition-shadow duration-200"
          >
            <img src={icon} alt={alt} />
            <p className="pt-6 text-black font-bold text-[14px] leading-relaxed">
              {text}
            </p>
          </div>
        ))}
      </section>

      {/* ALTERNATING CONTENT ROWS */}
      {CONTENT_ROWS.map(({ image, imageAlt, title, body, cta, imageLeft }) => (
        <section
          key={title}
          className="flex flex-col lg:flex-row items-center justify-between gap-10 px-6 sm:px-12 lg:px-20 py-14"
        >
          {imageLeft && (
            <div className="flex-shrink-0">
              <img
                src={image}
                alt={imageAlt}
                className="w-full max-w-xs lg:max-w-sm object-contain"
              />
            </div>
          )}
          <div className="max-w-lg">
            <h2 className="text-[28px] sm:text-[31.5px] font-bold text-[#40196D] leading-snug">
              {title}
            </h2>
            <p className="text-black text-[14px] py-4 leading-relaxed">{body}</p>
            {cta && (
              <div className="text-[#40196D]">
                <Download text={cta.text} chevronRight="" />
              </div>
            )}
          </div>
          {!imageLeft && (
            <div className="flex-shrink-0">
              <img
                src={image}
                alt={imageAlt}
                className="w-full max-w-xs lg:max-w-sm object-contain"
              />
            </div>
          )}
        </section>
      ))}

      <Footer />
    </div>
  );
}