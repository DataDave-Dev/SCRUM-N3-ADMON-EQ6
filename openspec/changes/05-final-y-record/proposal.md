# Proposal

## Why

Terminar los tres escenarios hoy devuelve a la portada sin celebrar nada. La pantalla final con estrellas, rango e insignias y el mejor puntaje persistido cierran el ciclo de juego y dan motivo para volver a jugar.

## What Changes

- Pantalla "Juego completado" con estrellas según puntaje, total de 120, rango, insignias, globo de Pau e imagen grupal.
- Insignias: "Sin errores", "Racha de N" y "Velocista".
- Mejor puntaje guardado en el navegador y mostrado en la portada; aviso "Nuevo mejor puntaje" al superarlo.
- Botones "Jugar de nuevo" e "Inicio".

**Fuera de alcance:** tabla de posiciones compartida o cualquier almacenamiento fuera del navegador; sonido de victoria y confeti (06).

## Capabilities

### New Capabilities
- `resultado-final`: cierre de la partida ganada con calificación, rango e insignias.
- `mejor-puntaje`: persistencia local del mejor puntaje entre partidas.

### Modified Capabilities
(ninguna)

## Impact

- Modificado: `src/game/estado.ts` (aciertos rápidos, cálculo de estrellas, rango e insignias), `src/game/flujo.ts` (transición `fin → final`), `src/game/pantallas/resultado.ts` ("Ver resultados" lleva a la final).
- Nuevo: `src/game/pantallas/final.ts`, `src/lib/record.ts` compartido con la portada, pruebas de estrellas, rango e insignias.
