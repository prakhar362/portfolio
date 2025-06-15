import { FaLocationArrow } from "react-icons/fa6";
import MagicButton from "./MagicButton";
import { Spotlight } from "./ui/Spotlight";
import { cn } from "@/utils/cn";

const Hero = () => {
  return (
    <div className="pb-20 pt-36 h-screen relative text-white">
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
      <div className="flex justify-center relative my-20 z-10">
        <div className="max-w-[89vw] md:max-w-2xl lg:max-w-[60vw] flex flex-col items-center justify-center text-center">
          <p className="uppercase tracking-widest text-xs text-blue-100 mb-3">
           Crafting Impactful Web Experiences with Precision & Passion
          </p>

          <h1 className="text-[40px] md:text-5xl lg:text-6xl font-bold leading-tight">
             Building Scalable Products with {" "}
            <span className="bg-gradient-to-r from-[#d9a7ff] to-[#9b74ff] text-transparent bg-clip-text">
              Prakhar Shrivastava
            </span>
          </h1>

          <p className="text-sm md:text-lg lg:text-2xl text-neutral-300 mt-4">
            I specialize in turning complex ideas into elegant digital solutions. Let's build something amazing together.

          </p>

           <a href="#about">
            <MagicButton
              title="View My Resume"
              icon={<FaLocationArrow />}
              position="right"
            />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Hero;
