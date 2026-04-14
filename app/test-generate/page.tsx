"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

export default function TestGeneratePage() {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim()) return;

    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: username.trim() }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Generation failed");
      }

      router.push(`/${data.user.username}`);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6 text-white font-sans">
      <div className="w-full max-w-md bg-white/5 border border-white/10 p-8 rounded-2xl shadow-xl backdrop-blur-xl">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-sky-600 bg-[#020617]lip-text text-transparent mb-2">
          FolioSync MVP
        </h1>
        <p className="text-sm text-slate-400 mb-8">
          Enter a GitHub username to let AI generate a portfolio in seconds.
        </p>

        <form onSubmit={handleGenerate} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
              GitHub Username
            </label>
            <input
              autoFocus
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="e.g. torvalds"
              className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all font-mono"
              disabled={loading}
            />
          </div>

          {error && (
            <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading || !username.trim()}
            className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 active:scale-[0.98] transition-all font-semibold shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2 disabled:opacity-50 disabled:active:scale-100"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Scraping & Generating...</span>
              </>
            ) : (
              "Generate Portfolio"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}



