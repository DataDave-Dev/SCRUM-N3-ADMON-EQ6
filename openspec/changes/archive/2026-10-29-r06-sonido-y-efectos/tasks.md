# Tasks

## 1. Sonido

- [x] 1.1 Implementar `src/game/sonido.ts` con `acierto()`, `error()`, `victoria()` y `silenciar(bool)` sobre WebAudio creado en la primera interacción, y verificar en el navegador que no hay advertencias de autoplay y que cada evento suena distinto
- [x] 1.2 Añadir el botón fijo "Sonido: sí/no" en `jugar.astro` y conectar los disparos en `flujo.ts`, y verificar los escenarios de `sonido`

## 2. Efectos visuales

- [x] 2.1 Implementar `src/game/confeti.ts` sobre un canvas fijo con `pointer-events: none` y dispararlo en resultado con 30 pts o más y en la final, y verificar los escenarios de confeti
- [x] 2.2 Añadir la clase de sacudida (0,4 s) al contenido en la retroalimentación de error, y verificar la duración menor a 0,5 s y que las estrellas escalonadas de r05 siguen apareciendo en orden

## 3. Accesibilidad

- [x] 3.1 Hacer que el confeti consulte `prefers-reduced-motion` (sacudida y estrellas ya las anula la regla global de `global.css` y la escritura ya la omite `escribir()`), y verificar con la emulación del navegador los escenarios de movimiento reducido
- [x] 3.2 Comprobar que el botón de silencio también es alcanzable con Tab y muestra el foco amarillo (el resto de controles ya son `<button>`/`<a>` con `:focus-visible` de 3 px), y verificar jugando un escenario completo solo con teclado

## 4. Integración

- [x] 4.1 Jugar una partida completa con sonido activado y otra silenciada y con movimiento reducido, y verificar que `pnpm test`, `pnpm astro check` y `pnpm build` pasan y el sitio publicado funciona
