import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Schedule } from '../../models/schedule';

@Injectable({
  providedIn: 'root',
})
export class ScheduleService {
  constructor(private http: HttpClient) {}

  BASE_URL = 'http://localhost:8080/lms';

  getAllSchedules = (): Observable<Schedule[]> => {
    return this.http.get<Schedule[]>(`${this.BASE_URL}/schedules`);
  };

  getScheduleById = (id: number): Observable<Schedule> => {
    return this.http.get<Schedule>(`${this.BASE_URL}/schedule/${id}`);
  };

  addSchedule = (schedule: any) => {
    return this.http.post(`${this.BASE_URL}/schedule`, schedule);
  };

  updateSchedule = (schedule: any) => {
    return this.http.put(`${this.BASE_URL}/schedule`, schedule);
  };

  deleteSchedule = (id: number) => {
    return this.http.delete(`${this.BASE_URL}/schedule/${id}`);
  };
}
