import { Routes } from '@angular/router';
import { ProgramsPageComponent } from './pages/programs/programs-page.component';

export const routes: Routes = [
    {
        path: '', 
        component: ProgramsPageComponent
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
