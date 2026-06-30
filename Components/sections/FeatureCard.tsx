"use client"
import {
  Wallet,
  Send,
  HandCoins,
  Smartphone,
  Gift,
  Landmark,
  CreditCard,
  Gem,
} from "lucide-react";

export default function Features() {
  return (
    <main className="pt-14 md:pt-20 pb-16 md:pb-30 min-h-screen px-6 md:px-10 lg:px-20">
      {/* MAIN GRID */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">

        {/* LEFT COLUMN */}
        <div className="space-y-5 md:space-y-6">

          {/* HEADING */}
          <div>
            <h1 className="text-[28px] text-black sm:text-[32px] md:text-[36px] font-bold pb-4 md:pb-6">Our Services</h1>
            <p className="text-[15px] sm:text-[16px] md:text-[18px] pb-6 md:pb-10 text-[#64748A]">
              We have quality solutions in place to{" "}
              <br className="hidden lg:block" />
              make banking smooth.
            </p>
          </div>

          {/* CARD 1 */}
          <div className="bg-white pb-10 md:pb-14 px-6 md:px-8 pt-8 md:pt-10 text-[#034EA2] rounded-lg shadow-md">
            <div className="flex items-center gap-4 mb-4">
              <Wallet className="text-[#034EA2]" />
              <h2 className="text-[15px] md:text-[16px] font-bold text-[#034EA2]">
                Wallet
              </h2>
            </div>
            <p className="text-[#64748B] text-[14px] md:text-[15px]">
              Manage your money effortlessly with a secure digital wallet.
              Store funds, make payments, track transactions, and access your finances anytime,
              anywhere—all from one convenient place.
            </p>
          </div>

          {/* CARD 2 */}
          <div className="bg-white pb-10 md:pb-14 px-6 md:px-8 pt-8 md:pt-10 rounded-lg shadow-md">
            <div className="flex items-center gap-4 mb-4">
              <Send className="text-[#034EA2]" />
              <h2 className="text-[15px] md:text-[16px] font-bold text-[#034EA2]">
                Transfer
              </h2>
            </div>
            <p className="text-[#64748B] text-[14px] md:text-[15px]">
              Send money quickly and securely to banks, wallets, and other users.
              Enjoy seamless transfers with real-time processing, low fees, and reliable transaction tracking.
            </p>
          </div>

        </div>

        {/* MIDDLE COLUMN */}
        <div className="space-y-5 md:space-y-6">

          {/* CARD 3 */}
          <div className="bg-white pb-10 md:pb-14 px-6 md:px-8 pt-8 md:pt-10 rounded-lg shadow-md">
            <div className="flex items-center gap-4 mb-4">
              <HandCoins className="text-[#034EA2]" />
              <h2 className="text-[15px] md:text-[16px] font-bold text-[#034EA2]">
                Receive Funds
              </h2>
            </div>
            <p className="text-[#64748B] text-[14px] md:text-[15px]">
              Receive money instantly from friends, family, and businesses directly into your account or wallet.
              Access your funds securely and track incoming payments with ease.
            </p>
          </div>

          {/* CARD 4 */}
          <div className="bg-white pb-10 md:pb-14 px-6 md:px-8 pt-8 md:pt-10 rounded-lg shadow-md">
            <div className="flex items-center gap-4 mb-4">
              <Smartphone className="text-[#034EA2]" />
              <h2 className="text-[15px] md:text-[16px] font-bold text-[#034EA2]">
                VTU
              </h2>
            </div>
            <p className="text-[#64748B] text-[14px] md:text-[15px]">
              Purchase airtime and data bundles for all major networks anytime, anywhere. Enjoy fast,
              reliable top-ups with competitive rates and instant delivery.
            </p>
          </div>

          {/* CARD 5 */}
          <div className="bg-white pb-10 md:pb-14 px-6 md:px-8 pt-8 md:pt-10 rounded-lg shadow-md">
            <div className="flex items-center gap-4 mb-4">
              <Gift className="text-[#034EA2]" />
              <h2 className="text-[15px] md:text-[16px] font-bold text-[#034EA2]">
                Gift Cards
              </h2>
            </div>
            <p className="text-[#64748B] text-[14px] md:text-[15px]">
              Buy, sell, and redeem gift cards from leading global brands with ease. Enjoy secure transactions,
              competitive rates, and instant value for your digital assets.
            </p>
          </div>

        </div>

        {/* RIGHT COLUMN */}
        <div className="space-y-5 md:space-y-6 md:col-span-2 lg:col-span-1">

          {/* CARD 6 */}
          <div className="bg-white pb-10 md:pb-14 px-6 md:px-8 pt-8 md:pt-10 rounded-lg shadow-md">
            <div className="flex items-center gap-4 mb-4">
              <Landmark className="text-[#034EA2]" />
              <h2 className="text-[15px] md:text-[16px] font-bold text-[#034EA2]">
                Savings
              </h2>
            </div>
            <p className="text-[#64748B] text-[14px] md:text-[15px]">
              Grow your money with flexible savings plans designed to help you achieve your financial goals.
              Save consistently, earn rewards, and access your funds when needed.
            </p>
          </div>

          {/* CARD 7 */}
          <div className="bg-white pb-10 md:pb-14 px-6 md:px-8 pt-8 md:pt-10 rounded-lg shadow-md">
            <div className="flex items-center gap-4 mb-4">
              <Gem className="text-[#034EA2]" />
              <h2 className="text-[15px] md:text-[16px] font-bold text-[#034EA2]">
                Rewards
              </h2>
            </div>
            <p className="text-[#64748B] text-[14px] md:text-[15px]">
              Earn points, cashback, and exclusive benefits every time you use the app. Get rewarded for your
              transactions and enjoy more value from your everyday financial activities.
            </p>
          </div>

          {/* CARD 8 */}
          <div className="bg-white pb-10 md:pb-14 px-6 md:px-8 pt-8 md:pt-10 rounded-lg shadow-md">
            <div className="flex items-center gap-4 mb-4">
              <CreditCard className="text-[#034EA2]" />
              <h2 className="text-[15px] md:text-[16px] font-bold text-[#034EA2]">
                Cards
              </h2>
            </div>
            <p className="text-[#64748B] text-[14px] md:text-[15px]">
              Make secure payments online and in-store with virtual and physical cards. Enjoy convenient spending,
              enhanced security, and complete control over your card transactions.
            </p>
          </div>

        </div>

      </div>
    </main>
  );
}