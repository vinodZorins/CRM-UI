import { Component, OnInit } from '@angular/core';
import { TicketService } from '../ticket.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatOption, MatSelectModule } from '@angular/material/select';
import { DataSource } from '@angular/cdk/collections';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCellDef, MatHeaderCell, MatHeaderCellDef, MatHeaderRow, MatHeaderRowDef, MatRowDef, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-ticket-list',
  imports: [
            MatFormFieldModule,
            CommonModule,
            FormsModule,
            MatSelectModule,
            MatPaginatorModule,
            MatTableModule,
            MatInputModule
            
  ],
  templateUrl: './ticket-list.html',
  styleUrl: './ticket-list.css',
})
export class TicketList implements OnInit {

  tickets: any[] = [];
  totalElements = 0;

  page = 0;
  size = 10;

  search = '';
  status = '';
  priority = '';

  statuses = ['NEW','ASSIGNED','IN_PROGRESS','RESOLVED'];
  priorities = ['LOW','MEDIUM','HIGH','URGENT'];

  constructor(private service: TicketService) {}

  ngOnInit() {
    setTimeout(() => {
      this.loadTickets();
    });
  }

  loadTickets() {
    const params = {
      page: this.page,
      size: this.size,
      search: this.search,
      status: this.status,
      priority: this.priority,
      sortBy: 'id',
      sortDirection: 'desc'
    };

    this.service.getTickets(params).subscribe(res => {
      this.tickets = res.content;
      this.totalElements = res.totalElements;
    });
  }

  onFilterChange() {
    this.page = 0;
    this.loadTickets();
  }

  onPageChange(e: any) {
    this.page = e.pageIndex;
    this.size = e.pageSize;
    this.loadTickets();
  }
}
