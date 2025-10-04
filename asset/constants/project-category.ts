import { PROGRAMMING_PROJECT } from "./programming-project";
import { SECURITY_PROJECT } from "./security-project";

export const PROJECT_CATEGORY = [
  {
    url: "/projects",
    title: "All",
    count: PROGRAMMING_PROJECT.length + SECURITY_PROJECT.length,
  },
  {
    url: "/projects?filter=programming",
    title: "Programming",
    count: PROGRAMMING_PROJECT.length,
  },
  {
    url: "/projects?filter=security",
    title: "Security",
    count: SECURITY_PROJECT.length,
  },
];
