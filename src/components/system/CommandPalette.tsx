import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { allSections } from "@/data/nav";
import { profile } from "@/data/profile";
import { icons } from "@/icons";
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

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
    setSelected(0);
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
        setOpen((value) => !value);
      }
    };
    window.addEventListener("keydown", onKey);
    const offBus = on("palette", () => setOpen(true));
    return () => {
      window.removeEventListener("keydown", onKey);
      offBus();
    };
  }, []);

  useEffect(() => {
    if (open) inputRef.current?.focus();
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
    <div className={styles.overlay} onClick={close}>
      <div
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
          <input
            ref={inputRef}
            className={styles.input}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onKeyDown={onInputKey}
            placeholder="Search case files..."
            aria-label="Search case files"
          />
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
