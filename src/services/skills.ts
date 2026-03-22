import { api } from "@/api/axios";
import { SkillsPostType } from "@/types";

export const SkillsServices = {
  getSkills: () => {
    return api.get("/api/skills/");
  },

  deleteSkill: (id: number) => {
    return api.delete(`/api/skills/${id}/`);
  },

  postSkill: (data: SkillsPostType) => {
    return api.post("/api/skills/", data);
  },

  putSkill: (id: number, data: SkillsPostType) => {
    return api.put(`/api/skills/${id}/`, data);
  },
};
