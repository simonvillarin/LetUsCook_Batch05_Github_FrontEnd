import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApplicationService {
  BASE_URL = 'http://localhost:8080/lms';

  constructor(private http: HttpClient) {}

  getAllApplications = (): Observable<any[]> => {
    return this.http.get<any[]>(`${this.BASE_URL}/applications`);
  };

  getApplicationById = (id: number): Observable<any> => {
    return this.http.get<any[]>(`${this.BASE_URL}/applications/${id}`);
  };

  addApplication = (application: any) => {
    return this.http.post(`${this.BASE_URL}/application`, application);
  };
}
