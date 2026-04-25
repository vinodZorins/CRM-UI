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
            MatTableModule
  ],
  templateUrl: './deal-list.html',
  styleUrl: './deal-list.css',
})
export class DealList implements OnInit {

  displayedColumns: string[] = ['title', 'customer', 'amount', 'stage', 'actions'];

    deals: any[] = [];

    // FILTERS
    search = '';
    stage = '';
    page = 0;
    size = 10;

    constructor(private dealService: DealService,
                private cdr: ChangeDetectorRef
    ) {}

    ngOnInit() {
      this.loadDeals();
    }

    loadDeals() {
      const params = {
        page: this.page,
        size: this.size,
        search: this.search,
        stage: this.stage,
        sortBy: 'id',
        direction: 'desc'
      };

      this.dealService.getDeals(params).subscribe(res => {
        this.deals = res.data.content;
        this.cdr.detectChanges();
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
}
