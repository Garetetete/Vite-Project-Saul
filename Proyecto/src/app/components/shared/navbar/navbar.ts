import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive  } from '@angular/router';
import { TranslationService } from '../../../services/translation.service';

@Component({
  standalone: true,
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css']
})
export class Navbar {
  translationService = inject(TranslationService);

  toggleLanguage(): void {
    this.translationService.toggleLanguage();
  }

  get currentLang(): string {
    return this.translationService.currentLanguage();
  }

  get t() {
    return this.translationService.translations();
  }
}

