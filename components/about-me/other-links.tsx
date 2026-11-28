import Link from "next/link";

const externalLinks = [
  {
    name: "GitHub",
    href: "https://github.com/mrbonk97",
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/mrbonk97",
  },
];

export function OtherLinks() {
  return (
    <section className="mt-32">
      <h2 className="text-2xl font-semibold">외부 링크</h2>

      <ul className="mt-4 grid gap-4 md:grid-cols-2">
        {externalLinks.map((link) => (
          <li key={link.name}>
            <Link
              href={link.href}
              target="_blank"
              rel="noreferrer"
              className="block p-4 md:p-8 rounded bg-secondary transition-colors duration-150 hover:bg-secondary/80"
            >
              <h3 className="text-2xl font-semibold">{link.name}</h3>
              <span className="sr-only">새 창에서 열기</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
