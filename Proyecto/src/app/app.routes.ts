import { Routes } from '@angular/router';
import { RandomFactComponent } from './pages/cat-facts/random-fact/random-fact.component';
import { FactsListComponent } from './pages/cat-facts/facts-list/facts-list.component';
import { BreedsListComponent } from './pages/cat-facts/breeds-list/breeds-list.component';
import { BreedExplorerComponent } from './pages/cat-facts/breed-explorer/breed-explorer.component';

export const routes: Routes = [
    // Página principal - Hecho aleatorio
    {
        path: '', 
        component: RandomFactComponent
    },
    // Ruta para hechos aleatorios
    {
        path: 'random-fact', 
        component: RandomFactComponent
    },
    // Ruta para lista de hechos
    {
        path: 'facts-list', 
        component: FactsListComponent
    },
    // Ruta para lista de razas
    {
        path: 'breeds', 
        component: BreedsListComponent
    },
    // Ruta para explorador de razas
    {
        path: 'breed-explorer', 
        component: BreedExplorerComponent
    },
    // Redirección de rutas no encontradas
    {
        path: '**',
        redirectTo: ''
    }
];
