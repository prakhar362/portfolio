"use client"

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { navItems } from "@/data";

// Dynamically import all components to prevent SSR issues
const Hero = dynamic(() => import("@/components/Hero"), {
  ssr: false,
  loading: () => <div className="h-screen bg-black-100 animate-pulse" />
});

const Grid = dynamic(() => import("@/components/Grid"), {
  ssr: false,
  loading: () => <div className="h-96 bg-black-100 animate-pulse" />
});

const Projects = dynamic(() => import("@/components/Projects"), {
  ssr: false,
  loading: () => <div className="h-96 bg-black-100 animate-pulse" />
});

const Experience = dynamic(() => import("@/components/Experience"), {
  ssr: false,
  loading: () => <div className="h-96 bg-black-100 animate-pulse" />
});

const Footer = dynamic(() => import("@/components/Footer"), {
  ssr: false,
  loading: () => <div className="h-96 bg-black-100 animate-pulse" />
});

const FloatingNav = dynamic(() => import("@/components/ui/floating-navbar").then(mod => ({ default: mod.FloatingNav })), {
  ssr: false,
  loading: () => <div className="h-16" />
});

export default function Home() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <main className="relative bg-black-100 flex justify-center items-center flex-col mx-auto sm:px-10 px-5">
        <div className="max-w-7xl w-full">
          <div className="h-screen bg-black-100 animate-pulse" />
        </div>
      </main>
    );
  }

  return (
    <main className="relative bg-black-100 flex justify-center items-center flex-col mx-auto sm:px-10 px-5">
      <div className="max-w-7xl w-full">
      <FloatingNav navItems={navItems} />
      <Hero/>
      <Grid/>
      <Projects/>
      <Experience/>
      <Footer/>
      </div>
      </main>
  );
}
