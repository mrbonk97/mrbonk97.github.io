import styles from "./overlay.module.css";
import { hachiMaru, playWrite } from "@/lib/fonts";

export function Title() {
  return (
    <header className="z-20 fixed top-[10%] left-1/2 -translate-x-1/2">
      <div className="overflow-hidden">
        <h1
          className={`h-16 md:h-28 text-center text-5xl md:text-8xl font-bold text-custom-4 ${styles.overlayReverse} ${hachiMaru.className}`}
        >
          行法
        </h1>
      </div>

      <div className="overflow-hidden">
        <h2
          className={`p-2 h-20 md:h-40 text-center text-5xl md:text-8xl font-bold text-custom-4 ${styles.overlayReverse} ${playWrite.className}`}
        >
          Portfolio
        </h2>
      </div>
    </header>
  );
}
