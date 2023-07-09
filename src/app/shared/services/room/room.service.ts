import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RoomService {
  BASE_URL = 'http://localhost:8080/lms';

  constructor(private http: HttpClient) {}

  getAllRooms = (): Observable<any[]> => {
    return this.http.get<any[]>(`${this.BASE_URL}/rooms`);
  };

  addRoom = (room: any) => {
    return this.http.post(`${this.BASE_URL}/room`, room);
  };

  updateRoom = (id: number, room: any) => {
    return this.http.put(`${this.BASE_URL}/room/${id}`, room);
  };
}
