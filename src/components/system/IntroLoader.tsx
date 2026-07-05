import { useEffect, useState } from "react";
import { profile } from "@/data/profile";
import styles from "./IntroLoader.module.css";

const MESSAGES = ["Initializing investigation...", "Searching for clues...", "Analyzing..."];
const STORAGE_KEY = "sh-intro-seen";

function shouldSkip(): boolean {
  try {
    if (sessionStorage.getItem(STORAGE_KEY)) return true;
  } catch {
    /* storage unavailable — still show once */
  }
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** One-time cinematic boot screen (~1.6s). Skipped on revisit and for reduced motion. */
export function IntroLoader() {
  const [skip] = useState(shouldSkip);
  const [message, setMessage] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    if (skip) return;
    try {
      sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* ignore */
    }
    document.body.style.overflow = "hidden";
    const timers = [
      window.setTimeout(() => setMessage(1), 550),
      window.setTimeout(() => setMessage(2), 1100),
      window.setTimeout(() => setLeaving(true), 1600),
      window.setTimeout(() => {
        setGone(true);
        document.body.style.overflow = "";
      }, 2000),
    ];
    return () => {
      timers.forEach(window.clearTimeout);
      document.body.style.overflow = "";
    };
  }, [skip]);

  if (skip || gone) return null;

  return (
    <div className={`${styles.overlay} ${leaving ? styles.leaving : ""}`} aria-hidden="true">
      <div className={styles.mark}>{profile.initials}</div>
      <p className={styles.message} key={message}>
        {MESSAGES[message]}
      </p>
      <div className={styles.track}>
        <div className={styles.fill} />
      </div>
    </div>
  );
}
