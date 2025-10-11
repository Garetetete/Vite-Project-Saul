import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface Character {
  id: number;
  name: string;
  power: number;
}

@Component({
  selector: 'app-dragonball',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './dragonball.component.html',
  styleUrls: ['./dragonball.component.css']
})
export class DragonballComponent {
  characters = signal<Character[]>([
    { id: 1, name: 'Goku', power: 8008 },
    { id: 2, name: 'Vegeta', power: 7500 },
    { id: 3, name: 'Trunks', power: 6700 },
    { id: 4, name: 'Tamcha', power: 700 },
    { id: 5, name: 'Piccolo', power: 3500 },
    { id: 6, name: 'Gohan', power: 9000 },
  ]);

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
