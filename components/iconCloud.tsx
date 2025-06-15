"use client";

import IconCloud2 from "@/components/ui/icon-cloud";
const slugs = [
  "typescript",
  "javascript",
  "react",
  "expo",
  "tailwindcss",
  "html5",
  "css3",
  "nodedotjs",
  "express",
  "nextdotjs",
  "prisma",
  "amazonaws",
  "postgresql",
  "firebase",
  "nginx",
  "vercel",
  "docker",
  "git",
  "github",
  "visualstudiocode",
  "cloudflare",
  "cplusplus",
  "graphql",
  "mongodb",
  "turborepo",
  "redis",
  "java",
  "mysql",

];


export function IconCloud() {
  return (
    <div className="relative flex h-full w-full max-h-[40rem] max-w-[40rem] items-center justify-center overflow-hidden rounded-lg bg-background md:px-10 px-16 md:pb-10 pb-6">
      <IconCloud2 iconSlugs={slugs} />
    </div>
  );
}