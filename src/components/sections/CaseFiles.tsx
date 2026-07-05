import { GlassCard } from "@/components/ui/GlassCard";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Tag } from "@/components/ui/Tag";
import { caseFiles, type CaseFile } from "@/data/cases";
import { icons } from "@/icons";
import { CaseVisual } from "./CaseVisual";
import styles from "./CaseFiles.module.css";

function CaseHeader({ caseFile }: { caseFile: CaseFile }) {
  return (
    <div className={styles.caseHead}>
      <span className={styles.caseNumber}>CASE Nº {caseFile.number}</span>
      <span
        className={`${styles.caseStatus} ${caseFile.status === "ACTIVE" ? styles.statusActive : ""}`}
      >
        <i aria-hidden="true" />
        {caseFile.status}
      </span>
    </div>
  );
}

function CaseBody({ caseFile, featured = false }: { caseFile: CaseFile; featured?: boolean }) {
  const GitHub = icons.github;
  const External = icons.externalLink;

  return (
    <div className={`${styles.body} ${featured ? styles.bodyFeatured : ""}`}>
      <h3 className={styles.title}>{caseFile.title}</h3>

      <div className={styles.block}>
        <p className={styles.blockLabel}>Mission</p>
        <p className={styles.mission}>{caseFile.mission}</p>
      </div>

      <div className={styles.block}>
        <p className={styles.blockLabel}>Challenges</p>
        <ul className={styles.challenges}>
          {caseFile.challenges.map((challenge) => (
            <li key={challenge}>{challenge}</li>
          ))}
        </ul>
      </div>

      <div className={styles.block}>
        <p className={styles.blockLabel}>Outcome</p>
        <p className={styles.outcome}>{caseFile.outcome}</p>
      </div>

      <ul className={styles.tech}>
        {caseFile.tech.map((tech) => (
          <li key={tech}>
            <Tag>{tech}</Tag>
          </li>
        ))}
      </ul>

      <div className={styles.actions}>
        <a href={caseFile.github} target="_blank" rel="noreferrer" className={styles.action}>
          <GitHub size={15} />
          Open Case
        </a>
        {caseFile.demo && (
          <a
            href={caseFile.demo}
            target="_blank"
            rel="noreferrer"
            className={`${styles.action} ${styles.actionPrimary}`}
          >
            <External size={15} />
            View Evidence
          </a>
        )}
      </div>
    </div>
  );
}

export function CaseFiles() {
  const featured = caseFiles.filter((caseFile) => caseFile.featured);
  const rest = caseFiles.filter((caseFile) => !caseFile.featured);

  return (
    <section id="cases" className="section">
      <div className="container">
        <SectionHeading
          index="03"
          eyebrow="Case Files"
          title="Cases I've opened, worked & closed."
          lead="Every project starts as a question. These are the ones I saw through — from first lead to shipped outcome."
        />

        {featured.map((caseFile) => (
          <Reveal key={caseFile.id}>
            <GlassCard interactive className={styles.featuredCard}>
              <CaseHeader caseFile={caseFile} />
              <div className={styles.featuredGrid}>
                <CaseBody caseFile={caseFile} featured />
                <div className={styles.featuredVisual}>
                  <CaseVisual kind={caseFile.visual} />
                </div>
              </div>
            </GlassCard>
          </Reveal>
        ))}

        <div className={styles.grid}>
          {rest.map((caseFile, i) => (
            <Reveal key={caseFile.id} delay={(i % 2) * 80}>
              <GlassCard interactive className={styles.card}>
                <CaseHeader caseFile={caseFile} />
                <div className={styles.visual}>
                  <CaseVisual kind={caseFile.visual} crop />
                </div>
                <CaseBody caseFile={caseFile} />
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
