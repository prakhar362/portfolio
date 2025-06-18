import { TracingBeam } from "./ui/tracing-beam";
import { workExperience } from "@/data";
import Image from "next/image";
import { FaMapMarkerAlt, FaCalendarAlt } from "react-icons/fa";

const Experience = () => {
  return (
    <section id="exprience" className="py-10">
      <div className="font-bold text-6xl text-center mb-10">
        <h1 className="heading text-amber-50">
          My Work{" "}
          <span className="bg-gradient-to-r from-[#d9a7ff] to-[#9b74ff] text-transparent bg-clip-text -ml-4 md:-ml-0">
            Experience
          </span>
        </h1>
      </div>
      <div className="max-w-4xl mx-auto">
        <TracingBeam bulletPoints={workExperience.length}>
          <div className="space-y-12">
            {workExperience.map((exp, index) => (
              <div key={exp.id} className="relative">
                <div className="flex flex-col gap-4">
                  {/* Header with Organization Logo, Bullet, and Title */}
                  <div className="flex items-center gap-2">
                    {/* Org Icon */}
                    <div className="w-16 h-16 relative flex-shrink-0">
                      <Image
                        src={exp.orgThumbnail}
                        alt={exp.organization}
                        fill
                        className="object-contain"
                      />
                    </div>
                    {/* Bullet for all except last item */}
                    {index < workExperience.length - 1 && (
                      <div className="w-3 h-3 rounded-full bg-[#10b981] border-2 border-black shadow-lg mx-2" />
                    )}
                    {/* Title/Org */}
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-white mb-1">{exp.title}</h3>
                      <p className="text-xl text-[#d9a7ff]">{exp.organization}</p>
                    </div>
                  </div>

                  {/* Timeline and Location */}
                  <div className="flex items-center gap-6 text-gray-400">
                    <div className="flex items-center gap-2">
                      <FaCalendarAlt className="text-[#9b74ff]" />
                      <span>{exp.timeline}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaMapMarkerAlt className="text-[#9b74ff]" />
                      <span>{exp.location}</span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-300 leading-relaxed">{exp.desc}</p>

                  {/* Tech Stack */}
                  <div className="flex items-center gap-3">
                    {exp.techStack.map((tech, index) => (
                      <div key={index} className="w-8 h-8 relative">
                        <Image
                          src={tech}
                          alt="tech stack"
                          fill
                          className="object-contain"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </TracingBeam>
      </div>
    </section>
  );
};

export default Experience;
