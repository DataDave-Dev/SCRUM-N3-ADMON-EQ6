import { expect, test } from 'vitest';
import { nuevaPartida } from '../estado';
import { final } from './final';

test('con 50 puntos: una estrella encendida, "Aprendiz como Beto", sin insignias ni aviso', () => {
  const html = final({ ...nuevaPartida(), pantalla: 'fin', puntos: 50, progreso: [2, 2], rachaMax: 4 });
  expect(html.match(/<span[^>]*>★/g)).toHaveLength(3);
  expect(html.match(/class="off"/g)).toHaveLength(2);
  expect(html).toContain('50 <small>de 120 puntos</small>');
  expect(html).toContain('<b>Aprendiz como Beto</b></p>');
  expect(html).not.toContain('class="ch"');
});

test('con 70 puntos y récord nuevo añade el aviso tras el rango', () => {
  const html = final({ ...nuevaPartida(), pantalla: 'fin', puntos: 70, nuevoRecord: true });
  expect(html).toContain('<b>Desarrollador en práctica</b>. Nuevo mejor puntaje');
});
