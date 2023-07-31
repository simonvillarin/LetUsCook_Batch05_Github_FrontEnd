import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { ParentService } from 'src/app/shared/services/parent/parent.service';
import { ProfileService } from 'src/app/shared/services/profile/profile.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-parent-main',
  templateUrl: './parent-main.component.html',
  styleUrls: ['./parent-main.component.scss'],
})
export class ParentMainComponent implements OnInit {
  isShowDropdown = false;
  isShowMobileNav = false;
  parent: any = {};
  name: string = '';
  image: string = '';
  subscription: Subscription | undefined;

  constructor(
    private authService: AuthService,
    private router: Router,
    private parentService: ParentService,
    private profileService: ProfileService,
    private location: Location
  ) {
    this.subscription = this.profileService.usernameSubject.subscribe(
      (user) => (this.name = user)
    );
    this.subscription = this.profileService.userPicSubject.subscribe(
      (user) => (this.image = user)
    );
  }

  ngOnInit(): void {
    this.getParentById();
  }

  getParentById = () => {
    this.parentService
      .getParentById(this.authService.getUserId())
      .subscribe((data: any) => {
        this.parent = data;
        this.name = data.firstname + ' ' + data.lastname;
        this.image = data.image;
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
    this.isShowMobileNav = false;
    this.isShowDropdown = false;
  };

  profile = () => {
    this.router.navigate(['/parent/profile']);
    this.isShowDropdown = false;
  };

  logout = () => {
    if (this.authService.isUserLoggedIn()) {
      localStorage.removeItem('user');
    }
    this.router.navigate(['/']);
    this.isShowDropdown = false;
  };

  getLocation = () => {
    const currentLocation = this.location.path();
    const splitLocation = currentLocation.split('/');
    const loc = splitLocation[splitLocation.length - 1];
    if (loc == 'home') {
      return 'Home';
    } else if (loc == 'profile') {
      return 'Profile';
    } else if (loc == 'grades') {
      return 'Grades';
    } else {
      return 'Attendance';
    }
  };
}
