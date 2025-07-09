import { BlogHeader } from "@/components/section/blog-header";
import { BlogNavSection } from "@/components/section/blog-nav-section";
import { BlogListSection } from "@/components/section/blog-list-section";
import { Metadata } from "next";
import { Suspense } from "react";
import { Bird } from "lucide-react";
import { BLOG_TAGS } from "@/constant";
import Link from "next/link";

export const metadata: Metadata = {
  title: "行法 | 블로그",
  description: "보안 및 개발 블로그",
  keywords: [
    "mrbonk97",
    "김현석",
    "개발자",
    "보안",
    "취약점",
    "프론트엔드",
    "프로젝트",
    "行法",
    "블로그",
    "포트폴리오",
  ],
  openGraph: {
    title: "行法 | 블로그",
    description: "보안 및 개발 블로그",
    url: "https://mrbonk97.github.io/about-me",
    siteName: "行法",
    images: [
      {
        url: "https://mrbonk97.github.io/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "mrbonk97 프로필",
      },
    ],
    locale: "ko_KR",
  },
  twitter: {
    card: "summary_large_image",
    title: "行法 | 블로그",
    description: "보안 및 개발 블로그",
    images: ["https://mrbonk97.github.io/opengraph-image.png"],
  },
};

const BlogPage = () => {
  return (
    <main className="pt-20 p-5 mx-auto max-w-6xl">
      <BlogHeader />
      <section className="mt-5 md:mt-20 p-5">
        <h2 className="pb-2 text-left text-2xl font-semibold opacity-80 border-b">블로그 게시글</h2>
        <Suspense
          fallback={
            <>
              {BLOG_TAGS.map((item) => (
                <Link
                  key={`suspense-${item.id}`}
                  href={item.tag ? `/blog?tag=${item.tag}` : "/blog"}
                  className="py-2 px-4 rounded-xl bg-secondary aria-selected:bg-custom-1 aria-selected:text-primary-foreground hover:bg-custom-1 hover:text-primary-foreground duration-150"
                >
                  {item.name}
                </Link>
              ))}
            </>
          }
        >
          <BlogNavSection />
        </Suspense>
      </section>
      <section className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-10">
        <Suspense
          fallback={
            <div className="mt-40 text-custom-1 md:col-span-2">
              <Bird size={64} className="mt-10 mx-auto" />
              <p className="mt-5 text-xl font-medium text-center">등록된 게시글이 없습니다...</p>
            </div>
          }
        >
          <BlogListSection />
        </Suspense>
      </section>
    </main>
  );
};

export default BlogPage;
