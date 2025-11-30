import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-secondary">
      <p className="pt-8 pb-16 text-center text-sm opacity-80">
        Portfolio of{" "}
        <Link
          target="_blank"
          rel="noopener noreferrer"
          href={"https://github.com/mrbonk97"}
          className="underline underline-offset-2"
        >
          @mrbonk97
        </Link>
      </p>
    </footer>
  );
}
