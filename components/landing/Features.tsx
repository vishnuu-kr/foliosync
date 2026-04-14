"use client";

import { motion } from "framer-motion";
import {
  FileText,
  RefreshCw,
  Layout,
  Globe,
  BarChart,
  Code2,
  Lock,
  Search,
} from "lucide-react";

const features = [
  {
    icon: FileText,
    title: "Automated Resumes",
    description: "Converts your GitHub commits and LinkedIn history into professional summaries.",
    span: "md:col-span-2",
    color: "text-[#0A84FF]",
    bg: "bg-[#0A84FF]/10",
    border: "border-[#0A84FF]/20"
  },
  {
    icon: RefreshCw,
    title: "Background Sync",
    description: "Updates automatically when you push new code or change jobs.",
    span: "md:col-span-1",
    color: "text-[#32D74B]",
    bg: "bg-[#32D74B]/10",
    border: "border-[#32D74B]/20"
  },
  {
    icon: Layout,
    title: "Clean Templates",
    description: "Multiple layout options designed with restraint and proper typography.",
    span: "md:col-span-1",
    color: "text-[#BF5AF2]",
    bg: "bg-[#BF5AF2]/10",
    border: "border-[#BF5AF2]/20"
  },
  {
    icon: Globe,
    title: "Custom Domains",
    description: "Connect your own domain with automatic SSL provisioning.",
    span: "md:col-span-1",
    color: "text-[#FF9F0A]",
    bg: "bg-[#FF9F0A]/10",
    border: "border-[#FF9F0A]/20"
  },
  {
    icon: Code2,
    title: "Project Curation",
    description: "Automatically surfaces repositories with the highest impact and stars.",
    span: "md:col-span-1",
    color: "text-[#FF375F]",
    bg: "bg-[#FF375F]/10",
    border: "border-[#FF375F]/20"
  },
  {
    icon: Search,
    title: "SEO Ready",
    description: "Server-side rendering, meta tags, and semantic HTML built-in.",
    span: "md:col-span-1",
    color: "text-[#64D2FF]",
    bg: "bg-[#64D2FF]/10",
    border: "border-[#64D2FF]/20"
  },
  {
    icon: BarChart,
    title: "Traffic Analytics",
    description: "Privacy-friendly analytics to see visitor counts and project interest.",
    span: "md:col-span-2",
    color: "text-[#5E5CE6]",
    bg: "bg-[#5E5CE6]/10",
    border: "border-[#5E5CE6]/20"
  },
  {
    icon: Lock,
    title: "Privacy Controls",
    description: "Hide specific repositories, toggle sections, and control exactly what gets public visibility.",
    span: "md:col-span-3",
    color: "text-[#FF453A]",
    bg: "bg-[#FF453A]/10",
    border: "border-[#FF453A]/20"
  },
];

export function Features() {
  return (
    <section id="features" className="relative py-24 overflow-hidden bg-[#000000]">
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <div className="section-badge mb-6">Features</div>
          <h2 className="text-4xl md:text-5xl font-semibold text-white mb-6 tracking-tight leading-tight">
            Everything you need.
            <br className="hidden sm:block" />
            <span className="text-zinc-500">Nothing you don&apos;t.</span>
          </h2>
          <p className="text-lg text-zinc-400 max-w-xl mx-auto font-medium leading-relaxed">
            A comprehensive set of tools focused on reliability and presentation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, i) => (
             <motion.div
             key={feature.title}
             initial={{ opacity: 0, y: 15 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true, margin: "-50px" }}
             transition={{ duration: 0.5, delay: i * 0.05, ease: [0.25, 1, 0.5, 1] }}
             className={`ios-card p-8 md:p-10 flex flex-col ${feature.span}`}
           >
             <div className={`w-12 h-12 rounded-xl border flex items-center justify-center mb-8 ${feature.bg} ${feature.border}`}>
               <feature.icon className={`w-5 h-5 ${feature.color}`} />
             </div>

             <div className="mt-auto w-full">
               <h3 className="text-[20px] font-semibold text-white mb-2 tracking-tight">
                 {feature.title}
               </h3>
               <p className="text-[15px] text-zinc-400 leading-relaxed">
                 {feature.description}
               </p>
             </div>
           </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
