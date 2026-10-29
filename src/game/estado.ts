import { escenarios } from '../data/escenarios';
import type { ClavePersonaje } from '../data/tipos';

export const PUNTOS_POR_ACIERTO = 10;
export const RETOS_POR_PARTIDA = 12;
export const VIDAS_INICIALES = 3;

export type Pantalla = 'mapa' | 'intro' | 'reto' | 'retro' | 'resultado' | 'derrota' | 'fin';

/** Estado completo de una partida. Inmutable: cada función devuelve una copia. */
export interface Partida {
  pantalla: Pantalla;
  /** Índice del escenario actual. */
  escenario: number;
  /** Línea de la intro que se muestra. */
  linea: number;
  /** Índice del reto actual dentro de los retos jugables del escenario. */
  reto: number;
  puntos: number;
  /** 1 acierto, 2 error, en el orden en que se resolvieron. */
  progreso: (1 | 2)[];
  puntosEscenario: number[];
  completados: boolean[];
  vidas: number;
  /** Aciertos consecutivos. */
  racha: number;
  rachaMax: number;
  /** Explicaciones de los retos fallados, en orden. */
  fallos: string[];
  /** El último reto se resolvió por tiempo agotado. */
  tiempoAgotado: boolean;
  /** Orden barajado de las opciones, pasos o definiciones del reto en curso (índices originales). */
  orden: number[];
  /** Ordenar: índices de los pasos en el orden pulsado. */
  seleccion: number[];
  /** Relacionar: `pares[concepto]` es la definición asignada. */
  pares: (number | undefined)[];
  /** Relacionar: concepto marcado esperando definición. */
  activo: number | null;
}

export const nuevaPartida = (): Partida => ({
  pantalla: 'mapa',
  escenario: 0,
  linea: 0,
  reto: 0,
  puntos: 0,
  progreso: [],
  puntosEscenario: escenarios.map(() => 0),
  completados: escenarios.map(() => false),
  vidas: VIDAS_INICIALES,
  racha: 0,
  rachaMax: 0,
  fallos: [],
  tiempoAgotado: false,
  orden: [],
  seleccion: [],
  pares: [],
  activo: null,
});

/** Un error resta vida, reinicia la racha y guarda `explicacion` para el repaso de la derrota. */
export const resolverReto = (p: Partida, acierto: boolean, explicacion = ''): Partida => {
  const pts = acierto ? PUNTOS_POR_ACIERTO : 0;
  const racha = acierto ? p.racha + 1 : 0;
  return {
    ...p,
    vidas: acierto ? p.vidas : p.vidas - 1,
    racha,
    rachaMax: Math.max(p.rachaMax, racha),
    fallos: acierto ? p.fallos : [...p.fallos, explicacion],
    puntos: p.puntos + pts,
    puntosEscenario: p.puntosEscenario.map((v, i) => (i === p.escenario ? v + pts : v)),
    progreso: [...p.progreso, acierto ? 1 : 2],
  };
};

export const completarEscenario = (p: Partida): Partida => ({
  ...p,
  completados: p.completados.map((c, i) => c || i === p.escenario),
});

/** Habilitado: no completado y con el anterior completado. */
export const escenarioHabilitado = (p: Partida, i: number): boolean =>
  !p.completados[i] && (i === 0 || p.completados[i - 1] === true);

/** En la cancha, Pau guía los retos pares (2 y 4); el resto lo guía el personaje del escenario. */
export const guiaDelReto = (escenario: number, reto: number): ClavePersonaje =>
  escenario === 2 && reto % 2 === 1 ? 'pau' : escenarios[escenario]!.guia;

/** Numera el paso `i`; si ya tenía número, lo quita junto con los posteriores. */
export const elegirPaso = (p: Partida, i: number): Partida => {
  const k = p.seleccion.indexOf(i);
  return { ...p, seleccion: k < 0 ? [...p.seleccion, i] : p.seleccion.slice(0, k) };
};

export const activarConcepto = (p: Partida, c: number): Partida => ({ ...p, activo: c });

/** Empareja la definición `d` con el concepto activo, liberándola de su par anterior. Sin activo no cambia nada. */
export const asignarDefinicion = (p: Partida, d: number): Partida => {
  const c = p.activo;
  if (c === null) return p;
  const pares = Array.from({ length: Math.max(p.pares.length, c + 1) }, (_, i) =>
    i === c ? d : p.pares[i] === d ? undefined : p.pares[i],
  );
  return { ...p, pares, activo: null };
};

/** El paso correcto en la posición k es el índice k. Se asume la selección completa. */
export const ordenCorrecto = (seleccion: number[]): boolean => seleccion.every((x, k) => x === k);

/** El par correcto del concepto c es la definición c. Se asumen todos emparejados. */
export const paresCorrectos = (pares: (number | undefined)[]): boolean => pares.every((d, c) => d === c);
