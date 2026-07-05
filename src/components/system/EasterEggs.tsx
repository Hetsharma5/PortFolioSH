import { useEffect, useState } from "react";
import { on, toast, toggleInvestigationMode } from "@/lib/bus";
import { CommandPalette } from "./CommandPalette";
import { Modal } from "./Modal";
import { Toaster } from "./Toaster";
import styles from "./EasterEggs.module.css";

const KONAMI = [
  "arrowup",
  "arrowup",
  "arrowdown",
  "arrowdown",
  "arrowleft",
  "arrowright",
  "arrowleft",
  "arrowright",
  "b",
  "a",
];

function isEditable(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;
  return (
    target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable
  );
}

/**
 * Hosts every hidden interaction:
 *  - type "221B"        → toggles Investigation Mode (amber accent)
 *  - type "sudo solve"  → a sympathetic message from the terminal
 *  - Konami code        → Developer Notes
 *  - double-click logo  → hidden stats (via the "stats" bus event)
 */
export function EasterEggs() {
  const [notesOpen, setNotesOpen] = useState(false);
  const [statsOpen, setStatsOpen] = useState(false);

  useEffect(() => {
    const offNotes = on("notes", () => setNotesOpen(true));
    const offStats = on("stats", () => setStatsOpen(true));

    let buffer = "";
    let konamiIndex = 0;

    const onKey = (event: KeyboardEvent) => {
      if (isEditable(event.target)) return;
      const key = event.key.toLowerCase();

      // Konami sequence (arrows + b + a).
      konamiIndex = key === KONAMI[konamiIndex] ? konamiIndex + 1 : key === KONAMI[0] ? 1 : 0;
      if (konamiIndex === KONAMI.length) {
        konamiIndex = 0;
        setNotesOpen(true);
        toast("Konami code accepted. Developer Notes unlocked.");
      }

      // Typed phrases.
      if (key.length === 1 || key === " ") {
        buffer = (buffer + key).slice(-16);
        if (buffer.endsWith("221b")) {
          buffer = "";
          toggleInvestigationMode();
        }
        if (buffer.endsWith("sudo solve")) {
          buffer = "";
          toast("sudo: permission granted. Root cause located — it was DNS. It's always DNS.");
        }
      }
    };

    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      offNotes();
      offStats();
    };
  }, []);

  return (
    <>
      <CommandPalette />
      <Toaster />

      <Modal open={notesOpen} onClose={() => setNotesOpen(false)} title="DEVELOPER NOTES // CLASSIFIED">
        <ul className={styles.notes}>
          <li>Built with React 19 + Vite + TypeScript. No UI kits, no animation libraries.</li>
          <li>Every visual is CSS — design tokens, CSS Modules, and one IntersectionObserver.</li>
          <li>The accent color is a single CSS variable. Investigation Mode just swaps it.</li>
          <li>All reveals respect <code>prefers-reduced-motion</code>.</li>
          <li>There are four hidden interactions on this page. You've found at least one.</li>
        </ul>
      </Modal>

      <Modal open={statsOpen} onClose={() => setStatsOpen(false)} title="HIDDEN STATS // EYES ONLY">
        <dl className={styles.stats}>
          <div>
            <dt>Cases closed</dt>
            <dd>12+</dd>
          </div>
          <div>
            <dt>Bugs introduced</dt>
            <dd>1,204</dd>
          </div>
          <div>
            <dt>Bugs fixed</dt>
            <dd>1,203 (one is load-bearing)</dd>
          </div>
          <div>
            <dt>Coffee consumed</dt>
            <dd>unmeasurable</dd>
          </div>
          <div>
            <dt>Browser tabs open right now</dt>
            <dd>47</dd>
          </div>
          <div>
            <dt>Konami codes honored</dt>
            <dd>all of them</dd>
          </div>
        </dl>
      </Modal>
    </>
  );
}
