import { MetadataRoute } from "next";

const robots = (): MetadataRoute.Robots => {
  const pageUrl = "https://abolfazl-taghadosi.vercel.app";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [],
    },
    sitemap: `${pageUrl}/sitemap.yml`,
  };
};

export default robots;
