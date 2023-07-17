import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProfessorloadService {
  BASE_URL = 'http://localhost:8080/lms';

  constructor(private http: HttpClient) {}

  getProfessorLoadByProfessorId = (id: any): Observable<any[]> => {
    return this.http.get<any[]>(`${this.BASE_URL}/loads/${id}`);
  };
}
