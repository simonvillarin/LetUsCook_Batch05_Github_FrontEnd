import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  BASE_URL = 'http://localhost:8080/lms';

  constructor(private http: HttpClient) {}

  getAdminById = (id: number): Observable<any> => {
    return this.http.get(`${this.BASE_URL}/admin/${id}`);
  };

  updateImage = (id: number, image: any) => {
    return this.http.put(`${this.BASE_URL}/admin/image/${id}`, image);
  };

  updateBanner = (id: number, banner: any) => {
    return this.http.put(`${this.BASE_URL}/admin/banner/${id}`, banner);
  };

  updateAdmin = (id: number, admin: any) => {
    return this.http.put(`${this.BASE_URL}/admin/${id}`, admin);
  };
}
