import { escenarios } from '../data/escenarios';
import { ruta } from '../lib/assets';
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
  type Partida,
} from './estado';
import { derrota } from './pantallas/derrota';
import { intro } from './pantallas/intro';
import { mapa } from './pantallas/mapa';
import { resultado } from './pantallas/resultado';
import { cuerpoReto, reto, SEGUNDOS_POR_TIPO } from './pantallas/reto';
import { retro } from './pantallas/retro';
import { escuchar, montar } from './render';
import * as temporizador from './temporizador';
import { barajar, elementos, retosJugables } from './util';

/** Abre el reto `i` del escenario actual con sus elementos barajados y sin selección. */
const entrarReto = (p: Partida, i: number, rnd: () => number): Partida => {
  const r = retosJugables(escenarios[p.escenario]!)[i]!;
  const orden = barajar(elementos(r).map((_, k) => k), rnd);
  return { ...p, pantalla: 'reto', reto: i, orden, seleccion: [], pares: [], activo: null };
};

/** Resuelve el reto actual y pasa a la retroalimentación. */
const responder = (p: Partida, acierto: boolean, tiempoAgotado = false): Partida => {
  const r = retosJugables(escenarios[p.escenario]!)[p.reto]!;
  return { ...resolverReto(p, acierto, r.explicacion), pantalla: 'retro', tiempoAgotado };
};

/** Con la selección incompleta "Comprobar" devuelve la misma partida. */
const comprobar = (p: Partida): Partida => {
  const r = retosJugables(escenarios[p.escenario]!)[p.reto]!;
  if (r.tipo === 'ord') return p.seleccion.length === r.pasos.length ? responder(p, ordenCorrecto(p.seleccion)) : p;
  if (r.tipo === 'rel') {
    const completos = p.pares.filter((d) => d !== undefined).length === r.pares.length;
    return completos ? responder(p, paresCorrectos(p.pares)) : p;
  }
  return p;
};

/**
 * Tabla de transiciones. Pura salvo `rnd`: una acción que no corresponde a la
 * pantalla actual devuelve la misma partida, así una doble pulsación no cuenta.
 */
export function transicion(p: Partida, accion: string, arg?: string, rnd: () => number = Math.random): Partida {
  const e = escenarios[p.escenario]!;
  switch (`${p.pantalla}/${accion}`) {
    case 'mapa/escenario': {
      const i = Number(arg);
      return escenarioHabilitado(p, i) ? { ...p, pantalla: 'intro', escenario: i, linea: 0, reto: 0 } : p;
    }
    case 'intro/siguiente':
      return p.linea < e.intro.length - 1 ? { ...p, linea: p.linea + 1 } : entrarReto(p, 0, rnd);
    case 'reto/opcion':
      return retosJugables(e)[p.reto]!.tipo === 'mc' ? responder(p, arg === '0') : p;
    case 'reto/tiempo':
      return responder(p, false, true);
    case 'reto/elegir':
      return elegirPaso(p, Number(arg));
    case 'reto/izq':
      return activarConcepto(p, Number(arg));
    case 'reto/der':
      return asignarDefinicion(p, Number(arg));
    case 'reto/comprobar':
      return comprobar(p);
    case 'retro/continuar':
      if (p.vidas === 0) return { ...p, pantalla: 'derrota' };
      return p.reto < retosJugables(e).length - 1
        ? entrarReto(p, p.reto + 1, rnd)
        : { ...completarEscenario(p), pantalla: 'resultado' };
    case 'resultado/mapa':
      return { ...p, pantalla: 'mapa' };
    case 'resultado/fin':
      return { ...p, pantalla: 'fin' };
    case 'derrota/reintentar':
      return nuevaPartida();
    default:
      return p;
  }
}

const PANTALLAS = { mapa, intro, reto, retro, resultado, derrota } as const;

/** Único estado mutable del juego: la partida vigente. */
let partida = nuevaPartida();

function pintar(): void {
  if (partida.pantalla === 'fin') {
    // ponytail: hasta que exista la pantalla final (r05), "Ver resultados" vuelve a la portada.
    location.assign(ruta('/'));
    return;
  }
  const fondo = partida.pantalla === 'mapa' ? 'b0' : escenarios[partida.escenario]!.fondo;
  montar(PANTALLAS[partida.pantalla](partida), fondo);
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

function despachar(accion: string, arg?: string): void {
  const siguiente = transicion(partida, accion, arg);
  if (siguiente === partida) return;
  const mismoReto = partida.pantalla === 'reto' && siguiente.pantalla === 'reto';
  partida = siguiente;
  if (mismoReto) actualizarReto();
  else pintar();
}

export function iniciar(): void {
  escuchar(despachar);
  pintar();
}
