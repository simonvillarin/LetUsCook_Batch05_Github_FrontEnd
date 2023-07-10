import { StudentService } from './../../../../shared/services/student/student.service';
import { Component, OnInit } from '@angular/core';
import { HttpEvent } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SectionService } from 'src/app/shared/services/section/section.service';

interface UploadEvent {
  originalEvent: HttpEvent<any>;
  files: File[];
}

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss'],
  providers: [MessageService],
})
export class StudentComponent implements OnInit {
  constructor(
    private studentService: StudentService,
    private sectionService: SectionService,
    private fb: FormBuilder,
    private messageService: MessageService
  ) {
    this.sectionForm = this.fb.group({
      studentName: ['', [Validators.required]],
      program: ['', [Validators.required]],
      sectionName: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.getAllStudents();
  }

  sectionForm: FormGroup;

  students: any = [];
  student: any = [];
  sections: any = [];

  isInputDisabled: boolean = true;
  isDialogOpen: boolean = false;
  isDeleteDialogOpen: boolean = false;
  status: boolean = false;

  onBasicUploadAuto(event: UploadEvent) {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'File Uploaded successfully',
    });
  }

  getAllStudents = () => {
    this.studentService.getAllStudents().subscribe((data: any) => {
      this.students = data.sort((a: any, b: any) => a.studentId - b.studentId);
      console.log(this.students);
    });
  };

  getAllSections() {
    this.sectionService.getAllSections().subscribe((data: any) => {
      this.sections = data;
      this.sections = this.sections.map(
        (section: any) => (this.sections = section.sectionName)
      );
      console.log(this.sections);
    });
  }

  onClickRemove = (student: any) => {
    this.student = student;
    this.status = this.student.activeDeactive;
    this.isDeleteDialogOpen = true;
  };

  onCloseDeleteDialog = () => {
    this.isDeleteDialogOpen = false;
    this.student = null;
  };

  onDeleteStudent = () => {
    if (this.student) {
      const payload = {
        activeDeactive: !this.student.activeDeactive,
      };
      this.studentService
        .updateStudent(this.student.studentId, payload)
        .subscribe(() => this.getAllStudents());
      this.isDeleteDialogOpen = false;
      this.student = null;
    }
  };

  onEditStudent = (student: any) => {
    this.student = student;
    this.isDialogOpen = true;
    const studentName =
      this.student.firstname +
      ' ' +
      this.student.middlename +
      ' ' +
      this.student.lastname;
    if (this.student) {
      this.sectionForm.patchValue({
        studentName: studentName,
        program: this.student.program.programCode,
      });
      this.sectionForm.get('studentName')?.disable();
      this.sectionForm.get('program')?.disable();
      this.getAllSections();
    }
  };

  onEnrollStudent = () => {
    if (this.sectionForm.valid) {
      const payload: any = {};
      if (this.student.section != this.sectionForm.get('sectionName')?.value) {
        payload.section = this.sectionForm.get('sectionName')?.value;
        payload.enrollmentStatus = 'Enrolled';
      }
      this.studentService
        .updateStudent(this.student.studentId, payload)
        .subscribe(() => {
          this.getAllStudents();
          this.isDialogOpen = false;
        });
    } else {
      console.log('form invalid');
    }
  };
}
