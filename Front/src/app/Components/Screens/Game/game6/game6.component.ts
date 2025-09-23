import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

interface QuizOption {
  text: string;
  correct: boolean;
}

interface QuizQuestion {
  question: string;
  image: string;
  options: QuizOption[];
  explanation: string;
}

interface QuizLevel {
  title: string;
  questions: QuizQuestion[];
}

@Component({
  selector: 'app-game6',
  imports: [CommonModule],
  templateUrl: './game6.component.html',
  styleUrl: './game6.component.css'
})
export class Game6Component implements OnInit {
  currentLevel = 0;
  currentQuestion = 0;
  score = 0;
  answered = false;
  selectedOption = -1;
  showExplanation = false;
  levelCompleted = false;
  feedbackMessage = '¡Selecciona la respuesta correcta!';
  feedbackClass = '';
  levelCompleteMessage = '';

  levels: QuizLevel[] = [
    {
      title: "Nivel 1: Componentes Básicos",
      questions: [
        {
          question: "Es como el cerebro del computador:",
          image: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y3B1JTIwY2hpcHxlbnwwfHwwfHx8MA%3D%3D",
          options: [
            { text: "CPU", correct: true },
            { text: "Disco duro", correct: false },
            { text: "Fuente de poder", correct: false }
          ],
          explanation: "La CPU (Unidad Central de Procesamiento) es conocida como el 'cerebro' del computador porque procesa todas las instrucciones y cálculos necesarios para que el sistema funcione."
        },
        {
          question: "Almacena información permanentemente:",
          image: "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aGFyZCUyMGRyaXZlfGVufDB8fDB8fHww",
          options: [
            { text: "Memoria RAM", correct: false },
            { text: "Disco duro", correct: true },
            { text: "Tarjeta gráfica", correct: false }
          ],
          explanation: "El disco duro es el dispositivo de almacenamiento permanente que guarda todos los datos, programas y el sistema operativo incluso cuando el computador está apagado."
        },
        {
          question: "Muestra la información visual:",
          image: "https://images.unsplash.com/photo-1517059224940-d4af9eec41b3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bW9uaXRvcnxlbnwwfHwwfHx8MA%3D%3D",
          options: [
            { text: "Monitor", correct: true },
            { text: "Teclado", correct: false },
            { text: "CPU", correct: false }
          ],
          explanation: "El monitor es el dispositivo de salida que muestra la información visual generada por la computadora a través de la tarjeta gráfica."
        }
      ]
    },
    {
      title: "Nivel 2: Componentes Internos",
      questions: [
        {
          question: "Procesa los gráficos y videos:",
          image: "https://images.unsplash.com/photo-1591405351990-4726e331f141?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z3JhcGhpY3MlMjBjYXJkfGVufDB8fDB8fHww",
          options: [
            { text: "Tarjeta gráfica", correct: true },
            { text: "Fuente de poder", correct: false },
            { text: "Disco duro", correct: false }
          ],
          explanation: "La tarjeta gráfica o GPU es un componente especializado en el procesamiento de gráficos y videos, aliviando la carga de trabajo de la CPU."
        },
        {
          question: "Proporciona energía a todos los componentes:",
          image: "https://images.unsplash.com/photo-1601152888642-405f34aa6134?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cG93ZXIlMjBzdXBwbHl8ZW58MHx8MHx8fDA%3D",
          options: [
            { text: "Placa base", correct: false },
            { text: "Fuente de poder", correct: true },
            { text: "Procesador", correct: false }
          ],
          explanation: "La fuente de poder convierte la corriente alterna de la pared en corriente continua a diferentes voltajes, proporcionando energía estable a todos los componentes del computador."
        },
        {
          question: "Conecta todos los componentes internos:",
          image: "https://images.unsplash.com/photo-1531594896955-305cf81269f1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bW90aGVyYm9hcmR8ZW58MHx8MHx8fDA%3D",
          options: [
            { text: "Placa base", correct: true },
            { text: "Memoria RAM", correct: false },
            { text: "Ventilador", correct: false }
          ],
          explanation: "La placa base (motherboard) es la plataforma central que interconecta todos los componentes del computador, permitiendo que se comuniquen entre sí."
        }
      ]
    },
    {
      title: "Nivel 3: Memoria y Almacenamiento",
      questions: [
        {
          question: "Memoria temporal de acceso rápido:",
          image: "https://images.unsplash.com/photo-1594948358271-5d4dfa928a71?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmFtJTIwbWVtb3J5fGVufDB8fDB8fHww",
          options: [
            { text: "Memoria RAM", correct: true },
            { text: "Disco duro", correct: false },
            { text: "Memoria caché", correct: false }
          ],
          explanation: "La memoria RAM (Random Access Memory) es una memoria volátil de acceso rápido que almacena temporalmente los datos que la CPU está utilizando activamente."
        },
        {
          question: "Dispositivo de almacenamiento muy rápido sin partes móviles:",
          image: "https://images.unsplash.com/photo-1609342127744-5033f1946eba?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c29saWQlMjBzdGF0ZSUyMGRyaXZlfGVufDB8fDB8fHww",
          options: [
            { text: "Disco duro tradicional", correct: false },
            { text: "Unidad de estado sólido (SSD)", correct: true },
            { text: "Unidad óptica", correct: false }
          ],
          explanation: "Las unidades de estado sólido (SSD) usan memoria flash para almacenar datos, lo que las hace mucho más rápidas que los discos duros tradicionales y sin partes móviles."
        },
        {
          question: "Memoria ultrarrápida integrada en el procesador:",
          image: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2FjaGUlMjBtZW1vcnl8ZW58MHx8MHx8fDA%3D",
          options: [
            { text: "Memoria RAM", correct: false },
            { text: "Memoria virtual", correct: false },
            { text: "Memoria caché", correct: true }
          ],
          explanation: "La memoria caché es una memoria ultrarrápida integrada en el procesador que almacena copias de datos de uso frecuente para acelerar el acceso del CPU."
        }
      ]
    },
    {
      title: "Nivel 4: Dispositivos de Entrada/Salida",
      questions: [
        {
          question: "Permite introducir texto y comandos:",
          image: "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8a2V5Ym9hcmR8ZW58MHx8MHx8fDA%3D",
          options: [
            { text: "Mouse", correct: false },
            { text: "Teclado", correct: true },
            { text: "Monitor", correct: false }
          ],
          explanation: "El teclado es un dispositivo de entrada que permite introducir texto, números y comandos al computador mediante la presión de teclas."
        },
        {
          question: "Dispositivo de entrada para apuntar y seleccionar:",
          image: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bW91c2V8ZW58MHx8MHx8fDA%3D",
          options: [
            { text: "Mouse", correct: true },
            { text: "Impresora", correct: false },
            { text: "Escáner", correct: false }
          ],
          explanation: "El mouse (ratón) es un dispositivo de entrada que controla el cursor en la pantalla y permite seleccionar, arrastrar y hacer clic en elementos."
        },
        {
          question: "Convierte documentos físicos en digitales:",
          image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2Nhbm5lcnxlbnwwfHwwfHx8MA%3D%3D",
          options: [
            { text: "Impresora", correct: false },
            { text: "Monitor", correct: false },
            { text: "Escáner", correct: true }
          ],
          explanation: "El escáner es un dispositivo de entrada que convierte documentos físicos, fotografías o imágenes en formato digital que puede ser procesado por el computador."
        }
      ]
    },
    {
      title: "Nivel 5: Componentes Avanzados",
      questions: [
        {
          question: "Mantiene el computador a temperatura adecuada:",
          image: "https://images.unsplash.com/photo-1597848212624-e9e789c1f8a3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y29vbGluZyUyMGZhbnxlbnwwfHwwfHx8MA%3D%3D",
          options: [
            { text: "Sistema de refrigeración", correct: true },
            { text: "Fuente de poder", correct: false },
            { text: "Disco duro", correct: false }
          ],
          explanation: "El sistema de refrigeración (que puede incluir ventiladores, disipadores de calor y refrigeración líquida) mantiene los componentes a temperaturas seguras para su funcionamiento."
        },
        {
          question: "Permite la conexión a redes e internet:",
          image: "https://images.unsplash.com/photo-1599669454699-248893623464?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bmV0d29yayUyMGNhcmR8ZW58MHx8MHx8fDA%3D",
          options: [
            { text: "Tarjeta de sonido", correct: false },
            { text: "Tarjeta de red", correct: true },
            { text: "Tarjeta gráfica", correct: false }
          ],
          explanation: "La tarjeta de red (NIC) permite la conexión del computador a redes locales e internet, ya sea por cable (Ethernet) o de forma inalámbrica (Wi-Fi)."
        },
        {
          question: "Produce audio y permite conectar parlantes:",
          image: "https://images.unsplash.com/photo-1603298619284-8d7960ee0792?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c291bmQlMjBjYXJkfGVufDB8fDB8fHww",
          options: [
            { text: "Tarjeta de sonido", correct: true },
            { text: "Tarjeta de video", correct: false },
            { text: "Procesador", correct: false }
          ],
          explanation: "La tarjeta de sonido procesa audio y permite conectar parlantes, audífonos y micrófonos al computador, convirtiendo señales digitales en analógicas y viceversa."
        }
      ]
    }
  ];

