import { escenarios } from '../../data/escenarios';
import { img } from '../../lib/assets';
import { guiaDelReto, type Partida } from '../estado';
import { barajar, esc, retosJugables } from '../util';
import { marcador } from './marcador';

/** `data-arg` es el índice original: 0 es la correcta. */
export const reto = (p: Partida, rnd: () => number = Math.random): string => {
  const e = escenarios[p.escenario]!;
  const retos = retosJugables(e);
  const r = retos[p.reto]!;
  const opciones = barajar([r.correcta, ...r.incorrectas].map((texto, i) => ({ texto, i })), rnd);
  return (
    marcador(p) +
    `<div class="scn" style="background-image:url(${img(e.fondo)})"><img src="${img(guiaDelReto(p.escenario, p.reto))}" alt=""></div>` +
    `<p>${esc(e.tema)}, reto ${p.reto + 1} de ${retos.length}</p>` +
    `<h2>${esc(r.pregunta)}</h2>` +
    `<div class="ops">${opciones
      .map((o) => `<button class="pi" data-accion="opcion" data-arg="${o.i}">${esc(o.texto)}</button>`)
      .join('')}</div>`
  );
};
