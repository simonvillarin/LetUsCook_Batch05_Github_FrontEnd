import { Subscription } from 'rxjs';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { ProfessorService } from 'src/app/shared/services/professor/professor.service';
import { ProfileService } from 'src/app/shared/services/profile/profile.service';

@Component({
  selector: 'app-prof-main',
  templateUrl: './prof-main.component.html',
  styleUrls: ['./prof-main.component.scss'],
})
export class ProfMainComponent {
  route: string = 'Home';
  admin: any;
  isShowDropdown = false;
  isShowMobileNav = false;
  professor: any;
  username: string = '';
  userPic: string = '';
  subscription: Subscription | undefined;
  constructor(
    private authService: AuthService,
    private professorService: ProfessorService,
    private profileService: ProfileService,
    private router: Router
  ) {
    this.subscription = this.profileService.usernameSubject.subscribe(
      (user) => (this.username = user)
    );
    this.subscription = this.profileService.userPicSubject.subscribe(
      (user) => (this.userPic = user)
    );
  }

  ngOnInit(): void {
    this.getProfessor();
  }

  getProfessor = () => {
    const profId = this.authService.getUserId();
    this.professorService.getProfessorById(profId).subscribe((data) => {
      this.professor = data;
      this.username = this.professor.firstname + ' ' + this.professor.lastname;
      this.userPic = this.professor.image;
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
    this.router.navigate(['/professor/profile']);
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
