# reto-ordenar Specification

## Purpose
Reto de secuencia en el que la persona ordena pasos para demostrar que entiende el ciclo de un Sprint.

## Requirements
### Requirement: Presentación del reto de ordenar
El reto SHALL mostrar el enunciado, los cuatro elementos en orden aleatorio como botones y un botón "Comprobar".

#### Scenario: Mostrar el reto
- **WHEN** se presenta "Ordena el ciclo de un Sprint, del primero al último:"
- **THEN** aparecen "Sprint Planning", "Trabajo diario con Daily Scrum", "Sprint Review" y "Retrospectiva" en algún orden y el botón "Comprobar"

### Requirement: Numerar al pulsar
Al pulsar un elemento sin número SHALL recibir el siguiente número de la secuencia y resaltarse. Al pulsar un elemento ya numerado SHALL perder su número junto con todos los numerados después de él.

#### Scenario: Numerar en orden
- **WHEN** la persona pulsa tres elementos distintos
- **THEN** muestran 1, 2 y 3 en el orden pulsado

#### Scenario: Deshacer desde el medio
- **WHEN** hay tres numerados y la persona pulsa el que tiene el 2
- **THEN** solo el primero conserva su número 1

### Requirement: Comprobar el orden
"Comprobar" SHALL ignorarse mientras falte algún elemento por numerar. Con los cuatro numerados SHALL resolver el reto como acierto si la numeración coincide con el orden correcto y como error en caso contrario.

#### Scenario: Incompleto
- **WHEN** solo hay dos elementos numerados y la persona pulsa "Comprobar"
- **THEN** el reto sigue abierto sin cambios

#### Scenario: Orden correcto
- **WHEN** la numeración es Sprint Planning 1, Trabajo diario con Daily Scrum 2, Sprint Review 3, Retrospectiva 4 y la persona pulsa "Comprobar"
- **THEN** el reto se resuelve como acierto

#### Scenario: Orden incorrecto
- **WHEN** Retrospectiva tiene el 1 y la persona pulsa "Comprobar"
- **THEN** el reto se resuelve como error y la retroalimentación muestra la explicación sin "La respuesta era"
