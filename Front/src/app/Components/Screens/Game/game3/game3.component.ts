import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

interface Pregunta {
  titulo: string;
  imagen: string;
  pregunta: string;
  opciones: string[];
  respuestaCorrecta: string;
}

@Component({
  selector: 'app-game3',
  imports: [CommonModule],
  templateUrl: './game3.component.html',
  styleUrl: './game3.component.css'
})
export class Game3Component {
preguntas: Pregunta[] = [
    {
      titulo: "",
      imagen: "assets/img/procesador.png",
      pregunta: "¿Cuál de las siguientes afirmaciones sobre la CPU es correcta?",
      opciones: [
        "La CPU es responsable de almacenar datos a largo plazo.",
        "La CPU ejecuta instrucciones y procesa datos.",
        "La CPU no tiene ninguna relación con el rendimiento de una computadora."
      ],
      respuestaCorrecta: "La CPU ejecuta instrucciones y procesa datos."
    },
    {
      titulo: "",
      imagen: "assets/img/disco-duro.png",
      pregunta: "¿Cuál es la función principal de un disco duro en una computadora?",
      opciones: [
        "Almacenar y recuperar datos de forma permanente.",
        "Proporcionar energía a los componentes del sistema.",
        "Procesar instrucciones y realizar cálculos matemáticos."
      ],
      respuestaCorrecta: "Almacenar y recuperar datos de forma permanente."
    },
    {
      titulo: "",
      imagen: "assets/img/lector_cd.png",
      pregunta: "¿Cuál de las siguientes afirmaciones describe correctamente una función del lector de CD?",
      opciones: [
        "El lector de CD permite reproducir música y videos almacenados en discos compactos.",
        "El lector de CD es responsable de la gestión de la memoria RAM.",
        "El lector de CD puede escribir datos en discos duros."
      ],
      respuestaCorrecta: "El lector de CD permite reproducir música y videos almacenados en discos compactos."
    },
    {
      titulo: "",
      imagen: "assets/img/tarjeta-red.png",
      pregunta: "¿Cuál es la función principal de una tarjeta de red en una computadora?",
      opciones: [
        "Conectar la computadora a dispositivos de almacenamiento externos.",
        "Procesar y ejecutar instrucciones de programas informáticos.",
        "Permitir que la computadora se comunique y comparta datos en una red."
      ],
      respuestaCorrecta: "Permitir que la computadora se comunique y comparta datos en una red."
    },
    {
      titulo: "",
      imagen: "assets/img/fuente_poder.png",
      pregunta: "¿Cuál de las siguientes afirmaciones describe correctamente una función de la fuente de poder?",
      opciones: [
        "La fuente de poder transforma la energía de corriente continua en corriente alterna para los componentes del sistema.",
        "La fuente de poder se encarga de procesar datos y ejecutar programas en la computadora.",
        "La fuente de poder convierte la corriente alterna de la red eléctrica en corriente continua para alimentar los componentes de la computadora."
      ],
      respuestaCorrecta: "La fuente de poder convierte la corriente alterna de la red eléctrica en corriente continua para alimentar los componentes de la computadora."
    }
  ];

  preguntaActual: number = 0;
  respuestas: { [key: number]: string } = {};
  juegoTerminado: boolean = false;

  get preguntaActualData(): Pregunta {
    return this.preguntas[this.preguntaActual];
  }

  get esUltimaPregunta(): boolean {
    return this.preguntaActual === this.preguntas.length - 1;
  }

  get esPrimeraPregunta(): boolean {
    return this.preguntaActual === 0;
  }

  get todasLasPreguntasRespondidas(): boolean {
    return Object.keys(this.respuestas).length === this.preguntas.length;
  }

  get preguntaActualRespondida(): boolean {
    return !!this.respuestas[this.preguntaActual];
  }

  seleccionarRespuesta(opcion: string): void {
    this.respuestas[this.preguntaActual] = opcion;
  }

  esOpcionSeleccionada(opcion: string): boolean {
    return this.respuestas[this.preguntaActual] === opcion;
  }

  preguntaAnterior(): void {
    if (this.preguntaActual > 0) {
      this.preguntaActual--;
    }
  }

  preguntaSiguiente(): void {
    if (this.preguntaActual < this.preguntas.length - 1) {
      this.preguntaActual++;
    }
  }

  contarRespuestasCorrectas(): number {
    return Object.keys(this.respuestas).reduce((total, index) => {
      const indexNum = parseInt(index);
      return total + (this.respuestas[indexNum] === this.preguntas[indexNum].respuestaCorrecta ? 1 : 0);
    }, 0);
  }

  finalizarJuego(): void {
    this.juegoTerminado = true;
  }

  reiniciarJuego(): void {
    this.preguntaActual = 0;
    this.respuestas = {};
    this.juegoTerminado = false;
  }

  esRespuestaCorrecta(index: number): boolean {
    return this.respuestas[index] === this.preguntas[index].respuestaCorrecta;
  }
}
