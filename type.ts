export type ArticleType = {
  tag: string;
  tagName: string;
  title: string;
  description: string;
  imgUrl: string;
  paragraphs: { key: string; title: string; content: string }[];
};
