## Context

El juego (r01-r05) renderiza cada pantalla con `montar()` sobre `#app` y concentra los efectos fuera de la lógica pura en `despachar()` de `src/game/flujo.ts`; `transicion()` sigue siendo pura salvo `rnd` y `ahora`. El prototipo genera sonidos con WebAudio (`snd`, `sOk`, `sNo`, `sWin`), confeti en un `<canvas id="cf">` fijo y una sacudida con la clase `.shake`. Ya existen: estrellas escalonadas (r05), `escribir()` que omite la animación con movimiento reducido, la regla global que anula animaciones CSS con `prefers-reduced-motion` y `:focus-visible` amarillo de 3 px.

## Goals / Non-Goals

**Goals:**
- Portar sonidos, confeti y sacudida del prototipo sin dependencias nuevas.
- Disparar los efectos desde un único punto, sin ensuciar `transicion()`.

**Non-Goals:**
- Música, archivos de audio, volumen o recordar el silencio entre visitas.
- Cambiar las reglas o los textos de las pantallas.

## Decisions

- **Efectos en `despachar()` según el cambio de pantalla.** Al pasar a `retro` se toca acierto o error según el último valor de `progreso` y, si es error, se aplica la sacudida; al pasar a `resultado` con 30 pts o más en el escenario, confeti; al pasar a `fin`, victoria y confeti. Alternativa descartada: llamarlos dentro de `transicion()`, que perdería su pureza y complicaría las pruebas.
- **`sonido.ts` con un `AudioContext` perezoso.** Se crea en la primera llamada, que siempre ocurre dentro de un clic (o del tiempo agotado, después de un clic), así el navegador no bloquea el audio. Cada sonido envuelve WebAudio en try/catch como el prototipo: sin audio, el juego sigue.
- **Confeti en canvas fijo con `pointer-events: none`.** Mismo algoritmo del prototipo (partículas con gravedad y `requestAnimationFrame` que se detiene solo). Va fuera de `#app` para sobrevivir a `montar()`. La comprobación de movimiento reducido vive en el propio confeti porque la regla CSS global no alcanza a un canvas.
- **Sacudida como clase CSS sobre `#app`.** Se quita al terminar (`animationend`), y la regla global la anula con movimiento reducido.
- **Botón de silencio en `jugar.astro`, fuera de `#app`.** No pasa por la delegación de clics del juego; su estado vive en `sonido.ts` y no se persiste.
- **Funciones de sonido sin pruebas unitarias.** WebAudio no existe en el entorno de Vitest; se verifican en el navegador. Las decisiones puras (qué efecto corresponde a cada cambio de pantalla) se pueden extraer y probar si crecen.

## Risks / Trade-offs

- [Un tono justo al agotarse el tiempo podría bloquearse si el contexto se suspendió] → el contexto ya existe desde el primer clic del reto; se reanuda con `resume()` antes de tocar.
- [La sacudida dura 0,4 s y "Continuar" es pulsable durante ella, como en el prototipo] → 0,4 s es menor que el tiempo de lectura y el botón no se mueve fuera del alcance del clic.
- [Confeti encima de todo] → `pointer-events: none` y `z-index` por debajo del botón de silencio.
