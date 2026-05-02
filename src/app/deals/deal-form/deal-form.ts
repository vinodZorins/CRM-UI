import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

import { DealService } from '../deal.service';


@Component({
  selector: 'app-deal-form',
  standalone: true,
  imports: [
              CommonModule,
              ReactiveFormsModule,
              MatFormFieldModule,
              MatInputModule,
              MatSelectModule,
              MatButtonModule,
              MatCardModule,
              MatIconModule,
              FormsModule,
  ],
  templateUrl: './deal-form.html',
  styleUrl: './deal-form.css',
})
export class DealForm implements OnInit {

    form!: FormGroup;
    isEdit = false;
    dealId!: number;

    deal: any = {}
    
    stages = ['NEW', 'NEGOTIATION', 'WON', 'LOST'];

    customers: any[] = [];

    constructor(
      private fb: FormBuilder,
      private dealService: DealService,
      private route: ActivatedRoute,
      private router: Router
    ) {}

    ngOnInit() {
      this.initForm();
      this.loadCustomers();

      this.dealId = Number(this.route.snapshot.paramMap.get('id'));

      if (this.dealId) {
        this.isEdit = true;
        this.dealService.getById(this.dealId).subscribe((res: any) => {

          this.form.patchValue = {
            ...res,
            customerId: res.customer?.id || null
          }
        })
      }
    }

    loadCustomers() {
      this.dealService.getAllCustomers().subscribe(res => {

        console.log('CUSTOMERS:', res);
        this.customers = res?.content || res?.data?.content || res || [];
      });
    }

    initForm() {
      this.form = this.fb.group({
        title: ['', Validators.required],
        amount: [0, [Validators.required, Validators.min(1)]],
        stage: ['NEW', Validators.required],
        customerId: ['', Validators.required],
        description: ['']
      });
    }

    loadDeal() {
      this.dealService.getById(this.dealId).subscribe((res: any) => {
        const d = res.data;

        this.form.patchValue({
          title: d.title,
          amount: d.amount,
          stage: d.stage,
          customerId: d.customerId,
          description: d.description
        });
      });
    }

    submit() {
      if (this.form.invalid) {
        this.form.markAllAsTouched();
        return;
      }

      const payload = this.form.value;

      if (this.isEdit) {
        this.dealService.update(this.dealId, payload).subscribe(() => {
          this.router.navigate(['/deals']);
        });
      } else {
        this.dealService.create(payload).subscribe(() => {
          this.router.navigate(['/deals']);
        });
      }
    }
}
