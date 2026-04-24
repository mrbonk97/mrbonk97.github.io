import Link from "next/link";

export interface LinkProps {
  links: {
    url: string;
    icon: React.ReactElement;
  }[];
}

export function LinkSection({ links }: LinkProps) {
  return (
    <nav className="mt-8">
      <ul className="space-y-4">
        {links.map((item) => (
          <li key={item.url}>
            <Link
              href={item.url}
              className="w-fit flex items-center gap-4 group"
            >
              <div className="p-2 bg-secondary rounded-lg group-hover:bg-custom-3 duration-150">
                {item.icon}
              </div>
              <span className="text-lg font-medium group-hover:underline underline-offset-2">
                {item.url}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
