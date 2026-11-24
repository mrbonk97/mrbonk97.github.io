export type Article = {
  id: string;
  title: string;
  summary: string;
  imgUrl: string;
  tag: string;
};

export type DevProject = {
  id: string;
  title: string;
  summary: string;
  imgUrl: string;
  bgUrl?: string;
  tag: string;
  role: string;
  size: string;
  duration: string;
  stack: string[];
};

export type SecProject = {
  title: string;
  duration: string;
  company: string;
};
