import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';

interface DraggableItem {
  name: string;
  src: string;
  alt: string;
  visible: boolean;
}

interface DroppableArea {
  name: string;
  label: string;
  alt: string;
  filled: boolean;
  imageSrc: string;
}

@Component({
  selector: 'app-game2',
  imports: [FormsModule, CommonModule],
  templateUrl: './game2.component.html',
  styleUrl: './game2.component.css'
})
export class Game2Component implements OnInit, OnDestroy {
 // Variables del juego
  tiempoRestante: number = 90;
  temporizador: any;
  puntuacion: number = 0;
  juegoActivo: boolean = false;
  draggedItem: string = '';

  draggableItems: DraggableItem[] = [
    { name: 'fuente', src: '/assets/img/fuente_poder.png', alt: 'Fuente', visible: true },
    { name: 'ram', src: '/assets/img/ram.png', alt: 'RAM', visible: true },
    { name: 'procesador', src: '/assets/img/procesador.png', alt: 'GPU', visible: true },
    { name: 'cpu', src: '/assets/img/CPU.png', alt: 'CPU', visible: true },
    { name: 'tarjetar', src: '/assets/img/tarjeta-red.png', alt: 'tarjetar', visible: true },
    { name: 'disipador', src: '/assets/img/disipador.png', alt: 'disipador', visible: true },
    { name: 'disco', src: '/assets/img/disco-duro.png', alt: 'disco', visible: true },
    { name: 'lector', src: '/assets/img/lector_cd.png', alt: 'Lector', visible: true }
  ];

  droppableAreas: DroppableArea[] = [
    { name: 'tarjetar', label: 'Tarjeta de Red', alt: 'tarjetar', filled: false, imageSrc: '/placeholder.svg?height=100&width=100' },
    { name: 'lector', label: 'Lector', alt: 'lector', filled: false, imageSrc: '/placeholder.svg?height=100&width=100' },
    { name: 'disipador', label: 'Disipador', alt: 'Disipador', filled: false, imageSrc: '/placeholder.svg?height=100&width=100' },
    { name: 'cpu', label: 'Gabinete', alt: 'CPU', filled: false, imageSrc: '/placeholder.svg?height=100&width=100' },
    { name: 'disco', label: 'Disco Duro', alt: 'Disco', filled: false, imageSrc: '/placeholder.svg?height=100&width=100' },
    { name: 'fuente', label: 'Fuente poder', alt: 'fuente', filled: false, imageSrc: '/placeholder.svg?height=100&width=100' },
    { name: 'ram', label: 'RAM', alt: 'RAM', filled: false, imageSrc: '/placeholder.svg?height=100&width=100' },
    { name: 'procesador', label: 'CPU', alt: 'PROCESADOR', filled: false, imageSrc: '/placeholder.svg?height=100&width=100' }
  ];

  ngOnInit() {
    // Inicialización del componente
  }

  ngOnDestroy() {
    if (this.temporizador) {
      clearInterval(this.temporizador);
    }
  }

  iniciarJuego() {
    this.iniciarTemporizador();
    this.resetearJuego();
  }

  resetearJuego() {
    this.puntuacion = 0;
    this.draggableItems.forEach(item => item.visible = true);
    this.droppableAreas.forEach(area => {
      area.filled = false;
      area.imageSrc = '/placeholder.svg?height=100&width=100';
    });
  }

  iniciarTemporizador() {
    this.tiempoRestante = 90;
    this.juegoActivo = true;

    this.temporizador = setInterval(() => {
      if (this.tiempoRestante > 0) {
        this.tiempoRestante--;
      } else {
        this.finalizarJuego();
        this.juegoActivo = false;
      }
    }, 1000);
  }

  finalizarJuego() {
    clearInterval(this.temporizador);
    alert("¡Se acabó el tiempo!");

    // Obtener el ID del usuario del localStorage
    const userId = localStorage.getItem('user_id');

    if (userId) {
      // Enviar la puntuación a la API
      fetch('http://localhost:8000/api/guardar-puntos2', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ puntos2: this.puntuacion, user_id: userId })
      })
      .then(response => response.json())
      .then(data => {
        console.log(data.message);
        // Aquí puedes redirigir o mostrar resultados
        // window.location.href = 'marcador2.html'; // Para Angular sería un router.navigate
      })
      .catch(error => {
        console.error('Error al guardar la puntuación:', error);
      });
    }
  }

  // Eventos de drag and drop
  onDragStart(event: DragEvent, itemName: string) {
    if (!this.juegoActivo) return;
    this.draggedItem = itemName;
    if (event.dataTransfer) {
      event.dataTransfer.setData('text/plain', itemName);
    }
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  onDragEnter(event: DragEvent) {
    event.preventDefault();
    if (event.currentTarget && (event.currentTarget as HTMLElement).classList) {
      (event.currentTarget as HTMLElement).classList.add('hovered');
    }
  }

  onDragLeave(event: DragEvent) {
    if (event.currentTarget && (event.currentTarget as HTMLElement).classList) {
      (event.currentTarget as HTMLElement).classList.remove('hovered');
    }
  }

  onDrop(event: DragEvent, targetName: string) {
    if (!this.juegoActivo) return;

    event.preventDefault();

    // Remover clase hovered
    const target = event.currentTarget as HTMLElement | null;
    if (target?.classList) {
      target.classList.remove('hovered');
    }

    const draggedItemName = this.draggedItem;

    if (draggedItemName === targetName) {
      // Encontrar el área de destino y el item arrastrado
      const droppableArea = this.droppableAreas.find(area => area.name === targetName);
      const draggableItem = this.draggableItems.find(item => item.name === draggedItemName);

      if (droppableArea && draggableItem) {
        // Marcar como completado
        droppableArea.filled = true;
        droppableArea.imageSrc = draggableItem.src;
        draggableItem.visible = false;

        // Aumentar puntuación
        this.puntuacion += 15;

        // Verificar si se completó el juego
        this.checkCompletion();
      }
    }

    this.draggedItem = '';
  }

  checkCompletion() {
    const allPlaced = this.draggableItems.every(item => !item.visible);

    if (allPlaced) {
      alert('¡Felicidades! Has colocado todas las piezas correctamente.');
      clearInterval(this.temporizador);
      this.juegoActivo = false;
      this.finalizarJuego();
    }
  }
}
