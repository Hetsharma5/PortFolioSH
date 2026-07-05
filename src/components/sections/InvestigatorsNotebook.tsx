import { GlassCard } from "@/components/ui/GlassCard";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { notebookEntries } from "@/data/notebook";
import { icons } from "@/icons";
import styles from "./InvestigatorsNotebook.module.css";

export function InvestigatorsNotebook() {
  return (
    <section id="notebook" className="section">
      <div className="container">
        <SectionHeading
          index="07"
          eyebrow="The Investigator's Notebook"
          title="Same method, different subject."
          lead="Forensic science is a personal reading interest, not a profession — I'm not a forensic scientist or a digital forensics practitioner. What draws me in is the method: observation, evidence, and reasoning that has to survive scrutiny."
        />

        <div className={styles.grid}>
          {notebookEntries.map((entry, i) => {
            const Icon = icons[entry.icon];
            return (
              <Reveal key={entry.topic} delay={(i % 3) * 60}>
                <GlassCard interactive className={styles.card}>
                  <div className={styles.head}>
                    <span className={styles.iconWrap}>
                      <Icon size={16} />
                    </span>
                    <span className={styles.index}>NOTE-{String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <h3 className={styles.topic}>{entry.topic}</h3>
                  <p className={styles.note}>{entry.note}</p>
                </GlassCard>
              </Reveal>
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
