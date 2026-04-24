import styles from "./overlay.module.css";

export function Overlay() {
  return <div className={`z-10 fixed inset-0 bg-custom-2 ${styles.overlay}`} />;
}
