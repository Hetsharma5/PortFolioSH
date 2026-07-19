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

/**
 * Living constellation behind the hero — drifting accent nodes linked by
 * faint lines. The cursor becomes part of the network: nearby nodes lean
 * toward it and wire themselves to it. One canvas, one rAF loop; work is
 * skipped while the hero is off-screen. Colors follow --accent-rgb, so
 * Investigation Mode turns the whole field amber.
 */
function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || prefersReducedMotion()) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const parent = canvas.parentElement;
    if (!parent) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = 0;
    let height = 0;

    interface Node {
      x: number;
      y: number;
      vx: number;
      vy: number;
      r: number;
      tw: number;
    }
    let nodes: Node[] = [];
    const mouse = { x: -9999, y: -9999 };

    const resize = () => {
      const rect = parent.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.max(24, Math.min(90, Math.floor((width * height) / 16000)));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: 0.8 + Math.random() * 1.7,
        tw: Math.random() * Math.PI * 2,
      }));
    };

    let accent = "62, 207, 142";
    const readAccent = () => {
      const value = getComputedStyle(document.documentElement)
        .getPropertyValue("--accent-rgb")
        .trim();
      if (value) accent = value;
    };
    readAccent();

    const LINK = 130;
    const REACH = 220;
    let paused = false;
    let frame = 0;
    let raf = 0;

    const step = () => {
      raf = requestAnimationFrame(step);
      if (paused) return;
      if (++frame % 90 === 0) readAccent();

      ctx.clearRect(0, 0, width, height);

      for (const node of nodes) {
        node.x += node.vx;
        node.y += node.vy;
        node.tw += 0.02;
        const dx = mouse.x - node.x;
        const dy = mouse.y - node.y;
        const dist = Math.hypot(dx, dy);
        if (dist < REACH && dist > 1) {
          node.x += (dx / dist) * 0.3;
          node.y += (dy / dist) * 0.3;
        }
        if (node.x < -20) node.x = width + 20;
        if (node.x > width + 20) node.x = -20;
        if (node.y < -20) node.y = height + 20;
        if (node.y > height + 20) node.y = -20;
      }

      ctx.lineWidth = 1;
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < LINK * LINK) {
            const alpha = (1 - Math.sqrt(d2) / LINK) * 0.15;
            ctx.strokeStyle = `rgba(${accent}, ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
        // Wire nearby nodes to the cursor — the visitor joins the network.
        const mdx = a.x - mouse.x;
        const mdy = a.y - mouse.y;
        const md = Math.hypot(mdx, mdy);
        if (md < REACH) {
          const alpha = (1 - md / REACH) * 0.35;
          ctx.strokeStyle = `rgba(${accent}, ${alpha})`;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }
      }

      for (const node of nodes) {
        const glow = 0.3 + (Math.sin(node.tw) + 1) * 0.25;
        ctx.fillStyle = `rgba(${accent}, ${glow})`;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.r, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const observer = new IntersectionObserver(([entry]) => {
      paused = !entry.isIntersecting;
    });
    observer.observe(canvas);

    const onMove = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = event.clientX - rect.left;
      mouse.y = event.clientY - rect.top;
    };
    const onLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };

    // The backdrop layer is pointer-events: none, so track globally.
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    resize();
    raf = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return <canvas ref={canvasRef} className={styles.particles} aria-hidden="true" />;
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

  // Mouse-reactive parallax on the backdrop layers — one rAF lerp loop,
  // one transform write per layer per frame.
  useEffect(() => {
    const hero = heroRef.current;
    const net = networkRef.current;
    const glow = glowRef.current;
    if (!hero || !net || !glow) return;
    if (prefersReducedMotion()) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let targetX = 0;
    let targetY = 0;
    let x = 0;
    let y = 0;
    let raf = 0;

    const loop = () => {
      x += (targetX - x) * 0.06;
      y += (targetY - y) * 0.06;
      net.style.transform = `translate3d(${x * -26}px, ${y * -18}px, 0)`;
      glow.style.transform = `translate3d(${x * 36}px, ${y * 26}px, 0)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const onMove = (event: MouseEvent) => {
      const rect = hero.getBoundingClientRect();
      targetX = (event.clientX - rect.left) / rect.width - 0.5;
      targetY = (event.clientY - rect.top) / rect.height - 0.5;
    };
    const onLeave = () => {
      targetX = 0;
      targetY = 0;
    };

    hero.addEventListener("mousemove", onMove, { passive: true });
    hero.addEventListener("mouseleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      hero.removeEventListener("mousemove", onMove);
      hero.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <section id="hero" ref={heroRef} className={styles.hero}>
      <div ref={glowRef} className={styles.glow} aria-hidden="true" />
      <div className={styles.dotGrid} aria-hidden="true" />
      <div ref={networkRef} className={styles.networkLayer} aria-hidden="true">
        {reduced ? <NetworkBackdrop /> : <ParticleField />}
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
