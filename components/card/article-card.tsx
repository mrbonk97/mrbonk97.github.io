import Image from "next/image";
import Link from "next/link";

interface Props {
  id: number;
  title: string;
  tagName: string;
  imgUrl: string;
}

export const ArticleCard = ({ id, title, tagName, imgUrl }: Props) => {
  return (
    <article>
      <Link
        href={`/blog/${id}`}
        className="p-5 block rounded-xl hover:bg-secondary duration-150 group"
      >
        <Image
          src={imgUrl}
          alt={title}
          height={512}
          width={512}
          className="w-full object-cover group-hover:rounded-xl duration-150"
        />
        <h2 className="mt-2 font-medium text-lg sm:text-2xl md:text-lg lg:text-xl">{title}</h2>
        <div className="mt-0.5 font-medium text-sm md:text-base opacity-70">#{tagName}</div>
      </Link>
    </article>
  );
};
