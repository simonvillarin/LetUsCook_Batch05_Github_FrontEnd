import { ProgramService } from './../../../../shared/services/program/program.service';
import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { ScheduleService } from 'src/app/shared/services/schedule/schedule.service';
import { StudentService } from 'src/app/shared/services/student/student.service';
import { Paginator } from 'primeng/paginator';
import { SectionService } from 'src/app/shared/services/section/section.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss'],
})
export class CourseComponent {
  @ViewChild('paginator', { static: true }) paginator: Paginator | undefined;

  selectedSchedules: any[] = [];
  schedules: any = [];
  sections: any = [];
  sched: any = [];
  selectedSection: any;
  studentId: any;
  student: any = {};
  maxUnits: any;

  isDialogOpen: boolean = true;
  confirmationDialog: boolean = false;
  errorDialog: boolean = false;
  successDialog: boolean = false;
  hasSchedule: boolean = false;

  errorMessage: string = '';
  title: string = '';
  search: string = '';

  constructor(
    private fb: FormBuilder,
    private studentService: StudentService,
    private authService: AuthService,
    private scheduleService: ScheduleService,
    private sectionService: SectionService,
    private programService: ProgramService,
    private router: Router
  ) {}

  ngOnInit() {
    this.studentId = this.authService.getUserId();
    this.getStudent();
    this.getAllSchedules();
    this.getSectionsByProgram();
  }

  getStudent = () => {
    this.studentService
      .getStudentById(this.studentId)
      .subscribe((data: any) => {
        this.student = data;
        this.sched = data.schedules;
        data.tempSched.map((sched: any) => {
          this.selectedSchedules.push(sched);
        });
        this.getProgram();
        if (this.student.schedules.length > 0) {
          this.hasSchedule = true;
        }
      });
  };

  getAllSchedules = () => {
    this.scheduleService
      .getScheduleByStudentId(this.studentId)
      .subscribe((data: any) => {
        this.schedules = data;
        console.log(this.schedules, 'is the schedule');
      });
  };

  getSectionsByProgram = () => {
    this.sectionService
      .getSectionByProgram(this.studentId)
      .subscribe((data: any) => {
        data.map((section: any) => {
          this.sections.push(section);
        });
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

  onSearchChange = (searchTerm: string) => {
    if (searchTerm != '') {
      this.schedules = this.schedules.filter((sched: any) =>
        sched.subject.subjectTitle
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      );
    } else {
      this.getAllSchedules();
    }
  };

  onChangeSection = (section: any) => {
    this.scheduleService
      .getScheduleByStudentId(this.studentId)
      .subscribe((data: any) => {
        this.schedules = data;
        this.schedules = this.schedules.filter(
          (sched: any) => sched.section.section == section
        );
        this.selectedSchedules = [];
        this.schedules.map((sched: any) => {
          this.selectedSchedules.push(sched);
        });
      });
  };

  convertTime = (time: any) => {
    const splitTime = time.split(':');
    let hour;
    let zone;
    if (parseInt(splitTime[0]) == 13) {
      hour = 1;
    } else if (parseInt(splitTime[0]) == 13) {
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
    } else if (parseInt(splitTime[0]) == 24 || splitTime[0] == '00') {
      hour = 12;
    } else {
      hour = splitTime[0];
    }

    if (parseInt(splitTime[0]) > 12) {
      zone = 'PM';
    } else {
      zone = 'AM';
    }

    return hour + ':' + splitTime[1] + ' ' + zone;
  };

  onConfirm = () => {
    if (this.selectedSchedules.length > 0) {
      this.confirmationDialog = true;
    }
  };

  onClose = () => {
    this.confirmationDialog = false;
  };

  isObjectUnique = (obj1: any, obj2: any) => {
    return obj1.subject.subjectId === obj2.subject.subjectId;
  };

  getUniqueObjects = (arr: any) => {
    return arr.filter((item: any, index: any, self: any) => {
      return (
        self.findIndex((obj: any) => this.isObjectUnique(obj, item)) === index
      );
    });
  };

  areObjectsEqual = (obj1: any, obj2: any): boolean => {
    return JSON.stringify(obj1) === JSON.stringify(obj2);
  };

  hasDuplicateSubjectId = (arr: any) => {
    const temp: any = [];
    let hasDuplicate = false;
    arr.map((sched: any) => {
      temp.push(sched);
      temp.map((t: any) => {
        if (
          t.subject.subjectId == sched.subject.subjectId &&
          t.section.section != sched.section.section
        ) {
          hasDuplicate = true;
        }
      });
    });
    return hasDuplicate;
  };

  onRequest = () => {
    const schedId: any = [];
    let totalUnits = 0;
    this.selectedSchedules.map((sched: any) => {
      sched.schedId.map((id: number) => {
        schedId.push(id);
      });
    });
    const uniqueObjects = this.getUniqueObjects(this.selectedSchedules);
    uniqueObjects.map((obj: any) => {
      totalUnits += obj.subject.units;
    });
    const hasDuplicate = this.hasDuplicateSubjectId(this.selectedSchedules);

    if (totalUnits > this.maxUnits) {
      this.confirmationDialog = false;
      this.errorMessage =
        'The maximum number of units required for your year level and term is only' +
        this.maxUnits;
      this.errorDialog = true;
    } else if (hasDuplicate) {
      this.confirmationDialog = false;
      this.errorMessage =
        'You cannot select the same subject twice or more. Please choose different subjects for your request.';
      this.errorDialog = true;
    } else {
      this.studentService
        .updateStudent(this.studentId, { tempSchedId: schedId })
        .subscribe(() => {
          this.getStudent();
          this.confirmationDialog = false;
          this.successDialog = true;
        });
    }
  };

  onOkError = () => {
    this.errorDialog = false;
  };

  onOkSuccess = () => {
    this.successDialog = false;
  };

  reset = () => {
    this.getAllSchedules();
    this.selectedSchedules = [];
    this.getStudent();
  };

  onClickEvaluate = () => {
    this.title = 'Course Evaluation';
    this.isDialogOpen = true;
  };

  onStudentsTable = (load: any) => {
    const sectionId = load.section.sectionId;
    const subjectId = load.subject.subjectId;
    this.router.navigate([`student/course/${sectionId}-${subjectId}`]);
  };
}
