interface Props {
  children: React.ReactNode;
}

export function HighLight({ children }: Props) {
  return (
    <span className="mb-px inline-block px-2 py-0.75 text-sm bg-neutral-200 rounded-lg">
      {children}
    </span>
  );
}
