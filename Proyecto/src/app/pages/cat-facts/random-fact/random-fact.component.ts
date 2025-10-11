import { Component, OnInit, inject, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatFactsService } from '../../../services/cat-facts.service';
import { CatFact } from '../../../models/cat-fact.model';
import { TranslationService } from '../../../services/translation.service';
import { ContentTranslationService } from '../../../services/content-translation.service';

@Component({
  selector: 'app-random-fact',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './random-fact.component.html',
  styleUrls: ['./random-fact.component.css']
})
export class RandomFactComponent implements OnInit {
  private catFactsService = inject(CatFactsService);
  translationService = inject(TranslationService);
  private contentTranslation = inject(ContentTranslationService);
  
  fact = signal<CatFact | null>(null);
  translatedFact = signal<string>('');
  loading = signal<boolean>(false);
  error = signal<string | null>(null);
  isTranslating = signal<boolean>(false);

  constructor() {
    // Cuando cambia el idioma, re-traducir el hecho actual
    effect(() => {
      const currentLang = this.translationService.currentLanguage();
      const currentFact = this.fact();
      
      if (currentFact) {
        if (currentLang === 'en') {
          // Si cambió a inglés, mostrar el original inmediatamente
          this.translatedFact.set(currentFact.fact);
        } else {
          // Si cambió a español, traducir
          this.translateFactContent(currentFact.fact);
        }
      }
    });
  }

  ngOnInit(): void {
    this.loadRandomFact();
  }

  loadRandomFact(): void {
    this.loading.set(true);
    this.isTranslating.set(false);
    this.error.set(null);
    // Limpiar el hecho anterior para evitar mostrar contenido viejo
    this.translatedFact.set('');
    
    this.catFactsService.getRandomFact().subscribe({
      next: (data) => {
        this.fact.set(data);
        
        // Si está en inglés, mostrar inmediatamente
        if (this.translationService.currentLanguage() === 'en') {
          this.translatedFact.set(data.fact);
          this.loading.set(false);
        } else {
          // Si está en español, marcar como traduciendo y esperar
          this.isTranslating.set(true);
          this.translateFactContent(data.fact);
        }
      },
      error: (err) => {
        this.error.set(this.translationService.t('error'));
        this.loading.set(false);
        this.isTranslating.set(false);
        console.error('Error loading fact:', err);
      }
    });
  }

  private translateFactContent(text: string): void {
    this.contentTranslation.translateContent(text).subscribe({
      next: (translated) => {
        this.translatedFact.set(translated);
        // Ahora sí, ocultar el loading después de traducir
        this.loading.set(false);
        this.isTranslating.set(false);
      },
      error: (err) => {
        console.error('Translation error:', err);
        // Si falla la traducción, mostrar el original
        this.translatedFact.set(text);
        this.loading.set(false);
        this.isTranslating.set(false);
      }
    });
  }

  getNewFact(): void {
    this.loadRandomFact();
  }

  get t() {
    return this.translationService.translations();
  }
}

