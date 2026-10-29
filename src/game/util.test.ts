import { expect, test } from 'vitest';
import { escenarios } from '../data/escenarios';
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

test('retosJugables devuelve 3 retos de opción múltiple por escenario', () => {
  for (const e of escenarios) {
    const r = retosJugables(e);
    expect(r).toHaveLength(3);
    expect(r.every((x) => x.tipo === 'mc')).toBe(true);
  }
});
