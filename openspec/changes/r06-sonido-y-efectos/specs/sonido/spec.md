# Spec Delta

## Purpose

Retroalimentación sonora breve, generada en el navegador sin archivos externos, que la persona puede silenciar en cualquier momento.

## ADDED Requirements

### Requirement: Sonidos por evento
El juego SHALL reproducir un sonido breve distinto en cada acierto, en cada error (incluido tiempo agotado) y al mostrar la pantalla de juego completado. No SHALL reproducir sonido alguno antes de la primera interacción de la persona con la página.

#### Scenario: Acierto
- **WHEN** la persona acierta un reto
- **THEN** suena el tono de acierto

#### Scenario: Error por tiempo
- **WHEN** se agota el tiempo de un reto
- **THEN** suena el tono de error

#### Scenario: Victoria
- **WHEN** aparece "Juego completado"
- **THEN** suena la secuencia de victoria

### Requirement: Botón de silencio
Durante la partida SHALL verse un botón fijo con el texto "Sonido: sí" o "Sonido: no" que alterna el silencio de inmediato y se aplica a todos los sonidos posteriores.

#### Scenario: Silenciar
- **WHEN** la persona pulsa "Sonido: sí" y después acierta un reto
- **THEN** el botón dice "Sonido: no" y no suena nada

#### Scenario: Reactivar
- **WHEN** la persona pulsa "Sonido: no"
- **THEN** el botón dice "Sonido: sí" y los sonidos vuelven a reproducirse
