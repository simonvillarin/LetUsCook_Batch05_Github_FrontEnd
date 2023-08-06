import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EmailService {
  BASE_URL = 'http://localhost:8080/lms';

  constructor(private http: HttpClient) {}

  sendOTP = (email: string) => {
    return this.http.post(`${this.BASE_URL}/otp`, email);
  };

  checkOTPExpiration = (email: string) => {
    return this.http.post(`${this.BASE_URL}/otp/expiration`, email);
  };

  checkEmail = (email: string) => {
    return this.http.post(`${this.BASE_URL}/email`, email);
  };

  sendEmail = (email: any) => {
    return this.http.post(`${this.BASE_URL}/send/email`, email);
  };
}
