# mapa-escenarios Specification

## Purpose
Mapa de la escuela donde la persona elige el siguiente escenario y ve cuáles ha completado.

## Requirements
### Requirement: Mapa al iniciar la partida
Al iniciar una partida el juego SHALL mostrar el mapa con los tres escenarios numerados, cada uno con su nombre, su tema y su imagen de fondo, precedidos por el globo de El Inge Morales "Elige tu siguiente reto."

#### Scenario: Partida nueva
- **WHEN** la persona pulsa "Jugar" en la portada
- **THEN** ve el mapa con "1. Exterior de la escuela", "2. Salón de clases" y "3. Cancha de la escuela" y sus temas

### Requirement: Desbloqueo secuencial
El escenario N SHALL estar habilitado solo cuando el escenario N-1 esté completado. Un escenario bloqueado SHALL mostrar "completa el escenario anterior" y SHALL ignorar las pulsaciones.

#### Scenario: Inicio de partida
- **WHEN** no se ha completado ningún escenario
- **THEN** solo el escenario 1 está habilitado y los escenarios 2 y 3 aparecen bloqueados

#### Scenario: Primer escenario completado
- **WHEN** el escenario 1 está completado y el 2 no
- **THEN** el escenario 2 está habilitado y el 3 sigue bloqueado

#### Scenario: Pulsar un escenario bloqueado
- **WHEN** la persona pulsa un escenario bloqueado
- **THEN** el mapa no cambia

### Requirement: Escenario completado en el mapa
Un escenario completado SHALL mostrar "completado, X de 40 pts" con los puntos obtenidos en él y SHALL quedar deshabilitado.

#### Scenario: Volver al mapa tras completar
- **WHEN** la persona completó el escenario 1 con 30 puntos y regresa al mapa
- **THEN** el escenario 1 muestra "completado, 30 de 40 pts" y no responde a pulsaciones

### Requirement: Entrar a un escenario
Al pulsar un escenario habilitado el juego SHALL iniciar el diálogo de intro de ese escenario.

#### Scenario: Elegir escenario habilitado
- **WHEN** la persona pulsa el escenario 1 habilitado
- **THEN** comienza la intro de "Exterior de la escuela"
