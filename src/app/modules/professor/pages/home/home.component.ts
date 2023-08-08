import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { GradeService } from 'src/app/shared/services/grade/grade.service';
import { ProfessorService } from 'src/app/shared/services/professor/professor.service';
import { ProfessorloadService } from 'src/app/shared/services/professorload/professorload.service';
import { StudentService } from 'src/app/shared/services/student/student.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  date: Date | undefined;
  load: any = {};
  professor: any;
  username: string = '';
  userPic: string = '';

  professorBar: any;

  constructor(
    private professorLoadService: ProfessorloadService,
    private authService: AuthService,
    private professorService: ProfessorService,
    private gradeService: GradeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getProfessorLoadByProfessorId();
    this.getProfessor();
  }

  getProfessorLoadByProfessorId = () => {
    this.professorLoadService
      .getProfessorLoadByProfessorId(this.authService.getUserId())
      .subscribe((data: any) => {
        const subjects: string[] = [];
        const numStudents: number[] = [];

        this.load = data;
        const schedulePromises = data.schedules.map((load: any) => {
          return this.gradeService
            .getGradesBySection(load.section.sectionId, load.subject.subjectId)
            .toPromise(); // Convert the Observable to a Promise
        });

        Promise.all(schedulePromises)
          .then((studentsPerSubject: any[]) => {
            studentsPerSubject.forEach((student: any, index: number) => {
              subjects.push(data.schedules[index].subject.subjectTitle);
              numStudents.push(student.length);
            });

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
              'ivory',
              'khaki',
              'lightpink',
              'slateblue',
              'yellowgreen',
              'orangered',
            ];

            this.professorBar = {
              labels: subjects,
              datasets: [
                {
                  label: 'Number of Students',
                  data: numStudents,
                  backgroundColor: [
                    colors[Math.floor(Math.random() * colors.length) + 1],
                    colors[Math.floor(Math.random() * colors.length) + 1],
                    colors[Math.floor(Math.random() * colors.length) + 1],
                  ],
                },
              ],
            };
          })
          .catch((error: any) => {
            console.error('Error fetching data:', error);
          });
      });
  };

  getProfessor = () => {
    const profId = this.authService.getUserId();
    this.professorService.getProfessorById(profId).subscribe((data) => {
      this.professor = data;
      this.username = this.professor.firstname + ' ' + this.professor.lastname;
      this.userPic = this.professor.image;
    });
  };

  route = (load: any) => {
    const sectionId = load.section.sectionId;
    const subjectId = load.subject.subjectId;
    this.router.navigate([`professor/course/${sectionId}-${subjectId}`]);
  };
}
