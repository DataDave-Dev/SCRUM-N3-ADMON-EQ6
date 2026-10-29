# Proposal

## Why

Sin consecuencias por fallar, el juego no exige atención: la persona puede adivinar sin costo. Vidas, tiempo por reto y racha convierten el recorrido en un reto real y habilitan la derrota con repaso de errores, que es donde más se aprende.

## What Changes

- Tres vidas por partida; cada error o tiempo agotado resta una.
- Temporizador visible por reto: 25 s en opción múltiple, 45 s en ordenar y relacionar.
- Racha de aciertos consecutivos visible en el marcador y mencionada en la retroalimentación.
- Pantalla de derrota al quedar sin vidas, con las últimas tres explicaciones falladas y opción de reintentar.

**Fuera de alcance:** pausar el temporizador cuando la pestaña pierde el foco (el prototipo no lo hace; se evaluará después), insignias por racha (05), sonido de error y sacudida (06).

## Capabilities

### New Capabilities
- `vidas-y-racha`: vidas limitadas y racha de aciertos como presión y recompensa.
- `temporizador-reto`: límite de tiempo por reto con barra decreciente.
- `fin-de-partida`: derrota al agotar las vidas con repaso de errores.

### Modified Capabilities
(ninguna)

## Impact

- Modificado: `src/game/estado.ts` (vidas, racha, racha máxima, fallos), `src/game/pantallas/marcador.ts` (corazones y racha), `src/game/pantallas/reto.ts` (barra de tiempo), `src/game/pantallas/retro.ts` (mensajes de tiempo agotado y racha), `src/game/flujo.ts` (transición a derrota).
- Nuevo: `src/game/temporizador.ts`, `src/game/pantallas/derrota.ts`, pruebas correspondientes.
