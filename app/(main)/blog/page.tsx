import Link from "next/link";
import { BLOG_CATEGORY } from "@/constants";
import { ModelViewer } from "@/components/model-viewer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "블로그 | 포트폴리오",
};

async function Blog() {
  return (
    <main className="p-4 md:p-8 mx-auto max-w-7xl">
      <ModelViewer />

      <section className="mt-16">
        <h2 className="md:pb-2 text-lg md:text-2xl font-medium border-b border-slate-200">
          작성한 글
        </h2>

        <ul className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8"></ul>
      </section>
    </main>
  );
}

export default Blog;
