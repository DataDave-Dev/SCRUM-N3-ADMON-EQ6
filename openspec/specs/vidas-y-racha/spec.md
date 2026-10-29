# vidas-y-racha Specification

## Purpose
Presión y recompensa durante la partida: vidas limitadas que se pierden al fallar y racha que premia los aciertos consecutivos.

## Requirements
### Requirement: Tres vidas por partida
Cada partida SHALL comenzar con tres vidas y el marcador SHALL mostrarlas como tres corazones, llenos para las vidas restantes y vacíos para las perdidas.

#### Scenario: Partida nueva
- **WHEN** inicia una partida
- **THEN** el marcador muestra tres corazones llenos

#### Scenario: Una vida perdida
- **WHEN** la persona ha fallado un reto
- **THEN** el marcador muestra dos corazones llenos y uno vacío

### Requirement: Perder una vida
Cada reto resuelto como error, incluido el tiempo agotado, SHALL restar una vida y reiniciar la racha a cero. Un acierto SHALL dejar las vidas sin cambio.

#### Scenario: Error resta vida
- **WHEN** la persona falla un reto con tres vidas
- **THEN** quedan dos vidas

#### Scenario: Acierto conserva vidas
- **WHEN** la persona acierta un reto con dos vidas
- **THEN** siguen quedando dos vidas

### Requirement: Racha de aciertos
La racha SHALL contar aciertos consecutivos. El marcador SHALL mostrar "Racha xN" cuando N sea mayor que 1 y "Sin racha" en otro caso. La retroalimentación de acierto SHALL añadir "Llevas una racha de N." cuando N sea 3 o más.

#### Scenario: Dos aciertos seguidos
- **WHEN** la persona acierta dos retos seguidos
- **THEN** el marcador muestra "Racha x2"

#### Scenario: Racha interrumpida
- **WHEN** la persona falla tras dos aciertos
- **THEN** el marcador muestra "Sin racha"

#### Scenario: Tercer acierto consecutivo
- **WHEN** la persona acierta el tercer reto consecutivo
- **THEN** el globo de acierto incluye "Llevas una racha de 3."
