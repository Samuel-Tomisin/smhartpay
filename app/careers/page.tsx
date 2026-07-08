"use client";

import { useState } from "react";
import {
  MapPin,
  Clock,
  Briefcase,
  ArrowRight,
  ChevronDown,
  Users,
  TrendingUp,
  Heart,
  Globe,
  Zap,
  Shield,
  Star,
  Search,
  X,
} from "lucide-react";
import Navbar from "@/Components/layout/Navbar";
import Footer from "@/Components/layout/footer";
import Footer2 from "@/Components/layout/footer2";

// ── Types ──────────────────────────────────────────────────────────────────
interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  type: "Full-time" | "Part-time" | "Contract" | "Remote";
  level: "Junior" | "Mid-level" | "Senior" | "Lead";
  description: string;
  responsibilities: string[];
  requirements: string[];
  posted: string;
}

interface Perk {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface Value {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface Stat {
  value: string;
  label: string;
}

// ── Data ──────────────────────────────────────────────────────────────────
const JOBS: Job[] = [
  {
    id: "1",
    title: "Senior Frontend Engineer",
    department: "Engineering",
    location: "Lagos, Nigeria",
    type: "Full-time",
    level: "Senior",
    description: "Build and maintain the user-facing features of SmhartPay's web and mobile platforms with a focus on performance, accessibility, and delight.",
    responsibilities: [
      "Architect and build scalable React/Next.js applications",
      "Collaborate with design and product to ship polished user experiences",
      "Mentor junior engineers and lead code reviews",
      "Optimize for performance and accessibility across devices",
    ],
    requirements: [
      "5+ years of experience with React and TypeScript",
      "Strong understanding of web performance optimization",
      "Experience with Tailwind CSS and modern build tools",
      "Excellent communication and collaboration skills",
    ],
    posted: "2 days ago",
  },
  {
    id: "2",
    title: "Backend Engineer (Node.js)",
    department: "Engineering",
    location: "Lagos, Nigeria",
    type: "Full-time",
    level: "Mid-level",
    description: "Design and build robust APIs and microservices that power SmhartPay's financial infrastructure.",
    responsibilities: [
      "Build and maintain RESTful APIs and microservices",
      "Integrate with banking partners and payment processors",
      "Ensure high availability and fault tolerance",
      "Write comprehensive unit and integration tests",
    ],
    requirements: [
      "3+ years with Node.js and TypeScript",
      "Experience with PostgreSQL and Redis",
      "Familiarity with fintech compliance requirements",
      "Understanding of event-driven architecture",
    ],
    posted: "3 days ago",
  },
  {
    id: "3",
    title: "Product Designer (UX/UI)",
    department: "Design",
    location: "Remote",
    type: "Full-time",
    level: "Mid-level",
    description: "Shape the experience of millions of users by designing intuitive, beautiful interfaces for SmhartPay's products.",
    responsibilities: [
      "Lead end-to-end design for new features and products",
      "Conduct user research and usability testing",
      "Create wireframes, prototypes, and high-fidelity mockups",
      "Maintain and evolve the SmhartPay design system",
    ],
    requirements: [
      "3+ years of product design experience",
      "Proficiency in Figma and prototyping tools",
      "Portfolio demonstrating strong visual and UX thinking",
      "Experience designing for mobile-first applications",
    ],
    posted: "1 week ago",
  },
  {
    id: "4",
    title: "Compliance & Risk Officer",
    department: "Legal & Compliance",
    location: "Lagos, Nigeria",
    type: "Full-time",
    level: "Senior",
    description: "Ensure SmhartPay operates within regulatory frameworks while enabling the business to grow responsibly.",
    responsibilities: [
      "Monitor and ensure compliance with CBN and NDIC regulations",
      "Develop and maintain AML/KYC policies and procedures",
      "Conduct risk assessments and compliance audits",
      "Liaise with regulators and external auditors",
    ],
    requirements: [
      "5+ years in compliance, legal, or risk roles in fintech/banking",
      "Deep knowledge of Nigerian financial regulations",
      "Professional certification (CAMS, ACAMS, or equivalent)",
      "Strong analytical and written communication skills",
    ],
    posted: "4 days ago",
  },
  {
    id: "5",
    title: "Growth Marketing Manager",
    department: "Marketing",
    location: "Lagos, Nigeria",
    type: "Full-time",
    level: "Mid-level",
    description: "Drive user acquisition, activation, and retention through data-driven marketing strategies across channels.",
    responsibilities: [
      "Own growth metrics across acquisition and retention funnels",
      "Plan and execute digital marketing campaigns",
      "Collaborate with product on in-app growth experiments",
      "Analyze performance data and report on KPIs",
    ],
    requirements: [
      "4+ years in growth or digital marketing",
      "Hands-on experience with paid social, SEO, and email",
      "Strong analytical mindset with proficiency in analytics tools",
      "Experience in fintech or financial services is a plus",
    ],
    posted: "5 days ago",
  },
  {
    id: "6",
    title: "Customer Success Lead",
    department: "Customer Experience",
    location: "Lagos, Nigeria",
    type: "Full-time",
    level: "Lead",
    description: "Champion our customers by leading a team dedicated to delivering exceptional support and driving satisfaction.",
    responsibilities: [
      "Lead and coach a team of customer support agents",
      "Define and track customer satisfaction metrics (CSAT, NPS)",
      "Build escalation processes and knowledge base content",
      "Collaborate with product to close feedback loops",
    ],
    requirements: [
      "4+ years in customer success or support, 1+ in a leadership role",
      "Experience with Zendesk or similar support platforms",
      "Strong empathy and conflict-resolution skills",
      "Passion for customer experience in financial services",
    ],
    posted: "1 week ago",
  },
  {
    id: "7",
    title: "Data Analyst",
    department: "Data & Analytics",
    location: "Remote",
    type: "Full-time",
    level: "Junior",
    description: "Turn SmhartPay's data into insights that inform product decisions, business strategy, and customer outcomes.",
    responsibilities: [
      "Build dashboards and reports for key business metrics",
      "Analyze user behavior and transaction data",
      "Support A/B testing and product experiments",
      "Partner with engineering to improve data pipelines",
    ],
    requirements: [
      "2+ years of experience in data analysis",
      "Proficiency in SQL and one BI tool (Tableau, Looker, Power BI)",
      "Familiarity with Python or R is a plus",
      "Strong ability to communicate insights to non-technical stakeholders",
    ],
    posted: "2 weeks ago",
  },
  {
    id: "8",
    title: "DevOps / Cloud Engineer",
    department: "Engineering",
    location: "Remote",
    type: "Full-time",
    level: "Senior",
    description: "Build and maintain the cloud infrastructure that keeps SmhartPay fast, secure, and always available.",
    responsibilities: [
      "Manage AWS/GCP infrastructure using Terraform and Kubernetes",
      "Implement CI/CD pipelines and developer tooling",
      "Monitor system reliability and drive incident response",
      "Enforce security best practices across the stack",
    ],
    requirements: [
      "4+ years in DevOps or cloud engineering",
      "Strong expertise in AWS or GCP",
      "Experience with Docker, Kubernetes, and Terraform",
      "Knowledge of security and compliance in cloud environments",
    ],
    posted: "3 days ago",
  },
];

const DEPARTMENTS = ["All", "Engineering", "Design", "Legal & Compliance", "Marketing", "Customer Experience", "Data & Analytics"];
const LOCATIONS   = ["All Locations", "Lagos, Nigeria", "Remote"];
const LEVELS      = ["All Levels", "Junior", "Mid-level", "Senior", "Lead"];

const PERKS: Perk[] = [
  { icon: <Heart size={22} />,      title: "Health & Wellness",     description: "Comprehensive HMO coverage for you and your dependants, plus gym allowance." },
  { icon: <TrendingUp size={22} />, title: "Equity & Growth",       description: "Competitive salary, employee stock options, and clear career progression paths." },
  { icon: <Globe size={22} />,      title: "Flexible Work",         description: "Hybrid and remote-friendly culture. Work where you do your best thinking." },
  { icon: <Zap size={22} />,        title: "Learning Budget",       description: "₦200,000 annual learning allowance for courses, conferences, and books." },
  { icon: <Users size={22} />,      title: "Team Retreats",         description: "Annual company retreat and quarterly team offsites to connect and recharge." },
  { icon: <Shield size={22} />,     title: "Parental Leave",        description: "Generous maternity and paternity leave to support your growing family." },
];

const VALUES: Value[] = [
  { icon: <Star size={20} />,       title: "Excellence",   description: "We hold ourselves to the highest standards in everything we ship." },
  { icon: <Users size={20} />,      title: "Collaboration",description: "Great outcomes come from diverse teams working together with trust." },
  { icon: <Shield size={20} />,     title: "Integrity",    description: "We do the right thing — even when no one is watching." },
  { icon: <Zap size={20} />,        title: "Speed",        description: "We move fast, learn fast, and iterate with urgency and purpose." },
];

const STATS: Stat[] = [
  { value: "120+",  label: "Team Members" },
  { value: "14",    label: "Nationalities" },
  { value: "4.8★",  label: "Glassdoor Rating" },
  { value: "92%",   label: "Retention Rate" },
];

const TYPE_COLORS: Record<string, string> = {
  "Full-time": "bg-emerald-50 text-emerald-700",
  "Part-time": "bg-amber-50 text-amber-700",
  "Contract":  "bg-purple-50 text-purple-700",
  "Remote":    "bg-blue-50 text-blue-700",
};

const LEVEL_COLORS: Record<string, string> = {
  "Junior":    "bg-gray-100 text-gray-600",
  "Mid-level": "bg-[#EEF4FF] text-[#034EA2]",
  "Senior":    "bg-indigo-50 text-indigo-700",
  "Lead":      "bg-orange-50 text-orange-700",
};

// ── Job Card ───────────────────────────────────────────────────────────────
function JobCard({ job, onClick }: { job: Job; onClick: () => void }) {
  return (
    <div
      onClick={onClick}
      className="bg-white border border-gray-100 rounded-2xl p-5 sm:p-6 hover:shadow-md hover:border-[#034EA2]/20 transition-all duration-200 cursor-pointer group"
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div>
          <h3 className="text-[15px] sm:text-[16px] font-bold text-gray-900 group-hover:text-[#034EA2] transition-colors leading-tight">
            {job.title}
          </h3>
          <p className="text-[13px] text-[#7C8FB7] mt-0.5">{job.department}</p>
        </div>
        <ArrowRight size={16} className="text-gray-300 group-hover:text-[#034EA2] group-hover:translate-x-1 transition-all flex-shrink-0 mt-1" />
      </div>

      <p className="text-[13px] text-[#64748B] leading-relaxed mb-4 line-clamp-2">
        {job.description}
      </p>

      <div className="flex flex-wrap gap-2 items-center">
        <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${TYPE_COLORS[job.type]}`}>
          {job.type}
        </span>
        <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${LEVEL_COLORS[job.level]}`}>
          {job.level}
        </span>
        <div className="flex items-center gap-1 text-[12px] text-gray-400 ml-auto">
          <MapPin size={12} />
          {job.location}
        </div>
      </div>

      <div className="flex items-center gap-1 mt-3 text-[11px] text-gray-400">
        <Clock size={11} />
        Posted {job.posted}
      </div>
    </div>
  );
}

// ── Job Detail Modal ───────────────────────────────────────────────────────
function JobModal({ job, onClose }: { job: Job; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />

      {/* Panel */}
      <div className="relative bg-white w-full sm:max-w-2xl sm:rounded-2xl rounded-t-2xl max-h-[92vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-5 flex items-start justify-between gap-4 z-10">
          <div>
            <h2 className="text-[18px] font-bold text-gray-900">{job.title}</h2>
            <p className="text-[13px] text-[#7C8FB7] mt-0.5">{job.department}</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center flex-shrink-0 transition-colors cursor-pointer"
          >
            <X size={15} />
          </button>
        </div>

        <div className="px-6 py-6 flex flex-col gap-6">
          {/* Meta badges */}
          <div className="flex flex-wrap gap-2">
            <span className={`text-[11px] font-semibold px-3 py-1.5 rounded-full ${TYPE_COLORS[job.type]}`}>{job.type}</span>
            <span className={`text-[11px] font-semibold px-3 py-1.5 rounded-full ${LEVEL_COLORS[job.level]}`}>{job.level}</span>
            <span className="text-[11px] font-semibold px-3 py-1.5 rounded-full bg-gray-100 text-gray-600 flex items-center gap-1">
              <MapPin size={11} />{job.location}
            </span>
            <span className="text-[11px] font-semibold px-3 py-1.5 rounded-full bg-gray-100 text-gray-600 flex items-center gap-1">
              <Clock size={11} />Posted {job.posted}
            </span>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-[14px] font-bold text-gray-800 mb-2">About this Role</h3>
            <p className="text-[13px] text-[#64748B] leading-relaxed">{job.description}</p>
          </div>

          {/* Responsibilities */}
          <div>
            <h3 className="text-[14px] font-bold text-gray-800 mb-3">What You'll Do</h3>
            <ul className="flex flex-col gap-2">
              {job.responsibilities.map((r, i) => (
                <li key={i} className="flex items-start gap-2.5 text-[13px] text-[#64748B]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#034EA2] mt-1.5 flex-shrink-0" />
                  {r}
                </li>
              ))}
            </ul>
          </div>

          {/* Requirements */}
          <div>
            <h3 className="text-[14px] font-bold text-gray-800 mb-3">What We're Looking For</h3>
            <ul className="flex flex-col gap-2">
              {job.requirements.map((r, i) => (
                <li key={i} className="flex items-start gap-2.5 text-[13px] text-[#64748B]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#034EA2] mt-1.5 flex-shrink-0" />
                  {r}
                </li>
              ))}
            </ul>
          </div>

          {/* Apply CTA */}
          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            <a
              href={`mailto:careers@smhartpay.com?subject=Application: ${job.title}`}
              className="flex-1 bg-[#034EA2] hover:bg-[#023d82] text-white font-semibold py-3.5 rounded-xl text-[14px] flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              Apply for this Role <ArrowRight size={16} />
            </a>
            <button
              onClick={onClose}
              className="sm:w-auto px-6 py-3.5 rounded-xl border border-gray-200 text-[14px] font-semibold text-gray-600 hover:bg-gray-50 transition-colors cursor-pointer"
            >
              Back to Jobs
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Main Page ──────────────────────────────────────────────────────────────
export default function CareersPage() {
  const [search, setSearch]         = useState("");
  const [department, setDepartment] = useState("All");
  const [location, setLocation]     = useState("All Locations");
  const [level, setLevel]           = useState("All Levels");
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  const filtered = JOBS.filter((j) => {
    const matchSearch = j.title.toLowerCase().includes(search.toLowerCase()) ||
      j.department.toLowerCase().includes(search.toLowerCase());
    const matchDept   = department === "All" || j.department === department;
    const matchLoc    = location === "All Locations" || j.location === location;
    const matchLevel  = level === "All Levels" || j.level === level;
    return matchSearch && matchDept && matchLoc && matchLevel;
  });

  const clearFilters = () => {
    setSearch(""); setDepartment("All"); setLocation("All Locations"); setLevel("All Levels");
  };

  const hasFilters = search || department !== "All" || location !== "All Locations" || level !== "All Levels";

  return (
    <div>
        <Navbar/>
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500;600&display=swap"
        rel="stylesheet"
      />

      <div className="min-h-screen bg-[#F5F7FB]" style={{ fontFamily: "'DM Sans', sans-serif" }}>

        {/* ── Hero ── */}
        <section className="bg-white border-b border-gray-100 px-4 sm:px-6 md:px-10 lg:px-20 pt-14 pb-16 md:pt-20 md:pb-24">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-10">

              {/* Left: copy */}
              <div className="lg:max-w-[55%]">
                <span className="inline-flex items-center gap-2 bg-[#EEF4FF] text-[#034EA2] text-[12px] font-semibold px-3 py-1.5 rounded-full mb-5">
                  <Briefcase size={13} /> We're Hiring
                </span>
                <h1
                  className="text-[34px] sm:text-[44px] md:text-[52px] font-bold text-[#1A202E] leading-tight mb-5"
                  style={{ fontFamily: "'Syne', sans-serif" }}
                >
                  Build the Future of <span className="text-[#034EA2]">Banking</span> with Us
                </h1>
                <p className="text-[15px] sm:text-[17px] text-[#64748B] leading-relaxed max-w-xl">
                  Join a team of builders, designers, and problem-solvers on a mission to make financial services accessible,
                  seamless, and trustworthy for every Nigerian.
                </p>
                <div className="flex flex-wrap gap-3 mt-8">
                  <a
                    href="#open-roles"
                    className="bg-[#034EA2] hover:bg-[#023d82] text-white font-semibold px-6 py-3 rounded-xl text-[14px] flex items-center gap-2 transition-colors"
                  >
                    View Open Roles <ArrowRight size={16} />
                  </a>
                  <a
                    href="#our-values"
                    className="border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 font-semibold px-6 py-3 rounded-xl text-[14px] transition-colors"
                  >
                    Our Culture
                  </a>
                </div>
              </div>

              {/* Right: stats */}
              <div className="grid grid-cols-2 gap-4 lg:w-[340px]">
                {STATS.map(({ value, label }) => (
                  <div
                    key={label}
                    className="bg-[#F5F7FB] rounded-2xl p-5 flex flex-col"
                  >
                    <span className="text-[28px] font-bold text-[#034EA2]" style={{ fontFamily: "'Syne', sans-serif" }}>
                      {value}
                    </span>
                    <span className="text-[13px] text-[#64748B] mt-1">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Our Values ── */}
        <section id="our-values" className="px-4 sm:px-6 md:px-10 lg:px-20 py-14 md:py-20">
          <div className="max-w-6xl mx-auto">
            <div className="mb-10">
              <h2 className="text-[22px] sm:text-[26px] md:text-[30px] font-bold text-[#1A202E]" style={{ fontFamily: "'Syne', sans-serif" }}>
                What We Stand For
              </h2>
              <p className="text-[14px] sm:text-[15px] text-[#64748B] mt-2 max-w-lg">
                Our values aren't posters on a wall — they're the decisions we make every day.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {VALUES.map(({ icon, title, description }) => (
                <div key={title} className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-sm transition-shadow">
                  <div className="w-10 h-10 rounded-xl bg-[#EEF4FF] flex items-center justify-center text-[#034EA2] mb-4">
                    {icon}
                  </div>
                  <h3 className="text-[15px] font-bold text-gray-900 mb-2">{title}</h3>
                  <p className="text-[13px] text-[#64748B] leading-relaxed">{description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Perks & Benefits ── */}
        <section className="bg-[#034EA2] px-4 sm:px-6 md:px-10 lg:px-20 py-14 md:py-20">
          <div className="max-w-6xl mx-auto">
            <div className="mb-10">
              <h2 className="text-[22px] sm:text-[26px] md:text-[30px] font-bold text-white" style={{ fontFamily: "'Syne', sans-serif" }}>
                Perks & Benefits
              </h2>
              <p className="text-[14px] sm:text-[15px] text-blue-200 mt-2 max-w-lg">
                We invest in the people who build SmhartPay. Here's how we take care of our team.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {PERKS.map(({ icon, title, description }) => (
                <div key={title} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center text-white mb-4">
                    {icon}
                  </div>
                  <h3 className="text-[15px] font-bold text-white mb-2">{title}</h3>
                  <p className="text-[13px] text-blue-100 leading-relaxed">{description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Open Roles ── */}
        <section id="open-roles" className="px-4 sm:px-6 md:px-10 lg:px-20 py-14 md:py-20">
          <div className="max-w-6xl mx-auto">

            {/* Section heading */}
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
              <div>
                <h2 className="text-[22px] sm:text-[26px] md:text-[30px] font-bold text-[#1A202E]" style={{ fontFamily: "'Syne', sans-serif" }}>
                  Open Roles
                </h2>
                <p className="text-[14px] sm:text-[15px] text-[#64748B] mt-1">
                  {filtered.length} position{filtered.length !== 1 ? "s" : ""} available
                </p>
              </div>
              {hasFilters && (
                <button
                  onClick={clearFilters}
                  className="flex items-center gap-1.5 text-[13px] text-[#034EA2] font-medium hover:underline cursor-pointer self-start sm:self-auto"
                >
                  <X size={14} /> Clear filters
                </button>
              )}
            </div>

            {/* Search + filters */}
            <div className="bg-white rounded-2xl border border-gray-100 p-4 sm:p-5 mb-6 flex flex-col sm:flex-row gap-3">
              {/* Search */}
              <div className="relative flex-1">
                <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search roles or departments..."
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 text-[13px] text-gray-700 placeholder:text-gray-400 focus:outline-none focus:border-[#034EA2] focus:ring-2 focus:ring-[#034EA2]/10 transition-all"
                />
              </div>

              {/* Dropdowns */}
              <div className="flex flex-col xs:flex-row gap-3 sm:gap-2">
                {[
                  { value: department, onChange: setDepartment, options: DEPARTMENTS },
                  { value: location,   onChange: setLocation,   options: LOCATIONS },
                  { value: level,      onChange: setLevel,      options: LEVELS },
                ].map(({ value, onChange, options }) => (
                  <div key={options[0]} className="relative">
                    <select
                      value={value}
                      onChange={(e) => onChange(e.target.value)}
                      className="appearance-none bg-[#F5F7FB] border border-gray-200 rounded-xl pl-3 pr-8 py-2.5 text-[13px] text-gray-700 focus:outline-none focus:border-[#034EA2] transition-all cursor-pointer w-full sm:w-auto"
                    >
                      {options.map((o) => <option key={o}>{o}</option>)}
                    </select>
                    <ChevronDown size={13} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                  </div>
                ))}
              </div>
            </div>

            {/* Job grid */}
            {filtered.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filtered.map((job) => (
                  <JobCard key={job.id} job={job} onClick={() => setSelectedJob(job)} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-gray-100 py-16 flex flex-col items-center text-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[#EEF4FF] flex items-center justify-center text-[#034EA2] mb-1">
                  <Search size={20} />
                </div>
                <h3 className="text-[15px] font-semibold text-gray-800">No roles found</h3>
                <p className="text-[13px] text-[#64748B] max-w-xs">
                  Try adjusting your filters or search terms. New roles are added frequently.
                </p>
                <button
                  onClick={clearFilters}
                  className="mt-2 text-[13px] text-[#034EA2] font-medium hover:underline cursor-pointer"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </section>

        {/* ── Hiring Process ── */}
        <section className="bg-white border-t border-gray-100 px-4 sm:px-6 md:px-10 lg:px-20 py-14 md:py-20">
          <div className="max-w-6xl mx-auto">
            <div className="mb-10">
              <h2 className="text-[22px] sm:text-[26px] md:text-[30px] font-bold text-[#1A202E]" style={{ fontFamily: "'Syne', sans-serif" }}>
                Our Hiring Process
              </h2>
              <p className="text-[14px] sm:text-[15px] text-[#64748B] mt-2 max-w-lg">
                We keep things transparent, respectful of your time, and focused on real skills.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {[
                { step: "01", title: "Application",      desc: "Submit your CV and a short note about why you're excited about the role." },
                { step: "02", title: "Screening Call",   desc: "A 30-minute video call with our talent team to learn more about each other." },
                { step: "03", title: "Skills Assessment",desc: "A practical take-home or live exercise relevant to the role — usually 1–2 hours." },
                { step: "04", title: "Final Interview",  desc: "Meet the team and hiring manager. We'll cover values, experience, and answer your questions." },
              ].map(({ step, title, desc }) => (
                <div key={step} className="relative flex flex-col gap-4">
                  {/* Connector line (hidden on mobile) */}
                  <div className="hidden lg:block absolute top-5 left-[52px] right-0 h-px bg-gray-200 -z-0" />
                  <div className="flex items-center gap-3 z-10">
                    <div className="w-10 h-10 rounded-full bg-[#034EA2] flex items-center justify-center text-white text-[12px] font-bold flex-shrink-0">
                      {step}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-[14px] font-bold text-gray-900 mb-1">{title}</h3>
                    <p className="text-[13px] text-[#64748B] leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Open Application CTA ── */}
        <section className="px-4 sm:px-6 md:px-10 lg:px-20 py-14 md:py-20">
          <div className="max-w-6xl mx-auto">
            <div className="bg-[#1A202E] rounded-2xl px-6 sm:px-10 py-10 sm:py-12 flex flex-col sm:flex-row items-center justify-between gap-8">
              <div className="text-center sm:text-left">
                <h2 className="text-[20px] sm:text-[24px] font-bold text-white mb-2" style={{ fontFamily: "'Syne', sans-serif" }}>
                  Don't see the right role?
                </h2>
                <p className="text-[14px] text-gray-400 max-w-md">
                  We're always looking for exceptional talent. Send us your CV and we'll reach out when something matches.
                </p>
              </div>
              <a
                href="mailto:careers@smhartpay.com?subject=Open Application"
                className="flex-shrink-0 bg-[#034EA2] hover:bg-[#023d82] text-white font-semibold px-7 py-3.5 rounded-xl text-[14px] flex items-center gap-2 transition-colors whitespace-nowrap"
              >
                Send Open Application <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </section>

      </div>

      {/* ── Job Detail Modal ── */}
      {selectedJob && (
        <JobModal job={selectedJob} onClose={() => setSelectedJob(null)} />
      )}
    </>
    <Footer/>
    </div>
  );
}