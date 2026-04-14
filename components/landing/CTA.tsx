"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function CTA() {
  return (
    <section className="relative py-32 overflow-hidden border-t border-[rgba(255,255,255,0.06)] bg-[#000000]">
      <div className="relative max-w-4xl mx-auto px-6 text-center z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
        >
          <h2 className="text-4xl md:text-[64px] font-semibold text-white mb-8 tracking-[-0.03em] leading-[1.05]">
            Start building your
            <br className="hidden sm:block" />
            <span className="text-zinc-500 ml-0 sm:ml-2">portfolio today.</span>
          </h2>

          <p className="text-[18px] text-zinc-400 max-w-xl mx-auto mb-12 leading-relaxed font-medium">
            Connect your accounts and go live in minutes. No credit card required.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/steps/connect"
              className="btn-primary w-full sm:w-auto px-10 py-4 text-[16px] group"
            >
              Deploy now
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-12 md:gap-24 mt-24 pt-16 border-t border-white/[0.06] relative">
            <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            
            {[
              { value: "10K+", label: "Portfolios Hosted" },
              { value: "99.9%", label: "Uptime" },
              { value: "24/7", label: "Auto-Syncing" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-[32px] font-semibold text-white tracking-[-0.03em] mb-1">
                  {stat.value}
                </div>
                <div className="text-[13px] text-zinc-500 font-medium tracking-wide">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
