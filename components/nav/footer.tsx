import Image from "next/image";
import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="mt-40 py-10 px-5 text-center md:text-left flex md:items-center justify-center flex-col md:flex-row gap-10 md:gap-20 bg-secondary">
      <Image
        src={"/man.png"}
        alt="man"
        height={128}
        width={128}
        className="mx-auto md:mx-0 object-contain"
      />
      <div>
        <h6 className="text-lg font-semibold">연락처</h6>
        <ul className="mt-2 text-sm">
          <li>이메일: hyunsuk1997@naver.com</li>
          <li>휴대폰: 010-8433-3792</li>
        </ul>
      </div>
      <div>
        <h6 className="text-lg font-semibold">다른 주소</h6>
        <ul className="mt-2 text-sm">
          <li>
            <Link
              target="_blank"
              rel="noopener noreferrer"
              href={"https://www.instagram.com/mrbonk97"}
            >
              인스타그램
            </Link>
          </li>
          <li>
            <Link target="_blank" rel="noopener noreferrer" href={"https://github.com/mrbonk97"}>
              깃허브
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
};
