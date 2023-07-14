import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Student } from '../../models/student';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  BASE_URL = 'http://localhost:8080/lms';

  constructor(private http: HttpClient) {}

  getAllStudents = (): Observable<Student[]> => {
    return this.http.get<Student[]>(`${this.BASE_URL}/students`);
  };

  getStudentById = (id: number): Observable<Student> => {
    return this.http.get<Student>(`${this.BASE_URL}/student/${id}`);
  };

  getStudentByStudentNo = (studentNo: string): Observable<Student> => {
    return this.http.get<Student>(`${this.BASE_URL}/studentNo/${studentNo}`);
  };

  getAllSections = () => {
    return this.http.get(`${this.BASE_URL}/students/section`);
  };

  addStudent = (student: any) => {
    return this.http.post(`${this.BASE_URL}/student`, student);
  };

  updateStudentWithImage = (id: number, student: any) => {
    return this.http.put(`${this.BASE_URL}/student/image/${id}`, student);
  };

  updateStudent = (id: number, student: any) => {
    return this.http.put(`${this.BASE_URL}/student/${id}`, student);
  };

  deleteStudent = (id: number) => {
    return this.http.delete(`${this.BASE_URL}/student/${id}`);
  };
}
