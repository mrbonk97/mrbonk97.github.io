import { getStackLogo } from "@/constants/tech-stack";
import { CodeXml } from "lucide-react";
import Image from "next/image";

export function TechStackLabel({
  name,
  compact = false,
}: {
  name: string;
  compact?: boolean;
}) {
  const logo = getStackLogo(name);
  const size = compact ? 16 : 32;

  return (
    <span
      className={
        compact
          ? "flex min-w-0 items-center gap-2"
          : "min-w-0 flex flex-col sm:flex-row items-start sm:items-center gap-2"
      }
    >
      <span className={compact ? "size-4 shrink-0" : "size-8 shrink-0"}>
        {logo ? (
          <Image src={logo.src} alt="" width={size} height={size} />
        ) : (
          <CodeXml size={size} className="text-muted-foreground" />
        )}
      </span>
      <span className="min-w-0">{name}</span>
    </span>
  );
}

export function TechStack({ items }: { items: readonly string[] }) {
  return (
    <ul className="grid grid-cols-2 gap-4">
      {items.map((name) => (
        <li key={name} className="p-4 bg-secondary rounded">
          <TechStackLabel name={name} />
        </li>
      ))}
    </ul>
  );
}
