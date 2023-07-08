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
  programs: string[] = [];
  types = ['Major', 'Minor', 'Elective'];

  isShowDropdown = false;
  isShowMobileNav = false;
  isShowNotifications = false;
  isDialogOpen: boolean = false;
  isDeleteDialogOpen: boolean = false;
  isUpdating: boolean = false;
  buttonClicked: boolean = false;

  title: string = '';
  status: boolean = false;

  constructor(
    private courseService: CourseService,
    private programService: ProgramService,
    private fb: FormBuilder
  ) {
    this.courseForm = fb.group({
      programTitle: ['', [Validators.required]],
      subjectCode: ['', [Validators.required]],
      subjectTitle: ['', [Validators.required]],
      units: ['', [Validators.required]],
      preRequisites: new FormControl<string[] | null>(null),
      type: ['', [Validators.required]],
    });
    this.preRequisiteFormArray = this.courseForm.get(
      'preRequisites'
    ) as FormArray;
  }

  ngOnInit(): void {
    this.getAllSubjects();
    this.getAllProgramCodes();
  }

  getAllProgramCodes = () => {
    this.programService.getAllPrograms().subscribe((data: any) => {
      data.map((d: any) => {
        this.programs.push(d.programTitle);
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
    this.preRequisiteFormArray.reset();
    this.courseForm.reset();
    this.courseForm.markAsUntouched();
    this.isUpdating = false;
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
        const programTitle = this.courseForm.get('programTitle')?.value;
        const subjectCode = this.courseForm.get('subjectCode')?.value;
        const subjectTitle = this.courseForm.get('subjectTitle')?.value;
        const unit = this.courseForm.get('units')?.value;
        const preRequisite = this.courseForm.get('preRequisites')?.value;
        const type = this.courseForm.get('type')?.value;
        let payload: any = {};

        if (this.subject.programTitle != programTitle) {
          payload.programTitle = programTitle;
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

        this.courseService
          .updateSubject(this.subject.subjectId, payload)
          .subscribe((res: any) => {
            console.log(res);
            console.log(this.courseForm.value);

            if (res.message == 'Subject code already exist') {
              alert('Subject code already exist');
            } else if (res.message == 'Subject title already exist') {
              alert('Subject title already exist');
            } else {
              const index = this.subjects.findIndex(
                (subject: any) => subject.subjectId == this.subject.subjectId
              );

              this.subjects[index].programTitle = programTitle;
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
        this.courseService
          .addSubject(this.courseForm.value)
          .subscribe((res: any) => {
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
    this.subject = subject;
    this.isUpdating = true;
    this.courseForm.reset();
    this.title = 'Edit Course';

    this.courseForm.patchValue({
      programTitle: subject.programTitle,
      subjectCode: subject.subjectCode,
      subjectTitle: subject.subjectTitle,
      units: subject.units,
      preRequisites: subject.preRequisites,
      type: subject.type,
    });

    this.isDialogOpen = true;
  };

  onClickRemove = (subject: any) => {
    this.subject = subject;
    this.isDeleteDialogOpen = true;
    this.status = subject.activeDeactive;
  };

  onCloseDeleteDialog = () => {
    this.isDeleteDialogOpen = false;
  };

  onDeleteSubject = () => {
    this.isDeleteDialogOpen = false;
    let payload = { activeDeactive: !this.subject.activeDeactive };
    this.courseService
      .updateSubject(this.subject.subjectId, payload)
      .subscribe();
    const index = this.subjects.findIndex(
      (subject: any) => subject.subjectId == this.subject.subjectId
    );
    this.subjects[index].activeDeactive = !this.subject.activeDeactive;
    this.status = !this.subject.activeDeactive;
  };

  clearForm = () => {
    this.courseForm.reset();
  };
}
