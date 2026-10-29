# Spec Delta

## Purpose

Garantías mínimas para jugar con teclado y para quien configura su sistema con movimiento reducido.

## ADDED Requirements

### Requirement: Movimiento reducido
Cuando el sistema indique `prefers-reduced-motion: reduce`, el juego no SHALL lanzar confeti ni sacudir la pantalla, las estrellas SHALL aparecer de inmediato y el texto de la intro SHALL mostrarse completo sin efecto de escritura.

#### Scenario: Error con movimiento reducido
- **WHEN** la preferencia de movimiento reducido está activa y la persona falla un reto
- **THEN** la retroalimentación aparece sin sacudida

#### Scenario: Intro con movimiento reducido
- **WHEN** la preferencia de movimiento reducido está activa y comienza una intro
- **THEN** el texto completo aparece de inmediato

### Requirement: Navegación por teclado
Todos los controles del juego SHALL ser botones o enlaces alcanzables con Tab, activables con Enter o Espacio, y SHALL mostrar un contorno de foco visible de color amarillo.

#### Scenario: Responder con teclado
- **WHEN** la persona navega con Tab hasta una opción y pulsa Enter
- **THEN** la opción se registra como respuesta igual que con un clic

#### Scenario: Foco visible
- **WHEN** un botón recibe foco por teclado
- **THEN** muestra un contorno amarillo de al menos 3 px
