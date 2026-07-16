"use client"

import Footer from "@/Components/layout/footer";
import Navbar from "@/Components/layout/Navbar";
import CTASection from "@/Components/sections/CTASection";
import Features from "@/Components/sections/FeatureCard";
import Hero from "@/Components/sections/hero";
import Mobile from "@/Components/sections/MobileMenu";
import Mobile2 from "@/Components/sections/MobileMenu2";
import Getstarted from "@/Components/sections/StatsSection";
import FAQs from "./faqs/page";
import Testimonials from "@/Components/sections/TestimonialCard";



export default function Home () {
    return (
        <div>
            <Navbar/>
            <div className="bg-white">
            <Hero/>
            <Features/>
            </div>
            <div className="bg-brand-500">
            <Getstarted/>
            </div>
            <div className="bg-white">
            <Mobile/>
            </div>
            <div className="bg-white">
            <Mobile2/>
            </div>
            <div className="bg-brand">
            <CTASection/>
            </div>
            <Testimonials/>
            <div className="bg-white">
            <FAQs/>
            </div>
            <div className="bg-[#FAFAF9]">
            <Footer/>
            </div>
        </div>
    );
}