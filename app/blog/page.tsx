"use client";

import Footer from "@/Components/layout/footer";
import Navbar from "@/Components/layout/Navbar";
import { useState } from "react";

// ─────────────────────────────────────────────────────────────────
// BLOG POSTS — add new posts here
// ─────────────────────────────────────────────────────────────────
const blogPosts = [
  {
    id: 1,
    date: "May 12, 2026",
    title: "Shared Infrastructure in Nigeria's Financial Services — and How SmhartPay Helps Build the Future",
    excerpt:
      "Shared infrastructure powers Nigeria's digital finance revolution, making financial services faster and more seamless.",
    tag: "#FinTech",
    readTime: "5 min read",
    author: {
      name: "Amara Okonkwo",
      avatar: "https://i.pravatar.cc/150?img=47",
    },
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=700&q=80",
    href: "/blog/shared-infrastructure-nigeria",
  },
  {
    id: 2,
    date: "April 28, 2026",
    title: "How to Save Smarter with SmhartPay's Goal-Based Savings Feature",
    excerpt:
      "Discover how SmhartPay's savings plans help you build better financial habits and reach your goals faster.",
    tag: "#Savings",
    readTime: "4 min read",
    author: {
      name: "Tunde Adeyemi",
      avatar: "https://i.pravatar.cc/150?img=12",
    },
    image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=700&q=80",
    href: "/blog/smarter-savings",
  },
  {
    id: 3,
    date: "April 10, 2026",
    title: "Virtual Cards Explained: How SmhartPay Keeps Your Online Payments Secure",
    excerpt:
      "Virtual cards offer a safer way to shop online. Learn how SmhartPay virtual cards protect your transactions.",
    tag: "#VirtualCards",
    readTime: "6 min read",
    author: {
      name: "Chisom Eze",
      avatar: "https://i.pravatar.cc/150?img=32",
    },
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=700&q=80",
    href: "/blog/virtual-cards-explained",
  },
  {
    id: 4,
    date: "March 22, 2026",
    title: "Understanding VTU: Buy Airtime & Data Seamlessly on SmhartPay",
    excerpt:
      "No more running out of data mid-work. SmhartPay makes buying airtime and data bills faster than ever.",
    tag: "#VTU",
    readTime: "3 min read",
    author: {
      name: "Seun Balogun",
      avatar: "https://i.pravatar.cc/150?img=25",
    },
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=700&q=80",
    href: "/blog/vtu-airtime-data",
  },
  {
    id: 5,
    date: "March 5, 2026",
    title: "Earn While You Spend: SmhartPay Rewards and Cashback Benefits",
    excerpt:
      "SmhartPay rewards every qualifying transaction. Here's how to maximise your cashback and referral bonuses.",
    tag: "#Rewards",
    readTime: "4 min read",
    author: {
      name: "Ngozi Ihejirika",
      avatar: "https://i.pravatar.cc/150?img=56",
    },
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=700&q=80",
    href: "/blog/rewards-cashback",
  },

  // ── ADD A NEW BLOG POST BELOW ─────────────────────────────────
  // {
  //   id: 6,
  //   date: "June 1, 2026",
  //   title: "Your Blog Post Title Here",
  //   excerpt: "A short description of what the post is about...",
  //   tag: "#YourTag",
  //   readTime: "X min read",
  //   author: {
  //     name: "Author Name",
  //     avatar: "https://i.pravatar.cc/150?img=1",
  //   },
  //   image: "https://your-image-url.com/image.jpg",
  //   href: "/blog/your-post-slug",
  // },
];

