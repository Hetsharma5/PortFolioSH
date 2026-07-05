import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { chapters } from "@/data/chapters";
import styles from "./Experience.module.css";

export function Experience() {
  return (
    <section id="experience" className="section">
      <div className="container">
        <SectionHeading
          index="04"
          eyebrow="Field Experience"
          title="The story so far, in chapters."
        />

        <ol className={styles.timeline}>
          {chapters.map((chapter, i) => (
            <li
              key={chapter.label}
              className={`${styles.item} ${chapter.current ? styles.current : ""}`}
            >
              <span className={styles.marker} aria-hidden="true" />
              <Reveal delay={i * 60}>
                <p className={styles.chapterLabel}>
                  {chapter.label}
                  {chapter.current && <span className={styles.inProgress}>IN PROGRESS</span>}
                </p>
                <div className={styles.head}>
                  <h3 className={styles.title}>{chapter.title}</h3>
                  <span className={styles.period}>{chapter.period}</span>
                </div>
                <p className={styles.body}>{chapter.body}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
