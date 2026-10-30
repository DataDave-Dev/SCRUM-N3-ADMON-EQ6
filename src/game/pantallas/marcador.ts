import { pixel } from '@/lib/pixel';
import { RETOS_POR_PARTIDA, VIDAS_INICIALES, type Partida } from '@/game/estado';

const CLASE_SEGMENTO = { 1: 'on', 2: 'bad' } as const;
const ALTO_CORAZON = 18;

/** HUD arcade: vidas, puntos, racha y barra de 12 segmentos (verde acierto, rojo error, vacío pendiente). */
export const marcador = (p: Partida): string => {
  const segmentos = Array.from({ length: RETOS_POR_PARTIDA }, (_, i) => {
    const r = p.progreso[i];
    return `<i class="${r ? CLASE_SEGMENTO[r] : ''}"></i>`;
  });
  const corazones = Array.from({ length: VIDAS_INICIALES }, (_, i) =>
    pixel('corazon', ALTO_CORAZON, i < p.vidas ? '' : 'off'),
  ).join('');
  const lugar = p.pantalla === 'mapa' ? 'Mapa' : `Stage ${p.escenario + 1}`;
  return (
    `<header class="hud pxb"><div class="fila">` +
    `<span class="vidas" role="img" aria-label="${p.vidas} de ${VIDAS_INICIALES} vidas">${corazones}</span>` +
    `<span class="pixel pts">${p.puntos} pts</span></div>` +
    `<div class="fila pixel sub"><span>${lugar}</span><span${p.racha > 1 ? ' class="grn"' : ''}>${p.racha > 1 ? `Racha x${p.racha}` : 'Sin racha'}</span></div>` +
    `<div class="seg">${segmentos.join('')}</div></header>`
  );
};
