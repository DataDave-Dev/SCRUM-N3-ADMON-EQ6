import type { ClavePersonaje, Personaje } from './tipos';

const def = (clave: ClavePersonaje, nombre: string, color: string): Personaje => ({
  clave,
  nombre,
  color,
  sprites: { base: clave, feliz: `${clave}1`, triste: `${clave}2` },
});

export const personajes: Record<ClavePersonaje, Personaje> = {
  beto: def('beto', 'Beto', '#3fa653'),
  riqui: def('riqui', 'Riqui', '#e53935'),
  lili: def('lili', 'Lili', '#8e5fd0'),
  inge: def('inge', 'El Inge Morales', '#2f80d0'),
  tono: def('tono', 'Toño', '#d9a100'),
  pau: def('pau', 'Pau', '#e0508b'),
};
