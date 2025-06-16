import Image from "next/image";
import Link from "next/link";

interface Props {
  id: number;
  title: string;
  description: string;
  imgUrl: string;
}

export const ArticleCard = ({ id, title, description, imgUrl }: Props) => {
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
        <header className="mt-2">
          <h2 className="font-medium text-2xl">{title}</h2>
          <p className="font-medium opacity-80">{description}</p>
        </header>
      </Link>
    </article>
  );
};
