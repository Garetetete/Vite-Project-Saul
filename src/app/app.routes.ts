import { Routes } from '@angular/router';
import { CounterPageComponent } from './pages/counter/counter-page.component';
import { CarComponent } from './pages/car/car.component'; 
import { DragonballComponent } from './pages/dragonball/dragonball.component';
import { DragonballSuperComponent } from './pages/dragonball-super/dragonball-super.component';
import { ProgramsPageComponent } from './pages/programs/programs-page.component';
export const routes: Routes = [
    // 1. Route for the default path (http://your-app-url/)
    {
        path: '', 
        component: CounterPageComponent // Or any other component for the home page
    },
    // 2. Route for the '/car' path (http://your-app-url/car)
    {
        path: 'car', 
        component: CarComponent // It would make more sense to map to the CarComponent
    },

        {
        path: 'dragonball', 
        component: DragonballComponent
    },

    {
        path: 'dragonball-super', 
        component: DragonballSuperComponent
    },

    {
        path: 'programs', 
        component: ProgramsPageComponent
    },

    {
        path: '**',
        redirectTo: ''
    }

];
