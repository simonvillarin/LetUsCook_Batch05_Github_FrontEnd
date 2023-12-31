import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Student } from '../../models/student';
import { Observable, map } from 'rxjs';

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

  getStudentByParentId = (parentId: number): Observable<any> => {
    return this.http.get<any>(`${this.BASE_URL}/student/parent/${parentId}`);
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
    return this.http.put(`${this.BASE_URL}/student/img/${id}`, student);
  };

  updateStudentBanner = (id: number, student: any) => {
    return this.http.put(`${this.BASE_URL}/student/banner/${id}`, student);
  };

  updateStudent = (id: number, student: any) => {
    return this.http.put(`${this.BASE_URL}/student/${id}`, student);
  };

  deleteStudent = (id: number) => {
    return this.http.delete(`${this.BASE_URL}/student/${id}`);
  };

  getRandomColor = () => {
    const minBrightness = 168;
    const maxBrightness = 218;

    const randomRGBValue = (min: any, max: any) =>
      Math.floor(Math.random() * (max - min + 1)) + min;

    const r = randomRGBValue(minBrightness, maxBrightness);
    const g = randomRGBValue(minBrightness, maxBrightness);
    const b = randomRGBValue(minBrightness, maxBrightness);

    const randomColor = `rgb(${r}, ${g}, ${b})`;

    return { randomColor };
  };

  getGenderCount(): Observable<any> {
    const colors: any[] = [];

    const color = [
      'aquamarine',
      'beige',
      'cadetblue',
      'dodgerblue',
      'indigo',
      'lightcoral',
      'orchid',
      'seagreen',
      'springgreen',
      'turquoise',
      'tomato',
      'silver',
      'salmon',
      'goldenrod',
      'khaki',
      'lightpink',
      'slateblue',
      'yellowgreen',
      'orangered',
    ];

    for (let i = 0; i < 3; i++) {
      let randomNumber = Math.floor(Math.random() * color.length) + 1;
      colors.push(color[randomNumber]);
    }

    return this.getAllStudents().pipe(
      map((students: any[]) => {
        let genderCount = {
          labels: ['Male', 'Female', 'Others'],
          datasets: [
            {
              data: [0, 0, 0],
              backgroundColor: colors,
            },
          ],
        };

        students.forEach((student) => {
          if (student.gender === 'Male') {
            genderCount.datasets[0].data[0]++;
          } else if (student.gender === 'Female') {
            genderCount.datasets[0].data[1]++;
          } else if (student.gender === 'Others') {
            genderCount.datasets[0].data[2]++;
          }
        });

        return genderCount;
      })
    );
  }

  getYearLevelCount(): Observable<any> {
    const colors: any[] = [];

    const color = [
      'aquamarine',
      'beige',
      'cadetblue',
      'dodgerblue',
      'indigo',
      'lightcoral',
      'orchid',
      'seagreen',
      'springgreen',
      'turquoise',
      'tomato',
      'silver',
      'salmon',
      'goldenrod',
      'khaki',
      'lightpink',
      'slateblue',
      'yellowgreen',
      'orangered',
    ];
    let randomNumber = Math.floor(Math.random() * color.length) + 1;

    for (let i = 0; i < 3; i++) {
      colors.push(color[randomNumber]);
    }

    return this.getAllStudents().pipe(
      map((students: any[]) => {
        let yearLvlCount = {
          labels: ['First Year', 'Second Year', 'Third Year', 'Fourth Year'],
          datasets: [
            {
              label: 'Number of Students',
              data: [0, 0, 0, 0],
              backgroundColor: colors,
            },
          ],
        };

        students.forEach((student) => {
          if (student.yearLevel === 'First Year') {
            yearLvlCount.datasets[0].data[0]++;
          } else if (student.yearLevel === 'Second Year') {
            yearLvlCount.datasets[0].data[1]++;
          } else if (student.yearLevel === 'Third Year') {
            yearLvlCount.datasets[0].data[2]++;
          } else if (student.yearLevel === 'Fourth Year') {
            yearLvlCount.datasets[0].data[3]++;
          }
        });

        return yearLvlCount;
      })
    );
  }
}
