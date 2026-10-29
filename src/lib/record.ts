const CLAVE = 'sprint-best';

/** Mejor puntaje guardado; 0 si no hay o si el almacenamiento falla. */
export function leerRecord(): number {
  try {
    return Number(localStorage.getItem(CLAVE)) || 0;
  } catch {
    return 0;
  }
}

/** Guarda `puntos` si supera el récord y devuelve si lo superó. Un fallo de almacenamiento se ignora. */
export function guardarRecord(puntos: number): boolean {
  if (puntos <= leerRecord()) return false;
  try {
    localStorage.setItem(CLAVE, String(puntos));
  } catch {
    // ponytail: sin almacenamiento el récord no persiste, pero el aviso de la partida sigue valiendo.
  }
  return true;
}
