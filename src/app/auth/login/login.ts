import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';  // Added import for CommonModule
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule],  // Added CommonModule to enable *ngIf
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class LoginComponent {
  email = '';
  password = '';
  errorMessage = '';

  constructor(
    private auth: AuthService,
    private router: Router) {}

  login() {
    console.log("Login Clicked");
    this.auth.login(this.email, this.password).subscribe(
       response => {
        console.log("Login Response: ", response);

        // Save token to localStorage
        localStorage.setItem('token', response.token);

        // Redirect to dashboard
        this.router.navigate(['/dashboard']);
      },
       err => {
        this.errorMessage = 'Login failed. Please check your credentials.';
      }
    );
  }
}