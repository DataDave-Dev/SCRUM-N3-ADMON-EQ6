import { escenarios } from '@/data/escenarios';
import { px } from '@/lib/assets';
import { pixel } from '@/lib/pixel';
import type { Partida } from '@/game/estado';
import { esc, globo } from '@/game/util';
import { marcador } from '@/game/pantallas/marcador';

export const intro = (p: Partida): string => {
  const e = escenarios[p.escenario]!;
  const linea = e.intro[p.linea]!;
  const ultima = p.linea === e.intro.length - 1;
  const enEscena = [...new Set(e.intro.map((l) => l.personaje))].slice(0, 2);
  const sprites = enEscena
    .map((k, i) => `<img class="px${i ? ' r' : ''}${k === linea.personaje ? '' : ' off'}" src="${px(k)}" alt="">`)
    .join('');
  return (
    marcador(p) +
    `<p class="pixel kicker">Stage ${p.escenario + 1} · ${esc(e.titulo)}</p>` +
    `<div class="scn pxb"><img class="px fondo" src="${px(e.fondo)}" alt="">${sprites}</div>` +
    globo(linea.personaje, `<span data-escribir>${esc(linea.texto)}</span>`) +
    `<button class="start" data-accion="siguiente">${ultima ? 'Empezar el reto' : 'Siguiente'} ${pixel('flecha', 24)}</button>`
  );
};
