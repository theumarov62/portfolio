import React from "react";
import { LayoutProps } from "../../../types/index";

function AdminProjects({ children }: LayoutProps) {
  return (
    <html lang="uz">
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}

export default AdminProjects;
