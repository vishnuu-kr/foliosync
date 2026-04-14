"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import Link from "next/link";

const plans = [
  {
    name: "Hobby",
    price: "$0",
    period: "per month",
    description: "For individuals building their first portfolio.",
    features: [
      "1 deployed portfolio",
      "3 platform connections",
      "Standard templates",
      "foliosync.dev subdomain",
      "Weekly synchronisation",
      "Community support",
    ],
    cta: "Start for free",
    popular: false,
  },
  {
    name: "Pro",
    price: "$8",
    period: "per month",
    description: "For active professionals and creators.",
    features: [
      "Everything in Hobby",
      "Unlimited platform connections",
      "All premium templates",
      "Custom domain support",
      "Real-time synchronisation",
      "Traffic analytics",
      "Remove branding",
      "Priority email support",
    ],
    cta: "Start Pro Trial",
    popular: true,
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="relative py-24 overflow-hidden bg-[#000000]">
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <div className="section-badge mb-6">Pricing</div>
          <h2 className="text-4xl md:text-5xl font-semibold text-white mb-6 tracking-tight">
            Predictable plans.
          </h2>
          <p className="text-[17px] text-zinc-400 max-w-xl mx-auto font-medium leading-relaxed">
            Start for free. Upgrade only when you need custom domains or real-time sync.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto items-stretch">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.25, 1, 0.5, 1] }}
              className={`h-full relative ${plan.popular ? "md:-mt-2 md:-mb-2 z-10" : ""}`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-8 -translate-y-1/2 z-20">
                  <span className="bg-[#0A84FF] text-white text-[12px] font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-[0_4px_14px_rgba(10,132,255,0.4)]">
                    Most Popular
                  </span>
                </div>
              )}

              <div
                className={`flex flex-col h-full p-8 md:p-10 ${
                  plan.popular ? "ios-card-elevated border-[#0A84FF]/20" : "ios-card border-white/[0.04]"
                }`}
              >
                {/* Popular Subtle Glow */}
                {plan.popular && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[50%] bg-[#0A84FF]/[0.05] rounded-[100%] blur-[40px] pointer-events-none" />
                )}

                <div className="relative z-10 flex flex-col h-full">
                  <h3 className="text-[22px] font-semibold text-white mb-2 tracking-tight">
                    {plan.name}
                  </h3>

                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-[48px] font-bold text-white tracking-[-0.04em]">
                      {plan.price}
                    </span>
                    <span className="text-zinc-500 text-[14px] font-medium">{plan.period}</span>
                  </div>

                  <p className="text-zinc-400 text-[15px] mb-8 font-medium">
                    {plan.description}
                  </p>

                  <Link
                    href="/steps/connect"
                    className={`block w-full py-3.5 mb-10 text-center font-semibold text-[15px] transition-all hover:scale-[0.98] ${
                      plan.popular
                        ? "btn-primary shadow-[0_4px_14px_rgba(10,132,255,0.4)]"
                        : "btn-secondary"
                    }`}
                  >
                    {plan.cta}
                  </Link>

                  <ul className="space-y-4 mt-auto">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-4 text-[15px]">
                        <Check className={`w-5 h-5 shrink-0 ${plan.popular ? "text-[#0A84FF]" : "text-zinc-500"}`} strokeWidth={2} />
                        <span className="text-zinc-300 font-medium tracking-tight">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
