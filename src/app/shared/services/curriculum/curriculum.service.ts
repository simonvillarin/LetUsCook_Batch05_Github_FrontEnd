import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Curriculum } from '../../models/curriculum';
@Injectable({
  providedIn: 'root',
})
export class CurriculumService {
  constructor(private http: HttpClient) {}

  BASE_URL = 'http://localhost:8080/lms';

  getAllCurriculum(): Observable<Curriculum[]> {
    return this.http.get<Curriculum[]>(`${this.BASE_URL}/curriculums`);
  }

  getCurriculumById(curriculumId: number): Observable<Curriculum> {
    return this.http.get<Curriculum>(
      `${this.BASE_URL}/curriculum/${curriculumId}`
    );
  }

  addCurriculum(curriculum: Curriculum) {
    return this.http.post(`${this.BASE_URL}/curriculum`, curriculum);
  }

  updateCurriculum(curriculumId: number, curriculum: Curriculum) {
    return this.http.put<Response>(
      `${this.BASE_URL}/curriculum/${curriculumId}`,
      curriculum
    );
  }
}
