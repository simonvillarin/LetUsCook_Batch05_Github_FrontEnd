import { Component } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { ProgramService } from 'src/app/shared/services/program/program.service';
import { ScheduleService } from 'src/app/shared/services/schedule/schedule.service';
import { StudentService } from 'src/app/shared/services/student/student.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  isShowDropdown = false;
  isShowMobileNav = false;
  isShowNotifications = false;

  date: Date | undefined;
  selectedSchedules: any[] = [];
  selectedSection: any;
  studentId: any;
  student: any = {};
  course: any = [];
  maxUnits: any;

  hasSchedule: boolean = false;

  constructor(
    private authService: AuthService,
    private programService: ProgramService,
    private studentService: StudentService,
    private scheduleService: ScheduleService
  ) {}

  ngOnInit(): void {
    this.studentId = this.authService.getUserId;
    this.getStudent();
  }

  getStudent = () => {
    this.studentService
      .getStudentById(this.studentId)
      .subscribe((data: any) => {
        console.log(data);

        this.student = data;
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

  toggleShowDropdown = () => {
    this.isShowDropdown = !this.isShowDropdown;
    this.isShowMobileNav = false;
    this.isShowNotifications = false;
  };

  toggleShowNotifications = () => {
    this.isShowNotifications = !this.isShowNotifications;
    this.isShowMobileNav = false;
    this.isShowDropdown = false;
  };

  openMobileNav = () => {
    this.isShowMobileNav = true;
  };

  closeMobileNav = () => {
    this.isShowMobileNav = false;
  };
}
