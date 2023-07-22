import { StudentService } from './../../../../shared/services/student/student.service';
import { Component, OnInit } from '@angular/core';
import { HttpEvent } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SectionService } from 'src/app/shared/services/section/section.service';
import { ApplicationService } from 'src/app/shared/services/application/application.service';
import { DatePipe } from '@angular/common';
import { ParentService } from 'src/app/shared/services/parent/parent.service';
import { AccountService } from 'src/app/shared/services/account/account.service';
interface UploadEvent {
  originalEvent: HttpEvent<any>;
  files: File[];
}

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss'],
  providers: [MessageService, DatePipe],
})
export class StudentComponent implements OnInit {
  constructor(
    private applicationService: ApplicationService,
    private studentService: StudentService,
    private parentService: ParentService,
    private accountService: AccountService,
    private fb: FormBuilder,
    private messageService: MessageService,
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

  sectionForm: FormGroup;

  applications: any = [];
  application: any = {};
  students: any = [];
  student: any;
  sections: any = [];

  isInputDisabled: boolean = true;
  isDialogOpen: boolean = false;
  isDeleteDialogOpen: boolean = false;
  isConfirmDialogOpen: boolean = false;
  isEditing: boolean = false;
  isRemoveDialogOpen = false;
  status: boolean = false;

  confirmTitle = '';

  onBasicUploadAuto(event: UploadEvent) {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'File Uploaded successfully',
    });
  }

  getAllApplications = () => {
    this.applicationService.getAllApplications().subscribe((data: any) => {
      this.applications = data.sort(
        (a: any, b: any) => a.applicationId - b.applicationId
      );
      this.applications = this.applications.filter(
        (app: any) => app.status == false
      );
      this.applications.forEach((app: any) => {
        app.applicationDate = this.datePipe.transform(
          app.applicationDate,
          'MMMM dd, yyyy'
        );
      });
    });
  };

  getAllStudents = () => {
    this.studentService.getAllStudents().subscribe((data: any) => {
      this.students = data.sort((a: any, b: any) => a.studentId - b.studentId);
      console.log(this.students);
    });
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
    console.log(payload);

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

  onClickEdit = (student: any) => {
    console.log(student);
  };
}
