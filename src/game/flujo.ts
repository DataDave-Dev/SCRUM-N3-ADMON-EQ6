import { escenarios } from '@/data/escenarios';
import { guardarRecord } from '@/lib/record';
import { lanzar } from '@/game/confeti';
import {
  activarConcepto,
  asignarDefinicion,
  completarEscenario,
  elegirPaso,
  escenarioHabilitado,
  nuevaPartida,
  ordenCorrecto,
  paresCorrectos,
  resolverReto,
  MS_ACIERTO_RAPIDO,
  type Pantalla,
  type Partida,
} from '@/game/estado';
import { derrota } from '@/game/pantallas/derrota';
import { final } from '@/game/pantallas/final';
import { intro } from '@/game/pantallas/intro';
import { mapa } from '@/game/pantallas/mapa';
import { resultado } from '@/game/pantallas/resultado';
import { cuerpoReto, reto, SEGUNDOS_POR_TIPO } from '@/game/pantallas/reto';
import { retro } from '@/game/pantallas/retro';
import { escuchar, montar } from '@/game/render';
import * as sonido from '@/game/sonido';
import * as temporizador from '@/game/temporizador';
import { barajar, elementos, retosJugables } from '@/game/util';

/** Abre el reto `i` del escenario actual con sus elementos barajados y sin selección. */
const entrarReto = (p: Partida, i: number, rnd: () => number, ahora: () => number): Partida => {
  const r = retosJugables(escenarios[p.escenario]!)[i]!;
  const orden = barajar(elementos(r).map((_, k) => k), rnd);
  return { ...p, pantalla: 'reto', reto: i, orden, seleccion: [], pares: [], activo: null, inicioReto: ahora() };
};

/** Resuelve el reto actual y pasa a la retroalimentación. */
const responder = (p: Partida, acierto: boolean, ahora: () => number, tiempoAgotado = false): Partida => {
  const r = retosJugables(escenarios[p.escenario]!)[p.reto]!;
  const rapido = ahora() - p.inicioReto < MS_ACIERTO_RAPIDO;
  return { ...resolverReto(p, acierto, r.explicacion, rapido), pantalla: 'retro', tiempoAgotado };
};

/** Con la selección incompleta "Comprobar" devuelve la misma partida. */
const comprobar = (p: Partida, ahora: () => number): Partida => {
  const r = retosJugables(escenarios[p.escenario]!)[p.reto]!;
  if (r.tipo === 'ord') return p.seleccion.length === r.pasos.length ? responder(p, ordenCorrecto(p.seleccion), ahora) : p;
  if (r.tipo === 'rel') {
    const completos = p.pares.filter((d) => d !== undefined).length === r.pares.length;
    return completos ? responder(p, paresCorrectos(p.pares), ahora) : p;
  }
  return p;
};

/**
 * Tabla de transiciones. Pura salvo `rnd` y `ahora`: una acción que no corresponde a la
 * pantalla actual devuelve la misma partida, así una doble pulsación no cuenta.
 */
export function transicion(
  p: Partida,
  accion: string,
  arg?: string,
  rnd: () => number = Math.random,
  ahora: () => number = Date.now,
): Partida {
  const e = escenarios[p.escenario]!;
  switch (`${p.pantalla}/${accion}`) {
    case 'mapa/escenario': {
      const i = Number(arg);
      return escenarioHabilitado(p, i) ? { ...p, pantalla: 'intro', escenario: i, linea: 0, reto: 0 } : p;
    }
    case 'intro/siguiente':
      return p.linea < e.intro.length - 1 ? { ...p, linea: p.linea + 1 } : entrarReto(p, 0, rnd, ahora);
    case 'reto/opcion':
      return retosJugables(e)[p.reto]!.tipo === 'mc' ? responder(p, arg === '0', ahora) : p;
    case 'reto/tiempo':
      return responder(p, false, ahora, true);
    case 'reto/elegir':
      return elegirPaso(p, Number(arg));
    case 'reto/izq':
      return activarConcepto(p, Number(arg));
    case 'reto/der':
      return asignarDefinicion(p, Number(arg));
    case 'reto/comprobar':
      return comprobar(p, ahora);
    case 'retro/continuar':
      if (p.vidas === 0) return { ...p, pantalla: 'derrota' };
      return p.reto < retosJugables(e).length - 1
        ? entrarReto(p, p.reto + 1, rnd, ahora)
        : { ...completarEscenario(p), pantalla: 'resultado' };
    case 'resultado/mapa':
      return { ...p, pantalla: 'mapa' };
    case 'resultado/fin':
      return { ...p, pantalla: 'fin' };
    case 'derrota/reintentar':
    case 'fin/reiniciar':
      return nuevaPartida();
    default:
      return p;
  }
}

