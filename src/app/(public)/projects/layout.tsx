import React from "react";

type LayoutProjectsProps = {
  children: React.ReactNode;
};

function LayoutProjects({ children }: LayoutProjectsProps) {
  return (
    <html lang="uz">
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}
export default LayoutProjects;
