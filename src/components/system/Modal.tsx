import { useEffect, useRef, type ReactNode } from "react";
import { icons } from "@/icons";
import styles from "./Modal.module.css";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  /** Mono header label, e.g. "DEVELOPER NOTES". */
  title: string;
  children: ReactNode;
}

export function Modal({ open, onClose, title, children }: ModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const Close = icons.close;

  useEffect(() => {
    if (!open) return;
    dialogRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div
        ref={dialogRef}
        className={styles.dialog}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        tabIndex={-1}
        onClick={(event) => event.stopPropagation()}
      >
        <div className={styles.head}>
          <span className={styles.title}>{title}</span>
          <button type="button" className={styles.close} onClick={onClose} aria-label="Close file">
            <Close size={16} />
          </button>
        </div>
        <div className={styles.body}>{children}</div>
        <div className={styles.foot}>
          <button type="button" className={styles.closeFile} onClick={onClose}>
            Close File
          </button>
        </div>
      </div>
    </div>
  );
}
