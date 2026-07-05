import { GlassCard } from "@/components/ui/GlassCard";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Tag } from "@/components/ui/Tag";
import { toolkit } from "@/data/toolkit";
import { icons } from "@/icons";
import styles from "./Toolkit.module.css";

export function Toolkit() {
  return (
    <section id="toolkit" className="section">
      <div className="container">
        <SectionHeading
          index="02"
          eyebrow="Investigation Toolkit"
          title="Every case needs the right instruments."
          lead="The technologies I reach for to take a product from first lead to production — and keep it running."
        />

        <div className={styles.grid}>
          {toolkit.map((category, i) => {
            const Icon = icons[category.icon];
            return (
              <Reveal key={category.id} delay={(i % 3) * 70}>
                <GlassCard interactive className={styles.card}>
                  <div className={styles.head}>
                    <span className={styles.iconWrap}>
                      <Icon size={17} />
                    </span>
                    <h3 className={styles.label}>{category.label}</h3>
                    <span className={styles.index}>TK-{String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <ul className={styles.items}>
                    {category.items.map((item) => (
                      <li key={item}>
                        <Tag>{item}</Tag>
                      </li>
                    ))}
                  </ul>
                </GlassCard>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
