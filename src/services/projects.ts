import { api } from "@/api/axios";
import { ProjectsType } from "@/types";

const ProjectsServices = {
  postProject: (data: ProjectsType) => {
    return api.post("/api/projects/", data);
  },

  getProject: () => {
    return api.get("/api/projects");
  },

  getProjectId: (id: number) => {
    return api.get(`/api/projects/${id}`);
  },
};

export { ProjectsServices };
