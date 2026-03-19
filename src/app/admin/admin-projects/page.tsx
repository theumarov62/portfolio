"use client";

import { ProjectsServices } from "@/services/projects";
import { ProjectsType } from "@/types";
import { useEffect, useState } from "react";

function PageAdminProjects() {
  const [projectAddModal, setProjectAddModal] = useState<Boolean>(false);
  const [projects, setProjects] = useState<ProjectsType[]>([]);
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
      title: form.title.value,
      description: form.description.value,
      technologies: form.technologies.value,
      demo_link: form.demo_link.value,
      repo_link: form.repo_link.value,
    };

    try {
      const res = await ProjectsServices.postProject(data);
      console.log(res.data);
      setProjectAddModal(false);
    } catch (err: any) {
      console.log("Server xabari:", err.response?.data);
    }
  };
  return (
    <section className="text-white">
      {projectAddModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-[#081028] w-[500px] p-6 rounded-xl shadow-lg">
            <h2 className="text-white text-xl font-semibold mb-4">
              Add Project
            </h2>

            <form onSubmit={handleSubmit}>
              <div className="flex flex-col gap-3">
                <input
                  type="text"
                  name="title"
                  placeholder="Title"
                  className="p-2 rounded bg-[#0A1330] text-white outline-none border border-gray-600 focus:border-purple-500"
                />

                <input
                  type="text"
                  name="description"
                  placeholder="Description"
                  className="p-2 rounded bg-[#0A1330] text-white outline-none border border-gray-600 focus:border-purple-500"
                />

                <input
                  type="text"
                  name="technologies"
                  placeholder="Technologies (e.g. React, Next.js)"
                  className="p-2 rounded bg-[#0A1330] text-white outline-none border border-gray-600 focus:border-purple-500"
                />

                <input
                  type="text"
                  placeholder="Demo Link"
                  name="demo_link"
                  className="p-2 rounded bg-[#0A1330] text-white outline-none border border-gray-600 focus:border-purple-500"
                />

                <input
                  type="text"
                  placeholder="Repo Link"
                  name="repo_link"
                  className="p-2 rounded bg-[#0A1330] text-white outline-none border border-gray-600 focus:border-purple-500"
                />
              </div>
              <div className="flex justify-end mt-5 gap-2">
                <button
                  type="button"
                  onClick={() => setProjectAddModal(false)}
                  className="px-4 py-2 rounded bg-gray-600 cursor-pointer text-white"
                >
                  Bekor qilish
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded bg-purple-600 cursor-pointer text-white"
                >
                  Tasdiqlash
                </button>
              </div>
            </form>
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

        {/* Projects */}
        <div className="flex gap-10 flex-wrap items-center mt-10">
          {projects.map((project) => {
            return (
              <div
                key={project.id}
                className="card bg-[#3c4359] cursor-pointer text-[#c2c2c2] w-75 p-4"
              >
                <h2 className="text-white text-[18px]">
                  Loyiha nomi: {project.title}
                </h2>
                <p className="text-[13px]">Izoh: {project.description}</p>
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

export default PageAdminProjects;
