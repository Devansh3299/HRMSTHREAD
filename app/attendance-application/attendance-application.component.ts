import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';  // Import CommonModule

@Component({
  selector: 'app-attendance-application',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './attendance-application.component.html',
  styleUrl: './attendance-application.component.css'
})
export class AttendanceApplicationComponent {
  employeeName: string = 'Mr. John';
  employeeCode: string = 'NQE00392';
  isTimeBasisSelected: boolean = false; // Default is false (Day Basis)
  isDayBasisSelected: boolean = false;

  // Method to toggle based on the radio button
  onBasisChange(basis: string) {
    this.isTimeBasisSelected = basis === 'time'; // If 'time' is selected, show the date fields
    this.isDayBasisSelected = basis === 'day';
  }
}
