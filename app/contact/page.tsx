"use client"

import React from "react";
import Footer from "@/Components/layout/footer";
import Navbar from "@/Components/layout/Navbar";
import FAQs from "@/Components/sections/FAQAccordion";

export default function Contact() {
    return (
        <div>
            <Navbar />
            <div className="flex justify-center">
                <h1>Contact Us</h1>
                <p>Talk to us today, we’d love to hear from you.</p>
                <img src="./images/contact.svg" alt="Contact illustration" />
            </div>
            <FAQs />
            <Footer />
        </div>
    );
}