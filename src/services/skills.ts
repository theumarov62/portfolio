import { api } from "@/api/axios";
import { SkillsPostType } from "@/types";

export const SkillsServices = {
  getSkills: () => {
    return api.get("/api/skills/");
  },

  deleteSkill: (id: number) => {
    return api.delete(`/api/skills/${id}/`);
  },

  postSkill: (data: object) => {
    return api.post("/api/skills/", data);
  },

  putSkill: (id: number, data: object) => {
    return api.put(`/api/skills/${id}/`, data);
  },
};
