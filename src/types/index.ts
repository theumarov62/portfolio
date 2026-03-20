import React from "react";

type LayoutProps = {
  children: React.ReactNode;
};

type ProjectsType = {
  id: number;
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
  title: string;
  bio: string;
  image?: string;
  role: string;
  order?: string;
};

export { LayoutProps, ProjectsType, ProjectPutType, AboutPostType };
