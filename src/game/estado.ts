import { escenarios } from '../data/escenarios';
import type { ClavePersonaje } from '../data/tipos';

export const PUNTOS_POR_ACIERTO = 10;
export const RETOS_POR_PARTIDA = 12;

export type Pantalla = 'mapa' | 'intro' | 'reto' | 'retro' | 'resultado' | 'fin';

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
});

export const resolverReto = (p: Partida, acierto: boolean): Partida => {
  const pts = acierto ? PUNTOS_POR_ACIERTO : 0;
  return {
    ...p,
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
