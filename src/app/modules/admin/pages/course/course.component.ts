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
import { hasNegativeValue } from 'src/app/shared/validators/custom.validator';

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
  preRequisitesSelection: any = [];
  types = ['Major', 'Minor', 'Elective'];

  isShowDropdown = false;
  isShowMobileNav = false;
  isShowNotifications = false;
  isDialogOpen: boolean = false;
  isDeleteDialogOpen: boolean = false;
  isUpdating: boolean = false;
  buttonClicked: boolean = false;
  status: boolean = false;

  title: string = '';
  search: string = '';
  typeSelected: string = '';

  alert: boolean = false;
  alertStatus: string = '';
  alertMessage: string = '';

  constructor(
    private courseService: CourseService,
    private programService: ProgramService,
    private fb: FormBuilder
  ) {
    this.courseForm = fb.group({
      subjectCode: ['', [Validators.required]],
      subjectTitle: ['', [Validators.required]],
      units: ['', [Validators.required, hasNegativeValue()]],
      preRequisites: new FormControl<any[] | null>(null),
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

  getAllSubjects = () => {
    this.courseService.getAllSubjects().subscribe((data: any) => {
      this.subjects = data.sort((a: any, b: any) => b.subjectId - a.subjectId);
      const sorData = data.sort((a: any, b: any) => b.subjectId - a.subjectId);
      sorData.map((data: any) => {
        this.preRequisitesSelection.push({
          name: data.subjectTitle,
          value: data.subjectTitle,
        });
      });
    });
  };

  getAllProgramCodes = () => {
    this.programService.getAllPrograms().subscribe((data: any) => {
      data.map((d: any) => {
        this.programs.push(d.programTitle);
      });
    });
  };

  get subjectCode() {
    return this.courseForm.get('subjectCode') as FormControl;
  }

  get subjectTitle() {
    return this.courseForm.get('subjectTitle') as FormControl;
  }

  get units() {
    return this.courseForm.get('units') as FormControl;
  }

  get preRequisites() {
    return this.courseForm.get('preRequisites') as FormControl;
  }

  get type() {
    return this.courseForm.get('type') as FormControl;
  }

  onChangeSearch = (searchTerm: string) => {
    if (searchTerm != '') {
      this.subjects = this.subjects.filter((sub: any) =>
        sub.subjectTitle.toLowerCase().includes(searchTerm.toLowerCase())
      );
    } else {
      this.getAllSubjects();
    }
  };

  onChangeType = (type: string) => {
    this.courseService.getAllSubjects().subscribe((data: any) => {
      this.subjects = data.sort((a: any, b: any) => b.subjectId - a.subjectId);
      const sorData = data.sort((a: any, b: any) => b.subjectId - a.subjectId);
      sorData.map((data: any) => {
        this.preRequisitesSelection.push({
          name: data.subjectTitle,
          value: data.subjectTitle,
        });
      });
      this.subjects = this.subjects.filter((sub: any) => sub.type == type);
    });
  };

  reset = () => {
    this.search = '';
    this.typeSelected = '';
    this.getAllSubjects();
  };

  onAdd = () => {
    this.title = 'Add Subject';
    this.alert = false;
    this.preRequisitesSelection = [];
    this.courseService.getAllSubjects().subscribe((data: any) => {
      const sorData = data.sort((a: any, b: any) => b.subjectId - a.subjectId);
      sorData.map((data: any) => {
        this.preRequisitesSelection.push({
          name: data.subjectTitle,
          value: data.subjectTitle,
        });
      });
      this.isDialogOpen = true;
      this.preRequisiteFormArray.reset();
      this.courseForm.reset();
      this.courseForm.markAsUntouched();
      this.isUpdating = false;
    });
  };

  onClickCancel = () => {
    this.isDialogOpen = false;
    this.courseForm.reset();
  };

  onClickSave = () => {
    if (this.isUpdating) {
      this.title = 'Edit Subject';
      if (this.courseForm.valid) {
        const subjectCode = this.courseForm.get('subjectCode')?.value;
        const subjectTitle = this.courseForm.get('subjectTitle')?.value;
        const unit = this.courseForm.get('units')?.value;
        const preRequisites = this.courseForm.get('preRequisites')?.value;
        const type = this.courseForm.get('type')?.value;
        let payload: any = {};

        if (this.subject.subjectCode != subjectCode) {
          payload.subjectCode = subjectCode;
        }
        if (this.subject.subjectTitle != subjectTitle) {
          payload.subjectTitle = subjectTitle;
        }
        if (this.subject.units != unit) {
          payload.units = unit;
        }
        if (this.subject.preRequisites != preRequisites) {
          payload.preRequisites = preRequisites;
        }
        if (this.subject.type != type) {
          payload.type = type;
        }
        this.courseService
          .updateSubject(this.subject.subjectId, payload)
          .subscribe((res: any) => {
            if (res.message == 'Subject code already exist') {
              this.alert = true;
              this.alertStatus = 'Error';
              this.alertMessage = 'Subject code already exist';
              setTimeout(() => (this.alert = false), 3000);
            } else if (res.message == 'Subject title already exist') {
              this.alert = true;
              this.alertStatus = 'Error';
              this.alertMessage = 'Subject title already exist';
              setTimeout(() => (this.alert = false), 3000);
            } else {
              this.getAllSubjects();
              this.isDialogOpen = false;
              this.courseForm.reset();
              this.isUpdating = false;

              this.alert = true;
              this.alertStatus = 'Success';
              this.alertMessage = 'Subject successfully updated';
              setTimeout(() => (this.alert = false), 3000);
            }
          });
      } else {
        this.courseForm.markAllAsTouched();
      }
    } else {
      this.title = 'Add Subject';
      if (this.courseForm.valid) {
        console.log(this.courseForm.value);
        this.courseService
          .addSubject(this.courseForm.value)
          .subscribe((res: any) => {
            if (res.message == 'Subject code already exist') {
              this.alert = true;
              this.alertStatus = 'Error';
              this.alertMessage = 'Subject code already exist';
              setTimeout(() => (this.alert = false), 3000);
            } else if (res.message == 'Subject title already exist') {
              this.alert = true;
              this.alertStatus = 'Error';
              this.alertMessage = 'Subject title already exist';
              setTimeout(() => (this.alert = false), 3000);
            } else {
              this.getAllSubjects();
              this.isDialogOpen = false;
              this.courseForm.reset();
              this.alert = true;
              this.alertStatus = 'Success';
              this.alertMessage = 'Subject successfully added';
              setTimeout(() => (this.alert = false), 3000);
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
    this.title = 'Edit Subject';
    this.preRequisitesSelection = [];
    this.courseService.getAllSubjects().subscribe((data: any) => {
      const sorData = data.sort((a: any, b: any) => b.subjectId - a.subjectId);
      sorData.map((data: any) => {
        this.preRequisitesSelection.push({
          name: data.subjectTitle,
          value: data.subjectTitle,
        });
      });
      const filter: any = [];
      this.preRequisitesSelection.map((data: any) => filter.push(data.name));
      const filteredData = filter.filter(
        (data: any) => data != subject.subjectTitle
      );
      this.preRequisitesSelection = [];
      filteredData.map((data: any) =>
        this.preRequisitesSelection.push({ name: data, value: data })
      );
      const subjects: any = [];
      subject.preRequisites.map((sub: any) => subjects.push(sub.subjectTitle));

      this.courseForm.patchValue({
        subjectCode: subject.subjectCode,
        subjectTitle: subject.subjectTitle,
        units: subject.units,
        preRequisites: subjects,
        type: subject.type,
      });

      this.isDialogOpen = true;
    });
  };

  onRemove = (subject: any) => {
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
      .subscribe(() => {
        this.getAllSubjects();
        this.status = !this.subject.activeDeactive;
      });
  };

  clearForm = () => {
    this.courseForm.reset();
  };
}
