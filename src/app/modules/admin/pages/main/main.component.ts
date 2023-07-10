import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { AdminService } from 'src/app/shared/services/admin/admin.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  route: string = 'Home';
  admin: any;
  name: string = '';
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

  constructor(
    private authService: AuthService,
    private router: Router,
    private adminService: AdminService
  ) {}

  ngOnInit(): void {
    this.getAdminById();
  }

  getAdminById = () => {
    this.adminService
      .getAdminById(this.authService.getUserId())
      .subscribe((data: any) => {
        this.admin = data;
      });
  };

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
