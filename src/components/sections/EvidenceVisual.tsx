import type { CSSProperties, ReactNode } from "react";
import type { EvidenceVisualKind } from "@/data/evidence";
import styles from "./EvidenceVisual.module.css";

/*
 * Decorative, hand-drawn mock screens for evidence-file cards. Everything
 * here is presentational skeleton UI, so the whole tree is aria-hidden.
 * Swap for real screenshots by replacing <EvidenceVisual /> with an
 * <img loading="lazy" /> in EvidenceLocker.tsx when you have them.
 */

type Tone = "dim" | "mid" | "accent";

function Bar({ w, h = 8, tone = "dim" }: { w: number | string; h?: number; tone?: Tone }) {
  return <i className={`${styles.bar} ${styles[tone]}`} style={{ width: w, height: h }} />;
}

function CommerceScreen() {
  return (
    <div className={styles.screen}>
      <div className={styles.rowBetween}>
        <div className={styles.stack}>
          <Bar w={50} h={7} tone="mid" />
          <Bar w={84} h={9} />
        </div>
        <i className={styles.avatar} />
      </div>
      <i className={styles.search} />
      <div className={styles.row}>
        <i className={styles.chipActive} style={{ width: 52 }} />
        <i className={styles.chip} style={{ width: 42 }} />
        <i className={styles.chip} style={{ width: 56 }} />
      </div>
      <div className={styles.productGrid}>
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className={styles.productCard}>
            <i className={styles.productImg} />
            <Bar w="70%" h={7} tone="mid" />
            <Bar w="40%" h={7} tone="accent" />
          </div>
        ))}
      </div>
      <div className={styles.tabbar}>
        {[0, 1, 2, 3, 4].map((i) => (
          <i key={i} className={i === 0 ? styles.tabDotActive : styles.tabDot} />
        ))}
      </div>
    </div>
  );
}

function TravelScreen() {
  const pins: CSSProperties[] = [
    { left: "22%", top: "32%" },
    { left: "56%", top: "58%" },
    { left: "76%", top: "22%" },
  ];
  return (
    <div className={styles.screen}>
      <div className={styles.rowBetween}>
        <div className={styles.stack}>
          <Bar w={78} h={9} />
          <Bar w={48} h={7} tone="mid" />
        </div>
        <div className={styles.avatarRow}>
          <i className={styles.avatarSm} />
          <i className={styles.avatarSm} />
          <i className={styles.avatarSmAccent} />
        </div>
      </div>
      <div className={styles.map}>
        {pins.map((style, i) => (
          <i key={i} className={i === 2 ? styles.pinFaded : styles.pin} style={style} />
        ))}
      </div>
      {[0, 1, 2].map((i) => (
        <div key={i} className={styles.listRow}>
          <i className={styles.listDot} />
          <div className={styles.stack}>
            <Bar w={`${72 - i * 12}%`} h={7} tone="mid" />
            <Bar w={`${44 - i * 6}%`} h={6} />
          </div>
        </div>
      ))}
      <div className={styles.row}>
        <i className={styles.chipActive} style={{ width: 64 }} />
        <i className={styles.chip} style={{ width: 52 }} />
      </div>
    </div>
  );
}

function DashboardScreen() {
  const heights = [42, 66, 50, 80, 58, 94, 70, 46, 86, 62, 74, 55];
  return (
    <div className={styles.dash}>
      <div className={styles.sidebar}>
        <i className={styles.sideDotActive} />
        <i className={styles.sideDot} />
        <i className={styles.sideDot} />
        <i className={styles.sideDot} />
      </div>
      <div className={styles.dashMain}>
        <div className={styles.statRow}>
          {[0, 1, 2].map((i) => (
            <div key={i} className={styles.statCard}>
              <Bar w="55%" h={6} tone="mid" />
              <Bar w="75%" h={9} tone={i === 0 ? "accent" : "dim"} />
            </div>
          ))}
        </div>
        <div className={styles.chart}>
          {heights.map((h, i) => (
            <i
              key={i}
              className={i === 5 || i === 8 ? styles.chartBarAccent : styles.chartBar}
              style={{ height: `${h}%` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function ChatScreen() {
  return (
    <div className={styles.chat}>
      <div className={styles.bubbleLeft} style={{ width: "58%" }}>
        <Bar w="82%" h={6} tone="mid" />
        <Bar w="56%" h={6} tone="mid" />
      </div>
      <div className={styles.bubbleRight} style={{ width: "50%" }}>
        <Bar w="76%" h={6} tone="accent" />
        <Bar w="44%" h={6} tone="accent" />
      </div>
      <div className={styles.codeBlock}>
        <Bar w="40%" h={6} tone="accent" />
        <Bar w="72%" h={6} tone="mid" />
        <Bar w="58%" h={6} tone="mid" />
        <Bar w="66%" h={6} tone="dim" />
      </div>
      <div className={styles.inputBar}>
        <Bar w="42%" h={6} tone="mid" />
        <i className={styles.sendDot} />
      </div>
    </div>
  );
}

function PhoneFrame({ children, crop }: { children: ReactNode; crop: boolean }) {
  return (
    <div className={`${styles.phone} ${crop ? styles.phoneCrop : ""}`}>
      <i className={styles.notch} />
      {children}
    </div>
  );
}

function BrowserFrame({ children, crop }: { children: ReactNode; crop: boolean }) {
  return (
    <div className={`${styles.browser} ${crop ? styles.browserCrop : ""}`}>
      <div className={styles.chrome}>
        <i className={styles.winDot} />
        <i className={styles.winDot} />
        <i className={styles.winDot} />
        <i className={styles.urlBar} />
      </div>
      {children}
    </div>
  );
}

interface EvidenceVisualProps {
  kind: EvidenceVisualKind;
  /** Crop the frame against the bottom edge of its container (compact cards). */
  crop?: boolean;
}

export function EvidenceVisual({ kind, crop = false }: EvidenceVisualProps) {
  const isPhone = kind === "commerce-phone" || kind === "travel-phone";
  return (
    <div className={`${styles.root} ${crop ? styles.rootCrop : ""}`} aria-hidden="true">
      {isPhone ? (
        <PhoneFrame crop={crop}>
          {kind === "commerce-phone" ? <CommerceScreen /> : <TravelScreen />}
        </PhoneFrame>
      ) : (
        <BrowserFrame crop={crop}>
          {kind === "dashboard-browser" ? <DashboardScreen /> : <ChatScreen />}
        </BrowserFrame>
      )}
    </div>
  );
}