  private readonly hints = [
    "Pista: Este componente procesa todas las instrucciones del computador.",
    "Pista: Guarda tus archivos y programas permanentemente.",
    "Pista: Donde ves la información visual.",
    "Pista: Esencial para juegos y diseño gráfico.",
    "Pista: Sin esto, el computador no encendería.",
    "Pista: Todo se conecta a esta placa.",
    "Pista: Memoria temporal de alta velocidad.",
    "Pista: Más rápido que un disco duro tradicional.",
    "Pista: Memoria ultrarrápida cerca del procesador.",
    "Pista: Con este escribes texto.",
    "Pista: Con este apuntas y haces clic.",
    "Pista: Convierte papel a digital.",
    "Pista: Mantiene todo fresco y funcionando.",
    "Pista: Te conecta a internet.",
    "Pista: Para escuchar música y sonidos."
  ];

  ngOnInit(): void {
    this.loadLevel(0);
  }

  get currentLevelData(): QuizLevel {
    return this.levels[this.currentLevel];
  }

  get currentQuestionData(): QuizQuestion {
    return this.currentLevelData.questions[this.currentQuestion];
  }

  get progressPercentage(): number {
    return (this.currentQuestion / this.currentLevelData.questions.length) * 100;
  }

  loadLevel(levelIndex: number): void {
    this.currentLevel = levelIndex;
    this.currentQuestion = 0;
    this.score = 0;
    this.levelCompleted = false;
    this.loadQuestion();
  }

