import Link from "next/link";

export const CircleHello = () => {
  //prettier-ignore
  const TEXT = ["안","녕","하","세","요","·","반","갑","습","니","다","다","·","살","펴","보","기","·",];
  return (
    <Link
      className="relative text-xl font-semibold h-[200px] w-[200px] spin text-primary-400/80 hover:text-primary-400 duration-150 cursor-pointer flex2"
      href="/project"
    >
      {TEXT.map((item, idx) => (
        <span
          key={idx}
          className="circle"
          style={{ rotate: `${(idx + 1) * 20}deg` }}
        >
          {item}
        </span>
      ))}
    </Link>
  );
};
