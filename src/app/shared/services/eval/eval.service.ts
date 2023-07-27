import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EvalService {
  BASE_URL = 'http://localhost:8080/lms';

  constructor(private http: HttpClient) {}

  getEvalBySubjectId = (id: number): Observable<any[]> => {
    return this.http.get<any[]>(`${this.BASE_URL}/evaluation/${id}`);
  };

  getEvalBySubjectIdAndStudentId = (
    subId: number,
    studentId: number
  ): Observable<any[]> => {
    return this.http.get<any[]>(
      `${this.BASE_URL}/evaluation/${subId}/${studentId}`
    );
  };

  addEval = (evaluation: any) => {
    return this.http.post(`${this.BASE_URL}/evaluation`, evaluation);
  };

  updateEval = (id: number, evaluation: any) => {
    return this.http.put(`${this.BASE_URL}/evaluation/${id}`, evaluation);
  };
}
