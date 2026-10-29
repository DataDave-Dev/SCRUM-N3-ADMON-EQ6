# Proposal

## Why

Con la portada publicada, la siguiente rebanada debe hacer el juego jugable de punta a punta: elegir escenario, ver la intro, responder retos de opción múltiple y conocer el resultado del escenario. Es el bucle central del que dependen las demás rebanadas.

## What Changes

- Mapa con los tres escenarios y desbloqueo secuencial.
- Diálogo de intro de tres líneas con efecto de escritura y personajes en escena.
- Reto de opción múltiple con opciones barajadas.
- Retroalimentación tras responder: acierto o error, explicación y botón "Continuar".
- Marcador con puntos y barra de progreso de 12 segmentos.
- Resultado por escenario con "X / 40" y regreso al mapa.
- Estado de partida como módulo puro con pruebas unitarias.

**Fuera de alcance:** vidas, temporizador, racha y derrota (03); retos de ordenar y relacionar (04), que en esta rebanada se omiten y el escenario presenta solo sus retos de opción múltiple; pantalla final y récord (05); sonido y confeti (06). Al terminar el tercer escenario, "Ver resultados" regresa a la portada hasta que exista la pantalla final.

## Capabilities

### New Capabilities
- `mapa-escenarios`: selección de escenario y desbloqueo secuencial.
- `dialogo-intro`: diálogo de apertura de cada escenario.
- `reto-opcion-multiple`: reto de tres opciones con una correcta.
- `retroalimentacion-reto`: respuesta tras cada reto con explicación y avance.
- `marcador`: indicador de puntos y progreso de la partida.
- `resultado-escenario`: cierre de escenario con puntaje parcial.

### Modified Capabilities
(ninguna)

## Impact

- Nuevo: `src/game/` (estado, render, flujo, pantallas), `src/game/*.test.ts`, configuración de Vitest.
- Modificado: `src/pages/jugar.astro` monta el juego en `#app`; `package.json` añade `vitest` como devDependency y script `test`.
- Sin cambios en las páginas estáticas de 01.
