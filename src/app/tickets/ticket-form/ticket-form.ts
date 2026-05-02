import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TicketService } from '../ticket.service';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ticket-form',
  standalone: true, 
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    FormsModule
  ],
  templateUrl: './ticket-form.html',
  styleUrls: ['./ticket-form.css'],
})
export class TicketForm implements OnInit {

  ticket: any = {
    title: '',
    description: '',
    priority: 'MEDIUM',
    status: 'NEW',
    customerId: null,
    technicianId: null,
    productSku: ''
  };

  id: any;

  customers: any[] = [];
  technicians: any[] = [];

  priorities = ['LOW','MEDIUM','HIGH','URGENT'];
  statuses = ['NEW','ASSIGNED','IN_PROGRESS','RESOLVED'];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: TicketService
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');

    // LOAD CUSTOMERS
    this.service.getCustomers().subscribe((res: any) => {
      this.customers = res?.content || res?.data?.content || [];
    });

    // LOAD TECHNICIANS
    this.service.getTechnicians().subscribe((res: any) => {
      console.log('Technicians: ', res);
      this.technicians = res?.data || res?.content?.data || [];
    });

    // EDIT MODE FIX
    if (this.id) {
      this.service.getById(this.id).subscribe((res: any) => {
        this.ticket = {
          ...res,
          customerId: res.customer?.id || null,
          technicianId: res.technician?.id || null
        };
      });
    }
  }

  save() {
    if (!this.ticket.customerId || !this.ticket.technicianId) {
      alert('Customer and Technician are required');
      return;
    }

    if (this.id) {
      this.service.update(this.id, this.ticket)
        .subscribe(() => {
          alert('Ticket updated');
          this.router.navigate(['/tickets']);
        });
    } else {
      this.service.create(this.ticket)
        .subscribe(() => {
          alert('Ticket created');
          this.router.navigate(['/tickets']);
        });
    }
  }
}