import { personajes } from '../data/personajes';
import type { ClavePersonaje, Escenario, Reto } from '../data/tipos';

/** Copia barajada (Fisher-Yates). `rnd` se inyecta para pruebas deterministas. */
export const barajar = <T>(arr: readonly T[], rnd: () => number = Math.random): T[] => {
  const copia = [...arr];
  for (let i = copia.length - 1; i > 0; i--) {
    const j = Math.floor(rnd() * (i + 1));
    [copia[i], copia[j]] = [copia[j]!, copia[i]!];
  }
  return copia;
};

const ESCAPES: Record<string, string> = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
/** Escapa texto para HTML y atributos. */
export const esc = (s: string): string => s.replace(/[&<>"']/g, (c) => ESCAPES[c]!);

/** Globo de diálogo; `html` ya debe venir escapado. */
export const globo = (clave: ClavePersonaje, html: string): string => {
  const { nombre, color } = personajes[clave];
  return `<div class="cl" style="--c:${color}"><b>${nombre}</b>${html}</div>`;
};

/** Único punto que decide qué retos se juegan. */
export const retosJugables = (e: Escenario): Reto[] => e.retos;

/** Textos que el reto baraja: opciones, pasos o definiciones, en su orden original. */
export const elementos = (r: Reto): string[] =>
  r.tipo === 'mc' ? [r.correcta, ...r.incorrectas] : r.tipo === 'ord' ? r.pasos : r.pares.map(([, d]) => d);
