import Image from "next/image";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-20 bg-secondary text-center md:text-left">
      <div className="py-12 p-4 mx-auto max-w-7xl flex flex-col md:flex-row gap-8 md:gap-16">
        <Image
          src={"/images/icons/man.png"}
          alt="man"
          height={512}
          width={512}
          quality={100}
          className="mx-auto w-32 object-contain"
        />
        <section>
          <h5 className="text-lg font-semibold opacity-80">사이트맵</h5>
          <ul className="text-sm">
            <li>
              <Link href={"/"} className="hover:underline underline-offset-2">
                홈
              </Link>
            </li>
            <li>
              <Link href={"/projects"} className="hover:underline underline-offset-2">
                프로젝트
              </Link>
            </li>
            <li>
              <Link href={"/about-me"} className="hover:underline underline-offset-2">
                소개
              </Link>
            </li>
          </ul>
        </section>
        <section>
          <h5 className="text-lg font-semibold opacity-80">외부링크</h5>
          <ul className="text-sm">
            <li>
              <Link
                target="_blank"
                rel="noopener noreferrer"
                href="https://github.com/mrbonk97"
                className="hover:underline underline-offset-2"
              >
                깃허브
              </Link>
            </li>
          </ul>
        </section>
        <section>
          <h5 className="text-lg font-semibold opacity-80">문의</h5>
          <ul className="text-sm">
            <li>hyunsuk1997@naver.com</li>
          </ul>
        </section>
      </div>
    </footer>
  );
}
