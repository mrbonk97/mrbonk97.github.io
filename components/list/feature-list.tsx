interface Props {
  name: string;
  description: string;
  icon: React.ReactNode;
}

export function FeatureList({ name, description, icon }: Props) {
  return (
    <li className="p-8 md:aspect-video rounded-lg bg-secondary md:bg-background">
      {icon}
      <h4 className="mt-4 text-lg md:text-2xl font-bold break-keep leading-tight text-balance">
        {name}
      </h4>
      <p className="mt-4 text-sm md:text-base font-normal md:font-medium break-keep text-balance">
        {description}
      </p>
    </li>
  );
}
