interface Props {
  subtitle: string;
  subsubtitle: string;
  children: React.ReactNode;
}
export function BlogTemplateContent({
  subtitle,
  subsubtitle,
  children,
}: Props) {
  return (
    <section className="mt-16">
      <header>
        <h4>{subtitle}</h4>
        <h6>{subsubtitle}</h6>
      </header>
      {children}
    </section>
  );
}
