import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface Program {
  id: number;
  nombre: string;
  detalle: string;
  categoria: 'ADULTOS' | 'NIÑOS' | 'TODOS';
}

@Component({
  selector: 'app-program-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './program-list.component.html',
  styleUrls: ['./program-list.component.css']
})
export class ProgramListComponent {
  @Input() programs: Program[] = [];
  @Output() deleteProgram = new EventEmitter<number>();

  onDelete(id: number) {
    this.deleteProgram.emit(id);
  }

  getCategoryClass(categoria: string): string {
    switch (categoria) {
      case 'ADULTOS':
        return 'badge bg-danger';
      case 'NIÑOS':
        return 'badge bg-success';
      case 'TODOS':
        return 'badge bg-primary';
      default:
        return 'badge bg-secondary';
    }
  }
}
