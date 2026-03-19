import React from "react";

type LayoutProps = {
  children: React.ReactNode;
};

export type ProjectsType = {
  id: number;
  title: string;
  description: string;
  image?: string;
  technologies: string;
  demo_link: string;
  repo_link: string;
  order?: number;
};
export { LayoutProps, ProjectsType };
