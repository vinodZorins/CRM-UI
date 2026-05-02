import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, Router, RouterLinkActive } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';
import { MatMenuModule } from '@angular/material/menu';
import { LoaderService } from '../interceptors/loader.service';


type ModuleKey = 'home' | 'sales' | 'marketing' | 'support';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterLink, RouterOutlet,
    CommonModule, MatSidenavModule, MatToolbarModule,
    MatListModule, MatIconModule, MatButtonModule,
    MatCardModule, MatTableModule, MatInputModule, MatChipsModule, RouterLinkActive,
    MatMenuModule],
  templateUrl: './layout.html',
  styleUrl: './layout.css',
})
export class LayoutComponent {

  isCollapsed = false;

  modules: Record<ModuleKey, boolean> = {
    home: true,
    sales: true,
    marketing: true,
    support: true
  };

  constructor(private router: Router,
              private loader: LoaderService
  ) {}

toggleModule(module: ModuleKey) {
  this.modules[module] = !this.modules[module];
}

   toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
    console.log('Sidebar:', this.isCollapsed); // debug
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
