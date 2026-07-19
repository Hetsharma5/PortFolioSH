import { GlassCard } from "@/components/ui/GlassCard";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { about } from "@/data/about";
import { useStaggerReveal } from "@/lib/animate";
import styles from "./About.module.css";

export function About() {
  const rowsRef = useStaggerReveal<HTMLDListElement>({ step: 110, y: 14 });

  return (
    <section id="about" className="section">
      <div className="container">
        <SectionHeading index="01" eyebrow="About" title="A story that starts with curiosity." />

        <div className={styles.grid}>
          <div className={styles.text}>
            {about.paragraphs.map((paragraph, i) => (
              <Reveal key={i} delay={i * 70}>
                <p>{paragraph}</p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={120}>
            <GlassCard className={styles.dossier}>
              <div className={styles.dossierHead}>
                <span>SUBJECT PROFILE</span>
                <span className={styles.dossierDot} aria-hidden="true" />
              </div>
              <dl ref={rowsRef} className={styles.rows}>
                {about.dossier.map((row) => (
                  <div key={row.label} className={styles.row}>
                    <dt>{row.label}</dt>
                    <dd className={row.redacted ? styles.redacted : undefined}>{row.value}</dd>
                  </div>
                ))}
              </dl>
            </GlassCard>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
