import React from "react";
import { LayoutProps } from "../../../types/index";

function AdminAbout({ children }: LayoutProps) {
  return (
    <html lang="uz">
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}

export default AdminAbout;
