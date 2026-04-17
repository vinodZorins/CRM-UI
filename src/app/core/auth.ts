import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root', })
export class AuthService {

  private API = 'http://localhost:8081/api/auth';

  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    console.log("API URL: ", `${this.API}/login`);
    return this.http.post<any>(`${this.API}/login`, {
        email,
        password
      });
  }
}