// ─────────────────────────────────────────────────────────────────
// Search icon
// ─────────────────────────────────────────────────────────────────
function SearchIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16" height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-gray-400 flex-shrink-0"
    >
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────────
// Single blog post card (featured horizontal layout)
// ─────────────────────────────────────────────────────────────────
function BlogCard({ post }: { post: typeof blogPosts[0] }) {
  return (
    <article className="
      flex flex-col sm:flex-row gap-0
      border-b border-gray-100 pb-12 mb-12
      last:border-0 last:pb-0 last:mb-0
    ">
      {/* ── Thumbnail ── */}
      <a
        href={post.href}
        className="
          block w-full sm:w-[300px] md:w-[340px] lg:w-[380px]
          flex-shrink-0 rounded-2xl overflow-hidden
          bg-gray-100 aspect-[16/10] sm:aspect-auto
        "
      >
        <img
          src={post.image}
          alt={post.title}
          loading="lazy"
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
          style={{ minHeight: "200px" }}
        />
      </a>

      {/* ── Content ── */}
      <div className="flex flex-col justify-center pt-6 sm:pt-0 sm:pl-8 md:pl-10 lg:pl-12 flex-1 min-w-0">

        {/* Date */}
        <p className="text-[13px] sm:text-[14px] text-gray-400 mb-3">
          {post.date}
        </p>

        {/* Title */}
        <a href={post.href}>
          <h2 className="
            font-bold text-gray-900 leading-snug mb-4
            hover:text-[#034EA2] transition-colors duration-150
            text-[20px] sm:text-[22px] md:text-[24px] lg:text-[26px]
          ">
            {post.title}
          </h2>
        </a>

        {/* Excerpt with Continue Reading */}
        <p className="text-[14px] sm:text-[15px] text-gray-500 leading-relaxed mb-4">
          {post.excerpt}{" "}
          <a
            href={post.href}
            className="font-bold text-[#034EA2] hover:underline whitespace-nowrap"
          >
            Continue Reading
          </a>
        </p>

        {/* Tag + read time */}
        <div className="flex items-center gap-4 mb-5">
          <span className="
            text-[12px] sm:text-[13px] text-gray-600 font-medium
            bg-gray-100 px-3 py-1 rounded-full
          ">
            {post.tag}
          </span>
          <span className="text-[13px] sm:text-[14px] text-gray-500 font-medium">
            {post.readTime}
          </span>
        </div>

        {/* Author */}
        <div className="flex items-center gap-3">
          <img
            src={post.author.avatar}
            alt={post.author.name}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full object-cover flex-shrink-0"
            loading="lazy"
          />
          <span className="text-[13px] sm:text-[14px] font-medium text-gray-700">
            {post.author.name}
          </span>
        </div>

      </div>
    </article>
  );
}

// ─────────────────────────────────────────────────────────────────
// Main Blog Page
// ─────────────────────────────────────────────────────────────────
export default function Blog() {
  const [search, setSearch] = useState("");

  const filtered = blogPosts.filter(
    (post) =>
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(search.toLowerCase()) ||
      post.tag.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
        <Navbar/>
    <div className="bg-white min-h-screen">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 md:px-10 py-14 sm:py-16 md:py-20">

        {/* ── Top row: title + search ── */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 mb-12 sm:mb-14">

          {/* Page title */}
          <h1 className="
            font-bold text-gray-900
            text-[36px] sm:text-[42px] md:text-[48px] lg:text-[52px]
          ">
            Blog
          </h1>

          {/* Search bar */}
          <div className="
            flex items-center gap-2 border border-gray-200 rounded-xl
            px-4 py-2.5 bg-white
            w-full sm:w-[220px] md:w-[260px] lg:w-[300px]
            focus-within:border-gray-400 focus-within:shadow-sm
            transition-all duration-200
          ">
            <input
              type="text"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 bg-transparent text-[14px] text-gray-700 placeholder:text-gray-400 outline-none"
            />
            <SearchIcon />
          </div>
        </div>

        {/* ── Divider ── */}
        <div className="border-t border-gray-100 mb-12 sm:mb-14" />

        {/* ── Blog posts ── */}
        {filtered.length > 0 ? (
          <div>
            {filtered.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-gray-400 text-[15px]">
              No posts found for{" "}
              <span className="font-semibold text-gray-600">"{search}"</span>
            </p>
            <button
              onClick={() => setSearch("")}
              className="mt-4 text-[#034EA2] text-[14px] font-medium hover:underline"
            >
              Clear search
            </button>
          </div>
        )}

      </div>
    </div>
    <Footer />
    </div>
  );
}