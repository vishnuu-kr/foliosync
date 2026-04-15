import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { 
  Github, Globe, Star, Mail, ArrowLeft, 
  BookOpen, Pen, ExternalLink, Twitter, Linkedin, 
  Briefcase, Calendar, MapPin, Zap, Component,
  Layout, Code2, Search, Share2
} from "lucide-react";
import Link from "next/link";

export default async function PortfolioPage({ params }: { params: Promise<{ username: string }> }) {
  const { username } = await params;

  const user = await prisma.user.findUnique({
    where: { username },
    include: {
      projects: { orderBy: { stars: "desc" } },
      skills: { orderBy: { level: "desc" } },
      blogPosts: { orderBy: { publishedAt: "desc" }, take: 6 },
      experiences: { orderBy: { startDate: "desc" } },
      socialLinks: true,
      scrapedData: true,
    },
  });

  if (!user) notFound();

  const scrapedData = user.scrapedData ? JSON.parse(user.scrapedData.data) : null;
  const tweets = scrapedData?.twitter?.tweets || [];
  const linkedinProfile = scrapedData?.linkedin?.profile || null;

  const featuredProjects = user.projects.filter((p) => p.featured);
  const otherProjects = user.projects.filter((p) => !p.featured);

  const getPlatformIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case "github": return <Github className="w-4 h-4" />;
      case "twitter": return <Twitter className="w-4 h-4" />;
      case "linkedin": return <Linkedin className="w-4 h-4" />;
      case "devto": return <BookOpen className="w-4 h-4" />;
      case "medium": return <Pen className="w-4 h-4" />;
      default: return <Globe className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-[#000000] text-[#A1A1AA] font-sans selection:bg-[#0A84FF]/20">
      {/* Structural Background */}
      <div className="fixed inset-0 dot-grid opacity-20 radial-mask pointer-events-none" />

      {/* Nav */}
      <nav className="relative z-10 max-w-5xl mx-auto px-6 py-8 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 group text-[14px] font-medium text-zinc-500 hover:text-white transition-colors duration-300 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
          Browse Directory
        </Link>
        <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-[#121212] border border-white/[0.05]">
          <div className="w-1.5 h-1.5 rounded-full bg-[#32D74B] shadow-[0_0_8px_rgba(50,215,75,0.6)]" />
          <span className="text-[11px] font-bold uppercase tracking-wider text-white">
            Live
          </span>
        </div>
      </nav>

      <main className="relative z-10 max-w-5xl mx-auto px-6 pb-32 pt-10">
        {/* --- Profile Header --- */}
        <section className="mb-24 flex flex-col md:flex-row items-center md:items-start gap-10 md:gap-14">
          <div className="relative shrink-0">
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-[40px] bg-[#121212] border border-white/[0.08] overflow-hidden shadow-ios">
               {/* eslint-disable-next-line @next/next/no-img-element */}
               <img
                src={user.image || linkedinProfile?.profilePicture || ""}
                alt={user.name}
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
              />
            </div>
            <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-2xl bg-[#0A84FF] border-4 border-[#000000] flex items-center justify-center text-white shadow-lg">
               <Zap className="w-5 h-5 fill-current" />
            </div>
          </div>

          <div className="flex-1 text-center md:text-left">
            <h1 className="text-4xl md:text-6xl font-semibold text-white mb-3 tracking-[-0.04em]">
              {user.name}
            </h1>
            <p className="text-[18px] md:text-[21px] font-medium text-zinc-400 tracking-tight mb-6 max-w-2xl leading-relaxed">
              {user.headline || linkedinProfile?.headline}
            </p>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-10">
               {user.socialLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 rounded-[14px] bg-[#121212] border border-white/[0.05] flex items-center justify-center text-zinc-500 hover:text-white hover:bg-[#18181B] hover:border-white/[0.1] transition-all duration-300"
                  title={link.label || link.platform}
                >
                  {getPlatformIcon(link.platform)}
                </a>
              ))}
              <div className="h-6 w-px bg-white/[0.08] mx-2 hidden sm:block" />
              <button className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#0A84FF]/10 text-[#0A84FF] text-[14px] font-bold border border-[#0A84FF]/20 hover:bg-[#0A84FF]/20 transition-colors">
                 <Share2 className="w-4 h-4" />
                 Share Profile
              </button>
            </div>

            <p className="text-[16px] leading-[1.6] text-zinc-400 max-w-2xl">
              {user.bio || linkedinProfile?.summary || "Software professional building modern digital experiences."}
            </p>
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
           {/* Left Column: Projects & Experience */}
           <div className="lg:col-span-8 space-y-24">
              
              {/* --- Featured Projects --- */}
              {featuredProjects.length > 0 && (
                <section>
                  <div className="flex items-center gap-3 mb-10">
                    <div className="w-8 h-8 rounded-lg bg-[#0A84FF]/10 border border-[#0A84FF]/20 flex items-center justify-center">
                       <Layout className="w-4 h-4 text-[#0A84FF]" />
                    </div>
                    <h2 className="text-[14px] uppercase tracking-[0.2em] font-bold text-white">
                      Featured Work
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 gap-6">
                    {featuredProjects.map((project, idx) => (
                      <a
                        key={project.id}
                        href={project.url || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ios-card-elevated p-8 md:p-10 group bg-[#0A0A0B]"
                      >
                        <div className="flex items-start justify-between mb-8">
                          <div className="w-12 h-12 rounded-2xl bg-[#121212] border border-white/[0.08] flex items-center justify-center text-zinc-400 group-hover:text-[#0A84FF] transition-colors duration-300">
                            <Github className="w-6 h-6" />
                          </div>
                          {project.stars !== null && (
                            <div className="flex items-center gap-1.5 text-[13px] font-bold text-zinc-500 group-hover:text-[#FFD60A] transition-colors duration-500 px-3 py-1.5 rounded-full bg-[#121212] border border-white/[0.05]">
                              <Star className="w-3.5 h-3.5 fill-current" />
                              {project.stars}
                            </div>
                          )}
                        </div>
                        <h3 className="text-2xl md:text-3xl font-semibold text-white mb-4 tracking-[-0.02em] group-hover:text-[#0A84FF] transition-colors duration-300">
                          {project.title}
                        </h3>
                        <p className="text-[16px] leading-relaxed text-zinc-400 mb-10">
                          {project.description}
                        </p>
                        <div className="flex items-center justify-between pt-6 border-t border-white/[0.04]">
                          <div className="flex items-center gap-3">
                             <div className="px-3.5 py-1.5 rounded-lg bg-[#18181B] border border-white/[0.05] text-[12px] font-bold text-zinc-400 uppercase tracking-widest">
                               {project.language || "Repository"}
                             </div>
                          </div>
                          <div className="flex items-center gap-2 text-[14px] font-bold text-[#0A84FF] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                             View Source
                             <ExternalLink className="w-4 h-4" />
                          </div>
                        </div>
                      </a>
                    ))}
                  </div>
                </section>
              )}

              {/* --- Experience Section --- */}
              {user.experiences.length > 0 && (
                <section>
                  <div className="flex items-center gap-3 mb-10">
                    <div className="w-8 h-8 rounded-lg bg-[#32D74B]/10 border border-[#32D74B]/20 flex items-center justify-center">
                       <Briefcase className="w-4 h-4 text-[#32D74B]" />
                    </div>
                    <h2 className="text-[14px] uppercase tracking-[0.2em] font-bold text-white">
                      Professional
                    </h2>
                  </div>

                  <div className="space-y-4">
                    {user.experiences.map((exp) => (
                      <div key={exp.id} className="ios-card p-8 flex gap-6">
                        <div className="w-12 h-12 rounded-[14px] bg-[#18181B] border border-white/[0.05] flex items-center justify-center shrink-0">
                          <Briefcase className="w-5 h-5 text-zinc-500" />
                        </div>
                        <div className="flex-1">
                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-2">
                            <h3 className="text-[19px] font-semibold text-white tracking-tight">{exp.role}</h3>
                            <div className="text-[12px] font-bold text-zinc-500 uppercase tracking-widest">
                              {exp.startDate} {exp.endDate ? `- ${exp.endDate}` : "- Present"}
                            </div>
                          </div>
                          <div className="text-[#0A84FF] font-bold text-[14px] mb-4 uppercase tracking-widest">
                            {exp.company}
                          </div>
                          <p className="text-[15px] text-zinc-400 leading-relaxed whitespace-pre-line font-medium">
                            {exp.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* --- All Projects Grid --- */}
              {otherProjects.length > 0 && (
                <section>
                  <div className="flex items-center gap-3 mb-10">
                    <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
                       <Code2 className="w-4 h-4 text-zinc-300" />
                    </div>
                    <h2 className="text-[14px] uppercase tracking-[0.2em] font-bold text-white">
                      Other Projects
                    </h2>
                    <div className="ml-auto text-[12px] font-bold text-zinc-600 uppercase tracking-widest">
                       {otherProjects.length} Repositories
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {otherProjects.slice(0, 10).map((project) => (
                      <a
                        key={project.id}
                        href={project.url || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ios-card p-6 group hover:bg-[#18181B]"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-[15px] font-semibold text-zinc-200 group-hover:text-white truncate pr-4 transition-colors">
                            {project.title}
                          </h3>
                          {project.stars !== null && project.stars > 0 && (
                            <div className="flex items-center gap-1 text-[11px] font-bold text-zinc-500 group-hover:text-[#FFD60A] transition-colors">
                              <Star className="w-3 h-3 fill-current" />
                              {project.stars}
                            </div>
                          )}
                        </div>
                        <p className="text-[13px] text-zinc-500 line-clamp-2 leading-relaxed mb-4 group-hover:text-zinc-400 transition-colors">
                          {project.description || "System architecture and utility implementation."}
                        </p>
                        <div className="text-[11px] font-bold text-[#0A84FF] uppercase tracking-widest opacity-80">
                           {project.language || "Code"}
                        </div>
                      </a>
                    ))}
                  </div>
                </section>
              )}
           </div>

           {/* Right Column: Skills, Writing, X Feed */}
           <div className="lg:col-span-4 space-y-24">
              
              {/* --- Skills Section --- */}
              <section>
                 <div className="flex items-center gap-3 mb-10">
                    <div className="w-8 h-8 rounded-lg bg-[#BF5AF2]/10 border border-[#BF5AF2]/20 flex items-center justify-center">
                       <Zap className="w-4 h-4 text-[#BF5AF2]" />
                    </div>
                    <h2 className="text-[14px] uppercase tracking-[0.2em] font-bold text-white">
                      Expertise
                    </h2>
                 </div>

                 <div className="flex flex-wrap gap-2">
                    {user.skills.map((skill) => (
                      <div
                        key={skill.id}
                        className="px-4 py-2.5 rounded-full bg-[#121212] border border-white/[0.05] flex items-center gap-3 group hover:border-[#BF5AF2]/30 transition-all duration-300"
                      >
                         <span className="text-[14px] font-semibold text-zinc-200 group-hover:text-white">
                            {skill.name}
                         </span>
                         <div className="w-1.5 h-1.5 rounded-full bg-[#BF5AF2]/40 group-hover:bg-[#BF5AF2] transition-colors shadow-[0_0_8px_currentColor]" />
                      </div>
                    ))}
                 </div>
              </section>

              {/* --- Latest Writing --- */}
              {user.blogPosts.length > 0 && (
                <section>
                  <div className="flex items-center gap-3 mb-10">
                    <div className="w-8 h-8 rounded-lg bg-zinc-800 border border-white/10 flex items-center justify-center">
                       <Pen className="w-4 h-4 text-zinc-300" />
                    </div>
                    <h2 className="text-[14px] uppercase tracking-[0.2em] font-bold text-white">
                      Journal
                    </h2>
                  </div>

                  <div className="space-y-3">
                    {user.blogPosts.map((post) => (
                      <a
                        key={post.id}
                        href={post.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ios-card p-5 group hover:bg-[#18181B] block"
                      >
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-sm bg-white/5 border border-white/10 text-zinc-500 uppercase tracking-widest">
                            {post.source === "devto" ? "Dev.to" : "Medium"}
                          </span>
                        </div>
                        <h3 className="text-[15px] font-semibold text-zinc-200 group-hover:text-[#0A84FF] transition-all duration-300 leading-snug">
                          {post.title}
                        </h3>
                      </a>
                    ))}
                  </div>
                </section>
              )}

              {/* --- Twitter X Feed --- */}
              {scrapedData?.twitter?.profile && (
                 <section>
                    <div className="flex items-center gap-3 mb-10">
                       <div className="w-8 h-8 rounded-lg bg-zinc-800 border border-white/10 flex items-center justify-center">
                          <Twitter className="w-4 h-4 text-zinc-300" />
                       </div>
                       <h2 className="text-[14px] uppercase tracking-[0.2em] font-bold text-white">
                         Stream
                       </h2>
                    </div>

                    <div className="ios-card p-8 bg-[#121212]">
                       <div className="flex items-center gap-4 mb-6">
                          <div className="w-12 h-12 rounded-full border border-white/[0.08] overflow-hidden grayscale">
                             {/* eslint-disable-next-line @next/next/no-img-element */}
                             <img src={user.image || ""} alt="" className="w-full h-full object-cover" />
                          </div>
                          <div>
                             <div className="text-[15px] font-bold text-white">{user.name}</div>
                             <div className="text-[13px] text-zinc-600 font-medium">@{scrapedData.twitter.profile.username}</div>
                          </div>
                       </div>
                       
                       <p className="text-[14px] text-zinc-400 font-medium leading-relaxed mb-6">
                          {scrapedData.twitter.profile.bio}
                       </p>

                       <div className="grid grid-cols-2 gap-px bg-white/[0.05] rounded-xl overflow-hidden border border-white/[0.05]">
                          <div className="bg-[#121212] p-4 text-center">
                             <div className="text-[18px] font-bold text-white">{scrapedData.twitter.profile.followers || 0}</div>
                             <div className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">Followers</div>
                          </div>
                          <div className="bg-[#121212] p-4 text-center">
                             <div className="text-[18px] font-bold text-white">{scrapedData.twitter.profile.following || 0}</div>
                             <div className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">Following</div>
                          </div>
                       </div>
                    </div>
                 </section>
              )}
           </div>
        </div>

        {/* --- Footer --- */}
        <footer className="pt-24 mt-24 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="flex items-center gap-3">
             <div className="w-7 h-7 rounded-md bg-[#18181B] border border-white/[0.08] flex items-center justify-center">
                <Component className="w-3.5 h-3.5 text-zinc-400" />
             </div>
             <div className="text-[12px] text-zinc-500 font-bold uppercase tracking-[0.1em]">
               System <span className="text-zinc-300">FolioSync</span> OS 1.0
             </div>
          </div>
          
          <div className="flex items-center gap-6">
            {user.socialLinks.map((link) => (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[13px] font-bold text-zinc-600 hover:text-white transition-colors duration-300 uppercase tracking-widest"
              >
                {link.label || link.platform}
              </a>
            ))}
          </div>

          <div className="text-[12px] font-bold text-zinc-700 uppercase tracking-widest">
             © 2026 {user.name}
          </div>
        </footer>
      </main>
    </div>
  );
}
