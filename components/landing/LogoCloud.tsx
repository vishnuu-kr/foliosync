"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Twitter, Dribbble, Codepen, Hexagon, Component, TerminalSquare, Rss, Hash } from "lucide-react";

const platforms = [
  { name: "GitHub", icon: <Github className="w-5 h-5" /> },
  { name: "LinkedIn", icon: <Linkedin className="w-5 h-5" /> },
  { name: "Twitter / X", icon: <Twitter className="w-5 h-5" /> },
  { name: "Dev.to", icon: <TerminalSquare className="w-5 h-5" /> },
  { name: "Medium", icon: <Rss className="w-5 h-5" /> },
  { name: "Dribbble", icon: <Dribbble className="w-5 h-5" /> },
  { name: "Behance", icon: <Component className="w-5 h-5" /> },
  { name: "Hashnode", icon: <Hash className="w-5 h-5" /> },
  { name: "Stack Overflow", icon: <Hexagon className="w-5 h-5" /> },
  { name: "CodePen", icon: <Codepen className="w-5 h-5" /> },
];

export function LogoCloud() {
  const doubled = [...platforms, ...platforms];

  return (
    <section className="relative py-24 overflow-hidden border-y border-[rgba(255,255,255,0.06)] bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto px-6 mb-12 relative z-10">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
          className="text-center text-[13px] font-medium text-zinc-500 uppercase tracking-widest"
        >
          Supported platforms and integrations
        </motion.p>
      </div>

      <div className="relative overflow-hidden w-full flex py-4">
        <div className="absolute left-0 top-0 bottom-0 w-32 md:w-64 bg-gradient-to-r from-[#0A0A0A] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 md:w-64 bg-gradient-to-l from-[#0A0A0A] to-transparent z-10 pointer-events-none" />

        <div className="flex animate-marquee gap-8 md:gap-12 relative z-0 items-center">
          {doubled.map((platform, i) => (
            <div
              key={`${platform.name}-${i}`}
              className="flex items-center gap-3 shrink-0 group px-5 py-3 rounded-[20px] bg-[#121212] border border-white/[0.04] hover:bg-[#18181B] hover:border-white/[0.08] transition-all duration-300"
            >
              <div className="text-zinc-500 group-hover:text-zinc-300 transition-colors duration-300 flex items-center justify-center">
                {platform.icon}
              </div>
              <span className="text-zinc-400 group-hover:text-white text-[15px] font-semibold tracking-tight whitespace-nowrap transition-colors duration-300">
                {platform.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
