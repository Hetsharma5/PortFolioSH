import { GlassCard } from "@/components/ui/GlassCard";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { labTopics } from "@/data/lab";
import { icons } from "@/icons";
import { useStaggerReveal } from "@/lib/animate";
import styles from "./CyberLab.module.css";

export function CyberLab() {
  const gridRef = useStaggerReveal<HTMLDivElement>({ step: 80, y: 24 });

  return (
    <section id="lab" className={`section ${styles.zone}`}>
      <div className="container">
        <SectionHeading
          index="06"
          eyebrow="Cyber Lab"
          title="Where I break things to understand them."
          lead="Security is where a lot of my active study goes — labs, reading, and experiments on my own systems. Interests and self-learning, not certifications."
        />

        <div ref={gridRef} className={styles.grid}>
          {labTopics.map((topic, i) => {
            const Icon = icons[topic.icon];
            return (
              <GlassCard key={topic.topic} interactive className={styles.card}>
                <div className={styles.termBar}>
                  <span className={styles.dots} aria-hidden="true">
                    <i />
                    <i />
                    <i />
                  </span>
                  <span className={styles.index}>LAB-{String(i + 1).padStart(2, "0")}</span>
                </div>
                <div className={styles.cardBody}>
                  <div className={styles.head}>
                    <span className={styles.iconWrap}>
                      <Icon size={16} />
                    </span>
                    <h3 className={styles.topic}>
                      <span className={styles.prompt} aria-hidden="true">
                        &gt;&nbsp;
                      </span>
                      {topic.topic}
                      <span className={styles.cursor} aria-hidden="true" />
                    </h3>
                  </div>
                  <p className={styles.note}>{topic.note}</p>
                </div>
              </GlassCard>
            );
          })}
        </div>

        <Reveal>
          <p className={styles.disclaimer}>
            // All research is conducted ethically, on systems I own or am authorized to test.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
