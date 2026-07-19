import { GlassCard } from "@/components/ui/GlassCard";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Tag } from "@/components/ui/Tag";
import { toolkit } from "@/data/toolkit";
import { icons } from "@/icons";
import { useStaggerReveal } from "@/lib/animate";
import styles from "./Toolkit.module.css";

function ToolkitCard({ category, index }: { category: (typeof toolkit)[number]; index: number }) {
  const Icon = icons[category.icon];
  const itemsRef = useStaggerReveal<HTMLUListElement>({ step: 50, y: 20, duration: 500 });

  return (
    <GlassCard interactive className={styles.card}>
      <div className={styles.head}>
        <span className={styles.iconWrap}>
          <Icon size={17} />
        </span>
        <h3 className={styles.label}>{category.label}</h3>
        <span className={styles.index}>TK-{String(index + 1).padStart(2, "0")}</span>
      </div>
      <ul ref={itemsRef} className={styles.items}>
        {category.items.map((item) => (
          <li key={item}>
            <Tag>{item}</Tag>
          </li>
        ))}
      </ul>
    </GlassCard>
  );
}

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
          {toolkit.map((category, i) => (
            <Reveal key={category.id} delay={(i % 3) * 70}>
              <ToolkitCard category={category} index={i} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
