"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { BLOG_TAGS } from "@/constant";

export const BlogNavSection = () => {
  const searchParams = useSearchParams();
  const tag = searchParams.get("tag");

  return (
    <nav className="mt-2 flex items-center gap-5 text-sm font-medium">
      {BLOG_TAGS.map((item) => (
        <Link
          key={item.id}
          aria-selected={item.tag == tag}
          href={item.tag ? `/blog?tag=${item.tag}` : "/blog"}
          className="py-2 px-4 rounded-xl bg-secondary aria-selected:bg-custom-1 aria-selected:text-primary-foreground hover:bg-custom-1 hover:text-primary-foreground duration-150"
        >
          {item.name}
        </Link>
      ))}
    </nav>
  );
};
