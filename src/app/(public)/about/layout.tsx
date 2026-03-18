import React from "react";

type LayoutAboutProps = {
  children: React.ReactNode;
};

function LayoutAbout({ children }: LayoutAboutProps) {
  return (
    <html lang="uz">
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}

export default LayoutAbout;
