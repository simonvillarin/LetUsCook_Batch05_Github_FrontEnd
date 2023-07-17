import { Component } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss'],
})
export class ScheduleComponent {
  events: any = [
    { title: 'Intro to Programming', date: '2023-06-27' },
    { title: 'Code of Ethics', date: '2023-06-28' },
    { title: 'Theology', date: '2023-06-28' },
  ];

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin],
    events: this.events,
  };
}
