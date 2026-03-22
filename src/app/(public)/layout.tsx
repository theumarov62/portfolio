import React from "react";

function HomePublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}

export default HomePublicLayout;
