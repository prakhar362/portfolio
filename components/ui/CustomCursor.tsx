"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";

export const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only run on desktop
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const cursor = cursorRef.current;
    const follower = followerRef.current;

    if (!cursor || !follower) return;

    // Set initial position
    gsap.set(cursor, { xPercent: -50, yPercent: -50 });
    gsap.set(follower, { xPercent: -50, yPercent: -50 });

    let mouseX = 0;
    let mouseY = 0;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      // The main dot follows instantly
      gsap.to(cursor, {
        x: mouseX,
        y: mouseY,
        duration: 0.1,
        ease: "power2.out",
      });

      // The outer circle has a lag effect
      gsap.to(follower, {
        x: mouseX,
        y: mouseY,
        duration: 0.6,
        ease: "power3.out",
      });
    };

    const onMouseEnterLink = () => {
      gsap.to(cursor, { scale: 0.5, duration: 0.2 });
      gsap.to(follower, {
        scale: 1.5,
        backgroundColor: "rgba(203, 172, 249, 0.1)",
        borderColor: "rgba(203, 172, 249, 0.8)",
        duration: 0.3
      });
    };

    const onMouseLeaveLink = () => {
      gsap.to(cursor, { scale: 1, duration: 0.2 });
      gsap.to(follower, {
        scale: 1,
        backgroundColor: "transparent",
        borderColor: "rgba(203, 172, 249, 0.5)",
        duration: 0.3
      });
    };

    // Add event listeners
    window.addEventListener("mousemove", onMouseMove);

    // Bind hover effect to all interactive elements
    const interactiveElements = document.querySelectorAll("a, button, input, textarea, select, [role='button']");
    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", onMouseEnterLink);
      el.addEventListener("mouseleave", onMouseLeaveLink);
    });

    // Handle dynamically added elements
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.addedNodes.length) {
          const newInteractiveElements = document.querySelectorAll("a:not([data-cursor-bound]), button:not([data-cursor-bound]), [role='button']:not([data-cursor-bound])");
          newInteractiveElements.forEach((el) => {
            el.setAttribute("data-cursor-bound", "true");
            el.addEventListener("mouseenter", onMouseEnterLink);
            el.addEventListener("mouseleave", onMouseLeaveLink);
          });
        }
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", onMouseEnterLink);
        el.removeEventListener("mouseleave", onMouseLeaveLink);
      });
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-5 h-5 bg-[#CBACF9] rounded-full pointer-events-none z-[100] hidden md:block mix-blend-difference"
      />
      <div
        ref={followerRef}
        className="fixed top-0 left-0 w-10 h-10 border border-[#CBACF9]/50 rounded-full pointer-events-none z-[99] hidden md:block transition-colors duration-300"
      />
    </>
  );
};
