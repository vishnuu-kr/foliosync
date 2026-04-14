"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Component, CheckCircle2, AlertCircle, Loader2, Github, BookOpen, Pen, Twitter, Linkedin, Search, Brain, Wand2, Rocket } from "lucide-react";

const allSteps = [
  { id: "init", text: "Initializing pipeline...", icon: Loader2, always: true },
  { id: "github", text: "Cloning GitHub repositories...", icon: Github, always: true },
  { id: "devto", text: "Fetching Dev.to articles...", icon: BookOpen, key: "devto" },
  { id: "medium", text: "Reading Medium posts...", icon: Pen, key: "medium" },
  { id: "twitter", text: "Authenticating Twitter / X...", icon: Twitter, key: "twitter" },
  { id: "linkedin", text: "Extracting LinkedIn experience...", icon: Linkedin, key: "linkedin" },
  { id: "recon", text: "Processing web metadata...", icon: Search, always: true },
  { id: "analyzing", text: "Structuring raw dataset...", icon: Brain, always: true },
  { id: "writing", text: "Compiling HTML assets...", icon: Wand2, always: true },
  { id: "publishing", text: "Deploying production build...", icon: Rocket, always: true },
];

function GeneratingContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const github = searchParams.get("github") || searchParams.get("u");
  const devto = searchParams.get("devto");
  const medium = searchParams.get("medium");
  const twitter = searchParams.get("twitter");
  const linkedin = searchParams.get("linkedin");

  const steps = allSteps.filter(
    (s) => s.always || (s.key && searchParams.get(s.key))
  );

  const [currentStep, setCurrentStep] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    if (!github) {
      router.push("/steps/connect");
      return;
    }

    const runGeneration = async () => {
      try {
        const interval = setInterval(() => {
          setCurrentStep((prev) => {
            if (prev < steps.length - 2) return prev + 1;
            return prev;
          });
        }, 2200);

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

        clearInterval(interval);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Generation failed");
        }

        setCurrentStep(steps.length - 1);
        setCompleted(true);

        setTimeout(() => {
          router.push(`/${data.user.username}`);
        }, 1500);
      } catch (err: any) {
        console.error(err);
        setError(err.message || "An unexpected error occurred.");
      }
    };

    runGeneration();
  }, [github, devto, medium, twitter, linkedin, router]);

  if (error) {
    return (
      <div className="min-h-screen bg-[#000000] flex items-center justify-center p-6 text-white text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
          className="max-w-md w-full bg-[#121212] rounded-[24px] border border-[#FF453A]/20 p-10"
        >
          <div className="w-14 h-14 rounded-full bg-[#FF453A]/10 flex items-center justify-center mb-6 mx-auto">
            <AlertCircle className="w-6 h-6 text-[#FF453A]" />
          </div>
          <h1 className="text-2xl font-semibold mb-3 tracking-tight">Process Terminated</h1>
          <p className="text-zinc-400 mb-8 leading-relaxed font-medium">{error}</p>
          <button
            onClick={() => router.push("/steps/connect")}
            className="w-full py-3.5 rounded-full bg-[#FF453A] text-white text-[15px] font-semibold hover:bg-[#FF375F] transition-colors"
          >
            Acknowledge and Return
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#000000] flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Subtle Background Glow matches iOS Blue */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#0A84FF]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 w-full max-w-lg text-center">
        <div className="mb-14">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
            className="w-16 h-16 rounded-[18px] bg-[#18181B] border border-[rgba(255,255,255,0.08)] flex items-center justify-center mx-auto mb-6 shadow-inner relative"
          >
            <Component className="w-6 h-6 text-zinc-300 relative z-10" />
            <div className={`absolute inset-0 rounded-[18px] border-2 border-[#0A84FF]/50 blur-[2px] transition-opacity duration-1000 ${completed ? "opacity-0" : "animate-pulse"}`} />
          </motion.div>
          
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-white mb-2">
            Compiling Build
          </h1>
          <p className="text-zinc-400 font-medium text-[15px]">
            Please do not close this window.
          </p>
        </div>

        {/* Console-style Steps */}
        <div className="space-y-4 max-w-sm mx-auto text-left">
          <AnimatePresence>
            {steps.map((step, idx) => {
              const isCurrent = currentStep === idx;
              const isCompleted = currentStep > idx || (completed && idx === steps.length - 1);

              return (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05, duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
                  className="flex items-center gap-4"
                >
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 border transition-all duration-300 ${
                      isCompleted
                        ? "bg-[#32D74B]/10 border-[#32D74B]/30 text-[#32D74B]"
                        : isCurrent
                        ? "bg-[#0A84FF]/10 border-[#0A84FF]/30 text-[#0A84FF]"
                        : "bg-[#18181B] border-white/[0.05] text-zinc-600"
                    }`}
                  >
                    {isCompleted ? (
                      <CheckCircle2 className="w-4 h-4" />
                    ) : (
                      <step.icon
                        className={`w-3.5 h-3.5 ${
                          isCurrent ? "animate-spin" : ""
                        }`}
                      />
                    )}
                  </div>
                  <span
                    className={`text-[14px] font-medium tracking-tight transition-all duration-300 ${
                      isCurrent
                        ? "text-white"
                        : isCompleted
                        ? "text-zinc-400"
                        : "text-zinc-600"
                    }`}
                  >
                    {step.text}
                  </span>
                  
                  {isCurrent && (
                    <motion.div
                      layoutId="active-dot"
                      className="w-1.5 h-1.5 rounded-full bg-[#0A84FF] ml-auto"
                      animate={{ opacity: [1, 0.2, 1] }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                    />
                  )}
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* iOS style Progress Bar */}
        <div className="mt-14 max-w-sm mx-auto">
          <div className="h-1.5 bg-[#18181B] rounded-full overflow-hidden border border-white/[0.02]">
            <motion.div
              className={`h-full rounded-full transition-colors duration-500 ${completed ? "bg-[#32D74B]" : "bg-[#0A84FF]"}`}
              initial={{ width: "0%" }}
              animate={{ width: completed ? "100%" : `${((currentStep + 1) / steps.length) * 100}%` }}
              transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
            />
          </div>
          <p className="text-[12px] font-semibold text-zinc-600 mt-4 tracking-wide uppercase">
            {completed ? "Deployment Complete" : `Step ${currentStep + 1} of ${steps.length}`}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function GeneratingPage() {
  return (
    <Suspense>
      <GeneratingContent />
    </Suspense>
  );
}
