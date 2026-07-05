import { GlassCard } from "@/components/ui/GlassCard";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { labTopics } from "@/data/lab";
import { icons } from "@/icons";
import styles from "./CyberLab.module.css";

export function CyberLab() {
  return (
    <section id="lab" className="section">
      <div className="container">
        <SectionHeading
          index="06"
          eyebrow="Cyber Lab"
          title="Where I break things to understand them."
          lead="Security is where a lot of my active study goes — labs, reading, and experiments on my own systems. Interests and self-learning, not certifications."
        />

        <div className={styles.grid}>
          {labTopics.map((topic, i) => {
            const Icon = icons[topic.icon];
            return (
              <Reveal key={topic.topic} delay={(i % 3) * 60}>
                <GlassCard interactive className={styles.card}>
                  <div className={styles.head}>
                    <span className={styles.iconWrap}>
                      <Icon size={16} />
                    </span>
                    <span className={styles.index}>LAB-{String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <h3 className={styles.topic}>{topic.topic}</h3>
                  <p className={styles.note}>{topic.note}</p>
                </GlassCard>
              </Reveal>
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
