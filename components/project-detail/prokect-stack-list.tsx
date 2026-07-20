import Image from "next/image";

interface Props {
  name: string;
  iconUrl: string;
}

export function StackList({ name, iconUrl }: Props) {
  return (
    <li className="p-4 md:p-8 flex flex-col justify-between rounded bg-secondary">
      <h4 className="text-lg md:text-2xl font-semibold text-balance">{name}</h4>

      <div className="my-8 mx-auto p-8 h-32 w-32 md:h-48 md:w-48 flex items-center justify-center rounded-full bg-background">
        <Image src={iconUrl} alt={name} height={512} width={512} />
      </div>
    </li>
  );
}
