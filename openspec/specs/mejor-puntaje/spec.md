# mejor-puntaje Specification

## Purpose
Persistencia local del mejor puntaje para que la persona vea su progreso entre partidas en el mismo navegador.

## Requirements

### Requirement: Guardar el mejor puntaje
Al terminar una partida ganada con un puntaje mayor que el guardado, el juego SHALL guardar el nuevo puntaje y la pantalla final SHALL añadir ". Nuevo mejor puntaje" tras el rango. Con un puntaje igual o menor no SHALL cambiar el guardado ni mostrar el aviso.

#### Scenario: Primer récord
- **WHEN** no hay puntaje guardado y la persona termina con 70 puntos
- **THEN** se guarda 70 y la pantalla final muestra "Desarrollador en práctica. Nuevo mejor puntaje"

#### Scenario: Puntaje inferior
- **WHEN** el guardado es 90 y la persona termina con 80
- **THEN** el guardado sigue en 90 y no aparece el aviso

### Requirement: Persistencia entre visitas
El mejor puntaje SHALL sobrevivir a recargar la página y cerrar el navegador, y la portada SHALL mostrarlo en "Mejor puntaje: N de 120".

#### Scenario: Recargar la portada
- **WHEN** se guardó 70 y la persona recarga la portada
- **THEN** ve "Mejor puntaje: 70 de 120"

### Requirement: Funcionar sin almacenamiento
Si el navegador impide leer o escribir el almacenamiento local, el juego SHALL seguir funcionando y SHALL tratar el mejor puntaje como 0 sin mostrar errores.

#### Scenario: Almacenamiento bloqueado
- **WHEN** el almacenamiento local lanza error al escribir
- **THEN** la pantalla final se muestra completa y la portada indica 0
