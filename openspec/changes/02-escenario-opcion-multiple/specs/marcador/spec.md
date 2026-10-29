# Spec Delta

## Purpose

Indicador permanente del estado de la partida mientras la persona recorre mapa, intro, retos y retroalimentación.

## ADDED Requirements

### Requirement: Puntos
El marcador SHALL mostrar "N pts" con los puntos acumulados de la partida, actualizados antes de mostrar la retroalimentación de cada reto.

#### Scenario: Partida nueva
- **WHEN** inicia una partida
- **THEN** el marcador muestra "0 pts"

#### Scenario: Tras dos aciertos
- **WHEN** la persona ha acertado dos retos
- **THEN** el marcador muestra "20 pts"

### Requirement: Progreso por reto
El marcador SHALL mostrar una barra de 12 segmentos, uno por reto de la partida, que se llenan en el orden en que se resuelven: verde para acierto, rojo para error y vacío para pendiente.

#### Scenario: Acierto y error
- **WHEN** la persona acierta el primer reto y falla el segundo
- **THEN** el primer segmento es verde, el segundo rojo y los diez restantes están vacíos

### Requirement: Marcador visible
El marcador SHALL verse en el mapa, la intro, los retos, la retroalimentación y el resultado de escenario.

#### Scenario: Recorrido
- **WHEN** la persona pasa del mapa a la intro y a un reto
- **THEN** el marcador permanece visible en la parte superior en las tres pantallas
