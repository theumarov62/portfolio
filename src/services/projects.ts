import { api } from "@/api/axios";
import { ProjectPutType, ProjectsType } from "@/types";

const ProjectsServices = {
  postProject: (data: ProjectsType) => {
    return api.post("/api/projects/", data);
  },

  getProject: () => {
    return api.get("/api/projects");
  },

  getProjectId: (id: number) => {
    return api.get(`/api/projects/${id}/`);
  },
  deleteProjectId: (id: number) => {
    return api.delete(`/api/projects/${id}/`);
  },

  putProjectId: (id: number, data: ProjectPutType) => {
    return api.put(`/api/projects/${id}/`, data);
  },
};

export { ProjectsServices };
