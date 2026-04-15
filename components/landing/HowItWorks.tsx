"use client";

import { motion } from "framer-motion";
import { Link2, LayoutTemplate, Zap } from "lucide-react";

const steps = [
  {
    step: "1",
    icon: Link2,
    title: "Connect",
    description: "Link your GitHub or LinkedIn profile in one click. We only read public data.",
    color: "text-[#0A84FF]",
    bg: "bg-[#0A84FF]/10",
  },
  {
    step: "2",
    icon: LayoutTemplate,
    title: "Generate",
    description: "Our system organizes your repositories, experience, and skills into a clean timeline.",
    color: "text-[#BF5AF2]",
    bg: "bg-[#BF5AF2]/10",
  },
  {
    step: "3",
    icon: Zap,
    title: "Deploy",
    description: "Claim your subdomain and go live instantly. Your site automatically syncs with your latest work.",
    color: "text-[#32D74B]",
    bg: "bg-[#32D74B]/10",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="relative py-24 overflow-hidden bg-[#000000]">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <div className="section-badge mb-6">
            Workflow
          </div>
          <h2 className="text-4xl md:text-5xl font-semibold text-white mb-6 tracking-tight">
            How it works
          </h2>
          <p className="text-lg text-zinc-400 max-w-xl mx-auto font-medium leading-relaxed">
            A frictionless deployment pipeline for your professional identity.
          </p>
        </div>

        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {steps.map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: [0.25, 1, 0.5, 1] }}
                className="ios-card p-10 flex flex-col relative overflow-hidden group hover:border-zinc-700/50 transition-colors"
              >
                {/* Massive Fading Number from Top to Bottom */}
                <div className="absolute -top-6 right-0 md:-right-4 text-[180px] font-extrabold leading-none pointer-events-none select-none bg-gradient-to-b from-white/[0.07] to-transparent bg-clip-text text-transparent transform transition-transform duration-700 group-hover:scale-105 group-hover:-rotate-2">
                  {step.step}
                </div>

                <div className={`relative z-10 w-14 h-14 rounded-2xl border border-white/[0.05] flex items-center justify-center mb-8 shadow-inner ${step.bg}`}>
                  <step.icon className={`w-6 h-6 ${step.color}`} />
                </div>

                <div className="mt-auto relative z-10">
                  <h3 className="text-[20px] font-semibold text-white mb-3 tracking-tight">
                    {step.title}
                  </h3>
                  <p className="text-[15px] text-zinc-400 leading-relaxed font-medium">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
