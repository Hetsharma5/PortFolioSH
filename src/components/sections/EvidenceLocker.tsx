import { GlassCard } from "@/components/ui/GlassCard";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Tag } from "@/components/ui/Tag";
import { evidenceFiles, type EvidenceFile } from "@/data/evidence";
import { icons } from "@/icons";
import { EvidenceVisual } from "./EvidenceVisual";
import styles from "./EvidenceLocker.module.css";

function EvidenceHeader({ file }: { file: EvidenceFile }) {
  return (
    <div className={styles.caseHead}>
      <span className={styles.caseNumber}>EVIDENCE FILE Nº {file.number}</span>
      <span
        className={`${styles.caseStatus} ${file.status === "ACTIVE" ? styles.statusActive : ""}`}
      >
        <i aria-hidden="true" />
        {file.status}
      </span>
    </div>
  );
}

function EvidenceBody({ file, featured = false }: { file: EvidenceFile; featured?: boolean }) {
  const GitHub = icons.github;
  const External = icons.externalLink;

  return (
    <div className={`${styles.body} ${featured ? styles.bodyFeatured : ""}`}>
      <h3 className={styles.title}>{file.title}</h3>

      <div className={styles.block}>
        <p className={styles.blockLabel}>Mission</p>
        <p className={styles.mission}>{file.mission}</p>
      </div>

      <div className={styles.block}>
        <p className={styles.blockLabel}>Problem</p>
        <p className={styles.mission}>{file.problem}</p>
      </div>

      <div className={styles.block}>
        <p className={styles.blockLabel}>Investigation</p>
        <ul className={styles.challenges}>
          {file.investigation.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ul>
      </div>

      <div className={styles.block}>
        <p className={styles.blockLabel}>Solution</p>
        <p className={styles.mission}>{file.solution}</p>
      </div>

      <div className={styles.block}>
        <p className={styles.blockLabel}>Outcome</p>
        <p className={styles.outcome}>{file.outcome}</p>
      </div>

      <ul className={styles.tech}>
        {file.tech.map((tech) => (
          <li key={tech}>
            <Tag>{tech}</Tag>
          </li>
        ))}
      </ul>

      <div className={styles.actions}>
        <a href={file.github} target="_blank" rel="noreferrer" className={styles.action}>
          <GitHub size={15} />
          Open File
        </a>
        {file.demo && (
          <a
            href={file.demo}
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

export function EvidenceLocker() {
  const featured = evidenceFiles.filter((file) => file.featured);
  const rest = evidenceFiles.filter((file) => !file.featured);

  return (
    <section id="evidence" className="section">
      <div className="container">
        <SectionHeading
          index="03"
          eyebrow="Evidence Locker"
          title="Projects I've built, examined & closed."
          lead="Every project starts as a question. These are the ones I saw through — from first lead to shipped outcome."
        />

        {featured.map((file) => (
          <Reveal key={file.id}>
            <GlassCard interactive className={styles.featuredCard}>
              <EvidenceHeader file={file} />
              <div className={styles.featuredGrid}>
                <EvidenceBody file={file} featured />
                <div className={styles.featuredVisual}>
                  <EvidenceVisual kind={file.visual} />
                </div>
              </div>
            </GlassCard>
          </Reveal>
        ))}

        <div className={styles.grid}>
          {rest.map((file, i) => (
            <Reveal key={file.id} delay={(i % 2) * 80}>
              <GlassCard interactive className={styles.card}>
                <EvidenceHeader file={file} />
                <div className={styles.visual}>
                  <EvidenceVisual kind={file.visual} crop />
                </div>
                <EvidenceBody file={file} />
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
