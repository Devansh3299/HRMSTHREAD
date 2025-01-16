import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
  imports: [CommonModule, FormsModule, RouterModule],
})
export class LoginPageComponent {
  constructor(private router: Router) {}

  login(loginForm: any) {
    if (loginForm.valid) {
      const { username, password } = loginForm.value;
  
      // Simulated login check
      if (username === 'devanshu' && password === '123456') {
        console.log('Login successful!');
        this.router.navigate(['/right']); // Redirect to dashboard
      } else {
        alert('Invalid username or password.');
      }
    } else {
      alert('Please fill out the form correctly.');
    }
  }
  

  navigateToSignup() {
    this.router.navigate(['/signup']); // Navigate to signup page
  }
}
