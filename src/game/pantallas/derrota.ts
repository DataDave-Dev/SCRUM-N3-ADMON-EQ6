import { escenarios } from '../../data/escenarios';
import { personajes } from '../../data/personajes';
import { img, ruta } from '../../lib/assets';
import type { Partida } from '../estado';
import { esc, globo } from '../util';

const FALLOS_A_REPASAR = 3;

/** Sin vidas: repaso de las últimas explicaciones falladas. */
export const derrota = (p: Partida): string => {
  const repaso = p.fallos
    .slice(-FALLOS_A_REPASAR)
    .map((x) => `<br>• ${esc(x)}`)
    .join('');
  return (
    `<h1>Se acabaron las vidas</h1>` +
    `<div class="scn" style="background-image:url(${img(escenarios[p.escenario]!.fondo)})"><img class="mini" src="${img(personajes.inge.sprites.triste)}" alt=""></div>` +
    globo('tono', `Los errores son normales: se prueba, se anota y se corrige en el siguiente Sprint. Repasa esto:${repaso}`) +
    `<button class="go" data-accion="reintentar">Reintentar</button> <a class="ghost" href="${ruta('/')}">Inicio</a>`
  );
};
