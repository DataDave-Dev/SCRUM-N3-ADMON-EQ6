# Tasks

## 1. Base del proyecto

- [ ] 1.1 Configurar `astro.config.mjs` con `site` y `base` de GitHub Pages y verificar que `pnpm build` genera `dist/` con los enlaces prefijados con `/SCRUM-N3-ADMON-EQ6/`
- [ ] 1.2 Añadir `@astrojs/check` y `typescript` como devDependencies y verificar que `pnpm astro check` corre sin errores
- [ ] 1.3 Crear `src/styles/global.css` con los tokens y estilos base del prototipo y verificar en el navegador que la portada usa Baloo 2 y Nunito y los colores de la paleta
- [ ] 1.4 Crear `src/layouts/Base.astro` (lang es, viewport, fuentes, fondo `#bg`, contenedor `main`) y verificar que la ruta raíz renderiza dentro del layout

## 2. Assets y datos

- [ ] 2.1 Escribir `scripts/extraer-assets.mjs` que extrae las imágenes base64 del prototipo a `public/img/<clave>.<ext>` y verificar que produce 22 archivos (19 webp, 3 jpg) y que correrlo dos veces no cambia nada
- [ ] 2.2 Crear `src/lib/assets.ts` con `img(clave)` basado en `BASE_URL` y verificar con `pnpm preview` que una imagen carga bajo `/SCRUM-N3-ADMON-EQ6/img/`
- [ ] 2.3 Crear `src/data/tipos.ts` con `Personaje`, `Escenario` y `Reto` (unión `mc | ord | rel`) y verificar que `pnpm astro check` pasa
- [ ] 2.4 Transcribir `src/data/personajes.ts` (6 personajes con nombre, color y claves de sprites) y `src/data/escenarios.ts` (3 escenarios, 9 líneas de intro, 12 retos con explicación) y verificar conteos y textos contra el prototipo

## 3. Pantallas

- [ ] 3.1 Crear `src/components/Globo.astro` (nombre, color, texto) y verificar que reproduce el estilo `.cl` del prototipo
- [ ] 3.2 Reescribir `src/pages/index.astro` como portada con imagen grupal, título, descripción, botones y crédito, más el script inline del mejor puntaje, y verificar los cuatro escenarios de "Portada visible" y "Mejor puntaje" en el navegador a 320 px y 720 px
- [ ] 3.3 Crear `src/pages/como-se-juega.astro` con los tres globos y el enlace "Entendido" a la raíz y verificar que los textos coinciden con el prototipo
- [ ] 3.4 Crear `src/pages/jugar.astro` con `<main id="app">` y el texto provisional "Próximamente: mapa de escenarios" y verificar que "Jugar" navega ahí

## 4. Despliegue

- [ ] 4.1 Habilitar GitHub Pages con origen "GitHub Actions" en el repo y verificar con `gh api repos/DataDave-Dev/SCRUM-N3-ADMON-EQ6/pages` que `build_type` es `workflow`
- [ ] 4.2 Crear `.github/workflows/deploy.yml` con `withastro/action` y `actions/deploy-pages` en push a `main` y verificar que el workflow queda verde y el sitio responde en `https://datadave-dev.github.io/SCRUM-N3-ADMON-EQ6/`
- [ ] 4.3 Actualizar `README.md` con comandos, estructura y URL pública y verificar que los comandos documentados corren tal cual

## Workflow follow-up

- Archivar el change una vez revisado por el equipo; `pantalla-inicio` pasa a `openspec/specs/`.
