"use client";
import { SkillsServices } from "@/services/skills";
import { SkillsType } from "@/types";

import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

function PageAdminSkills() {
  const [skills, setSkills] = useState<SkillsType[]>([]);

  const [editModal, setEditModal] = useState<boolean>(false);
  const [addModal, setAddModal] = useState<boolean>(false);
  const [id, setId] = useState<number>(0);
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  useEffect(() => {
    async function getSkills() {
      const res = await SkillsServices.getSkills();
      setSkills(res.data.results);

      console.log(res.data.results);
    }

    getSkills();
  }, []);

  async function Add(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    try {
      const res = await SkillsServices.postSkill(formData);
      console.log("Post res", res.data);
      toast.success("Muvaffaqiyatli qo'shildi!");
      setAddModal(false);
    } catch (err: any) {
      console.error(err.response?.data);
    }
  }

  async function Edit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    try {
      const res = await SkillsServices.putSkill(id, formData);
      console.log("Put res", res.data);
      toast.success("Muvaffaqiyatli tahrirlandi!");
      setEditModal(false);
    } catch (err: any) {
      console.error(err.response?.data);
    }
  }

  async function Delete() {
    try {
      const res = await SkillsServices.deleteSkill(id);
      console.log("Delete res", res.data);
      toast.success("Muvaffaqiyatli o'chirildi!");
      setDeleteModal(false);
    } catch (err: any) {
      console.error(err.response?.data);
    }
  }

  return (
    <section>
      <div>
        <div>
          <button className="btn btn-accent" onClick={() => setAddModal(true)}>
            Yangi Skill qo'shish
          </button>
        </div>
        <div>
          {addModal && (
            <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
              <div className="relative w-[420px] p-[1px] rounded-2xl bg-gradient-to-br from-purple-600/40 via-pink-500/30 to-blue-500/40 shadow-[0_0_40px_rgba(139,92,246,0.25)]">
                <div className="bg-[#0A1330]/95 backdrop-blur-xl w-full h-full p-7 rounded-2xl relative border border-white/10">
                  {/* CLOSE BUTTON */}
                  <button
                    onClick={() => setAddModal(false)}
                    className="absolute top-4 right-4 cursor-pointer text-white/70 hover:text-white transition-all duration-200 text-lg hover:rotate-90"
                  >
                    ✕
                  </button>

                  <h2 className="text-white text-2xl font-semibold mb-5 tracking-wide">
                    Yangi About
                  </h2>

                  {/* FORM */}
                  <form className="flex flex-col gap-4" onSubmit={Add}>
                    {/* NAME */}
                    <input
                      type="text"
                      placeholder="Name"
                      name="name"
                      className="px-3 py-2.5 rounded-lg bg-[#081028]/80 text-white placeholder:text-gray-400 outline-none border border-white/10 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 transition-all duration-200"
                    />

                    {/* Image */}
                    <input
                      type="file"
                      placeholder="image"
                      name="icon"
                      className="px-3 py-2.5 rounded-lg bg-[#081028]/80 text-white placeholder:text-gray-400 outline-none border border-white/10 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 transition-all duration-200"
                    />

                    {/* Percentage */}
                    <input
                      type="number"
                      min={0}
                      max={100}
                      placeholder="Percentage"
                      name="percentage"
                      className="px-3 py-2.5 rounded-lg bg-[#081028]/80 text-white placeholder:text-gray-400 outline-none border border-white/10 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 transition-all duration-200"
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
                    Tahrirlash
                  </h2>

                  {/* FORM */}
                  <form className="flex flex-col gap-4" onSubmit={Edit}>
                    {/* NAME */}
                    <input
                      type="text"
                      placeholder="Name"
                      name="name"
                      className="px-3 py-2.5 rounded-lg bg-[#081028]/80 text-white placeholder:text-gray-400 outline-none border border-white/10 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 transition-all duration-200"
                    />

                    {/* Image */}
                    <input
                      type="file"
                      placeholder="image"
                      name="icon"
                      className="px-3 py-2.5 rounded-lg bg-[#081028]/80 text-white placeholder:text-gray-400 outline-none border border-white/10 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 transition-all duration-200"
                    />

                    {/* Percentage */}
                    <input
                      type="number"
                      min={0}
                      max={100}
                      placeholder="Percentage"
                      name="percentage"
                      className="px-3 py-2.5 rounded-lg bg-[#081028]/80 text-white placeholder:text-gray-400 outline-none border border-white/10 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 transition-all duration-200"
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

          {deleteModal && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
              <div className="bg-[#0A1330] p-6 rounded-xl w-[350px]">
                <h2 className="text-white text-lg font-semibold mb-3">
                  O‘chirishni tasdiqlaysizmi?
                </h2>

                <p className="text-gray-400 text-sm mb-5">
                  Bu amalni bekor qilib bo‘lmaydi!
                </p>

                <div className="flex justify-end gap-3">
                  <button
                    onClick={() => setDeleteModal(false)}
                    className="px-4 py-2 rounded cursor-pointer bg-gray-600 text-white"
                  >
                    Bekor qilish
                  </button>

                  <button
                    className="px-4 py-2 rounded cursor-pointer bg-red-600 text-white"
                    onClick={() => Delete()}
                  >
                    O‘chirish
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="flex flex-wrap gap-4 mt-4">
            {skills.map((item) => {
              return (
                <div
                  key={item.id}
                  className="rounded-2xl flex-col flex justify-between h-50 p-4 bg-[#3c4359] text-[#c2c2c2] w-75"
                >
                  <div>
                    <h2 className="text-white text-[18px] cursor-text">
                      Skill nomi: {item.name}
                    </h2>
                    <img
                      src={item.icon}
                      alt={item.icon ? item.name : "No image"}
                      className="w-8 h-8 rounded-full"
                    />

                    <p className="text-[14px] cursor-text">
                      Foiz: {item.percentage}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      className="btn btn-error"
                      onClick={() => {
                        setId(item.id);
                        setDeleteModal(true);
                      }}
                    >
                      O'chirish
                    </button>
                    <button
                      className="btn btn-accent"
                      onClick={() => {
                        setEditModal(true);
                        setId(item.id);
                      }}
                    >
                      Tahrirlash
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default PageAdminSkills;
