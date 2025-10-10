import { Routes } from '@angular/router';
import { CounterPageComponent } from './pages/counter/counter-page.component';
import { CarComponent } from './pages/car/car.component'; 
import { DragonballComponent } from './pages/dragonball/dragonball.component';

export const routes: Routes = [
    // 1. Route for the default path
    {
        path: '', 
        component: CounterPageComponent
    },
    
    // 2. Route for the '/car' path - ACTIVIDAD 1
    {
        path: 'car', 
        component: CarComponent
    },

    {
        path: 'dragonball', 
        component: DragonballComponent
    },

    {
        path: '**',
        redirectTo: ''
    }
];



