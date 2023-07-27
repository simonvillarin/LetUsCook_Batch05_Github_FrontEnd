import { StudentService } from './../../../../shared/services/student/student.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MessageService } from 'primeng/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApplicationService } from 'src/app/shared/services/application/application.service';
import { DatePipe } from '@angular/common';
import { ParentService } from 'src/app/shared/services/parent/parent.service';
import { AccountService } from 'src/app/shared/services/account/account.service';
import { Paginator } from 'primeng/paginator';
import { AuthService } from 'src/app/core/services/auth.service';
import { GradeService } from 'src/app/shared/services/grade/grade.service';
import { AttendanceStudentService } from 'src/app/shared/services/attendance-student/attendance-student.service';
import { RoomService } from 'src/app/shared/services/room/room.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss'],
  providers: [MessageService, DatePipe],
})
export class StudentComponent implements OnInit {
  @ViewChild('paginator', { static: true }) paginator: Paginator | undefined;

  sectionForm: FormGroup;

  applications: any = [];
  application: any = {};
  students: any = [];
  student: any = {};
  sections: any = [];
  selectedSchedules: any = [];
  schedules: any = [];
  yearLevelSelectedStudent: string = '';
  termSelectedStudent: string = '';
  yearLevelSelectedApplication: string = '';
  termSelectedApplication: string = '';

  isInputDisabled: boolean = true;
  isDialogOpen: boolean = false;
  isDeleteDialogOpen: boolean = false;
  isConfirmDialogOpen: boolean = false;
  isEditing: boolean = false;
  isRemoveDialogOpen = false;
  isApprovalDialogOpen: boolean = false;
  scheduleDialog: boolean = false;
  status: boolean = false;

  yearLevels = ['First Year', 'Second Year', 'Fourth Year', 'Fifth Year'];
  terms = ['First Term', 'Second Term'];

  confirmTitle = '';

