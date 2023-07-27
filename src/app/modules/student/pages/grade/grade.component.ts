import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { GradeService } from 'src/app/shared/services/grade/grade.service';

@Component({
  selector: 'app-grade',
  templateUrl: './grade.component.html',
  styleUrls: ['./grade.component.scss'],
})
export class GradeComponent implements OnInit {
  grades: any = [];
  schoolYears = [];
  schoolYearSelected: string = '';

  constructor(
    private gradeService: GradeService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.getGradesByStudentId();
  }

  getGradesByStudentId = () => {
    this.gradeService
      .getGradeByStudentId(this.authService.getUserId())
      .subscribe(
        (data: any) =>
          (this.grades = data.sort((a: any, b: any) => b.gradeId - a.gradeId))
      );
  };

  getSchoolYears = () => {};

  onReset = () => {
    this.getGradesByStudentId();
  };

  onChangeSchoolYear = () => {};
}
