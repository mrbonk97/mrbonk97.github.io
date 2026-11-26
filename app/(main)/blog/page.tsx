import type { Metadata } from "next";
import BlogHeader from "@/components/blog/blog-header";

export const metadata: Metadata = {
  title: "블로그 | 포트폴리오",
};

export default function Blog() {
  return (
    <main className="min-h-svh p-4 lg:p-8 pt-20 lg:pt-24 mx-auto max-w-7xl">
      <BlogHeader />

      <section className="mt-16">
        <h2 className="pb-4 text-2xl font-semibold border-b">작성한 글</h2>
        <p className="mt-8 text-muted-foreground">아직 작성한 글이 없습니다.</p>
      </section>
    </main>
  );
}
