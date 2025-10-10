import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Program } from './program-list.component';

@Component({
  selector: 'app-program-delete',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './program-delete.component.html',
  styleUrls: ['./program-delete.component.css']
})
export class ProgramDeleteComponent {
  @Input() program: Program | null = null;
  @Output() confirmDelete = new EventEmitter<number>();
  @Output() cancelDelete = new EventEmitter<void>();

  onConfirm() {
    if (this.program) {
      this.confirmDelete.emit(this.program.id);
    }
  }

  onCancel() {
    this.cancelDelete.emit();
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
