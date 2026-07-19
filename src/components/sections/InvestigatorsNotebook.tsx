import { GlassCard } from "@/components/ui/GlassCard";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { notebookEntries } from "@/data/notebook";
import { icons } from "@/icons";
import { useStaggerReveal } from "@/lib/animate";
import styles from "./InvestigatorsNotebook.module.css";

export function InvestigatorsNotebook() {
  const gridRef = useStaggerReveal<HTMLDivElement>({ step: 80, y: 24 });

  return (
    <section id="notebook" className={`section ${styles.zone}`}>
      <div className="container">
        <SectionHeading
          index="07"
          eyebrow="The Investigator's Notebook"
          title="Same method, different subject."
          lead="Forensic science is a personal reading interest, not a profession — I'm not a forensic scientist or a digital forensics practitioner. What draws me in is the method: observation, evidence, and reasoning that has to survive scrutiny."
        />

        <div ref={gridRef} className={styles.grid}>
          {notebookEntries.map((entry, i) => {
            const Icon = icons[entry.icon];
            return (
              <GlassCard key={entry.topic} interactive className={styles.card}>
                <div className={styles.termBar}>
                  <span className={styles.dots} aria-hidden="true">
                    <i />
                    <i />
                    <i />
                  </span>
                  <span className={styles.index}>NOTE-{String(i + 1).padStart(2, "0")}</span>
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
                      {entry.topic}
                      <span className={styles.cursor} aria-hidden="true" />
                    </h3>
                  </div>
                  <p className={styles.note}>{entry.note}</p>
                </div>
              </GlassCard>
            );
          })}
        </div>

        <Reveal>
          <p className={styles.disclaimer}>
            // Writing software, debugging a hard failure, and investigating a security issue
            reward the same discipline as a forensic case study: observe carefully, reason from
            evidence, and let the conclusion follow the proof.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
