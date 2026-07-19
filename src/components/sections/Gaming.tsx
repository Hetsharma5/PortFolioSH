import { useEffect, useRef } from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { gaming } from "@/data/gaming";
import { icons } from "@/icons";
import { anime, onceVisible, prefersReducedMotion, useStaggerReveal } from "@/lib/animate";
import styles from "./Gaming.module.css";

export function Gaming() {
  const Gamepad = icons.gamepad;
  const gridRef = useStaggerReveal<HTMLDivElement>({ step: 120, y: 26 });
  const fillsRef = useRef<HTMLDivElement>(null);

  // Save-slot progress bars load in once the grid scrolls into view.
  useEffect(() => {
    const grid = fillsRef.current;
    if (!grid || prefersReducedMotion()) return;

    const fills = Array.from(grid.querySelectorAll<HTMLElement>(`.${styles.progressFill}`));
    fills.forEach((fill) => {
      fill.style.width = "0%";
    });
    const cleanup = onceVisible(grid, () => {
      anime({
        targets: fills,
        width: (el: HTMLElement) => `${el.dataset.progress}%`,
        delay: anime.stagger(160, { start: 400 }),
        duration: 1100,
        easing: "easeInOutQuad",
      });
    });
    return () => {
      cleanup();
      anime.remove(fills);
    };
  }, []);

  return (
    <section id="gaming" className="section">
      <div className="container">
        <SectionHeading
          index="08"
          eyebrow="Current Side Quest"
          title="Every good detective has a hobby."
          lead={gaming.lead}
        />

        <div
          ref={(node) => {
            gridRef.current = node;
            fillsRef.current = node;
          }}
          className={styles.grid}
        >
          {gaming.slots.map((slot) => (
            <GlassCard key={slot.slot} interactive className={styles.card}>
              <div className={styles.scanlines} aria-hidden="true" />
              <div className={styles.head}>
                <span className={styles.saveLabel}>
                  <Gamepad size={14} />
                  SAVE FILE — SLOT {slot.slot}
                </span>
                <span className={styles.lastSaved}>SAVED {slot.lastSaved.toUpperCase()}</span>
              </div>

              <h3 className={styles.title}>{slot.title}</h3>
              <p className={styles.note}>{slot.note}</p>

              <div className={styles.foot}>
                <span className={styles.playtime}>PLAYTIME: {slot.playtime}</span>
                <div
                  className={styles.progress}
                  role="progressbar"
                  aria-valuenow={slot.progress}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label={`${slot.title} progress`}
                >
                  <div
                    className={styles.progressFill}
                    data-progress={slot.progress}
                    style={{ width: `${slot.progress}%` }}
                  />
                </div>
                <span className={styles.percent}>{slot.progress}%</span>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}
