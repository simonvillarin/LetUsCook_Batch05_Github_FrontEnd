import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-student-main',
  templateUrl: './student-main.component.html',
  styleUrls: ['./student-main.component.scss'],
})
export class StudentMainComponent {
  route: string = 'Home';
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
