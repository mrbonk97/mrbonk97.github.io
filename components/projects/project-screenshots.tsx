import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface Props {
  projectId: string;
  screenshots: { file: string; alt: string }[];
  width: number;
  height: number;
}

export function ProjectScreenshots({
  projectId,
  screenshots,
  width,
  height,
}: Props) {
  const portrait = height > width;

  return (
    <Carousel opts={{ align: "start" }} tabIndex={0}>
      <CarouselContent>
        {screenshots.map(({ file, alt }) => (
          <CarouselItem
            key={file}
            className={portrait ? "basis-4/5 sm:basis-2/5" : "basis-4/5"}
          >
            <figure className="p-4 rounded border">
              <Image
                src={`/projects/${projectId}/screenshot/${file}`}
                alt={alt}
                width={width}
                height={height}
                sizes={
                  portrait
                    ? "(min-width: 768px) 251px, (min-width: 640px) calc(40vw - 56.4px), calc(80vw - 62.8px)"
                    : "(min-width: 768px) 552px, calc(80vw - 62.8px)"
                }
                draggable={false}
                className="h-auto w-full rounded"
              />
            </figure>
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="mt-4 flex justify-end gap-2">
        <CarouselPrevious
          variant="secondary"
          size="icon"
          className="static m-0"
        />
        <CarouselNext
          variant="secondary"
          size="icon"
          className="static m-0"
        />
      </div>
    </Carousel>
  );
}
