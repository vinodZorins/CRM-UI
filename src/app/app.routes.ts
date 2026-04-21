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
      // Specific feature paths go FIRST
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

      {
        path: 'lead-form/:id',
        loadComponent: () => import('./leads/lead-form/lead-form').then(m => m.LeadForm),
        canActivate: [authGuard]
      },

      {
        path: 'lead-form',
        loadComponent: () => import('./leads/lead-form/lead-form').then(m => m.LeadForm),
        canActivate: [authGuard]
      },
      
      {
        path: 'users',
        loadComponent: () => import('./users/user-list/user-list').then(m => m.UserList),
        canActivate: [authGuard]
      },

      {
        path: 'company',
        loadComponent: () => import('./company/company-list/company-list').then(m => m.CompanyList),
        canActivate: [authGuard]
      },
      
      // Empty path redirects to dashboard if logged in
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      
      // Wildcard MUST be at the very bottom
      { path: '**', redirectTo: 'dashboard' } 
    ]
  }
];
