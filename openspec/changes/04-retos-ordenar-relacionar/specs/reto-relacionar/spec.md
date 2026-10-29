# Spec Delta

## Purpose

Reto de emparejamiento entre conceptos de SCRUM y su responsabilidad o propósito.

## ADDED Requirements

### Requirement: Presentación del reto de relacionar
El reto SHALL mostrar el enunciado, una columna izquierda con los tres conceptos en su orden original, una columna derecha con las tres definiciones en orden aleatorio y un botón "Comprobar".

#### Scenario: Mostrar el reto
- **WHEN** se presenta "Une cada rol con su responsabilidad:"
- **THEN** la izquierda lista Product Owner, Scrum Master y Equipo de Desarrollo y la derecha las tres responsabilidades en algún orden

### Requirement: Emparejar por pulsaciones
Pulsar un concepto SHALL marcarlo como activo. Pulsar una definición con un concepto activo SHALL emparejarlos, mostrar ambos con el mismo color y desactivar el concepto. Una definición ya emparejada que se asigne a otro concepto SHALL liberarse del anterior.

#### Scenario: Formar un par
- **WHEN** la persona pulsa "Product Owner" y luego "Ordena el Product Backlog"
- **THEN** ambos se muestran con el mismo color de par

#### Scenario: Reasignar una definición
- **WHEN** "Ordena el Product Backlog" estaba emparejado con "Product Owner" y la persona lo empareja con "Scrum Master"
- **THEN** "Product Owner" vuelve a quedar sin par

#### Scenario: Definición sin concepto activo
- **WHEN** la persona pulsa una definición sin haber activado un concepto
- **THEN** nada cambia

### Requirement: Comprobar los pares
"Comprobar" SHALL ignorarse mientras algún concepto no tenga par. Con los tres emparejados SHALL resolver el reto como acierto si todos los pares son correctos y como error en caso contrario.

#### Scenario: Incompleto
- **WHEN** solo hay dos pares y la persona pulsa "Comprobar"
- **THEN** el reto sigue abierto sin cambios

#### Scenario: Todos correctos
- **WHEN** los tres pares son correctos y la persona pulsa "Comprobar"
- **THEN** el reto se resuelve como acierto

#### Scenario: Un par incorrecto
- **WHEN** dos pares son correctos y uno no, y la persona pulsa "Comprobar"
- **THEN** el reto se resuelve como error
