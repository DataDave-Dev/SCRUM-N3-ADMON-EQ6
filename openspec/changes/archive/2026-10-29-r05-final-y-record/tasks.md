# Tasks

## 1. Cálculo de calificación

- [x] 1.1 Añadir a `estado.ts` el conteo de aciertos rápidos (menos de 10 s) y las funciones puras `estrellas(p)`, `rango(p)` e `insignias(partida)`, y verificar con pruebas los límites 60, 80, 90 y 100 y los tres escenarios de insignias
- [x] 1.2 Crear `src/lib/record.ts` con `leerRecord()` y `guardarRecord(p)` envueltos en try/catch y usarlo también desde la portada, y verificar con pruebas que devuelven 0 y no lanzan cuando el almacenamiento falla

## 2. Pantalla final

- [x] 2.1 Implementar `src/game/pantallas/final.ts` con estrellas, puntos, rango, insignias, aviso de récord, globo de Pau, imagen grupal y botones, y verificar los escenarios de `resultado-final` en el navegador
- [x] 2.2 Cambiar en `flujo.ts` la acción "Ver resultados" para guardar el récord y mostrar la final, y "Jugar de nuevo" para reiniciar en el mapa, y verificar los escenarios de `mejor-puntaje` recargando la portada

## 3. Integración

- [x] 3.1 Completar una partida con 120 pts y otra con menos de 60 y verificar estrellas, rango, insignias y récord, además de que `pnpm test`, `pnpm astro check` y `pnpm build` pasan y el sitio publicado funciona
