import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CatFactsService } from '../../../services/cat-facts.service';
import { CatBreedsResponse, CatBreed } from '../../../models/cat-breed.model';
import { TranslationService } from '../../../services/translation.service';

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
  
  allBreeds = signal<CatBreed[]>([]);
  loading = signal<boolean>(false);
  error = signal<string | null>(null);
  currentPage = signal<number>(1);
  itemsPerPage = signal<number>(12);
  searchTerm = signal<string>('');

  // Breeds filtradas
  filteredBreeds = computed(() => {
    const search = this.searchTerm().toLowerCase();
    if (!search) {
      return this.allBreeds();
    }
    
    return this.allBreeds().filter(breed =>
      breed.breed.toLowerCase().includes(search) ||
      breed.country.toLowerCase().includes(search) ||
      breed.origin.toLowerCase().includes(search) ||
      breed.coat.toLowerCase().includes(search) ||
      breed.pattern.toLowerCase().includes(search)
    );
  });

  // Breeds paginadas
  paginatedBreeds = computed(() => {
    const filtered = this.filteredBreeds();
    const start = (this.currentPage() - 1) * this.itemsPerPage();
    const end = start + this.itemsPerPage();
    return filtered.slice(start, end);
  });

  totalPages = computed(() => {
    return Math.ceil(this.filteredBreeds().length / this.itemsPerPage());
  });

  ngOnInit(): void {
    this.loadBreeds();
  }

  loadBreeds(): void {
    this.loading.set(true);
    this.error.set(null);
    
    // Cargar TODAS las razas (hay ~98 razas totales)
    this.catFactsService.getBreeds(100, 1).subscribe({
      next: (data) => {
        this.allBreeds.set(data.data);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set(this.translationService.t('error'));
        this.loading.set(false);
        console.error('Error loading breeds:', err);
      }
    });
  }

  changeItemsPerPage(event: Event): void {
    const select = event.target as HTMLSelectElement;
    this.itemsPerPage.set(Number(select.value));
    this.currentPage.set(1);
  }

  onSearch(): void {
    this.currentPage.set(1);
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages()) {
      this.currentPage.set(page);
    }
  }

  nextPage(): void {
    if (this.currentPage() < this.totalPages()) {
      this.goToPage(this.currentPage() + 1);
    }
  }

  previousPage(): void {
    if (this.currentPage() > 1) {
      this.goToPage(this.currentPage() - 1);
    }
  }

  get t() {
    return this.translationService.translations();
  }
}
