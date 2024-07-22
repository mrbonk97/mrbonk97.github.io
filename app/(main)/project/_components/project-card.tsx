import Image from "next/image";

interface ProjectCardProps {
  bgColor: string;
  imageUrl: string;
  imageName: string;
}
export const ProjectCard = ({
  bgColor,
  imageUrl,
  imageName,
}: ProjectCardProps) => {
  return (
    <article
      className="h-full w-full flex2"
      style={{ backgroundColor: bgColor }}
    >
      {/* <Image
        src={imageUrl}
        alt={imageName}
        width={320}
        height={320}
        className="max-w-80 w-full"
      /> */}
      <img
        src={imageUrl}
        alt={imageUrl}
        width={320}
        height={320}
        className="max-w-80 w-full"
      />
    </article>
  );
};
