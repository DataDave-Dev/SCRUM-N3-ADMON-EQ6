import { expect, test } from 'vitest';
import { nuevaPartida, type Partida } from '@/game/estado';
import { escenarios } from '@/data/escenarios';
import { transicion } from '@/game/flujo';
import { retosJugables } from '@/game/util';

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

/** Pulsaciones que resuelven bien el reto actual, sea del tipo que sea. */
const resolverBien = (p: Partida): [string, string?][] => {
  const r = retosJugables(escenarios[p.escenario]!)[p.reto]!;
  if (r.tipo === 'mc') return [['opcion', '0']];
  if (r.tipo === 'ord') return [...r.pasos.map((_, i): [string, string] => ['elegir', String(i)]), ['comprobar']];
  return [...r.pares.flatMap((_, i): [string, string][] => [['izq', String(i)], ['der', String(i)]]), ['comprobar']];
};

test('con todos los aciertos la partida llega a 120 pts y "fin"', () => {
  let p = nuevaPartida();
  for (let i = 0; i < 3; i++) {
    p = avanzar(p, [['escenario', String(i)], ['siguiente'], ['siguiente'], ['siguiente']]);
    for (let r = 0; r < 4; r++) p = avanzar(p, [...resolverBien(p), ['continuar']]);
    expect(p.pantalla).toBe('resultado');
    expect(p.puntosEscenario[i]).toBe(40);
    p = transicion(p, i < 2 ? 'mapa' : 'fin');
  }
  expect(p.puntos).toBe(120);
  expect(p.progreso).toHaveLength(12);
  expect(p.completados).toEqual([true, true, true]);
  expect(p.pantalla).toBe('fin');
});

/** Escenario 1 hasta su reto 4 (ordenar), acertando los tres primeros. */
const alRetoOrdenar = () => {
  let p = avanzar(nuevaPartida(), [['escenario', '0'], ['siguiente'], ['siguiente'], ['siguiente']]);
  for (let r = 0; r < 3; r++) p = avanzar(p, [['opcion', '0'], ['continuar']]);
  return p;
};

test('al entrar a un reto los elementos se barajan y la selección empieza vacía', () => {
  const p = alRetoOrdenar();
  expect([...p.orden].sort()).toEqual([0, 1, 2, 3]);
  expect(p.seleccion).toEqual([]);
});

test('"Comprobar" con el orden incompleto devuelve la misma partida; "opcion" no aplica a ordenar', () => {
  const p = avanzar(alRetoOrdenar(), [['elegir', '0'], ['elegir', '1']]);
  expect(transicion(p, 'comprobar')).toBe(p);
  expect(transicion(p, 'opcion', '0')).toBe(p);
});

test('un orden incorrecto se resuelve como error', () => {
  const p = avanzar(alRetoOrdenar(), [['elegir', '3'], ['elegir', '1'], ['elegir', '2'], ['elegir', '0'], ['comprobar']]);
  expect(p.pantalla).toBe('retro');
  expect(p.progreso.at(-1)).toBe(2);
});

test('relacionar: dos pares no comprueban y un par cruzado es error', () => {
  let p = transicion(transicion(alRetoOrdenar(), 'tiempo'), 'continuar');
  p = transicion(p, 'mapa');
  p = avanzar(p, [['escenario', '1'], ['siguiente'], ['siguiente'], ['siguiente']]);
  for (let r = 0; r < 3; r++) p = avanzar(p, [['opcion', '0'], ['continuar']]);
  const dos = avanzar(p, [['izq', '0'], ['der', '0'], ['izq', '1'], ['der', '2']]);
  expect(transicion(dos, 'comprobar')).toBe(dos);
  const fin = avanzar(dos, [['izq', '2'], ['der', '1'], ['comprobar']]);
  expect(fin.pantalla).toBe('retro');
  expect(fin.progreso.at(-1)).toBe(2);
});

const alPrimerReto = (p: Partida) => avanzar(p, [['escenario', '0'], ['siguiente'], ['siguiente'], ['siguiente']]);

test('el tiempo agotado cuenta como error y una opción posterior no lo resuelve otra vez', () => {
  const retro = transicion(alPrimerReto(nuevaPartida()), 'tiempo');
  expect(retro.pantalla).toBe('retro');
  expect(retro.tiempoAgotado).toBe(true);
  expect(retro.vidas).toBe(2);
  expect(transicion(retro, 'tiempo')).toBe(retro);
  expect(transicion(retro, 'opcion', '0')).toBe(retro);
});

test('responder antes del límite no marca tiempo agotado y el tiempo ya no cuenta', () => {
  const retro = transicion(alPrimerReto(nuevaPartida()), 'opcion', '1');
  expect(retro.tiempoAgotado).toBe(false);
  expect(transicion(retro, 'tiempo')).toBe(retro);
});

test('con tres fallos "continuar" lleva a la derrota con tres explicaciones; "reintentar" vuelve al mapa', () => {
  let p = alPrimerReto(nuevaPartida());
  p = avanzar(p, [['opcion', '1'], ['continuar'], ['opcion', '1'], ['continuar'], ['opcion', '1']]);
  expect(p.vidas).toBe(0);
  p = transicion(p, 'continuar');
  expect(p.pantalla).toBe('derrota');
  expect(p.fallos).toHaveLength(3);
  expect(transicion(p, 'reintentar')).toEqual(nuevaPartida());
});

test('"reiniciar" desde la final vuelve al mapa con una partida nueva', () => {
  const fin = { ...nuevaPartida(), pantalla: 'fin' as const, puntos: 120 };
  expect(transicion(fin, 'reiniciar')).toEqual(nuevaPartida());
});

test('un acierto en menos de 10 s cuenta como rápido; a los 10 s ya no', () => {
  let t = 0;
  const reloj = () => t;
  const enReto = ['escenario', 'siguiente', 'siguiente', 'siguiente'].reduce(
    (p, a) => transicion(p, a, '0', Math.random, reloj),
    nuevaPartida(),
  );
  t = 9_999;
  expect(transicion(enReto, 'opcion', '0', Math.random, reloj).rapidos).toBe(1);
  t = 10_000;
  expect(transicion(enReto, 'opcion', '0', Math.random, reloj).rapidos).toBe(0);
});
