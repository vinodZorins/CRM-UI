import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { CustomerService } from '../customer.service';
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from '@angular/material/form-field';
import { RouterLink } from '@angular/router';
import { MatOption, MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';


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
    MatSelectModule,
    MatOption,
    MatIconModule,
    MatCardModule,
],
  templateUrl: './customer-list.html',
  styleUrl: './customer-list.css',
})
export class Customer implements OnInit {

  displayedColumns: string[] = ['name', 'phone', 'company', 'status', 'action'];
  status = '';

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

  deleteCustomer(id: number) {
    this.service.delete(id).subscribe(() => {
        this.loadCustomers();
      });
  }
}
