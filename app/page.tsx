"use client"

import Hero from "@/components/Hero";
import Grid from "@/components/Grid";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import { FloatingNav } from "@/components/ui/floating-navbar";
import { navItems } from "@/data";


export default function Home() {
  return (
    <main className="relative bg-black-100 flex justify-center items-center flex-col mx-auto sm:px-10 px-5">
      <div className="max-w-7xl w-full">
      <FloatingNav navItems={navItems} />
      <Hero/>
      <Grid/>
      <Projects/>
      <Experience/>
      </div>
      </main>
  );
}
