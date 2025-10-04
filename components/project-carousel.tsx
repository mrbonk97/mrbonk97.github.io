"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

interface Props {
  images: string[];
}

export const ProjectCarousel = ({ images }: Props) => {
  return (
    <div className="mt-4">
      <Carousel>
        <CarouselContent className="mx-auto w-4/5 max-w-3xl">
          {images.map((item, index) => (
            <CarouselItem key={`image-${index}`}>
              <div className="p-1 rounded-xl bg-neutral-600">
                <div className="py-1 md:py-2 pr-1 flex justify-end gap-2">
                  <div className="h-2 w-2 rounded-full bg-green-500" />
                  <div className="h-2 w-2 rounded-full bg-yellow-500" />
                  <div className="h-2 w-2 rounded-full bg-red-500" />
                </div>
                <Image
                  src={item}
                  alt={`${index}`}
                  height={940}
                  width={1660}
                  className="object-cover rounded-lg"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden md:inline-flex left-5" />
        <CarouselNext className="hidden md:inline-flex right-5" />
      </Carousel>
    </div>
  );
};
