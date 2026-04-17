import { Routes } from '@angular/router';
import { authGuard } from './auth-guard';

export const routes: Routes = [
  { 
    path: 'login', 
    loadComponent: () => import('./auth/login/login').then(m => m.LoginComponent)
  },
  { 
    path: '', 
    loadComponent: () => import('./layout/layout').then(m => m.LayoutComponent), 
    canActivate: [authGuard], 
    children: [
      // 1. Specific feature paths go FIRST
      { 
        path: 'dashboard', 
        loadComponent: () => import('./dashboard/dashboard').then(m => m.Dashboard), 
        canActivate: [authGuard] 
      },
      { 
        path: 'leads', 
        loadComponent: () => import('./leads/lead-list/lead-list').then(m => m.LeadList), 
        canActivate: [authGuard] 
      },
      
      // 2. Empty path redirects to dashboard if logged in
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      
      // 3. Wildcard MUST be at the very bottom
      { path: '**', redirectTo: 'dashboard' } 
    ]
  }
];
