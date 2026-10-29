# Spec Delta

## Purpose

Límite de tiempo por reto que mantiene el ritmo de la partida y castiga la indecisión como un error.

## ADDED Requirements

### Requirement: Barra de tiempo por reto
Cada reto SHALL mostrar una barra que se vacía de forma continua desde que aparece el reto: en 25 segundos para opción múltiple y en 45 segundos para ordenar y relacionar.

#### Scenario: Reto de opción múltiple
- **WHEN** aparece un reto de opción múltiple
- **THEN** la barra está llena y a los 12,5 segundos está aproximadamente a la mitad

#### Scenario: Reto de ordenar
- **WHEN** aparece un reto de ordenar
- **THEN** la barra tarda 45 segundos en vaciarse

### Requirement: Tiempo agotado
Si la barra se vacía antes de responder, el reto SHALL resolverse como error y la retroalimentación SHALL empezar con "Se acabó el tiempo." en lugar de "Casi.".

#### Scenario: Sin responder
- **WHEN** pasan 25 segundos sin pulsar una opción
- **THEN** se muestra la retroalimentación de error con "Se acabó el tiempo. La respuesta era “<correcta>”." y se pierde una vida

### Requirement: Responder detiene el tiempo
Al resolver el reto por cualquier vía el temporizador SHALL detenerse y no SHALL producir una segunda resolución.

#### Scenario: Responder justo antes del límite
- **WHEN** la persona responde a los 24 segundos
- **THEN** el reto se resuelve una sola vez con su respuesta y no aparece "Se acabó el tiempo."

#### Scenario: Cambio de pantalla
- **WHEN** la persona pulsa "Continuar" en la retroalimentación
- **THEN** ningún temporizador del reto anterior sigue activo
