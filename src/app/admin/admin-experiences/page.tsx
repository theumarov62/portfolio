"use client";
import { ExperiencesServices } from "@/services/experiences";
import { ExperienceType } from "@/types";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

function PageAdminExperiences() {
  const [id, setId] = useState<number>(0);
  const [experiences, setExperiences] = useState<ExperienceType[]>([]);
  const [addModal, setAddModal] = useState<boolean>(false);
  const [editModal, setEditModal] = useState<boolean>(false);
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [submit, setSubmit] = useState<boolean>(false);

  const [editData, setEditData] = useState<ExperienceType>({
    id: 0,
    company: "",
    role: "",
    start_date: "",
    end_date: "",
    description: "",
  });
  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const res = await ExperiencesServices.getExperiences();
        setExperiences(res.data.results);
        console.log(res.data.results);
      } catch (err: any) {
        console.log(err.response?.data);
      }
    };

    fetchExperiences();
  }, []);
  async function Add(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    if (submit) return;
    setSubmit(true);

    try {
      const res = await ExperiencesServices.postExperience(formData);
      console.log(res.data);
      toast.success("Muvaffaqiyatli qo'shildi!");
      setAddModal(false);
    } catch (err: any) {
      console.log(err.response?.data);
    } finally {
      setSubmit(false);
    }
  }

  async function Edit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    if (submit) return;
    setSubmit(true);
    try {
      const res = await ExperiencesServices.putExperience(id, formData);
      console.log(res.data);
      toast.success("Muvaffaqiyatli tahrirlandi!");
      setEditModal(false);
    } catch (err: any) {
      console.log(err.response?.data);
    } finally {
      setEditModal(false);
      setSubmit(false);
    }
  }

  async function Delete() {
    if (submit) return;
    setSubmit(true);
    try {
      const res = await ExperiencesServices.deleteExperience(id);
      console.log(res.data);
      toast.success("Muvaffaqiyatli o'chirildi!");
      setDeleteModal(false);
    } catch (err: any) {
      console.log(err.response?.data);
    } finally {
      setSubmit(false);
    }
  }
  return (
    <section>
      <div>
        <div>
          <button className="btn-accent btn" onClick={() => setAddModal(true)}>
            Yangi experiences qo'shish
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
                  <form onSubmit={Add} className="flex flex-col gap-4">
                    {/* COMPANY */}
                    <input
                      type="text"
                      placeholder="Company"
                      name="company"
                      className="px-3 py-2.5 rounded-lg bg-[#081028]/80 text-white placeholder:text-gray-400 outline-none border border-white/10 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 transition-all duration-200"
                    />

                    {/* ROLE */}
                    <input
                      type="text"
                      placeholder="Role"
                      name="role"
                      className="px-3 py-2.5 rounded-lg bg-[#081028]/80 text-white placeholder:text-gray-400 outline-none border border-white/10 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 transition-all duration-200"
                    />

                    {/* START DATE */}
                    <input
                      type="text"
                      placeholder="Start Date"
                      name="start_date"
                      className="px-3 py-2.5 rounded-lg bg-[#081028]/80 text-white placeholder:text-gray-400 outline-none border border-white/10 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 transition-all duration-200"
                    />
                    {/* END DATE */}
                    <input
                      type="text"
                      placeholder="End Date"
                      name="end_date"
                      className="px-3 py-2.5 rounded-lg bg-[#081028]/80 text-white placeholder:text-gray-400 outline-none border border-white/10 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 transition-all duration-200"
                    />
                    {/* DESCRIPTION */}
                    <textarea
                      placeholder="Description"
                      rows={3}
                      name="description"
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
                  <form onSubmit={Edit} className="flex flex-col gap-4">
                    {/* Company */}
                    <input
                      type="text"
                      placeholder="Company"
                      name="company"
                      value={editData.company}
                      onChange={(e) =>
                        setEditData({ ...editData, company: e.target.value })
                      }
                      className="px-3 py-2.5 rounded-lg bg-[#081028]/80 text-white placeholder:text-gray-400 outline-none border border-white/10 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 transition-all duration-200"
                    />
                    {/* Role */}
                    <input
                      type="text"
                      placeholder="Role"
                      name="role"
                      value={editData.role}
                      onChange={(e) =>
                        setEditData({ ...editData, role: e.target.value })
                      }
                      className="px-3 py-2.5 rounded-lg bg-[#081028]/80 text-white placeholder:text-gray-400 outline-none border border-white/10 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 transition-all duration-200"
                    />

                    {/* Start Date */}
                    <input
                      type="text"
                      placeholder="Start Date"
                      value={editData.start_date}
                      onChange={(e) =>
                        setEditData({ ...editData, start_date: e.target.value })
                      }
                      name="start_date"
                      className="px-3 py-2.5 rounded-lg bg-[#081028]/80 text-white placeholder:text-gray-400 outline-none border border-white/10 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 transition-all duration-200"
                    />

                    {/* End date */}
                    <input
                      type="text"
                      placeholder="End Date"
                      value={editData.end_date}
                      onChange={(e) =>
                        setEditData({ ...editData, end_date: e.target.value })
                      }
                      name="end_date"
                      className="px-3 py-2.5 rounded-lg bg-[#081028]/80 text-white placeholder:text-gray-400 outline-none border border-white/10 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 transition-all duration-200"
                    />

                    {/* Description */}
                    <textarea
                      placeholder="Description"
                      rows={3}
                      name="description"
                      value={editData.description}
                      onChange={(e) =>
                        setEditData({
                          ...editData,
                          description: e.target.value,
                        })
                      }
                      className="px-3 py-2.5 rounded-lg bg-[#081028]/80 text-white placeholder:text-gray-400 outline-none border border-white/10 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 transition-all duration-200 resize-none"
                    />

                    {/* BUTTON */}
                    <button
                      type="submit"
                      disabled={submit}
                      className="mt-3 cursor-pointer bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white py-2.5 rounded-lg font-medium tracking-wide shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 transition-all duration-300 active:scale-[0.98]"
                    >
                      {submit ? "Saqlanmoqda..." : "Saqlash"}
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
                    {submit ? "O'chirilmoqda..." : "O'chirish"}
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="mt-6 flex flex-wrap gap-4">
            {experiences.map((item) => {
              return (
                <div
                  key={item.id}
                  className="rounded-2xl flex flex-col justify-between h-50 p-4 bg-[#3c4359] cursor-pointer text-[#c2c2c2] w-75"
                >
                  <div>
                    <h2 className="text-white text-[18px] cursor-text">
                      Experiences: {item.company}
                    </h2>
                    <p className="text-[14px] cursor-text">
                      Izoh: {item.description}
                    </p>

                    <p className="text-[14px] cursor-text">
                      Lavozim: {item.role}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 mt-4">
                    <button
                      className="btn btn-error"
                      onClick={() => {
                        setDeleteModal(true);
                        setId(item.id);
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

export default PageAdminExperiences;
