import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-sign-up',
  standalone: true,
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
  imports: [ReactiveFormsModule, CommonModule], // Ensure ReactiveFormsModule is imported
})
export class SignUpComponent {
  signupForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    // Initialize the form with validation rules
    this.signupForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    if (this.signupForm.valid) {
      console.log('Form Submitted', this.signupForm.value);

      // Store user data in localStorage
      localStorage.setItem('user', JSON.stringify(this.signupForm.value));

      alert('Sign-Up Successful!');

      // Reset the form
      this.signupForm.reset();

      // Navigate to the login page
      this.router.navigate(['/login']) 

    } 
    }
    navigateToLogin() {
      this.router.navigate(['/login']);
  }
}
