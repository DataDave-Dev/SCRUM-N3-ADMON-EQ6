# Spec Delta

## Purpose

Diálogo de apertura de cada escenario que plantea la situación y presenta al personaje guía antes de los retos.

## ADDED Requirements

### Requirement: Secuencia de líneas
La intro SHALL mostrar las tres líneas del escenario una por una, cada una con el nombre y el color de su personaje y el texto revelado letra por letra. El botón SHALL decir "Siguiente" en las dos primeras líneas y "Empezar el reto" en la última.

#### Scenario: Primera línea
- **WHEN** comienza la intro del escenario 1
- **THEN** se ve el globo de El Inge Morales con su texto apareciendo letra por letra y el botón "Siguiente"

#### Scenario: Última línea
- **WHEN** la persona pulsa "Siguiente" en la segunda línea
- **THEN** se ve la tercera línea y el botón "Empezar el reto"

#### Scenario: Saltar el efecto de escritura
- **WHEN** la persona pulsa el texto mientras se está escribiendo
- **THEN** el texto completo aparece de inmediato

### Requirement: Personajes en escena
La intro SHALL mostrar el fondo del escenario con hasta dos personajes que participan en el diálogo; el que habla SHALL verse con brillo normal y el otro atenuado.

#### Scenario: Cambia quien habla
- **WHEN** la línea pasa de El Inge Morales a Beto
- **THEN** Beto se ve con brillo normal y El Inge Morales atenuado

### Requirement: Empezar el reto
Al pulsar "Empezar el reto" el juego SHALL mostrar el primer reto del escenario.

#### Scenario: Fin de la intro
- **WHEN** la persona pulsa "Empezar el reto"
- **THEN** se muestra "reto 1 de 4" del escenario
