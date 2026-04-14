"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const themes = [
  {
    id: "minimal",
    name: "Minimal",
    description: "Standard system typography. Zero distractions.",
    glow: "bg-[#0A84FF]",     // iOS Blue
  },
  {
    id: "bold",
    name: "Bold",
    description: "Heavy weights and stark contrast.",
    glow: "bg-[#FF375F]",     // iOS Pink
  },
  {
    id: "creative",
    name: "Creative",
    description: "Expressive serif fonts and soft colors.",
    glow: "bg-[#FF9F0A]",     // iOS Orange
  },
  {
    id: "developer",
    name: "Developer",
    description: "Monospace code block aesthetic.",
    glow: "bg-[#32D74B]",     // iOS Green
  },
];

export function Showcase() {
  const [active, setActive] = useState("minimal");
  const activeTheme = themes.find((t) => t.id === active)!;

  return (
    <section id="showcase" className="relative py-24 overflow-hidden bg-[#000000]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="section-badge mb-6">
            Templates
          </div>
          <h2 className="text-4xl md:text-5xl font-semibold text-white mb-6 tracking-tight">
            Design systems.
          </h2>
          <p className="text-lg text-zinc-400 max-w-xl mx-auto font-medium leading-relaxed">
            Beautifully crafted starting blocks. Easily switch bases instantly.
          </p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex justify-center mb-16 relative z-20"
        >
          <div className="ios-segmented">
            {themes.map((theme) => (
              <button
                key={theme.id}
                onClick={() => setActive(theme.id)}
                className={`relative ${active === theme.id ? "active" : ""}`}
              >
                <span className="relative z-10">{theme.name}</span>
              </button>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 1, 0.5, 1] }}
          className="relative max-w-5xl mx-auto z-10"
        >
          {/* Animated Glow behind mockup based on active theme */}
          <div className="absolute inset-[-10%] flex items-center justify-center pointer-events-none z-[-1]">
             <div className={`w-[60%] h-[60%] rounded-[100%] blur-[120px] opacity-10 transition-colors duration-700 ${activeTheme.glow}`} />
          </div>

          <div className="relative rounded-[32px] border border-[rgba(255,255,255,0.08)] bg-[#0A0A0A] overflow-hidden shadow-ios-lg">
            {/* Browser chrome */}
            <div className="flex items-center gap-2 sm:gap-4 px-4 sm:px-6 py-4 border-b border-[rgba(255,255,255,0.04)] bg-[#121212]">
              <div className="flex items-center gap-1.5 sm:gap-2 min-w-fit">
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#FF453A] border border-white/[0.05]" />
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#FF9F0A] border border-white/[0.05]" />
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#32D74B] border border-white/[0.05]" />
              </div>
              <div className="flex-1 flex justify-center min-w-0">
                <div className="flex items-center justify-center gap-2 px-3 sm:px-8 py-[6px] rounded-[10px] bg-[#18181A] border border-white/[0.04] text-[11px] sm:text-[13px] text-zinc-400 font-medium transition-colors duration-500 truncate w-full max-w-[240px]">
                   {active}.foliosync.dev
                </div>
              </div>
              <div className="w-[38px] sm:w-[52px] hidden sm:block" />
            </div>

            <div className="relative min-h-[500px] overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, scale: 0.98, filter: "blur(4px)" }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, scale: 1.02, filter: "blur(4px)" }}
                  transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
                  className="absolute inset-0 p-8 md:p-16 flex items-center justify-center bg-[#0A0A0A]"
                >
                  {/* Minimal Theme Preview */}
                  {active === "minimal" && (
                    <div className="space-y-8 max-w-2xl w-full">
                      <div className="w-16 h-16 rounded-full bg-[#0A84FF] shadow-[0_0_20px_rgba(10,132,255,0.4)]" />
                      <div>
                        <h3 className="text-4xl md:text-[52px] font-semibold text-white mb-4 tracking-[-0.03em]">
                          Your Name
                        </h3>
                        <p className="text-lg text-zinc-400 leading-relaxed max-w-lg font-medium">
                          Software Engineer focused on building robust backends and clean user interfaces.
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {["TypeScript", "React", "Node.js", "PostgreSQL"].map((s) => (
                          <span
                            key={s}
                            className="px-4 py-2 rounded-full bg-[#18181B] text-zinc-300 text-[13px] font-medium border border-[rgba(255,255,255,0.08)]"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Bold Theme Preview */}
                  {active === "bold" && (
                    <div className="space-y-8 w-full max-w-2xl">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-6">
                        <div className="w-20 h-20 rounded-[20px] bg-[#FF375F] shadow-[0_0_20px_rgba(255,55,95,0.4)]" />
                        <div>
                          <h3 className="text-5xl md:text-[64px] font-black text-white tracking-tighter uppercase leading-none">
                            YOUR NAME
                          </h3>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4">
                        {[1, 2, 3].map((n) => (
                          <div
                            key={n}
                            className="h-32 rounded-[20px] bg-[#18181B] border border-white/[0.08]"
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Creative Theme Preview */}
                  {active === "creative" && (
                    <div className="flex flex-col md:flex-row gap-10 w-full max-w-3xl">
                      <div className="flex-1 space-y-6">
                        <h3 className="text-5xl md:text-6xl font-serif font-semibold text-white leading-tight">
                          Your
                          <br />
                          <span className="text-[#FF9F0A] italic font-medium">Identity</span>
                        </h3>
                        <p className="text-zinc-400 text-lg font-medium">
                          Showcasing visual projects and case studies.
                        </p>
                        <div className="h-40 rounded-[28px] bg-[#18181B] border border-[rgba(255,159,10,0.1)]" />
                      </div>
                      <div className="flex-1 pt-4 md:pt-16 space-y-4">
                        {[1, 2].map((n) => (
                          <div
                            key={n}
                            className="h-28 rounded-[24px] bg-[#121212] border border-white/[0.05]"
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Developer Theme Preview */}
                  {active === "developer" && (
                    <div className="font-mono text-[13px] space-y-4 w-full max-w-2xl bg-[#000000] p-4 sm:p-8 rounded-2xl border border-[rgba(50,215,75,0.2)] shadow-inner overflow-x-auto">
                      <div className="text-[#32D74B] font-bold tracking-wider mb-6">
                        $ cd ~/portfolio
                      </div>
                      <div className="text-[#32D74B] font-semibold mb-2">
                        $ cat profile.json
                      </div>
                      <div className="text-zinc-300 pl-4 border-l-2 border-[#32D74B]/30 pb-4">
                        <pre className="text-zinc-400">
                          {`{
  "name": "Your Alias",
  "role": "Systems Engineer",
  "status": "Available"
}`}
                        </pre>
                      </div>
                      <div className="text-[#32D74B] font-semibold mb-2">
                        $ ls -l projects/
                      </div>
                      <div className="space-y-1.5 pl-4 pb-4">
                        {["api-framework", "cli-toolkit", "web-app"].map(
                          (p) => (
                            <div key={p} className="text-zinc-400">
                              <span className="text-zinc-600 mr-2">drwxr-xr-x</span> {p}/
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.p
            key={active}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="text-center text-zinc-500 mt-10 text-[15px] font-medium tracking-wide"
          >
            {activeTheme.description}
          </motion.p>
        </AnimatePresence>
      </div>
    </section>
  );
}
