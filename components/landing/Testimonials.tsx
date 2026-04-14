"use client";

import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Alex",
    role: "Senior UX Designer",
    content:
      "I've always delayed updating my portfolio because it took hours. Connecting my GitHub and watching the platform assemble a clean, readable layout in seconds was incredible. It actually works.",
  },
  {
    name: "Jordan",
    role: "Full-Stack Engineer",
    content:
      "The automatic deployment is what sold me. I push code to GitHub, and my portfolio updates my recent projects in the background. It's truly zero maintenance.",
  }
];

export function Testimonials() {
  return (
    <section className="relative py-24 overflow-hidden bg-[#000000] border-y border-white/[0.04]">
      <div className="relative max-w-5xl mx-auto px-6 z-10">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-semibold text-white mb-6 tracking-tight">
            Developer feedback
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((testimonial, i) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.25, 1, 0.5, 1] }}
              className="h-full"
            >
              <div className="ios-card p-10 flex flex-col h-full bg-[#121212]">
                <p className="text-[#A1A1AA] text-[17px] leading-relaxed mb-10 flex-grow font-medium">
                  &quot;{testimonial.content}&quot;
                </p>

                <div className="mt-auto border-t border-white/[0.06] pt-6 flex justify-between items-center">
                  <p className="text-[15px] font-semibold text-white tracking-tight">
                    {testimonial.name}
                  </p>
                  <p className="text-[14px] text-zinc-500 font-medium">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
