import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { allSections } from "@/data/nav";
import { profile } from "@/data/profile";
import { icons } from "@/icons";
import { anime, prefersReducedMotion } from "@/lib/animate";
import { emit, on, toast, toggleInvestigationMode } from "@/lib/bus";
import styles from "./CommandPalette.module.css";

interface PaletteItem {
  id: string;
  label: string;
  hint: string;
  run: () => void;
}

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const paletteRef = useRef<HTMLDivElement>(null);
  const closingRef = useRef(false);

  const close = useCallback(() => {
    if (closingRef.current) return;
    const finish = () => {
      closingRef.current = false;
      setOpen(false);
      setQuery("");
      setSelected(0);
    };
    const palette = paletteRef.current;
    const overlay = overlayRef.current;
    if (!palette || !overlay || prefersReducedMotion()) {
      finish();
      return;
    }
    closingRef.current = true;
    anime.remove([palette, overlay]);
    anime({ targets: overlay, opacity: 0, duration: 140, easing: "easeInQuad" });
    anime({
      targets: palette,
      opacity: 0,
      scale: 0.96,
      duration: 140,
      easing: "easeInQuad",
      complete: finish,
    });
  }, []);

  const items = useMemo<PaletteItem[]>(
    () => [
      ...allSections.map((section) => ({
        id: `go-${section.id}`,
        label: `Go to ${section.label}`,
        hint: "Investigate",
        run: () => document.getElementById(section.id)?.scrollIntoView({ behavior: "smooth" }),
      })),
      {
        id: "copy-email",
        label: "Copy email address",
        hint: "Evidence",
        run: () => {
          navigator.clipboard
            .writeText(profile.email)
            .then(() => toast("Email copied to clipboard."))
            .catch(() => toast(profile.email));
        },
      },
      {
        id: "github",
        label: "Open GitHub profile",
        hint: "View Evidence",
        run: () => window.open(profile.socials[0].url, "_blank", "noreferrer"),
      },
      {
        id: "investigation",
        label: "Toggle Investigation Mode",
        hint: "221B",
        run: toggleInvestigationMode,
      },
      {
        id: "notes",
        label: "Developer Notes",
        hint: "Classified",
        run: () => emit("notes"),
      },
    ],
    [],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter((item) => item.label.toLowerCase().includes(q));
  }, [items, query]);

  // Global open shortcut + bus trigger.
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        if (open) close();
        else setOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    const offBus = on("palette", () => setOpen(true));
    return () => {
      window.removeEventListener("keydown", onKey);
      offBus();
    };
  }, [open, close]);

  // HUD boot-in: the panel scales up while results cascade.
  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
    const palette = paletteRef.current;
    if (!palette || prefersReducedMotion()) return;

    const rows = palette.querySelectorAll("li");
    anime({
      targets: palette,
      opacity: [0, 1],
      scale: [0.95, 1],
      duration: 220,
      easing: "easeOutCubic",
    });
    anime({
      targets: rows,
      opacity: [0, 1],
      translateX: [-10, 0],
      delay: anime.stagger(26, { start: 70 }),
      duration: 260,
      easing: "easeOutQuad",
    });
  }, [open]);

  useEffect(() => {
    setSelected(0);
  }, [query]);

  if (!open) return null;

  const Search = icons.search;

  const onInputKey = (event: React.KeyboardEvent) => {
    if (event.key === "Escape") close();
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setSelected((value) => Math.min(value + 1, filtered.length - 1));
    }
    if (event.key === "ArrowUp") {
      event.preventDefault();
      setSelected((value) => Math.max(value - 1, 0));
    }
    if (event.key === "Enter" && filtered[selected]) {
      filtered[selected].run();
      close();
    }
  };

  return (
    <div ref={overlayRef} className={styles.overlay} onClick={close}>
      <div
        ref={paletteRef}
        className={styles.palette}
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
        onClick={(event) => event.stopPropagation()}
      >
        <div className={styles.inputRow}>
          <span className={styles.searchIcon}>
            <Search size={16} />
          </span>
          <span className={styles.prompt} aria-hidden="true">
            &gt;
          </span>
          <div className={styles.inputWrap}>
            <input
              ref={inputRef}
              className={styles.input}
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              onKeyDown={onInputKey}
              placeholder="Search case files..."
              aria-label="Search case files"
            />
            {query === "" && <span className={styles.fakeCaret} aria-hidden="true" />}
          </div>
          <kbd className={styles.kbd}>esc</kbd>
        </div>

        {filtered.length > 0 ? (
          <ul className={styles.list} role="listbox" aria-label="Commands">
            {filtered.map((item, i) => (
              <li key={item.id} role="option" aria-selected={i === selected}>
                <button
                  type="button"
                  className={`${styles.item} ${i === selected ? styles.active : ""}`}
                  onMouseEnter={() => setSelected(i)}
                  onClick={() => {
                    item.run();
                    close();
                  }}
                >
                  <span>{item.label}</span>
                  <span className={styles.hint}>{item.hint}</span>
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <div className={styles.empty}>
            <p className={styles.emptyTitle}>Case Not Found</p>
            <p className={styles.emptyText}>No file matches “{query}”. Try another lead.</p>
          </div>
        )}
      </div>
    </div>
  );
}
