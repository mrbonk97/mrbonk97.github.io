import { ArticlePreview } from "@/types";
import { ARTICLE as Husky } from "./husky-team-workflow/data";

export const ARTICLES: ArticlePreview[] = [Husky].map(
  ({ id, title, summary, tags, banner, date }) => ({
    id,
    title,
    summary,
    tags,
    banner,
    date,
  }),
);
