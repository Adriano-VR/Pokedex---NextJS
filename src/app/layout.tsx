import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pokemon API - Next.js",
  description: "Next.js + Pokemon API",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className="antialiased bg-[#1a1a2e]"
      >
        {children}
      </body>
    </html>
  );
}
