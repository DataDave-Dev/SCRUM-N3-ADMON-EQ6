import { escenarios } from '../../data/escenarios';
import type { Partida } from '../estado';
import { esc, globo } from '../util';
import { marcador } from './marcador';

const PUNTOS_MAXIMOS_ESCENARIO = 40;

export const resultado = (p: Partida): string => {
  const e = escenarios[p.escenario]!;
  const pts = p.puntosEscenario[p.escenario]!;
  const todos = p.completados.every(Boolean);
  const mensaje =
    pts === PUNTOS_MAXIMOS_ESCENARIO
      ? '¡Perfecto! Así se avanza en Scrum: una meta pequeña a la vez.'
      : 'Bien hecho. Cada Sprint deja algo que mejorar.';
  return (
    marcador(p) +
    `<h2>${esc(e.titulo)}: completado</h2>` +
    `<p class="d ctr puntaje">${pts} / ${PUNTOS_MAXIMOS_ESCENARIO}</p>` +
    globo('inge', mensaje) +
    `<button class="go" data-accion="${todos ? 'fin' : 'mapa'}">${todos ? 'Ver resultados' : 'Volver al mapa'}</button>`
  );
};
