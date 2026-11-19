import { hachiMaru, playWrite } from "@/lib/fonts";
import styles from "./title.module.css";

export function Title() {
  return (
    <hgroup className="fixed top-[10%] left-1/2 z-10 -translate-x-1/2 text-center text-5xl font-bold text-custom-400 md:text-8xl">
      <h1 className="overflow-hidden">
        <span
          className={`block h-16 md:h-28 ${hachiMaru.className} ${styles.reveal}`}
        >
          行法
        </span>
      </h1>
      <h2 className="mt-2 overflow-hidden">
        <span
          className={`block h-20 p-2 md:h-40 ${playWrite.className} ${styles.reveal}`}
        >
          Portfolio
        </span>
      </h2>
    </hgroup>
  );
}
