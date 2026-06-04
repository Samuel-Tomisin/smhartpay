"use client"

import { div } from "framer-motion/client";


export default function Navbar () {
    return (
        <div className="flex justify-between items-center px-20 py-3">
            <img src="./images/logo.png" alt="SmhartPay Logo" className="w-15 h-15" />
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-7">
                <p>Home</p>
                <p>Features</p>
                <p>Pricing</p>
                <p>Help Centre</p>
                <p>Blog</p>
                <p>Company</p>
                </div>
            <div>
                <button className="cursor-pointer p-4 bg-blue-800 ml-7 rounded-full">Download SmhartPay</button>
            </div>
            </div>
        </div>
    );
}