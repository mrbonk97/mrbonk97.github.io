import { PROJECT_PREVIEWS } from "@/constants";
import Image from "next/image";

export function ProjectListCarousel() {
  const projects = [...PROJECT_PREVIEWS, ...PROJECT_PREVIEWS];

  return (
    <section className="mt-16 overflow-hidden">
      <div className="flex w-max gap-4 animate-marquee">
        {projects.map((item, index) => (
          <div
            key={`${item.id}-${index}`}
            className="shrink-0 w-[66vw] md:w-[24vw]"
          >
            <div className="relative p-4 aspect-square flex items-center justify-center rounded-lg bg-custom-2/50">
              <Image
                src={item.banner}
                alt={item.title}
                width={1080}
                height={1080}
                className="z-10 w-[90%] aspect-4/3 object-cover rounded-lg shadow-2xl"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
