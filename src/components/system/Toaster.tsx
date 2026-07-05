import { useEffect, useState } from "react";
import { on } from "@/lib/bus";
import styles from "./Toaster.module.css";

interface ToastItem {
  id: number;
  text: string;
}

let nextId = 0;

export function Toaster() {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  useEffect(
    () =>
      on("toast", (payload) => {
        const id = ++nextId;
        setToasts((current) => [...current.slice(-2), { id, text: String(payload) }]);
        window.setTimeout(() => {
          setToasts((current) => current.filter((toast) => toast.id !== id));
        }, 4000);
      }),
    [],
  );

  return (
    <div className={styles.stack} role="status" aria-live="polite">
      {toasts.map((toast) => (
        <div key={toast.id} className={styles.toast}>
          {toast.text}
        </div>
      ))}
    </div>
  );
}
