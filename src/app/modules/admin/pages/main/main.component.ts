import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent {
  route: string = 'Home';
  curriculums = [
    {
      id: 1000,
      term: 'First Term',
      yearLevel: 'Third Year',
      program: 'BSIT',
      subject: 'Advanced Database',
    },
  ];
  terms = [{ name: 'First Term' }, { name: 'Second Term' }];
  levels = [
    { name: 'First Year' },
    { name: 'Second Year' },
    { name: 'Third Year' },
    { name: 'Fourth Year' },
  ];

  isShowDropdown = false;
  isShowMobileNav = false;

  constructor(private authService: AuthService, private router: Router) {}

  toggleShowDropdown = () => {
    this.isShowDropdown = !this.isShowDropdown;
    this.isShowMobileNav = false;
  };

  openMobileNav = () => {
    this.isShowMobileNav = true;
    scroll(0, 0);
  };

  closeMobileNav = () => {
    this.isShowMobileNav = false;
  };

  onChangeRoute = (route: string) => {
    this.route = route;
    this.isShowMobileNav = false;
    this.isShowDropdown = false;
  };

  profile = () => {
    this.router.navigate(['/admin/profile']);
    this.isShowDropdown = false;
  };

  logout = () => {
    if (this.authService.isUserLoggedIn()) {
      localStorage.removeItem('user');
    }
    this.router.navigate(['/']);
    this.isShowDropdown = false;
  };
}
