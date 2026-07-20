export type Project = {
  id: string;
  title: string;
  summary: string;
  banner: string;
  metadata: { name: string; content: string | React.ReactNode }[];
  stacks: { name: string; iconUrl: string }[];
  features: { icon: React.ReactNode; name: string; description: string }[];
  content: React.ReactNode[];
  links: { isInside: boolean; name: string; url: string }[];
};

export type ProjectPreview = Pick<
  Project,
  "id" | "title" | "summary" | "banner" | "stacks"
>;

export type SecurityProject = {
  title: string;
  company: string;
  duration: string;
};

export type Article = {
  id: string;
  title: string;
  summary: string;
  date: string;
  banner: string;
  content: React.ReactNode[];
  tags: string[];
};

export type ArticlePreview = Pick<
  Article,
  "id" | "title" | "summary" | "tags" | "banner" | "date"
>;
