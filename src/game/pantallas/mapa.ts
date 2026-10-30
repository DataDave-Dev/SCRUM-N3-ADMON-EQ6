import { escenarios } from '@/data/escenarios';
import { px } from '@/lib/assets';
import { pixel } from '@/lib/pixel';
import { escenarioHabilitado, type Partida } from '@/game/estado';
import { esc, globo } from '@/game/util';
import { marcador } from '@/game/pantallas/marcador';

const nota = (p: Partida, i: number): string => {
  if (p.completados[i]) return `: completado, ${p.puntosEscenario[i]} de 40 pts`;
  if (!escenarioHabilitado(p, i)) return ': completa el escenario anterior';
  return '';
};

/** Clase de estado de la tarjeta y su distintivo sobre la imagen. */
const estado = (p: Partida, i: number): [string, string] => {
  if (p.completados[i]) return ['hecho', '<span class="pixel marca">Clear!</span>'];
  if (escenarioHabilitado(p, i)) return ['abierto', '<span class="pixel marca blink">Open</span>'];
  return ['bloqueado', `<span class="candado">${pixel('candado', 40)}</span>`];
};

const titulo =
  `<div class="seleccion">${pixel('flecha', 20, 'blink')}<h2 class="pixel">Select stage</h2>` +
  `${pixel('flecha', 20, 'blink volteado')}</div>`;

export const mapa = (p: Partida): string =>
  marcador(p) +
  titulo +
  globo('inge', 'Elige tu siguiente reto.') +
  escenarios
    .map((e, i) => {
      const [clase, marca] = estado(p, i);
      return (
        `<button class="stage pxb ${clase}" data-accion="escenario" data-arg="${i}"${escenarioHabilitado(p, i) ? '' : ' disabled'}>` +
        `<span class="port"><img class="px" src="${px(e.fondo)}" alt=""><span class="pixel tag">Stage ${i + 1}</span>${marca}</span>` +
        `<span class="info"><span class="pixel">${i + 1}. ${esc(e.titulo)}</span><small>${esc(e.tema)}${nota(p, i)}</small></span>` +
        `</button>`
      );
    })
    .join('');
