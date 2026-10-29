# Spec Delta

## Purpose

Animaciones breves que celebran los logros y señalan los errores sin interrumpir el juego.

## ADDED Requirements

### Requirement: Confeti
El juego SHALL lanzar confeti sobre toda la pantalla al mostrar el resultado de un escenario con 30 puntos o más y al mostrar "Juego completado". El confeti SHALL desaparecer solo y no SHALL bloquear pulsaciones.

#### Scenario: Escenario con 30 puntos
- **WHEN** aparece "30 / 40"
- **THEN** cae confeti y el botón "Volver al mapa" sigue pulsable

#### Scenario: Escenario con 20 puntos
- **WHEN** aparece "20 / 40"
- **THEN** no hay confeti

### Requirement: Sacudida al fallar
Al mostrar la retroalimentación de error el contenido SHALL sacudirse brevemente, menos de medio segundo, y volver a su posición.

#### Scenario: Error
- **WHEN** la persona falla un reto
- **THEN** la pantalla se sacude menos de medio segundo, vuelve a su posición y "Continuar" sigue pulsable durante la sacudida

### Requirement: Estrellas escalonadas
En "Juego completado" las estrellas SHALL aparecer una tras otra con un retraso creciente, en lugar de todas a la vez.

#### Scenario: Pantalla final
- **WHEN** aparece "Juego completado"
- **THEN** la segunda estrella aparece después de la primera y la tercera después de la segunda
