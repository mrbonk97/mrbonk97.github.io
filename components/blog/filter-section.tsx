"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CATEGORY } from "@/constants/blog";

export function FilterSection() {
  const sp = useSearchParams();
  const filter = sp.get("filter");

  return (
    <nav className="mt-16 pb-1 border-b">
      <ul className="flex justify-end gap-2 font-medium">
        {CATEGORY.map((item) => (
          <li key={item.url}>
            <Link
              href={item.url}
              aria-current={filter == item.tag ? "page" : undefined}
              className="px-2 p-1 rounded-lg hover:underline aria-[current='page']:underline underline-offset-2"
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
