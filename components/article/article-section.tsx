interface Props {
  title: string;
  children: React.ReactNode;
}
export function ArticleSection({ title, children }: Props) {
  return (
    <section className="mt-16">
      <h2 className="mb-4 pb-2 text-2xl font-medium border-b">{title}</h2>
      {children}
    </section>
  );
}
