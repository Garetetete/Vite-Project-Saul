import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CatFactsService } from '../../../services/cat-facts.service';
import { CatBreed } from '../../../models/cat-breed.model';
import { TranslationService } from '../../../services/translation.service';
import { CatImagesService } from '../../../services/cat-images.service';

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
  private catImagesService = inject(CatImagesService);
  
  allBreeds = signal<CatBreed[]>([]);
  loading = signal<boolean>(false);
  error = signal<string | null>(null);
  
  selectedBreedLeft = signal<string>('');
  selectedBreedRight = signal<string>('');
  countryFilter = signal<string>('');
  
  catImageLeft = signal<string>('');
  catImageRight = signal<string>('');
  
  // Lista única de países para el filtro
  uniqueCountries = computed(() => {
    const countries = this.allBreeds().map(b => b.country);
    return ['All', ...Array.from(new Set(countries)).sort()];
  });
  
  // Breeds filtradas por país
  filteredBreeds = computed(() => {
    const filter = this.countryFilter();
    if (!filter || filter === 'All') {
      return this.allBreeds();
    }
    return this.allBreeds().filter(b => b.country === filter);
  });
  
  breedLeft = computed(() => {
    const selected = this.selectedBreedLeft();
    return this.filteredBreeds().find(b => b.breed === selected) || null;
  });
  
  breedRight = computed(() => {
    const selected = this.selectedBreedRight();
    return this.filteredBreeds().find(b => b.breed === selected) || null;
  });
  
  showComparison = computed(() => {
    return this.breedLeft() !== null && this.breedRight() !== null;
  });

  ngOnInit(): void {
    this.loadBreeds();
    this.loadImages();
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

  loadImages(): void {
    // Cargar imagen para la izquierda
    this.catImagesService.getRandomImage().subscribe({
      next: (imageUrl) => {
        this.catImageLeft.set(imageUrl);
      },
      error: (err) => {
        console.error('Error loading left cat image:', err);
      }
    });

    // Cargar imagen para la derecha
    this.catImagesService.getRandomImage().subscribe({
      next: (imageUrl) => {
        this.catImageRight.set(imageUrl);
      },
      error: (err) => {
        console.error('Error loading right cat image:', err);
      }
    });
  }

  onCountryFilterChange(): void {
    // Resetear selecciones cuando cambia el filtro
    const filtered = this.filteredBreeds();
    if (filtered.length >= 2) {
      this.selectedBreedLeft.set(filtered[0].breed);
      this.selectedBreedRight.set(filtered[1].breed);
    } else if (filtered.length === 1) {
      this.selectedBreedLeft.set(filtered[0].breed);
      this.selectedBreedRight.set('');
    } else {
      this.selectedBreedLeft.set('');
      this.selectedBreedRight.set('');
    }
    // Recargar imágenes cuando cambia el filtro
    this.loadImages();
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

