"use client";

import { useEffect, useState } from "react";
import { SkillsServices } from "@/services/skills";

interface Skill {
  name: string;
  icon: string;
  percentage: number;
  order: number;
}

function getLevelLabel(pct: number): string {
  if (pct >= 90) return "Expert";
  if (pct >= 70) return "Advanced";
  if (pct >= 50) return "Intermediate";
  return "Beginner";
}

function getLevelColor(pct: number): string {
  if (pct >= 90) return "from-cyan-400 to-blue-400";
  if (pct >= 70) return "from-blue-400 to-purple-500";
  if (pct >= 50) return "from-purple-500 to-pink-500";
  return "from-pink-500 to-rose-500";
}

export default function PageSkills() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    SkillsServices.getSkills()
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
        setSkills(sorted);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (!mounted) return null;

  return (
    <section
      id="skills"
      className="relative min-h-screen bg-[#0a0a0f] px-6 py-24 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.02)_1px,transparent_1px)] bg-[size:80px_80px] pointer-events-none" />
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-14">
          <p className="text-cyan-400 font-mono text-sm tracking-[0.3em] uppercase mb-2">
            &lt; Skills /&gt;
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Tech Stack
          </h2>
          <div className="mt-2 w-16 h-[2px] bg-gradient-to-r from-cyan-400 to-transparent" />
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="h-24 rounded-xl bg-white/5 animate-pulse" />
            <div className="h-24 rounded-xl bg-white/5 animate-pulse" />
            <div className="h-24 rounded-xl bg-white/5 animate-pulse" />
            <div className="h-24 rounded-xl bg-white/5 animate-pulse" />
            <div className="h-24 rounded-xl bg-white/5 animate-pulse" />
            <div className="h-24 rounded-xl bg-white/5 animate-pulse" />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {skills.map((skill, i) => (
              <div
                key={i}
                className="group rounded-xl border border-white/10 bg-white/[0.03] p-5 hover:border-cyan-400/40 transition-all duration-300 hover:-translate-y-0.5"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    {skill.icon && (
                      <img
                        src={skill.icon}
                        alt={skill.name}
                        className="w-8 h-8 object-contain group-hover:scale-110 transition-transform duration-300"
                      />
                    )}
                    <p className="text-white font-medium text-sm">
                      {skill.name}
                    </p>
                  </div>
                  <span className="text-xs font-mono text-gray-500 border border-white/10 px-2 py-0.5 rounded">
                    {getLevelLabel(skill.percentage)}
                  </span>
                </div>

                {/* Progress bar — inline style width xavfsiz (server ham bir xil qiymat hisoblaydi) */}
                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full bg-gradient-to-r ${getLevelColor(
                      skill.percentage
                    )}`}
                    style={{ width: `${skill.percentage}%` }}
                  />
                </div>
                <div className="flex justify-between mt-1.5">
                  <span className="text-gray-600 text-xs font-mono">
                    {skill.name}
                  </span>
                  <span className="text-gray-500 text-xs font-mono">
                    {skill.percentage}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
