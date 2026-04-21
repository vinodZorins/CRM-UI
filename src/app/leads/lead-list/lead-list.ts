import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';
import { FormsModule } from '@angular/forms';
import { LeadService } from '../lead.service.ts';
import { RouterLink } from "@angular/router";
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialog } from '../../shared/confirm-dialog/confirm-dialog.js';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-lead-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatChipsModule,
    RouterLink,
    FormsModule,
],
  templateUrl: './lead-list.html',
  styleUrl: './lead-list.css'
})
export class LeadList implements OnInit, AfterViewInit {

  displayedColumns: string[] = [
    'name', 'company', 'status', 'email', 'phone', 'score', 'actions'
  ];


  leads: any[] = [];
  allLeads: any[] = [];
  totalElements = this.displayedColumns.length;
  page = 0;
  size = 5;
  search = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
              private snackBar: MatSnackBar,
              private dialog: MatDialog,
              private leadService: LeadService,
              private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.paginator.page.subscribe(() => {
      this.loadLeads()
    });
    this.loadLeads();
  }

  // Main API call
  loadLeads() {


    this.leadService.getLeads(this.page, this.size, this.search)
      .subscribe({

        next: (res) => {

          console.log("Leads:", res);

          const data = res.data;

          this.leads = data.content || [];
          this.totalElements = data.totalElements || 0;
          this.cdr.detectChanges();
          this.page = data.number || 0;
          this.size = data.size || 5;

        },
        error: () => {
          console.error("Error loading leads");
      }
      });
  }

  getStatusClass(status: string) {
    switch (status) {
      case 'NEW': return 'status-new';
      case 'CONTACTED': return 'status-contacted';
      case 'WON': return 'status-won';
      case 'LOST': return 'status-lost';
      default: return '';
    }
  }
  // Pagination
  onPageChange(event: any) {

    this.page = event.pageIndex;
    this.size = event.pageSize;
    this.loadLeads();
  }

  // Search
  onSearch() {

    this.page = 0;
    this.loadLeads();
  }

  // Delete
  deleteLead(id: number) {

  const dialogRef = this.dialog.open(ConfirmDialog);

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      this.leadService.deleteLead(id).subscribe(() => {
  this.snackBar.open('Lead deleted successfully ', 'Close', {
    duration: 3000,
    panelClass: ['success-snackbar']
  });

  this.loadLeads();
});
    }
  });

}
}