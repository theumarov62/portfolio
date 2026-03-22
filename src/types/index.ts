import React from "react";

type LayoutProps = {
  children: React.ReactNode;
};

type ProjectsType = {
  id?: number;
  title: string;
  description: string;
  image?: string;
  technologies: string;
  demo_link: string;
  repo_link: string;
  order?: number;
};

type ProjectPutType = {
  title: string;
  description: string;
  image?: string;
  technologies: string;
  demo_link: string;
  repo_link: string;
  order?: number;
};

type AboutPostType = {
  name: string;
  bio: string;
  image?: string;
  role: string;
  cv_link: string;
  order?: string;
};

type AboutPutType = {
  name: string;
  role: string;
  bio: string;
  image: string;
  cv_link: string;
};

type AboutType = {
  id: number;
  name: string;
  role: string;
  bio: string;
  image?: string;
  cv_link: string;
};

type SkillsPostType = {
  name: string;
  icon: string;
  percentage: number;
};

type SkillsType = {
  id: number;
  name: string;
  icon: string;
  percentage: number;
};

type ExperienceType = {
  id: number;
  role: string;
  company: string;
  start_date: string;
  end_date: string;
  description: string;
};
export type {
  LayoutProps,
  ProjectsType,
  ProjectPutType,
  AboutPostType,
  AboutPutType,
  SkillsPostType,
  ExperienceType,
  AboutType,
  SkillsType,
};
