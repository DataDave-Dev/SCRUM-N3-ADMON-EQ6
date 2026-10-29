import { RETOS_POR_PARTIDA, type Partida } from '../estado';

const CLASE_SEGMENTO = { 1: 'on', 2: 'bad' } as const;

/** Puntos y barra de 12 segmentos: verde acierto, rojo error, vacío pendiente. */
export const marcador = (p: Partida): string => {
  const segmentos = Array.from({ length: RETOS_POR_PARTIDA }, (_, i) => {
    const r = p.progreso[i];
    return `<i class="${r ? CLASE_SEGMENTO[r] : ''}"></i>`;
  });
  return `<div class="hud"><span>${p.puntos} pts</span></div><div class="seg">${segmentos.join('')}</div>`;
};
