import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';


interface GameItem {
  id: string;
  name: string;
  iconClass: string;
  matched: boolean;
}

@Component({
  selector: 'app-tech-memory',
  imports: [CommonModule],
  templateUrl: './tech-memory.component.html',
  styleUrl: './tech-memory.component.css'
})

export class TechMemoryComponent {
tiempo: number = 0;
  puntuacion: number = 0;
  intervalId: any;

  gameItems: GameItem[] = [
    { id: 'android', name: 'Android', iconClass: 'android-icon', matched: false },
    { id: 'pantalla', name: 'Pantalla', iconClass: 'pantalla-icon', matched: false },
    { id: 'teclado', name: 'Teclado', iconClass: 'teclado-icon', matched: false },
    { id: 'instagram', name: 'Instagram', iconClass: 'instagram-icon', matched: false },
    { id: 'facebook', name: 'Facebook', iconClass: 'facebook-icon', matched: false },
    { id: 'torre', name: 'Torre', iconClass: 'torre-icon', matched: false },
    { id: 'youtube', name: 'Youtube', iconClass: 'youtube-icon', matched: false },
    { id: 'tiktok', name: 'Tiktok', iconClass: 'tiktok-icon', matched: false },
    { id: 'papelera', name: 'Papelera', iconClass: 'papelera-icon', matched: false },
    { id: 'chrome', name: 'Chrome', iconClass: 'chrome-icon', matched: false },
    { id: 'cargador', name: 'Cargador', iconClass: 'cargador-icon', matched: false },
    { id: 'carpeta', name: 'Carpeta', iconClass: 'carpeta-icon', matched: false }
  ];

  // Mezclar los nombres para mostrar en orden aleatorio
  shuffledNames: string[] = [];

  constructor() {
    this.startGame();
  }

  startGame() {
    this.tiempo = 0;
    this.puntuacion = 0;
    this.shuffledNames = this.shuffleArray([...this.gameItems.map(item => item.name)]);
    this.startTimer();
  }

  shuffleArray(array: string[]): string[] {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  startTimer() {
    this.intervalId = setInterval(() => {
      this.tiempo++;
    }, 1000);
  }

  stopTimer() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  onDragStart(event: DragEvent, name: string) {
    if (event.dataTransfer) {
      event.dataTransfer.setData('text/plain', name);
      event.dataTransfer.effectAllowed = 'move';
    }
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.dataTransfer!.dropEffect = 'move';
  }

  onDrop(event: DragEvent, targetItem: GameItem) {
    event.preventDefault();
    const draggedName = event.dataTransfer!.getData('text/plain');

    if (draggedName.toLowerCase() === targetItem.name.toLowerCase() && !targetItem.matched) {
      targetItem.matched = true;
      this.puntuacion += 10;

      // Remover el nombre de la lista
      const index = this.shuffledNames.indexOf(draggedName);
      if (index > -1) {
        this.shuffledNames.splice(index, 1);
      }

      // Verificar si el juego ha terminado
      if (this.shuffledNames.length === 0) {
        this.stopTimer();
        alert(`¡Felicidades! Has completado el juego en ${this.tiempo} segundos con ${this.puntuacion} puntos.`);
      }
    }
  }

  resetGame() {
    this.stopTimer();
    this.gameItems.forEach(item => item.matched = false);
    this.startGame();
  }

  ngOnDestroy() {
    this.stopTimer();
  }
}
