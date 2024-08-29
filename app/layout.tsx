import type { Metadata, Viewport } from "next";
import { Figtree } from "next/font/google";

import Root from "@/providers/root";
import "./globals.css";

const font = Figtree({ subsets: ["latin"], preload: true });

export const metadata: Metadata = {
  title: "Abolfazl Taghadosi • Software Developer",
  description:
    "Transforming ideas into powerful digital experiences. Located in the Iran. Always pushing boundaries, never settling for less.",
  keywords: [
    "portfolio",
    "abolfazl taghadosi",
    "front-end",
    "front end",
    "software developer",
  ],
};

export const viewport: Viewport = {
  themeColor: "#22c55e",
  colorScheme: "only light",
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Root>
      <html lang="en">
        <body className={font.className}>{children}</body>
      </html>
    </Root>
  );
}
