import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormArray,
  FormControl,
} from '@angular/forms';
import { CourseService } from 'src/app/shared/services/course/course.service';
import { ProgramService } from 'src/app/shared/services/program/program.service';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss'],
})
export class CourseComponent implements OnInit {
  courseForm: FormGroup;
  preRequisiteFormArray: FormArray;

  subjects: any[] = [];
  subject: any;
  programs = ['Select a program'];
  types = ['Select a type', 'Major', 'Minor', 'Elective'];

  isShowDropdown = false;
  isShowMobileNav = false;
  isShowNotifications = false;
  isDialogOpen: boolean = false;
  isDeleteDialogOpen: boolean = false;
  isUpdating: boolean = false;
  buttonClicked: boolean = false;

  title: string = '';

  constructor(
    private courseService: CourseService,
    private programService: ProgramService,
    private fb: FormBuilder
  ) {
    this.courseForm = fb.group({
      programCode: ['', [Validators.required]],
      subjectCode: ['', [Validators.required]],
      subjectTitle: ['', [Validators.required]],
      units: ['', [Validators.required]],
      preRequisites: new FormControl<string[] | null>(null),
      type: ['', [Validators.required]],
    });
    this.preRequisiteFormArray = this.courseForm.controls[
      'preRequisites'
    ] as FormArray;
  }

  ngOnInit(): void {
    this.getAllSubjects();
    this.getAllProgramCodes();
  }

  getAllProgramCodes = () => {
    this.programService.getAllPrograms().subscribe((data: any) => {
      data.map((d: any) => {
        this.programs = [...this.programs, d.programCode];
      });
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
    scroll(0, 0);
  };

  closeMobileNav = () => {
    this.isShowMobileNav = false;
  };

  onClickAdd = () => {
    this.title = 'Add Course';
    this.isDialogOpen = true;
    this.courseForm.markAsUntouched();
  };

  onClickCancel = () => {
    this.isDialogOpen = false;
    this.courseForm.reset();
  };

  getAllSubjects = () => {
    this.courseService.getAllSubjects().subscribe((subject) => {
      console.log(subject);

      this.subjects = subject;
    });
  };

  onClickSave = () => {
    if (this.isUpdating) {
      this.title = 'Edit Subject';
      if (this.courseForm.valid) {
        const programCode = this.courseForm.get('programCode')?.value;
        const subjectCode = this.courseForm.get('subjectCode')?.value;
        const subjectTitle = this.courseForm.get('subjectTitle')?.value;
        const unit = this.courseForm.get('units')?.value;
        const preRequisite = this.courseForm.get('preRequisites')?.value;
        const type = this.courseForm.get('type')?.value;
        let payload: any = {};

        if (this.subject.programCode != programCode) {
          payload.programCode = programCode;
        }
        if (this.subject.subjectCode != subjectCode) {
          payload.subjectCode = subjectCode;
        }
        if (this.subject.subjectTitle != subjectTitle) {
          payload.subjectTitle = subjectTitle;
        }
        if (this.subject.unit != unit) {
          payload.unit = unit;
        }
        if (this.subject.preRequisite != preRequisite) {
          payload.preRequisite = preRequisite;
        }
        if (this.subject.type != type) {
          payload.type = type;
        }

        console.log(this.subject.subjectId);
        this.courseService
          .updateSubject(this.subject.subjectId, payload)
          .subscribe((res: any) => {
            if (res.message == 'Subject code already exist') {
              alert('Subject code already exist');
            } else if (res.message == 'Subject title already exist') {
              alert('Subject title already exist');
            } else {
              const index = this.subjects.findIndex(
                (subject: any) => subject.subjectId == this.subject.subjectId
              );

              this.subjects[index].programCode = programCode;
              this.subjects[index].subjectCode = subjectCode;
              this.subjects[index].subjectTitle = subjectTitle;
              this.subjects[index].unit = unit;
              this.subjects[index].preRequisite = preRequisite;
              this.subjects[index].type = type;
              this.isDialogOpen = false;
              this.courseForm.reset();
              this.isUpdating = false;
            }
          });
      } else {
        this.courseForm.markAllAsTouched();
      }
    } else {
      this.title = 'Add Subject';
      if (this.courseForm.valid) {
        const payload = {
          programCode: this.courseForm.get('programCode')?.value,
          subjectCode: this.courseForm.get('subjectCode')?.value,
          subjectTitle: this.courseForm.get('subjectTitle')?.value,
          units: this.courseForm.get('units')?.value,
          preRequisites: this.courseForm.get('preRequisites')?.value,
          type: this.courseForm.get('type')?.value,
        };
        this.courseService.addSubject(payload).subscribe((res: any) => {
          console.log(res);

          if (res.message == 'Subject code already exist') {
            alert('Subject code already exist');
          } else if (res.message == 'Subject title already exist') {
            alert('Subject title already exist');
          } else {
            this.getAllSubjects();
            this.isDialogOpen = false;
            this.courseForm.reset();
          }
        });
      } else {
        this.courseForm.markAllAsTouched();
      }
    }
  };

  onClickEdit = (subject: any) => {
    this.subject = null;
    this.isUpdating = true;
    this.title = 'Edit Course';
    this.subject = subject;
    console.log(this.subject);

    this.courseForm.patchValue({
      programCode: subject.programCode,
      subjectCode: subject.subjectCode,
      subjectTitle: subject.subjectTitle,
      units: subject.units,
      preRequisites: subject.preRequisites,
      type: subject.type,
    });

    this.isDialogOpen = true;
  };

  onClickRemove = (subject: any) => {
    this.subject = null;
    this.isDeleteDialogOpen = true;
    this.subject = subject;
  };

  onDeleteSubject = () => {
    this.isDeleteDialogOpen = false;
    let payload = { activeDeactive: !this.subject.status };
    this.courseService
      .updateSubject(this.subject.subjectId, payload)
      .subscribe(() => {});
    const index = this.subjects.findIndex(
      (subject: any) => subject.subjectId == this.subject.subjectId
    );
    this.subjects[index].status = payload.activeDeactive;
  };

  clearForm = () => {
    this.courseForm.reset();
  };
}
