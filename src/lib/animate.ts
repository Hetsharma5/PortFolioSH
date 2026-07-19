import anime from "animejs";
import { useEffect, useRef } from "react";

/**
 * Shared animation utilities. All anime.js usage in the app flows through
 * here so the reduced-motion check and the "fire once on scroll into view"
 * IntersectionObserver pattern live in exactly one place.
 */

export function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Runs `callback` the first time `el` enters the viewport, then disconnects.
 * Returns a cleanup function. The caller is responsible for the
 * reduced-motion check (some callers need a fallback branch).
 */
export function onceVisible(
  el: Element,
  callback: () => void,
  options: IntersectionObserverInit = { threshold: 0.2 },
): () => void {
  const observer = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) {
      callback();
      observer.disconnect();
    }
  }, options);
  observer.observe(el);
  return () => observer.disconnect();
}

interface StaggerRevealOptions {
  /** ms between each child. */
  step?: number;
  /** Initial vertical offset in px. */
  y?: number;
  /** Delay before the first child, in ms. */
  delay?: number;
  duration?: number;
  threshold?: number;
}

/**
 * Attach the returned ref to a container: its direct children cascade in
 * (fade + rise) the first time the container scrolls into view.
 */
export function useStaggerReveal<T extends HTMLElement>(options: StaggerRevealOptions = {}) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion()) return;

    const children = Array.from(el.children) as HTMLElement[];
    if (children.length === 0) return;
    children.forEach((child) => {
      child.style.opacity = "0";
    });

    const cleanup = onceVisible(
      el,
      () => {
        anime({
          targets: children,
          opacity: [0, 1],
          translateY: [options.y ?? 26, 0],
          delay: anime.stagger(options.step ?? 90, { start: options.delay ?? 0 }),
          duration: options.duration ?? 700,
          easing: "easeOutCubic",
        });
      },
      { threshold: options.threshold ?? 0.12, rootMargin: "0px 0px -40px 0px" },
    );

    return () => {
      cleanup();
      anime.remove(children);
      children.forEach((child) => {
        child.style.opacity = "";
        child.style.transform = "";
      });
    };
  }, []);

  return ref;
}

export { anime };
