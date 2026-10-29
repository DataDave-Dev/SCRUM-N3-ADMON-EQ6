# Proposal

## Why

Tres de los doce retos del prototipo no son de opción múltiple: uno pide ordenar el ciclo del Sprint y dos relacionar roles o eventos con su propósito. Sin ellos los escenarios quedan incompletos y el puntaje máximo no llega a 120.

## What Changes

- Reto de ordenar: cuatro pasos barajados que se numeran al pulsarlos y se comprueban al final.
- Reto de relacionar: tres pares en dos columnas que se emparejan por color y se comprueban al final.
- Los escenarios presentan sus cuatro retos; desaparece el filtro temporal de la rebanada 02.

**Fuera de alcance:** arrastrar y soltar (el prototipo usa pulsaciones y funciona en móvil), nuevos retos o cambios de contenido.

## Capabilities

### New Capabilities
- `reto-ordenar`: reto de secuencia con comprobación explícita.
- `reto-relacionar`: reto de emparejamiento con comprobación explícita.

### Modified Capabilities
(ninguna)

## Impact

- Modificado: `src/game/util.ts` (`retosJugables` devuelve los cuatro retos), `src/game/pantallas/reto.ts` (render de `ord` y `rel`), `src/game/flujo.ts` (acciones `elegir`, `izq`, `der`, `comprobar`), `src/game/estado.ts` (selección parcial del reto en curso).
- Nuevo: pruebas de validación de orden y de pares.
