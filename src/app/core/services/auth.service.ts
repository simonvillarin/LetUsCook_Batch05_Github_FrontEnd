import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  isUserLoggedIn = () => {
    return localStorage.getItem('user') || false;
  };

  getUser = () => {
    const user = localStorage.getItem('user');
    if (user) {
      return JSON.parse(user);
    }
    return false;
  };

  getToken = () => {
    const user = localStorage.getItem('user');
    if (user) {
      return JSON.parse(user).token;
    }
    return false;
  };

  getUserId = () => {
    const user = localStorage.getItem('user');
    if (user) {
      return JSON.parse(user).id;
    }
    return false;
  };

  getUserType = () => {
    const user = localStorage.getItem('user');
    if (user) {
      return JSON.parse(user).type;
    }
    return false;
  };
}
