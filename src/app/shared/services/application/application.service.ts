import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApplicationService {
  BASE_URL = 'http://localhost:8080/lms';

  constructor(private http: HttpClient) {}

  getAllApplications = (): Observable<any[]> => {
    return this.http.get<any[]>(`${this.BASE_URL}/applications`);
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

  getStatusCount(): Observable<any> {
    const colors: any[] = [];

    for (let i = 0; i < 3; i++) {
      colors.push(this.getRandomColor().randomColor);
    }

    return this.getAllApplications().pipe(
      map((status: any[]) => {
        let statusCount = {
          labels: ['Pending', 'Approved', 'Rejected'],
          datasets: [
            {
              data: [0, 0, 0],
              backgroundColor: colors,
            },
          ],
        };

        status.forEach((status) => {
          if (status.status === null) {
            statusCount.datasets[0].data[0]++;
          } else if (status.status === true) {
            statusCount.datasets[0].data[1]++;
          } else if (status.status === false) {
            statusCount.datasets[0].data[2]++;
          }
        });
        
        return statusCount;
        
      })
    );
  }

  getApplicationById = (id: number): Observable<any> => {
    return this.http.get<any[]>(`${this.BASE_URL}/applications/${id}`);
  };

  addApplication = (application: any) => {
    return this.http.post(`${this.BASE_URL}/application`, application);
  };

  updateApplication = (id: number, application: any) => {
    return this.http.put(`${this.BASE_URL}/application/${id}`, application);
  };

  deleteApplication = (id: number) => {
    return this.http.delete(`${this.BASE_URL}/application/${id}`);
  };
}
