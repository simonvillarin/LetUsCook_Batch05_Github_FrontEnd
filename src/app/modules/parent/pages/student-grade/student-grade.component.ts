import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GradeService } from 'src/app/shared/services/grade/grade.service';

@Component({
  selector: 'app-student-grade',
  templateUrl: './student-grade.component.html',
  styleUrls: ['./student-grade.component.scss'],
  providers: [DatePipe],
})
export class StudentGradeComponent implements OnInit {
  grades: any = [];
  schoolYears: any = [];
  schoolYear: string = '';
  student: any = {};
  GWA: any;
  cummulativeGWA: any;

  show: boolean = false;

  constructor(
    private gradeService: GradeService,
    private datePipe: DatePipe,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getGradesByStudentId();
  }

  getGradesByStudentId = () => {
    const params = this.route.snapshot.params['id'];
    this.gradeService.getGradeByStudentId(params).subscribe((data: any) => {
      this.grades = data.sort((a: any, b: any) => b.gradeId - a.gradeId);
      this.grades.forEach((grade: any) => {
        let exists = false;
        this.schoolYears.forEach((g: any) => {
          if (g == `${grade.yearLevel} - ${grade.sem}`) {
            exists = true;
          }
        });
        if (!exists) {
          this.schoolYears.push(`${grade.yearLevel} - ${grade.sem}`);
        }
      });
      let grades: number = 0;
      data.map((grade: any) => {
        let prelim = grade.prelim || 0;
        let midterm = grade.midterm || 0;
        let finals = grade.finals || 0;
        let divisor = 0;
        if (prelim != 0) {
          divisor = 1;
        }
        if (midterm != 0) {
          divisor = 2;
        }
        if (finals != 0) {
          divisor = 3;
        }
        const result = (prelim + midterm + finals) / divisor;
        if (result > 0) {
          grades += result;
        }
      });
      let size = data.filter((g: any) => g.prelim != null);
      this.cummulativeGWA = (grades / parseFloat(size.length)).toFixed(2);

      this.schoolYear = `${data[0].student.yearLevel} - ${data[0].student.sem}`;
      this.grades = this.grades.filter(
        (grade: any) =>
          grade.yearLevel == data[0].student.yearLevel &&
          grade.sem == data[0].student.sem
      );

      grades = 0;
      this.grades.map((grade: any) => {
        let prelim = grade.prelim || 0;
        let midterm = grade.midterm || 0;
        let finals = grade.finals || 0;
        let divisor = 0;
        if (prelim != 0) {
          divisor = 1;
        }
        if (midterm != 0) {
          divisor = 2;
        }
        if (finals != 0) {
          divisor = 3;
        }
        const result = (prelim + midterm + finals) / divisor;
        if (result > 0) {
          grades += result;
        }
      });
      size = data.filter(
        (g: any) =>
          g.prelim != null &&
          g.yearLevel == data[0].student.yearLevel &&
          g.sem == data[0].student.sem
      );

      this.GWA = (grades / parseFloat(size.length)).toFixed(2);

      const temp = data.filter((grade: any) => grade.dateModified != null);
      if (temp.length > 0) {
        this.show = true;
      }
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
    let grade = parseFloat(avg.toFixed(2));

    if (grade > 97.5) {
      return '1.00';
    } else if (grade > 94.5) {
      return '1.25';
    } else if (grade > 91.5) {
      return '1.50';
    } else if (grade > 88.5) {
      return '1.75';
    } else if (grade > 85.5) {
      return '2.00';
    } else if (grade > 82.5) {
      return '2.25';
    } else if (grade > 79.5) {
      return '2.50';
    } else if (grade > 76.5) {
      return '2.75';
    } else if (grade > 74.5) {
      return '3.00';
    } else if (grade > 0) {
      return '5.00';
    } else {
      return '';
    }
  };

  convertGrade = (grade: number) => {
    if (grade > 97.5) {
      return '1.00';
    } else if (grade > 94.5) {
      return '1.25';
    } else if (grade > 91.5) {
      return '1.50';
    } else if (grade > 88.5) {
      return '1.75';
    } else if (grade > 85.5) {
      return '2.00';
    } else if (grade > 82.5) {
      return '2.25';
    } else if (grade > 79.5) {
      return '2.50';
    } else if (grade > 76.5) {
      return '2.75';
    } else if (grade > 74.5) {
      return '3.00';
    } else if (grade > 0) {
      return '5.00';
    } else {
      return '';
    }
  };

  convertDate = (dateStr: string) => {
    const date = new Date(dateStr);
    if (date.getFullYear() > 2022) {
      return this.datePipe.transform(date, 'MMMM d, y');
    }
    return '';
  };

  onChangeSchoolYear = (schoolYear: string) => {
    const split = schoolYear.split('-');
    const params = this.route.snapshot.params['id'];
    if (schoolYear != '') {
      this.gradeService.getGradeByStudentId(params).subscribe((data: any) => {
        this.grades = data.sort((a: any, b: any) => b.gradeId - a.gradeId);
        this.grades = this.grades.filter(
          (grade: any) =>
            grade.yearLevel == split[0].trim() && grade.sem == split[1].trim()
        );
        let grades = 0;
        this.grades.map((grade: any) => {
          let prelim = grade.prelim || 0;
          let midterm = grade.midterm || 0;
          let finals = grade.finals || 0;
          let divisor = 0;
          if (prelim != 0) {
            divisor = 1;
          }
          if (midterm != 0) {
            divisor = 2;
          }
          if (finals != 0) {
            divisor = 3;
          }
          const result = (prelim + midterm + finals) / divisor;
          if (result > 0) {
            grades += result;
          }
        });

        let size = data.filter(
          (g: any) =>
            g.prelim != null &&
            g.yearLevel == data[0].student.yearLevel &&
            g.sem == data[0].student.sem
        );

        this.GWA = (grades / parseFloat(size.length)).toFixed(2);
      });
    } else {
      this.getGradesByStudentId();
    }
  };

  onReset = () => {
    this.getGradesByStudentId();
  };

  onBack = () => {
    history.back();
  };
}
