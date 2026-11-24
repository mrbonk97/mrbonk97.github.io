import type { ReactNode } from "react";
import styles from "./landing/title.module.css";

export function TitleReveal({ children }: { children: ReactNode }) {
  return (
    <div className="overflow-hidden">
      <div className={styles.reveal}>{children}</div>
    </div>
  );
}
