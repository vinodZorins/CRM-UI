import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {

  private API = 'http://localhost:8081/api/customer';

  constructor(private http: HttpClient) {}

  getCustomers(page: number, size: number, search: string = '') {
    let params = new HttpParams()
      .set('page', page)
      .set('size', size)
      .set('search', search);

    return this.http.get<any>(this.API, { params });
  }

  createCustomer(data: any) {
  return this.http.post(this.API, data);
}

getCustomerById(id: number) {
  return this.http.get(`${this.API}/${id}`);
}

updateCustomer(id: number, data: any) {
  return this.http.put(`${this.API}/${id}`, data);
}

getCompanies() {
  return this.http.get('http://localhost:8081/api/company');
}
}
