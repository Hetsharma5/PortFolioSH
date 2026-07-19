import { navItems } from "@/data/nav";
import { profile } from "@/data/profile";
import { icons } from "@/icons";
import styles from "./Footer.module.css";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <blockquote className={styles.quote}>
          <p>&ldquo;{profile.quote}&rdquo;</p>
          <cite>— {profile.initials}</cite>
        </blockquote>

        <div className={styles.top}>
          <div className={styles.brand}>
            <a href="#hero" className={styles.logo}>
              {profile.initials}
              <span>.</span>
            </a>
            <p className={styles.tagline}>{profile.statement}</p>
          </div>

          <nav aria-label="Footer">
            <ul className={styles.links}>
              {navItems.map((item) => (
                <li key={item.id}>
                  <a href={`#${item.id}`}>{item.label}</a>
                </li>
              ))}
            </ul>
          </nav>

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

        <div className={styles.bottom}>
          <p>
            © {new Date().getFullYear()} {profile.name}. All rights reserved.
          </p>
          <p className={styles.tip}>
            Tip: press <kbd>Ctrl</kbd> <kbd>K</kbd>
          </p>
        </div>

        <p className={styles.endOfFile} aria-hidden="true">
          // CASE CLOSED — END OF FILE //
        </p>
      </div>
    </footer>
  );
}
