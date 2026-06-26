export type Project = {
  title: string;
  subtitle: string;
  banner: string;
  metadata: { name: string; content: string | React.ReactNode }[];
  stacks: { name: string; iconUrl: string }[];
  features: { icon: React.ReactNode; name: string; description: string }[];
  content: React.ReactNode[];
  links: { isInside: boolean; name: string; url: string }[];
};

export type ProjectPreview = Pick<Project, "title" | "banner"> & {
  id: string;
  summary: string;
  tags: string[];
  stacks: string[];
  backgroundImg: string;
};

export type SecurityProject = {
  title: string;
  company: string;
  duration: string;
};
