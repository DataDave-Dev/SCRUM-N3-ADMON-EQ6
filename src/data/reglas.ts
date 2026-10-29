import type { Linea } from './tipos';

/** Reglas del juego, dichas por los guías; las usan la landing y /como-se-juega. */
export const reglas: Linea[] = [
  {
    personaje: 'inge',
    texto:
      'Recorre tres escenarios de la escuela. Cada uno tiene 4 retos: de opción múltiple, de ordenar y de relacionar.',
  },
  {
    personaje: 'lili',
    texto:
      'Empiezas con 3 vidas. Cada acierto suma 10 puntos y cada error quita una vida. Tienes tiempo limitado por reto.',
  },
  {
    personaje: 'tono',
    texto:
      'Si encadenas aciertos haces racha. Termina los tres escenarios con al menos una vida para ganar.',
  },
];
