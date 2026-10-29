# Spec Delta

## Purpose

Cierre de cada escenario con el puntaje obtenido en él para dar sensación de avance.

## ADDED Requirements

### Requirement: Pantalla de resultado
Al resolver el último reto de un escenario el juego SHALL marcarlo como completado y mostrar "<Escenario>: completado", el puntaje "X / 40" y un globo de El Inge Morales: "¡Perfecto! Así se avanza en Scrum: una meta pequeña a la vez." con 40 puntos o "Bien hecho. Cada Sprint deja algo que mejorar." en otro caso.

#### Scenario: Escenario perfecto
- **WHEN** la persona obtiene 40 puntos en el escenario
- **THEN** ve "40 / 40" y el mensaje de perfecto

#### Scenario: Escenario con errores
- **WHEN** la persona obtiene 30 puntos en el escenario
- **THEN** ve "30 / 40" y el mensaje "Bien hecho. Cada Sprint deja algo que mejorar."

### Requirement: Navegación tras el resultado
El resultado SHALL ofrecer "Volver al mapa" cuando queden escenarios por completar y "Ver resultados" cuando los tres estén completados; "Ver resultados" SHALL terminar la partida.

#### Scenario: Quedan escenarios
- **WHEN** la persona completa el escenario 1
- **THEN** el botón dice "Volver al mapa" y al pulsarlo se muestra el mapa con el escenario 2 habilitado

#### Scenario: Último escenario
- **WHEN** la persona completa el escenario 3
- **THEN** el botón dice "Ver resultados" y al pulsarlo la partida termina
