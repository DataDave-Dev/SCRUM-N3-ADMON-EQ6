import { escenarios } from '@/data/escenarios';
import type { Reto, RetoOrdenar, RetoRelacionar } from '@/data/tipos';
import { px } from '@/lib/assets';
import { guiaDelReto, type Partida } from '@/game/estado';
import { esc, retosJugables } from '@/game/util';
import { marcador } from '@/game/pantallas/marcador';

/** Segundos para responder según el tipo de reto. */
export const SEGUNDOS_POR_TIPO: Record<Reto['tipo'], number> = { mc: 25, ord: 45, rel: 45 };

/** Letra de cada opción de opción múltiple según su posición. */
const LETRAS = 'ABC';

/** Etiqueta del tipo de reto sobre la escena. */
const ETIQUETA: Record<Reto['tipo'], string> = { mc: 'Elige', ord: 'Ordenar', rel: 'Relacionar' };

/** Color de cada par en relacionar, por índice de concepto. */
const COLORES_PAR = ['var(--yel)', 'var(--pink)', 'var(--blue)'];

const comprobar = (completo: boolean): string =>
  `<button class="start" data-accion="comprobar"${completo ? '' : ' disabled'}>Comprobar</button>`;

const ordenar = (p: Partida, r: RetoOrdenar): string =>
  `<div class="ops">${p.orden
    .map((i) => {
      const n = p.seleccion.indexOf(i);
      const numero = n < 0 ? '<b class="key pixel vacia" aria-hidden="true">?</b>' : `<b class="key pixel">${n + 1}</b>`;
      return `<button class="op pxb${n < 0 ? '' : ' sel'}" data-accion="elegir" data-arg="${i}" aria-pressed="${n >= 0}">${numero}<span>${esc(r.pasos[i]!)}</span></button>`;
    })
    .join('')}</div>` + comprobar(p.seleccion.length === r.pasos.length);

/** Concepto y definición emparejados comparten `--par`; el concepto activo se resalta. */
const relacionar = (p: Partida, r: RetoRelacionar): string => {
  const par = (c: number) => (c < 0 ? '' : ` style="--par:${COLORES_PAR[c]}"`);
  const izq = r.pares
    .map(([concepto], c) => {
      const clase = `rl pxb${p.pares[c] === undefined ? '' : ' par'}${p.activo === c ? ' act' : ''}`;
      return `<button class="${clase}"${par(c)} data-accion="izq" data-arg="${c}" aria-pressed="${p.activo === c}">${esc(concepto)}</button>`;
    })
    .join('');
  const der = p.orden
    .map((d) => {
      const c = p.pares.indexOf(d);
      return `<button class="rl pxb${c < 0 ? '' : ' par'}"${par(c)} data-accion="der" data-arg="${d}">${esc(r.pares[d]![1])}</button>`;
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
    .map(
      (i, k) =>
        `<button class="op pxb" data-accion="opcion" data-arg="${i}"><b class="key pixel">${LETRAS[k]}</b><span>${esc(opciones[i]!)}</span></button>`,
    )
    .join('')}</div>`;
};

export const reto = (p: Partida): string => {
  const e = escenarios[p.escenario]!;
  const retos = retosJugables(e);
  return (
    marcador(p) +
    `<div class="scn bajo pxb"><img class="px fondo" src="${px(e.fondo)}" alt=""><img class="px" src="${px(guiaDelReto(p.escenario, p.reto))}" alt="">` +
    `<span class="pixel tag">${ETIQUETA[retos[p.reto]!.tipo]}</span></div>` +
    `<p class="tema">${esc(e.tema)}, reto ${p.reto + 1} de ${retos.length}</p>` +
    `<div class="tm pixel">Time<div><b data-tiempo></b></div></div>` +
    `<h2 class="pixel preg">${esc(retos[p.reto]!.pregunta)}</h2>` +
    `<div data-cuerpo>${cuerpoReto(p)}</div>`
  );
};
