import { ChangeDetectorRef, Component, NgModule, OnInit } from '@angular/core';
import { DealService } from '../deal.service';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCellDef, MatHeaderCellDef, MatHeaderRow, MatHeaderRowDef, MatRowDef, MatTableModule } from '@angular/material/table';
import { Chart, registerables } from 'chart.js';
import { Deal } from '../deal.model';

@Component({
  selector: 'app-deal-list',
  standalone: true,
  imports: [FormsModule,
            RouterLink,
            MatButtonModule,
            CommonModule,
            RouterModule,
            CommonModule,
            FormsModule,
            MatFormFieldModule,
            MatInputModule,
            MatSelectModule,
            MatButtonModule,
            MatIconModule,
            MatCardModule,
            MatHeaderCellDef,
            MatCellDef,
            MatHeaderRow,
            MatRowDef,
            MatHeaderRowDef,
            MatTableModule,
  ],
  templateUrl: './deal-list.html',
  styleUrl: './deal-list.css',
})
export class DealList implements OnInit {

  displayedColumns: string[] = ['title', 'customer', 'amount', 'stage', 'actions'];

  totalDeals = 0;
  wonDealsCount = 0;
  totalRevenue = 0;

    deals: any[] = [];

    // FILTERS
    search = '';
    stage = '';
    page = 0;
    size = 10;

    constructor(private dealService: DealService
    ) {}

    ngOnInit() {
      Chart.register(...registerables); 
      this.loadDeals();
    }

    loadDeals(): void {
      const params = {
        page: this.page,
        size: this.size,
        search: this.search,
        stage: this.stage,
        sortBy: 'id',
        direction: 'desc'
      };

      this.dealService.getDeals(params).subscribe(res => {
        console.log("Customer Data ", res)
        const data = res?.content || [];
        this.deals = data;

        this.totalDeals = data.length;

        this.wonDealsCount = data.filter((d: Deal) => d.stage === 'WON').length;

       this.totalRevenue = data
        .filter((d: Deal) => d.stage === 'WON')
        .reduce((sum: number, d: Deal) => sum + (d.amount || 0), 0);

        this.renderCharts(data);
      });
    }

    onFilterChange() {
      this.page = 0;
      this.loadDeals();
    }

    deleteDeal(id: number) {
      this.dealService.delete(id).subscribe(() => {
        this.loadDeals();
      });
    }

    renderCharts(data: any[]) {

      const newCount = data.filter(d => d.stage === 'NEW').length;
      const negotiationCount = data.filter(d => d.stage === 'NEGOTIATION').length;
      const wonCount = data.filter(d => d.stage === 'WON').length;
      const lostCount = data.filter(d => d.stage === 'LOST').length;

      // DESTROY OLD CHARTS
      Chart.getChart('pieChart')?.destroy();
      Chart.getChart('barChart')?.destroy();

      // ===== PIE CHART =====
      new Chart('pieChart', {
        type: 'pie',
        data: {
          labels: ['New', 'Negotiation', 'Won', 'Lost'],
          datasets: [{
            data: [newCount, negotiationCount, wonCount, lostCount],
            backgroundColor: [
              '#3b82f6',  // blue
              '#f59e0b',  // orange
              '#22c55e',  // green
              '#ef4444'   // red
            ],
            borderWidth: 0
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'bottom',
              labels: {
                color: '#334155',
                font: {
                  size: 12,
                  weight: 500
                }
              }
            },
            tooltip: {
              backgroundColor: '#1e293b',
              titleColor: '#fff',
              bodyColor: '#fff',
              padding: 10
            }
          },
          animation: {
            animateScale: true,
            animateRotate: true
          }
        }
      });

      // ===== BAR CHART (GRADIENT) =====
      const ctx: any = document.getElementById('barChart');
      const gradient = ctx.getContext('2d').createLinearGradient(0, 0, 0, 400);

      gradient.addColorStop(0, '#3b82f6');
      gradient.addColorStop(1, '#93c5fd');

      new Chart('barChart', {
        type: 'bar',
        data: {
          labels: ['New', 'Negotiation', 'Won', 'Lost'],
          datasets: [{
            label: 'Deals',
            data: [newCount, negotiationCount, wonCount, lostCount],
            backgroundColor: gradient,
            borderRadius: 8,   
            barThickness: 30
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              display: false
            },
            tooltip: {
              backgroundColor: '#1e293b',
              titleColor: '#fff',
              bodyColor: '#fff'
            }
          },
          scales: {
            x: {
              grid: {
                display: false
              },
              ticks: {
                color: '#64748b'
              }
            },
            y: {
              beginAtZero: true,
              grid: {
                color: '#e2e8f0'
              },
              ticks: {
                color: '#64748b'
              }
            }
          },
          animation: {
            duration: 1000,
            easing: 'easeOutQuart'
          }
        }
      });
    }
}
