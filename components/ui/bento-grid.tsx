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

  // Special case for id=1: image fills the whole div, title overlaid at the bottom left
  if (id === 1 && img) {
    return (
      <div className={cn("relative w-full h-full rounded-3xl overflow-hidden", className)} style={{padding: 0}}>
        <img
          src={img}
          alt="background"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {title && (
          <div className="absolute left-0 bottom-0 p-6">
            <h3 className="text-white text-2xl md:text-3xl font-bold drop-shadow-lg" style={{textShadow: '0 2px 8px rgba(0,0,0,0.7)'}}>
              {title}
            </h3>
          </div>
        )}
      </div>
    );
  }

  // Special case for id=4: image and overlayed text inside a single div, image fainted, with a thin border
  if (id === 4 && img) {
    return (
      <div className={cn("relative w-full h-full rounded-3xl overflow-hidden flex items-center border border-white/20", className)} style={{padding: 0}}>
        {/* Fainted background image */}
        <img
          src={img}
          alt="background"
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        />
        {/* Stronger overlay for extra faint effect */}
        <div className="absolute inset-0 bg-black/20" />
        {/* Content (description and title) */}
        <div className="relative flex flex-col justify-center pl-8 md:pl-12 z-10">
          {description && (
            <span className="text-white text-sm md:text-base opacity-80 mb-2">
              {description}
            </span>
          )}
          {title && (
            <h3 className="text-white text-2xl md:text-4xl font-bold leading-tight max-w-lg">
              {title}
            </h3>
          )}
        </div>
        {/* Spare image, if any, in the bottom right */}
        {spareImg && (
          <div className="absolute right-0 bottom-0 z-20 opacity-80">
            <img src={spareImg} alt="overlay" className="object-cover" />
          </div>
        )}
      </div>
    );
  }

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
        <div className={id === 1 ? "absolute inset-0 z-0" : "absolute inset-0 z-0"}>
          <img
            src={img}
            alt="background"
            className={cn(
              imgClassName,
              id === 1
                ? "w-full h-full object-cover"
                : "object-cover w-full h-full"
            )}
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
      ) : id === 1 ? (
        // For id=1, make the image fill the whole div and remove text overlay
        <></>
      ) : (
        // Default layout for other IDs (2, 4...)
        <div className="relative z-10 flex flex-col justify-between h-full p-5 lg:p-10">
          {/* Improved Title and Description Display */}
          <div className="flex flex-col items-center justify-center w-full mb-2">
          {description && (
              <p className="text-center text-base md:text-lg text-[#C1C2D3] font-light mb-1 max-w-xs md:max-w-md">
              {description}
            </p>
          )}
          {title && (
              <h3 className="text-center text-2xl md:text-4xl font-bold text-white leading-tight mb-2 max-w-xs md:max-w-lg">
              {title}
            </h3>
          )}
          </div>
          {/* Globe for id=2 */}
          {id === 2 && (
            <div className="flex flex-col items-center justify-start w-full h-full">
              <div className="-mt-2 w-56 h-56 md:w-80 md:h-80 rounded-full overflow-hidden">
              <World
                globeConfig={{
                    pointSize: 4,
                    globeColor: "#062056",
                  showAtmosphere: true,
                    atmosphereColor: "#FFFFFF",
                  atmosphereAltitude: 0.1,
                    emissive: "#062056",
                  emissiveIntensity: 0.1,
                  shininess: 0.9,
                    polygonColor: "rgba(255,255,255,0.7)",
                    ambientLight: "#38bdf8",
                    directionalLeftLight: "#ffffff",
                    directionalTopLight: "#ffffff",
                    pointLight: "#ffffff",
                    arcTime: 1000,
                  arcLength: 0.9,
                  rings: 1,
                  maxRings: 3,
                    initialPosition: { lat: 22.3193, lng: 114.1694 },
                    autoRotate: true,
                    autoRotateSpeed: 0.5,
                }}
                data={[
                  {
                    order: 1,
                      startLat: -19.885592,
                      startLng: -43.951191,
                      endLat: -22.9068,
                      endLng: -43.1729,
                      arcAlt: 0.1,
                      color: "#06b6d4",
                    },
                    {
                      order: 1,
                      startLat: 28.6139,
                      startLng: 77.209,
                      endLat: 3.139,
                      endLng: 101.6869,
                      arcAlt: 0.2,
                      color: "#3b82f6",
                    },
                    {
                      order: 1,
                      startLat: -19.885592,
                      startLng: -43.951191,
                      endLat: -1.303396,
                      endLng: 36.852443,
                      arcAlt: 0.5,
                      color: "#6366f1",
                    },
                    {
                      order: 2,
                      startLat: 1.3521,
                      startLng: 103.8198,
                      endLat: 35.6762,
                      endLng: 139.6503,
                      arcAlt: 0.2,
                      color: "#06b6d4",
                    },
                    {
                      order: 2,
                      startLat: 51.5072,
                      startLng: -0.1276,
                      endLat: 3.139,
                      endLng: 101.6869,
                      arcAlt: 0.3,
                      color: "#3b82f6",
                    },
                    {
                      order: 2,
                      startLat: -15.785493,
                      startLng: -47.909029,
                      endLat: 36.162809,
                      endLng: -115.119411,
                      arcAlt: 0.3,
                      color: "#6366f1",
                    },
                    {
                      order: 3,
                      startLat: -33.8688,
                      startLng: 151.2093,
                      endLat: 22.3193,
                      endLng: 114.1694,
                      arcAlt: 0.3,
                      color: "#06b6d4",
                    },
                    {
                      order: 3,
                      startLat: 21.3099,
                      startLng: -157.8581,
                      endLat: 40.7128,
                      endLng: -74.006,
                      arcAlt: 0.3,
                      color: "#3b82f6",
                    },
                    {
                      order: 3,
                      startLat: -6.2088,
                      startLng: 106.8456,
                      endLat: 51.5072,
                      endLng: -0.1276,
                      arcAlt: 0.3,
                      color: "#6366f1",
                    },
                    {
                      order: 4,
                      startLat: 11.986597,
                      startLng: 8.571831,
                      endLat: -15.595412,
                      endLng: -56.05918,
                      arcAlt: 0.5,
                      color: "#06b6d4",
                    },
                    {
                      order: 4,
                      startLat: -34.6037,
                      startLng: -58.3816,
                      endLat: 22.3193,
                      endLng: 114.1694,
                      arcAlt: 0.7,
                      color: "#3b82f6",
                    },
                    {
                      order: 4,
                      startLat: 51.5072,
                      startLng: -0.1276,
                      endLat: 48.8566,
                      endLng: -2.3522,
                      arcAlt: 0.1,
                      color: "#6366f1",
                    },
                    {
                      order: 5,
                      startLat: 14.5995,
                      startLng: 120.9842,
                      endLat: 51.5072,
                      endLng: -0.1276,
                      arcAlt: 0.3,
                      color: "#06b6d4",
                    },
                    {
                      order: 5,
                      startLat: 1.3521,
                      startLng: 103.8198,
                      endLat: -33.8688,
                      endLng: 151.2093,
                      arcAlt: 0.2,
                      color: "#3b82f6",
                    },
                    {
                      order: 5,
                      startLat: 34.0522,
                      startLng: -118.2437,
                      endLat: 48.8566,
                      endLng: -2.3522,
                      arcAlt: 0.2,
                      color: "#6366f1",
                    },
                    {
                      order: 6,
                      startLat: -15.432563,
                      startLng: 28.315853,
                      endLat: 1.094136,
                      endLng: -63.34546,
                      arcAlt: 0.7,
                      color: "#06b6d4",
                    },
                    {
                      order: 6,
                      startLat: 37.5665,
                      startLng: 126.978,
                      endLat: 35.6762,
                      endLng: 139.6503,
                      arcAlt: 0.1,
                      color: "#3b82f6",
                    },
                    {
                      order: 6,
                      startLat: 22.3193,
                      startLng: 114.1694,
                      endLat: 51.5072,
                      endLng: -0.1276,
                      arcAlt: 0.3,
                      color: "#6366f1",
                    },
                    {
                      order: 7,
                      startLat: -19.885592,
                      startLng: -43.951191,
                      endLat: -15.595412,
                      endLng: -56.05918,
                      arcAlt: 0.1,
                      color: "#06b6d4",
                    },
                    {
                      order: 7,
                    startLat: 48.8566,
                      startLng: -2.3522,
                      endLat: 52.52,
                      endLng: 13.405,
                      arcAlt: 0.1,
                      color: "#3b82f6",
                    },
                    {
                      order: 7,
                      startLat: 52.52,
                      startLng: 13.405,
                      endLat: 34.0522,
                      endLng: -118.2437,
                      arcAlt: 0.2,
                      color: "#6366f1",
                    },
                    {
                      order: 8,
                      startLat: -8.833221,
                      startLng: 13.264837,
                      endLat: -33.936138,
                      endLng: 18.436529,
                      arcAlt: 0.2,
                      color: "#06b6d4",
                    },
                    {
                      order: 8,
                      startLat: 49.2827,
                      startLng: -123.1207,
                      endLat: 52.3676,
                      endLng: 4.9041,
                      arcAlt: 0.2,
                      color: "#3b82f6",
                    },
                    {
                      order: 8,
                      startLat: 1.3521,
                      startLng: 103.8198,
                    endLat: 40.7128,
                      endLng: -74.006,
                      arcAlt: 0.5,
                      color: "#6366f1",
                    },
                    {
                      order: 9,
                      startLat: 51.5072,
                      startLng: -0.1276,
                      endLat: 34.0522,
                      endLng: -118.2437,
                      arcAlt: 0.2,
                      color: "#06b6d4",
                    },
                    {
                      order: 9,
                      startLat: 22.3193,
                      startLng: 114.1694,
                      endLat: -22.9068,
                      endLng: -43.1729,
                      arcAlt: 0.7,
                      color: "#3b82f6",
                    },
                    {
                      order: 9,
                      startLat: 1.3521,
                      startLng: 103.8198,
                      endLat: -34.6037,
                      endLng: -58.3816,
                    arcAlt: 0.5,
                      color: "#6366f1",
                    },
                    {
                      order: 10,
                      startLat: -22.9068,
                      startLng: -43.1729,
                      endLat: 28.6139,
                      endLng: 77.209,
                      arcAlt: 0.7,
                      color: "#06b6d4",
                    },
                    {
                      order: 10,
                      startLat: 34.0522,
                      startLng: -118.2437,
                      endLat: 31.2304,
                      endLng: 121.4737,
                      arcAlt: 0.3,
                      color: "#3b82f6",
                    },
                    {
                      order: 10,
                      startLat: -6.2088,
                      startLng: 106.8456,
                      endLat: 52.3676,
                      endLng: 4.9041,
                      arcAlt: 0.3,
                      color: "#6366f1",
                    },
                    {
                      order: 11,
                      startLat: 41.9028,
                      startLng: 12.4964,
                      endLat: 34.0522,
                      endLng: -118.2437,
                      arcAlt: 0.2,
                      color: "#06b6d4",
                    },
                    {
                      order: 11,
                      startLat: -6.2088,
                      startLng: 106.8456,
                      endLat: 31.2304,
                      endLng: 121.4737,
                      arcAlt: 0.2,
                      color: "#3b82f6",
                    },
                    {
                      order: 11,
                      startLat: 22.3193,
                      startLng: 114.1694,
                      endLat: 1.3521,
                      endLng: 103.8198,
                      arcAlt: 0.2,
                      color: "#6366f1",
                    },
                    {
                      order: 12,
                      startLat: 34.0522,
                      startLng: -118.2437,
                      endLat: 37.7749,
                      endLng: -122.4194,
                      arcAlt: 0.1,
                      color: "#06b6d4",
                    },
                    {
                      order: 12,
                      startLat: 35.6762,
                      startLng: 139.6503,
                      endLat: 22.3193,
                      endLng: 114.1694,
                      arcAlt: 0.2,
                      color: "#3b82f6",
                    },
                    {
                      order: 12,
                      startLat: 22.3193,
                      startLng: 114.1694,
                      endLat: 34.0522,
                      endLng: -118.2437,
                      arcAlt: 0.3,
                      color: "#6366f1",
                    },
                    {
                      order: 13,
                      startLat: 52.52,
                      startLng: 13.405,
                      endLat: 22.3193,
                      endLng: 114.1694,
                      arcAlt: 0.3,
                      color: "#06b6d4",
                    },
                    {
                      order: 13,
                      startLat: 11.986597,
                      startLng: 8.571831,
                      endLat: 35.6762,
                      endLng: 139.6503,
                      arcAlt: 0.3,
                      color: "#3b82f6",
                    },
                    {
                      order: 13,
                      startLat: -22.9068,
                      startLng: -43.1729,
                      endLat: -34.6037,
                      endLng: -58.3816,
                      arcAlt: 0.1,
                      color: "#6366f1",
                    },
                    {
                      order: 14,
                      startLat: -33.936138,
                      startLng: 18.436529,
                      endLat: 21.395643,
                      endLng: 39.883798,
                      arcAlt: 0.3,
                      color: "#06b6d4",
                  },
                ]}
              />
                <style jsx global>{`
                  .rounded-full.overflow-hidden > canvas {
                    border-radius: 50% !important;
                    width: 100% !important;
                    height: 100% !important;
                    display: block;
                  }
                `}</style>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
