import { Component, OnInit } from '@angular/core';
import { TicketService } from '../ticket.service';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-technician-dashboard',
  imports: [
            CommonModule,
            MatCardModule
  ],
  templateUrl: './technician-dashboard.html',
  styleUrl: './technician-dashboard.css',
})
export class TechnicianDashboard implements OnInit {

  tickets: any[] = [];

  constructor(private service: TicketService) {}

ngOnInit() {
  
  console.log("TECH DASHBOARD");
  const technicianId = 1; 
  this.loadTickets(technicianId);
}

loadTickets(technicianId: number) {
  this.service.getMyTickets(technicianId).subscribe((res: any) => {
    console.log('MY TICKETS: ', res);

    this.tickets = res || [];
  });
}

updateStatus(id: number, status: string) {
  this.service.updateStatus(id, status).subscribe(() => {
    this.loadTickets(1); 
  });
}

}
