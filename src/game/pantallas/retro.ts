import { escenarios } from '@/data/escenarios';
import { personajes } from '@/data/personajes';
import { img, px } from '@/lib/assets';
import { guiaDelReto, PUNTOS_POR_ACIERTO, type Partida } from '@/game/estado';
import { esc, globo, retosJugables } from '@/game/util';
import { marcador } from '@/game/pantallas/marcador';

export const retro = (p: Partida): string => {
  const e = escenarios[p.escenario]!;
  const r = retosJugables(e)[p.reto]!;
  const guia = guiaDelReto(p.escenario, p.reto);
  const acierto = p.progreso[p.progreso.length - 1] === 1;
  const sprite = personajes[guia].sprites[acierto ? 'feliz' : 'triste'];
  const mensaje = acierto
    ? `¡Correcto! ${p.racha >= 3 ? `Llevas una racha de ${p.racha}. ` : ''}`
    : `${p.tiempoAgotado ? 'Se acabó el tiempo.' : 'Casi.'} ${r.tipo === 'mc' ? `La respuesta era “${esc(r.correcta)}”. ` : ''}`;
  // El banner repite el inicio del globo: es decorativo.
  const banner = acierto ? `¡Correcto! <span class="blink">+${PUNTOS_POR_ACIERTO}</span>` : p.tiempoAgotado ? '¡Tiempo!' : '¡Casi!';
  return (
    marcador(p) +
    `<p class="pixel banner ${acierto ? 'ok' : 'mal'}" aria-hidden="true">${banner}</p>` +
    `<div class="scn pxb ${acierto ? 'ok' : 'mal'}"><img class="px fondo" src="${px(e.fondo)}" alt=""><img class="mini" src="${img(sprite)}" alt=""></div>` +
    globo(guia, mensaje + esc(r.explicacion)) +
    `<button class="start" data-accion="continuar">Continuar</button>`
  );
};
