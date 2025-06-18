"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  motion,
  useTransform,
  useScroll,
  useVelocity,
  useSpring,
} from "motion/react";
import { cn } from "@/lib/utils";

export const TracingBeam = ({
  children,
  className,
  bulletOffsets = [], // Array of vertical offsets for bullets
}: {
  children: React.ReactNode;
  className?: string;
  bulletOffsets?: number[];
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const contentRef = useRef<HTMLDivElement>(null);
  const [svgHeight, setSvgHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setSvgHeight(contentRef.current.offsetHeight);
    }
  }, []);

  const y1 = useSpring(
    useTransform(scrollYProgress, [0, 0.8], [50, svgHeight]),
    {
      stiffness: 500,
      damping: 90,
    },
  );
  const y2 = useSpring(
    useTransform(scrollYProgress, [0, 1], [50, svgHeight - 200]),
    {
      stiffness: 500,
      damping: 90,
    },
  );

  return (
    <motion.div
      ref={ref}
      className={cn("relative mx-auto h-full w-full max-w-4xl", className)}
    >
      {/* Beam and green bullets */}
      <div
        className="absolute h-full"
        style={{
          // Responsive left gutter: more space on mobile, matches -left-20 on md+
          left: 'max(-3rem, calc(-65px))', // -10 (40px) or -60px, whichever is more negative
          top: 12, // matches top-3
          minWidth: 48, // ensure gutter
          zIndex: 20,
        }}
      >
        {/* Beam SVG */}
        <svg
          viewBox={`0 0 20 ${svgHeight}`}
          width="20"
          height={svgHeight}
          className="ml-4 block absolute top-0 left-0"
          aria-hidden="true"
        >
          <motion.path
            d={`M 1 0V -36 l 18 24 V ${svgHeight * 0.8} l -18 24V ${svgHeight}`}
            fill="none"
            stroke="#9091A0"
            strokeOpacity="0.16"
            transition={{
              duration: 10,
            }}
          ></motion.path>
          <motion.path
            d={`M 1 0V -36 l 18 24 V ${svgHeight * 0.8} l -18 24V ${svgHeight}`}
            fill="none"
            stroke="url(#gradient)"
            strokeWidth="1.25"
            className="motion-reduce:hidden"
            transition={{
              duration: 10,
            }}
          ></motion.path>
          <defs>
            <motion.linearGradient
              id="gradient"
              gradientUnits="userSpaceOnUse"
              x1="0"
              x2="0"
              y1={y1}
              y2={y2}
            >
              <stop stopColor="#18CCFC" stopOpacity="0"></stop>
              <stop stopColor="#18CCFC"></stop>
              <stop offset="0.325" stopColor="#6344F5"></stop>
              <stop offset="1" stopColor="#AE48FF" stopOpacity="0"></stop>
            </motion.linearGradient>
          </defs>
        </svg>
        {/* Green bullets absolutely positioned at provided offsets */}
        {bulletOffsets.map((offset, index) => (
          <div
            key={index}
            style={{
              position: "absolute",
              left: 28, // aligns to the right of the beam
              top: offset - 8, // vertically center the bullet
              zIndex: 10,
            }}
            className="w-4 h-4 flex items-center justify-center"
          >
            <div className="w-3 h-3 rounded-full bg-[#10b981] border-2 border-black shadow-lg" />
          </div>
        ))}
      </div>
      <div ref={contentRef}>{children}</div>
    </motion.div>
  );
};
