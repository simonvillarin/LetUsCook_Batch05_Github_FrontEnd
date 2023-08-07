import { Component } from '@angular/core';
import { forkJoin, map, switchMap } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { GradeService } from 'src/app/shared/services/grade/grade.service';
import { ParentService } from 'src/app/shared/services/parent/parent.service';
import { ProgramService } from 'src/app/shared/services/program/program.service';
import { StudentService } from 'src/app/shared/services/student/student.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  date: Date | undefined;

  parentId: any;
  parent: any = {};
  username: string = '';
  userPic: string = '';

  childBar: any;

  constructor(
    private authService: AuthService,
    private parentService: ParentService,
    private studentService: StudentService,
    private gradeService: GradeService
  ) {}

  ngOnInit(): void {
    this.parentId = this.authService.getUserId();
    this.getParent();
    this.getChildGradeAverage();
  }

  getParent = () => {
    this.parentService.getParentById(this.parentId).subscribe((data: any) => {
      this.parent = data;
      this.username = this.parent.firstname + ' ' + this.parent.lastname;
      this.userPic = this.parent.image;
    });
  };

  getChildGradeAverage = () => {
    const dataset: any = [];

    this.studentService
      .getStudentByParentId(this.parentId)
      .pipe(
        switchMap((students: any) => {
          const studentObservables = students.map((student: any) =>
            this.gradeService.getGradeByStudentId(student.studentId).pipe(
              map((grades: any) => {
                const filteredGrades = grades.filter(
                  (g: any) =>
                    g.yearLevel == student.yearLevel && g.sem == student.sem
                );

                const grd: any = [];

                for (let i = 0; i < 3; i++) {
                  if (i == 0) {
                    const prelims = filteredGrades.map((gr: any) => gr.prelim);
                    const total = prelims.reduce(
                      (prev: any, curr: any) => prev + curr,
                      0
                    );
                    grd.push(total / prelims.length);
                  }

                  if (i == 0) {
                    const midterms = filteredGrades.map(
                      (gr: any) => gr.midterm
                    );
                    const total = midterms.reduce(
                      (prev: any, curr: any) => prev + curr,
                      0
                    );
                    grd.push(total / midterms.length);
                  }

                  if (i == 0) {
                    const finals = filteredGrades.map((gr: any) => gr.finals);
                    const total = finals.reduce(
                      (prev: any, curr: any) => prev + curr,
                      0
                    );
                    grd.push(total / finals.length);
                  }
                }

                const colors = [
                  'aquamarine',
                  'cadetblue',
                  'dodgerblue',
                  'indigo',
                  'lightcoral',
                  'orchid',
                  'seagreen',
                  'springgreen',
                  'turquoise',
                  'tomato',
                  'silver',
                  'salmon',
                  'goldenrod',
                  'khaki',
                  'lightpink',
                  'slateblue',
                  'yellowgreen',
                  'orangered',
                ];
                let randomNumber =
                  Math.floor(Math.random() * colors.length) + 1;
                const label = {
                  label: student.firstname,
                  backgroundColor: colors[randomNumber],
                  data: grd,
                };

                return label;
              })
            )
          );

          return forkJoin(studentObservables);
        })
      )
      .subscribe((studentLabels: any) => {
        dataset.push(...studentLabels);

        this.childBar = {
          labels: ['Prelim', 'Midterm', 'Final'],
          datasets: dataset,
        };
      });
  };
}
