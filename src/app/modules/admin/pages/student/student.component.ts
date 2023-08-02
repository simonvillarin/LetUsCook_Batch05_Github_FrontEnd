import { StudentService } from './../../../../shared/services/student/student.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MessageService } from 'primeng/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApplicationService } from 'src/app/shared/services/application/application.service';
import { DatePipe } from '@angular/common';
import { ParentService } from 'src/app/shared/services/parent/parent.service';
import { AccountService } from 'src/app/shared/services/account/account.service';
import { Paginator } from 'primeng/paginator';
import { GradeService } from 'src/app/shared/services/grade/grade.service';
import { AttendanceStudentService } from 'src/app/shared/services/attendance-student/attendance-student.service';
import { RoomService } from 'src/app/shared/services/room/room.service';
import { EvalsService } from 'src/app/shared/services/evals/evals.service';
import { PdfService } from 'src/app/shared/services/pdf/pdf.service';
import { EmailService } from 'src/app/shared/services/email/email.service';

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
    private attendanceStudentService: AttendanceStudentService,
    private pdfService: PdfService,
    private evalService: EvalsService,
    private emailService: EmailService,
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
    if (this.selectedSchedules.length > 0) {
      this.student = student;
      this.schedules = student.tempSched;
      this.scheduleDialog = true;
    }
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

      this.pdfService.generatePDF(this.student.studentId).subscribe();

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
          yearLevel: this.student.yearLevel,
          sem: this.student.sem,
          academicYear: this.student.academicYear,
          comment: '',
          remarks: '',
          dateModified: '',
        };
        this.gradeService.addGrade(payload).subscribe();

        const payload1 = {
          studentId: this.student.studentId,
          subjectId: sched.subject.subjectId,
          sem: this.student.sem,
          yearLevel: this.student.yearLevel,
          academicYear: this.student.academicYear,
          status: '',
        };
        this.attendanceStudentService.addAttendance(payload1).subscribe();

        const payload2 = {
          section: sched.section.section,
          subjectId: sched.subject.subjectId,
        };
        console.log(payload2);

        this.evalService
          .addEval(payload2)
          .subscribe((res) => console.log(res, 'res'));
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
    const payload = {
      status: false,
    };

    this.applicationService
      .updateApplication(this.student.appId, payload)
      .subscribe((res) => {
        this.accountService.deleteAccount(this.student.studentId).subscribe();
        this.accountService
          .deleteAccount(this.student.parent.parentId)
          .subscribe();
        this.parentService
          .deleteParent(this.student.parent.parentId)
          .subscribe();
        this.studentService.deleteStudent(this.student.studentId).subscribe();
        const emailPayload = {
          email: this.application.email,
          subject: 'Update on Your Application to Educate University',
          body:
            'Dear ' +
            this.application.firstname +
            ',' +
            '\n\n' +
            'I hope this email finds you well. I am writing to inform you about the status of your application to Educate University. After careful consideration and review by our admissions committee, we regret to inform you that we are unable to offer you a place as a student in the upcoming academic year. ' +
            '\n' +
            'Please know that our admissions process is highly competitive, and we receive many exceptional applications each year. While we recognize your accomplishments and strengths, we had to make difficult decisions due to the limited number of available spaces. ' +
            '\n' +
            'We understand that this may be disappointing news, and we want to assure you that this decision does not reflect on your abilities or potential. Many factors contribute to our selection process, and we encourage you to explore other educational opportunities that align with your goals and aspirations. ' +
            '\n\n' +
            'Once again, thank you for considering Educate University. We wish you all the success and fulfillment in your academic and personal pursuits.' +
            '\n\n' +
            'With warm regards,' +
            '\n\n' +
            'Simon Villarin' +
            '\n' +
            'School Registrar' +
            '\n' +
            'Educate University',
        };
        this.emailService.sendEmail(emailPayload).subscribe(() => {
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
  };

  onDeleteApplication = (application: any) => {
    this.application = application;
    this.confirmTitle = 'Disapprove';
    this.isEditing = false;
    this.isConfirmDialogOpen = true;
  };

  onEditApplication = (application: any) => {
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
          this.studentService.addStudent(this.application).subscribe(() => {
            this.getAllStudents();
          });
          this.getAllApplications();
        });
    } else {
      const payload = {
        status: this.isEditing,
      };
      this.applicationService
        .updateApplication(this.application.appId, payload)
        .subscribe(() => {
          const emailPayload = {
            email: this.application.email,
            subject: 'Update on Your Application to Educate University',
            body:
              'Dear ' +
              this.application.firstname +
              ',' +
              '\n\n' +
              'I hope this email finds you well. I am writing to inform you about the status of your application to Educate University. After careful consideration and review by our admissions committee, we regret to inform you that we are unable to offer you a place as a student in the upcoming academic year. ' +
              '\n' +
              'Please know that our admissions process is highly competitive, and we receive many exceptional applications each year. While we recognize your accomplishments and strengths, we had to make difficult decisions due to the limited number of available spaces. ' +
              '\n' +
              'We understand that this may be disappointing news, and we want to assure you that this decision does not reflect on your abilities or potential. Many factors contribute to our selection process, and we encourage you to explore other educational opportunities that align with your goals and aspirations. ' +
              '\n\n' +
              'Once again, thank you for considering Educate University. We wish you all the success and fulfillment in your academic and personal pursuits.' +
              '\n\n' +
              'With warm regards,' +
              '\n\n' +
              'Simon Villarin' +
              '\n' +
              'School Registrar' +
              '\n' +
              'Educate University',
          };
          this.emailService.sendEmail(emailPayload).subscribe(() => {
            this.getAllApplications();
            this.isConfirmDialogOpen = false;
          });
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
