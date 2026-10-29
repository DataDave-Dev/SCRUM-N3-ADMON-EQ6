# Tasks

## 1. Estado: vidas, racha y fallos

- [x] 1.1 Ampliar `Partida` con `vidas`, `racha`, `rachaMax` y `fallos` y hacer que `resolverReto` reste vida y reinicie racha en error, y verificar con pruebas los escenarios de `vidas-y-racha` (3 vidas, error resta, acierto conserva, racha x2, racha interrumpida)
- [x] 1.2 Actualizar `marcador.ts` con corazones llenos y vacíos y el texto "Racha xN"/"Sin racha", y verificar visualmente contra el prototipo

## 2. Temporizador

- [x] 2.1 Implementar `src/game/temporizador.ts` (`iniciar(segundos, onTick, onFin)`, `detener()`) con una sola instancia activa, y verificar con pruebas usando temporizadores falsos que `onFin` dispara una vez y que `detener` lo cancela
- [x] 2.2 Añadir la barra de tiempo a `reto.ts` con 25 s para `mc` y 45 s para `ord` y `rel`, detenerla al responder y en `montar()`, y verificar en el navegador los escenarios de `temporizador-reto`
- [x] 2.3 Añadir el mensaje "Se acabó el tiempo." a `retro.ts` y el texto de racha a partir de 3, y verificar ambos textos en el navegador

## 3. Derrota

- [x] 3.1 Implementar `src/game/pantallas/derrota.ts` con el sprite triste del Inge, el globo de Toño y las últimas tres explicaciones falladas, y verificar con tres fallos en el navegador
- [x] 3.2 Añadir en `flujo.ts` la transición `continuar → derrota` cuando las vidas son 0 y las acciones "Reintentar" e "Inicio", y verificar los escenarios de `fin-de-partida`

## 4. Integración

- [ ] 4.1 Jugar una partida perdiendo y otra ganando el escenario 1 y verificar que `pnpm test`, `pnpm astro check` y `pnpm build` pasan y que el sitio publicado refleja los cambios
