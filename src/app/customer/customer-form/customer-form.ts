import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from '../../customer/customer.service';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-customer-form',
  imports: [FormsModule],
  templateUrl: './customer-form.html',
  styleUrl: './customer-form.css',
})
export class CustomerForm implements OnInit {

  id: any;

  customer: any = {
    name: '',
    email: '',
    phone: '',
    requirement: '',
    companyId: ''
  };

  companies: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: CustomerService
  ) {}

  ngOnInit() {

    this.id = this.route.snapshot.paramMap.get('id');

    // load companies
    this.service.getCompanies().subscribe((res: any) => {
      this.companies = res.data?.content || res;
    });

    // EDIT
    if (this.id) {
      this.service.getCustomerById(this.id).subscribe((res: any) => {

        this.customer = {
          ...res,
          companyId: res.companyId || ''
        };
      });
    }
  }

  save() {

    if (this.id) {
      // UPDATE
      this.service.updateCustomer(this.id, this.customer)
        .subscribe(() => {
          alert('Customer updated');
          this.router.navigate(['/customers']);
        });

    } else {
      // CREATE
      this.service.createCustomer(this.customer)
        .subscribe(() => {
          alert('Customer created');
          this.router.navigate(['/customers']);
        });
    }
  }
}
