import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { profile } from "@/data/profile";
import { icons } from "@/icons";
import { useStaggerReveal } from "@/lib/animate";
import styles from "./Contact.module.css";

export function Contact() {
  const [copied, setCopied] = useState(false);
  const timerRef = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timerRef.current), []);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      window.clearTimeout(timerRef.current);
      timerRef.current = window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard unavailable — the mailto button still works.
    }
  };

  const Mail = icons.mail;
  const CopyIcon = copied ? icons.check : icons.copy;
  const stackRef = useStaggerReveal<HTMLDivElement>({ step: 130, y: 22 });

  return (
    <section id="contact" className="section">
      <div className="container">
        <Reveal>
          <div className={styles.panel}>
            <div className={styles.glow} aria-hidden="true" />

            <div ref={stackRef} className={styles.stack}>
            <p className={styles.secureLine}>
              <span className={styles.secureDot} aria-hidden="true" />
              ESTABLISHING SECURE CONNECTION...
            </p>
            <p className={styles.eyebrow}>
              <span className={styles.index}>FILE 09</span> // CONTACT
            </p>
            <h2 className={styles.title}>Open a new investigation.</h2>
            <p className={styles.lead}>
              A difficult problem, a role to fill, or a system that needs untangling — send the
              brief. I usually reply within a day.
            </p>

            <div className={styles.actions}>
              <Button href={`mailto:${profile.email}`}>
                <Mail size={17} />
                Open New Investigation
              </Button>
              <button
                type="button"
                className={styles.copyButton}
                onClick={copyEmail}
                aria-live="polite"
              >
                <CopyIcon size={16} />
                {copied ? "Copied!" : profile.email}
              </button>
            </div>

            <ul className={styles.socials}>
              {profile.socials.map((social) => {
                const Icon = icons[social.icon];
                return (
                  <li key={social.label}>
                    <a href={social.url} target="_blank" rel="noreferrer" aria-label={social.label}>
                      <Icon size={18} />
                    </a>
                  </li>
                );
              })}
            </ul>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
