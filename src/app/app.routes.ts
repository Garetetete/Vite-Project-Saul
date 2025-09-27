import { Routes } from '@angular/router';
import { CounterPageComponent } from './pages/counter/counter-page.component';

export const routes: Routes = [
    {
        path: '', // <-- 'path' y usa comillas para el valor del string
        component: CounterPageComponent
    }
];
