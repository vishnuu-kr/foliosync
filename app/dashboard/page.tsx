"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  Github, BookOpen, Pen, Twitter, Linkedin,
  Settings, User, RefreshCw, LayoutDashboard,
  ExternalLink, LogOut, Component, Share2,
  LucideIcon, Search, Zap
} from "lucide-react";
import Link from "next/link";

interface PlatformFieldProps {
    id: string;
    label: string;
    icon: LucideIcon;
    value: string;
    setter?: (v: string) => void;
    placeholder: string;
    colorClass: string;
    bgClass: string;
    disabled?: boolean;
}

function PlatformField({ id, label, icon: Icon, value, setter, placeholder, colorClass, bgClass, disabled }: PlatformFieldProps) {
    return (
        <div className="ios-card p-6 flex items-center gap-5 focus-within:border-zinc-500 transition-colors">
            <div className={`w-12 h-12 rounded-[14px] flex items-center justify-center shrink-0 ${bgClass}`}>
                <Icon className={`w-6 h-6 ${colorClass}`} />
            </div>
            <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                    <label className="text-[11px] font-bold text-zinc-500 uppercase tracking-widest">{label}</label>
                    {id === 'github' && <span className="text-[#0A84FF] text-[9px] font-bold uppercase tracking-widest bg-[#0A84FF]/10 px-1.5 py-0.5 rounded-sm">Primary</span>}
                </div>
                <input 
                    type="text" 
                    disabled={disabled}
                    value={value} 
                    onChange={(e) => setter?.(e.target.value)}
                    placeholder={placeholder} 
                    className={`w-full bg-transparent border-0 p-0 text-white placeholder:text-zinc-700 outline-none ring-0 focus:ring-0 font-medium text-[16px] ${disabled ? "opacity-50 cursor-not-allowed" : ""}`} 
                />
            </div>
        </div>
    );
}

function DashboardContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const u = searchParams.get("u");

  const [activeTab, setActiveTab] = useState("integrations");
  const [isSyncing, setIsSyncing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form State
  const [github, setGithub] = useState("");
  const [devto, setDevto] = useState("");
  const [medium, setMedium] = useState("");
  const [twitter, setTwitter] = useState("");
  const [linkedin, setLinkedin] = useState("");

  const [bio, setBio] = useState("");
  const [headline, setHeadline] = useState("");
  const [theme, setTheme] = useState("minimal");

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (u) {
      setGithub(u);
      // Fetch existing production data...
      fetch(`/api/user?username=${u}`)
        .then(res => res.json())
        .then(data => {
          if (data?.user) {
            setDevto(data.user.devtoUsername || "");
            setMedium(data.user.mediumUsername || "");
            setTwitter(data.user.twitterUsername || "");
            setLinkedin(data.user.linkedinUsername || "");
            setBio(data.user.bio || "");
            setHeadline(data.user.headline || "");
            setTheme(data.user.theme || "minimal");
          }
          setIsLoaded(true);
        })
        .catch(() => setIsLoaded(true));
    } else {
      setIsLoaded(true);
    }
  }, [u]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (github.trim()) {
      router.push(`/dashboard?u=${github.trim()}`);
    }
  };

  const handleSyncAndGenerate = async () => {
    if (!github.trim()) return;
    setIsSyncing(true);
    setError(null);

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          github,
          devto: devto || undefined,
          medium: medium || undefined,
          twitter: twitter || undefined,
          linkedin: linkedin || undefined,
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Generation error");

      router.refresh();
      setIsSyncing(false);
      window.open(`/${data.user.username}`, "_blank");
    } catch (err: any) {
      setError(err.message || "Pipeline failure");
      setIsSyncing(false);
    }
  };

  if (!u) {
    return (
      <div className="min-h-screen bg-[#000000] flex items-center justify-center p-6 text-white text-center">
        <div className="fixed inset-0 dot-grid opacity-10 pointer-events-none" />
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
          className="relative z-10 w-full max-w-sm ios-card p-10 shadow-ios-lg bg-[#0A0A0A]"
        >
          <div className="w-14 h-14 rounded-[18px] bg-[#18181B] border border-white/[0.08] flex items-center justify-center mb-8 mx-auto shadow-inner">
            <LayoutDashboard className="w-6 h-6 text-zinc-400" />
          </div>
          <h1 className="text-2xl font-semibold mb-2 tracking-tight">System Login</h1>
          <p className="text-zinc-500 mb-8 text-[15px] leading-relaxed font-medium">
            Enter your GitHub identifier to manage your build settings.
          </p>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="relative">
              <Github className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600" />
              <input
                type="text"
                required
                value={github}
                onChange={(e) => setGithub(e.target.value)}
                placeholder="Username"
                className="w-full bg-[#121212] border border-white/[0.05] rounded-[14px] pl-12 pr-4 py-3.5 text-white placeholder:text-zinc-700 outline-none focus:border-[#0A84FF] transition-all font-medium text-[16px]"
              />
            </div>
            <button type="submit" className="btn-primary w-full py-4 text-[15px]">
              Access Control
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  if (!isLoaded) return <div className="min-h-screen bg-[#000000]" />;

  return (
    <div className="min-h-screen bg-[#000000] flex selection:bg-[#0A84FF]/20">
      {/* Sidebar */}
      <aside className="w-72 border-r border-white/[0.05] bg-[#000000] hidden md:flex flex-col p-8 sticky top-0 h-screen">
        <Link href="/" className="flex items-center gap-2.5 group mb-14">
           <div className="w-8 h-8 rounded-lg bg-[#18181B] border border-white/[0.08] flex items-center justify-center group-hover:bg-[#27272A] transition-colors">
              <Component className="w-4 h-4 text-zinc-300" />
           </div>
           <span className="text-[17px] font-semibold tracking-[-0.03em] text-white">
              FolioSync
           </span>
        </Link>
        
        <nav className="flex-1 space-y-2">
          <button 
            onClick={() => setActiveTab("integrations")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-[14px] font-semibold transition-all ${activeTab === "integrations" ? "bg-[#121212] text-white border border-white/[0.04]" : "text-zinc-500 hover:text-white"}`}
          >
            <Settings className="w-4 h-4" /> Integrations
          </button>
          <button 
            onClick={() => setActiveTab("appearance")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-[14px] font-semibold transition-all ${activeTab === "appearance" ? "bg-[#121212] text-white border border-white/[0.04]" : "text-zinc-500 hover:text-white"}`}
          >
            <User className="w-4 h-4" /> Appearance
          </button>
        </nav>

        <div className="pt-8 border-t border-white/[0.05]">
          <button 
            onClick={() => router.push("/dashboard")}
            className="flex items-center gap-3 px-4 py-3 text-[14px] font-semibold text-zinc-600 hover:text-[#FF453A] transition-colors w-full"
          >
            <LogOut className="w-4 h-4" /> Log Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-h-screen">
        <header className="h-20 border-b border-white/[0.05] bg-[#000000]/80 backdrop-blur-xl sticky top-0 z-20 px-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
             <div className="w-2.5 h-2.5 rounded-full bg-[#32D74B] shadow-[0_0_8px_rgba(50,215,75,0.6)]" />
             <h2 className="text-[15px] font-bold text-white tracking-tight uppercase">
                @{u} <span className="text-zinc-600 ml-2 font-medium">Build Environment</span>
             </h2>
          </div>
          <div className="flex items-center gap-4">
            <Link 
              href={`/${u}`}
              target="_blank"
              className="px-5 py-2.5 rounded-full bg-[#121212] border border-white/[0.08] text-[13px] font-bold text-zinc-300 hover:text-white hover:bg-[#18181B] transition-all flex items-center gap-2 uppercase tracking-widest shadow-inner shadow-white/[0.02]"
            >
              <ExternalLink className="w-4 h-4" /> Deploy View
            </Link>
          </div>
        </header>

        <div className="flex-1 p-10 max-w-5xl mx-auto w-full">
          {error && (
            <div className="mb-10 p-5 bg-[#FF453A]/10 border border-[#FF453A]/20 text-[#FF453A] rounded-[18px] text-[14px] flex items-center gap-3 font-medium">
              <AlertCircle className="w-5 h-5" />
              <span className="font-bold">Pipeline Error:</span> {error}
            </div>
          )}

          {activeTab === "integrations" && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-10">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h3 className="text-2xl font-semibold text-white mb-1 tracking-tight">Data Sources</h3>
                  <p className="text-zinc-500 text-[15px] font-medium leading-relaxed max-w-xl">
                    Configure the connected platforms used to compile your professional identity. 
                  </p>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#32D74B]/10 border border-[#32D74B]/20">
                   <div className="w-1.5 h-1.5 rounded-full bg-[#32D74B] animate-pulse" />
                   <span className="text-[11px] font-bold text-[#32D74B] uppercase tracking-wider">Free Mode Active</span>
                </div>
              </div>

              <div className="ios-card p-6 bg-[#121212]/30 border-dashed border-zinc-800">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#0A84FF]/10 flex items-center justify-center shrink-0">
                    <Search className="w-5 h-5 text-[#0A84FF]" />
                  </div>
                  <div>
                    <h4 className="text-[14px] font-bold text-white mb-1">System Reconnaissance (Free)</h4>
                    <p className="text-[13px] text-zinc-500 leading-relaxed max-w-lg mb-3">
                      Even without API keys, FolioSync will crawl public search engine snippets and your GitHub repositories to infer your professional history.
                    </p>
                    <div className="flex items-center gap-2 text-[11px] font-bold text-zinc-600 uppercase tracking-widest bg-black/20 w-fit px-2 py-1 rounded">
                       Status: Monitoring Web Signals
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <PlatformField 
                    id="github" label="GitHub" icon={Github} value={github} placeholder="torvalds"
                    colorClass="text-zinc-200" bgClass="bg-zinc-800" disabled={true}
                />
                 <PlatformField 
                    id="linkedin" label="LinkedIn" icon={Linkedin} value={linkedin} setter={setLinkedin} placeholder="john-doe"
                    colorClass="text-[#0A66C2]" bgClass="bg-[#0A66C2]/10"
                />
                 <PlatformField 
                    id="twitter" label="Twitter / X" icon={Twitter} value={twitter} setter={setTwitter} placeholder="elonmusk"
                    colorClass="text-[#1DA1F2]" bgClass="bg-[#1DA1F2]/10"
                />
                <PlatformField 
                    id="devto" label="Dev.to" icon={BookOpen} value={devto} setter={setDevto} placeholder="ben"
                    colorClass="text-zinc-300" bgClass="bg-white/10"
                />
                <PlatformField 
                    id="medium" label="Medium" icon={Pen} value={medium} setter={setMedium} placeholder="elonmusk"
                    colorClass="text-zinc-300" bgClass="bg-white/10"
                />
              </div>

              <div className="pt-10 border-t border-white/[0.05]">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <button 
                    onClick={handleSyncAndGenerate}
                    disabled={isSyncing}
                    className="btn-primary py-4 px-10 text-[16px] flex items-center gap-3 disabled:opacity-50"
                  >
                    {isSyncing ? (
                      <><RefreshCw className="w-5 h-5 animate-spin" /> Compiling Production Build...</>
                    ) : (
                      <><RefreshCw className="w-5 h-5" /> Synchronize All Sources</>
                    )}
                  </button>

                  <div className="flex items-center gap-4">
                    <div className="text-right">
                       <div className="text-[13px] font-bold text-white mb-0.5">Free Version</div>
                       <div className="text-[11px] text-zinc-500 font-medium">No API keys required.</div>
                    </div>
                    <div className="w-10 h-10 rounded-full border border-white/5 bg-[#121212] flex items-center justify-center">
                       <Zap className="w-5 h-5 text-[#32D74B]" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Manual Import Section for 100% Free/Reliable Data */}
              <div className="mt-16 p-8 rounded-[28px] bg-[#121212] border border-white/[0.04]">
                 <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
                    <div className="flex-1">
                       <h4 className="text-lg font-semibold text-white mb-2">Manual Professional Import</h4>
                       <p className="text-[14px] text-zinc-500 leading-relaxed font-medium">
                          The most reliable free method. Save your LinkedIn profile as an HTML file (`linkedin_profile.html`) 
                          and we will parse it with 100% accuracy.
                       </p>
                    </div>
                    <button className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-[14px] font-bold text-zinc-400 hover:text-white transition-colors flex items-center gap-2">
                       <LayoutDashboard className="w-4 h-4" />
                       View Guide
                    </button>
                 </div>
              </div>
            </motion.div>
          )}

          {activeTab === "appearance" && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-10">
              <div>
                <h3 className="text-2xl font-semibold text-white mb-3 tracking-tight">Appearance Settings</h3>
                <p className="text-zinc-500 text-[16px] font-medium leading-relaxed max-w-2xl">
                  Adjust the generated metadata and presentation theme. Manual edits will be synchronized 
                  with the AI build layer.
                </p>
              </div>

              <div className="space-y-6">
                <div className="ios-card p-10 bg-[#0A0A0A]">
                  <div className="space-y-8">
                      <div>
                        <label className="block text-[12px] font-bold text-zinc-500 uppercase tracking-widest mb-3">Professional Headline</label>
                        <input type="text" value={headline} onChange={(e) => setHeadline(e.target.value)} className="w-full bg-[#121212] border border-white/[0.05] rounded-[14px] px-5 py-3.5 text-white focus:border-[#0A84FF] outline-none font-medium text-[16px] transition-colors" />
                      </div>
                      <div>
                        <label className="block text-[12px] font-bold text-zinc-500 uppercase tracking-widest mb-3">AI Compiled Bio</label>
                        <textarea rows={6} value={bio} onChange={(e) => setBio(e.target.value)} className="w-full bg-[#121212] border border-white/[0.05] rounded-[18px] px-6 py-5 text-white focus:border-[#0A84FF] outline-none resize-none font-medium text-[16px] leading-[1.6] transition-colors"></textarea>
                        <div className="flex items-center gap-2 mt-4 text-[13px] font-semibold text-zinc-600">
                           <RefreshCw className="w-3.5 h-3.5" />
                           Bio was generated using GitHub and LinkedIn signals.
                        </div>
                      </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
}

function AlertCircle(props: any) {
    return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>;
}

export default function DashboardPage() {
  return (
    <Suspense>
      <DashboardContent />
    </Suspense>
  )
}
