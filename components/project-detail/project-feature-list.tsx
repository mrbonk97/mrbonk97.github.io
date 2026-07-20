interface Props {
  name: string;
  description: string;
  icon: React.ReactNode;
}

export function FeatureList({ name, description, icon }: Props) {
  return (
    <li className="p-8 rounded bg-secondary">
      <header className="flex items-center gap-4">
        {icon}
        <h4 className="text-lg md:text-2xl font-bold break-keep leading-tight text-balance">
          {name}
        </h4>
      </header>
      <p className="mt-8 text-sm md:text-base font-normal md:font-medium break-keep text-balance">
        {description}
      </p>
    </li>
  );
}
