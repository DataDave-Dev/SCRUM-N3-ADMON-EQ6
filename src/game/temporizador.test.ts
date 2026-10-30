import { afterEach, beforeEach, expect, test, vi } from 'vitest';
import { detener, iniciar } from '@/game/temporizador';

beforeEach(() => vi.useFakeTimers());
afterEach(() => {
  detener();
  vi.useRealTimers();
});

test('onFin dispara una sola vez al agotarse y onTick llega a la mitad a medio tiempo', () => {
  const onTick = vi.fn();
  const onFin = vi.fn();
  iniciar(25, onTick, onFin);
  vi.advanceTimersByTime(12_500);
  expect(onTick).toHaveBeenLastCalledWith(0.5);
  vi.advanceTimersByTime(30_000);
  expect(onFin).toHaveBeenCalledTimes(1);
});

test('detener cancela el temporizador', () => {
  const onFin = vi.fn();
  iniciar(1, () => {}, onFin);
  detener();
  vi.advanceTimersByTime(5_000);
  expect(onFin).not.toHaveBeenCalled();
});

test('iniciar otro cancela el anterior', () => {
  const primero = vi.fn();
  const segundo = vi.fn();
  iniciar(1, () => {}, primero);
  iniciar(2, () => {}, segundo);
  vi.advanceTimersByTime(5_000);
  expect(primero).not.toHaveBeenCalled();
  expect(segundo).toHaveBeenCalledTimes(1);
});
