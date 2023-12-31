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

  getParentById(parentId: number): Observable<any> {
    return this.http.get<any>(`${this.BASE_URL}/parent/${parentId}`);
  }

  addParent(parent: Parent) {
    return this.http.post<Response>(`${this.BASE_URL}/parent`, parent);
  }

  updateImage = (id: number, parent: any) => {
    return this.http.put(`${this.BASE_URL}/parent/images/${id}`, parent);
  };

  updateParentWithImage = (id: number, student: any) => {
    return this.http.put(`${this.BASE_URL}/parent/img/${id}`, student);
  };

  updateBanner = (id: number, parent: any) => {
    return this.http.put(`${this.BASE_URL}/parent/banner/${id}`, parent);
  };

  updateParent(parentId: number, parent: any) {
    return this.http.put<Response>(
      `${this.BASE_URL}/parent/${parentId}`,
      parent
    );
  }

  deleteParent(parentId: number) {
    return this.http.delete(`${this.BASE_URL}/parent/${parentId}`);
  }
}
