import { BLOG_TAGS } from "@/constant";
import Link from "next/link";

interface Props {
  className?: string;
  curTag: string | undefined;
}

export const BlogNavSection = ({ className, curTag }: Props) => (
  <section className={className}>
    <h2 className="pb-2 text-left text-2xl font-semibold opacity-80 border-b">블로그 게시글</h2>
    <nav className="mt-2 flex items-center gap-5 text-sm font-medium">
      {BLOG_TAGS.map((item) => (
        <Link
          key={item.id}
          aria-selected={item.tag == curTag}
          href={item.tag ? `/blog?tag=${item.tag}` : "/blog"}
          className="py-2 px-4 rounded-xl bg-secondary aria-selected:bg-custom-1 aria-selected:text-primary-foreground hover:bg-custom-1 hover:text-primary-foreground duration-150"
        >
          {item.name}
        </Link>
      ))}
    </nav>
  </section>
);
