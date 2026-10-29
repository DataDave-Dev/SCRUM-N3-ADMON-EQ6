# Spec Delta

## Purpose

Reto de pregunta con tres opciones, una correcta, para evaluar conceptos de SCRUM.

## ADDED Requirements

### Requirement: Presentación del reto
El reto SHALL mostrar el fondo del escenario con el personaje guía, el texto "<Tema>, reto N de 4", el enunciado y tres opciones pulsables: la correcta y las dos incorrectas, en orden aleatorio.

#### Scenario: Mostrar un reto
- **WHEN** se presenta "¿Qué es Scrum?"
- **THEN** aparecen exactamente tres opciones y una de ellas es "Un marco de trabajo para resolver problemas complejos con colaboración y entregas frecuentes"

#### Scenario: Guía del escenario 3
- **WHEN** se presenta el reto 2 o el reto 4 de "Cancha de la escuela"
- **THEN** el personaje en escena es Pau; en los retos 1 y 3 es Toño

### Requirement: Responder una opción
Al pulsar una opción el reto SHALL quedar resuelto como acierto si era la correcta o como error si no, y SHALL pasar a la retroalimentación. Después de la primera pulsación las opciones SHALL dejar de aceptar respuestas.

#### Scenario: Opción correcta
- **WHEN** la persona pulsa la opción correcta
- **THEN** el reto se registra como acierto y se muestra la retroalimentación de acierto

#### Scenario: Opción incorrecta
- **WHEN** la persona pulsa una opción incorrecta
- **THEN** el reto se registra como error y se muestra la retroalimentación de error

#### Scenario: Doble pulsación
- **WHEN** la persona pulsa dos opciones en rápida sucesión
- **THEN** solo la primera pulsación cuenta
