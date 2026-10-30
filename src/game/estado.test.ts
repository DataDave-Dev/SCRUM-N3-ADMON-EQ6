import { expect, test } from 'vitest';
import {
  activarConcepto,
  asignarDefinicion,
  completarEscenario,
  elegirPaso,
  escenarioHabilitado,
  estrellas,
  guiaDelReto,
  insignias,
  nuevaPartida,
  ordenCorrecto,
  paresCorrectos,
  rango,
  resolverReto,
  type Partida,
} from '@/game/estado';

test('un acierto suma 10 puntos a la partida y al escenario; un error no suma', () => {
  const p = resolverReto(nuevaPartida(), true);
  expect(p.puntos).toBe(10);
  expect(p.puntosEscenario).toEqual([10, 0, 0]);
  expect(resolverReto(p, false).puntos).toBe(10);
});

test('el progreso registra 1 o 2 en orden', () => {
  const p = resolverReto(resolverReto(nuevaPartida(), true), false);
  expect(p.progreso).toEqual([1, 2]);
});

test('las funciones no mutan la partida original', () => {
  const p = nuevaPartida();
  resolverReto(p, true);
  completarEscenario(p);
  expect(p).toEqual(nuevaPartida());
});

test('el escenario N requiere el N-1 completado y uno completado queda deshabilitado', () => {
  const p = nuevaPartida();
  expect([0, 1, 2].map((i) => escenarioHabilitado(p, i))).toEqual([true, false, false]);
  const q = completarEscenario(p);
  expect([0, 1, 2].map((i) => escenarioHabilitado(q, i))).toEqual([false, true, false]);
});

test('Pau guía los retos 2 y 4 del escenario 3; Toño el 1 y el 3', () => {
  expect([0, 1, 2, 3].map((r) => guiaDelReto(2, r))).toEqual(['tono', 'pau', 'tono', 'pau']);
  expect(guiaDelReto(0, 1)).toBe('inge');
});

test('la partida empieza con 3 vidas; un error resta una y un acierto las conserva', () => {
  const p = nuevaPartida();
  expect(p.vidas).toBe(3);
  const q = resolverReto(p, false, 'x');
  expect(q.vidas).toBe(2);
  expect(resolverReto(q, true).vidas).toBe(2);
});

test('la racha cuenta aciertos seguidos, un error la reinicia y rachaMax la recuerda', () => {
  const dos = resolverReto(resolverReto(nuevaPartida(), true), true);
  expect(dos.racha).toBe(2);
  const rota = resolverReto(dos, false, 'x');
  expect(rota.racha).toBe(0);
  expect(rota.rachaMax).toBe(2);
});

test('los fallos guardan la explicación en orden', () => {
  const p = resolverReto(resolverReto(resolverReto(nuevaPartida(), false, 'a'), true), false, 'b');
  expect(p.fallos).toEqual(['a', 'b']);
});

const pulsar = (pasos: number[]) => pasos.reduce(elegirPaso, nuevaPartida()).seleccion;

test('elegirPaso numera en el orden pulsado', () => {
  expect(pulsar([2, 0, 3])).toEqual([2, 0, 3]);
});

test('pulsar un paso numerado lo quita junto con los posteriores', () => {
  expect(pulsar([2, 0, 3, 0])).toEqual([2]);
});

test('ordenCorrecto acepta solo 0, 1, 2, 3', () => {
  expect(ordenCorrecto([0, 1, 2, 3])).toBe(true);
  expect(ordenCorrecto([3, 1, 2, 0])).toBe(false);
});

const emparejar = (p: Partida, c: number, d: number) => asignarDefinicion(activarConcepto(p, c), d);

test('activar un concepto y pulsar una definición forma el par y desactiva el concepto', () => {
  const p = emparejar(nuevaPartida(), 0, 0);
  expect(p.pares).toEqual([0]);
  expect(p.activo).toBeNull();
});

test('reasignar una definición la libera de su par anterior', () => {
  const p = emparejar(emparejar(nuevaPartida(), 0, 0), 1, 0);
  expect(p.pares).toEqual([undefined, 0]);
});

test('una definición sin concepto activo no cambia nada', () => {
  const p = nuevaPartida();
  expect(asignarDefinicion(p, 1)).toBe(p);
});

test('paresCorrectos exige que cada concepto tenga su definición', () => {
  expect(paresCorrectos([0, 1, 2])).toBe(true);
  expect(paresCorrectos([0, 2, 1])).toBe(false);
});

test('estrellas: 3 desde 90, 2 de 60 a 89, 1 por debajo', () => {
  expect([120, 90, 89, 60, 59, 50].map(estrellas)).toEqual([3, 3, 2, 2, 1, 1]);
});

test('rango cambia en 100, 80 y 60', () => {
  expect([120, 100, 99, 80, 79, 60, 59, 40].map(rango)).toEqual([
    'Maestro Scrum',
    'Maestro Scrum',
    'Desarrollador pro',
    'Desarrollador pro',
    'Desarrollador en práctica',
    'Desarrollador en práctica',
    'Aprendiz como Beto',
    'Aprendiz como Beto',
  ]);
});

/** Juega `resultados` en orden: 'r' acierto rápido, 'a' acierto lento, 'e' error. */
const jugar = (resultados: string) =>
  [...resultados].reduce((p, r) => resolverReto(p, r !== 'e', 'x', r === 'r'), nuevaPartida());

test('partida perfecta y rápida gana las tres insignias', () => {
  expect(insignias(jugar('r'.repeat(12)))).toEqual(['Sin errores', 'Racha de 12', 'Velocista']);
});

test('una racha máxima de 5 no da insignia de racha', () => {
  expect(insignias(jugar('aaaaaeaaaaea'))).toEqual([]);
});

test('dos fallos, racha 4 y lentitud: ninguna insignia', () => {
  expect(insignias(jugar('aaaaearrreaa'))).toEqual([]);
});

test('un error no cuenta como rápido aunque se marque así', () => {
  expect(resolverReto(nuevaPartida(), false, 'x', true).rapidos).toBe(0);
});
