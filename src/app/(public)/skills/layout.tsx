import Link from "next/link";
import React from "react";

type LayoutSkillsProps = {
  children: React.ReactNode;
};

function LayoutSkills({ children }: LayoutSkillsProps) {
  return (
    <html lang="uz">
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}
export default LayoutSkills;
