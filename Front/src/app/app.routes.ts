import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'game1',
    pathMatch: 'full'
  },
  {
    path: 'game1',
    loadComponent: () => import('./Components/Game/game1/game1.component').then(m => m.Game1Component)
  },
  {
    path: 'game2',
    loadComponent: () => import('./Components/Game/game2/game2.component').then(m => m.Game2Component)
  },
  {
    path: 'game3',
    loadComponent: () => import('./Components/Game/game3/game3.component').then(m => m.Game3Component)
  },
  {
    path: 'tech-memory',
    loadComponent: () => import('./Components/Game/tech-memory/tech-memory.component').then(m => m.TechMemoryComponent)
  },
  {
    path: 'computer-assembly',
    loadComponent: () => import('./Components/Game/computer-assembly/computer-assembly.component').then(m => m.ComputerAssemblyComponent)
  },
  {
    path: 'game6',
    loadComponent: () => import('./Components/Game/game6/game6.component').then(m => m.Game6Component)
  },

];
