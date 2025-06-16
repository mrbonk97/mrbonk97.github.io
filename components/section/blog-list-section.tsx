"use client";

import { ARTICLES } from "@/asset/articles";
import { Bird } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { ArticleCard } from "../card/article-card";

export const BlogListSection = () => {
  const searchParams = useSearchParams();
  const tag = searchParams.get("tag");
  const articles = ARTICLES.filter((item) => tag == undefined || item.tag == tag);

  if (articles.length == 0)
    return (
      <div className="text-custom-1 md:col-span-2">
        <Bird size={64} className="mt-10 mx-auto" />
        <p className="mt-5 text-xl font-medium text-center">등록된 게시글이 없습니다...</p>
      </div>
    );

  return (
    <>
      {articles.map((item) => (
        <ArticleCard
          key={`article-${item.id}`}
          id={item.id}
          title={item.title}
          tagName={item.tagName}
          imgUrl={item.thumbnail}
        />
      ))}
    </>
  );
};
