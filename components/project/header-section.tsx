import Image from "next/image";

interface Props {
  title: string;
  titleEng: string;
  imgUrl: string;
}

export function HeaderSection({ title, titleEng, imgUrl }: Props) {
  return (
    <header className="mt-4 md:mt-8">
      <h2 className="text-4xl md:text-6xl font-bold">{titleEng}</h2>
      <h1 className="md:mt-2 text-lg md:text-2xl font-semibold text-muted-foreground break-keep">
        {title}
      </h1>
      <Image
        src={imgUrl}
        alt="banner"
        height={1024}
        width={1024}
        className="mt-2 h-48 md:h-115 w-full object-cover rounded-lg"
      />
    </header>
  );
}
