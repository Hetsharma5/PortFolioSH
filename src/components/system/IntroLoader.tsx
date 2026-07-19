import { useEffect, useMemo, useRef, useState } from "react";
import { profile } from "@/data/profile";
import { anime } from "@/lib/animate";
import { markIntroDone } from "@/lib/bus";
import styles from "./IntroLoader.module.css";

const STORAGE_KEY = "sh-intro-seen";
const RAIN_GLYPHS = "01アカサタナハマヤ§ΔΞ7F3E9C";

function shouldSkip(): boolean {
  try {
    if (sessionStorage.getItem(STORAGE_KEY)) return true;
  } catch {
    /* storage unavailable — still show once */
  }
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function randomColumn(): string {
  return Array.from(
    { length: 16 },
    () => RAIN_GLYPHS[Math.floor(Math.random() * RAIN_GLYPHS.length)],
  ).join("\n");
}

/**
 * One-time cinematic boot screen: INITIALIZING → progress fill → ANALYZING
 * CASE FILES → data cascade → ACCESS GRANTED → reveal. Skipped on revisit
 * and for reduced motion.
 */
export function IntroLoader() {
  const [skip] = useState(shouldSkip);
  const [gone, setGone] = useState(false);

  const overlayRef = useRef<HTMLDivElement>(null);
  const messageRef = useRef<HTMLParagraphElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const percentRef = useRef<HTMLSpanElement>(null);
  const rainRef = useRef<HTMLDivElement>(null);
  const grantedRef = useRef<HTMLParagraphElement>(null);

  const columns = useMemo(
    () =>
      Array.from({ length: 22 }, (_, i) => ({
        chars: randomColumn(),
        left: `${(i / 22) * 100}%`,
        duration: `${2.4 + Math.random() * 2.4}s`,
        delay: `${Math.random() * -4}s`,
      })),
    [],
  );

  useEffect(() => {
    if (skip) {
      markIntroDone();
      return;
    }
    const overlay = overlayRef.current;
    const message = messageRef.current;
    const fill = fillRef.current;
    const percent = percentRef.current;
    const rain = rainRef.current;
    const granted = grantedRef.current;
    if (!overlay || !message || !fill || !percent || !rain || !granted) return;

    try {
      sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* ignore */
    }
    document.body.style.overflow = "hidden";

    const progress = { value: 0 };
    const timeline = anime
      .timeline({ easing: "easeInOutQuad" })
      .add({
        targets: message,
        opacity: [0, 1],
        translateY: [6, 0],
        duration: 420,
      })
      .add({
        targets: fill,
        width: ["0%", "100%"],
        duration: 1400,
      })
      .add(
        {
          targets: progress,
          value: 100,
          round: 1,
          duration: 1400,
          update: () => {
            percent.textContent = `${progress.value}%`;
          },
        },
        "-=1400",
      )
      .add({
        targets: message,
        opacity: 0,
        duration: 160,
        complete: () => {
          message.textContent = "ANALYZING CASE FILES...";
        },
      })
      .add({
        targets: message,
        opacity: [0, 1],
        duration: 280,
      })
      .add(
        {
          targets: rain,
          opacity: [0, 0.5],
          duration: 420,
        },
        "-=200",
      )
      .add(
        {
          targets: granted,
          opacity: [0, 1],
          scale: [0.85, 1],
          duration: 340,
          easing: "easeOutBack",
        },
        "+=260",
      )
      .add({
        targets: overlay,
        opacity: 0,
        duration: 520,
        delay: 480,
        easing: "easeInOutQuad",
        begin: () => {
          markIntroDone();
        },
        complete: () => {
          document.body.style.overflow = "";
          setGone(true);
        },
      });

    return () => {
      timeline.pause();
      anime.remove([overlay, message, fill, rain, granted, progress]);
      document.body.style.overflow = "";
    };
  }, [skip]);

  if (skip || gone) return null;

  return (
    <div ref={overlayRef} className={styles.overlay} aria-hidden="true">
      <div ref={rainRef} className={styles.rain}>
        {columns.map((column, i) => (
          <span
            key={i}
            className={styles.rainCol}
            style={{
              left: column.left,
              animationDuration: column.duration,
              animationDelay: column.delay,
            }}
          >
            {column.chars}
          </span>
        ))}
      </div>
      <div className={styles.scanlines} />

      <div className={styles.core}>
        <div className={styles.mark}>{profile.initials}</div>
        <p ref={messageRef} className={styles.message}>
          INITIALIZING...
        </p>
        <div className={styles.trackRow}>
          <div className={styles.track}>
            <div ref={fillRef} className={styles.fill} />
          </div>
          <span ref={percentRef} className={styles.percent}>
            0%
          </span>
        </div>
        <p ref={grantedRef} className={styles.granted}>
          ACCESS GRANTED
        </p>
      </div>
    </div>
  );
}
