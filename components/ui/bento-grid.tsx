"use client";

import { useState } from "react";
import { IoCopyOutline } from "react-icons/io5";

// Also install this npm i --save-dev @types/react-lottie
import Lottie from "react-lottie";

import { cn } from "@/lib/utils";
import { BackgroundGradientAnimation } from "./background-gradient-animation";
import { World } from "./globe";
import animationData from "@/data/confetti.json";
import MagicButton from "../MagicButton";

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
  className={cn(
    "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8 mx-auto",
    className
  )}
>
      {children}
    </div>
  );
};
export const BentoGridItem = ({
  className,
  id,
  title,
  description,
  img,
  imgClassName,
  titleClassName,
  spareImg,
}: {
  className?: string;
  id: number;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  img?: string;
  imgClassName?: string;
  titleClassName?: string;
  spareImg?: string;
}) => {
  const [copied, setCopied] = useState(false);

  const defaultOptions = {
    loop: copied,
    autoplay: copied,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const handleCopy = () => {
    const text = "prakharshri2005@gmail.com";
    navigator.clipboard.writeText(text);
    setCopied(true);
  };

  return (
    <div
      className={cn(
        "row-span-1 relative overflow-hidden rounded-3xl border border-white/[0.1] group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none flex flex-col",
        className
      )}
      style={{
        background: "linear-gradient(90deg, rgba(4,7,29,1) 0%, rgba(12,14,35,1) 100%)",
      }}
    >
      {/* Background image */}
      {img && (
        <div className="absolute inset-0 z-0">
          <img
            src={img}
            alt="background"
            className={cn(imgClassName, "object-cover w-full h-full")}
          />
        </div>
      )}

      {/* Spare image if exists */}
      {spareImg && (
        <div className="absolute right-0 bottom-0 z-10 opacity-80">
          <img src={spareImg} alt="overlay" className="object-cover" />
        </div>
      )}

      {/* Special Case: Email Copy Section */}
      {id === 3 ? (
        <BackgroundGradientAnimation>
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-white text-center p-6">
            <h2 className={cn(titleClassName, "text-2xl font-semibold mb-6")}>
              {title}
            </h2>

            <div className="relative">
              <div className="absolute -bottom-5 right-0">
                <Lottie options={defaultOptions} height={200} width={400} />
              </div>

              <MagicButton
                title={copied ? "Email is Copied!" : "Copy my email address"}
                icon={<IoCopyOutline />}
                position="left"
                handleClick={handleCopy}
                otherClasses="!bg-[#161A31]"
              />
            </div>
          </div>
        </BackgroundGradientAnimation>
      ) : (
        // Default layout for other IDs (1, 2, 4...)
        <div className="relative z-10 flex flex-col justify-between h-full p-5 lg:p-10">
          {/* Description */}
          {description && (
            <p className="text-sm lg:text-base text-[#C1C2D3] mb-2 font-light">
              {description}
            </p>
          )}

          {/* Title */}
          {title && (
            <h3 className={cn(titleClassName, "text-lg lg:text-3xl font-bold text-white")}>
              {title}
            </h3>
          )}

          {/* Globe for id=2 */}
          {id === 2 && (
            <div className="absolute right-4 bottom-4 z-10">
              <World
                globeConfig={{
                  pointSize: 1,
                  atmosphereColor: "#ffffff",
                  showAtmosphere: true,
                  atmosphereAltitude: 0.1,
                  polygonColor: "rgba(255,255,255,0.7)",
                  globeColor: "#1d072e",
                  emissive: "#000000",
                  emissiveIntensity: 0.1,
                  shininess: 0.9,
                  arcTime: 2000,
                  arcLength: 0.9,
                  rings: 1,
                  maxRings: 3,
                  ambientLight: "#ffffff",
                  directionalLeftLight: "#ffffff",
                  directionalTopLight: "#ffffff",
                  pointLight: "#ffffff",
                }}
                data={[
                  {
                    order: 1,
                    startLat: 48.8566,
                    startLng: 2.3522,
                    endLat: 40.7128,
                    endLng: -74.0060,
                    arcAlt: 0.5,
                    color: "#ffffff",
                  },
                ]}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};
