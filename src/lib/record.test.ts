import { afterEach, expect, test, vi } from 'vitest';
import { guardarRecord, leerRecord } from '@/lib/record';

const memoria = () => {
  const m = new Map<string, string>();
  return { getItem: (k: string) => m.get(k) ?? null, setItem: (k: string, v: string) => void m.set(k, v) };
};

afterEach(() => vi.unstubAllGlobals());

test('sin récord guardado lee 0; guardar uno mayor lo persiste', () => {
  vi.stubGlobal('localStorage', memoria());
  expect(leerRecord()).toBe(0);
  expect(guardarRecord(70)).toBe(true);
  expect(leerRecord()).toBe(70);
});

test('un puntaje igual o menor no cambia el récord', () => {
  vi.stubGlobal('localStorage', memoria());
  guardarRecord(90);
  expect(guardarRecord(80)).toBe(false);
  expect(guardarRecord(90)).toBe(false);
  expect(leerRecord()).toBe(90);
});

test('con el almacenamiento bloqueado devuelve 0 y no lanza', () => {
  const roto = () => {
    throw new Error('bloqueado');
  };
  vi.stubGlobal('localStorage', { getItem: roto, setItem: roto });
  expect(leerRecord()).toBe(0);
  expect(() => guardarRecord(70)).not.toThrow();
});
