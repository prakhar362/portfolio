"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

interface ProjectCarouselProps {
  images: string[];
  projectTitle: string;
}

const ProjectCarousel = ({ images, projectTitle }: ProjectCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0); // 1 for next, -1 for previous

  const goToPrevious = () => {
    setDirection(-1);
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToSlide = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        goToPrevious();
      } else if (e.key === "ArrowRight") {
        goToNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  if (!images || images.length === 0) {
    return null;
  }

  // Slide variants for smooth directional animations
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.9,
      rotateY: direction > 0 ? 45 : -45,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
      rotateY: 0,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.9,
      rotateY: direction < 0 ? 45 : -45,
    }),
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  return (
    <div className="relative w-full">
      {/* Main Image Container */}
      <div className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] rounded-2xl overflow-hidden bg-[#13162D] border border-white/10">
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.4 },
              scale: { duration: 0.4 },
              rotateY: { duration: 0.4 },
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x);

              if (swipe < -swipeConfidenceThreshold) {
                goToNext();
              } else if (swipe > swipeConfidenceThreshold) {
                goToPrevious();
              }
            }}
            className="absolute inset-0 cursor-grab active:cursor-grabbing"
            style={{ perspective: 1000 }}
          >
            <img
              src={images[currentIndex]}
              alt={`${projectTitle} - Image ${currentIndex + 1}`}
              className="w-full h-full object-cover select-none pointer-events-none"
              draggable={false}
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black-100/60 via-transparent to-transparent pointer-events-none" />
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <motion.button
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/50 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white hover:bg-[#CBACF9]/20 hover:border-[#CBACF9]/30 transition-all duration-300 group z-10"
              aria-label="Previous image"
              whileHover={{ scale: 1.1, x: -4 }}
              whileTap={{ scale: 0.9 }}
            >
              <FaChevronLeft className="group-hover:-translate-x-0.5 transition-transform" size={16} />
            </motion.button>
            <motion.button
              onClick={goToNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/50 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white hover:bg-[#CBACF9]/20 hover:border-[#CBACF9]/30 transition-all duration-300 group z-10"
              aria-label="Next image"
              whileHover={{ scale: 1.1, x: 4 }}
              whileTap={{ scale: 0.9 }}
            >
              <FaChevronRight className="group-hover:translate-x-0.5 transition-transform" size={16} />
            </motion.button>
          </>
        )}

        {/* Image Counter with Animation */}
        <motion.div
          key={`counter-${currentIndex}`}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="absolute top-4 right-4 px-4 py-2 rounded-full bg-black/50 backdrop-blur-sm border border-white/10 z-10"
        >
          <span className="text-white text-sm font-medium">
            {currentIndex + 1} / {images.length}
          </span>
        </motion.div>

        {/* Progress Bar */}
        {images.length > 1 && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10 z-10">
            <motion.div
              className="h-full bg-gradient-to-r from-[#CBACF9] to-[#7c3aed]"
              initial={{ width: "0%" }}
              animate={{ width: `${((currentIndex + 1) / images.length) * 100}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </div>
        )}
      </div>

      {/* Thumbnail Navigation */}
      {images.length > 1 && (
        <div className="mt-6 flex gap-3 overflow-x-auto pb-2 custom-scrollbar">
          {images.map((image, index) => (
            <motion.button
              key={index}
              onClick={() => goToSlide(index)}
              className={`relative flex-shrink-0 w-24 h-24 md:w-32 md:h-32 rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                index === currentIndex
                  ? "border-[#CBACF9] shadow-lg shadow-[#CBACF9]/20"
                  : "border-white/10 hover:border-white/30"
              }`}
              whileHover={{ scale: 1.05, y: -4 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <motion.img
                src={image}
                alt={`Thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
                animate={{
                  scale: index === currentIndex ? 1.1 : 1,
                }}
                transition={{ duration: 0.3 }}
              />
              {/* Overlay for non-active thumbnails */}
              <motion.div
                className="absolute inset-0 bg-black/40"
                animate={{
                  opacity: index === currentIndex ? 0 : 1,
                }}
                transition={{ duration: 0.3 }}
              />
              {/* Active indicator with glow */}
              {index === currentIndex && (
                <>
                  <motion.div
                    layoutId="activeThumb"
                    className="absolute inset-0 border-2 border-[#CBACF9] rounded-xl"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                  <motion.div
                    className="absolute inset-0 bg-[#CBACF9]/10 rounded-xl"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </>
              )}
              {/* Number badge */}
              <motion.div
                className="absolute bottom-2 right-2 w-6 h-6 rounded-full bg-black/70 backdrop-blur-sm flex items-center justify-center"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: index * 0.05 + 0.2 }}
              >
                <span className="text-white text-xs font-semibold">{index + 1}</span>
              </motion.div>
            </motion.button>
          ))}
        </div>
      )}

      {/* Keyboard Navigation Hint with Animation */}
      {images.length > 1 && (
        <motion.div
          className="mt-4 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <p className="text-white/30 text-xs flex items-center justify-center gap-2">
            <motion.span
              animate={{ x: [-2, 2, -2] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            >
              ←
            </motion.span>
            Use arrow keys or swipe to navigate
            <motion.span
              animate={{ x: [2, -2, 2] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            >
              →
            </motion.span>
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default ProjectCarousel;
