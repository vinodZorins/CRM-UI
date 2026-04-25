import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { CustomerService } from '../customer.service';
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardContent, MatCard } from "@angular/material/card";
import { MatGridTile } from "@angular/material/grid-list";
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatPaginator,
    MatInputModule,
    RouterLink,
],
  templateUrl: './customer-list.html',
  styleUrl: './customer-list.css',
})
export class Customer implements OnInit {

  customers: any[] = [];
  search = '';
  page = 0;
  size = 10;
  totalElements = 0;

  constructor(private service: CustomerService,
              private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.loadCustomers();
  }

  loadCustomers() {
    this.service.getCustomers(this.page, this.size, this.search)
      .subscribe(res => {

        this.customers = res.content || res.data?.content;
        this.totalElements = res.totalElements;
        this.cdr.detectChanges();

      });
  }

  onSearchChange() {
    this.page = 0;
    this.loadCustomers();
  }

  onPageChange(event: any) {
    this.page = event.pageIndex;
    this.size = event.pageSize;
    this.loadCustomers();
  }
}
