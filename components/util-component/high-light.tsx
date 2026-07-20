interface Props {
  children: React.ReactNode;
}

export function HighLight({ children }: Props) {
  return (
    <span className="inline-block px-1 text-sm bg-neutral-200 rounded">
      {children}
    </span>
  );
}
