import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DashboardServiceTs {

  private API = 'http://localhost:8081/api/dashboard';

  constructor(private http: HttpClient) {}

  getDashboard() {
    return this.http.get<any>(this.API);
  }
}
