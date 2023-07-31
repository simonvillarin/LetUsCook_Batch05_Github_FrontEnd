import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EvalsService {
  BASE_URL = 'http://localhost:8080/lms';

  constructor(private http: HttpClient) {}

  getEval = (subjectId: number, sectionId: number): Observable<any> => {
    return this.http.get<any>(
      `${this.BASE_URL}/eval/${subjectId}/${sectionId}`
    );
  };

  getEvalBySubjectId = (id: number): Observable<any[]> => {
    return this.http.get<any[]>(`${this.BASE_URL}/eval/${id}`);
  };

  addEval = (evaluation: any) => {
    return this.http.post(`${this.BASE_URL}/eval`, evaluation);
  };

  updateEval = (evalId: number, evaluation: any) => {
    return this.http.put(`${this.BASE_URL}/eval/${evalId}`, evaluation);
  };
}
