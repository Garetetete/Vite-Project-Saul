import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CatFact, CatFactsResponse } from '../models/cat-fact.model';
import { CatBreedsResponse } from '../models/cat-breed.model';

@Injectable({
  providedIn: 'root'
})
export class CatFactsService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'https://catfact.ninja';

  /**
   * Obtiene un hecho aleatorio sobre gatos
   * Endpoint: GET /fact
   */
  getRandomFact(): Observable<CatFact> {
    return this.http.get<CatFact>(`${this.apiUrl}/fact`);
  }

  /**
   * Obtiene una lista paginada de hechos sobre gatos
   * Endpoint: GET /facts
   * @param limit - Número máximo de resultados por página (default: 10)
   * @param page - Número de página a obtener (default: 1)
   */
  getFacts(limit: number = 10, page: number = 1): Observable<CatFactsResponse> {
    const params = new HttpParams()
      .set('limit', limit.toString())
      .set('page', page.toString());
    
    return this.http.get<CatFactsResponse>(`${this.apiUrl}/facts`, { params });
  }

  /**
   * Obtiene una lista paginada de razas de gatos
   * Endpoint: GET /breeds
   * @param limit - Número máximo de resultados por página (default: 10)
   * @param page - Número de página a obtener (default: 1)
   */
  getBreeds(limit: number = 10, page: number = 1): Observable<CatBreedsResponse> {
    const params = new HttpParams()
      .set('limit', limit.toString())
      .set('page', page.toString());
    
    return this.http.get<CatBreedsResponse>(`${this.apiUrl}/breeds`, { params });
  }
}

