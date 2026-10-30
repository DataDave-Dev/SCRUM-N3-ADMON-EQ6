import { escenarios } from '@/data/escenarios';
import { personajes } from '@/data/personajes';
import { img, px, ruta } from '@/lib/assets';
import { pixel } from '@/lib/pixel';
import { VIDAS_INICIALES, type Partida } from '@/game/estado';
import { esc, globo } from '@/game/util';

const FALLOS_A_REPASAR = 3;

/** Sin vidas: repaso de las últimas explicaciones falladas. */
export const derrota = (p: Partida): string => {
  const repaso = p.fallos
    .slice(-FALLOS_A_REPASAR)
    .map((x) => `<li>${esc(x)}</li>`)
    .join('');
  const corazones = pixel('corazon', 24).repeat(VIDAS_INICIALES);
  return (
    `<div class="vidas vacias" aria-hidden="true">${corazones}</div>` +
    `<p class="pixel titulo" aria-hidden="true">Game<br>over</p>` +
    `<h1 class="sub-titulo">Se acabaron las vidas</h1>` +
    `<div class="scn pxb gris"><img class="px fondo" src="${px(escenarios[p.escenario]!.fondo)}" alt=""><img class="mini" src="${img(personajes.inge.sprites.triste)}" alt=""></div>` +
    globo(
      'tono',
      `Los errores son normales: se prueba, se anota y se corrige en el siguiente Sprint. Repasa esto:<ul class="repaso">${repaso}</ul>`,
    ) +
    `<div class="acciones"><button class="start" data-accion="reintentar">Reintentar</button><a class="alt pxb" href="${ruta('/')}">Inicio</a></div>`
  );
};
