import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from '../../customer/customer.service';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-customer-form',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule,
    MatSnackBarModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './customer-form.html',
  styleUrl: './customer-form.css',
})
export class CustomerForm implements OnInit {

  id: number | null = null;
  isEdit = false;

  customer: any = {};

  // ENUM DROPDOWNS
  customerTypes: string[] = [];
  statuses: string[] = [];
  languages: string[] = [];

  companies: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: CustomerService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {

    // LOAD ENUMS FIRST
    this.loadEnums();

    // GET ID
    const paramId = this.route.snapshot.paramMap.get('id');
    if (paramId) {
      this.id = +paramId;
      this.isEdit = true;

      this.loadCustomer(this.id);
    }

    // LOAD COMPANIES
    this.service.getCompanies().subscribe((res: any) => {
      this.companies = res?.content || res?.data?.content || res || [];
    });
  }

  showMessage(message: string, isError = false) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      panelClass: isError ? 'snackbar-error' : 'snackbar-success'
    });
  }
  // LOAD ENUMS
  loadEnums() {
    this.service.getCustomerTypes().subscribe(res => this.customerTypes = res || []);
    this.service.getStatuses().subscribe(res => this.statuses = res || []);
    this.service.getLanguages().subscribe(res => this.languages = res || []);
  }

  // LOAD CUSTOMER (EDIT)
  loadCustomer(id: number) {
    this.service.getCustomerById(id).subscribe((res: any) => {
      this.customer = {
        ...res,
        companyId: res.companyId || null
      };
    });
  }

  // SAVE (CREATE / UPDATE)
  saveCustomer(form: NgForm) {

    if (form.invalid) {
      form.control.markAllAsTouched();
      return; 
    }

    if (this.isEdit && this.id) {

      // UPDATE
      this.service.updateCustomer(this.id, this.customer)
        .subscribe({
          next: () => {
            alert('Customer updated successfully');
            this.showMessage('Customer Updated');
            this.router.navigate(['/customer']);
          },
          error: () => {
            this.showMessage('Error while updating customer', true);
            alert('Error updating customer');
          }
        });

    } else {

      // CREATE
      this.service.createCustomer(this.customer)
        .subscribe({
          next: () => {
            alert('Customer created successfully');
            this.showMessage('Customer created...');
            this.router.navigate(['/customer']);
          },
          error: () => {
            this.showMessage('Error while creting customer...', true);
            alert('Error creating customer');
          }
        });
    }
  }
}