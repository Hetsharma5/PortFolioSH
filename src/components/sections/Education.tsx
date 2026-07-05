import { GlassCard } from "@/components/ui/GlassCard";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { education } from "@/data/education";
import { icons } from "@/icons";
import styles from "./Education.module.css";

export function Education() {
  const GraduationCap = icons.graduationCap;

  return (
    <section id="education" className="section">
      <div className="container">
        <SectionHeading index="05" eyebrow="Education" title="Where the method was trained." />

        <div className={styles.list}>
          {education.map((entry, i) => (
            <Reveal key={entry.degree} delay={i * 80}>
              <GlassCard className={styles.card}>
                <span className={styles.iconWrap}>
                  <GraduationCap size={20} />
                </span>
                <div className={styles.content}>
                  <div className={styles.head}>
                    <div>
                      <h3 className={styles.degree}>{entry.degree}</h3>
                      <p className={styles.school}>{entry.school}</p>
                    </div>
                    <span className={styles.period}>{entry.period}</span>
                  </div>
                  <ul className={styles.details}>
                    {entry.details.map((detail) => (
                      <li key={detail}>{detail}</li>
                    ))}
                  </ul>
                </div>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
