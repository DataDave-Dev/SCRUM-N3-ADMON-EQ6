# Design

## Context

Existe el scaffold de Astro 7 (template minimal, pnpm, TypeScript strict) y el prototipo en `prototype/sprint1-prototipo.html`: un solo archivo con estilos, 22 imágenes base64 (19 webp, 3 jpg) y JS vanilla que renderiza todo dentro de `<main id="app">` con `innerHTML` y `onclick` inline. Ver proposal.md para la motivación.

## Goals / Non-Goals

**Goals:**
- Base reutilizable por las rebanadas 02 a 06: layout, tokens, assets, datos tipados y despliegue.
- Pantallas estáticas sin JavaScript salvo la lectura del mejor puntaje.

**Non-Goals:**
- Estado de partida, pantallas dinámicas y pruebas de lógica (llegan en 02).
- Optimización de imágenes más allá de extraerlas tal cual.

## Decisions

1. **Rutas estáticas en lugar de SPA para las pantallas de entrada.** `/` (portada), `/como-se-juega/` y `/jugar/` son páginas Astro. Navegar entre ellas son enlaces normales. Alternativa descartada: una sola página que intercambia vistas con JS, como el prototipo; obliga a JS para pantallas que son puro HTML.
2. **Sin framework UI.** Astro renderiza el HTML estático; la lógica de juego (desde 02) vive en módulos TS vanilla bajo `src/game/`. Alternativa descartada: React o Svelte; el juego cabe en unos pocos módulos y evitar la dependencia reduce peso y tiempo de arranque.
3. **Imágenes en `public/img/` referenciadas por clave.** Un script `scripts/extraer-assets.mjs` lee el prototipo y escribe `public/img/<clave>.<ext>`. Un helper `img(clave)` en `src/lib/assets.ts` antepone `import.meta.env.BASE_URL`. Alternativa descartada: `src/assets` con `<Image>`; las claves se resuelven dinámicamente desde datos y no aportan optimización relevante para 22 sprites pequeños.
4. **Datos tipados en `src/data/`.** `tipos.ts` define `Personaje`, `Escenario` y `Reto` como unión discriminada por `tipo` (`"mc" | "ord" | "rel"`). `personajes.ts` y `escenarios.ts` transcriben literalmente el prototipo. Validación con `astro check`, lo que añade `@astrojs/check` y `typescript` como devDependencies.
5. **Tokens CSS globales.** `src/styles/global.css` copia las variables y estilos base del prototipo (`.go`, `.ghost`, `.cl`, `h1` con sombra). Se importa desde el layout.
6. **Despliegue con `withastro/action`.** Workflow oficial en push a `main` y `workflow_dispatch`. El repo es público porque GitHub Pages en repos privados requiere plan de pago (decisión del equipo, 2026-10-29). `astro.config.mjs` fija `site: "https://datadave-dev.github.io"` y `base: "/SCRUM-N3-ADMON-EQ6"`.
7. **Mejor puntaje en portada con script inline.** Un `<script>` de pocas líneas lee `localStorage["sprint-best"]` dentro de `try/catch` y actualiza el texto. Es la única pieza de JS de esta rebanada.

## Risks / Trade-offs

- [El `base` de GitHub Pages rompe rutas absolutas a imágenes y enlaces] → todo enlace y asset pasa por `import.meta.env.BASE_URL`; se verifica con `pnpm preview` antes de publicar.
- [Google Fonts es dependencia externa] → la pila de fuentes declara respaldo `Nunito, Helvetica, Arial, sans-serif`; el juego es legible sin red.
- [Transcribir 12 retos a mano introduce erratas] → la transcripción se hace copiando del prototipo y se revisa contra él; en 02 las pruebas de estado usan estos datos.
