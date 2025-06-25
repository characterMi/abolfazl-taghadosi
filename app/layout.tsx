import Root from "@/providers/root";
import type { Metadata, Viewport } from "next";
import { Figtree } from "next/font/google";

import "./globals.css";

const font = Figtree({ subsets: ["latin"], preload: true });

const title = "Abolfazl Taghadosi • Software Engineer",
  description =
    "Transforming ideas into powerful digital experiences. Located in the Iran. Always pushing boundaries, never settling for less.",
  baseUrl = "https://abolfazl-taghadosi.vercel.app";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "portfolio",
    "abolfazl taghadosi",
    "front-end",
    "front end",
    "software developer",
    "software engineer",
  ],
  icons: {
    icon: "/icons/logo-icon.png",
    apple: "/icons/logo-icon.png",
  },
  openGraph: {
    title,
    description,
    url: baseUrl,
    type: "website",
    images: [
      {
        url: `${baseUrl}/icons/logo.png`,
        width: 500,
        height: 500,
        alt: "Website Logo",
      },
    ],
    locale: "en_US",
    siteName: title,
  },
  twitter: {
    title,
    description,
    site: baseUrl,
    images: [
      {
        url: `${baseUrl}/icons/logo.png`,
        width: 500,
        height: 500,
        alt: "Website Logo",
      },
    ],
    card: "summary",
  },
  metadataBase: new URL(baseUrl),
  alternates: {
    canonical: process.env.NEXT_PUBLIC_BASE_URL,
  },
  category: "Portfolio",
  classification: "Portfolio",
  creator: "Abolfazl taghadosi",
  publisher: "Abolfazl taghadosi",
  generator: "Next.js",
  authors: [
    {
      name: "Abolfazl Taghadosi",
      url: "https://github.com/characterMi/",
    },
  ],
};

export const viewport: Viewport = {
  themeColor: "#56ccf2",
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
        <head>
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <link
            rel="preload"
            href="/fonts/FF.ttf"
            as="font"
            type="font/ttf"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            href="/fonts/FF.otf"
            as="font"
            type="font/otf"
            crossOrigin="anonymous"
          />
        </head>
        <body className={font.className}>{children}</body>
      </html>
    </Root>
  );
}
