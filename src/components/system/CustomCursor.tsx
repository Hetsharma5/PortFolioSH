import { useEffect, useRef, useState } from "react";
import { anime, prefersReducedMotion } from "@/lib/animate";
import styles from "./CustomCursor.module.css";

function cursorEnabled(): boolean {
  if (typeof window === "undefined") return false;
  if ("ontouchstart" in window) return false;
  if (!window.matchMedia("(pointer: fine)").matches) return false;
  return !prefersReducedMotion();
}

/**
 * Desktop-only investigator crosshair: a precise accent dot plus a lagging
 * ring eased by anime.js. The ring dilates over interactive elements.
 */
export function CustomCursor() {
  const [enabled] = useState(cursorEnabled);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!enabled) return;
    const dot = dotRef.current;
    const ringWrap = ringRef.current;
    if (!dot || !ringWrap) return;

    document.documentElement.classList.add("custom-cursor");
    let visible = false;

    const onMove = (event: MouseEvent) => {
      const { clientX: x, clientY: y } = event;
      if (!visible) {
        visible = true;
        dot.style.opacity = "1";
        ringWrap.style.opacity = "1";
      }
      dot.style.transform = `translate(${x - 3}px, ${y - 3}px)`;
      anime.remove(ringWrap);
      anime({
        targets: ringWrap,
        translateX: x - 15,
        translateY: y - 15,
        duration: 380,
        easing: "easeOutExpo",
      });
    };

    const onOver = (event: MouseEvent) => {
      const target = event.target;
      const interactive =
        target instanceof Element && target.closest('a[href], button, [role="button"]');
      ringWrap.classList.toggle(styles.hover, Boolean(interactive));
    };

    const onLeave = () => {
      visible = false;
      dot.style.opacity = "0";
      ringWrap.style.opacity = "0";
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.documentElement.classList.remove("custom-cursor");
      anime.remove(ringWrap);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <div ref={dotRef} className={styles.dot} aria-hidden="true" />
      <div ref={ringRef} className={styles.ringWrap} aria-hidden="true">
        <div className={styles.ring} />
      </div>
    </>
  );
}
