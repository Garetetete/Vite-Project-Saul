import { Component, OnInit, inject, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatFactsService } from '../../../services/cat-facts.service';
import { CatFact } from '../../../models/cat-fact.model';
import { TranslationService } from '../../../services/translation.service';
import { ContentTranslationService } from '../../../services/content-translation.service';
import { CatImagesService } from '../../../services/cat-images.service';

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
  private catImagesService = inject(CatImagesService);
  
  fact = signal<CatFact | null>(null);
  translatedFact = signal<string>('');
  catImage = signal<string>('');
  loading = signal<boolean>(false);
  error = signal<string | null>(null);

  constructor() {
    // Cuando cambia el idioma, re-traducir el hecho actual
    effect(() => {
      const currentLang = this.translationService.currentLanguage();
      const currentFact = this.fact();
      
      if (currentFact) {
        if (currentLang === 'en') {
          this.translatedFact.set(currentFact.fact);
        } else {
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
    this.error.set(null);
    
    // Cargar imagen aleatoria
    this.catImagesService.getRandomImage().subscribe({
      next: (imageUrl) => {
        this.catImage.set(imageUrl);
      },
      error: (err) => {
        console.error('Error loading cat image:', err);
      }
    });
    
    this.catFactsService.getRandomFact().subscribe({
      next: (data) => {
        this.fact.set(data);
        
        if (this.translationService.currentLanguage() === 'en') {
          this.translatedFact.set(data.fact);
          this.loading.set(false);
        } else {
          this.translateFactContent(data.fact);
        }
      },
      error: (err) => {
        this.error.set(this.translationService.t('error'));
        this.loading.set(false);
        console.error('Error loading fact:', err);
      }
    });
  }

  private translateFactContent(text: string): void {
    this.contentTranslation.translateContent(text).subscribe({
      next: (translated) => {
        this.translatedFact.set(translated);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Translation error:', err);
        this.translatedFact.set(text); // Usar original si falla
        this.loading.set(false);
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
