# fin-de-partida Specification

## Purpose
Cierre de la partida por derrota que convierte los errores en repaso y permite volver a intentarlo.

## Requirements
### Requirement: Derrota al agotar las vidas
Cuando la persona pulse "Continuar" con cero vidas el juego SHALL mostrar la pantalla "Se acabaron las vidas" con el sprite triste de El Inge Morales sobre el fondo del escenario actual y un globo de Toño que empieza con "Los errores son normales: se prueba, se anota y se corrige en el siguiente Sprint. Repasa esto:".

#### Scenario: Tercer error
- **WHEN** la persona falla su tercer reto y pulsa "Continuar"
- **THEN** ve "Se acabaron las vidas" en lugar del siguiente reto

### Requirement: Repaso de errores
La pantalla de derrota SHALL listar las explicaciones de los últimos tres retos fallados, en orden de ocurrencia, como viñetas dentro del globo de Toño.

#### Scenario: Tres fallos
- **WHEN** la persona falló tres retos
- **THEN** el globo muestra tres viñetas con la explicación de cada uno

### Requirement: Reintentar o volver al inicio
La pantalla de derrota SHALL ofrecer "Reintentar", que inicia una partida nueva en el mapa, e "Inicio", que lleva a la portada.

#### Scenario: Reintentar
- **WHEN** la persona pulsa "Reintentar"
- **THEN** ve el mapa con tres vidas, 0 pts y solo el escenario 1 habilitado

#### Scenario: Inicio
- **WHEN** la persona pulsa "Inicio"
- **THEN** ve la portada
