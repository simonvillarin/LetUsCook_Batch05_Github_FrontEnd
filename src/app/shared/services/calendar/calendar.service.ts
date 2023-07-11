import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CalendarService {
  BASE_URL = 'http://localhost:8080/lms';

  constructor(private http: HttpClient) {}

  getCalendar = (): Observable<any[]> => {
    return this.http.get<any[]>(`${this.BASE_URL}/calendar`);
  };

  addCalendar = (calendar: any) => {
    return this.http.post(`${this.BASE_URL}/calendar`, calendar);
  };
}
