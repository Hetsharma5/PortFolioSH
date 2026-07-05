import { useScrolled } from "@/hooks/useScrolled";
import { icons } from "@/icons";
import styles from "./BackToTop.module.css";

export function BackToTop() {
  const visible = useScrolled(600);
  const ArrowUp = icons.arrowUp;

  const scrollToTop = () => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
  };

  return (
    <button
      type="button"
      className={`${styles.button} ${visible ? styles.visible : ""}`}
      onClick={scrollToTop}
      aria-label="Back to top"
      tabIndex={visible ? 0 : -1}
    >
      <ArrowUp size={20} />
    </button>
  );
}
