import { escenarios } from '../../data/escenarios';
import { img } from '../../lib/assets';
import type { Partida } from '../estado';
import { esc, globo } from '../util';
import { marcador } from './marcador';

export const intro = (p: Partida): string => {
  const e = escenarios[p.escenario]!;
  const linea = e.intro[p.linea]!;
  const ultima = p.linea === e.intro.length - 1;
  const enEscena = [...new Set(e.intro.map((l) => l.personaje))].slice(0, 2);
  const sprites = enEscena
    .map((k, i) => `<img class="${i ? 'r' : ''}${k === linea.personaje ? '' : ' off'}" src="${img(k)}" alt="">`)
    .join('');
  return (
    marcador(p) +
    `<div class="scn" style="background-image:url(${img(e.fondo)})">${sprites}</div>` +
    globo(linea.personaje, `<span data-escribir>${esc(linea.texto)}</span>`) +
    `<button class="go" data-accion="siguiente">${ultima ? 'Empezar el reto' : 'Siguiente'}</button>`
  );
};
