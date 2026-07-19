import { useEffect, useRef, type ReactNode } from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Tag } from "@/components/ui/Tag";
import { evidenceFiles, type EvidenceFile } from "@/data/evidence";
import { icons } from "@/icons";
import { prefersReducedMotion, useStaggerReveal } from "@/lib/animate";
import { EvidenceVisual } from "./EvidenceVisual";
import styles from "./EvidenceLocker.module.css";

/**
 * Premium 3D hover — the card tilts toward the cursor (max ±4deg).
 * A rAF lerp loop runs only while the pointer is over the card, then eases
 * back to flat and stops — no per-mousemove animation instances.
 */
function TiltCard({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const state = useRef({ raf: 0, targetX: 0, targetY: 0, x: 0, y: 0, settling: false });

  const step = () => {
    const el = ref.current;
    const s = state.current;
    if (!el) return;
    s.x += (s.targetX - s.x) * 0.14;
    s.y += (s.targetY - s.y) * 0.14;
    if (s.settling && Math.abs(s.x) < 0.02 && Math.abs(s.y) < 0.02) {
      el.style.transform = "";
      s.x = 0;
      s.y = 0;
      s.raf = 0;
      return;
    }
    el.style.transform = `rotateX(${s.x}deg) rotateY(${s.y}deg)`;
    s.raf = requestAnimationFrame(step);
  };

  const onMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    const s = state.current;
    const rect = el.getBoundingClientRect();
    s.targetX = ((event.clientY - rect.top) / rect.height - 0.5) * -8;
    s.targetY = ((event.clientX - rect.left) / rect.width - 0.5) * 8;
    s.settling = false;
    if (!s.raf) s.raf = requestAnimationFrame(step);
  };

  const onLeave = () => {
    const s = state.current;
    s.targetX = 0;
    s.targetY = 0;
    s.settling = true;
    if (!s.raf) s.raf = requestAnimationFrame(step);
  };

  useEffect(() => {
    const s = state.current;
    return () => cancelAnimationFrame(s.raf);
  }, []);

  return (
    <div
      className={`${styles.tiltWrap} ${className ?? ""}`}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      <div ref={ref} className={styles.tilt}>
        {children}
      </div>
    </div>
  );
}

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
  const gridRef = useStaggerReveal<HTMLDivElement>({ step: 150, y: 34 });

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
            <TiltCard className={styles.featuredTilt}>
              <GlassCard interactive className={styles.featuredCard}>
                <span className={styles.ribbon} aria-hidden="true">
                  PRIORITY
                </span>
                <EvidenceHeader file={file} />
                <div className={styles.featuredGrid}>
                  <EvidenceBody file={file} featured />
                  <div className={styles.featuredVisual}>
                    <EvidenceVisual kind={file.visual} />
                  </div>
                </div>
              </GlassCard>
            </TiltCard>
          </Reveal>
        ))}

        <div ref={gridRef} className={styles.grid}>
          {rest.map((file) => (
            <TiltCard key={file.id}>
              <GlassCard interactive className={styles.card}>
                <EvidenceHeader file={file} />
                <div className={styles.visual}>
                  <EvidenceVisual kind={file.visual} crop />
                </div>
                <EvidenceBody file={file} />
              </GlassCard>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}
