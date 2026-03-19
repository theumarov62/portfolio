import { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Abdulloh Umarov portfoliosi",
  description: "Abdulloh Umarov portfoliosi",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uz">
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}
