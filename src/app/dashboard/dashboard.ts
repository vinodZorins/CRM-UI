import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
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
import { CommonModule } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { DashboardServiceTs } from './dashboard.service.ts';
import { MatProgressSpinner } from "@angular/material/progress-spinner";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MatSidenavModule, MatToolbarModule,
    MatListModule, MatIconModule, MatButtonModule, MatGridListModule,
    MatCardModule, MatTableModule, MatInputModule, MatChipsModule, RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {

  dashboardData: any;
  constructor(private dashboardService: DashboardServiceTs, private cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    console.log("Dashboard Int called");

    this.dashboardService.getDashboard().subscribe({
      next: (res) => {
        console.log("Dashboard Data: ", res);
        this.dashboardData = res;
        this.cd.markForCheck();
      },
      error: (err) => {
        console.error("Error fetching dashboard data: ", err);
      }
    });
  }
}
