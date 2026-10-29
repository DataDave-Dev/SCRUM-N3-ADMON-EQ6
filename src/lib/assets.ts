import type { ClaveImagen } from '../data/tipos';

const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');

/** Ruta interna del sitio con el `base` de GitHub Pages. Ej.: ruta('/jugar/') */
export const ruta = (p: string) => `${BASE}${p}`;

/** URL pública de una imagen extraída del prototipo (public/img/<clave>.<ext>). */
export const img = (clave: ClaveImagen) =>
  ruta(`/img/${clave}.${clave.startsWith('b') && clave.length === 2 ? 'jpg' : 'webp'}`);
