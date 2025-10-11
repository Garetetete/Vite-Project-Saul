import { Injectable, signal, effect } from '@angular/core';

export type Language = 'es' | 'en';

export interface Translations {
  // Navbar
  appTitle: string;
  randomFact: string;
  factsList: string;
  breeds: string;

  // Random Fact Page
  randomFactTitle: string;
  randomFactSubtitle: string;
  loading: string;
  loadingFact: string;
  error: string;
  characters: string;
  getAnotherFact: string;
  funFact: string;
  funFactInfo: string;

  // Facts List Page
  factsListTitle: string;
  factsListSubtitle: string;
  factsPerPage: string;
  total: string;
  facts: string;
  loadingFacts: string;
  previous: string;
  next: string;
  page: string;
  of: string;

  // Breeds Page
  breedsTitle: string;
  breedsSubtitle: string;
  searchBreed: string;
  searchPlaceholder: string;
  breedsPerPage: string;
  totalBreeds: string;
  loadingBreeds: string;
  noResults: string;
  country: string;
  origin: string;
  coat: string;
  pattern: string;

  // Breed Explorer Page
  breedExplorerTitle: string;
  breedExplorerSubtitle: string;
  topCountry: string;
  coatTypes: string;
  patterns: string;
  viewDetails: string;
  close: string;
  breedExplorer: string;
}

const translations: Record<Language, Translations> = {
  es: {
    // Navbar
    appTitle: 'Cat Facts App',
    randomFact: 'Hecho Aleatorio',
    factsList: 'Lista de Hechos',
    breeds: 'Razas de Gatos',

    // Random Fact Page
    randomFactTitle: 'Hecho Aleatorio sobre Gatos',
    randomFactSubtitle: 'Descubre datos curiosos y fascinantes sobre nuestros amigos felinos',
    loading: 'Cargando',
    loadingFact: 'Cargando hecho...',
    error: 'Error al cargar el hecho. Por favor, intenta de nuevo.',
    characters: 'caracteres',
    getAnotherFact: 'Obtener Otro Hecho',
    funFact: 'Dato Curioso',
    funFactInfo: 'Los gatos son animales fascinantes con más de 10,000 años de historia junto a los humanos. Cada uno de estos datos te ayudará a conocer mejor a estos increíbles felinos.',

    // Facts List Page
    factsListTitle: 'Catálogo de Hechos sobre Gatos',
    factsListSubtitle: 'Explora nuestra extensa colección de datos curiosos sobre felinos',
    factsPerPage: 'Hechos por página:',
    total: 'Total',
    facts: 'hechos',
    loadingFacts: 'Cargando hechos...',
    previous: 'Anterior',
    next: 'Siguiente',
    page: 'Página',
    of: 'de',

    // Breeds Page
    breedsTitle: 'Razas de Gatos del Mundo',
    breedsSubtitle: 'Descubre las características únicas de cada raza felina',
    searchBreed: 'Buscar raza:',
    searchPlaceholder: 'Buscar por nombre, país, origen...',
    breedsPerPage: 'Razas por página:',
    totalBreeds: 'Total de Razas',
    loadingBreeds: 'Cargando razas...',
    noResults: 'No se encontraron razas que coincidan con tu búsqueda.',
    country: 'País',
    origin: 'Origen',
    coat: 'Pelaje',
    pattern: 'Patrón',

    // Breed Explorer Page
    breedExplorerTitle: 'Explorador de Razas Felinas',
    breedExplorerSubtitle: 'Descubre todas las razas de gatos en un formato visual e interactivo',
    topCountry: 'País Principal',
    coatTypes: 'Tipos de Pelaje',
    patterns: 'Patrones',
    viewDetails: 'Ver Detalles',
    close: 'Cerrar',
    breedExplorer: 'Explorador de Razas',
  },
  en: {
    // Navbar
    appTitle: 'Cat Facts App',
    randomFact: 'Random Fact',
    factsList: 'Facts List',
    breeds: 'Cat Breeds',

    // Random Fact Page
    randomFactTitle: 'Random Cat Fact',
    randomFactSubtitle: 'Discover curious and fascinating facts about our feline friends',
    loading: 'Loading',
    loadingFact: 'Loading fact...',
    error: 'Error loading fact. Please try again.',
    characters: 'characters',
    getAnotherFact: 'Get Another Fact',
    funFact: 'Fun Fact',
    funFactInfo: 'Cats are fascinating animals with over 10,000 years of history alongside humans. Each of these facts will help you better understand these incredible felines.',

    // Facts List Page
    factsListTitle: 'Cat Facts Catalog',
    factsListSubtitle: 'Explore our extensive collection of curious feline facts',
    factsPerPage: 'Facts per page:',
    total: 'Total',
    facts: 'facts',
    loadingFacts: 'Loading facts...',
    previous: 'Previous',
    next: 'Next',
    page: 'Page',
    of: 'of',

    // Breeds Page
    breedsTitle: 'Cat Breeds of the World',
    breedsSubtitle: 'Discover the unique characteristics of each feline breed',
    searchBreed: 'Search breed:',
    searchPlaceholder: 'Search by name, country, origin...',
    breedsPerPage: 'Breeds per page:',
    totalBreeds: 'Total Breeds',
    loadingBreeds: 'Loading breeds...',
    noResults: 'No breeds found matching your search.',
    country: 'Country',
    origin: 'Origin',
    coat: 'Coat',
    pattern: 'Pattern',

    // Breed Explorer Page
    breedExplorerTitle: 'Feline Breeds Explorer',
    breedExplorerSubtitle: 'Discover all cat breeds in a visual and interactive format',
    topCountry: 'Top Country',
    coatTypes: 'Coat Types',
    patterns: 'Patterns',
    viewDetails: 'View Details',
    close: 'Close',
    breedExplorer: 'Breed Explorer',
  }
};

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  private readonly STORAGE_KEY = 'cat-facts-language';
  
  currentLanguage = signal<Language>(this.getStoredLanguage());
  translations = signal<Translations>(translations[this.currentLanguage()]);

  constructor() {
    // Actualizar traducciones cuando cambia el idioma
    effect(() => {
      const lang = this.currentLanguage();
      this.translations.set(translations[lang]);
      localStorage.setItem(this.STORAGE_KEY, lang);
    });
  }

  private getStoredLanguage(): Language {
    const stored = localStorage.getItem(this.STORAGE_KEY) as Language;
    return stored || 'es'; // Español por defecto
  }

  toggleLanguage(): void {
    const newLang: Language = this.currentLanguage() === 'es' ? 'en' : 'es';
    this.currentLanguage.set(newLang);
  }

  setLanguage(lang: Language): void {
    this.currentLanguage.set(lang);
  }

  t(key: keyof Translations): string {
    return this.translations()[key];
  }
}

