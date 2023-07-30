import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GradeService {
  BASE_URL = 'http://localhost:8080/lms';

  constructor(private http: HttpClient) {}

  getAllGrades = (): Observable<any[]> => {
    return this.http.get<any[]>(`${this.BASE_URL}/grades`);
  };

  getGradeByStudentId = (id: number): Observable<any> => {
    return this.http.get<any[]>(`${this.BASE_URL}/grade/${id}`);
  };

  getGradesBySection = (sectionId: number, subId: number): Observable<any> => {
    return this.http.get<any[]>(
      `${this.BASE_URL}/grades/${sectionId}/${subId}`
    );
  };

  getGradesBySec = (id: number): Observable<any> => {
    return this.http.get<any[]>(`${this.BASE_URL}/grades/${id}`);
  };

  addGrade = (grade: any) => {
    return this.http.post(`${this.BASE_URL}/grade`, grade);
  };

  updateGrade = (id: number, grade: any) => {
    return this.http.put(`${this.BASE_URL}/grade/${id}`, grade);
  };
}
