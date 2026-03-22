"use client";

import { ProjectsServices } from "@/services/projects";
import { ProjectPutType, ProjectsType } from "@/types";
import { log } from "console";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

function PageAdminProjects() {
  const [projectAddModal, setProjectAddModal] = useState<boolean>(false);
  const [projects, setProjects] = useState<ProjectsType[]>([]);
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [editModal, setEditModal] = useState<boolean>(false);
  const [editData, setEditData] = useState({
    title: "",
    description: "",
    technologies: "",
    demo_link: "",
    repo_link: "",
  });
  const [id, setId] = useState<number>(0);
  useEffect(() => {
    const getProjects = async () => {
      const projectsApi = await ProjectsServices.getProject();
      setProjects(projectsApi.data.results);
      console.log(projects);
    };

    getProjects();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;

    const data = {
      title: form.title,
      description: form.description,
      technologies: form.technologies,
      demo_link: form.demo_link,
      repo_link: form.repo_link,
    };

    try {
      const res = await ProjectsServices.postProject(data);
      console.log(res.data);
      toast.success("Muvaffaqiyatli qo'shildi!");
      setProjectAddModal(false);
    } catch (err: any) {
      console.log("Server xabari:", err.response?.data);
    }
  };

  async function ProjectDelete(id: number) {
    try {
      const res = await ProjectsServices.deleteProjectId(id);
      console.log(res.data);
      toast.success("Muvaffaqiyatli o'chirildi!");
      setDeleteModal(false);
    } catch (err: any) {
      console.log(err.response?.data);
    }
  }

  async function ProjectEdit() {
    try {
      ProjectsServices.putProjectId(id, {
        title: editData.title,
        description: editData.description,
        technologies: editData.technologies,
        demo_link: editData.demo_link,
        repo_link: editData.repo_link,
      });
      toast.success("Muvaffaqiyatli tahrirlandi!");
    } catch (err: any) {
      console.log(err.response?.data);
    }
  }
  return (
    <section className="text-white">
      {projectAddModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-[#081028] w-[500px] p-6 rounded-xl shadow-lg">
            <h2 className="text-white text-xl font-semibold mb-4">
              Add Project
            </h2>

            <form onSubmit={handleSubmit}>
              <div className="flex flex-col gap-4">
                <input
                  type="text"
                  name="title"
                  placeholder="Title"
                  className="px-3 py-2.5 rounded-lg bg-[#081028]/80 text-white placeholder:text-gray-400 outline-none border border-white/10 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 transition-all duration-200"
                />

                <input
                  type="text"
                  name="description"
                  placeholder="Description"
                  className="px-3 py-2.5 rounded-lg bg-[#081028]/80 text-white placeholder:text-gray-400 outline-none border border-white/10 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 transition-all duration-200"
                />

                <input
                  type="text"
                  name="technologies"
                  placeholder="Technologies (e.g. React, Next.js)"
                  className="px-3 py-2.5 rounded-lg bg-[#081028]/80 text-white placeholder:text-gray-400 outline-none border border-white/10 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 transition-all duration-200"
                />

                <input
                  type="text"
                  placeholder="Demo Link"
                  name="demo_link"
                  className="px-3 py-2.5 rounded-lg bg-[#081028]/80 text-white placeholder:text-gray-400 outline-none border border-white/10 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 transition-all duration-200"
                />

                <input
                  type="text"
                  placeholder="Repo Link"
                  name="repo_link"
                  className="px-3 py-2.5 rounded-lg bg-[#081028]/80 text-white placeholder:text-gray-400 outline-none border border-white/10 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 transition-all duration-200"
                />
              </div>

              <div className="flex justify-end mt-6 gap-3">
                <button
                  type="button"
                  onClick={() => setProjectAddModal(false)}
                  className="px-4 py-2.5 cursor-pointer rounded-lg bg-white/10 hover:bg-white/20 border border-white/10 text-white/80 hover:text-white transition-all duration-200 backdrop-blur-md"
                >
                  Bekor qilish
                </button>

                <button
                  type="submit"
                  className="px-5 py-2.5 cursor-pointer rounded-lg bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white font-medium shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 transition-all duration-300 active:scale-[0.97]"
                >
                  Tasdiqlash
                </button>
              </div>
            </form>
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
                onClick={() => ProjectDelete(id)}
                className="px-4 py-2 rounded cursor-pointer bg-red-600 text-white"
              >
                O‘chirish
              </button>
            </div>
          </div>
        </div>
      )}

      {editModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-[#0A1330] p-6 rounded-xl w-[420px]">
            <h2 className="text-white text-lg font-semibold mb-4">
              Projectni tahrirlash
            </h2>

            <div className="flex flex-col gap-3">
              <input
                type="text"
                placeholder="Title"
                value={editData.title}
                onChange={(e) =>
                  setEditData({ ...editData, title: e.target.value })
                }
                className="p-2 rounded bg-[#0f1a3a] text-white outline-none"
              />

              <textarea
                placeholder="Description"
                value={editData.description}
                onChange={(e) =>
                  setEditData({ ...editData, description: e.target.value })
                }
                className="p-2 rounded bg-[#0f1a3a] text-white outline-none h-20 resize-none"
              />

              <input
                type="text"
                placeholder="Technologies (masalan: React, Next.js)"
                value={editData.technologies}
                onChange={(e) =>
                  setEditData({ ...editData, technologies: e.target.value })
                }
                className="p-2 rounded bg-[#0f1a3a] text-white outline-none"
              />

              <input
                type="text"
                placeholder="Demo link"
                value={editData.demo_link}
                onChange={(e) =>
                  setEditData({ ...editData, demo_link: e.target.value })
                }
                className="p-2 rounded bg-[#0f1a3a] text-white outline-none"
              />

              <input
                type="text"
                placeholder="Repository link"
                value={editData.repo_link}
                onChange={(e) =>
                  setEditData({ ...editData, repo_link: e.target.value })
                }
                className="p-2 rounded bg-[#0f1a3a] text-white outline-none"
              />
            </div>

            <div className="flex justify-end gap-3 mt-5">
              <button
                onClick={() => setEditModal(false)}
                className="px-4 py-2 rounded cursor-pointer bg-gray-600 text-white"
              >
                Bekor qilish
              </button>

              <button
                onClick={() => {
                  ProjectEdit();
                }}
                className="px-4 py-2 cursor-pointer rounded bg-blue-600 text-white"
              >
                Saqlash
              </button>
            </div>
          </div>
        </div>
      )}

      <div>
        <button
          className="btn btn-accent"
          onClick={() => setProjectAddModal(true)}
        >
          Yangi Loyiha qo'shish
        </button>

        <h2 className="text-center text-[30px]">Loyihalaringiz</h2>
        <p className="text-[16px] text-center text-[#7e7e7e]">
          {projects.length} ta loyiha.
        </p>
        {/* Projects */}
        <div className="flex gap-10 flex-wrap items-center mt-10">
          {projects.map((project) => {
            return (
              <div
                key={project.id}
                className="card bg-[#3c4359] cursor-pointer text-[#c2c2c2] w-75 p-4"
              >
                <h2 className="text-white text-[18px] cursor-text">
                  Loyiha nomi: {project.title}
                </h2>
                <p className="text-[14px] cursor-text">
                  Izoh: {project.description}
                </p>
                {/* Socials */}
                <div className="flex items-center gap-2">
                  <Link
                    href={project.demo_link}
                    className="text-[#fff] underline"
                  >
                    Demo
                  </Link>
                  <Link
                    href={project.repo_link}
                    className="text-[#fff] underline"
                  >
                    Repository
                  </Link>
                </div>
                <div className="flex items-center gap-2 mt-4">
                  <button
                    className="btn btn-error"
                    onClick={() => {
                      if (project.id !== undefined) {
                        setDeleteModal(true);
                        setId(project.id);
                      }
                    }}
                  >
                    O'chirish
                  </button>
                  <button
                    className="btn btn-accent"
                    onClick={() => {
                      if (project.id !== undefined) {
                        setEditModal(true);
                        setId(project.id);
                      }
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
    </section>
  );
}

export default PageAdminProjects;
