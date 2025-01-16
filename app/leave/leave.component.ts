import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-leave',
  standalone: true,
 imports: [CommonModule,RouterModule],
  templateUrl: './leave.component.html',
  styleUrl: './leave.component.css'
})
export class LeaveComponent {

  employeeName: string = 'Mr. John';
  employeeCode: string = 'NQE00392';

}
