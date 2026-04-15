"use client";

import { Component } from "lucide-react";
import Link from "next/link";

const footerLinks = {
  Product: [
    { label: "Features", href: "/#features" },
    { label: "Templates", href: "/#showcase" },
    { label: "Pricing", href: "/#pricing" },
    { label: "Changelog", href: "/changelog" },
  ],
  Resources: [
    { label: "Documentation", href: "/docs" },
    { label: "Engineering Blog", href: "/blog" },
    { label: "GitHub Repository", href: "https://github.com/vishnuu-kr/foliosync", external: true },
  ],
  Company: [
    { label: "About", href: "/about" },
    { label: "Careers", href: "/careers" },
    { label: "Contact Us", href: "/contact" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ],
};

export function Footer() {
  return (
    <footer className="relative border-t border-[rgba(255,255,255,0.06)] bg-[#0A0A0A] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 py-24 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-12 md:gap-8">
          <div className="col-span-2 md:col-span-2 pr-4">
            <Link href="/" className="flex items-center gap-2 mb-6 group cursor-pointer w-max">
              <div className="w-8 h-8 rounded-lg bg-[#18181B] flex items-center justify-center border border-white/[0.08] group-hover:bg-[#27272A] transition-colors">
                <Component className="w-4 h-4 text-zinc-300" />
              </div>
              <span className="text-[17px] font-semibold tracking-[-0.03em] text-white">
                FolioSync
              </span>
            </Link>
            <p className="text-[14px] text-zinc-400 max-w-xs leading-relaxed font-medium mb-10">
              A developer tool to extract, format, and host your professional identity. 
            </p>

            <div className="flex gap-2">
              <a
                href="https://x.com/kr_vishnuu"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-full bg-[#121212] border border-white/[0.06] flex items-center justify-center text-[12px] font-medium tracking-wide text-zinc-400 hover:text-white hover:bg-[#18181B] transition-all"
              >
                X
              </a>
              <a
                href="https://github.com/vishnuu-kr/foliosync"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-full bg-[#121212] border border-white/[0.06] flex items-center justify-center text-[12px] font-medium tracking-wide text-zinc-400 hover:text-white hover:bg-[#18181B] transition-all"
              >
                GitHub
              </a>
            </div>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category} className="col-span-1 border-l pl-6 border-white/[0.04] md:border-transparent md:pl-0">
              <h4 className="text-[13px] font-semibold text-white mb-6 tracking-tight">
                {category}
              </h4>
              <ul className="space-y-4">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      // @ts-ignore
                      target={link.external ? "_blank" : undefined}
                      rel={link.external ? "noopener noreferrer" : undefined}
                      className="text-[14px] text-zinc-500 hover:text-zinc-300 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-24 pt-8 border-t border-white/[0.04] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[14px] text-zinc-600 font-medium">
            © {new Date().getFullYear()} FolioSync. Crafted thoughtfully.
          </p>
          <div className="flex items-center gap-4 text-[14px] text-zinc-600 font-medium">
            <a 
              href="https://foundree.dev" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="pill-wrapper block"
            >
              <div className="foundree-pill">
                <span className="foundree-pill-text">Build by Foundree</span>
              </div>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
