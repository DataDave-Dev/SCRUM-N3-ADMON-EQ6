import { img, ruta } from '../../lib/assets';
import { estrellas, insignias, PUNTOS_MAXIMOS, rango, type Partida } from '../estado';
import { globo } from '../util';

const TOTAL_ESTRELLAS = 3;

/** Partida ganada: estrellas, puntos, rango, insignias y aviso de récord. */
export const final = (p: Partida): string => {
  const n = estrellas(p.puntos);
  const lista = Array.from(
    { length: TOTAL_ESTRELLAS },
    (_, i) => `<span${i < n ? '' : ' class="off"'} style="animation-delay:${(i + 1) * 0.3}s">★</span>`,
  ).join('');
  return (
    `<h1 class="ctr fin">Juego completado</h1>` +
    `<div class="st" role="img" aria-label="${n} de ${TOTAL_ESTRELLAS} estrellas">${lista}</div>` +
    `<p class="d ctr puntaje">${p.puntos} <small>de ${PUNTOS_MAXIMOS} puntos</small></p>` +
    `<p class="ctr"><b>${rango(p.puntos)}</b>${p.nuevoRecord ? '. Nuevo mejor puntaje' : ''}</p>` +
    `<div class="ctr">${insignias(p)
      .map((b) => `<span class="ch">${b}</span>`)
      .join('')}</div>` +
    globo('pau', 'Valió la pena el esfuerzo. Con Scrum, ¡hasta Beto terminó a tiempo!') +
    `<img class="gp" src="${img('group')}" alt="Beto, Riqui, Lili, Pau y Toño celebran juntos">` +
    `<div class="ctr"><button class="go" data-accion="reiniciar">Jugar de nuevo</button> <a class="ghost" href="${ruta('/')}">Inicio</a></div>`
  );
};
