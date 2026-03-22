"use client";

import { useEffect, useState } from "react";
import { ProjectsServices } from "@/services/projects";

interface Project {
  title: string;
  description: string;
  image: string;
  technologies: string;
  demo_link: string;
  repo_link: string;
  order: number;
}

function parseTech(tech: string): string[] {
  if (!tech) return [];
  return tech
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);
}

export default function PageProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    ProjectsServices.getProject()
      .then((res) => {
        const raw = res.data;
        const list = Array.isArray(raw)
          ? raw
          : Array.isArray(raw?.results)
          ? raw.results
          : Array.isArray(raw?.data)
          ? raw.data
          : [];
        const sorted = [...list].sort((a, b) => a.order - b.order);
        setProjects(sorted);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (!mounted) return null;

  return (
    <section
      id="projects"
      className="relative min-h-screen bg-[#0a0a0f] px-6 py-24 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(rgba(0,255,255,0.04)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <p className="text-cyan-400 font-mono text-sm tracking-[0.3em] uppercase mb-2">
            &lt; Projects /&gt;
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-white">My Work</h2>
          <div className="mt-2 w-16 h-[2px] bg-gradient-to-r from-cyan-400 to-transparent" />
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="h-72 rounded-2xl bg-white/5 animate-pulse" />
            <div className="h-72 rounded-2xl bg-white/5 animate-pulse" />
            <div className="h-72 rounded-2xl bg-white/5 animate-pulse" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, i) => {
              const techList = parseTech(project.technologies);
              return (
                <div
                  key={i}
                  className="group relative rounded-2xl border border-white/10 bg-white/[0.03] overflow-hidden hover:border-cyan-400/50 transition-all duration-500 hover:-translate-y-1"
                >
                  {project.image && (
                    <div className="relative overflow-hidden h-44">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 grayscale group-hover:grayscale-0"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-transparent to-transparent" />
                    </div>
                  )}

                  <div className="p-5 space-y-3">
                    <h3 className="text-white font-semibold text-lg group-hover:text-cyan-300 transition-colors duration-300">
                      {project.title}
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed line-clamp-2">
                      {project.description}
                    </p>

                    {techList.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {techList.map((tech) => (
                          <span
                            key={tech}
                            className="text-xs font-mono text-cyan-400/70 bg-cyan-400/10 px-2 py-0.5 rounded"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="flex gap-4 pt-1">
                      {project.repo_link && (
                        <a
                          href={project.repo_link}
                          target="_blank"
                          rel="noreferrer"
                          className="text-gray-400 hover:text-white text-sm flex items-center gap-1.5 transition-colors duration-200"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                          </svg>
                          Repo
                        </a>
                      )}
                      {project.demo_link && (
                        <a
                          href={project.demo_link}
                          target="_blank"
                          rel="noreferrer"
                          className="text-gray-400 hover:text-cyan-400 text-sm flex items-center gap-1.5 transition-colors duration-200"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={1.5}
                              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                            />
                          </svg>
                          Demo
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
