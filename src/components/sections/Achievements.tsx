import { GlassCard } from "@/components/ui/GlassCard";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { achievements } from "@/data/achievements";
import { icons } from "@/icons";
import styles from "./Achievements.module.css";

export function Achievements() {
  return (
    <section id="achievements" className="section">
      <div className="container">
        <SectionHeading index="08" eyebrow="Achievements" title="Evidence of cases closed." />

        <div className={styles.grid}>
          {achievements.map((achievement, i) => {
            const Icon = icons[achievement.icon];
            return (
              <Reveal key={achievement.label} delay={(i % 4) * 70}>
                <GlassCard interactive className={styles.card}>
                  <span className={styles.iconWrap}>
                    <Icon size={18} />
                  </span>
                  <p className={styles.metric}>{achievement.metric}</p>
                  <p className={styles.label}>{achievement.label}</p>
                  <p className={styles.detail}>{achievement.detail}</p>
                </GlassCard>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
