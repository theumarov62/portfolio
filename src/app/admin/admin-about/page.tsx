"use client";

import { AboutServices } from "@/services/about";
import { useEffect, useState } from "react";
import { AboutPostType } from "@/types";

function PageAdminAbout() {
  const [editModal, setEditModal] = useState<Boolean>(false);
  const [about, setAbout] = useState([]);

  useEffect(() => {
    const aboutGet = async () => {
      const res = await AboutServices.getAbout();
      setAbout(res.data.results);
      console.log(res.data.results);
    };

    aboutGet();
  }, []);

  async function Edit(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault();

    const formData = new FormData(evt.currentTarget);

    try {
      const res = await AboutServices.postAbout(formData);
      console.log("Post res", res.data);
    } catch (err: any) {
      console.error(err.response?.data);
    }
  }

  return (
    <section>
      <div>
        <button className="btn btn-accent" onClick={() => setEditModal(true)}>
          Yangi about qo'shish
        </button>
        {editModal && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="relative w-[420px] p-[1px] rounded-2xl bg-gradient-to-br from-purple-600/40 via-pink-500/30 to-blue-500/40 shadow-[0_0_40px_rgba(139,92,246,0.25)]">
              <div className="bg-[#0A1330]/95 backdrop-blur-xl w-full h-full p-7 rounded-2xl relative border border-white/10">
                {/* CLOSE BUTTON */}
                <button
                  onClick={() => setEditModal(false)}
                  className="absolute top-4 right-4 cursor-pointer text-white/70 hover:text-white transition-all duration-200 text-lg hover:rotate-90"
                >
                  ✕
                </button>

                <h2 className="text-white text-2xl font-semibold mb-5 tracking-wide">
                  Yangi About
                </h2>

                {/* FORM */}
                <form onSubmit={Edit} className="flex flex-col gap-4">
                  {/* NAME */}
                  <input
                    type="text"
                    placeholder="Name"
                    name="name"
                    className="px-3 py-2.5 rounded-lg bg-[#081028]/80 text-white placeholder:text-gray-400 outline-none border border-white/10 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 transition-all duration-200"
                  />

                  {/* ROLE */}
                  <input
                    type="text"
                    placeholder="Role"
                    name="role"
                    className="px-3 py-2.5 rounded-lg bg-[#081028]/80 text-white placeholder:text-gray-400 outline-none border border-white/10 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 transition-all duration-200"
                  />

                  {/* cv_link */}
                  <input
                    type="text"
                    placeholder="Cv link"
                    name="cv_link"
                    className="px-3 py-2.5 rounded-lg bg-[#081028]/80 text-white placeholder:text-gray-400 outline-none border border-white/10 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 transition-all duration-200"
                  />

                  {/* Image */}
                  <input
                    type="file"
                    placeholder="image"
                    name="image"
                    className="px-3 py-2.5 rounded-lg bg-[#081028]/80 text-white placeholder:text-gray-400 outline-none border border-white/10 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 transition-all duration-200"
                  />
                  {/* BIO */}
                  <textarea
                    placeholder="Bio"
                    rows={3}
                    name="bio"
                    className="px-3 py-2.5 rounded-lg bg-[#081028]/80 text-white placeholder:text-gray-400 outline-none border border-white/10 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 transition-all duration-200 resize-none"
                  />

                  {/* BUTTON */}
                  <button
                    type="submit"
                    className="mt-3 cursor-pointer bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white py-2.5 rounded-lg font-medium tracking-wide shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 transition-all duration-300 active:scale-[0.98]"
                  >
                    Save
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}

        <div className="mt-4 flex items-center justify-between">
          {about.map((item) => {
            return (
              <div
                key={item.id}
                className="card bg-[#3c4359] cursor-pointer text-[#c2c2c2] w-75 p-4"
              >
                <h2 className="text-white text-[18px] cursor-text">
                  About nomi: {item.name}
                </h2>
                <p className="text-[14px] cursor-text">Izoh: {item.bio}</p>

                <div className="flex items-center gap-2 mt-4">
                  <button className="btn btn-error">O'chirish</button>
                  <button className="btn btn-accent">Tahrirlash</button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default PageAdminAbout;
