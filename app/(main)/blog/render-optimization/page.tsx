import { ARTICLE } from "./data";
import type { Metadata } from "next";
import { BlogTemplate } from "@/components/blog/blog-template";

export const metadata: Metadata = {
  title: ARTICLE.title,
  description: ARTICLE.title,
};

export default function Page() {
  return <BlogTemplate article={ARTICLE} />;
}
