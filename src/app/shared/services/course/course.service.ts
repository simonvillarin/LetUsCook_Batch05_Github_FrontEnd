import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from '../../models/subject';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  constructor(private http: HttpClient) {}

  BASE_URL = 'http://localhost:8080/lms';

  getAllSubjects(): Observable<Subject[]> {
    return this.http.get<Subject[]>(`${this.BASE_URL}/subjects`);
  }

  getSubjectById(subjectId: number): Observable<Subject> {
    return this.http.get<Subject>(`${this.BASE_URL}/subject/${subjectId}`);
  }

  addSubject(subject: Subject) {
    return this.http.post<Response>(`${this.BASE_URL}/subject`, subject);
  }

  updateSubject(subjectId: number, subject: Subject) {
    return this.http.put<Response>(
      `${this.BASE_URL}/subject/${subjectId}`,
      subject
    );
  }
}
