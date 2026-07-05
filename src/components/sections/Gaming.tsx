import { GlassCard } from "@/components/ui/GlassCard";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { gaming } from "@/data/gaming";
import { icons } from "@/icons";
import styles from "./Gaming.module.css";

export function Gaming() {
  const Gamepad = icons.gamepad;

  return (
    <section id="gaming" className="section">
      <div className="container">
        <SectionHeading
          index="07"
          eyebrow="Current Side Quest"
          title="Every good detective has a hobby."
          lead={gaming.lead}
        />

        <div className={styles.grid}>
          {gaming.slots.map((slot, i) => (
            <Reveal key={slot.slot} delay={i * 80}>
              <GlassCard interactive className={styles.card}>
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
                    <div className={styles.progressFill} style={{ width: `${slot.progress}%` }} />
                  </div>
                  <span className={styles.percent}>{slot.progress}%</span>
                </div>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
