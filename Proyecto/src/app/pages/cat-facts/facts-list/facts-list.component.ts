import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatFactsService } from '../../../services/cat-facts.service';
import { CatFactsResponse } from '../../../models/cat-fact.model';
import { TranslationService } from '../../../services/translation.service';
import { CatImagesService } from '../../../services/cat-images.service';

@Component({
  selector: 'app-facts-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './facts-list.component.html',
  styleUrls: ['./facts-list.component.css']
})
export class FactsListComponent implements OnInit {
  private catFactsService = inject(CatFactsService);
  translationService = inject(TranslationService);
  private catImagesService = inject(CatImagesService);
  
  factsResponse = signal<CatFactsResponse | null>(null);
  catImages = signal<string[]>([]);
  loading = signal<boolean>(false);
  error = signal<string | null>(null);
  currentPage = signal<number>(1);
  itemsPerPage = signal<number>(10);

  ngOnInit(): void {
    this.loadFacts();
    this.loadCatImages();
  }

  loadCatImages(): void {
    this.catImagesService.getMultipleImages(3).subscribe({
      next: (images) => {
        this.catImages.set(images);
      },
      error: (err) => {
        console.error('Error loading cat images:', err);
      }
    });
  }

  loadFacts(): void {
    this.loading.set(true);
    this.error.set(null);
    
    this.catFactsService.getFacts(this.itemsPerPage(), this.currentPage()).subscribe({
      next: (data) => {
        this.factsResponse.set(data);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set(this.translationService.t('error'));
        this.loading.set(false);
        console.error('Error loading facts:', err);
      }
    });
  }

  changeItemsPerPage(event: Event): void {
    const select = event.target as HTMLSelectElement;
    this.itemsPerPage.set(Number(select.value));
    this.currentPage.set(1); // Reset a la primera página
    this.loadFacts();
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= (this.factsResponse()?.last_page || 1)) {
      this.currentPage.set(page);
      this.loadFacts();
    }
  }

  nextPage(): void {
    const response = this.factsResponse();
    if (response && this.currentPage() < response.last_page) {
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
