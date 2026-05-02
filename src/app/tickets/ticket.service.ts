import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TicketService {

  private baseUrl = 'http://localhost:8081/api/tickets';

  constructor(private http: HttpClient) {}

  // GET ALL (PAGINATION)
  getTickets(params: any) {

    let httpParams = new HttpParams()
      .set('page', params.page || 0)
      .set('size', params.size || 10)
      .set('sortBy', params.sortBy || 'id')
      .set('direction', params.direction || 'desc'); 

    return this.http.get<any>(this.baseUrl, { params: httpParams });
  }

  // GET BY ID 
  getById(id: number) {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }

  // CREATE
  create(data: any) {
    return this.http.post<any>(this.baseUrl, data);
  }

  // UPDATE
  update(id: number, data: any) {
    return this.http.put<any>(`${this.baseUrl}/${id}`, data);
  }

  // UPDATE STATUS
  updateStatus(id: number, status: string) {
    return this.http.patch<any>(
      `${this.baseUrl}/${id}/status`,
      {},
      { params: { status } }
    );
  }

  // GET CUSTOMERS
  getCustomers() {
    return this.http.get<any>('http://localhost:8081/api/customer');
  }

  // GET TECHNICIANS
  getTechnicians() {
    return this.http.get<any>('http://localhost:8081/api/user');
  }

  // MY TICKETS
  getMyTickets(technicianId: number) {
    return this.http.get<any>(`${this.baseUrl}/my`,{ params: { technicianId } }
    );
  }
}