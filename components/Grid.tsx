import { cn } from "@/lib/utils";
import React from "react";
import { BentoGrid, BentoGridItem } from "./ui/bento-grid";
import Image from "next/image";

const items = [
  {
    id: 1,
     title: "I prioritize client collaboration, fostering open communication ",
    description: "",
    className: "md:col-span-2",
    imgClassName: "absolute right-0 -bottom-20 md:w-96 w-60",
    titleClassName: "justify-end",
    img: "/b1.svg",
    spareImg: "",
    
    
  },
  {
    id: 2,
    title: "I'm very flexible with time zone communications",
    description: "",
    className: "md:col-span-1",
    imgClassName: "",
    titleClassName: "justify-start",
    img: "",
    spareImg: "",
   
    
  },
  {
    id: 3,
    title: "Do you want to start a project together?",
    description: "",
    className: "md:col-span-1",
    imgClassName: "",
    titleClassName: "justify-center md:max-w-full max-w-60 text-center",
    img: "",
    spareImg: "",
  },
  {
    id: 4,
    title: "Currently building a JS Animation library",
    description: "The Inside Scoop",
    className: "md:col-span-2",
    imgClassName: "absolute right-0 bottom-0 md:w-96 w-60",
    titleClassName: "justify-center md:justify-start lg:justify-center",
    img: "/b5.svg",
    spareImg: "/grid.svg",
  },
  
];

const Grid = () => {
  return (
    <section id="about">
      <BentoGrid className="w-full mx-auto md:auto-rows-[24rem]">
        {items.map((item, i) => (
          <BentoGridItem
            key={i}
            title={item.title}
            description={item.description}
            className={item.className}
            header={
              <div className="relative w-full h-full">
                {item.img && (
                  <Image
                    src={item.img}
                    alt={item.title}
                    fill
                    className={cn("object-cover rounded-xl", item.imgClassName)}
                  />
                )}
                {item.spareImg && (
                  <Image
                    src={item.spareImg}
                    alt="spare"
                    fill
                    className="object-cover rounded-xl"
                  />
                )}
              </div>
            }
          />
        ))}
      </BentoGrid>
    </section>
  );
};

export default Grid;