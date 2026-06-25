import Image from "next/image";
import Link from "next/link";

export function Logo() {
  return (
    <Link href={"/"}>
      <Image
        src={"/logo.svg"}
        alt="行法"
        height={256}
        width={256}
        className="h-8 w-fit"
      />
    </Link>
  );
}
