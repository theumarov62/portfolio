"use client";

import { useEffect, useState } from "react";
import { AboutServices } from "@/services/about";

interface About {
  name: string;
  role: string;
  bio: string;
  image: string;
  cv_link: string;
}

export default function PageAbout() {
  const [about, setAbout] = useState<About[]>([]);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    AboutServices.getAbout()
      .then((res) => {
        const raw = res.data;
        const list = Array.isArray(raw)
          ? raw
          : Array.isArray(raw?.results)
          ? raw.results
          : Array.isArray(raw?.data)
          ? raw.data
          : [];
        setAbout(list);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (!mounted) return null;

  if (loading) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-[#0a0a0f]">
        <div className="flex gap-2">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce [animation-delay:0ms]" />
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce [animation-delay:150ms]" />
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce [animation-delay:300ms]" />
        </div>
      </section>
    );
  }

  if (!about.length) return null;

  return (
    <section
      id="about"
      className="relative min-h-screen flex items-center bg-[#0a0a0f] overflow-hidden px-6 py-24"
    >
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.03)_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      {about.map((item, i) => (
        <div
          key={i}
          className="relative z-10 max-w-6xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-16 items-center"
        >
          {/* Avatar */}
          <div className="flex justify-center md:justify-end">
            <div className="relative group">
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-cyan-500 via-blue-500 to-purple-600 opacity-60 blur-sm group-hover:opacity-90 transition-opacity duration-500" />
              <img
                src={item.image}
                alt="Img none"
                className="relative w-64 h-64 md:w-80 md:h-80 object-cover rounded-2xl grayscale group-hover:grayscale-0 transition-all duration-500"
              />
              <span className="absolute -top-3 -left-3 w-6 h-6 border-t-2 border-l-2 border-cyan-400" />
              <span className="absolute -bottom-3 -right-3 w-6 h-6 border-b-2 border-r-2 border-cyan-400" />
            </div>
          </div>

          {/* Text */}
          <div className="space-y-6">
            <div>
              <p className="text-cyan-400 text-sm font-mono tracking-[0.3em] uppercase mb-2">
                &lt; About Me /&gt;
              </p>
              <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                {item.name}
              </h1>
              <p className="mt-2 text-lg text-cyan-300 font-mono">
                {item.role}
              </p>
            </div>

            <p className="text-gray-400 leading-relaxed text-base max-w-lg">
              {item.bio}
            </p>

            {item.cv_link && (
              <a
                href={item.cv_link}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-cyan-400/10 border border-cyan-400/30 text-cyan-300 text-sm font-mono hover:bg-cyan-400/20 hover:border-cyan-400 transition-all duration-300 group"
              >
                <svg
                  className="w-4 h-4 group-hover:translate-y-0.5 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                  />
                </svg>
                Download CV
              </a>
            )}
          </div>
        </div>
      ))}
    </section>
  );
}
