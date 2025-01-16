import { Component, OnDestroy, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import timeGridPlugin from '@fullcalendar/timegrid';

import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { AttendanceService } from '../services/attendance.service';

import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router'; // Import Router
import { FullCalendarModule } from '@fullcalendar/angular';

@Component({
  selector: 'app-shedule',
  standalone: true,
  templateUrl: './shedule.component.html',
  styleUrls: ['./shedule.component.css'],
  imports: [
    CommonModule,
    FullCalendarModule,
    RouterModule,
    MatIconModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    MatButtonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
  ],
})
export class SheduleComponent implements OnInit, OnDestroy {
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

  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin],
    initialView: 'dayGridMonth', // Default view
    headerToolbar: {
      left: 'prev,today,prevYear',
      center: 'title',
      right: 'nextYear,dayGridMonth,timeGridWeek,timeGridDay,next',
    },
    height: 500,
    contentHeight: 10,
    aspectRatio: 1.5,
    dateClick: this.onDateClick.bind(this), // Bind date click to the method
    dayCellDidMount: (info) => {
      if (info.date.getDay() === 6 || info.date.getDay() === 0) {
        info.el.style.backgroundColor = 'white';
        info.el.style.color = '#d9534f';
      }
    },
  };

  isChecked: boolean = false;
  currentDate: string = '';
  currentTime: string = '';
  private timerInterval: any;
  markInTime: string = '';
  markOutTime: string = '';
  selectedDate: Date = new Date();
  roster = {
    shiftName: '',
    shiftTiming: '',
  };
  holidays: { name: string; date: string }[] = [];
  calendarComponent: any;

  constructor(private attendanceService: AttendanceService, private router: Router) {} // Inject Router

  ngOnInit(): void {
    this.loadRosterDetails(this.selectedDate);
    this.updateTime();
    this.timerInterval = setInterval(() => {
      this.updateTime();
    }, 1000);
  }

  ngOnDestroy(): void {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
  }

  updateTime(): void {
    const now = new Date();
    this.currentDate = now.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    this.currentTime = now.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    });
  }

  onMarkInTime(): void {
    this.markInTime = new Date().toLocaleString();
    console.log('Marked In Time:', this.markInTime);
  }

  onMarkOutTime(): void {
    this.markOutTime = new Date().toLocaleString();
    console.log('Marked Out Time:', this.markOutTime);
  }

  loadRosterDetails(date: Date) {
    this.roster = this.attendanceService.getRosterByDate(date);
  }

  onDateChange(event: any) {
    const selectedDate = event.value;
    this.loadRosterDetails(selectedDate);
  }

  shifts = [
    { name: 'General Shift', startTime: '09:30 AM', endTime: '06:30 PM' },
    { name: 'Morning Shift', startTime: '06:00 AM', endTime: '02:00 PM' },
    { name: 'Night Shift', startTime: '10:00 PM', endTime: '06:00 AM' },
  ];
  selectedShift = this.shifts[0];

  onShiftChange(newShift: any) {
    this.selectedShift = newShift;
    console.log('Shift changed to:', this.selectedShift);
  }

  loadHolidays(): void {
    this.holidays = this.attendanceService.getHolidays();
  }

  viewHolidays(): void {
    console.log('View holidays clicked!');
  }

  attendanceDate: string = new Date().toISOString().split('T')[0];
  cards = [
    { label: 'All Record', count: 0, class: 'all-record' },
    { label: 'Submitted', count: 0, class: 'submitted' },
    { label: 'Accepted', count: 0, class: 'accepted' },
    { label: 'Rejected', count: 0, class: 'rejected' },
    { label: 'Cancelled', count: 0, class: 'cancelled' },
    { label: 'New Application', count: '+', class: 'new-application' },
  ];

  refresh(): void {
    if (!this.attendanceDate) {
      console.log('No date selected!');
      return;
    }
  
    console.log('Selected Date:', this.attendanceDate);
  
    // Navigate to the selected date in the calendar
    if (this.calendarComponent) {
      const calendarApi = this.calendarComponent.getApi(); // Get FullCalendar API instance
      calendarApi.gotoDate(this.attendanceDate); // Navigate to the selected date
    }
  }
  handleCardClick(card: any) {
    console.log(`Card clicked: ${card.label}`);
  }

  onDateClick(event: any) {
    console.log('Clicked date:', event.dateStr); // Log the clicked date
    if (event.dateStr) {
      // Navigate to the attendance-application-component with the date as a query parameter
      this.router.navigate(['/attendance-application'], { queryParams: { date: event.dateStr } });
    }
  }
}