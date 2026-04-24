interface Props {
  features: {
    icon: React.ReactNode;
    title: string;
    description: string;
  }[];
}

export function FeatureSection({ features }: Props) {
  return (
    <ul className="mt-4 md:mt-8 grid gap-4 md:grid-cols-2">
      {features.map((feature) => (
        <li
          key={feature.title}
          className="rounded-2xl border border-border bg-secondary/40 p-4"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-background">
            {feature.icon}
          </div>
          <h4 className="mt-4 text-xl font-bold break-keep">{feature.title}</h4>
          <p className="mt-3 text-sm md:text-base leading-7 text-muted-foreground break-keep">
            {feature.description}
          </p>
        </li>
      ))}
    </ul>
  );
}
