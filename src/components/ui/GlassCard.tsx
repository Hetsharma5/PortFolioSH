import type { HTMLAttributes, ReactNode } from "react";
import styles from "./GlassCard.module.css";

interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  /** Adds a lift + border highlight on hover. */
  interactive?: boolean;
}

export function GlassCard({ children, interactive = false, className, ...rest }: GlassCardProps) {
  return (
    <div
      className={`${styles.card} ${interactive ? styles.interactive : ""} ${className ?? ""}`}
      {...rest}
    >
      {children}
    </div>
  );
}
