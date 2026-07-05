import { Fragment } from "react";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { profile } from "@/data/profile";
import { icons } from "@/icons";
import styles from "./Hero.module.css";

/**
 * Abstract "investigation connections" — nodes and slowly drifting lines,
 * purely decorative. Deliberately abstract: system architecture, not props.
 */
function NetworkBackdrop() {
  return (
    <svg
      className={styles.network}
      viewBox="0 0 1200 700"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <g className={styles.netLines}>
        <path d="M140 180 L360 120 L620 210 L840 140" />
        <path d="M360 120 L420 360 L700 420" />
        <path d="M620 210 L700 420 L980 360 L1120 480" />
        <path d="M840 140 L980 360" />
        <path d="M140 180 L220 460 L420 360" />
        <path d="M220 460 L520 580 L700 420" />
        <path className={styles.netAccent} d="M420 360 L620 210" />
        <path className={styles.netAccent} d="M700 420 L840 560" />
        <path d="M840 560 L1120 480" />
      </g>
      <g className={styles.netNodes}>
        {[
          [140, 180],
          [360, 120],
          [620, 210],
          [840, 140],
          [420, 360],
          [700, 420],
          [980, 360],
          [220, 460],
          [520, 580],
          [840, 560],
          [1120, 480],
        ].map(([x, y]) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r="3" />
        ))}
        <circle className={styles.nodeAccent} cx="620" cy="210" r="4" />
        <circle className={styles.nodeAccent} cx="700" cy="420" r="4" />
      </g>
    </svg>
  );
}

export function Hero() {
  const MapPin = icons.mapPin;
  const Folder = icons.folder;

  return (
    <section id="hero" className={styles.hero}>
      <div className={styles.glow} aria-hidden="true" />
      <div className={styles.dotGrid} aria-hidden="true" />
      <NetworkBackdrop />

      <div className={`container ${styles.inner}`}>
        <Reveal>
          <p className={styles.status}>
            <span className={styles.statusDot} aria-hidden="true" />
            STATUS: {profile.availability.toUpperCase()}
          </p>
        </Reveal>

        <Reveal delay={80}>
          <div className={styles.monogram} aria-hidden="true">
            {profile.initials}
          </div>
        </Reveal>

        <Reveal delay={160}>
          <h1 className={styles.name}>{profile.name}</h1>
        </Reveal>

        <Reveal delay={230}>
          <p className={styles.roles}>
            {profile.roles.map((role, i) => (
              <Fragment key={role}>
                {i > 0 && (
                  <span className={styles.roleSep} aria-hidden="true">
                    ·
                  </span>
                )}
                {role}
              </Fragment>
            ))}
          </p>
        </Reveal>

        <Reveal delay={300}>
          <p className={styles.statement}>{profile.statement}</p>
        </Reveal>

        <Reveal delay={370}>
          <div className={styles.actions}>
            <Button href="#evidence">
              <Folder size={17} />
              Open Evidence Locker
            </Button>
            <Button href="#contact" variant="ghost">
              Open New Investigation
            </Button>
          </div>
        </Reveal>

        <Reveal delay={440}>
          <div className={styles.meta}>
            <span className={styles.location}>
              <MapPin size={15} />
              {profile.location}
            </span>
            <span className={styles.divider} aria-hidden="true" />
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
        </Reveal>
      </div>
    </section>
  );
}
