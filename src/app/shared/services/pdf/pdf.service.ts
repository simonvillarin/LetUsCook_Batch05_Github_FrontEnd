import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PdfService {
  constructor(private http: HttpClient) {}

  BASE_URL = 'http://localhost:8080/lms';

  generatePDF = (id: number) => {
    return this.http.get(`${this.BASE_URL}/generate/${id}`);
  };
}
