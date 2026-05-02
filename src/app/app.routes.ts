import { Routes } from '@angular/router';
import { authGuard } from './auth-guard';
import { TechnicianDashboard } from './tickets/technician-dashboard/technician-dashboard';

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
        path: 'customer',
        loadComponent: () => import('./customer/customer-list/customer-list').then(m => m.Customer),
        canActivate: [authGuard]
      },

      {
        path: 'customer-form',
        loadComponent: () => import('./customer/customer-form/customer-form').then(m => m.CustomerForm),
        canActivate: [authGuard]
      },

      {
        path: 'customer-form/:id',
        loadComponent: () => import('./customer/customer-form/customer-form').then(m => m.CustomerForm),
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

      {
        path: 'deals',
        loadComponent: () => import('./deals/deal-list/deal-list').then(m => m.DealList),
        canActivate: [authGuard]
      },

      {
        path: 'deal-form',
        loadComponent: () => import('./deals/deal-form/deal-form').then(m => m.DealForm),
        canActivate: [authGuard]
      },

      {
        path: 'deal-kanban',
        loadComponent: () => import('./deals/deal-kanban/deal-kanban').then(m => m.DealKanban),
        canActivate: [authGuard]
      },
      
      {
        path: 'deal-form/:id',
        loadComponent: () => import('./deals/deal-form/deal-form').then(m => m.DealForm),
        canActivate: [authGuard]
      },

      {
        path: 'tickets',
        loadComponent: () => import('./tickets/ticket-list/ticket-list').then(m => m.TicketList),
        canActivate: [authGuard]
      },

      {
        path: 'ticket-form',
        loadComponent: () => import('./tickets/ticket-form/ticket-form').then(m => m.TicketForm),
        canActivate: [authGuard]
      },

      {
        path: 'ticket-form/:id',
        loadComponent: () => import('./tickets/ticket-form/ticket-form').then(m => m.TicketForm),
        canActivate: [authGuard]
      },

      {
        path: 'ticket-kanban',
        loadComponent: () =>import('./tickets/ticket-kanban/ticket-kanban').then(m => m.TicketKanban),
        canActivate: [authGuard]
      },

      {
        path: 'technician-dashboard',
        component: TechnicianDashboard,
        canActivate: [authGuard]
      },

      // Empty path redirects to dashboard if logged in
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      
      { path: '**', redirectTo: 'dashboard' } 
    ]
  }
];
