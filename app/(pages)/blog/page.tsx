import Image from "next/image";
import { playWrite } from "@/lib/fonts";
import { FilterSection } from "@/components/blog/filter-section";
import { Suspense } from "react";

export default function BlogPage() {
  return (
    <main className="pt-20 p-4 mx-auto max-w-5xl">
      <header className="md:mt-8 p-4 grid grid-cols-2 items-center gap-4 rounded-lg bg-custom-2">
        <Image
          src={"/images/blog-banner.svg"}
          alt="arch"
          height={1024}
          width={1024}
          className="w-96"
        />
        <h1
          className={`md:mb-8 md:mr-4 text-4xl md:text-8xl font-bold text-custom-4 text-center ${playWrite.className}`}
        >
          Blog
        </h1>
      </header>

      <Suspense fallback={null}>
        <FilterSection />
      </Suspense>

      <section className="mt-16">
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4"></ul>
      </section>
    </main>
  );
}
