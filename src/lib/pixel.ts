/** Iconos pixel art compartidos por `Pixel.astro` y las pantallas del juego. */
export type TipoPixel = 'corazon' | 'estrella' | 'flecha' | 'candado' | 'abajo';

// [columnas, filas, rectángulos [x, y, ancho, alto]]
export const formas: Record<TipoPixel, [number, number, number[][]]> = {
  corazon: [7, 6, [[1, 0, 2, 1], [4, 0, 2, 1], [0, 1, 7, 2], [1, 3, 5, 1], [2, 4, 3, 1], [3, 5, 1, 1]]],
  estrella: [7, 7, [[3, 0, 1, 2], [1, 2, 5, 1], [0, 3, 7, 1], [1, 4, 5, 1], [2, 5, 1, 1], [4, 5, 1, 1], [1, 6, 1, 1], [5, 6, 1, 1]]],
  flecha: [4, 7, [[0, 0, 1, 7], [1, 1, 1, 5], [2, 2, 1, 3], [3, 3, 1, 1]]],
  candado: [7, 8, [[2, 0, 3, 1], [1, 1, 1, 2], [5, 1, 1, 2], [0, 3, 7, 2], [0, 5, 3, 2], [4, 5, 3, 2], [0, 7, 7, 1]]],
  abajo: [5, 3, [[0, 0, 5, 1], [1, 1, 3, 1], [2, 2, 1, 1]]],
};

/** El mismo icono como texto HTML; decorativo salvo que lleve `label` (ya escapado). */
export const pixel = (tipo: TipoPixel, alto: number, clase = '', label?: string): string => {
  const [cols, filas, rects] = formas[tipo];
  const a11y = label ? `role="img" aria-label="${label}"` : 'aria-hidden="true"';
  const cuerpo = rects.map(([x, y, w, h]) => `<rect x="${x}" y="${y}" width="${w}" height="${h}"/>`).join('');
  return `<svg${clase ? ` class="${clase}"` : ''} viewBox="0 0 ${cols} ${filas}" width="${Math.round((alto * cols) / filas)}" height="${alto}" shape-rendering="crispEdges" fill="currentColor" ${a11y}>${cuerpo}</svg>`;
};
