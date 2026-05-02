import { Component, OnInit } from '@angular/core';
import { TicketService } from '../ticket.service';
import { CommonModule } from '@angular/common';
import { CdkDragDrop, DragDropModule, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

interface Ticket {
  id: number;
  title: string;
  customerName: string;
  status: 'NEW' | 'ASSIGNED' | 'IN_PROGRESS' | 'RESOLVED';
  priority: string;
}

@Component({
  selector: 'app-ticket-kanban',
  imports: [CommonModule, DragDropModule],
  templateUrl: './ticket-kanban.html',
  styleUrl: './ticket-kanban.css',
})
export class TicketKanban implements OnInit {

   newTickets: Ticket[] = [];
  assignedTickets: Ticket[] = [];
  progressTickets: Ticket[] = [];
  resolvedTickets: Ticket[] = [];

  constructor(private service: TicketService) {}

  ngOnInit() {
    this.loadTickets();
  }

  loadTickets() {
    this.service.getTickets({ page: 0, size: 100 }).subscribe(res => {

      const data: Ticket[] = res.content || [];

      this.newTickets = data.filter(t => t.status === 'NEW');
      this.assignedTickets = data.filter(t => t.status === 'ASSIGNED');
      this.progressTickets = data.filter(t => t.status === 'IN_PROGRESS');
      this.resolvedTickets = data.filter(t => t.status === 'RESOLVED');
    });
  }

  drop(event: CdkDragDrop<Ticket[]>, newStatus: string) {

    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {

      const ticket = event.previousContainer.data[event.previousIndex];

      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

      // ticket.status = newStatus;

      this.service.updateStatus(ticket.id, newStatus).subscribe({
        error: () => this.loadTickets()
      });
    }
  }
}
