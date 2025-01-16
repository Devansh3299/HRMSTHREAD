import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {
  getHolidays(): { name: string; date: string; }[] {
    throw new Error('Method not implemented.');
  }

  private rosterData: { [key: string]: { shiftName: string; shiftTiming: string } } = {
    '2024-12-26': {
      shiftName: 'General Shift',
      shiftTiming: '09:30 AM - 06:30 PM',
    },
    '2024-12-27': {
      shiftName: 'Morning Shift',
      shiftTiming: '07:00 AM - 03:00 PM',
    },
    '2024-12-28': {
      shiftName: 'Evening Shift',
      shiftTiming: '02:00 PM - 10:00 PM',
    },
  };

  // Method to fetch roster details by date
  getRosterByDate(date: Date) {
    const dateString = date.toISOString().split('T')[0]; // Format date as 'YYYY-MM-DD'
    return this.rosterData[dateString] || {
      shiftName: 'No Shift Assigned',
      shiftTiming: 'N/A'
    };
  }
}
