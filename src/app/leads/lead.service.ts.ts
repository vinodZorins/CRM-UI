import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LeadService {

  private API = 'http://localhost:8081/api/leads';
  private COMPANY_API = 'http://localhost:8081/api/company';

  constructor(private http: HttpClient) {}

  // Get all leads
  getLeads(page: number, size: number, search: string = '') {
    let params = new HttpParams()
      .set('page', page)
      .set('size', size)
      .set('search', search);

    return this.http.get<any>(this.API, { params });
  }

  // Delete lead
  deleteLead(id: number) {
    return this.http.delete(`${this.API}/${id}`);
  }

  // Get one lead
  getLeadById(id: number) {
  return this.http.get<any>(`${this.API}/${id}`);
}

// Update lead
updateLead(id: number, data: any) {
  return this.http.put(`${this.API}/${id}`, data);
}

// Create lead
createLead(data: any) {
  return this.http.post(`${this.API}`, data);
 }

 // Get Companies
  getCompanies() {
    return this.http.get<any>(this.COMPANY_API);
  }
}