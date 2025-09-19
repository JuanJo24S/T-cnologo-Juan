import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';

interface ComputerPart {
  id: string;
  name: string;
  placed: boolean;
  x?: number;
  y?: number;
}

interface DropZone {
  id: string;
  name: string;
  x: number;
  y: number;
  width: number;
  height: number;
  occupied: boolean;
  correctPart: string;
}

@Component({
  selector: 'app-computer-assembly',
  imports: [CommonModule],
  templateUrl: './computer-assembly.component.html',
  styleUrl: './computer-assembly.component.css'
})

export class ComputerAssemblyComponent implements OnInit, OnDestroy {
  nivel: number = 2;
  tiempo: number = 119; // Inicia en 1:59
  timerInterval: any;
  gameStarted: boolean = false;
  gameCompleted: boolean = false;

  computerParts: ComputerPart[] = [
    { id: 'monitor', name: 'Monitor', placed: false },
    { id: 'keyboard', name: 'Teclado', placed: false },
    { id: 'mouse', name: 'Mouse', placed: false },
    { id: 'tower', name: 'Torre', placed: false }
  ];

  dropZones: DropZone[] = [
    {
      id: 'monitor-zone',
      name: 'Zona del Monitor',
      x: 200, y: 50,
      width: 150, height: 100,
      occupied: false,
      correctPart: 'monitor'
    },
    {
      id: 'keyboard-zone',
      name: 'Zona del Teclado',
      x: 180, y: 180,
      width: 120, height: 40,
      occupied: false,
      correctPart: 'keyboard'
    },
    {
      id: 'mouse-zone',
      name: 'Zona del Mouse',
      x: 320, y: 160,
      width: 50, height: 50,
      occupied: false,
      correctPart: 'mouse'
    },
    {
      id: 'tower-zone',
      name: 'Zona de la Torre',
      x: 400, y: 80,
      width: 80, height: 140,
      occupied: false,
      correctPart: 'tower'
    }
  ];

  currentDraggedItem: string | null = null;

  ngOnInit() {
    this.startGame();
  }

  ngOnDestroy() {
    this.stopTimer();
  }

  startGame() {
    this.gameStarted = true;
    this.gameCompleted = false;
    this.tiempo = 119; // 1:59 en segundos
    this.startTimer();

    // Reiniciar estado de las partes
    this.computerParts.forEach(part => {
      part.placed = false;
      part.x = undefined;
      part.y = undefined;
    });

    // Reiniciar zonas
    this.dropZones.forEach(zone => {
      zone.occupied = false;
    });
  }

  startTimer() {
    this.timerInterval = setInterval(() => {
      this.tiempo--;
      if (this.tiempo <= 0) {
        this.gameOver();
      }
    }, 1000);
  }

  stopTimer() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
  }

  gameOver() {
    this.stopTimer();
    this.gameStarted = false;
    alert('¡Tiempo agotado! Inténtalo de nuevo.');
  }

  formatTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  }

  onDragStart(event: DragEvent, partId: string) {
    this.currentDraggedItem = partId;
    if (event.dataTransfer) {
      event.dataTransfer.setData('text/plain', partId);
      event.dataTransfer.effectAllowed = 'move';
    }
  }

  onDragEnd() {
    this.currentDraggedItem = null;
  }

  onDragOver(event: DragEvent, zone: DropZone) {
    if (!zone.occupied) {
      event.preventDefault();
      event.dataTransfer!.dropEffect = 'move';
    }
  }

  onDrop(event: DragEvent, zone: DropZone) {
    event.preventDefault();
    const partId = event.dataTransfer!.getData('text/plain');
    const part = this.computerParts.find(p => p.id === partId);

    if (part && !zone.occupied && zone.correctPart === partId) {
      // Colocación correcta
      part.placed = true;
      part.x = zone.x;
      part.y = zone.y;
      zone.occupied = true;

      // Verificar si el juego está completo
      this.checkGameCompletion();
    } else if (part && zone.correctPart !== partId) {
      // Colocación incorrecta - mostrar feedback visual
      this.showIncorrectPlacement();
    }
  }

  showIncorrectPlacement() {
    // Aquí puedes agregar efectos visuales para indicar colocación incorrecta
    console.log('Colocación incorrecta');
  }

  checkGameCompletion() {
    const allPlaced = this.computerParts.every(part => part.placed);
    if (allPlaced) {
      this.gameCompleted = true;
      this.stopTimer();
      setTimeout(() => {
        alert(`¡Felicidades! Has armado el computador correctamente. Tiempo restante: ${this.formatTime(this.tiempo)}`);
      }, 500);
    }
  }

  resetGame() {
    this.stopTimer();
    this.startGame();
  }

  playSound() {
    // Función para reproducir sonido - puedes implementar según tus necesidades
    console.log('Reproducir sonido');
  }

  getPartStyle(part: ComputerPart) {
    if (part.placed && part.x !== undefined && part.y !== undefined) {
      return {
        'position': 'absolute',
        'left.px': part.x,
        'top.px': part.y,
        'z-index': 10
      };
    }
    return {};
  }
}
