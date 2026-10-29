# Tasks

## 1. Lógica de selección y validación

- [ ] 1.1 Añadir a `src/game/estado.ts` la selección del reto en curso (`seleccion` para ordenar, `pares` y `activo` para relacionar) con funciones puras `elegirPaso`, `activarConcepto`, `asignarDefinicion`, `ordenCorrecto` y `paresCorrectos`, y verificar con pruebas los escenarios de numerar, deshacer desde el medio, reasignar definición y ambas comprobaciones
- [ ] 1.2 Ampliar `retosJugables` para devolver los cuatro retos de cada escenario y verificar con pruebas que cada escenario tiene 4 y la partida 12

## 2. Pantallas

- [ ] 2.1 Añadir a `reto.ts` el render de `ord` con números y resaltado y la acción "Comprobar", y verificar los escenarios de `reto-ordenar` en el navegador
- [ ] 2.2 Añadir a `reto.ts` el render de `rel` en dos columnas con colores por par, y verificar los escenarios de `reto-relacionar` en el navegador
- [ ] 2.3 Conectar en `flujo.ts` las acciones `elegir`, `izq`, `der` y `comprobar` y verificar que "Comprobar" incompleto no altera nada y que el temporizador de 45 s aplica

## 3. Integración

- [ ] 3.1 Jugar los tres escenarios con sus cuatro retos y verificar que el máximo alcanzable es 120 pts, que el marcador llena 12 segmentos y que `pnpm test`, `pnpm astro check` y `pnpm build` pasan
