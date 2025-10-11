import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CatFactsService } from '../../../services/cat-facts.service';
import { CatBreed } from '../../../models/cat-breed.model';
import { TranslationService } from '../../../services/translation.service';
import { ContentTranslationService } from '../../../services/content-translation.service';

@Component({
  selector: 'app-breeds-comparison',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './breeds-comparison.component.html',
  styleUrls: ['./breeds-comparison.component.css']
})
export class BreedsComparisonComponent implements OnInit {
  private catFactsService = inject(CatFactsService);
  translationService = inject(TranslationService);
  private contentTranslation = inject(ContentTranslationService);
  
  allBreeds = signal<CatBreed[]>([]);
  loading = signal<boolean>(false);
  error = signal<string | null>(null);
  
  selectedBreedLeft = signal<string>('');
  selectedBreedRight = signal<string>('');
  
  breedLeft = computed(() => {
    const selected = this.selectedBreedLeft();
    return this.allBreeds().find(b => b.breed === selected) || null;
  });
  
  breedRight = computed(() => {
    const selected = this.selectedBreedRight();
    return this.allBreeds().find(b => b.breed === selected) || null;
  });
  
  showComparison = computed(() => {
    return this.breedLeft() !== null && this.breedRight() !== null;
  });

  ngOnInit(): void {
    this.loadBreeds();
  }

  loadBreeds(): void {
    this.loading.set(true);
    this.error.set(null);
    
    this.catFactsService.getBreeds(100, 1).subscribe({
      next: (data) => {
        this.allBreeds.set(data.data);
        
        // Seleccionar las dos primeras razas por defecto
        if (data.data.length >= 2) {
          this.selectedBreedLeft.set(data.data[0].breed);
          this.selectedBreedRight.set(data.data[1].breed);
        }
        
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set(this.translationService.t('error'));
        this.loading.set(false);
        console.error('Error loading breeds:', err);
      }
    });
  }

  compareField(field: 'country' | 'origin' | 'coat' | 'pattern'): 'same' | 'different' {
    const left = this.breedLeft();
    const right = this.breedRight();
    
    if (!left || !right) return 'different';
    
    return left[field].toLowerCase() === right[field].toLowerCase() ? 'same' : 'different';
  }

  get t() {
    return this.translationService.translations();
  }
}

