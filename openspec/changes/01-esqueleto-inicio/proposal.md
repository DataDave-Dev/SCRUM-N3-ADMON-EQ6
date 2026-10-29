# Proposal

## Why

El prototipo de Sprint 1 vive en un HTML único con imágenes embebidas, imposible de mantener entre seis personas. Necesitamos la base en Astro desplegada desde el día uno para que cada rebanada siguiente sea jugable en producción.

## What Changes

- Proyecto Astro con layout base, tokens CSS y fuentes del prototipo.
- Extracción de las 22 imágenes embebidas a `public/img/`.
- Datos del juego (personajes, escenarios, retos, diálogos) tipados en `src/data/`.
- Pantalla de inicio: imagen grupal, título, descripción, botones "Jugar" y "Cómo se juega", mejor puntaje.
- Pantalla "Cómo se juega" con las tres reglas en globos de personaje.
- Ruta `/jugar/` con un marcador de posición hasta que exista el mapa.
- Despliegue automático a GitHub Pages en cada push a `main`.

**Fuera de alcance:** mapa, retos, marcador, sonido, confeti y persistencia del récord (la portada muestra 0 si no hay récord guardado).

## Capabilities

### New Capabilities
- `pantalla-inicio`: portada del juego e instrucciones; punto de entrada a una nueva partida.

### Modified Capabilities
(ninguna)

## Impact

- Nuevo: `src/layouts/`, `src/styles/`, `src/data/`, `src/components/`, `src/pages/como-se-juega.astro`, `src/pages/jugar.astro`, `public/img/`, `scripts/`, `.github/workflows/deploy.yml`.
- Modificado: `astro.config.mjs` (`site` y `base` para GitHub Pages), `README.md`, `package.json` (devDependencies para `astro check`).
- Configuración del repo: GitHub Pages con origen "GitHub Actions".
