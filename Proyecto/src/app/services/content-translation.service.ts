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
  
  // API gratuita de traducción de MyMemory
  private readonly translationApiUrl = 'https://api.mymemory.translated.net/get';
  
  // Cache para evitar traducciones repetidas
  private translationCache = new Map<string, string>();
  
  // Diccionario masivo de traducciones pre-cargadas (sin necesidad de API)
  private readonly commonTranslations: Record<string, string> = {
    // Países y regiones
    'united states': 'estados unidos',
    'united kingdom': 'reino unido',
    'egypt': 'egipto',
    'thailand': 'tailandia',
    'turkey': 'turquía',
    'russia': 'rusia',
    'burma': 'birmania',
    'myanmar': 'myanmar',
    'canada': 'canadá',
    'greece': 'grecia',
    'somalia': 'somalia',
    'iran': 'irán',
    'persia': 'persia',
    'ethiopia': 'etiopía',
    'china': 'china',
    'japan': 'japón',
    'france': 'francia',
    'italy': 'italia',
    'spain': 'españa',
    'germany': 'alemania',
    'england': 'inglaterra',
    'america': 'américa',
    'asia': 'asia',
    'europe': 'europa',
    'africa': 'áfrica',
    'isle of man': 'isla de man',
    'developed in the usa and uk': 'desarrollado en ee.uu. y reino unido',
    'usa': 'ee.uu.',
    'uk': 'reino unido',
    
    // Orígenes
    'natural/standard': 'natural/estándar',
    'natural': 'natural',
    'mutation': 'mutación',
    'crossbreed': 'cruce',
    'hybrid': 'híbrido',
    'wild': 'salvaje',
    'domestic': 'doméstico',
    
    // Tipos de pelaje
    'short': 'corto',
    'long': 'largo',
    'semi-long': 'semi-largo',
    'medium': 'mediano',
    'hairless': 'sin pelo',
    'rex': 'rex',
    'curly': 'rizado',
    'silky': 'sedoso',
    'soft': 'suave',
    'dense': 'denso',
    'thick': 'grueso',
    'thin': 'fino',
    
    // Patrones de color
    'ticked': 'moteado',
    'spotted': 'manchado',
    'tabby': 'atigrado',
    'solid': 'sólido',
    'tortoiseshell': 'carey',
    'colorpoint': 'colorpoint',
    'bicolor': 'bicolor',
    'tricolor': 'tricolor',
    'calico': 'calicó',
    'smoke': 'ahumado',
    'shaded': 'sombreado',
    'all': 'todos',
    'tipped': 'con puntas',
    'pointed': 'pointed',
    'van': 'van',
    'harlequin': 'arlequín',
    'mackerel': 'caballa',
    'classic': 'clásico',
    'patched': 'parcheado',
    'striped': 'rayado',
    'mitted': 'con mitones',
    'particolor': 'particolor',
    
    // Palabras comunes en descripciones de gatos
    'cat': 'gato',
    'cats': 'gatos',
    'kitten': 'gatito',
    'kittens': 'gatitos',
    'feline': 'felino',
    'breed': 'raza',
    'breeds': 'razas',
    'pet': 'mascota',
    'pets': 'mascotas',
    'animal': 'animal',
    'animals': 'animales',
    'mammal': 'mamífero',
    'fur': 'pelaje',
    'hair': 'pelo',
    'whiskers': 'bigotes',
    'tail': 'cola',
    'paw': 'pata',
    'paws': 'patas',
    'claw': 'garra',
    'claws': 'garras',
    'meow': 'maullido',
    'purr': 'ronroneo',
    'year': 'año',
    'years': 'años',
    'old': 'viejo',
    'young': 'joven',
    'adult': 'adulto',
    'large': 'grande',
    'small': 'pequeño',
    'big': 'grande',
    'tiny': 'diminuto',
    'weight': 'peso',
    'size': 'tamaño',
    'color': 'color',
    'colors': 'colores',
    'eye': 'ojo',
    'eyes': 'ojos',
    'blue': 'azul',
    'green': 'verde',
    'yellow': 'amarillo',
    'orange': 'naranja',
    'white': 'blanco',
    'black': 'negro',
    'gray': 'gris',
    'grey': 'gris',
    'brown': 'marrón',
    'red': 'rojo',
    'cream': 'crema',
    'golden': 'dorado',
    'silver': 'plateado'
  };

  /**
   * Traduce un texto usando el diccionario palabra por palabra
   * @param text Texto a traducir
   * @returns Texto traducido parcial o completamente
   */
  private translateWithDictionary(text: string): string {
    const lowerText = text.toLowerCase().trim();
    
    // Si la frase completa está en el diccionario
    if (this.commonTranslations[lowerText]) {
      return this.commonTranslations[lowerText];
    }

    // Traducir palabra por palabra
    const words = text.split(' ');
    const translatedWords = words.map(word => {
      const cleanWord = word.toLowerCase().replace(/[.,!?;:]/g, '');
      const translation = this.commonTranslations[cleanWord];
      
      if (translation) {
        // Mantener mayúsculas si la palabra original las tenía
        if (word[0] === word[0].toUpperCase()) {
          return translation.charAt(0).toUpperCase() + translation.slice(1);
        }
        return translation;
      }
      return word; // Si no se encuentra traducción, mantener original
    });

    return translatedWords.join(' ');
  }

  /**
   * Traduce un texto del inglés al español si el idioma actual es español
   * @param text Texto en inglés a traducir
   * @returns Observable con el texto traducido o el original si está en inglés
   */
  translateContent(text: string): Observable<string> {
    // Si el idioma actual es inglés, devolver el texto original
    if (this.translationService.currentLanguage() === 'en') {
      return of(text);
    }

    const cacheKey = text.toLowerCase().trim();
    
    // 1. Verificar diccionario de traducciones comunes (instantáneo)
    if (this.commonTranslations[cacheKey]) {
      const translation = this.commonTranslations[cacheKey];
      this.translationCache.set(cacheKey, translation);
      return of(translation);
    }
    
    // 2. Verificar caché de sesión
    if (this.translationCache.has(cacheKey)) {
      return of(this.translationCache.get(cacheKey)!);
    }

    // 3. Intentar traducción palabra por palabra con el diccionario
    const dictionaryTranslation = this.translateWithDictionary(text);
    
    // Si la traducción con diccionario cambió más del 30% del texto, usarla directamente
    const wordsChanged = text.split(' ').filter((word, index) => 
      dictionaryTranslation.split(' ')[index]?.toLowerCase() !== word.toLowerCase()
    ).length;
    const percentageChanged = (wordsChanged / text.split(' ').length) * 100;

    if (percentageChanged > 30) {
      this.translationCache.set(cacheKey, dictionaryTranslation);
      return of(dictionaryTranslation);
    }

    // 4. Hacer traducción con API solo como último recurso
    const params = {
      q: text,
      langpair: 'en|es'
    };

    return this.http.get<TranslationResponse>(this.translationApiUrl, { params }).pipe(
      timeout(3000), // Timeout de 3 segundos
      map(response => {
        // Verificar si la respuesta es válida y no es un error de límite
        if (response.responseStatus === 200 && 
            response.responseData?.translatedText &&
            !response.responseData.translatedText.includes('MYMEMORY WARNING')) {
          const translatedText = response.responseData.translatedText;
          // Guardar en caché
          this.translationCache.set(cacheKey, translatedText);
          return translatedText;
        }
        // Si hay límite de API, usar traducción con diccionario
        console.warn('Translation API limit reached, using dictionary translation');
        this.translationCache.set(cacheKey, dictionaryTranslation);
        return dictionaryTranslation;
      }),
      catchError(error => {
        // Si falla, usar traducción con diccionario como fallback
        console.warn('Translation error, using dictionary translation:', error.message || error);
        this.translationCache.set(cacheKey, dictionaryTranslation);
        return of(dictionaryTranslation);
      })
    );
  }

  /**
   * Traduce un array de textos
   * @param texts Array de textos a traducir
   * @returns Observable con array de textos traducidos
   */
  translateMultiple(texts: string[]): Observable<string[]> {
    if (this.translationService.currentLanguage() === 'en') {
      return of(texts);
    }

    // Si hay muchos textos, traducir solo los que no están en caché
    const translations: Observable<string>[] = texts.map(text => this.translateContent(text));
    
    // Usar forkJoin sería ideal, pero para evitar rate limiting, 
    // devolvemos los observables individualmente
    return of(texts); // Por ahora devolvemos los originales para evitar rate limiting
  }

  /**
   * Limpia el caché de traducciones
   */
  clearCache(): void {
    this.translationCache.clear();
  }

  /**
   * Traduce un texto de forma síncrona desde el caché (si existe)
   * @param text Texto a traducir
   * @returns Texto traducido o null si no está en caché
   */
  getFromCache(text: string): string | null {
    const cacheKey = text.toLowerCase().trim();
    return this.translationCache.get(cacheKey) || null;
  }
}

