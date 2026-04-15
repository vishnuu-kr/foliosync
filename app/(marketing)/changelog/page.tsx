import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";

export default function Page() {
  return (
    <main className="relative min-h-screen bg-[#000000] overflow-x-hidden flex flex-col">
      <Navbar />
      <div className="flex-grow flex flex-col items-center justify-center py-40 px-6 text-center max-w-3xl mx-auto pt-56 pb-24 z-10 relative">
        <div className="inline-flex items-center justify-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] mb-8 shadow-ios">
          <span className="w-2.5 h-2.5 rounded-full bg-zinc-200/50" />
          <span className="text-[13px] font-medium text-zinc-400 tracking-wide uppercase">
            Coming Soon
          </span>
        </div>
        <h1 className="text-5xl md:text-6xl tracking-[-0.04em] font-semibold text-white mb-6 leading-tight">
          Changelog
        </h1>
        <p className="text-lg text-zinc-400 font-medium leading-relaxed max-w-xl mx-auto">
          Latest updates and improvements to FolioSync. We are currently finalizing this page. Check back soon for updates!
        </p>
      </div>
      <Footer />
    </main>
  );
}