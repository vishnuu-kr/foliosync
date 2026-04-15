"use client";

import { motion } from "framer-motion";
import { ArrowRight, Play, Github, Linkedin, Twitter } from "lucide-react";
import Link from "next/link";

export function Hero() {
  return (
    <section className="relative min-h-[100dvh] flex flex-col items-center justify-center pt-32 pb-32 overflow-hidden bg-[#000000]">
      {/* Subtle Structural Background */}
      <div className="absolute inset-0 dot-grid opacity-30 radial-mask pointer-events-none" />

      {/* Colorful Subtle Glow (iOS style mesh) */}
      <div className="absolute top-[20%] left-[20%] w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[20%] w-[400px] h-[400px] bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 text-center pt-10">
        {/* Release Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
          className="mx-auto w-fit"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[13px] font-medium text-blue-400 bg-blue-500/10 border border-blue-500/20 mb-8">
            <span className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(10,132,255,0.8)]" />
            <span>FolioSync 1.0</span>
          </div>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 1, 0.5, 1] }}
          className="text-4xl sm:text-6xl md:text-7xl lg:text-[88px] font-semibold tracking-[-0.04em] leading-[1.1] sm:leading-[1.05] mb-8 text-white max-w-5xl mx-auto break-words"
        >
          Your professional identity,{" "}
          <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
            assembled instantly.
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 1, 0.5, 1] }}
          className="text-[17px] sm:text-[19px] text-[#A1A1AA] max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          Connect your GitHub or LinkedIn. We automatically extract your work, generate 
          a clean portfolio, and keep it in sync. No dragging and dropping required.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 1, 0.5, 1] }}
          className="flex flex-col items-center gap-6 mb-24"
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
            <Link
              href="/steps/connect"
              className="btn-primary w-full sm:w-auto px-8 py-3.5 text-[16px] group"
            >
              Start for free
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
            <button className="btn-secondary w-full sm:w-auto px-6 py-3.5 group text-[16px]">
              <Play className="w-4 h-4 mr-2 fill-current opacity-80 group-hover:text-blue-400 group-hover:opacity-100 transition-all" />
              Watch Demo
            </button>
          </div>
        </motion.div>

        {/* Hero Visual - Cinematic Browser Mockup */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.4, ease: [0.25, 1, 0.5, 1] }}
          className="relative max-w-5xl mx-auto"
        >
          {/* Subtle Glow behind mockup */}
          <div className="absolute inset-x-[10%] -top-4 bottom-10 bg-blue-500/10 blur-[80px] rounded-[32px] pointer-events-none" />

          {/* iOS Window */}
          <div className="relative rounded-[32px] border border-[rgba(255,255,255,0.08)] bg-[#0A0A0A] overflow-hidden shadow-ios-lg">
            {/* Top highlight line */}
            <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-white/[0.15] to-transparent" />

            {/* Browser chrome */}
            <div className="flex items-center gap-2 sm:gap-4 px-4 sm:px-6 py-4 border-b border-[rgba(255,255,255,0.04)] bg-[#121212]">
              <div className="flex items-center gap-1.5 sm:gap-2 min-w-fit">
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#FF453A] border border-white/[0.05]" />
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#FF9F0A] border border-white/[0.05]" />
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#32D74B] border border-white/[0.05]" />
              </div>
              <div className="flex-1 flex justify-center min-w-0">
                <div className="flex items-center justify-center gap-2 px-3 sm:px-8 py-[6px] rounded-[10px] bg-[#18181A] border border-white/[0.04] text-[11px] sm:text-[13px] text-zinc-400 font-medium truncate w-full max-w-[240px]">
                  john.foliosync.dev
                </div>
              </div>
              <div className="w-[38px] sm:w-[52px] hidden sm:block" />
            </div>

            {/* Portfolio content mockup */}
            <div className="p-8 md:p-14 text-left relative overflow-hidden bg-[#0A0A0A]">
              <div className="flex flex-col md:flex-row gap-12 relative z-10">
                {/* Left column */}
                <div className="flex-1 space-y-8">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 p-1 shadow-lg shadow-blue-500/20">
                     <div className="w-full h-full rounded-full bg-[#18181B] border border-white/[0.08]" />
                  </div>
                  
                  <div className="space-y-4">
                    <div className="h-8 w-3/4 max-w-[280px] rounded-lg bg-white/[0.08]" />
                    <div className="h-3 w-full max-w-[400px] rounded-full bg-white/[0.04]" />
                    <div className="h-3 w-5/6 max-w-[340px] rounded-full bg-white/[0.02]" />
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="ios-icon w-12 h-12 text-[#A1A1AA] hover:text-[#0A84FF] hover:bg-[#0A84FF]/10 transition-colors">
                      <Github className="w-5 h-5" />
                    </div>
                    <div className="ios-icon w-12 h-12 text-[#A1A1AA] hover:text-[#0A84FF] hover:bg-[#0A84FF]/10 transition-colors">
                      <Linkedin className="w-5 h-5" />
                    </div>
                    <div className="ios-icon w-12 h-12 text-[#A1A1AA] hover:text-[#0A84FF] hover:bg-[#0A84FF]/10 transition-colors">
                      <Twitter className="w-5 h-5" />
                    </div>
                  </div>
                </div>

                {/* Right column - project cards */}
                <div className="flex-[1.2] flex flex-col gap-4">
                  {[1, 2, 3].map((card, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 1.0 + (i * 0.1), ease: [0.25, 1, 0.5, 1] }}
                      className={`h-28 w-full ios-card p-6 flex flex-col justify-between`}
                    >
                      <div className="flex justify-between items-center mb-4">
                         <div className="w-2/3 h-4 rounded-md bg-white/[0.08]" />
                         <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center">
                            <span className="block w-2 h-2 rounded-full bg-blue-500" />
                         </div>
                      </div>
                      <div className="w-full h-2 rounded-full bg-white/[0.03] mt-auto" />
                      <div className="w-4/5 h-2 rounded-full bg-white/[0.03] mt-3" />
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
            {/* Bottom highlight */}
            <div className="absolute bottom-0 inset-x-0 h-[100px] bg-gradient-to-t from-[#0A0A0A] to-transparent pointer-events-none" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
