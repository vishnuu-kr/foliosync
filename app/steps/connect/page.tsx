"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Github, BookOpen, Pen, Twitter, Linkedin, Component } from "lucide-react";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";

export default function ConnectPage() {
  const [github, setGithub] = useState("");
  const [devto, setDevto] = useState("");
  const [medium, setMedium] = useState("");
  const [twitter, setTwitter] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [user, setUser] = useState<any>(null);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUser(session.user);
        setGithub(session.user.user_metadata?.user_name || "");
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
      if (session?.user) {
         setGithub(session.user.user_metadata?.user_name || "");
      }
    });
    return () => subscription.unsubscribe();
  }, [supabase.auth]);

  const handleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
        scopes: 'read:user user:email'
      },
    });
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return handleLogin();
    if (!github.trim()) return;

    const params = new URLSearchParams();
    params.set("github", github.trim());
    if (devto.trim()) params.set("devto", devto.trim());
    if (medium.trim()) params.set("medium", medium.trim());
    if (twitter.trim()) params.set("twitter", twitter.trim());
    if (linkedin.trim()) params.set("linkedin", linkedin.trim());

    router.push(`/steps/generating?${params.toString()}`);
  };

  const socials = [
    {
      id: "github",
      label: "GitHub",
      icon: Github,
      placeholder: "e.g. torvalds",
      value: github,
      setter: setGithub,
      required: true,
      iconBg: "bg-[#18181B]",
      iconColor: "text-zinc-300",
      focusRing: "focus:border-[#0A84FF]",
    },
    {
      id: "linkedin",
      label: "LinkedIn",
      icon: Linkedin,
      placeholder: "e.g. john-doe",
      value: linkedin,
      setter: setLinkedin,
      required: false,
      iconBg: "bg-[#0A66C2]/10",
      iconColor: "text-[#0A66C2]",
      focusRing: "focus:border-[#0A66C2]",
    },
    {
      id: "twitter",
      label: "Twitter / X",
      icon: Twitter,
      placeholder: "e.g. elonmusk",
      value: twitter,
      setter: setTwitter,
      required: false,
      iconBg: "bg-[#1DA1F2]/10",
      iconColor: "text-[#1DA1F2]",
      focusRing: "focus:border-[#1DA1F2]",
    },
    {
      id: "devto",
      label: "Dev.to",
      icon: BookOpen,
      placeholder: "e.g. ben",
      value: devto,
      setter: setDevto,
      required: false,
      iconBg: "bg-white/10",
      iconColor: "text-white",
      focusRing: "focus:border-white/40",
    },
    {
      id: "medium",
      label: "Medium",
      icon: Pen,
      placeholder: "e.g. elonmusk",
      value: medium,
      setter: setMedium,
      required: false,
      iconBg: "bg-white/10",
      iconColor: "text-white",
      focusRing: "focus:border-white/40",
    },
  ];

  return (
    <div className="min-h-screen bg-[#000000] flex flex-col selection:bg-[#0A84FF]/30 overflow-hidden relative">
      {/* Nav */}
      <nav className="relative z-10 max-w-7xl mx-auto w-full px-6 py-8 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group cursor-pointer z-50">
           <div className="w-8 h-8 rounded-lg bg-[#18181B] flex items-center justify-center border border-white/[0.08] group-hover:bg-[#27272A] transition-colors">
              <Component className="w-4 h-4 text-zinc-300" />
           </div>
           <span className="text-[17px] font-semibold tracking-[-0.03em] text-white">
              FolioSync
           </span>
        </Link>

        <Link
          href="/"
          className="flex items-center gap-2 text-[14px] font-medium text-zinc-500 hover:text-white transition-colors duration-300"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </Link>
      </nav>

      <main className="relative z-10 flex-1 flex items-center justify-center px-6 pb-12 mt-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.98, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
          className="w-full max-w-xl"
        >
          <div className="px-2 mb-10 text-center md:text-left">
             <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-white mb-4">
                Connect your accounts.
             </h1>
             <p className="text-[17px] text-zinc-400 font-medium">
                GitHub is required. Other handles are optional—our free recon system will automatically search the web to build your professional profile.
             </p>
          </div>

          <form onSubmit={handleNext} className="space-y-3">
             {socials.map((social, idx) => (
                <motion.div
                   key={social.id}
                   initial={{ opacity: 0, x: -10 }}
                   animate={{ opacity: 1, x: 0 }}
                   transition={{ delay: idx * 0.05, duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
                   className="ios-card bg-[#121212] overflow-hidden group focus-within:border-zinc-600 transition-colors duration-300"
                >
                   <div className="flex items-center px-5 py-4 gap-4">
                      {/* Action Icon */}
                      <div className={`w-10 h-10 rounded-[14px] flex items-center justify-center ${social.iconBg} shrink-0`}>
                         <social.icon className={`w-5 h-5 ${social.iconColor}`} />
                      </div>

                      {/* Label + Input */}
                      <div className="flex-1 min-w-0 flex flex-col justify-center">
                         <div className="flex items-center justify-between mb-1">
                            <label className="text-[12px] font-semibold text-zinc-500 tracking-wide">
                               {social.label}
                            </label>
                            {social.required && (
                               <span className="text-[#0A84FF] text-[10px] font-bold uppercase tracking-widest bg-[#0A84FF]/10 px-2 py-0.5 rounded-sm">
                                  Required
                               </span>
                            )}
                         </div>
                         <input
                            type="text"
                            disabled={social.id === "github" && !!user}
                            autoFocus={idx === 0}
                            value={social.value}
                            onChange={(e) => social.setter(e.target.value)}
                            placeholder={social.placeholder}
                            className={`w-full bg-transparent border-0 p-0 text-white placeholder:text-zinc-700 outline-none ring-0 focus:ring-0 font-medium text-[16px] disabled:opacity-50`}
                         />
                      </div>
                   </div>
                </motion.div>
             ))}

             {/* Sticky CTA */}
             {!user ? (
                 <motion.button
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
                    type="button"
                    onClick={handleLogin}
                    className="btn-primary w-full py-4 mt-8 rounded-[20px] text-[16px] flex items-center justify-center gap-3 bg-[#24292e] text-white hover:bg-[#2f363d] focus:ring-2 focus:ring-[#24292e]/50 focus:ring-offset-2 focus:ring-offset-black transition-all group"
                 >
                    <Github className="w-5 h-5" />
                    Sign in with GitHub
                 </motion.button>
             ) : (
                <motion.button
                   initial={{ opacity: 0, y: 12 }}
                   animate={{ opacity: 1, y: 0 }}
                   transition={{ delay: 0.3, duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
                   type="submit"
                   disabled={!github.trim()}
                   className="btn-primary w-full py-4 mt-8 rounded-[20px] text-[16px] flex items-center justify-center gap-2 group disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-none"
                >
                   Continue to Generation
                   <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </motion.button>
             )}
          </form>
        </motion.div>
      </main>
    </div>
  );
}
