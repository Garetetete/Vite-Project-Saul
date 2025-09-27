import { Component } from '@angular/core';

@Component({
  selector: 'app-counter-page',
  standalone: true, // Recomendado para Angular moderno
  templateUrl: './counter-page.component.html', // APUNTA AL ARCHIVO HTML
  // Si usas CSS específico, asegúrate de tener:
  // styleUrls: ['./counter-page.component.css'] 
})
export class CounterPageComponent {
  // Inicialización de la propiedad del contador
  public counter: number = 0;

  // Método para AUMENTAR
  add(value: number): void {
    this.counter += value;
  }

  // MÉTODO PARA RESTAR (Decrementa)
  subtract(value: number): void {
    this.counter -= value;
  }

  // MÉTODO PARA REINICIAR (Reset)
  reset(): void {
    this.counter = 0;
  }
}