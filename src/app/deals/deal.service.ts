import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Deal } from './deal.model';


@Injectable({
  providedIn: 'root',
})
export class DealService {

  private baseUrl = 'http://localhost:8081/api/deals';

  constructor(private http: HttpClient) {}

  // GET ALL (FILTER + PAGINATION)
  getDeals(params: any) {
    let httpParams = new HttpParams();

    Object.keys(params).forEach(key => {
      if (params[key] !== null && params[key] !== '') {
        httpParams = httpParams.set(key, params[key]);
      }
    });

    return this.http.get<any>(this.baseUrl, { params: httpParams });
  }

  // GET BY ID
  getById(id: number) {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  // CREATE
  create(deal: any) {
    return this.http.post(this.baseUrl, deal);
  }

  // UPDATE
  update(id: number, deal: Partial<Deal>) {
  return this.http.put(`${this.baseUrl}/${id}`, deal);
}

// Update Stage
updateStage(id: number, stage: string) {
  return this.http.patch(`${this.baseUrl}/${id}/stage?stage=${stage}`, {});
}

  // DELETE
  delete(id: number) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
