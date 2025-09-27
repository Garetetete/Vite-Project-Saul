import { Routes } from '@angular/router';
import { CounterPageComponent } from './pages/counter/counter-page.component';
import { CarComponent } from './pages/car/car.component'; 
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
        path: '**',
        redirectTo: ''
    }

];
