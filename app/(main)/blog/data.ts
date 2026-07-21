import { ArticlePreview } from "@/types";
import { ARTICLE as Husky } from "./husky-team-workflow/data";
import { ARTICLE as Render } from "./render-optimization/data";
import { ARTICLE as Presigned } from "./presigned-url-upload-risk/data";

export const ARTICLES: ArticlePreview[] = [Husky, Render, Presigned].map(
  ({ id, title, summary, tags, banner, date }) => ({
    id,
    title,
    summary,
    tags,
    banner,
    date,
  }),
);
