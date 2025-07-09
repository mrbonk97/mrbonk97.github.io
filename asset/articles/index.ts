export const ARTICLES: ArticleType[] = [];

export type ArticleType = {
  id: number;
  tag: "security" | "life";
  tagName: "보안" | "인생";
  title: string;
  thumbnail: string;
};
