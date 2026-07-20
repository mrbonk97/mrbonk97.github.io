import Image from "next/image";

interface Props {
  title: string;
  summary: string;
  banner: string;
  date: string;
}
export function BlogTemplateHeader({ title, summary, banner, date }: Props) {
  return (
    <header className="mt-4 md:mt-8">
      <div className="text-sm text-muted-foreground">{date}</div>
      <h1 className="mt-2 md:mt-4 text-2xl md:text-4xl font-bold text-balance break-keep">
        {title}
      </h1>
      <p className="mt-4 text-muted-foreground leading-relaxed text-balance break-keep">
        {summary}
      </p>
      <div className="mt-4 rounded bg-custom-1">
        <Image
          src={banner}
          alt={title}
          height={1024}
          width={1024}
          className="rounded aspect-video object-contain"
        />
      </div>
    </header>
  );
}
