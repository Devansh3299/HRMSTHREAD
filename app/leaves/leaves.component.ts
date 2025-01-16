import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterModule } from '@angular/router';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import timeGridPlugin from '@fullcalendar/timegrid';
import { AttendanceService } from '../services/attendance.service';

@Component({
  selector: 'app-leaves',
  standalone: true,
  templateUrl: './leaves.component.html',
  styleUrl: './leaves.component.css',
  imports:[CommonModule, FullCalendarModule,RouterModule,
    MatIconModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    MatButtonModule,
    FormsModule ,
    MatFormFieldModule,
    MatInputModule,]
})
export class LeavesComponent implements OnInit, OnDestroy {
  attendanceSummary = {
    present: 0,
    absent: 0,
    leave: 0,
    lwp: 0,
    leaveSubmit: 0,
    attendanceSubmit: 0,
    phy: 0,
    weo: 0,
    reminders: 0,
    halfDay: 0,
    blocked: 0,
  };

  // Define years for the dropdown
  
  leaves = [
    {
      name: 'Privileged Leave',
      total: 0,
      utilised: 0,
      balance: 0,
      pending: 0,
      encashment: 0,
      adjustment: 0,
      net: 0,
    },
    {
      name: 'Paternity Leave',
      total: 0,
      utilised: 0,
      balance: 0,
      pending: 0,
      encashment: 0,
      adjustment: 0,
      net: 0,
    },
    {
      name: 'Compensatory Leave',
      total: 0,
      utilised: 0,
      balance: 0,
      pending: 0,
      encashment: 0,
      adjustment: 0,
      net: 0,
    },
  ];
  startDate: Date | null = null;
  endDate: Date | null = null;
  

  years: number[] = []; // Array to hold the dynamic year options
  availableMonths: string[] = []; // Array to hold available months for the selected year
  selectedYear: number = new Date().getFullYear(); // Default to the current year
  selectedMonth: string = ''; // Default selected month

  allMonths: string[] = [
    'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 
    'September', 'October', 'November', 'December'
  ]; // List of all months

  ngOnInit(): void {
    this.generateYearRange();
    this.updateMonthOptions();
  }

  generateYearRange(): void {
    const startYear = 2020; // Starting year
    const endYear = new Date().getFullYear(); // Current year
    for (let year = startYear; year <= endYear; year++) {
      this.years.push(year);
    }
  }

  updateMonthOptions(): void {
    if (this.selectedYear === new Date().getFullYear()) {
      // If the selected year is the current year, limit to past and current months
      const currentMonth = new Date().getMonth(); // 0-indexed
      this.availableMonths = this.allMonths.slice(0, currentMonth + 1);
    } else {
      // Otherwise, show all months
      this.availableMonths = [...this.allMonths];
    }
    // Set default to the first available month
    this.selectedMonth = this.availableMonths[0];
  }

  onYearChange(): void {
    console.log(`Selected Year: ${this.selectedYear}`);
    this.updateMonthOptions();
  }

  onMonthChange(): void {
    console.log(`Selected Month: ${this.selectedMonth}`);
    // Implement any additional logic when the month changes
  }

  refreshData(): void {
    console.log('Refreshing data...');
    console.log(`Year: ${this.selectedYear}, Month: ${this.selectedMonth}`);
    // Implement data refresh logic here
  }
  resetDateRange(): void {
    // Reset the selected year and month to defaults
    this.selectedYear = new Date().getFullYear(); // Reset to the current year
    this.updateMonthOptions(); // Update the available months for the current year
    console.log('Date range reset to:');
    console.log(`Year: ${this.selectedYear}, Month: ${this.selectedMonth}`);
  }
  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin],
    initialView: 'dayGridMonth',
    headerToolbar: {
      left: 'prev,today,prevYear',
      center: 'title',
      right: 'nextYear,dayGridMonth,timeGridWeek,timeGridDay,next'
    },
    height: 500,
    contentHeight: 20,
    aspectRatio: 1.6,
    dateClick: this.onDateClick.bind(this),
    dayCellDidMount: (info) => {
      if (info.date.getDay() === 6 || info.date.getDay() === 0) {
        info.el.style.backgroundColor = 'white';
        info.el.style.color = '#d9534f'; 
      }
    },
  };

  holidays: { name: string; date: string }[] = [];

  constructor(
    private attendanceService: AttendanceService,
    private router: Router
  ) {}

  ngOnDestroy(): void {}

  viewHolidays(): void {
    console.log('View holidays clicked!');
  }

  attendanceDate: string = '2024-09-01';

  cards = [
    { label: 'All Record', count: 0, class: 'all-record' },
    { label: 'Submitted', count: 0, class: 'submitted' },
    { label: 'Accepted', count: 0, class: 'accepted' },
    { label: 'Rejected', count: 0, class: 'rejected' },
    { label: 'Cancelled', count: 0, class: 'cancelled' },
    { label: 'New Application', count: '+', class: 'new-application' },
  ];

  refresh() {
    console.log('Refresh clicked. Date:', this.attendanceDate);
  }

  handleCardClick(card: any) {
    console.log(`Card clicked: ${card.label}`);
  }

  onDateClick(event: any): void {
    console.log('Date clicked:', event.dateStr);
    this.router.navigate(['/login', event.dateStr]).then(success => {
      console.log('Navigation success:', success);
    }).catch(err => {
      console.error('Navigation error:', err);
    });
  }
  attendanceSummaryRows = [
    { label: 'Present', count: this.attendanceSummary.present },
    { label: 'Absent', count: this.attendanceSummary.absent },
    { label: 'Leave', count: this.attendanceSummary.leave },
    { label: 'LWP', count: this.attendanceSummary.lwp },
    { label: 'Leave Submit', count: this.attendanceSummary.leaveSubmit },
    { label: 'Attendance Submit', count: this.attendanceSummary.attendanceSubmit },
    { label: 'Phy', count: this.attendanceSummary.phy },
    { label: 'WEO', count: this.attendanceSummary.weo },
    { label: 'Reminders', count: this.attendanceSummary.reminders },
    { label: 'Half Day', count: this.attendanceSummary.halfDay },
    { label: 'Blocked', count: this.attendanceSummary.blocked },
  ];
  
}
