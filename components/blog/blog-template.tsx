import { BlogTemplateHeader } from "./blog-template-header";
import { Article } from "@/types";

interface Props {
  article: Article;
}
export function BlogTemplate({ article }: Props) {
  return (
    <main className="p-4 md:p-8 pt-12 md:pt-16 mx-auto max-w-4xl">
      <BlogTemplateHeader
        banner={article.banner}
        title={article.title}
        summary={article.summary}
        date={article.date}
      />

      {article.content.map((item) => item)}
    </main>
  );
}
