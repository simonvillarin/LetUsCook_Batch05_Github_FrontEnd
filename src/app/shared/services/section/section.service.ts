import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Schedule } from '../../models/schedule';

@Injectable({
  providedIn: 'root',
})
export class SectionService {
  BASE_URL = 'http://localhost:8080/lms';

  constructor(private http: HttpClient) {}

  getAllSections = (): Observable<Schedule[]> => {
    return this.http.get<any[]>(`${this.BASE_URL}/sections`);
  };

  addSection = (section: any) => {
    return this.http.post(`${this.BASE_URL}/section`, section);
  };

  updateSection = (id: number, section: any) => {
    return this.http.put(`${this.BASE_URL}/section/${id}`, section);
  };
}
