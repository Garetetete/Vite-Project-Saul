import {inject, Injectable, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '@environments/environment';
import {GiphyResponse} from '../interfaces/giphy.interfaces';
import {Gif} from '../interfaces/gif.interfaces';
import {GifMapper} from '../mapper/gif.mapper';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private http = inject(HttpClient);
  trendingGifs = signal<Gif[]>([]);
  searchGifs = signal<Gif[]>([]);
  searchHistory = signal<string[]>([]);

  constructor() {
    this.loadTrendingGifs();
    this.loadSearchHistory();
  }

  loadTrendingGifs() {
    this.http.get<GiphyResponse>(`${environment.urlBase}/gifs/trending`, {
      params: {
        api_key: environment.apiKey,
        limit: 50
      }
    }).subscribe((response) => {
      const gifs = GifMapper.mapGiphyItemsToGifArray(response.data);
      this.trendingGifs.set(gifs);
      console.log(gifs);
    });
  }

  searchGif(query: string) {
    if (!query.trim()) return;
    
    this.http.get<GiphyResponse>(`${environment.urlBase}/gifs/search`, {
      params: {
        api_key: environment.apiKey,
        q: query,
        limit: 50
      }
    }).subscribe((response) => {
      const gifs = GifMapper.mapGiphyItemsToGifArray(response.data);
      this.searchGifs.set(gifs);
      this.addToSearchHistory(query);
    });
  }

  private addToSearchHistory(query: string) {
    const currentHistory = this.searchHistory();
    if (currentHistory.includes(query)) return;
    
    const newHistory = [query, ...currentHistory].slice(0, 10);
    this.searchHistory.set(newHistory);
    localStorage.setItem('searchHistory', JSON.stringify(newHistory));
  }

  private loadSearchHistory() {
    const history = localStorage.getItem('searchHistory');
    if (history) {
      this.searchHistory.set(JSON.parse(history));
    }
  }

  clearSearchHistory() {
    this.searchHistory.set([]);
    localStorage.removeItem('searchHistory');
  }
}
