import { escenarios } from '../data/escenarios';
import { ruta } from '../lib/assets';
import { completarEscenario, escenarioHabilitado, nuevaPartida, resolverReto, type Partida } from './estado';
import { intro } from './pantallas/intro';
import { mapa } from './pantallas/mapa';
import { resultado } from './pantallas/resultado';
import { reto } from './pantallas/reto';
import { retro } from './pantallas/retro';
import { escuchar, montar } from './render';
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
      return { ...resolverReto(p, arg === '0'), pantalla: 'retro' };
    case 'retro/continuar':
      return p.reto < retosJugables(e).length - 1
        ? { ...p, pantalla: 'reto', reto: p.reto + 1 }
        : { ...completarEscenario(p), pantalla: 'resultado' };
    case 'resultado/mapa':
      return { ...p, pantalla: 'mapa' };
    case 'resultado/fin':
      return { ...p, pantalla: 'fin' };
    default:
      return p;
  }
}

const PANTALLAS = { mapa, intro, reto, retro, resultado } as const;

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
}

export function iniciar(): void {
  escuchar((accion, arg) => {
    const siguiente = transicion(partida, accion, arg);
    if (siguiente === partida) return;
    partida = siguiente;
    pintar();
  });
  pintar();
}
