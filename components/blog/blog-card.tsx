import { ArticlePreview } from "@/types";
import Image from "next/image";
import Link from "next/link";

interface Props {
  articlePreview: ArticlePreview;
}

export function BlogCard({ articlePreview }: Props) {
  return (
    <article className="h-full">
      <Link
        href={`/blog/${articlePreview.id}`}
        className="p-4 h-full block rounded bg-secondary hover:bg-secondary/80 duration-150 group"
      >
        <Image
          src={articlePreview.banner}
          alt={articlePreview.title}
          height={1024}
          width={1024}
          priority
          className="max-h-64 rounded object-cover"
        />
        <hgroup className="p-2">
          <h4 className="text-lg font-semibold text-balance break-keep group-hover:underline underline-offset-4">
            {articlePreview.title}
          </h4>
          <p className="mt-2 text-sm text-muted-foreground">
            {articlePreview.summary}
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            {articlePreview.date}
          </p>
          <ul className="mt-2 text-xs text-muted-foreground flex gap-2">
            {articlePreview.tags.map((t) => (
              <li key={`tag-${t}`}>{t}</li>
            ))}
          </ul>
        </hgroup>
      </Link>
    </article>
  );
}
