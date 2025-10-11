import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export interface CatImage {
  id: string;
  url: string;
  width: number;
  height: number;
}

@Injectable({
  providedIn: 'root'
})
export class CatImagesService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'https://api.thecatapi.com/v1/images/search';
  
  // Fallback images en caso de error de API
  private readonly fallbackImages = [
    'https://cdn2.thecatapi.com/images/0XYvRd7oD.jpg',
    'https://cdn2.thecatapi.com/images/MTY3ODIyMQ.jpg',
    'https://cdn2.thecatapi.com/images/ebv.jpg',
  ];

  /**
   * Obtiene una imagen aleatoria de gato
   */
  getRandomImage(): Observable<string> {
    return this.http.get<CatImage[]>(this.apiUrl).pipe(
      map(images => images && images.length > 0 ? images[0].url : this.getRandomFallback()),
      catchError(() => of(this.getRandomFallback()))
    );
  }

  /**
   * Obtiene múltiples imágenes aleatorias
   */
  getMultipleImages(count: number = 3): Observable<string[]> {
    return this.http.get<CatImage[]>(`${this.apiUrl}?limit=${count}`).pipe(
      map(images => images && images.length > 0 
        ? images.map(img => img.url) 
        : this.fallbackImages.slice(0, count)
      ),
      catchError(() => of(this.fallbackImages.slice(0, count)))
    );
  }

  /**
   * Retorna una imagen de fallback aleatoria
   */
  private getRandomFallback(): string {
    return this.fallbackImages[Math.floor(Math.random() * this.fallbackImages.length)];
  }
}

