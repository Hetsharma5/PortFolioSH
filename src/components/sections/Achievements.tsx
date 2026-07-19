import { useEffect, useRef } from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { achievements, type Achievement } from "@/data/achievements";
import { icons } from "@/icons";
import { anime, onceVisible, prefersReducedMotion, useStaggerReveal } from "@/lib/animate";
import styles from "./Achievements.module.css";

/** Splits "7.76 SGPA" into { target: 7.76, decimals: 2, suffix: " SGPA" }. */
function parseMetric(metric: string) {
  const match = /^(\d+(?:\.\d+)?)(.*)$/.exec(metric);
  if (!match) return null;
  return {
    target: parseFloat(match[1]),
    decimals: match[1].includes(".") ? match[1].split(".")[1].length : 0,
    suffix: match[2],
  };
}

function AchievementCard({ achievement }: { achievement: Achievement }) {
  const Icon = icons[achievement.icon];
  const metricRef = useRef<HTMLParagraphElement>(null);

  // Count the stat up from zero the first time it scrolls into view.
  useEffect(() => {
    const el = metricRef.current;
    if (!el || prefersReducedMotion()) return;
    const parsed = parseMetric(achievement.metric);
    if (!parsed) return;

    const proxy = { value: 0 };
    el.textContent = `0${parsed.suffix}`;
    const cleanup = onceVisible(el, () => {
      anime({
        targets: proxy,
        value: parsed.target,
        duration: 1400,
        easing: "easeOutExpo",
        update: () => {
          el.textContent = `${proxy.value.toFixed(parsed.decimals)}${parsed.suffix}`;
        },
        complete: () => {
          el.textContent = achievement.metric;
        },
      });
    });
    return () => {
      cleanup();
      anime.remove(proxy);
      el.textContent = achievement.metric;
    };
  }, [achievement.metric]);

  return (
    <GlassCard interactive className={styles.card}>
      <span className={styles.iconWrap}>
        <Icon size={18} />
      </span>
      <p ref={metricRef} className={styles.metric}>
        {achievement.metric}
      </p>
      <p className={styles.label}>{achievement.label}</p>
      <p className={styles.detail}>{achievement.detail}</p>
    </GlassCard>
  );
}

export function Achievements() {
  const gridRef = useStaggerReveal<HTMLDivElement>({ step: 110, y: 26 });

  return (
    <section id="achievements" className="section">
      <div className="container">
        <SectionHeading index="09" eyebrow="Achievements" title="Evidence of cases closed." />

        <div ref={gridRef} className={styles.grid}>
          {achievements.map((achievement) => (
            <AchievementCard key={achievement.label} achievement={achievement} />
          ))}
        </div>
      </div>
    </section>
  );
}
