import { hachiMaru } from "@/lib/fonts";
import Link from "next/link";

export function Logo({ className = "text-lg" }: { className?: string }) {
  return (
    <Link href="/" className={`${hachiMaru.className} ${className} font-medium`}>
      行法
    </Link>
  );
}
