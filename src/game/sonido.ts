/** Tonos del prototipo generados con WebAudio; sin audio disponible el juego sigue en silencio. */

const VOLUMEN = 0.06;
const SILENCIO = 0.0001;
const NOTAS_VICTORIA = [523, 659, 784, 1047];
const PAUSA_VICTORIA_MS = 110;
const PAUSA_ACIERTO_MS = 90;

let contexto: AudioContext | undefined;
let silenciado = false;

/** Toca `frecuencia` Hz durante `segundos`. El contexto nace en la primera llamada, siempre tras un clic. */
function tono(frecuencia: number, segundos = 0.12, forma: OscillatorType = 'sine'): void {
  if (silenciado) return;
  try {
    contexto ??= new AudioContext();
    void contexto.resume();
    const osc = contexto.createOscillator();
    const ganancia = contexto.createGain();
    osc.type = forma;
    osc.frequency.value = frecuencia;
    ganancia.gain.value = VOLUMEN;
    osc.connect(ganancia).connect(contexto.destination);
    osc.start();
    ganancia.gain.exponentialRampToValueAtTime(SILENCIO, contexto.currentTime + segundos);
    osc.stop(contexto.currentTime + segundos);
  } catch {
    // ponytail: navegador sin WebAudio o bloqueado; el sonido es opcional.
  }
}

export function acierto(): void {
  tono(660);
  setTimeout(() => tono(880), PAUSA_ACIERTO_MS);
}

export const error = (): void => tono(150, 0.3, 'sawtooth');

export function victoria(): void {
  NOTAS_VICTORIA.forEach((f, i) => setTimeout(() => tono(f, 0.2), i * PAUSA_VICTORIA_MS));
}

export function silenciar(valor: boolean): void {
  silenciado = valor;
}

export const estaSilenciado = (): boolean => silenciado;