  constructor(
    private applicationService: ApplicationService,
    private studentService: StudentService,
    private parentService: ParentService,
    private accountService: AccountService,
    private gradeService: GradeService,
    private roomService: RoomService,
    private fb: FormBuilder,
    private datePipe: DatePipe
  ) {
    this.sectionForm = this.fb.group({
      studentName: ['', [Validators.required]],
      program: ['', [Validators.required]],
      sectionName: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.getAllApplications();
    this.getAllStudents();
  }
  getAllApplications = () => {
    this.applicationService.getAllApplications().subscribe((data: any) => {
      this.applications = data.sort(
        (a: any, b: any) => a.applicationId - b.applicationId
      );
      this.applications = this.applications.filter(
        (app: any) => app.status == false
      );
    });
  };

  getAllStudents = () => {
    this.studentService.getAllStudents().subscribe((data: any) => {
      this.students = data.sort((a: any, b: any) => a.studentId - b.studentId);
    });
  };

  convertDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return this.datePipe.transform(date, 'MMMM d, y');
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

  onApproval = (student: any) => {
    this.student = student;
    this.schedules = student.tempSched;
    console.log(student);
    this.scheduleDialog = true;
  };

  onCloseSchedTable = () => {
    this.scheduleDialog = false;
  };

  onApprovalDialog = () => {
    this.isApprovalDialogOpen = true;
  };

  onCloseApprovalDialog = () => {
    this.isApprovalDialogOpen = false;
  };

  isObjectUnique = (obj1: any, obj2: any) => {
    return obj1.room.roomNumber === obj2.room.roomNumber;
  };

  getUniqueObjects = (arr: any) => {
    return arr.filter((item: any, index: any, self: any) => {
      return (
        self.findIndex((obj: any) => this.isObjectUnique(obj, item)) === index
      );
    });
  };

  onApprove = () => {
    if (this.selectedSchedules.length > 0) {
      const schedId: any = [];
      this.selectedSchedules.map((sched: any) => {
        sched.schedId.map((id: number) => {
          schedId.push(id);
        });
      });

      const payload = {
        schedId: schedId,
        tempSchedId: [],
      };

      this.studentService
        .updateStudent(this.student.studentId, payload)
        .subscribe(() => {
          this.getAllStudents();
          this.isApprovalDialogOpen = false;
          this.scheduleDialog = false;
        });

      this.selectedSchedules.map((sched: any) => {
        const payload = {
          professorId: sched.professor.professorId,
          studentId: this.student.studentId,
          subjectId: sched.subject.subjectId,
          prelim: '',
          midterm: '',
          finals: '',
          sem: this.student.sem,
          academicYear: this.student.academicYear,
          comment: '',
          remarks: '',
          dateModified: '',
        };
        this.gradeService.addGrade(payload).subscribe();
      });

      const uniqueRooms = this.getUniqueObjects(this.selectedSchedules);
      uniqueRooms.map((room: any) => {
        this.roomService
          .getRoomById(room.room.roomId)
          .subscribe((data: any) => {
            let numOfStudents = data.numOfStudents + 1;
            let payload = {
              numOfStudents: numOfStudents,
            };
            this.roomService.updateRoom(room.room.roomId, payload).subscribe();
          });
      });
    }
  };

  onClickRemove = (student: any) => {
    this.student = student;
    this.isRemoveDialogOpen = true;
  };

  onRemoveStudent = () => {
    console.log(this.student, 'is the student');

    const payload = {
      programCode: this.student.program.programCode,
      yearLevel: this.student.yearLevel,
      sem: this.student.sem,
      academicYear: this.student.academicYear,
      firstname: this.student.firstname,
      middlename: this.student.middlename,
      lastname: this.student.lastname,
      suffix: this.student.suffix,
      gender: this.student.gender,
      civilStatus: this.student.civilStatus,
      birthdate: this.student.birthdate,
      birthplace: this.student.birthplace,
      citizenship: this.student.citizenship,
      religion: this.student.religion,
      unit: this.student.unit,
      street: this.student.street,
      subdivision: this.student.subdivision,
      barangay: this.student.barangay,
      city: this.student.city,
      province: this.student.province,
      zipcode: this.student.zipcode,
      telephone: this.student.telephone,
      mobile: this.student.mobile,
      email: this.student.email,
      lastSchoolAttended: this.student.lastSchoolAttended,
      programTaken: this.student.programTaken,
      lastSem: this.student.lastSem,
      lastYearLevel: this.student.lastYearLevel,
      lastSchoolYear: this.student.lastSchoolYear,
      dateOfGraduation: this.student.dateOfGraduation,
      parentFirstname: this.student.parent.firstname,
      parentMiddlename: this.student.parent.middlename,
      parentLastname: this.student.parent.lastname,
      parentSuffix: this.student.parent.suffix,
      parentAddress: this.student.parent.address,
      parentContact: this.student.parent.contact,
      parentRelationship: this.student.parent.relationship,
      status: false,
    };

    this.applicationService.addApplication(payload).subscribe(() => {
      this.accountService.deleteAccount(this.student.studentId).subscribe();
      this.accountService
        .deleteAccount(this.student.parent.parentId)
        .subscribe();
      this.parentService.deleteParent(this.student.parent.parentId).subscribe();
      this.studentService
        .deleteStudent(this.student.studentId)
        .subscribe(() => {
          this.getAllStudents();
          this.getAllApplications();
        });

      this.isRemoveDialogOpen = false;
    });
  };

  onClickActive = (student: any) => {
    this.student = student;
    this.status = this.student.activeDeactive;
    this.isDeleteDialogOpen = true;
  };

  onDeleteStudent = () => {
    const payload = {
      activeDeactive: !this.student.activeDeactive,
    };
    this.studentService
      .updateStudent(this.student.studentId, payload)
      .subscribe(() => {
        this.parentService
          .updateParent(this.student.parent.parentId, payload)
          .subscribe();
        this.getAllStudents();
        this.isDeleteDialogOpen = false;
      });
  };

  onCloseDeleteDialog = () => {
    this.isConfirmDialogOpen = false;
    this.student = null;
  };

  onDeleteApplication = (application: any) => {
    this.application = application;
    this.confirmTitle = 'Disapprove';
    this.isEditing = false;
    this.isConfirmDialogOpen = true;
  };

  onEditApplication = (application: any) => {
    console.log(application, 'is the application');

    this.application = application;
    this.confirmTitle = 'Approve';
    this.isEditing = true;
    this.isConfirmDialogOpen = true;
  };

  onClickConfirm = () => {
    if (this.isEditing) {
      const payload = {
        status: true,
      };
      this.application.schedId = [];
      this.applicationService
        .updateApplication(this.application.appId, payload)
        .subscribe(() => {
          this.isConfirmDialogOpen = false;
          this.studentService
            .addStudent(this.application)
            .subscribe(() => this.getAllStudents());
          this.applicationService
            .deleteApplication(this.application.appId)
            .subscribe(() => {
              this.isConfirmDialogOpen = false;
              this.getAllApplications();
            });
          this.getAllApplications();
        });
    } else {
      this.applicationService
        .deleteApplication(this.application.appId)
        .subscribe(() => {
          this.isConfirmDialogOpen = false;
          this.getAllApplications();
        });
    }
  };

  onYearChangeStudent = () => {
    this.studentService.getAllStudents().subscribe((data: any) => {
      this.students = data.sort((a: any, b: any) => a.studentId - b.studentId);
      if (this.termSelectedStudent == '') {
        this.students = this.students.filter(
          (data: any) => data.yearLevel == this.yearLevelSelectedStudent
        );
      } else {
        this.students = this.students.filter(
          (data: any) =>
            data.yearLevel == this.yearLevelSelectedStudent &&
            data.sem == this.termSelectedStudent
        );
      }
    });
  };

  onTermChangeStudent = () => {
    this.studentService.getAllStudents().subscribe((data: any) => {
      this.students = data.sort((a: any, b: any) => a.studentId - b.studentId);
      if (this.yearLevelSelectedStudent == '') {
        this.students = this.students.filter(
          (data: any) => data.sem == this.termSelectedStudent
        );
      } else {
        this.students = this.students.filter(
          (data: any) =>
            data.yearLevel == this.yearLevelSelectedStudent &&
            data.sem == this.termSelectedStudent
        );
      }
    });
  };

  onYearChangeApplication = () => {
    this.applicationService.getAllApplications().subscribe((data: any) => {
      this.applications = data.sort(
        (a: any, b: any) => a.applicationId - b.applicationId
      );
      if (this.termSelectedApplication == '') {
        this.applications = this.applications.filter(
          (data: any) => data.yearLevel == this.yearLevelSelectedApplication
        );
      } else {
        this.applications = this.applications.filter(
          (data: any) =>
            data.yearLevel == this.yearLevelSelectedApplication &&
            data.sem == this.termSelectedApplication
        );
      }
    });
  };

  onTermChangeApplication = () => {
    this.applicationService.getAllApplications().subscribe((data: any) => {
      this.applications = data.sort(
        (a: any, b: any) => a.applicationId - b.applicationId
      );
      if (this.yearLevelSelectedApplication == '') {
        this.applications = this.applications.filter(
          (data: any) => data.sem == this.termSelectedApplication
        );
      } else {
        this.applications = this.applications.filter(
          (data: any) =>
            data.yearLevel == this.yearLevelSelectedApplication &&
            data.sem == this.termSelectedApplication
        );
      }
    });
  };

  refreshStudent = () => {
    this.yearLevelSelectedStudent = '';
    this.termSelectedStudent = '';
    this.studentService.getAllStudents().subscribe((data: any) => {
      this.students = data.sort((a: any, b: any) => a.studentId - b.studentId);
    });
  };

  refreshApplication = () => {
    this.yearLevelSelectedApplication = '';
    this.termSelectedApplication = '';
    this.applicationService.getAllApplications().subscribe((data: any) => {
      this.applications = data.sort(
        (a: any, b: any) => a.applicationId - b.applicationId
      );
      this.applications = this.applications.filter(
        (app: any) => app.status == false
      );
    });
  };
}
