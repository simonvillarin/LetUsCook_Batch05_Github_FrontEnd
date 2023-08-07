import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { GradeService } from 'src/app/shared/services/grade/grade.service';
import { ProgramService } from 'src/app/shared/services/program/program.service';
import { ScheduleService } from 'src/app/shared/services/schedule/schedule.service';
import { SectionService } from 'src/app/shared/services/section/section.service';
import { StudentService } from 'src/app/shared/services/student/student.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  date: Date | undefined;

  selectedSchedules: any[] = [];
  schedules: any = [];
  sections: any = [];
  sched: any = [];
  selectedSection: any;
  studentId: any;
  student: any = {};
  course: any = [];
  maxUnits: any;
  username: string = '';
  userPic: string = '';

  hasSchedule: boolean = false;

  studentBar: any;

  constructor(
    private authService: AuthService,
    private gradeService: GradeService,
    private programService: ProgramService,
    private studentService: StudentService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.studentId = this.authService.getUserId();
    this.getStudent();
    this.getStudentAverage();
  }

  getStudent = () => {
    this.studentService
      .getStudentById(this.studentId)
      .subscribe((data: any) => {
        this.student = data;
        this.username = this.student.firstname + ' ' + this.student.lastname;
        this.userPic = this.student.image;
        this.course = data.schedules;
        data.tempSched.map((sched: any) => {
          this.selectedSchedules.push(sched);
        });
        this.getProgram();
        if (this.student.schedules.length > 0) {
          this.hasSchedule = true;
        }
      });
  };

  getProgram = () => {
    this.programService
      .getProgramById(this.student.program.programId)
      .subscribe((data: any) => {
        const yearLevel = this.student.yearLevel;
        const sem = this.student.sem;
        let maxUnitsIndex = 0;
        if (yearLevel == 'First Year' && sem == 'First Term') {
          maxUnitsIndex = 0;
        } else if (yearLevel == 'First Year' && sem == 'Second Term') {
          maxUnitsIndex = 1;
        } else if (yearLevel == 'Second Year' && sem == 'First Term') {
          maxUnitsIndex = 2;
        } else if (yearLevel == 'Second Year' && sem == 'Second Term') {
          maxUnitsIndex = 3;
        } else if (yearLevel == 'Third Year' && sem == 'First Term') {
          maxUnitsIndex = 4;
        } else if (yearLevel == 'Third Year' && sem == 'Second Term') {
          maxUnitsIndex = 5;
        } else if (yearLevel == 'Fourth Year' && sem == 'First Term') {
          maxUnitsIndex = 6;
        } else if (yearLevel == 'Fourth Year' && sem == 'Second Term') {
          maxUnitsIndex = 7;
        } else if (yearLevel == 'Fifth Year' && sem == 'First Term') {
          maxUnitsIndex = 8;
        } else if (yearLevel == 'Fifth Year' && sem == 'Second Term') {
          maxUnitsIndex = 9;
        }
        this.maxUnits = data.units[maxUnitsIndex];
      });
  };

  getStudentAverage = () => {
    this.gradeService.getGradeByStudentId(this.studentId).subscribe((data) => {
      const prelim = data.map((grade: any) => grade.prelim);
      const midterm = data.map((grade: any) => grade.midterm);
      const final = data.map((grade: any) => grade.finals);

      const grades: any = [];

      let prelimGrade = prelim.reduce((prev: any, curr: any) => prev + curr, 0);
      prelimGrade = (prelimGrade / prelim.length).toFixed(2);
      grades.push(prelimGrade);

      let midtermGrade = midterm.reduce(
        (prev: any, curr: any) => prev + curr,
        0
      );
      midtermGrade = (midtermGrade / midterm.length).toFixed(2);
      grades.push(midtermGrade);

      let finalGrade = final.reduce((prev: any, curr: any) => prev + curr, 0);
      finalGrade = (finalGrade / final.length).toFixed(2);
      grades.push(finalGrade);

      this.studentBar = {
        labels: ['Prelim', 'Midterm', 'Finals'],
        datasets: [
          {
            label: 'Average',
            data: grades,
            backgroundColor: [
              'rgba(255, 159, 64, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(54, 162, 235, 0.2)',
            ],
          },
        ],
      };
    });
  };

  route = (load: any) => {
    const sectionId = load.section.sectionId;
    const subjectId = load.subject.subjectId;
    this.router.navigate([`student/course/${sectionId}-${subjectId}`]);
  };
}
