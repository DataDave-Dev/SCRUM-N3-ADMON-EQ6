# Tasks

## 1. Sonido

- [ ] 1.1 Implementar `src/game/sonido.ts` con `acierto()`, `error()`, `victoria()` y `silenciar(bool)` sobre WebAudio creado en la primera interacción, y verificar en el navegador que no hay advertencias de autoplay y que cada evento suena distinto
- [ ] 1.2 Añadir el botón fijo "Sonido: sí/no" en `jugar.astro` y conectar los disparos en `flujo.ts`, y verificar los escenarios de `sonido`

## 2. Efectos visuales

- [ ] 2.1 Implementar `src/game/confeti.ts` sobre un canvas fijo con `pointer-events: none` y dispararlo en resultado con 30 pts o más y en la final, y verificar los escenarios de confeti
- [ ] 2.2 Añadir la clase de sacudida en la retroalimentación de error y la animación escalonada de estrellas en `global.css`, y verificar la duración menor a 0,5 s y el orden de aparición

## 3. Accesibilidad

- [ ] 3.1 Hacer que confeti, sacudida, estrellas y efecto de escritura consulten `prefers-reduced-motion`, y verificar con la emulación del navegador los escenarios de movimiento reducido
- [ ] 3.2 Revisar que todos los controles sean botones o enlaces con `:focus-visible` amarillo de 3 px, y verificar jugando un escenario completo solo con teclado

## 4. Integración

- [ ] 4.1 Jugar una partida completa con sonido activado y otra silenciada y con movimiento reducido, y verificar que `pnpm test`, `pnpm astro check` y `pnpm build` pasan y el sitio publicado funciona
