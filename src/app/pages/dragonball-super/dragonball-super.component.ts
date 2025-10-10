import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface Character {
  id: number;
  name: string;
  power: number;
}

@Component({
  selector: 'app-dragonball-super',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './dragonball-super.component.html',
  styleUrls: ['./dragonball-super.component.css']
})
export class DragonballSuperComponent {
  // Lista vacía - sin personajes predefinidos
  characters = signal<Character[]>([]);

  newName = '';
  newPower: number | null = null;

  addCharacter() {
    if (!this.newName.trim() || !this.newPower || this.newPower <= 0) {
      return;
    }

    const newChar: Character = {
      id: this.characters().length + 1,
      name: this.newName.trim(),
      power: this.newPower
    };

    this.characters.set([...this.characters(), newChar]);

    this.newName = '';
    this.newPower = null;
  }
}
