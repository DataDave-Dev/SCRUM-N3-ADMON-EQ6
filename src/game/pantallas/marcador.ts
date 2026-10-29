import { RETOS_POR_PARTIDA, VIDAS_INICIALES, type Partida } from '../estado';

const CLASE_SEGMENTO = { 1: 'on', 2: 'bad' } as const;

/** Vidas, puntos, racha y barra de 12 segmentos: verde acierto, rojo error, vacío pendiente. */
export const marcador = (p: Partida): string => {
  const segmentos = Array.from({ length: RETOS_POR_PARTIDA }, (_, i) => {
    const r = p.progreso[i];
    return `<i class="${r ? CLASE_SEGMENTO[r] : ''}"></i>`;
  });
  const corazones = `${'♥'.repeat(p.vidas)}<i>${'♥'.repeat(VIDAS_INICIALES - p.vidas)}</i>`;
  return (
    `<div class="hud"><span class="hd" role="img" aria-label="${p.vidas} de ${VIDAS_INICIALES} vidas">${corazones}</span>` +
    `<span>${p.puntos} pts</span><span>${p.racha > 1 ? `Racha x${p.racha}` : 'Sin racha'}</span></div>` +
    `<div class="seg">${segmentos.join('')}</div>`
  );
};
