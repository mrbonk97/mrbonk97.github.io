import type { CSSProperties, Ref } from "react";
import styles from "./curtain.module.css";

export function Curtain({
  overlay = false,
  initiallyCovered = false,
  ref,
}: {
  overlay?: boolean;
  initiallyCovered?: boolean;
  ref?: Ref<HTMLDivElement>;
}) {
  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={`${styles.curtain}${overlay ? ` ${styles.overlay}` : ""}${initiallyCovered ? ` ${styles.covered}` : ""}`}
    >
      {Array.from({ length: 5 }, (_, index) => (
        <span
          key={index}
          className={`${styles.column} ${overlay ? "bg-custom-100" : "bg-custom-200"}`}
          style={{ "--column-index": index } as CSSProperties}
        />
      ))}
    </div>
  );
}