  loadQuestion(): void {
    this.answered = false;
    this.selectedOption = -1;
    this.showExplanation = false;
    this.feedbackMessage = '¡Selecciona la respuesta correcta!';
    this.feedbackClass = '';
  }

  checkAnswer(optionIndex: number, isCorrect: boolean): void {
    if (this.answered) return;

    this.answered = true;
    this.selectedOption = optionIndex;
    this.showExplanation = true;

    if (isCorrect) {
      this.feedbackMessage = '¡Correcto!';
      this.feedbackClass = 'correct';
      this.score += 10;
    } else {
      this.feedbackMessage = 'Incorrecto.';
      this.feedbackClass = 'incorrect';
    }
  }

  nextQuestion(): void {
    this.currentQuestion++;

    if (this.currentQuestion >= this.currentLevelData.questions.length) {
      this.showLevelCompleted();
    } else {
      this.loadQuestion();
    }
  }

  showLevelCompleted(): void {
    this.levelCompleted = true;
    const totalQuestions = this.currentLevelData.questions.length;
    const maxScore = totalQuestions * 10;
    const percentage = (this.score / maxScore) * 100;

    if (percentage >= 80) {
      this.levelCompleteMessage = '¡Excelente trabajo! Dominas este tema.';
    } else if (percentage >= 60) {
      this.levelCompleteMessage = '¡Buen trabajo! Sigue practicando.';
    } else {
      this.levelCompleteMessage = '¡Sigue practicando! Puedes mejorar.';
    }
  }

  nextLevel(): void {
    if (this.currentLevel < this.levels.length - 1) {
      this.loadLevel(this.currentLevel + 1);
    } else {
      // Si es el último nivel, volver al primero
      this.loadLevel(0);
    }
  }

  showHint(): void {
    if (this.answered) return;

    const hintIndex = this.currentLevel * 3 + this.currentQuestion;
    this.feedbackMessage = this.hints[hintIndex];
    this.feedbackClass = 'correct';

    // Reducir puntuación por usar pista
    if (this.score > 2) {
      this.score -= 5;
    }

    // Restaurar mensaje después de 3 segundos
    setTimeout(() => {
      if (!this.answered) {
        this.feedbackMessage = '¡Selecciona la respuesta correcta!';
        this.feedbackClass = '';
      }
    }, 3000);
  }

  getOptionIcon(index: number): string {
    const icons = ['fa-microchip', 'fa-hdd', 'fa-plug'];
    return icons[index] || 'fa-circle';
  }
}
