import { useEffect, useRef } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { chapters } from "@/data/chapters";
import { anime, onceVisible, prefersReducedMotion } from "@/lib/animate";
import styles from "./Experience.module.css";

export function Experience() {
  const listRef = useRef<HTMLOListElement>(null);

  // Each chapter slides in (alternating left/right) and its marker pulses
  // once the first time it scrolls into view.
  useEffect(() => {
    const list = listRef.current;
    if (!list || prefersReducedMotion()) return;

    const items = Array.from(list.querySelectorAll<HTMLElement>(`.${styles.item}`));
    const cleanups = items.map((item, i) => {
      const marker = item.querySelector<HTMLElement>(`.${styles.marker}`);
      return onceVisible(
        item,
        () => {
          anime({
            targets: item,
            opacity: [0, 1],
            translateX: [i % 2 === 0 ? -38 : 38, 0],
            duration: 750,
            easing: "easeOutCubic",
          });
          if (marker) {
            anime({
              targets: marker,
              scale: [
                { value: 0, duration: 0 },
                { value: 1.3, duration: 320, easing: "easeOutBack" },
                { value: 1, duration: 220, easing: "easeOutQuad" },
              ],
              opacity: [0, 1],
              delay: 150,
            });
          }
        },
        { threshold: 0.25, rootMargin: "0px 0px -40px 0px" },
      );
    });

    return () => {
      cleanups.forEach((cleanup) => cleanup());
      anime.remove(items);
    };
  }, []);

  return (
    <section id="experience" className="section">
      <div className="container">
        <SectionHeading
          index="04"
          eyebrow="Field Experience"
          title="The story so far, in chapters."
        />

        <ol ref={listRef} className={styles.timeline}>
          {chapters.map((chapter) => (
            <li
              key={chapter.label}
              className={`${styles.item} ${chapter.current ? styles.current : ""}`}
            >
              <span className={styles.marker} aria-hidden="true" />
              <p className={styles.chapterLabel}>
                {chapter.label}
                {chapter.current && <span className={styles.inProgress}>IN PROGRESS</span>}
              </p>
              <div className={styles.head}>
                <h3 className={styles.title}>{chapter.title}</h3>
                <span className={styles.period}>{chapter.period}</span>
              </div>
              <p className={styles.body}>{chapter.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
