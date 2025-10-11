import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Program } from './program-list.component';

@Component({
  selector: 'app-program-add',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './program-add.component.html',
  styleUrls: ['./program-add.component.css']
})
export class ProgramAddComponent {
  @Output() addProgram = new EventEmitter<Omit<Program, 'id'>>();

  newProgram = {
    nombre: '',
    detalle: '',
    categoria: 'TODOS' as 'ADULTOS' | 'NIÑOS' | 'TODOS'
  };

  categorias = [
    { value: 'TODOS', label: 'Para Todos' },
    { value: 'NIÑOS', label: 'Para Niños' },
    { value: 'ADULTOS', label: 'Para Adultos' }
  ];

  onSubmit() {
    if (this.isFormValid()) {
      this.addProgram.emit({ ...this.newProgram });
      this.resetForm();
    }
  }

  private isFormValid(): boolean {
    return this.newProgram.nombre.trim().length > 0 && 
           this.newProgram.detalle.trim().length > 0;
  }

  private resetForm() {
    this.newProgram = {
      nombre: '',
      detalle: '',
      categoria: 'TODOS'
    };
  }
}
