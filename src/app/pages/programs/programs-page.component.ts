import { Component, signal } from '@angular/core';
import { ProgramAddComponent } from '../../components/programs/program-add.component';
import { ProgramListComponent, Program } from '../../components/programs/program-list.component';
import { ProgramDeleteComponent } from '../../components/programs/program-delete.component';

@Component({
  selector: 'app-programs-page',
  standalone: true,
  imports: [ProgramAddComponent, ProgramListComponent, ProgramDeleteComponent],
  templateUrl: './programs-page.component.html',
  styleUrls: ['./programs-page.component.css']
})
export class ProgramsPageComponent {
  programs = signal<Program[]>([]);
  programToDelete = signal<Program | null>(null);

  onAddProgram(newProgram: Omit<Program, 'id'>) {
    const program: Program = {
      id: this.generateRandomId(),
      ...newProgram
    };
    
    this.programs.set([...this.programs(), program]);
  }

  onDeleteProgram(id: number) {
    const program = this.programs().find(p => p.id === id);
    if (program) {
      this.programToDelete.set(program);
    }
  }

  onConfirmDelete(id: number) {
    this.programs.set(this.programs().filter(p => p.id !== id));
    this.programToDelete.set(null);
  }

  onCancelDelete() {
    this.programToDelete.set(null);
  }

  private generateRandomId(): number {
    return Math.floor(Math.random() * 10000) + 1;
  }
}
