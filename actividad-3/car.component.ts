import {Component, computed, signal} from '@angular/core';
import {UpperCasePipe} from '@angular/common';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  standalone: true,
  imports: [UpperCasePipe]
})
export class CarComponent {
  // Signals creados según la actividad
  brand = signal('Renault');
  student = signal('saul');
  year = signal(2020);
  
  // Método que retorna la descripción del carro
  getCarDescription() { 
    return `${this.brand()} - ${this.year()}`;
  }
  
  // Computed signal para el nombre en mayúsculas
  capitalizedStudent = computed(() => this.student().toUpperCase());

  // Método que cambia los valores a Kia 2021
  changeCar() {
    this.brand.set('Kia');
    this.year.set(2021);
  }

  // Método que resetea a los valores iniciales
  resetForm() {
    this.brand.set('Renault');
    this.year.set(2020);
  }

  // Método que cambia el año a 2025
  changeYear() {
    this.year.set(2025);
  }
}



