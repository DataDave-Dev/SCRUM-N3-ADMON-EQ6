import { expect, test } from 'vitest';
import { nuevaPartida, type Partida } from './estado';
import { transicion } from './flujo';

const avanzar = (p: Partida, pasos: [string, string?][]) =>
  pasos.reduce((q, [accion, arg]) => transicion(q, accion, arg), p);

test('una acción fuera de la pantalla actual devuelve la misma partida', () => {
  const p = nuevaPartida();
  for (const accion of ['siguiente', 'opcion', 'continuar', 'mapa', 'fin', 'otra']) {
    expect(transicion(p, accion, '0')).toBe(p);
  }
  const enReto = avanzar(p, [['escenario', '0'], ['siguiente'], ['siguiente'], ['siguiente']]);
  expect(enReto.pantalla).toBe('reto');
  expect(transicion(enReto, 'escenario', '1')).toBe(enReto);
  expect(transicion(enReto, 'continuar')).toBe(enReto);
});

test('un escenario bloqueado o completado no se abre desde el mapa', () => {
  const p = nuevaPartida();
  expect(transicion(p, 'escenario', '1')).toBe(p);
});

test('tras la primera respuesta la pantalla cambia y una segunda opción no cuenta', () => {
  const enReto = avanzar(nuevaPartida(), [['escenario', '0'], ['siguiente'], ['siguiente'], ['siguiente']]);
  const retro = transicion(enReto, 'opcion', '0');
  expect(retro.pantalla).toBe('retro');
  expect(retro.puntos).toBe(10);
  expect(transicion(retro, 'opcion', '1')).toBe(retro);
});

test('con todos los aciertos la partida llega a 90 pts y "fin"', () => {
  let p = nuevaPartida();
  for (let i = 0; i < 3; i++) {
    p = avanzar(p, [['escenario', String(i)], ['siguiente'], ['siguiente'], ['siguiente']]);
    for (let r = 0; r < 3; r++) p = avanzar(p, [['opcion', '0'], ['continuar']]);
    expect(p.pantalla).toBe('resultado');
    expect(p.puntosEscenario[i]).toBe(30);
    p = transicion(p, i < 2 ? 'mapa' : 'fin');
  }
  expect(p.puntos).toBe(90);
  expect(p.progreso).toHaveLength(9);
  expect(p.completados).toEqual([true, true, true]);
  expect(p.pantalla).toBe('fin');
});
