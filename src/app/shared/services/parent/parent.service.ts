import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Parent } from '../../models/parent';

@Injectable({
  providedIn: 'root',
})
export class ParentService {
  constructor(private http: HttpClient) {}

  BASE_URL = 'http://localhost:8080/lms';

  getAllParent(): Observable<Parent[]> {
    return this.http.get<Parent[]>(`${this.BASE_URL}/parents`);
  }

  getParentById(parentId: number): Observable<Parent> {
    return this.http.get<Parent>(`${this.BASE_URL}/parent/${parentId}`);
  }

  addParent(parent: Parent) {
    return this.http.post<Response>(`${this.BASE_URL}/parent`, parent);
  }

  updateParent(parentId: number, parent: Parent) {
    return this.http.put<Response>(
      `${this.BASE_URL}/parent/${parentId}`,
      parent
    );
  }
}
