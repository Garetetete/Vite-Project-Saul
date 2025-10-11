import { Component, OnInit, inject, signal, effect, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatFactsService } from '../../../services/cat-facts.service';
import { CatBreed } from '../../../models/cat-breed.model';
import { TranslationService } from '../../../services/translation.service';
import { ContentTranslationService } from '../../../services/content-translation.service';
import { forkJoin } from 'rxjs';

interface TranslatedBreed {
  breed: string;
  country: string;
  origin: string;
  coat: string;
  pattern: string;
}

interface BreedStats {
  totalBreeds: number;
  topCountries: { country: string; count: number }[];
  coatTypes: { type: string; count: number }[];
  patternTypes: { type: string; count: number }[];
}

@Component({
  selector: 'app-breed-explorer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './breed-explorer.component.html',
  styleUrls: ['./breed-explorer.component.css']
})
export class BreedExplorerComponent implements OnInit {
  private catFactsService = inject(CatFactsService);
  translationService = inject(TranslationService);
  private contentTranslation = inject(ContentTranslationService);
  
  breeds = signal<CatBreed[]>([]);
  translatedBreeds = signal<TranslatedBreed[]>([]);
  loading = signal<boolean>(false);
  isTranslating = signal<boolean>(false);
  error = signal<string | null>(null);
  selectedBreed = signal<TranslatedBreed | null>(null);
  
  // Estadísticas computadas
  stats = computed<BreedStats>(() => {
    const breeds = this.breeds();
    if (breeds.length === 0) {
      return { totalBreeds: 0, topCountries: [], coatTypes: [], patternTypes: [] };
    }

    // Contar países
    const countryMap = new Map<string, number>();
    breeds.forEach(b => {
      const count = countryMap.get(b.country) || 0;
      countryMap.set(b.country, count + 1);
    });
    const topCountries = Array.from(countryMap.entries())
      .map(([country, count]) => ({ country, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    // Contar tipos de pelaje
    const coatMap = new Map<string, number>();
    breeds.forEach(b => {
      const count = coatMap.get(b.coat) || 0;
      coatMap.set(b.coat, count + 1);
    });
    const coatTypes = Array.from(coatMap.entries())
      .map(([type, count]) => ({ type, count }))
      .sort((a, b) => b.count - a.count);

    // Contar patrones
    const patternMap = new Map<string, number>();
    breeds.forEach(b => {
      const count = patternMap.get(b.pattern) || 0;
      patternMap.set(b.pattern, count + 1);
    });
    const patternTypes = Array.from(patternMap.entries())
      .map(([type, count]) => ({ type, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    return {
      totalBreeds: breeds.length,
      topCountries,
      coatTypes,
      patternTypes
    };
  });

  constructor() {
    effect(() => {
      const currentLang = this.translationService.currentLanguage();
      const currentBreeds = this.breeds();
      
      if (currentBreeds.length > 0) {
        if (currentLang === 'en') {
          this.translatedBreeds.set(currentBreeds.map(b => ({
            breed: b.breed,
            country: b.country,
            origin: b.origin,
            coat: b.coat,
            pattern: b.pattern
          })));
        } else {
          this.translateBreeds(currentBreeds);
        }
      }
    });
  }

  ngOnInit(): void {
    this.loadBreeds();
  }

  loadBreeds(): void {
    this.loading.set(true);
    this.isTranslating.set(false);
    this.error.set(null);
    this.translatedBreeds.set([]);
    
    // Cargar todas las razas (98 razas en total)
    this.catFactsService.getBreeds(98, 1).subscribe({
      next: (response) => {
        this.breeds.set(response.data);
        
        if (this.translationService.currentLanguage() === 'en') {
          this.translatedBreeds.set(response.data.map(b => ({
            breed: b.breed,
            country: b.country,
            origin: b.origin,
            coat: b.coat,
            pattern: b.pattern
          })));
          this.loading.set(false);
        } else {
          this.isTranslating.set(true);
          this.translateBreeds(response.data);
        }
      },
      error: (err) => {
        this.error.set(this.translationService.t('error'));
        this.loading.set(false);
        this.isTranslating.set(false);
        console.error('Error loading breeds:', err);
      }
    });
  }

  private translateBreeds(breeds: CatBreed[]): void {
    const translations = breeds.map(breed => 
      forkJoin({
        country: this.contentTranslation.translateContent(breed.country),
        origin: this.contentTranslation.translateContent(breed.origin),
        coat: this.contentTranslation.translateContent(breed.coat),
        pattern: this.contentTranslation.translateContent(breed.pattern)
      }).pipe(
        // Agregar el nombre de la raza que no se traduce
      )
    );

    forkJoin(translations).subscribe({
      next: (results) => {
        const translated = breeds.map((breed, index) => ({
          breed: breed.breed,
          country: results[index].country,
          origin: results[index].origin,
          coat: results[index].coat,
          pattern: results[index].pattern
        }));
        
        this.translatedBreeds.set(translated);
        this.loading.set(false);
        this.isTranslating.set(false);
      },
      error: (err) => {
        console.error('Translation error:', err);
        this.translatedBreeds.set(breeds.map(b => ({
          breed: b.breed,
          country: b.country,
          origin: b.origin,
          coat: b.coat,
          pattern: b.pattern
        })));
        this.loading.set(false);
        this.isTranslating.set(false);
      }
    });
  }

  selectBreed(breed: TranslatedBreed): void {
    this.selectedBreed.set(breed);
  }

  closeModal(): void {
    this.selectedBreed.set(null);
  }

  get t() {
    return this.translationService.translations();
  }
}

