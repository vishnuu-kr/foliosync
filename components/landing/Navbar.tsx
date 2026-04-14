"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Component } from "lucide-react";
import Link from "next/link";

const navLinks = [
  { href: "#how-it-works", label: "Workflow" },
  { href: "#features", label: "Features" },
  { href: "#showcase", label: "Templates" },
  { href: "#pricing", label: "Pricing" },
  { href: "#faq", label: "FAQ" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-4 left-0 right-0 w-full z-50 flex justify-center px-4 transition-all duration-500 ease-in-out`}
      >
        <div
          className={`flex items-center justify-between px-6 transition-all duration-500 w-full ${
            scrolled
              ? "max-w-4xl bg-[#0A0A0A]/95 backdrop-blur-3xl border border-white/[0.08] rounded-full py-3 shadow-ios"
              : "max-w-7xl bg-transparent py-4"
          }`}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group cursor-pointer z-50">
            <div className={`flex items-center justify-center rounded-lg bg-[#18181B] border border-[rgba(255,255,255,0.08)] group-hover:bg-[#27272A] transition-colors w-8 h-8`}>
              <Component className={`text-zinc-300 w-4 h-4`} />
            </div>
            <span className={`font-semibold tracking-[-0.03em] text-white transition-all text-[17px]`}>
              FolioSync
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1 bg-white/[0.03] p-1.5 rounded-full border border-white/[0.05]">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-[13px] font-medium text-zinc-400 hover:text-white px-5 py-2 rounded-full hover:bg-white/[0.06] transition-all cursor-pointer"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/dashboard"
              className="text-[13px] font-bold text-zinc-500 hover:text-white transition-colors uppercase tracking-widest"
            >
              Sign In
            </Link>
            <Link
              href="/steps/connect"
              className="btn-primary px-5 py-2 text-[14px]"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden ios-icon w-10 h-10 border border-white/[0.08] text-zinc-400 hover:text-white z-50 relative bg-[#18181B]"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.98, transition: { duration: 0.2 } }}
            transition={{ ease: [0.25, 1, 0.5, 1], duration: 0.4 }}
            className="fixed inset-4 z-40 bg-[#0A0A0A]/95 backdrop-blur-3xl pt-24 px-8 rounded-[32px] md:hidden overflow-y-auto border border-[rgba(255,255,255,0.08)] shadow-ios-lg"
          >
            <div className="flex flex-col gap-2 relative z-10">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 + 0.1, ease: [0.25, 1, 0.5, 1] }}
                >
                  <a
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="block text-[19px] font-semibold tracking-[-0.02em] text-[#A1A1AA] hover:text-white py-4 border-b border-white/[0.04] transition-colors"
                  >
                    {link.label}
                  </a>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, ease: [0.25, 1, 0.5, 1] }}
                className="mt-8 pt-8 flex flex-col gap-4 pb-12"
              >
                <Link
                  href="/steps/connect"
                  onClick={() => setMobileOpen(false)}
                  className="btn-primary w-full py-4 text-center text-[15px]"
                >
                  Create an account
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
