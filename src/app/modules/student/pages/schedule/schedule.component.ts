import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { AuthService } from 'src/app/core/services/auth.service';
import { CalendarService } from 'src/app/shared/services/calendar/calendar.service';
import { StudentService } from 'src/app/shared/services/student/student.service';

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
    private studentService: StudentService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.getStudentById();
    this.getCalendar();
  }

  getStudentById = () => {
    this.studentService
      .getStudentById(this.authService.getUserId())
      .subscribe((data: any) => {
        this.schedules = data.schedules;
        this.updateEvents();
      });
  };

  getCalendar = () => {
    this.calendarService.getCalendar().subscribe((data: any) => {
      this.calendar = data;
      this.updateEvents();
    });
  };

  convertTime = (time: any) => {
    const splitTime = time.split(':');
    let hour;
    let zone;
    if (parseInt(splitTime[0]) == 13) {
      hour = 1;
    } else if (parseInt(splitTime[0]) == 13) {
      hour = 1;
    } else if (parseInt(splitTime[0]) == 14) {
      hour = 2;
    } else if (parseInt(splitTime[0]) == 15) {
      hour = 3;
    } else if (parseInt(splitTime[0]) == 16) {
      hour = 4;
    } else if (parseInt(splitTime[0]) == 17) {
      hour = 5;
    } else if (parseInt(splitTime[0]) == 18) {
      hour = 6;
    } else if (parseInt(splitTime[0]) == 19) {
      hour = 7;
    } else if (parseInt(splitTime[0]) == 20) {
      hour = 8;
    } else if (parseInt(splitTime[0]) == 21) {
      hour = 9;
    } else if (parseInt(splitTime[0]) == 22) {
      hour = 10;
    } else if (parseInt(splitTime[0]) == 23) {
      hour = 11;
    } else if (parseInt(splitTime[0]) == 24 || splitTime[0] == '00') {
      hour = 12;
    } else {
      hour = splitTime[0];
    }

    if (parseInt(splitTime[0]) > 12) {
      zone = 'PM';
    } else {
      zone = 'AM';
    }

    return hour + ':' + splitTime[1] + ' ' + zone;
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
        const scheds: any = [];
        this.schedules.map((sched: any) => {
          sched.days.map((d: any) => {
            if (d == day) {
              scheds.push(sched);
            }
          });
        });
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
