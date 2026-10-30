import { detener } from "@/game/temporizador";

export type Despachar = (accion: string, arg?: string) => void;

const INTERVALO_ESCRITURA_MS = 16;

/** Cancela el efecto de escritura activo, si lo hay. */
let cancelar: (() => void) | undefined;

const app = () => document.getElementById("app")!;

/** Detiene el temporizador del reto, reemplaza la pantalla, sube al inicio y arranca el efecto de escritura de `[data-escribir]`. */
export function montar(html: string): void {
  cancelar?.();
  detener();
  app().innerHTML = html;
  window.scrollTo(0, 0);
  const el = app().querySelector<HTMLElement>("[data-escribir]");
  if (el) escribir(el);
}

/** Un solo `click` delegado en #app: cualquier `[data-accion]` llega al orquestador. */
export function escuchar(despachar: Despachar): void {
  app().addEventListener("click", (e) => {
    const el = (e.target as Element).closest<HTMLElement>("[data-accion]");
    if (el && el.dataset.accion) despachar(el.dataset.accion, el.dataset.arg);
  });
}

/** Revela `el.textContent` letra por letra; pulsar el texto lo muestra completo. */
export function escribir(el: HTMLElement): void {
  const texto = el.textContent ?? "";
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  let i = 0;
  el.textContent = "";
  const id = setInterval(() => {
    el.textContent = texto.slice(0, ++i);
    if (i >= texto.length) cancelar?.();
  }, INTERVALO_ESCRITURA_MS);
  cancelar = () => {
    clearInterval(id);
    el.textContent = texto;
    cancelar = undefined;
  };
  el.addEventListener("click", () => cancelar?.(), { once: true });
}
