"use client";

import { FaLocationArrow } from "react-icons/fa6";
import MagicButton from "./MagicButton";
import { Spotlight } from "./ui/Spotlight";
import { cn } from "@/utils/cn";
import { IconCloud } from "./iconCloud";
import { AnimatedTooltip } from "./ui/animated-tooltip";
const people = [
  {
    id: 1,
    name: "Twitter(X)",
    designation: "prakharshri2005",
    image:
      "https://i.pinimg.com/736x/91/8b/20/918b20dc0aa716e09fd0a58f9dd8e720.jpg",
    link: "https://twitter.com/prakharshri2005",
  },
  {
    id: 2,
    name: "LinkedIn",
    designation: "Prakhar Shrivastava",
    image:
      "https://www.citypng.com/public/uploads/preview/hd-vector-flat-linkedin-in-round-icon-png-701751695046390m4phkuuiqm.png",
    link: "https://www.linkedin.com/in/prakhar-shrivastava-a4927b2b5/",
  },
  {
    id: 3,
    name: "Github",
    designation: "prakhar362",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuAikO6HfgCm0CRT5sSRBlYIwdPk7-08utow&s",
    link: "https://github.com/prakhar362",
  },
];

const Hero = () => {
  return (
    <div className="pb-0 md:pb-20 pt-20 md:pt-36 min-h-screen relative text-white">
      {/* Grid Background */}
      <div
        className={cn(
          "absolute inset-0 z-0 h-screen w-full top-0 left-0",
          "[background-size:120px_120px]",
          "[background-image:linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]",
          "[mask-image:linear-gradient(to_right,transparent,black_20%,black)]"
        )}
      />

      {/* Spotlights */}
      <Spotlight className="-top-40 -left-10 md:-left-32 md:-top-20 h-screen" fill="white" />
      <Spotlight className="h-[80vh] w-[50vw] top-10 left-full" fill="purple" />
      <Spotlight className="left-80 top-28 h-[80vh] w-[50vw]" fill="blue" />

      {/* Radial gradient overlay */}
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-black-100 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] z-0" />

      {/* Main Content */}
      <div className="flex justify-center items-center relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-center gap-0 md:gap-10 px-4 w-full max-w-7xl mx-auto">
          {/* Icon Cloud */}
          <div className="w-full md:w-1/2 flex justify-center">
            <div className="relative flex h-auto w-full items-center justify-center overflow-hidden rounded-lg bg-background px-4 pt-4 pb-0 md:p-8">
              <IconCloud />
            </div>
          </div>

          {/* Text Content */}
          <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left">
            <p className="uppercase tracking-widest text-xs text-blue-100 mb-3">
              Crafting Impactful Web Experiences with Precision & Passion
            </p>

            <h1 className="text-[40px] md:text-5xl lg:text-6xl font-bold leading-tight">
              Building Scalable Products with{" "}
              <span className="bg-gradient-to-r from-[#d9a7ff] to-[#9b74ff] text-transparent bg-clip-text">
                Prakhar Shrivastava
              </span>
            </h1>

            <p className="text-sm md:text-lg lg:text-2xl text-neutral-300 mt-4">
              I specialize in turning complex ideas into elegant digital solutions. Let's build something amazing together.
            </p>

            <div className="flex flex-row items-center justify-center md:justify-start gap-4 mt-6">
              <a href="#about">
                <MagicButton
                  title="View My Resume"
                  icon={<FaLocationArrow />}
                  position="right"
                />
              </a>
              <div className="flex flex-row items-center justify-center sm:mt-8">
                <AnimatedTooltip items={people} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
