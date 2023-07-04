import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Professor } from '../../models/professor';

@Injectable({
  providedIn: 'root',
})
export class ProfessorService {
  BASE_URL = 'http://localhost:8080/lms';

  constructor(private http: HttpClient) {}

  getAllProfessors = (): Observable<Professor[]> => {
    return this.http.get<Professor[]>(`${this.BASE_URL}/professors`);
  };

  getProfessorById = (id: number): Observable<Professor> => {
    return this.http.get<Professor>(`${this.BASE_URL}/professor/${id}`);
  };

  addProfessor = (professor: any) => {
    return this.http.post(`${this.BASE_URL}/professor`, professor);
  };

  addProfessorWithImage = (professor: any) => {
    return this.http.post(`${this.BASE_URL}/professor/image`, professor);
  };

  updateProfessor = (id: number, professor: any) => {
    return this.http.put(`${this.BASE_URL}/professor/${id}`, professor);
  };

  updateProfessorWithImage = (id: number, professor: any) => {
    return this.http.put(`${this.BASE_URL}/professor/image/${id}`, professor);
  };
}
