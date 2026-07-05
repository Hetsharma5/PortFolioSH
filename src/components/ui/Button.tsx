import type { AnchorHTMLAttributes, ReactNode } from "react";
import styles from "./Button.module.css";

interface ButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: "primary" | "ghost";
  children: ReactNode;
}

/** Anchor styled as a button — every CTA on the page is a link. */
export function Button({ variant = "primary", children, className, ...rest }: ButtonProps) {
  return (
    <a className={`${styles.button} ${styles[variant]} ${className ?? ""}`} {...rest}>
      {children}
    </a>
  );
}
