import { Routes } from '@angular/router';
import { RegisterComponent } from './Components/Screens/register/register.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
    {
    path: 'home',
    component: RegisterComponent
  },
  {
    path: 'tech-memory',
    loadComponent: () => import('./Components/Screens/Game/tech-memory/tech-memory.component').then(m => m.TechMemoryComponent)
  },
  {
    path: 'kids',
    loadComponent: () => import('./Components/Views/kids/kids.component').then(m => m.KidsComponent)
  },
  {
    path: 'junior',
    loadComponent: () => import('./Components/Views/junior/junior.component').then(m => m.JuniorComponent)
  }

];
