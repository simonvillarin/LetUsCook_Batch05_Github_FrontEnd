import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Program } from '../../models/program';
import { Observable } from 'rxjs';
import { Subject } from '../../models/subject';

@Injectable({
  providedIn: 'root',
})
export class ProgramService {
  constructor(private http: HttpClient) {}

  BASE_URL = 'http://localhost:8080/lms';

  getAllPrograms(): Observable<Program[]> {
    return this.http.get<Program[]>(`${this.BASE_URL}/programs`);
  }

  getProgramById(programId: number): Observable<Program> {
    return this.http.get<Program>(`${this.BASE_URL}/program/${programId}`);
  }

  getMajors(programId: number): Observable<Subject[]> {
    return this.http.get<Subject[]>(
      `${this.BASE_URL}/program/majors/${programId}`
    );
  }

  getMinors(programId: number): Observable<Subject[]> {
    return this.http.get<Subject[]>(
      `${this.BASE_URL}/program/minors/${programId}`
    );
  }

  getElectives(programId: number): Observable<Subject[]> {
    return this.http.get<Subject[]>(
      `${this.BASE_URL}/program/electives/${programId}`
    );
  }

  addProgram(program: Program) {
    return this.http.post<Response>(`${this.BASE_URL}/program`, program);
  }

  updateProgram(programId: number, program: Program) {
    return this.http.put<Response>(
      `${this.BASE_URL}/program/${programId}`,
      program
    );
  }
}
