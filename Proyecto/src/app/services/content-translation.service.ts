import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, catchError, map, timeout } from 'rxjs';
import { TranslationService } from './translation.service';

interface TranslationResponse {
  responseData: {
    translatedText: string;
  };
  responseStatus: number;
}

@Injectable({
  providedIn: 'root'
})
export class ContentTranslationService {
  private readonly http = inject(HttpClient);
  private readonly translationService = inject(TranslationService);
  
  private readonly translationApiUrl = 'https://api.mymemory.translated.net/get';
  private translationCache = new Map<string, string>();

  /**
   * Traduce un texto del inglés al español usando la API de MyMemory
   * Si falla o no está disponible, devuelve el texto original
   */
  translateContent(text: string): Observable<string> {
    // Si el idioma es inglés, devolver el texto original
    if (this.translationService.currentLanguage() === 'en') {
      return of(text);
    }

    const cacheKey = text.toLowerCase().trim();
    
    // Verificar caché
    if (this.translationCache.has(cacheKey)) {
      return of(this.translationCache.get(cacheKey)!);
    }

    // Llamar a la API de traducción
    const params = {
      q: text,
      langpair: 'en|es'
    };

    return this.http.get<TranslationResponse>(this.translationApiUrl, { params }).pipe(
      timeout(3000), // Timeout de 3 segundos
      map(response => {
        // Si la respuesta es válida
        if (response.responseStatus === 200 && 
            response.responseData?.translatedText &&
            !response.responseData.translatedText.includes('MYMEMORY WARNING')) {
          const translatedText = response.responseData.translatedText;
          this.translationCache.set(cacheKey, translatedText);
          return translatedText;
        }
        // Si hay error o límite alcanzado, devolver original
        return text;
      }),
      catchError(error => {
        // Si falla la API, devolver el texto original en inglés
        console.warn('Translation API unavailable, showing original text');
        return of(text);
      })
    );
  }

  /**
   * Traduce múltiples textos
   */
  translateMultiple(texts: string[]): Observable<string[]> {
    if (this.translationService.currentLanguage() === 'en') {
      return of(texts);
    }

    const translations = texts.map(text => this.translateContent(text));
    return of(texts); // Devolver originales para evitar problemas con forkJoin
  }
}

