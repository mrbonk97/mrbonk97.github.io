interface Props {
  title: string;
  date: string;
}
export function SecurityList({ title, date }: Props) {
  return (
    <li className="p-4 bg-secondary rounded-lg">
      <div className="text-sm font-medium opacity-70">{date}</div>
      <h4 className="mt-1 text-base md:text-lg font-medium break-keep">{title}</h4>
    </li>
  );
}
