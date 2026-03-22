import { api } from "@/api/axios";
import { AboutPostType, AboutPutType } from "@/types";

export const AboutServices = {
  getAbout: () => {
    return api.get("/api/about/");
  },

  getAboutId: (id: number) => {
    return api.get(`/api/about/${id}`);
  },

  postAbout: (data: AboutPostType) => {
    return api.post("/api/about/", data);
  },

  deleteAboutId: (id: number) => {
    return api.delete(`/api/about/${id}/`);
  },

  putAboutId: (id: number, data: AboutPutType) => {
    return api.put(`/api/about/${id}/`, data);
  },
};
