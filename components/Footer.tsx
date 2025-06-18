import { FaLocationArrow } from "react-icons/fa6";

import { socialMedia } from "@/data";
import MagicButton from "./MagicButton";
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

const Footer = () => {
  return (
    <footer className="w-full pt-25 pb-10 bg-black-100 relative overflow-hidden" id="contact">
      {/* background grid */}
      <div className="absolute inset-0 w-full h-full z-0">
        <img
          src="/footer-grid.svg"
          alt="grid"
          className="w-full h-full opacity-50 object-cover"
        />
      </div>
      

      <div className="flex flex-col items-center relative z-10">
        <div className="font-bold text-center mb-10">
          <h1 className="heading text-6xl text-amber-50">
            Let's Connect and Build Together
          </h1>
          <span className="block bg-gradient-to-r from-[#d9a7ff] to-[#9b74ff] text-transparent bg-clip-text text-3xl mt-2">
            Reach out to me Today!
          </span>
        </div>
        
        <a href="email: prakharshri2005@gmail.com">
          <MagicButton
            title="Let's get in touch"
            icon={<FaLocationArrow />}
            position="right"
          />
        </a>
      </div>
      <div className="flex mt-16 md:flex-row flex-col justify-between  items-center relative z-10">
        <p className="md:text-base  text-md md:font-normal font-light text-white">
          Copyright © 2025 Prakhar Shrivastava
        </p>

        <div className="flex items-center mr-7 gap-5">
          <AnimatedTooltip items={people} />
        </div>
      </div>
    </footer>
  );
};

export default Footer;