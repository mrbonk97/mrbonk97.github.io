"use client";
import Link from "next/link";
import { useState } from "react";
import { FaHandPointLeft } from "react-icons/fa6";

export const CircleHello = () => {
  const [isOn, setIsOn] = useState(false);
  setTimeout(() => setIsOn(true), 5000);
  //prettier-ignore
  const TEXT = ["안","녕","하","세","요","·","반","갑","습","니","다","다","·","살","펴","보","기","·",];
  return (
    <section className="relative">
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
      {isOn && (
        <FaHandPointLeft className="absolute top-1/2 left-56 opacity-80 text-lg font-normal leftright" />
      )}
    </section>
  );
};
