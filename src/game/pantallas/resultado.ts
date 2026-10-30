import { escenarios } from '@/data/escenarios';
import type { Partida } from '@/game/estado';
import { esc, globo, retosJugables } from '@/game/util';
import { marcador } from '@/game/pantallas/marcador';

const PUNTOS_MAXIMOS_ESCENARIO = 40;

export const resultado = (p: Partida): string => {
  const e = escenarios[p.escenario]!;
  const pts = p.puntosEscenario[p.escenario]!;
  const todos = p.completados.every(Boolean);
  const mensaje =
    pts === PUNTOS_MAXIMOS_ESCENARIO
      ? '¡Perfecto! Así se avanza en Scrum: una meta pequeña a la vez.'
      : 'Bien hecho. Cada Sprint deja algo que mejorar.';
  // Los retos del escenario recién terminado son los últimos del progreso.
  const casillas = p.progreso
    .slice(-retosJugables(e).length)
    .map((r, i) => `<i class="${r === 1 ? 'on' : 'bad'}">${i + 1}</i>`)
    .join('');
  return (
    marcador(p) +
    `<p class="pixel titulo" aria-hidden="true">Stage<br>clear!</p>` +
    `<h2 class="pixel kicker">${esc(e.titulo)}: completado</h2>` +
    `<div class="caja pxb"><p class="pixel puntaje">${pts}<small> / ${PUNTOS_MAXIMOS_ESCENARIO}</small></p>` +
    `<div class="casillas pixel" aria-hidden="true">${casillas}</div></div>` +
    globo('inge', mensaje) +
    `<button class="start" data-accion="${todos ? 'fin' : 'mapa'}">${todos ? 'Ver resultados' : 'Volver al mapa'}</button>`
  );
};
