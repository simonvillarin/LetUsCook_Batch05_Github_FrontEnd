import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { ProfessorloadService } from 'src/app/shared/services/professorload/professorload.service';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss'],
})
export class CourseComponent implements OnInit {
  loads: any[] = [];
  loadTable: any[] = [];
  load: any = {};
  loadDialog = false;

  constructor(
    private professorLoadService: ProfessorloadService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getProfessorLoadByProfessorId();
  }

  getProfessorLoadByProfessorId = () => {
    this.professorLoadService
      .getProfessorLoadByProfessorId(this.authService.getUserId())
      .subscribe((data: any) => {
        this.loads = data.sort((a: any, b: any) => b.loadId - a.loadId);
        console.log(data);
      });
  };

  convertTime = (time: any) => {
    const splitTime = time.split(':');
    let hour: any;
    let suffix;
    if (parseInt(splitTime[0]) == 13) {
      hour = 1;
    } else if (parseInt(splitTime[0]) == 14) {
      hour = 2;
    } else if (parseInt(splitTime[0]) == 15) {
      hour = 3;
    } else if (parseInt(splitTime[0]) == 16) {
      hour = 4;
    } else if (parseInt(splitTime[0]) == 17) {
      hour = 5;
    } else if (parseInt(splitTime[0]) == 18) {
      hour = 6;
    } else if (parseInt(splitTime[0]) == 19) {
      hour = 7;
    } else if (parseInt(splitTime[0]) == 20) {
      hour = 8;
    } else if (parseInt(splitTime[0]) == 21) {
      hour = 9;
    } else if (parseInt(splitTime[0]) == 22) {
      hour = 10;
    } else if (parseInt(splitTime[0]) == 23) {
      hour = 11;
    } else if (parseInt(splitTime[0]) == 24) {
      hour = 12;
    } else {
      hour = splitTime[0];
    }

    if (parseInt(splitTime[0]) > 12) {
      suffix = 'PM';
    } else {
      suffix = 'AM';
    }
    return hour + ':' + splitTime[1] + ' ' + suffix;
  };

  onStudentsTable = (load: any) => {
    this.loadTable = load.students;
    console.log(load);

    this.load = this.loadDialog = true;
  };
}
