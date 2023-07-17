import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { AuthService } from 'src/app/core/services/auth.service';
import { CalendarService } from 'src/app/shared/services/calendar/calendar.service';
import { ProfessorloadService } from 'src/app/shared/services/professorload/professorload.service';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss'],
})
export class ScheduleComponent implements OnInit {
  schedules: any = [];
  calendar: any;
  events: any = [];

  constructor(
    private calendarService: CalendarService,
    private professorLoadService: ProfessorloadService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.getProfessorLoadByProfessorId();
    this.getCalendar();
  }

  getProfessorLoadByProfessorId = () => {
    this.professorLoadService
      .getProfessorLoadByProfessorId(this.authService.getUserId())
      .subscribe((data: any) => {
        const sortData = data.sort((a: any, b: any) => b.loadId - a.loadId);
        this.schedules = sortData[0].schedules;
        this.updateEvents();
      });
  };

  getCalendar = () => {
    this.calendarService.getCalendar().subscribe((data: any) => {
      this.calendar = data;
      this.updateEvents();
    });
  };

  updateEvents = () => {
    if (this.schedules && this.calendar) {
      const startDate = new Date(this.calendar[0].startClass);
      const endDate = new Date(this.calendar[0].endClass);
      const temp: any = [];

      while (startDate.getTime() <= endDate.getTime()) {
        let day: any;
        if (startDate.getDay() === 1) {
          day = 'Monday';
        } else if (startDate.getDay() === 2) {
          day = 'Tuesday';
        } else if (startDate.getDay() === 3) {
          day = 'Wednesday';
        } else if (startDate.getDay() === 4) {
          day = 'Thursday';
        } else if (startDate.getDay() === 5) {
          day = 'Friday';
        } else if (startDate.getDay() === 6) {
          day = 'Saturday';
        }
        const scheds = this.schedules.filter((sched: any) => sched.day === day);
        scheds.forEach((sched: any) => {
          temp.push({
            title: sched.subject.subjectTitle,
            date: startDate.toISOString().split('T')[0],
          });
        });
        startDate.setDate(startDate.getDate() + 1);
      }

      this.events = temp;
      this.updateCalendarOptions();
    }
  };

  updateCalendarOptions = () => {
    this.calendarOptions.events = this.events;
  };

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin],
    events: this.events,
  };
}
