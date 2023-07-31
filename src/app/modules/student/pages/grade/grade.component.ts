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
      .subscribe((data: any) => {
        this.grades = data.sort((a: any, b: any) => b.gradeId - a.gradeId);
        console.log(data);
      });
  };

  getAverage = (prelim: any, midterm: any, final: any) => {
    let sum = 0;
    let period = 1;
    if (prelim != null) {
      sum += parseFloat(prelim);
    }
    if (midterm != null) {
      period = 2;
      sum += parseFloat(midterm);
    }
    if (final != null) {
      period = 3;
      sum += parseFloat(final);
    }
    const avg = sum / period;
    return avg != 0 ? parseFloat(avg.toFixed(2)) : '-';
  };

  onReset = () => {
    this.getGradesByStudentId();
  };

  onChangeSchoolYear = () => {};
}
