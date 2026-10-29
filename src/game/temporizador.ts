const TICK_MS = 100;

/** Único temporizador activo; iniciar uno nuevo cancela el anterior. */
let id: ReturnType<typeof setInterval> | undefined;

/** Cuenta `segundos`; `onTick` recibe la fracción restante (1 → 0) y `onFin` dispara una sola vez. */
export function iniciar(segundos: number, onTick: (restante: number) => void, onFin: () => void): void {
  detener();
  const t0 = Date.now();
  id = setInterval(() => {
    const restante = Math.max(0, 1 - (Date.now() - t0) / (segundos * 1000));
    onTick(restante);
    if (restante === 0) {
      detener();
      onFin();
    }
  }, TICK_MS);
}

export function detener(): void {
  clearInterval(id);
  id = undefined;
}
