import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
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
import Chart from 'chart.js/auto';
import { FormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatOption } from "@angular/material/select";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatGridListModule,
    MatCardModule,
    MatTableModule,
    MatInputModule,
    MatChipsModule,
    RouterLink,
    FormsModule,
    MatProgressSpinnerModule
],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit, AfterViewInit {

  // ===================== DATA =====================
  dashboardData: any;
  companies: any[] = [];

  // ===================== FILTERS =====================
  selectedCompany: any = '';
  startDate: string = '';
  endDate: string = '';
  loading = false;

  // ===================== CHARTS =====================
  pieChart: any;
  barChart: any;
  lineChart: any;

  constructor(
    private dashboardService: DashboardServiceTs,
    private cd: ChangeDetectorRef
  ) {}

  // ===================== LIFECYCLE =====================
  ngOnInit(): void {
    this.loadDashboard();
  }

  ngAfterViewInit(): void {}

  // ===================== API =====================
  loadDashboard() {
    this.dashboardService.getDashboard().subscribe({
      next: (res) => {
        this.dashboardData = res;
        this.cd.markForCheck();

        // render charts after DOM ready
        setTimeout(() => {
          this.loadCharts();
        }, 200);
      },
      error: (err) => {
        console.error("Dashboard load error:", err);
      }
    });
  }

  applyFilters() {
    this.loading = true;

    const payload = {
      companyId: this.selectedCompany || null,
      startDate: this.startDate || null,
      endDate: this.endDate || null
    };

    this.dashboardService.getDashboardWithFilter(payload)
      .subscribe({
        next: (res) => {
          this.dashboardData = res;
          this.loading = false;

          setTimeout(() => {
            this.loadCharts();
          }, 100);
        },
        error: () => {
          this.loading = false;
        }
      });
  }

  // ===================== CHARTS =====================
  loadCharts() {

    if (!this.dashboardData) return;

    // destroy old charts
    if (this.pieChart) this.pieChart.destroy();
    if (this.barChart) this.barChart.destroy();
    if (this.lineChart) this.lineChart.destroy();

    // PIE CHART
    const pieCtx: any = document.getElementById('pieChart');

    this.pieChart = new Chart(pieCtx, {
      type: 'doughnut',
      data: {
        labels: ['New', 'Converted', 'Lost'],
        datasets: [{
          data: [
            this.dashboardData.newLeads || 0,
            this.dashboardData.convertedLeads || 0,
            this.dashboardData.lostLeads || 0
          ],
          backgroundColor: ['#6366f1', '#22c55e', '#ef4444']
        }]
      }
    });

    // BAR CHART
    const barCtx: any = document.getElementById('barChart');

    this.barChart = new Chart(barCtx, {
      type: 'bar',
      data: {
        labels: ['Total', 'New', 'Converted'],
        datasets: [{
          label: 'Leads',
          data: [
            this.dashboardData.totalLeads || 0,
            this.dashboardData.newLeads || 0,
            this.dashboardData.convertedLeads || 0
          ],
          backgroundColor: '#3b82f6'
        }]
      }
    });

    // LINE CHART
    const lineCtx: any = document.getElementById('lineChart');

    const months = Object.keys(this.dashboardData.monthlyLeads || {});
    const values = Object.values(this.dashboardData.monthlyLeads || {});

    this.lineChart = new Chart(lineCtx, {
      type: 'line',
      data: {
        labels: months,
        datasets: [{
          label: 'Monthly Leads',
          data: values,
          borderColor: '#6366f1',
          fill: false,
          tension: 0.4,   // ⭐ THIS FIXES STRAIGHT LINE
          pointRadius: 4,
          pointHoverRadius: 6
        }]
      },
      options: {
    animation: {
      duration: 1500
    },
    plugins: {
      legend: {
        display: true
      }
    }
  }
    });
  }

  // ===================== FILTER METHODS =====================

  onFilterChange() {
    this.applyFilters();
  }

  resetFilters() {
    this.selectedCompany = '';
    this.startDate = '';
    this.endDate = '';
    this.loadDashboard();
  }

  setToday() {
    const today = new Date().toISOString().split('T')[0];
    this.startDate = today;
    this.endDate = today;
    this.applyFilters();
  }

  setLast7Days() {
    const today = new Date();
    const past = new Date();
    past.setDate(today.getDate() - 7);

    this.startDate = past.toISOString().split('T')[0];
    this.endDate = today.toISOString().split('T')[0];

    this.applyFilters();
  }

  setLast30Days() {
    const today = new Date();
    const past = new Date();
    past.setDate(today.getDate() - 30);

    this.startDate = past.toISOString().split('T')[0];
    this.endDate = today.toISOString().split('T')[0];

    this.applyFilters();
  }
}