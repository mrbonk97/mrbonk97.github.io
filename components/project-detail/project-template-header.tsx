import Image from "next/image";
import Link from "next/link";

interface Props {
  title: string;
  banner: string;
  metadata: { name: string; content: string | React.ReactNode }[];
}

export function ProjectTemplateHeader({ title, banner, metadata }: Props) {
  return (
    <header className="mt-4 md:mt-8">
      <nav className="text-sm flex items-baseline gap-2">
        <Link
          href={"/projects"}
          className="text-muted-foreground hover:text-primary hover:underline underline-offset-4 duration-150"
        >
          프로젝트
        </Link>
        <span className="text-muted-foreground">&gt;</span>
        <span>{title}</span>
      </nav>
      <h1 className="mt-2 md:mt-4 text-2xl md:text-4xl font-bold text-balance break-keep">
        {title}
      </h1>

      <div className="mt-4 p-4 md:p-8 rounded bg-custom-3">
        <Image
          src={banner}
          alt="banner"
          height={1086}
          width={1448}
          className="mx-auto my-8 w-4/5 md:w-1/2 object-contain rounded shadow-2xl"
        />
      </div>
      <hgroup className="mt-8">
        <dl className="space-y-4 md:space-y-8">
          {metadata.map((item) => (
            <div key={`metadata-${item.name}`}>
              <dt className="text-lg font-semibold">{item.name}</dt>
              <dd className="mt-1 md:whitespace-pre-line break-keep">
                {item.content}
              </dd>
            </div>
          ))}
        </dl>
      </hgroup>
    </header>
  );
}
