import { useEffect, useRef, useState } from "react";
import { prefersReducedMotion } from "@/lib/animate";
import styles from "./CustomCursor.module.css";

function cursorEnabled(): boolean {
  if (typeof window === "undefined") return false;
  if ("ontouchstart" in window) return false;
  if (!window.matchMedia("(pointer: fine)").matches) return false;
  return !prefersReducedMotion();
}

/**
 * Desktop-only investigator crosshair: a precise accent dot plus a lagging
 * ring. The ring trails via a single rAF lerp loop — one transform write per
 * frame, so it never contends with the main thread the way per-event
 * animations would. The ring dilates over interactive elements.
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

    let targetX = -100;
    let targetY = -100;
    let ringX = -100;
    let ringY = -100;
    let visible = false;
    let raf = 0;

    const loop = () => {
      ringX += (targetX - ringX) * 0.16;
      ringY += (targetY - ringY) * 0.16;
      ringWrap.style.transform = `translate3d(${ringX - 15}px, ${ringY - 15}px, 0)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const onMove = (event: MouseEvent) => {
      targetX = event.clientX;
      targetY = event.clientY;
      if (!visible) {
        visible = true;
        ringX = targetX;
        ringY = targetY;
        dot.style.opacity = "1";
        ringWrap.style.opacity = "1";
      }
      dot.style.transform = `translate3d(${targetX - 3}px, ${targetY - 3}px, 0)`;
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
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.documentElement.classList.remove("custom-cursor");
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
