# Tasks

## 1. Estado de partida con pruebas

- [ ] 1.1 Añadir `vitest` como devDependency y el script `test`, y verificar que `pnpm test` corre una prueba trivial
- [ ] 1.2 Implementar `src/game/estado.ts` (`Partida`, `nuevaPartida`, `resolverReto`, `completarEscenario`, `escenarioHabilitado`, `guiaDelReto`) y verificar con pruebas que un acierto suma 10, el progreso registra 1 o 2 en orden, el escenario N requiere N-1 y Pau guía los retos 2 y 4 del escenario 3
- [ ] 1.3 Implementar `src/game/util.ts` (`barajar` con generador inyectable, `esc`) y `retosJugables` filtrando `mc`, y verificar con pruebas que barajar conserva los elementos y que `retosJugables` devuelve 3 retos por escenario

## 2. Infraestructura de pantallas

- [ ] 2.1 Implementar `src/game/render.ts` con `montar(html)`, scroll al inicio, cancelación del efecto de escritura y delegación de `click` por `data-accion`, y verificar en el navegador que una acción de prueba llega al orquestador
- [ ] 2.2 Implementar `src/game/pantallas/marcador.ts` (puntos y 12 segmentos) y añadir sus estilos a `global.css`, y verificar visualmente contra el prototipo

## 3. Mapa

- [ ] 3.1 Implementar `src/game/pantallas/mapa.ts` con los tres escenarios, estados habilitado, bloqueado y completado, y verificar los cuatro escenarios de `mapa-escenarios` en el navegador

## 4. Intro

- [ ] 4.1 Implementar `src/game/pantallas/intro.ts` con escena de dos personajes, globo con efecto de escritura y botón "Siguiente"/"Empezar el reto", y verificar los escenarios de `dialogo-intro` incluyendo saltar el efecto al pulsar el texto

## 5. Reto de opción múltiple y retroalimentación

- [ ] 5.1 Implementar `src/game/pantallas/reto.ts` para tipo `mc` con opciones barajadas y bloqueo tras la primera respuesta, y verificar los tres escenarios de `reto-opcion-multiple`
- [ ] 5.2 Implementar `src/game/pantallas/retro.ts` con sprite feliz o triste, mensaje y botón "Continuar", y verificar los textos de `retroalimentacion-reto` para un acierto y un error

## 6. Resultado de escenario y cierre provisional

- [ ] 6.1 Implementar `src/game/pantallas/resultado.ts` con "X / 40", mensaje del Inge y botón "Volver al mapa" o "Ver resultados", y verificar que "Ver resultados" regresa a la portada
- [ ] 6.2 Implementar `src/game/flujo.ts` con la tabla de transiciones y montar el juego desde `src/pages/jugar.astro`, y verificar que ninguna acción fuera de la pantalla actual altera la partida

## 7. Integración

- [ ] 7.1 Jugar los tres escenarios completos en el navegador a 375 px y 1024 px y verificar que el marcador llega a 90 pts con todos los aciertos y que `pnpm test`, `pnpm astro check` y `pnpm build` pasan
- [ ] 7.2 Publicar en GitHub Pages y verificar que el recorrido completo funciona en la URL pública

## Workflow follow-up

- Archivar el change tras la revisión del equipo.
