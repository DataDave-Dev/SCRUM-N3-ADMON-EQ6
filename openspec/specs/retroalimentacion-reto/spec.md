# retroalimentacion-reto Specification

## Purpose
Respuesta inmediata tras cada reto que confirma el resultado y refuerza el concepto con su explicación.

## Requirements
### Requirement: Retroalimentación de acierto
Tras un acierto el juego SHALL sumar 10 puntos y mostrar el sprite feliz del personaje guía con un globo que empieza con "¡Correcto!" seguido de la explicación del reto.

#### Scenario: Acierto en opción múltiple
- **WHEN** la persona acierta "¿Qué es Scrum?"
- **THEN** el marcador sube 10 puntos y el globo dice "¡Correcto! Scrum es ligero y sencillo de entender, pero no es una receta que garantice resultados ni una técnica de programación."

### Requirement: Retroalimentación de error
Tras un error el juego SHALL mostrar el sprite triste del personaje guía con un globo que empieza con "Casi." seguido, cuando el reto tiene una respuesta correcta textual, de "La respuesta era “<correcta>”." y de la explicación.

#### Scenario: Error en opción múltiple
- **WHEN** la persona falla "¿Cómo se llaman los periodos de trabajo en Scrum?"
- **THEN** el globo dice "Casi. La respuesta era “Sprints”." seguido de la explicación y el marcador no cambia

### Requirement: Continuar
La retroalimentación SHALL ofrecer un botón "Continuar" que lleva al siguiente reto del escenario o, si era el último, al resultado del escenario.

#### Scenario: Quedan retos
- **WHEN** la persona pulsa "Continuar" tras el reto 1
- **THEN** se muestra el reto 2 del mismo escenario

#### Scenario: Último reto
- **WHEN** la persona pulsa "Continuar" tras el último reto del escenario
- **THEN** se muestra el resultado del escenario
