interface Props {
  eyebrow?: string;
  title: string;
  description?: string;
}

export function TitleSection({ eyebrow, title, description }: Props) {
  return (
    <header>
      {eyebrow && (
        <p className="text-sm md:text-lg font-semibold text-custom-2">
          {eyebrow}
        </p>
      )}
      <h3 className="text-2xl md:text-4xl font-bold">{title}</h3>
      {description && (
        <p className="mt-4 text-muted-foreground">{description}</p>
      )}
    </header>
  );
}
