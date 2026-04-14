"use client";

import { motion } from "framer-motion";

const integrations = [
  {
    name: "GitHub",
    description: "Sync repositories, stars, languages, and contribution graphs automatically.",
    color: "text-white",
    bg: "bg-white/10",
  },
  {
    name: "LinkedIn",
    description: "Import professional experience, education, and acquired skills.",
    color: "text-[#0A66C2]",
    bg: "bg-[#0A66C2]/10",
  },
  {
    name: "Twitter / X",
    description: "Display your bio, follower metrics, and recent top-performing posts.",
    color: "text-[#1DA1F2]",
    bg: "bg-[#1DA1F2]/10",
  },
  {
    name: "Dev.to",
    description: "Showcase published technical articles and community reactions.",
    color: "text-white",
    bg: "bg-white/10",
  },
  {
    name: "Medium",
    description: "Link long-form stories and publications via standard RSS feeds.",
    color: "text-white",
    bg: "bg-white/10",
  },
  {
    name: "Dribbble",
    description: "Connect design portfolios to display shots and visual projects.",
    color: "text-[#EA4C89]",
    bg: "bg-[#EA4C89]/10",
  },
];

export function Integrations() {
  return (
    <section className="relative py-24 overflow-hidden bg-[#000000]">
      <div className="relative max-w-7xl mx-auto px-6 z-10">
        <div className="text-center mb-20">
          <div className="section-badge mb-6">Integrations</div>
          <h2 className="text-4xl md:text-5xl font-semibold text-white mb-6 tracking-tight leading-tight">
            Connect everything.
          </h2>
          <p className="text-lg text-zinc-400 max-w-xl mx-auto font-medium leading-relaxed">
            Link your existing platforms. The system handles data extraction, formatting, and synchronisation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {integrations.map((integration, i) => (
            <motion.div
              key={integration.name}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.05, ease: [0.25, 1, 0.5, 1] }}
            >
              <div className="ios-card p-8 flex flex-col h-full bg-[#121212] group">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-3 h-3 rounded-full ${integration.bg}`}>
                     <div className={`w-full h-full rounded-full ${integration.bg} flex items-center justify-center`}>
                        <div className={`w-1.5 h-1.5 rounded-full ${integration.color.replace('text-', 'bg-')} shadow-[0_0_8px_currentColor]`} />
                     </div>
                  </div>
                  <h3 className="text-[18px] font-semibold text-white tracking-tight">
                    {integration.name}
                  </h3>
                </div>
                
                <p className="text-zinc-400 text-[15px] leading-relaxed flex-grow">
                  {integration.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
