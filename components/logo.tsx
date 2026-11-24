import { hachiMaru } from "@/lib/fonts";
import Link from "next/link";

export function Logo() {
  return (
    <Link href="/" className={`${hachiMaru.className} text-lg font-medium`}>
      行法
    </Link>
  );
}
