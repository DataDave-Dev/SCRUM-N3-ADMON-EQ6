import { escenarios } from '../data/escenarios';
import { ruta } from '../lib/assets';
import { completarEscenario, escenarioHabilitado, nuevaPartida, resolverReto, type Partida } from './estado';
import { derrota } from './pantallas/derrota';
import { intro } from './pantallas/intro';
import { mapa } from './pantallas/mapa';
import { resultado } from './pantallas/resultado';
import { reto, SEGUNDOS_POR_TIPO } from './pantallas/reto';
import { retro } from './pantallas/retro';
import { escuchar, montar } from './render';
import * as temporizador from './temporizador';
import { retosJugables } from './util';

/**
 * Tabla de transiciones. Pura: una acción que no corresponde a la pantalla
 * actual devuelve la misma partida, así una doble pulsación no cuenta.
 */
export function transicion(p: Partida, accion: string, arg?: string): Partida {
  const e = escenarios[p.escenario]!;
  switch (`${p.pantalla}/${accion}`) {
    case 'mapa/escenario': {
      const i = Number(arg);
      return escenarioHabilitado(p, i) ? { ...p, pantalla: 'intro', escenario: i, linea: 0, reto: 0 } : p;
    }
    case 'intro/siguiente':
      return p.linea < e.intro.length - 1 ? { ...p, linea: p.linea + 1 } : { ...p, pantalla: 'reto', reto: 0 };
    case 'reto/opcion':
    case 'reto/tiempo': {
      const r = retosJugables(e)[p.reto]!;
      const acierto = accion === 'opcion' && arg === '0';
      return { ...resolverReto(p, acierto, r.explicacion), pantalla: 'retro', tiempoAgotado: accion === 'tiempo' };
    }
    case 'retro/continuar':
      if (p.vidas === 0) return { ...p, pantalla: 'derrota' };
      return p.reto < retosJugables(e).length - 1
        ? { ...p, pantalla: 'reto', reto: p.reto + 1 }
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

function despachar(accion: string, arg?: string): void {
  const siguiente = transicion(partida, accion, arg);
  if (siguiente === partida) return;
  partida = siguiente;
  pintar();
}

export function iniciar(): void {
  escuchar(despachar);
  pintar();
}
