import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GifsService } from '../../services/gifs.service';
import { GifListComponent } from '../../components/gif-list/gif-list.component';

@Component({
  selector: 'app-search-page',
  imports: [FormsModule, GifListComponent],
  templateUrl: './search-page.component.html',
  styles: ``
})
export default class SearchPageComponent {
  gifService = inject(GifsService);
  searchQuery = '';

  onSearch() {
    if (this.searchQuery.trim()) {
      this.gifService.searchGif(this.searchQuery);
    }
  }

  onSearchFromHistory(query: string) {
    this.searchQuery = query;
    this.gifService.searchGif(query);
  }

  clearHistory() {
    this.gifService.clearSearchHistory();
  }
}
