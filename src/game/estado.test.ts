import { expect, test } from 'vitest';
import { completarEscenario, escenarioHabilitado, guiaDelReto, nuevaPartida, resolverReto } from './estado';

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
