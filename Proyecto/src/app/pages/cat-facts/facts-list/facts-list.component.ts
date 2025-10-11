import { Component, OnInit, inject, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatFactsService } from '../../../services/cat-facts.service';
import { CatFactsResponse, CatFact } from '../../../models/cat-fact.model';
import { TranslationService } from '../../../services/translation.service';
import { ContentTranslationService } from '../../../services/content-translation.service';
import { forkJoin, of } from 'rxjs';

interface TranslatedFact extends CatFact {
  translatedText?: string;
}

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
  private contentTranslation = inject(ContentTranslationService);
  
  factsResponse = signal<CatFactsResponse | null>(null);
  translatedFacts = signal<TranslatedFact[]>([]);
  loading = signal<boolean>(false);
  error = signal<string | null>(null);
  currentPage = signal<number>(1);
  itemsPerPage = signal<number>(10);
  isTranslating = signal<boolean>(false);

  constructor() {
    // Cuando cambia el idioma, re-traducir los hechos actuales
    effect(() => {
      const currentLang = this.translationService.currentLanguage();
      const facts = this.factsResponse()?.data;
      
      if (facts && facts.length > 0) {
        if (currentLang === 'en') {
          // Si cambió a inglés, mostrar los originales inmediatamente
          this.translatedFacts.set(facts);
        } else {
          // Si cambió a español, traducir
          this.translateFacts(facts);
        }
      }
    });
  }

  ngOnInit(): void {
    this.loadFacts();
  }

  loadFacts(): void {
    this.loading.set(true);
    this.isTranslating.set(false);
    this.error.set(null);
    // Limpiar los hechos anteriores
    this.translatedFacts.set([]);
    
    this.catFactsService.getFacts(this.itemsPerPage(), this.currentPage()).subscribe({
      next: (data) => {
        this.factsResponse.set(data);
        
        // Si está en inglés, mostrar inmediatamente
        if (this.translationService.currentLanguage() === 'en') {
          this.translatedFacts.set(data.data);
          this.loading.set(false);
        } else {
          // Si está en español, marcar como traduciendo y esperar
          this.isTranslating.set(true);
          this.translateFacts(data.data);
        }
      },
      error: (err) => {
        this.error.set(this.translationService.t('error'));
        this.loading.set(false);
        this.isTranslating.set(false);
        console.error('Error loading facts:', err);
      }
    });
  }

  private translateFacts(facts: CatFact[]): void {
    // Traducir todos los hechos en paralelo
    const translations$ = facts.map(fact => 
      this.contentTranslation.translateContent(fact.fact)
    );

    forkJoin(translations$).subscribe({
      next: (translations) => {
        const translated: TranslatedFact[] = facts.map((fact, index) => ({
          ...fact,
          translatedText: translations[index]
        }));
        this.translatedFacts.set(translated);
        // Ahora sí, ocultar el loading después de traducir todo
        this.loading.set(false);
        this.isTranslating.set(false);
      },
      error: (err) => {
        console.error('Translation error:', err);
        // Si falla, mostrar los originales
        this.translatedFacts.set(facts);
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
    this.loadFacts();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  changeItemsPerPage(limit: number): void {
    this.itemsPerPage.set(limit);
    this.currentPage.set(1);
    this.loadFacts();
  }

  get totalPages(): number {
    return this.factsResponse()?.last_page || 0;
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
      range.unshift(-1); // Placeholder para "..."
    }
    if (current + delta < total - 1) {
      range.push(-1); // Placeholder para "..."
    }
    
    range.unshift(1);
    if (total > 1) {
      range.push(total);
    }
    
    return range;
  }
}

