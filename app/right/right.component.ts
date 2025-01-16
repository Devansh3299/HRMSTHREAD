import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-right',
  standalone: true, // Mark as a standalone component
  templateUrl: './right.component.html',
  styleUrls: ['./right.component.css'], // Corrected to 'styleUrls'
  imports: [CommonModule,RouterModule], // Import CommonModule for common Angular directives
})
export class RightComponent {
  
}

