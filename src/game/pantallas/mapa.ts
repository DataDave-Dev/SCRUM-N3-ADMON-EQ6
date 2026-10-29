import { escenarios } from '../../data/escenarios';
import { img } from '../../lib/assets';
import { escenarioHabilitado, type Partida } from '../estado';
import { esc, globo } from '../util';
import { marcador } from './marcador';

const nota = (p: Partida, i: number): string => {
  if (p.completados[i]) return `: completado, ${p.puntosEscenario[i]} de 40 pts`;
  if (!escenarioHabilitado(p, i)) return ': completa el escenario anterior';
  return '';
};

export const mapa = (p: Partida): string =>
  marcador(p) +
  globo('inge', 'Elige tu siguiente reto.') +
  escenarios
    .map(
      (e, i) =>
        `<button class="mp" style="--im:url(${img(e.fondo)})" data-accion="escenario" data-arg="${i}"${
          escenarioHabilitado(p, i) ? '' : ' disabled'
        }>${i + 1}. ${esc(e.titulo)}<small>${esc(e.tema)}${nota(p, i)}</small></button>`,
    )
    .join('');
