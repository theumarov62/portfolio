"use client";
import { useEffect, useState } from "react";
import { AboutServices } from "@/services/about";

interface AboutType {
  id: number;
  name: string;
  role: string;
  bio: string;
  image: string;
  cv_link: string;
}

export default function PageHome() {
  const [about, setAbout] = useState<AboutType | null>(null);

  useEffect(() => {
    const getAbout = async () => {
      const res = await AboutServices.getAbout();
      setAbout(res.data.results[0]);
    };
    getAbout();
  }, []);

  return (
    <main className="min-h-screen bg-[#050d1f] text-[#e2e8f0] overflow-x-hidden">
      {/* NAV */}
      <nav className="flex justify-between items-center px-12 py-5 border-b border-white/5">
        <span className="text-[#a78bfa] text-lg font-medium">Portfolio</span>
        <div className="flex gap-8">
          <a
            href="#about"
            className="text-sm text-[#94a3b8] hover:text-[#a78bfa] transition-colors"
          >
            Haqida
          </a>
          <a
            href="#projects"
            className="text-sm text-[#94a3b8] hover:text-[#a78bfa] transition-colors"
          >
            Loyihalar
          </a>
          <a
            href="#contact"
            className="text-sm text-[#94a3b8] hover:text-[#a78bfa] transition-colors"
          >
            Aloqa
          </a>
        </div>
      </nav>

      {/* HERO */}
      <section className="flex items-center justify-between px-12 py-24 gap-8">
        {/* LEFT */}
        <div className="flex-1">
          <span className="inline-block text-xs text-[#a78bfa] border border-[#a78bfa]/50 px-3 py-1 rounded-full mb-5">
            {about?.role ?? "Frontend Developer"}
          </span>

          <h1 className="text-5xl font-medium leading-tight mb-4">
            Salom, men{" "}
            <span className="text-[#a78bfa]">{about?.name ?? "..."}</span>
          </h1>

          <p className="text-sm text-[#94a3b8] leading-relaxed max-w-lg mb-8">
            {about?.bio ?? ""}
          </p>

          <div className="flex gap-4">
            <a
              href="#projects"
              className="px-6 py-2.5 bg-[#7c3aed] hover:bg-[#6d28d9] text-white text-sm rounded-lg transition-colors"
            >
              Loyihalarim
            </a>
            {about?.cv_link && (
              <a
                href={about.cv_link}
                target="_blank"
                rel="noreferrer"
                className="px-6 py-2.5 text-[#a78bfa] border border-[#a78bfa]/50 text-sm rounded-lg hover:bg-[#a78bfa]/10 transition-colors"
              >
                CV yuklab olish
              </a>
            )}
          </div>
        </div>

        {/* RIGHT — rasm */}
        <div className="w-52 h-52 rounded-full border-2 border-[#7c3aed] overflow-hidden flex-shrink-0 bg-[#1e1b4b]">
          {about?.image ? (
            <img
              src={about.image}
              alt={about.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-6xl">
              👨‍💻
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
