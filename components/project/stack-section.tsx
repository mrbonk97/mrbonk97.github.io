import Image from "next/image";

interface Props {
  stack: {
    title: string;
    icon: string;
  }[];
}

export function StackSection({ stack }: Props) {
  return (
    <ul className="mt-4 md:mt-8 p-4 md:p-8 rounded-lg bg-secondary grid grid-cols-2 gap-4 md:gap-8">
      {stack.map((item) => (
        <li key={item.title} className="p-4 md:p-8 rounded-lg bg-background">
          <div className="md:flex items-center gap-4">
            <Image
              src={item.icon}
              alt={item.title}
              height={128}
              width={128}
              className="p-2 mx-auto md:mx-0 w-16 aspect-square rounded-lg object-contain md:bg-secondary"
            />
            <h5 className="text-lg md:text-2xl text-center md:text-left font-semibold">
              {item.title}
            </h5>
          </div>
        </li>
      ))}
    </ul>
  );
}
