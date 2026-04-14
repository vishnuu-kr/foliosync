"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "How is the portfolio generated?",
    answer: "We use read-only access to your connected platforms (GitHub, LinkedIn) to extract your work history, repository stats, and general skills. Our system structures this raw data into semantic HTML and applies a design template.",
  },
  {
    question: "Where is my data stored?",
    answer: "Your platform connections use secure OAuth tokens. We only store the public metadata necessary to render your portfolio (repo names, bio, commit activity). You can revoke access and delete your entire account instantly from the dashboard.",
  },
  {
    question: "Do I need to trigger updates manually?",
    answer: "No. The system uses webhooks to detect when you push to GitHub or publish on Dev.to. For platforms without webhooks, we run a daily background sync to ensure your portfolio reflects your latest state.",
  },
  {
    question: "Can I use a custom domain?",
    answer: "Yes. Pro users can assign a custom domain. We automatically provision and renew SSL certificates for you.",
  },
  {
    question: "Can I edit the generated content?",
    answer: "Yes. While the initial generation is automatic, every section of your portfolio is fully editable. You can pin specific projects, hide certain roles, and rewrite descriptions.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="relative py-24 overflow-hidden bg-[#000000]">
      <div className="max-w-3xl mx-auto px-6 relative z-10">
        <div className="mb-16">
          <h2 className="text-3xl md:text-[40px] font-semibold text-white tracking-tight">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              className="ios-card overflow-hidden bg-[#121212]"
            >
              <div>
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full flex items-center justify-between p-6 md:p-8 text-left focus:outline-none"
                >
                  <span className="text-[17px] font-medium pr-4 tracking-tight text-white">
                    {faq.question}
                  </span>
                  <div className="shrink-0 text-zinc-500">
                    <motion.div animate={{ rotate: openIndex === i ? 180 : 0 }}>
                      <ChevronDown className="w-5 h-5 pointer-events-none" />
                    </motion.div>
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {openIndex === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1] }}
                    >
                      <div className="pb-8 px-6 md:px-8 pt-0 pr-12">
                        <p className="text-[#A1A1AA] text-[15px] font-medium leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
