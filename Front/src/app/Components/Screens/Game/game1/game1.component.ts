import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface Tarjeta {
  id: number;
  img: string;
  volteada: boolean;
  encontrada: boolean;
  indice: number;
}

@Component({
  selector: 'app-game1',
  imports: [FormsModule, CommonModule],
  templateUrl: './game1.component.html',
  styleUrl: './game1.component.css'
})
export class Game1Component implements OnInit, OnDestroy {
  // Variables del juego
  iconos: any[] = [];
  tarjetas: Tarjeta[] = [];
  selecciones: number[] = [];
  tiempoRestante: number = 90;
  temporizador: any;
  puntuacion: number = 0;
  juegoIniciado: boolean = false;

  ngOnInit() {
    this.cargarIconos();
  }

  ngOnDestroy() {
    if (this.temporizador) {
      clearInterval(this.temporizador);
    }
  }

  cargarIconos() {
    this.iconos = [
      { id: 1, img: '<img src="https://i.ibb.co/CnckPMX/img2.png" alt="img2" width="64%">' },
      { id: 2, img: '<img src="https://i.ibb.co/WxSzVy2/img1.png" alt="img1" width="64%">' },
      { id: 3, img: '<img src="https://i.ibb.co/pQ69sDC/img3.png" alt="img3" width="64%">' },
      { id: 4, img: '<img src="https://i.ibb.co/TthxBPf/impresora-removebg-preview.png" alt="impresora" width="70%">' },
      { id: 5, img: '<img src="https://i.ibb.co/ZTp5Zrg/img6.png" alt="img6" width="64%">' },
      { id: 6, img: '<img src="https://i.ibb.co/7rFVYm4/img7.png" alt="img7" width="64%">' },
      { id: 7, img: '<img src="https://i.ibb.co/55v677r/img10.png" alt="img10" width="70%">' },
      { id: 8, img: '<img src="https://i.ibb.co/481fDmz/img12.png" alt="img12" width="70%">' },
      { id: 9, img: '<img src="https://i.ibb.co/0j5fHCw/pantalla.png" alt="pantalla" width="70%">' },
      { id: 10, img: '<img src="https://i.ibb.co/PZqBLYr/img11.png" alt="img11" width="70%">' },
      { id: 11, img: '<img src="https://i.ibb.co/vZ0j6JK/img15.png" alt="img15" width="70%">' },
      { id: 12, img: '<img src="https://i.ibb.co/qsVVtHB/img17.png" alt="img17" width="70%">' }
    ];
  }

  iniciarTemporizador() {
    this.tiempoRestante = 90;
    this.temporizador = setInterval(() => {
      if (this.tiempoRestante > 0) {
        this.tiempoRestante--;
      } else {
        this.finalizarJuego();
      }
    }, 1000);
  }

  finalizarJuego() {
    clearInterval(this.temporizador);
    this.juegoIniciado = false;
    alert("¡Se acabó el tiempo!");

    // Obtener el ID del usuario del localStorage
    const userId = localStorage.getItem('user_id');

    if (userId) {
      // Enviar la puntuación a la API
      fetch('http://localhost:8000/api/guardar-puntos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ puntos: this.puntuacion, user_id: userId })
      })
      .then(response => response.json())
      .then(data => {
        console.log(data.message);
        // Aquí puedes redirigir o mostrar resultados
      })
      .catch(error => {
        console.error('Error al guardar la puntuación:', error);
      });
    }
  }

  generarTablero() {
    this.cargarIconos();
    this.selecciones = [];
    this.puntuacion = 0;
    this.juegoIniciado = true;

    // Crear array con iconos duplicados
    let iconosDuplicados = [...this.iconos, ...this.iconos];
    iconosDuplicados.sort(() => Math.random() - 0.5);

    // Crear tarjetas
    this.tarjetas = iconosDuplicados.map((icono, index) => ({
      id: icono.id,
      img: icono.img,
      volteada: false,
      encontrada: false,
      indice: index
    }));

    this.iniciarTemporizador();
  }

  seleccionarTarjeta(indice: number) {
    const tarjeta = this.tarjetas[indice];

    // No permitir seleccionar si ya está volteada, encontrada, o si ya hay 2 selecciones
    if (tarjeta.volteada || tarjeta.encontrada || this.selecciones.length >= 2) {
      return;
    }

    // Voltear la tarjeta
    tarjeta.volteada = true;
    this.selecciones.push(indice);

    // Si tenemos 2 selecciones, evaluarlas después de un pequeño delay
    if (this.selecciones.length === 2) {
      setTimeout(() => {
        this.evaluarSeleccion();
      }, 1000);
    }
  }

  evaluarSeleccion() {
    if (this.selecciones.length !== 2) return;

    const [indice1, indice2] = this.selecciones;
    const tarjeta1 = this.tarjetas[indice1];
    const tarjeta2 = this.tarjetas[indice2];

    if (tarjeta1.id === tarjeta2.id) {
      // ¡Coincidencia encontrada!
      tarjeta1.encontrada = true;
      tarjeta2.encontrada = true;
      this.puntuacion++;

      // Verificar si se completó el juego
      if (this.puntuacion === this.iconos.length) {
        clearInterval(this.temporizador);
        setTimeout(() => {
          alert(`¡Felicitaciones! Completaste el juego con ${this.puntuacion} puntos`);
        }, 500);
      }
    } else {
      // No coinciden, voltear de nuevo
      tarjeta1.volteada = false;
      tarjeta2.volteada = false;
    }

    // Limpiar selecciones
    this.selecciones = [];
  }
}
