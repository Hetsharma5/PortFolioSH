import { Fragment, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { profile } from "@/data/profile";
import { icons } from "@/icons";
import { anime, prefersReducedMotion } from "@/lib/animate";
import { isIntroDone, on } from "@/lib/bus";
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

/** anime.js-driven typewriter that cycles through the profile roles. */
function useTypewriter(enabled: boolean) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !enabled) return;

    let alive = true;
    const proxy = { n: 0 };

    const cycle = (index: number) => {
      if (!alive) return;
      const role = profile.roles[index];
      const write = () => {
        el.textContent = role.slice(0, proxy.n);
      };
      anime
        .timeline({
          complete: () => cycle((index + 1) % profile.roles.length),
        })
        .add({
          targets: proxy,
          n: [0, role.length],
          duration: role.length * 55,
          easing: "linear",
          round: 1,
          update: write,
        })
        .add({
          targets: proxy,
          n: 0,
          duration: role.length * 28,
          delay: 2000,
          easing: "linear",
          round: 1,
          update: write,
        });
    };

    cycle(0);
    return () => {
      alive = false;
      anime.remove(proxy);
    };
  }, [enabled]);

  return ref;
}

export function Hero() {
  const MapPin = icons.mapPin;
  const Folder = icons.folder;

  const heroRef = useRef<HTMLElement>(null);
  const networkRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const [reduced] = useState(prefersReducedMotion);
  const roleRef = useTypewriter(!reduced);

  // Declassification entrance — staggered timeline, held until the intro
  // loader reveals the page.
  useEffect(() => {
    const inner = innerRef.current;
    if (!inner || prefersReducedMotion()) return;

    const items = inner.querySelectorAll<HTMLElement>(`.${styles.entrance}`);
    const run = () => {
      anime({
        targets: items,
        opacity: [0, 1],
        translateY: [26, 0],
        duration: 900,
        delay: anime.stagger(150),
        easing: "easeOutCubic",
      });
    };

    if (isIntroDone()) {
      run();
      return () => anime.remove(items);
    }
    const off = on("intro", run);
    return () => {
      off();
      anime.remove(items);
    };
  }, []);

  // Mouse-reactive parallax on the backdrop layers.
  useEffect(() => {
    const hero = heroRef.current;
    const net = networkRef.current;
    const glow = glowRef.current;
    if (!hero || !net || !glow) return;
    if (prefersReducedMotion()) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const layers = [net, glow];
    const onMove = (event: MouseEvent) => {
      const rect = hero.getBoundingClientRect();
      const dx = (event.clientX - rect.left) / rect.width - 0.5;
      const dy = (event.clientY - rect.top) / rect.height - 0.5;
      anime.remove(layers);
      anime({
        targets: net,
        translateX: dx * -26,
        translateY: dy * -18,
        duration: 1000,
        easing: "easeOutQuad",
      });
      anime({
        targets: glow,
        translateX: dx * 36,
        translateY: dy * 26,
        duration: 1400,
        easing: "easeOutQuad",
      });
    };
    const onLeave = () => {
      anime.remove(layers);
      anime({
        targets: layers,
        translateX: 0,
        translateY: 0,
        duration: 900,
        easing: "easeOutQuad",
      });
    };

    hero.addEventListener("mousemove", onMove);
    hero.addEventListener("mouseleave", onLeave);
    return () => {
      hero.removeEventListener("mousemove", onMove);
      hero.removeEventListener("mouseleave", onLeave);
      anime.remove(layers);
    };
  }, []);

  return (
    <section id="hero" ref={heroRef} className={styles.hero}>
      <div ref={glowRef} className={styles.glow} aria-hidden="true" />
      <div className={styles.dotGrid} aria-hidden="true" />
      <div ref={networkRef} className={styles.networkLayer} aria-hidden="true">
        <NetworkBackdrop />
      </div>
      <div className={styles.scanlines} aria-hidden="true" />

      <div ref={innerRef} className={`container ${styles.inner}`}>
        <p className={`${styles.status} ${styles.entrance}`}>
          <span className={styles.statusDot} aria-hidden="true" />
          STATUS: {profile.availability.toUpperCase()}
        </p>

        <div className={`${styles.monogramWrap} ${styles.entrance}`}>
          <div className={styles.monogram} aria-hidden="true">
            {profile.initials}
          </div>
          <span className={styles.stamp} aria-hidden="true">
            CLASSIFIED
          </span>
        </div>

        <h1 className={`${styles.name} ${styles.entrance}`}>{profile.name}</h1>

        <p className={`${styles.roles} ${styles.entrance}`}>
          {reduced ? (
            profile.roles.map((role, i) => (
              <Fragment key={role}>
                {i > 0 && (
                  <span className={styles.roleSep} aria-hidden="true">
                    ·
                  </span>
                )}
                {role}
              </Fragment>
            ))
          ) : (
            <>
              <span ref={roleRef} className={styles.roleText} aria-hidden="true" />
              <span className={styles.caret} aria-hidden="true" />
              <span className={styles.srOnly}>{profile.roles.join(", ")}</span>
            </>
          )}
        </p>

        <p className={`${styles.statement} ${styles.entrance}`}>{profile.statement}</p>

        <div className={`${styles.actions} ${styles.entrance}`}>
          <Button href="#evidence">
            <Folder size={17} />
            Open Evidence Locker
          </Button>
          <Button href="#contact" variant="ghost">
            Open New Investigation
          </Button>
        </div>

        <div className={`${styles.meta} ${styles.entrance}`}>
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
      </div>
    </section>
  );
}
