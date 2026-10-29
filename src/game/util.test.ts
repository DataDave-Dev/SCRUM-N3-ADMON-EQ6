import { expect, test } from 'vitest';
import { escenarios } from '../data/escenarios';
import { RETOS_POR_PARTIDA } from './estado';
import { barajar, esc, retosJugables } from './util';

test('barajar conserva los elementos y no muta el original', () => {
  const orig = [1, 2, 3, 4, 5];
  const out = barajar(orig, () => 0.5);
  expect([...out].sort()).toEqual(orig);
  expect(orig).toEqual([1, 2, 3, 4, 5]);
});

test('barajar es determinista con un generador fijo y cambia el orden', () => {
  expect(barajar(['a', 'b', 'c'], () => 0)).toEqual(['b', 'c', 'a']);
});

test('esc escapa HTML', () => {
  expect(esc(`<b a="1">&'`)).toBe('&lt;b a=&quot;1&quot;&gt;&amp;&#39;');
});

test('retosJugables devuelve los 4 retos de cada escenario y 12 en la partida', () => {
  for (const e of escenarios) expect(retosJugables(e)).toHaveLength(4);
  expect(escenarios.flatMap(retosJugables)).toHaveLength(RETOS_POR_PARTIDA);
});
