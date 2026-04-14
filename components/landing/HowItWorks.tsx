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
                className="ios-card p-10 flex flex-col relative"
              >
                <div className={`w-14 h-14 rounded-2xl border border-white/[0.05] flex items-center justify-center mb-8 shadow-inner ${step.bg}`}>
                  <step.icon className={`w-6 h-6 ${step.color}`} />
                </div>

                <div className="absolute top-10 right-10 text-[64px] font-bold text-white/[0.04] -z-10 select-none">
                  {step.step}
                </div>

                <div className="mt-auto">
                  <h3 className="text-[20px] font-semibold text-white mb-3 tracking-tight">
                    {step.title}
                  </h3>
                  <p className="text-[16px] text-zinc-400 leading-relaxed font-medium">
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
