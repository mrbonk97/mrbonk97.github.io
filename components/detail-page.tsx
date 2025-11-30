import Image from "next/image";
import Link from "next/link";
import { PROGRAMMING_PROJECT } from "@/constants";
import { ImageOff } from "lucide-react";
import { MotionLi } from "./motion/motion-li";

interface Props {
  project: (typeof PROGRAMMING_PROJECT)[0];
}

export function DetailPage({ project }: Props) {
  return (
    <main className="p-4 py-20 mx-auto max-w-4xl space-y-16">
      <header className="mt-2">
        <h1 className="text-4xl font-bold opacity-80">{project.title}</h1>
        <p className="mt-8 max-w-2xl font-medium break-keep opacity-80">
          {project.description}
        </p>
        <p className="mt-4 text-sm font-medium opacity-80">
          {project.duration}
        </p>
        <p className="mt-1 text-sm font-medium opacity-80">
          담당업무: {project.role}
        </p>
        <p className="mt-1 text-sm font-medium opacity-80">
          스택: {project.stack}
        </p>
      </header>
      <section>
        <h4 className="py-2 text-2xl font-semibold opacity-80 border-b">
          링크
        </h4>
        <ul className="mt-2 space-y-1">
          {project.links.length === 0 && (
            <li className="opacity-80">링크가 없습니다.</li>
          )}
          {project.links.map((item) => (
            <li key={item.name} className="flex gap-2">
              <span className="w-16 shrink-0">{item.name}:</span>
              <Link
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2"
              >
                {item.url}
              </Link>
            </li>
          ))}
        </ul>
      </section>
      <section>
        <h4 className="py-2 text-2xl font-semibold opacity-80 border-b">
          이미지
        </h4>
        <ul className="mt-4 space-y-8 md:space-y-16">
          {project.images.length === 0 && (
            <MotionLi className="p-4 w-full aspect-video flex flex-col items-center justify-center bg-secondary">
              <ImageOff size={64} className="opacity-80" />
              <p className="mt-2 mb-8 font-medium text-center opacity-80">
                이미지가 없습니다.
              </p>
            </MotionLi>
          )}
          {project.images.map((item, idx) => (
            <MotionLi key={item}>
              <Image
                src={item}
                height={940}
                width={1660}
                alt={`${project.title}-${idx}`}
                className="border"
              />
            </MotionLi>
          ))}
        </ul>
      </section>
    </main>
  );
}
