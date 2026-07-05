import { Reveal } from "./Reveal";
import styles from "./SectionHeading.module.css";

interface SectionHeadingProps {
  /** File number stamped in the eyebrow, e.g. "01". */
  index: string;
  eyebrow: string;
  title: string;
  lead?: string;
}

export function SectionHeading({ index, eyebrow, title, lead }: SectionHeadingProps) {
  return (
    <Reveal className={styles.wrap}>
      <p className={styles.eyebrow}>
        <span className={styles.file}>FILE {index}</span>
        <span className={styles.sep} aria-hidden="true">
          //
        </span>
        <span className={styles.label}>{eyebrow}</span>
      </p>
      <h2 className={styles.title}>{title}</h2>
      {lead && <p className={styles.lead}>{lead}</p>}
    </Reveal>
  );
}
