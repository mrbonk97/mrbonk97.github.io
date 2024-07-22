import { FaGithub, FaLink } from "react-icons/fa6";
import { RiNotionFill } from "react-icons/ri";

interface ProjectCardProps {
  title: string;
  duration: string;
  imageUrl: string;
  imageName: string;
  size: string;
  work: string;
  desc: string;
  stack: String[];
  cicd: String[] | null;
  bgColor: string;
  textColor: string;
  links: {
    github: string | null;
    web: string | null;
    notion: string | null;
  };
  onHover: () => void;
}
export const ProjectCard2 = ({
  title,
  duration,
  imageUrl,
  imageName,
  size,
  work,
  desc,
  stack,
  bgColor,
  textColor,
  links,
  cicd,
  onHover,
}: ProjectCardProps) => {
  return (
    <article
      onMouseEnter={onHover}
      className="flex px-2 h-full w-full items-center justify-center flex-col gap-5"
      style={{ backgroundColor: bgColor, color: textColor }}
    >
      <img
        src={imageUrl}
        alt={imageName}
        width={200}
        height={200}
        className="md:hidden"
      />
      <h3 className="mt-5 opacity-90 text-3xl sm:text-4xl font-bold text-center leading-snug break-keep">
        {title}
      </h3>
      <h4 className="opacity-90 text-2xl font-medium">{duration}</h4>
      <table className="opacity-90 text-lg">
        <tbody>
          <tr>
            <td className="p-2 w-16 text-right">규모: </td>
            <td>{size}</td>
          </tr>
          <tr>
            <td className="p-2 w-16 text-right">설명: </td>
            <td>{desc}</td>
          </tr>
          <tr>
            <td className="p-2 w-16 text-right">업무: </td>
            <td>{work}</td>
          </tr>
          <tr>
            <td className="p-2 w-16 text-right">스택: </td>
            <td>
              <ul className="flex gap-3">
                {stack.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </td>
          </tr>
          {cicd && (
            <tr>
              <td className="p-2 w-16 text-right">CICD: </td>
              <td>
                <ul className="flex gap-3">
                  {cicd.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="opacity-90 flex justify-center gap-7">
        {links.github && (
          <a target="_blank" rel="noopener noreferrer" href={links.github}>
            <FaGithub size={36} className="hover:opacity-80 duration-200" />
          </a>
        )}
        {links.web && (
          <a target="_blank" rel="noopener noreferrer" href={links.web}>
            <FaLink size={36} className="hover:opacity-80 duration-200" />
          </a>
        )}
        {links.notion && (
          <a target="_blank" rel="noopener noreferrer" href={links.notion}>
            <RiNotionFill size={36} className="hover:opacity-80 duration-200" />
          </a>
        )}
      </div>
    </article>
  );
};
