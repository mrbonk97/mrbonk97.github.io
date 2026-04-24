import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-64 bg-secondary">
      <div className="p-4 mx-auto max-w-5xl">
        <p className="pt-8 pb-16 text-center text-sm">
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
      </div>
    </footer>
  );
}
