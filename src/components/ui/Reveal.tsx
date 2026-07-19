import { useEffect, useRef, type ReactNode } from "react";
import { anime, onceVisible, prefersReducedMotion } from "@/lib/animate";
import styles from "./Reveal.module.css";

interface RevealProps {
  children: ReactNode;
  /** Extra animation delay in ms — use to stagger sibling reveals. */
  delay?: number;
  className?: string;
}

/**
 * Fades content in with a rise (anime.js) the first time it enters the
 * viewport. Fires once; instant under prefers-reduced-motion.
 */
export function Reveal({ children, delay = 0, className }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (prefersReducedMotion()) {
      el.classList.add(styles.visible);
      return;
    }

    const cleanup = onceVisible(
      el,
      () => {
        anime({
          targets: el,
          opacity: [0, 1],
          translateY: [30, 0],
          duration: 800,
          delay,
          easing: "easeOutCubic",
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -48px 0px" },
    );

    return () => {
      cleanup();
      anime.remove(el);
    };
  }, [delay]);

  return (
    <div ref={ref} className={`${styles.reveal} ${className ?? ""}`}>
      {children}
    </div>
  );
}
