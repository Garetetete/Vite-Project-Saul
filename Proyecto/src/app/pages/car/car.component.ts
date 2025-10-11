import {Component, computed, signal} from '@angular/core';
import {UpperCasePipe} from '@angular/common';
// import { Router } from '@angular/router'; // Se eliminó porque no se usa

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  standalone: true, // Mejora: Si usas imports, asume que es Standalone
  imports: [UpperCasePipe]
})
export class CarComponent {
  brand = signal('Renault');
  student = signal('saul');
  year = signal(2020);
  
  // ✅ Corregido: Llamar a los signals como funciones (brand() y year())
  getCarDescription() { return `${this.brand()} - ${this.year()}`;}
  
  // ✅ Corregido: computed debe recibir una función de flecha y se invoca toUpperCase()
  capitalizedStudent = computed(() => this.student().toUpperCase());

  changeCar() {
    this.brand.set('Kia');
    this.year.set(2021);
  }

  resetForm() {
    this.brand.set('Renault');
    this.year.set(2020);
  }

  changeYear() {
    this.year.set(2025);
  }
}