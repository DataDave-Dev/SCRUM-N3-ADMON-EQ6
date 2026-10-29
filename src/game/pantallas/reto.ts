import { escenarios } from '../../data/escenarios';
import type { Reto, RetoOrdenar, RetoRelacionar } from '../../data/tipos';
import { img } from '../../lib/assets';
import { guiaDelReto, type Partida } from '../estado';
import { esc, retosJugables } from '../util';
import { marcador } from './marcador';

/** Segundos para responder según el tipo de reto. */
export const SEGUNDOS_POR_TIPO: Record<Reto['tipo'], number> = { mc: 25, ord: 45, rel: 45 };

/** Color de cada par en relacionar, por índice de concepto. */
const COLORES_PAR = ['var(--yel)', 'var(--pink)', 'var(--blue)'];

const comprobar = (completo: boolean): string =>
  `<button class="go" data-accion="comprobar"${completo ? '' : ' disabled'}>Comprobar</button>`;

const ordenar = (p: Partida, r: RetoOrdenar): string =>
  `<div class="ops">${p.orden
    .map((i) => {
      const n = p.seleccion.indexOf(i);
      return `<button class="pi${n < 0 ? '' : ' sel'}" data-accion="elegir" data-arg="${i}" aria-pressed="${n >= 0}"><b class="num">${
        n < 0 ? '' : n + 1
      }</b>${esc(r.pasos[i]!)}</button>`;
    })
    .join('')}</div>` + comprobar(p.seleccion.length === r.pasos.length);

/** Concepto y definición emparejados comparten `--par`; el concepto activo se resalta. */
const relacionar = (p: Partida, r: RetoRelacionar): string => {
  const par = (c: number) => (c < 0 ? '' : ` style="--par:${COLORES_PAR[c]}"`);
  const izq = r.pares
    .map(([concepto], c) => {
      const clase = `rl${p.pares[c] === undefined ? '' : ' par'}${p.activo === c ? ' act' : ''}`;
      return `<button class="${clase}"${par(c)} data-accion="izq" data-arg="${c}" aria-pressed="${p.activo === c}">${esc(concepto)}</button>`;
    })
    .join('');
  const der = p.orden
    .map((d) => {
      const c = p.pares.indexOf(d);
      return `<button class="rl${c < 0 ? '' : ' par'}"${par(c)} data-accion="der" data-arg="${d}">${esc(r.pares[d]![1])}</button>`;
    })
    .join('');
  const completos = p.pares.filter((d) => d !== undefined).length === r.pares.length;
  return `<div class="cols"><div>${izq}</div><div>${der}</div></div>` + comprobar(completos);
};

/** Parte del reto que cambia al pulsar; se repinta sin reiniciar el temporizador. */
export const cuerpoReto = (p: Partida): string => {
  const r = retosJugables(escenarios[p.escenario]!)[p.reto]!;
  if (r.tipo === 'ord') return ordenar(p, r);
  if (r.tipo === 'rel') return relacionar(p, r);
  const opciones = [r.correcta, ...r.incorrectas];
  // `data-arg` es el índice original: 0 es la correcta.
  return `<div class="ops">${p.orden
    .map((i) => `<button class="pi" data-accion="opcion" data-arg="${i}">${esc(opciones[i]!)}</button>`)
    .join('')}</div>`;
};

export const reto = (p: Partida): string => {
  const e = escenarios[p.escenario]!;
  const retos = retosJugables(e);
  return (
    marcador(p) +
    `<div class="scn" style="background-image:url(${img(e.fondo)})"><img src="${img(guiaDelReto(p.escenario, p.reto))}" alt=""></div>` +
    `<p>${esc(e.tema)}, reto ${p.reto + 1} de ${retos.length}</p>` +
    `<div class="tm"><b data-tiempo></b></div>` +
    `<h2>${esc(retos[p.reto]!.pregunta)}</h2>` +
    `<div data-cuerpo>${cuerpoReto(p)}</div>`
  );
};
