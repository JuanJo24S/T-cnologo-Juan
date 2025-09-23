import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';

interface GamePart {
  type: string;
  emoji: string;
  visible: boolean;
}

interface DropZone {
  content: string;
  filled: boolean;
}

@Component({
  selector: 'app-computer-assembly',
  imports: [CommonModule],
  templateUrl: './computer-assembly.component.html',
  styleUrl: './computer-assembly.component.css'
})

export class ComputerAssemblyComponent implements OnInit, OnDestroy {
timeLeft = 120; // 2 minutos en segundos
  gameCompleted = false;
  correctMatches = 0;
  private timerInterval: any;

  parts: GamePart[] = [
    { type: 'monitor', emoji: '🖥️', visible: true },
    { type: 'keyboard', emoji: '⌨️', visible: true },
    { type: 'mouse', emoji: '🖱️', visible: true },
    { type: 'tower', emoji: '🖥️', visible: true }
  ];

  dropZones: { [key: string]: DropZone } = {
    monitor: { content: 'Monitor', filled: false },
    keyboard: { content: 'Teclado', filled: false },
    mouse: { content: 'Ratón', filled: false },
    tower: { content: 'Torre', filled: false }
  };

  ngOnInit(): void {
    this.startTimer();
  }

  ngOnDestroy(): void {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
  }

  startTimer(): void {
    this.timerInterval = setInterval(() => {
      this.timeLeft--;

      if (this.timeLeft <= 0) {
        clearInterval(this.timerInterval);
        alert('¡Se acabó el tiempo! Juancho aún necesita tu ayuda.');
      }
    }, 1000);
  }

  formatTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  }

  onDragStart(event: DragEvent, partType: string): void {
    if (event.dataTransfer) {
      event.dataTransfer.setData('text/plain', partType);
    }

    setTimeout(() => {
      const element = event.target as HTMLElement;
      element.classList.add('dragging');
    }, 0);
  }

  onDragEnd(event: DragEvent): void {
    const element = event.target as HTMLElement;
    element.classList.remove('dragging');
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    const element = event.target as HTMLElement;
    element.classList.add('drag-over');
  }

  onDragLeave(event: DragEvent): void {
    const element = event.target as HTMLElement;
    element.classList.remove('drag-over');
  }

  onDrop(event: DragEvent, zoneType: string): void {
    event.preventDefault();
    const element = event.target as HTMLElement;
    element.classList.remove('drag-over');

    const partType = event.dataTransfer?.getData('text/plain') || '';

    if (partType === zoneType && !this.dropZones[zoneType].filled) {
      this.handleCorrectDrop(partType, zoneType, element);
    } else {
      this.handleIncorrectDrop(element);
    }
  }

  private handleCorrectDrop(partType: string, zoneType: string, element: HTMLElement): void {
    // Marcar la zona como llena
    this.dropZones[zoneType].filled = true;

    // Crear el emoji para mostrar en la zona
    const emoji = this.getEmojiForPart(partType);
    this.dropZones[zoneType].content = `<div style="font-size: 40px;">${emoji}</div>`;

    // Marcar la zona como correcta visualmente
    element.classList.add('correct');

    // Ocultar la parte arrastrada
    const part = this.parts.find(p => p.type === partType);
    if (part) {
      part.visible = false;
    }

    this.correctMatches++;

    // Verificar si el juego está completo
    if (this.correctMatches === 4) {
      clearInterval(this.timerInterval);
      setTimeout(() => {
        this.gameCompleted = true;
      }, 500);
    }
  }

  private handleIncorrectDrop(element: HTMLElement): void {
    element.classList.add('incorrect');
    setTimeout(() => {
      element.classList.remove('incorrect');
    }, 800);
  }

  private getEmojiForPart(partType: string): string {
    switch(partType) {
      case 'monitor':
        return '🖥️';
      case 'keyboard':
        return '⌨️';
      case 'mouse':
        return '🖱️';
      case 'tower':
        return '🗄️';
      default:
        return '';
    }
  }
}
