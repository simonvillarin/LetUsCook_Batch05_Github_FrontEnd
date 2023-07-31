import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AttendanceStudentService {
  BASE_URL = 'http://localhost:8080/lms';

  constructor(private http: HttpClient) {}

  getAllAttendanceByStudents = (): Observable<any[]> => {
    return this.http.get<any[]>(`${this.BASE_URL}/attendance/student/all`);
  };

  getAttendanceByStudentId = (id: number): Observable<any[]> => {
    return this.http.get<any[]>(`${this.BASE_URL}/attendance/student/${id}`);
  };

  getAttendanceById = (id: number, subjectId: number): Observable<any[]> => {
    return this.http.get<any[]>(
      `${this.BASE_URL}/attendance/student/${id}/${subjectId}`
    );
  };

  getAttendanceBySection = (
    sectionId: number,
    subId: number
  ): Observable<any[]> => {
    return this.http.get<any[]>(
      `${this.BASE_URL}/attendance/section/${sectionId}/${subId}`
    );
  };

  getAttendanceBySec = (id: number): Observable<any[]> => {
    return this.http.get<any[]>(`${this.BASE_URL}/attendance/section/${id}`);
  };

  addAttendance = (attendance: any) => {
    return this.http.post(`${this.BASE_URL}/attendance/student`, attendance);
  };

  updateAttendance = (id: number, attendance: any) => {
    return this.http.put(
      `${this.BASE_URL}/attendance/student/${id}`,
      attendance
    );
  };
}
