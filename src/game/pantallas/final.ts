import { img, ruta } from '@/lib/assets';
import { pixel } from '@/lib/pixel';
import { estrellas, insignias, PUNTOS_MAXIMOS, rango, type Partida } from '@/game/estado';
import { globo } from '@/game/util';

const TOTAL_ESTRELLAS = 3;
const ALTO_ESTRELLA = 64;

/** Partida ganada: estrellas, puntos, rango, insignias y aviso de récord. */
export const final = (p: Partida): string => {
  const n = estrellas(p.puntos);
  const lista = Array.from(
    { length: TOTAL_ESTRELLAS },
    (_, i) =>
      `<span class="estrella${i < n ? '' : ' off'}" style="animation-delay:${(i + 1) * 0.3}s">${pixel('estrella', ALTO_ESTRELLA)}</span>`,
  ).join('');
  return (
    `<p class="pixel kicker blink">Congratulations!</p>` +
    `<h1 class="pixel titulo">Juego completado</h1>` +
    `<div class="st" role="img" aria-label="${n} de ${TOTAL_ESTRELLAS} estrellas">${lista}</div>` +
    `<div class="caja pxb"><p class="pixel puntaje">${p.puntos} <small>de ${PUNTOS_MAXIMOS} puntos</small></p>` +
    `<p class="rango"><b>${rango(p.puntos)}</b>${p.nuevoRecord ? '. Nuevo mejor puntaje' : ''}</p></div>` +
    `<div class="insignias">${insignias(p)
      .map((b) => `<span class="ch pxb pixel">${b}</span>`)
      .join('')}</div>` +
    globo('pau', 'Valió la pena el esfuerzo. Con Scrum, ¡hasta Beto terminó a tiempo!') +
    `<div class="grupo pxb"><img src="${img('group')}" alt="Beto, Riqui, Lili, Pau y Toño celebran juntos"></div>` +
    `<div class="acciones"><button class="start" data-accion="reiniciar">Jugar de nuevo</button><a class="alt pxb" href="${ruta('/')}">Inicio</a></div>`
  );
};
