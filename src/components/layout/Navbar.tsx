import { useEffect, useState } from "react";
import { navItems, spyIds } from "@/data/nav";
import { profile } from "@/data/profile";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import { useScrolled } from "@/hooks/useScrolled";
import { icons } from "@/icons";
import { emit } from "@/lib/bus";
import styles from "./Navbar.module.css";

export function Navbar() {
  const scrolled = useScrolled(16);
  const active = useScrollSpy(spyIds);
  const [open, setOpen] = useState(false);

  // Lock body scroll while the mobile drawer is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const ToggleIcon = open ? icons.close : icons.menu;
  const Command = icons.command;

  return (
    <>
      <header className={`${styles.header} ${scrolled || open ? styles.scrolled : ""}`}>
        <nav className={`container ${styles.inner}`} aria-label="Primary">
          <a
            href="#hero"
            className={styles.logo}
            onClick={() => setOpen(false)}
            onDoubleClick={() => emit("stats")}
            aria-label="Het Sharma — back to top"
          >
            {profile.initials}
            <span>.</span>
          </a>

          <ul className={styles.links}>
            {navItems.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className={`${styles.link} ${active === item.id ? styles.active : ""}`}
                  aria-current={active === item.id ? "true" : undefined}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <div className={styles.actions}>
            <button
              type="button"
              className={styles.palette}
              onClick={() => emit("palette")}
              aria-label="Open command palette"
            >
              <Command size={13} />
              <span>K</span>
            </button>
            <a href="#contact" className={styles.cta}>
              Open a Case
            </a>
          </div>

          <button
            type="button"
            className={styles.toggle}
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
          >
            <ToggleIcon size={22} />
          </button>
        </nav>
      </header>

      {/* Fixed drawer lives outside <header>: the header's backdrop-filter
          would otherwise become its containing block and collapse it. */}
      <div id="mobile-menu" className={`${styles.drawer} ${open ? styles.drawerOpen : ""}`}>
        <ul className={styles.drawerLinks}>
          {navItems.map((item, i) => (
            <li key={item.id} style={{ transitionDelay: open ? `${60 + i * 40}ms` : "0ms" }}>
              <a
                href={`#${item.id}`}
                className={active === item.id ? styles.drawerActive : ""}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href={`mailto:${profile.email}`}
          className={styles.drawerCta}
          onClick={() => setOpen(false)}
        >
          {profile.email}
        </a>
      </div>
    </>
  );
}
