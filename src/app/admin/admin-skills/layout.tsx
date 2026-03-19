import React from "react";
import { LayoutProps } from "@/types";
function AdminSkills({ children }: LayoutProps) {
  return (
    <html lang="uz">
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}

export default AdminSkills;
