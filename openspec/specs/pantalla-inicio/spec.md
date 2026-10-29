# pantalla-inicio Specification

## Purpose
Portada del juego: presenta a los personajes, explica las reglas y da acceso a una nueva partida.

## Requirements
### Requirement: Portada visible al cargar
El sitio SHALL mostrar en la ruta raíz una portada con la imagen grupal de los seis personajes, el título "Sprint en la escuela", una descripción breve, los botones "Jugar" y "Cómo se juega" y el crédito "Prototipo del Sprint 1, Equipo 6 SCRUM".

#### Scenario: Carga inicial
- **WHEN** la persona abre la ruta raíz del sitio
- **THEN** ve la imagen grupal, el título, la descripción, los botones "Jugar" y "Cómo se juega" y el crédito

#### Scenario: Pantalla angosta
- **WHEN** el ancho de la ventana es de 320 px
- **THEN** la portada se muestra sin desplazamiento horizontal y ambos botones siguen visibles y pulsables

### Requirement: Mejor puntaje en portada
La portada SHALL mostrar el texto "Mejor puntaje: N de 120", donde N es el mejor puntaje guardado en el navegador o 0 cuando no existe ninguno.

#### Scenario: Sin récord guardado
- **WHEN** no hay mejor puntaje guardado en el navegador
- **THEN** la portada muestra "Mejor puntaje: 0 de 120"

#### Scenario: Con récord guardado
- **WHEN** existe un mejor puntaje guardado de 80
- **THEN** la portada muestra "Mejor puntaje: 80 de 120"

#### Scenario: Almacenamiento no disponible
- **WHEN** el navegador bloquea el almacenamiento local
- **THEN** la portada se muestra completa y el mejor puntaje es 0

### Requirement: Instrucciones de juego
El botón "Cómo se juega" SHALL mostrar una pantalla con tres globos de diálogo, de El Inge Morales, Lili y Toño, que explican los escenarios y tipos de reto, las vidas y puntos, y la racha y la condición de victoria, con un botón "Entendido".

#### Scenario: Abrir instrucciones
- **WHEN** la persona pulsa "Cómo se juega"
- **THEN** ve los tres globos con el nombre y el color de cada personaje y el botón "Entendido"

#### Scenario: Regresar a la portada
- **WHEN** la persona pulsa "Entendido"
- **THEN** vuelve a la portada

### Requirement: Jugar inicia una partida nueva
El botón "Jugar" SHALL iniciar una partida nueva con 0 puntos y sin progreso, independientemente de partidas anteriores.

#### Scenario: Pulsar Jugar
- **WHEN** la persona pulsa "Jugar"
- **THEN** abandona la portada y comienza una partida nueva con 0 puntos

