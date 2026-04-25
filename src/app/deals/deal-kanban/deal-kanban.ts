import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, DragDropModule, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { DealService } from '../deal.service';
import { Deal } from '../deal.model';


@Component({
  selector: 'app-deal-kanban',
  standalone: true,
  imports: [CommonModule,
            DragDropModule,

  ],
  templateUrl: './deal-kanban.html',
  styleUrl: './deal-kanban.css',
})
export class DealKanban implements OnInit {

 newDeals: Deal[] = [];
  negotiationDeals: Deal[] = [];
  wonDeals: Deal[] = [];
  lostDeals: Deal[] = [];

  loading = false;

  constructor(private dealService: DealService) {}

  ngOnInit(): void {
    this.loadDeals();
  }

  // LOAD DEALS
  loadDeals(): void {
    this.loading = true;

    this.dealService.getDeals({ page: 0, size: 100 }).subscribe({
      next: (res: any) => {

        const deals: Deal[] = res?.data?.content || [];

        this.newDeals = deals.filter(d => d.stage === 'NEW');
        this.negotiationDeals = deals.filter(d => d.stage === 'NEGOTIATION');
        this.wonDeals = deals.filter(d => d.stage === 'WON');
        this.lostDeals = deals.filter(d => d.stage === 'LOST');

        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  // DRAG & DROP
  drop(event: CdkDragDrop<Deal[]>, newStage: Deal['stage']): void {

    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {

      const deal = event.previousContainer.data[event.previousIndex];

      // UI UPDATE
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

      // Stage update
      this.dealService.updateStage(deal.id, newStage).subscribe({
        error: () => this.loadDeals()
      });

      // BACKEND UPDATE
      this.dealService.update(deal.id, {
        ...deal,
        stage: newStage
      }).subscribe({
        error: () => {
          // rollback if API fails
          this.loadDeals();
        }
      });
    }
  }
}
