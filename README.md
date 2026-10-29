# Sprint en la escuela

Juego web educativo para aprender SCRUM. Materia SCRUM N3 - Administración, Equipo 6.

Port a Astro del prototipo de Sprint 1 (`prototype/sprint1-prototipo.html`), por rebanadas
verticales descritas en `openspec/changes/`.

**Sitio público:** https://datadave-dev.github.io/SCRUM-N3-ADMON-EQ6/

## Requisitos

- Node >= 22.23.4
- pnpm

## Comandos

```sh
pnpm install
pnpm dev                          # http://localhost:4321/SCRUM-N3-ADMON-EQ6/
pnpm build                        # genera dist/
pnpm preview                      # sirve dist/ con el base de GitHub Pages
pnpm astro check                  # tipos de .astro y .ts
node scripts/extraer-assets.mjs   # vuelve a extraer las imágenes del prototipo a public/img/
```

## Estructura

```
.github/workflows/deploy.yml  despliegue a GitHub Pages en cada push a main
prototype/                    prototipo HTML original (fuente de verdad funcional)
public/img/                   22 imágenes extraídas del prototipo (<clave>.webp|jpg)
scripts/extraer-assets.mjs    extractor de imágenes base64 del prototipo
src/components/               componentes Astro (Globo.astro)
src/data/                     datos tipados: tipos.ts, personajes.ts, escenarios.ts
src/layouts/Base.astro        layout: fuentes, fondo #bg, contenedor main
src/lib/assets.ts             img(clave) y ruta(p) con el base de GitHub Pages
src/pages/                    / (portada), /como-se-juega/, /jugar/
src/styles/global.css         tokens CSS y estilos base del prototipo
openspec/                     contexto, specs y changes (rebanadas 01-06)
```

## Despliegue

Cada push a `main` ejecuta el workflow de GitHub Actions, que construye el sitio con
`withastro/action` y lo publica en GitHub Pages (origen "GitHub Actions"). `astro.config.mjs`
fija `site` y `base` para que los enlaces y las imágenes queden bajo `/SCRUM-N3-ADMON-EQ6/`.
