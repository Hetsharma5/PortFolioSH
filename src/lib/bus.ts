/**
 * Tiny pub/sub bus so decoupled components (navbar, easter eggs, palette,
 * toaster) can talk without threading props through the tree.
 */
export type BusEvent = "toast" | "palette" | "stats" | "notes";

type Handler = (payload?: unknown) => void;

const handlers = new Map<BusEvent, Set<Handler>>();

export function on(event: BusEvent, handler: Handler): () => void {
  let set = handlers.get(event);
  if (!set) {
    set = new Set();
    handlers.set(event, set);
  }
  set.add(handler);
  return () => set.delete(handler);
}

export function emit(event: BusEvent, payload?: unknown): void {
  handlers.get(event)?.forEach((handler) => handler(payload));
}

export function toast(message: string): void {
  emit("toast", message);
}

/** Easter egg: swaps the emerald accent for amber via a root class. */
export function toggleInvestigationMode(): void {
  const active = document.documentElement.classList.toggle("investigation");
  toast(
    active
      ? "Investigation Mode enabled — accent switched to amber."
      : "Investigation Mode disabled — back to emerald.",
  );
}
