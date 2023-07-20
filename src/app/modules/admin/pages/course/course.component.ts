import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormArray,
  FormControl,
} from '@angular/forms';
import { CourseService } from 'src/app/shared/services/course/course.service';
import { ProgramService } from 'src/app/shared/services/program/program.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss'],
})
export class CourseComponent implements OnInit {
  displayedColumns: string[] = [
    'subjectCode',
    'subjectTitle',
    'units',
    'preRequisites',
    'type',
    'status',
    'actions',
  ];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  courseForm: FormGroup;
  preRequisiteFormArray: FormArray;

  subject: any;
  subjects: any = [];
  programs: string[] = [];
  types = ['Major', 'Minor', 'Elective'];

  isDialogOpen: boolean = false;
  isDeleteDialogOpen: boolean = false;
  isUpdating: boolean = false;
  buttonClicked: boolean = false;

  title: string = '';
  status: boolean = false;
  search: string = '';

  constructor(
    private courseService: CourseService,
    private programService: ProgramService,
    private fb: FormBuilder
  ) {
    this.courseForm = fb.group({
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

  getAllSubjects = () => {
    this.courseService.getAllSubjects().subscribe((data: any) => {
      this.subjects = data.sort((a: any, b: any) => b.subjectId - a.subjectId);
      this.dataSource = data.sort(
        (a: any, b: any) => b.subjectId - a.subjectId
      );
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
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

  searchFilter = (searchTerm: any) => {
    if (searchTerm != '') {
      const sortData = this.subjects.filter(
        (subject: any) =>
          subject.subjectTitle
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          subject.subjectCode.toLowerCase().includes(searchTerm.toLowerCase())
      );
      this.dataSource = sortData;
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    } else {
      this.dataSource = this.subjects;
    }
  };

  onClickAdd = () => {
    this.title = 'Add Subject';
    this.isUpdating = false;
    this.isDialogOpen = true;
    this.preRequisiteFormArray.reset();
    this.courseForm.reset();
    this.courseForm.markAsUntouched();
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
              alert('Subject code already exist');
            } else if (res.message == 'Subject title already exist') {
              alert('Subject title already exist');
            } else {
              this.getAllSubjects();
              this.courseForm.reset();
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
    this.title = 'Edit Subject';

    this.courseForm.patchValue({
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
      .subscribe(() => this.getAllSubjects());
  };

  clearForm = () => {
    this.courseForm.reset();
  };
}
