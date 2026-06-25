import Image from "next/image";

interface Props {
  name: string;
  iconUrl: string;
}

export function StackList({ name, iconUrl }: Props) {
  return (
    <li className="md:aspect-1/2 flex flex-col justify-between rounded-lg bg-secondary">
      <h4 className="p-8 text-2xl md:text-4xl font-semibold md:font-bold text-balance">
        {name}
      </h4>

      <div className="mx-auto p-4 md:p-8 h-32 w-32 md:h-48 md:w-48 flex items-center justify-center rounded-full bg-background">
        <Image src={iconUrl} alt={name} height={512} width={512} />
      </div>

      <h4 className="p-8 opacity-0 text-2xl md:text-4xl font-semibold md:font-bold text-balance">
        {name}
      </h4>
    </li>
  );
}
