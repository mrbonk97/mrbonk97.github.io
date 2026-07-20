import { Metadata } from "next";
import { ARTICLES } from "./data";
import { BlogCard } from "@/components/blog/blog-card";
import BlogHeader from "@/components/blog/blog-header";

export const metadata: Metadata = {
  title: "블로그 | 포트폴리오",
};

async function Blog() {
  return (
    <main className="p-4 md:p-8 pt-12 md:pt-16 mx-auto max-w-5xl">
      <BlogHeader />

      <section className="mt-16">
        <h2 className="pb-2 text-2xl md:text-4xl font-semibold border-b">
          작성한 글
        </h2>

        <ul className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          {ARTICLES.map((ap) => (
            <BlogCard key={ap.title} articlePreview={ap} />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Blog;
