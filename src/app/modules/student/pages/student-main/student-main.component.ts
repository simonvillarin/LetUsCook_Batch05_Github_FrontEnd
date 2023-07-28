import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { ProfileService } from 'src/app/shared/services/profile/profile.service';
import { StudentService } from 'src/app/shared/services/student/student.service';

@Component({
  selector: 'app-student-main',
  templateUrl: './student-main.component.html',
  styleUrls: ['./student-main.component.scss'],
})
export class StudentMainComponent implements OnInit {
  route: string = 'Home';
  isShowDropdown = false;
  isShowMobileNav = false;
  student: any;
  username: string = '';
  userPic: string = '';
  subscription: Subscription | undefined;

  constructor(
    private authService: AuthService,
    private studentService: StudentService,
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
    this.getStudent();
  }

  getStudent = () => {
    const studentId = this.authService.getUserId();
    this.studentService.getStudentById(studentId).subscribe((data) => {
      this.student = data;
      this.username = this.student.firstname + ' ' + this.student.lastname;
      this.userPic = this.student.image;
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
    this.router.navigate(['student/profile']);
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
