import type { Escenario } from './tipos';

export const escenarios: Escenario[] = [
  {
    titulo: 'Exterior de la escuela',
    tema: 'Fundamentos de SCRUM',
    fondo: 'b0',
    guia: 'inge',
    intro: [
      { personaje: 'inge', texto: '¡Ta-ta-ta-ta-TA! Con SCRUM no hacemos todo el videojuego de un solo golpe. Trabajamos por ciclos llamados Sprints.' },
      { personaje: 'beto', texto: '¿Scrum es un dulce? ¿Se come?' },
      { personaje: 'inge', texto: 'No, Beto. Es un marco de trabajo. Demuestren que lo entienden.' },
    ],
    retos: [
      {
        tipo: 'mc',
        pregunta: '¿Qué es Scrum?',
        correcta: 'Un marco de trabajo para resolver problemas complejos con colaboración y entregas frecuentes',
        incorrectas: ['Una lista de pasos que garantiza resultados', 'Un lenguaje de programación'],
        explicacion: 'Scrum es ligero y sencillo de entender, pero no es una receta que garantice resultados ni una técnica de programación.',
      },
      {
        tipo: 'mc',
        pregunta: '¿Cómo se llaman los periodos de trabajo en Scrum?',
        correcta: 'Sprints',
        incorrectas: ['Capítulos', 'Maratones'],
        explicacion: 'En cada Sprint el equipo acuerda una meta, construye una parte utilizable del producto, la inspecciona y mejora.',
      },
      {
        tipo: 'mc',
        pregunta: 'Trabajar de forma empírica significa:',
        correcta: 'Decidir con base en lo observado',
        incorrectas: ['Decidir por intuición del más rápido', 'Seguir el plan sin cambios'],
        explicacion: 'Si Toño demuestra que un botón no responde, el equipo atiende esa evidencia.',
      },
      {
        tipo: 'ord',
        pregunta: 'Ordena el ciclo de un Sprint, del primero al último:',
        pasos: ['Sprint Planning', 'Trabajo diario con Daily Scrum', 'Sprint Review', 'Retrospectiva'],
        explicacion: 'Se planea, se trabaja inspeccionando cada día, se revisa el incremento con los interesados y al final se mejora la colaboración.',
      },
    ],
  },
  {
    titulo: 'Salón de clases',
    tema: 'Roles del equipo',
    fondo: 'b1',
    guia: 'lili',
    intro: [
      { personaje: 'lili', texto: 'En el salón cada quien necesita una responsabilidad clara. Yo ordeno lo que necesita el juego.' },
      { personaje: 'riqui', texto: '¡Yo me encargo de mis partes sin que Beto arruine mis ideas!' },
      { personaje: 'lili', texto: 'Así no funciona, Riqui. Veamos quién hace qué en Scrum.' },
    ],
    retos: [
      {
        tipo: 'mc',
        pregunta: '¿Quién maximiza el valor y ordena el Product Backlog?',
        correcta: 'El Product Owner',
        incorrectas: ['El Scrum Master', 'El Equipo de Desarrollo'],
        explicacion: 'Es una sola persona. En la historia, Lili ordena las necesidades de quienes aprenderán con el juego.',
      },
      {
        tipo: 'mc',
        pregunta: '¿Qué hace el Scrum Master?',
        correcta: 'Enseña Scrum y ayuda a eliminar impedimentos',
        incorrectas: ['Decide cómo programar cada tarea', 'Ordena el Product Backlog'],
        explicacion: 'El Inge Morales guía al grupo sin decidir cómo se programa.',
      },
      {
        tipo: 'mc',
        pregunta: 'El Equipo de Desarrollo es:',
        correcta: 'Autoorganizado y multifuncional',
        incorrectas: ['Dirigido por el Product Owner', 'Solo de programadores'],
        explicacion: 'Construye un incremento terminado y la responsabilidad es colectiva.',
      },
      {
        tipo: 'rel',
        pregunta: 'Une cada rol con su responsabilidad:',
        pares: [
          ['Product Owner', 'Ordena el Product Backlog'],
          ['Scrum Master', 'Elimina impedimentos'],
          ['Equipo de Desarrollo', 'Construye el incremento'],
        ],
        explicacion: 'Scrum define tres roles; QA y UI/UX son especialidades dentro del Equipo de Desarrollo.',
      },
    ],
  },
  {
    titulo: 'Cancha de la escuela',
    tema: 'Eventos y artefactos',
    fondo: 'b2',
    guia: 'tono',
    intro: [
      { personaje: 'tono', texto: 'Llegó el recreo, pero antes hay que repasar cómo se trabaja y se mejora en cada Sprint.' },
      { personaje: 'pau', texto: '¡Ay, sí! Y yo quiero que todo se vea bonito al presentarlo.' },
      { personaje: 'tono', texto: 'Primero lo primero: eventos y artefactos.' },
    ],
    retos: [
      {
        tipo: 'mc',
        pregunta: 'En la Sprint Planning el equipo:',
        correcta: 'Define la meta y selecciona el trabajo del Sprint',
        incorrectas: ['Presenta el producto final', 'Revisa el desempeño de cada persona'],
        explicacion: 'Es el momento de acordar una meta pequeña y cómo lograrla.',
      },
      {
        tipo: 'mc',
        pregunta: 'La Daily Scrum sirve para:',
        correcta: 'Compartir avances y bloqueos y ajustar el plan',
        incorrectas: ['Evaluar a cada integrante', 'Entregar el producto'],
        explicacion: 'Es breve y diaria; ahí se identifican los bloqueos.',
      },
      {
        tipo: 'mc',
        pregunta: 'En la Sprint Review:',
        correcta: 'El equipo y los interesados examinan el incremento',
        incorrectas: ['Se asignan calificaciones', 'Se elige al Scrum Master'],
        explicacion: 'Con sus comentarios se actualiza el Product Backlog.',
      },
      {
        tipo: 'rel',
        pregunta: 'Une cada evento con su propósito:',
        pares: [
          ['Daily Scrum', 'Compartir avances y bloqueos'],
          ['Sprint Review', 'Examinar el incremento'],
          ['Retrospectiva', 'Mejorar la colaboración'],
        ],
        explicacion: 'Cada evento permite inspeccionar y adaptar el trabajo del equipo.',
      },
    ],
  },
];
