import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Account } from '../../models/account';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  constructor(private http: HttpClient) {}
  BASE_URL = 'http://localhost:8080/lms';

  getAllAccounts = (): Observable<Account[]> => {
    return this.http.get<Account[]>(`${this.BASE_URL}/accounts`);
  };

  getAccountById = (accountId: number): Observable<Account> => {
    return this.http.get<Account>(`${this.BASE_URL}/account/${accountId}`);
  };

  getAccountByUserId = (userId: number): Observable<Account> => {
    return this.http.get<Account>(`${this.BASE_URL}/account/userid/${userId}`);
  };

  login = (account: any) => {
    return this.http.post(`${this.BASE_URL}/auth/login`, account);
  };

  addAccount = (account: Account) => {
    return this.http.post(`${this.BASE_URL}/account`, account);
  };

  updateAccount = (id: number, account: any) => {
    return this.http.put(`${this.BASE_URL}/account/${id}`, account);
  };
}
