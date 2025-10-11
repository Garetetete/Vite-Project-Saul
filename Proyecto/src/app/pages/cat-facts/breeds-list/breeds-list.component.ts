import { Component, OnInit, inject, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CatFactsService } from '../../../services/cat-facts.service';
import { CatBreedsResponse, CatBreed } from '../../../models/cat-breed.model';
import { TranslationService } from '../../../services/translation.service';
import { ContentTranslationService } from '../../../services/content-translation.service';
import { forkJoin } from 'rxjs';

interface TranslatedBreed extends CatBreed {
  translatedCountry?: string;
  translatedOrigin?: string;
  translatedCoat?: string;
  translatedPattern?: string;
}

@Component({
  selector: 'app-breeds-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './breeds-list.component.html',
  styleUrls: ['./breeds-list.component.css']
})
export class BreedsListComponent implements OnInit {
  private catFactsService = inject(CatFactsService);
  translationService = inject(TranslationService);
  private contentTranslation = inject(ContentTranslationService);
  
  breedsResponse = signal<CatBreedsResponse | null>(null);
  translatedBreeds = signal<TranslatedBreed[]>([]);
  loading = signal<boolean>(false);
  error = signal<string | null>(null);
  currentPage = signal<number>(1);
  itemsPerPage = signal<number>(12);
  searchTerm = signal<string>('');
  isTranslating = signal<boolean>(false);

  constructor() {
    // Cuando cambia el idioma, re-traducir las razas actuales
    effect(() => {
      const currentLang = this.translationService.currentLanguage();
      const breeds = this.breedsResponse()?.data;
      
      if (breeds && breeds.length > 0) {
        if (currentLang === 'en') {
          // Si cambió a inglés, mostrar los originales inmediatamente
          this.translatedBreeds.set(breeds);
        } else {
          // Si cambió a español, traducir
          this.translateBreeds(breeds);
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
    // Limpiar las razas anteriores
    this.translatedBreeds.set([]);
    
    this.catFactsService.getBreeds(this.itemsPerPage(), this.currentPage()).subscribe({
      next: (data) => {
        this.breedsResponse.set(data);
        
        // Si está en inglés, mostrar inmediatamente
        if (this.translationService.currentLanguage() === 'en') {
          this.translatedBreeds.set(data.data);
          this.loading.set(false);
        } else {
          // Si está en español, marcar como traduciendo y esperar
          this.isTranslating.set(true);
          this.translateBreeds(data.data);
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
    // Traducir todos los campos de cada raza en paralelo
    const translations$ = breeds.flatMap(breed => [
      this.contentTranslation.translateContent(breed.country),
      this.contentTranslation.translateContent(breed.origin),
      this.contentTranslation.translateContent(breed.coat),
      this.contentTranslation.translateContent(breed.pattern)
    ]);

    forkJoin(translations$).subscribe({
      next: (translations) => {
        const translated: TranslatedBreed[] = breeds.map((breed, index) => {
          const offset = index * 4;
          return {
            ...breed,
            translatedCountry: translations[offset],
            translatedOrigin: translations[offset + 1],
            translatedCoat: translations[offset + 2],
            translatedPattern: translations[offset + 3]
          };
        });
        this.translatedBreeds.set(translated);
        // Ahora sí, ocultar el loading después de traducir todo
        this.loading.set(false);
        this.isTranslating.set(false);
      },
      error: (err) => {
        console.error('Translation error:', err);
        // Si falla, mostrar los originales
        this.translatedBreeds.set(breeds);
        this.loading.set(false);
        this.isTranslating.set(false);
      }
    });
  }

  get t() {
    return this.translationService.translations();
  }

  changePage(page: number): void {
    this.currentPage.set(page);
    this.loadBreeds();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  changeItemsPerPage(limit: number): void {
    this.itemsPerPage.set(limit);
    this.currentPage.set(1);
    this.loadBreeds();
  }

  get totalPages(): number {
    return this.breedsResponse()?.last_page || 0;
  }

  get filteredBreeds() {
    const breeds = this.translatedBreeds() || [];
    const search = this.searchTerm().toLowerCase();
    
    if (!search) {
      return breeds;
    }
    
    return breeds.filter(breed => 
      breed.breed.toLowerCase().includes(search) ||
      breed.country.toLowerCase().includes(search) ||
      breed.origin.toLowerCase().includes(search) ||
      breed.coat.toLowerCase().includes(search) ||
      breed.pattern.toLowerCase().includes(search) ||
      breed.translatedCountry?.toLowerCase().includes(search) ||
      breed.translatedOrigin?.toLowerCase().includes(search) ||
      breed.translatedCoat?.toLowerCase().includes(search) ||
      breed.translatedPattern?.toLowerCase().includes(search)
    );
  }

  get visiblePages(): number[] {
    const total = this.totalPages;
    const current = this.currentPage();
    const delta = 2;
    const range: number[] = [];
    
    for (let i = Math.max(2, current - delta); i <= Math.min(total - 1, current + delta); i++) {
      range.push(i);
    }
    
    if (current - delta > 2) {
      range.unshift(-1);
    }
    if (current + delta < total - 1) {
      range.push(-1);
    }
    
    range.unshift(1);
    if (total > 1) {
      range.push(total);
    }
    
    return range;
  }
}

