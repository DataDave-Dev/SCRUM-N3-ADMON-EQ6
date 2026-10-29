# Design

## Context

La rebanada 01 deja `src/pages/jugar.astro` con `<main id="app">` vacío, datos tipados en `src/data/` y el helper `img()`. El prototipo implementa el bucle de juego con un objeto global mutable `S`, funciones que escriben `innerHTML` y manejadores `onclick` inline. Ver proposal.md para la motivación.

## Goals / Non-Goals

**Goals:**
- Lógica de partida pura, probada y separada del DOM.
- Pantallas como funciones de render pequeñas que reutilizan el estilo del prototipo.
- Un punto único donde se decide qué retos son jugables, para que 04 solo lo amplíe.

**Non-Goals:**
- Routing por URL dentro del juego; `/jugar/` es una sola página.
- Animaciones y sonido (06).

## Decisions

1. **Estado inmutable con funciones puras.** `src/game/estado.ts` define `Partida` y funciones `nuevaPartida()`, `resolverReto(partida, acierto)`, `completarEscenario(partida)`, `escenarioHabilitado(partida, i)`. Cada función devuelve una copia. Alternativa descartada: objeto mutable como el prototipo; impide probar sin DOM y oculta efectos.
2. **Vitest para la lógica pura.** Se añade `vitest` como devDependency y el script `pnpm test`. Se prueban puntos, progreso, desbloqueo y la selección del personaje guía. La UI se verifica en el navegador. Alternativa descartada: `node --test`; requiere compilar TS aparte.
3. **Render por plantillas de texto y delegación de eventos.** Cada pantalla es una función `(partida, datos) => string` en `src/game/pantallas/`. `src/game/render.ts` expone `montar(html)` que escribe en `#app`, hace scroll arriba y un solo `click` delegado en `#app` que lee `data-accion` y `data-arg`. Los textos provienen de datos propios, no de la persona; aun así se escapan con un helper `esc()`. Alternativa descartada: `onclick` inline como el prototipo; dificulta probar y viola una CSP futura.
4. **Flujo en un módulo orquestador.** `src/game/flujo.ts` mantiene la `Partida` actual y mapea acciones a transiciones: `jugar → mapa`, `escenario:i → intro`, `siguiente → intro | reto`, `opcion:i → retro`, `continuar → reto | resultado`, `mapa`, `fin`. Es el único lugar con estado mutable (una variable con la partida vigente).
5. **Retos jugables filtrados en un solo sitio.** `retosJugables(escenario)` devuelve solo los de tipo `mc`. 04 amplía esa función y nada más. La barra de progreso sigue teniendo 12 segmentos aunque esta rebanada solo llene 9.
6. **Efecto de escritura mínimo.** `escribir(el, texto)` con `setInterval` de 16 ms y cancelación al pulsar el texto; se limpia al cambiar de pantalla para no filtrar intervalos.
7. **Orden aleatorio determinable en pruebas.** `barajar(arr, rnd = Math.random)` recibe el generador para que las pruebas pasen uno fijo.

## Risks / Trade-offs

- [Intervalos del efecto de escritura sobreviven al cambio de pantalla] → `montar()` cancela el intervalo activo antes de reemplazar el HTML.
- [Doble pulsación registra dos respuestas] → `flujo` ignora acciones que no correspondan a la pantalla actual.
- [Omitir retos ord/rel deja escenarios de 3 retos en esta rebanada] → aceptado; es temporal y visible en el texto "reto N de 4" solo si se expone el total real. Se muestra el total de retos jugables para no confundir.
