import { BlogTemplate } from "@/components/blog/blog-template";
import type { Metadata } from "next";
import { ARTICLE } from "./data";

export const metadata: Metadata = {
  title: ARTICLE.title,
  description: ARTICLE.summary,
};

export default function Page() {
  return <BlogTemplate article={ARTICLE} />;
}
