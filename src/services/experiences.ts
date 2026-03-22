import { api } from "@/api/axios";

export const ExperiencesServices = {
  getExperiences: () => {
    return api.get("/api/experiences/");
  },

  deleteExperience: (id: number) => {
    return api.delete(`/api/experiences/${id}/`);
  },

  postExperience: (data: any) => {
    return api.post("/api/experiences/", data);
  },

  putExperience: (id: number, data: any) => {
    return api.put(`/api/experiences/${id}/`, data);
  },
};
