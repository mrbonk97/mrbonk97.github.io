import { Bird } from "lucide-react";
import { ARTICLES } from "@/asset/articles";
import { ArticleCard } from "@/components/card/article-card";
import { BlogHeader } from "@/components/section/blog-header";
import { BlogNavSection } from "@/components/section/blog-nav-section";

interface Props {
  searchParams: Promise<{ tag: string }>;
}

const BlogPage = async ({ searchParams }: Props) => {
  const tag = (await searchParams).tag;
  const articles = ARTICLES.filter((item) => tag == undefined || item.tag == tag);

  return (
    <main className="pt-20 p-5 mx-auto max-w-6xl">
      <BlogHeader />
      <BlogNavSection className="mt-5 md:mt-20 p-5" curTag={tag} />

      <section className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-10">
        {articles.length == 0 && (
          <div className="text-custom-1 md:col-span-2">
            <Bird size={64} className="mt-10 mx-auto" />
            <p className="mt-5 text-xl font-medium text-center">등록된 게시글이 없습니다...</p>
          </div>
        )}

        {articles.map((item) => (
          <ArticleCard
            key={`article-${item.id}`}
            id={item.id}
            title={item.title}
            tagName={item.tagName}
            imgUrl={item.thumbnail}
          />
        ))}
      </section>
    </main>
  );
};

export default BlogPage;
