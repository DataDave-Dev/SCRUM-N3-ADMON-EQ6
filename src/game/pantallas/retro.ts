import { escenarios } from '../../data/escenarios';
import { personajes } from '../../data/personajes';
import { img } from '../../lib/assets';
import { guiaDelReto, type Partida } from '../estado';
import { esc, globo, retosJugables } from '../util';
import { marcador } from './marcador';

export const retro = (p: Partida): string => {
  const e = escenarios[p.escenario]!;
  const r = retosJugables(e)[p.reto]!;
  const guia = guiaDelReto(p.escenario, p.reto);
  const acierto = p.progreso[p.progreso.length - 1] === 1;
  const sprite = personajes[guia].sprites[acierto ? 'feliz' : 'triste'];
  const mensaje = acierto
    ? `¡Correcto! ${p.racha >= 3 ? `Llevas una racha de ${p.racha}. ` : ''}`
    : `${p.tiempoAgotado ? 'Se acabó el tiempo.' : 'Casi.'} La respuesta era “${esc(r.correcta)}”. `;
  return (
    marcador(p) +
    `<div class="scn" style="background-image:url(${img(e.fondo)})"><img class="mini" src="${img(sprite)}" alt=""></div>` +
    globo(guia, mensaje + esc(r.explicacion)) +
    `<button class="go" data-accion="continuar">Continuar</button>`
  );
};
