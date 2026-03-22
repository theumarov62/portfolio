"use client";

import { useEffect, useState } from "react";
import { ExperiencesServices } from "@/services/experiences";

interface Experience {
  role: string;
  company: string;
  start_date: string;
  end_date: string;
  description: string;
}

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function formatDate(dateStr: string): string {
  if (!dateStr) return "Present";

  const parts = dateStr.split("-");
  const year = parts[0];
  const month = parts[1] ? parseInt(parts[1], 10) - 1 : 0;
  return `${MONTHS[month]} ${year}`;
}

export default function PageExperiences() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    ExperiencesServices.getExperiences()
      .then((res) => {
        const raw = res.data;
        const list = Array.isArray(raw)
          ? raw
          : Array.isArray(raw?.results)
          ? raw.results
          : Array.isArray(raw?.data)
          ? raw.data
          : [];
        setExperiences(list);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (!mounted) return null;

  return (
    <section
      id="experience"
      className="relative min-h-screen bg-[#0a0a0f] px-6 py-24 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(rgba(0,255,255,0.03)_1px,transparent_1px)] bg-[size:48px_48px] pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-64 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-16">
          <p className="text-cyan-400 font-mono text-sm tracking-[0.3em] uppercase mb-2">
            &lt; Experience /&gt;
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Work History
          </h2>
          <div className="mt-2 w-16 h-[2px] bg-gradient-to-r from-cyan-400 to-transparent" />
        </div>

        {loading ? (
          <div className="space-y-6">
            <div className="h-36 rounded-2xl bg-white/5 animate-pulse" />
            <div className="h-36 rounded-2xl bg-white/5 animate-pulse" />
            <div className="h-36 rounded-2xl bg-white/5 animate-pulse" />
          </div>
        ) : (
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-6 top-2 bottom-2 w-px bg-gradient-to-b from-cyan-400/60 via-blue-500/30 to-transparent" />

            <div className="space-y-10">
              {experiences.map((exp, i) => {
                const isCurrent = !exp.end_date || exp.end_date === "";
                return (
                  <div key={i} className="relative pl-16">
                    {/* Dot */}
                    <div className="absolute left-[18px] top-1.5">
                      <span className="block w-4 h-4 rounded-full border-2 border-cyan-400 bg-[#0a0a0f] relative z-10" />
                      {isCurrent && (
                        <span className="absolute inset-0 w-4 h-4 rounded-full bg-cyan-400/30 animate-ping" />
                      )}
                    </div>

                    {/* Card */}
                    <div className="group rounded-2xl border border-white/10 bg-white/[0.03] p-6 hover:border-cyan-400/40 transition-all duration-300">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-3">
                        <div>
                          <h3 className="text-white font-semibold text-lg group-hover:text-cyan-300 transition-colors duration-300">
                            {exp.role}
                          </h3>
                          <p className="text-cyan-400 text-sm font-mono">
                            {exp.company}
                          </p>
                        </div>

                        <div className="flex flex-col items-start sm:items-end gap-1 flex-shrink-0">
                          {/* ✅ suppressHydrationWarning — date ko'rsatish uchun xavfsiz */}
                          <span
                            suppressHydrationWarning
                            className="text-gray-500 text-xs font-mono whitespace-nowrap"
                          >
                            {formatDate(exp.start_date)}
                            {" → "}
                            {isCurrent ? "Present" : formatDate(exp.end_date)}
                          </span>
                          {isCurrent && (
                            <span className="text-xs font-mono bg-cyan-400/10 text-cyan-400 border border-cyan-400/30 px-2 py-0.5 rounded-full">
                              Current
                            </span>
                          )}
                        </div>
                      </div>

                      <p className="text-gray-400 text-sm leading-relaxed">
                        {exp.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
