# Proposal

## Why

El juego ya es completo pero seco: sin sonidos, sin confeti ni sacudida, la respuesta emocional que tenía el prototipo se pierde. Esta rebanada recupera esa capa y la hace respetuosa con quien prefiere menos movimiento o usa teclado.

## What Changes

- Sonidos cortos generados en el navegador para acierto, error y victoria, con botón de silencio.
- Confeti al cerrar un escenario con buen puntaje y al completar el juego.
- Sacudida de pantalla al fallar. Las estrellas escalonadas ya llegaron en r05; aquí solo se fijan en spec.
- Respeto de `prefers-reduced-motion` y foco visible en todos los controles. Escritura, estrellas y foco amarillo ya lo cumplen; falta el confeti, que no es CSS.

**Fuera de alcance:** música de fondo, archivos de audio, ajustes de volumen, recordar el silencio entre visitas (el prototipo no lo hace).

## Capabilities

### New Capabilities
- `sonido`: retroalimentación sonora breve y silenciable.
- `efectos-visuales`: confeti, sacudida y animación de estrellas.
- `accesibilidad`: movimiento reducido y navegación por teclado.

### Modified Capabilities
(ninguna)

## Impact

- Nuevo: `src/game/sonido.ts`, `src/game/confeti.ts`, botón de silencio en `src/pages/jugar.astro`.
- Modificado: `src/game/flujo.ts` (disparo de sonidos y efectos en acierto, error, resultado y final), `global.css` (sacudida, canvas y botón de silencio).