/** Puntos del escenario desde los que su resultado lanza confeti. */
const PUNTOS_CONFETI_ESCENARIO = 30;
const CONFETI_ESCENARIO = 90;
const CONFETI_FINAL = 220;
const MS_SACUDIDA = 450;

const PANTALLAS = { mapa, intro, reto, retro, resultado, derrota, fin: final } as const;

/** Único estado mutable del juego: la partida vigente. */
let partida = nuevaPartida();

function pintar(): void {
  montar(PANTALLAS[partida.pantalla](partida));
  if (partida.pantalla === 'reto') iniciarTiempo();
}

/** La barra se vacía en `SEGUNDOS_POR_TIPO`; `montar()` la detiene al cambiar de pantalla. */
function iniciarTiempo(): void {
  const barra = document.querySelector<HTMLElement>('[data-tiempo]')!;
  const r = retosJugables(escenarios[partida.escenario]!)[partida.reto]!;
  temporizador.iniciar(
    SEGUNDOS_POR_TIPO[r.tipo],
    (restante) => (barra.style.width = `${restante * 100}%`),
    () => despachar('tiempo'),
  );
}

/** Repinta solo el cuerpo del reto: el temporizador sigue y el foco vuelve al botón pulsado. */
function actualizarReto(): void {
  const cuerpo = document.querySelector<HTMLElement>('[data-cuerpo]')!;
  const foco = (document.activeElement as HTMLElement | null)?.dataset;
  cuerpo.innerHTML = cuerpoReto(partida);
  if (foco?.accion && foco.arg) cuerpo.querySelector<HTMLElement>(`[data-accion="${foco.accion}"][data-arg="${foco.arg}"]`)?.focus();
}

/** Sacude #app una vez; la clase se retira tras la animación (0,4 s en CSS) para poder repetirla. */
function sacudir(): void {
  const app = document.getElementById('app')!;
  app.classList.add('sacudir');
  setTimeout(() => app.classList.remove('sacudir'), MS_SACUDIDA);
}

/** Sonidos y efectos al entrar en una pantalla nueva. */
function efectos(antes: Pantalla): void {
  if (partida.pantalla === antes) return;
  if (partida.pantalla === 'retro') {
    if (partida.progreso.at(-1) === 1) sonido.acierto();
    else {
      sonido.error();
      sacudir();
    }
  } else if (partida.pantalla === 'resultado' && partida.puntosEscenario[partida.escenario]! >= PUNTOS_CONFETI_ESCENARIO) {
    lanzar(CONFETI_ESCENARIO);
  } else if (partida.pantalla === 'fin') {
    sonido.victoria();
    lanzar(CONFETI_FINAL);
  }
}

function despachar(accion: string, arg?: string): void {
  const siguiente = transicion(partida, accion, arg);
  if (siguiente === partida) return;
  const antes = partida.pantalla;
  const mismoReto = antes === 'reto' && siguiente.pantalla === 'reto';
  // Efectos fuera de la tabla pura: récord al llegar a la final, sonidos y animaciones.
  partida = siguiente.pantalla === 'fin' ? { ...siguiente, nuevoRecord: guardarRecord(siguiente.puntos) } : siguiente;
  if (mismoReto) actualizarReto();
  else pintar();
  efectos(antes);
}

export function iniciar(): void {
  escuchar(despachar);
  pintar();
}
