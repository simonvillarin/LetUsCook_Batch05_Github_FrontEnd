import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { CourseService } from 'src/app/shared/services/course/course.service';
import { ProgramService } from 'src/app/shared/services/program/program.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-program',
  templateUrl: './program.component.html',
  styleUrls: ['./program.component.scss'],
})
export class ProgramComponent implements OnInit {
  programForm: FormGroup;
  yearsToCompleteSubscription: Subscription;

  programs: any[] = [];
  majorSubjects: any = [];
  minorSubjects: any = [];
  electiveSubjects: any = [];
  program: any;
  years = [2, 3, 4, 5];

  isShowDropdown = false;
  isShowMobileNav = false;
  isShowNotifications = false;
  isDialogOpen: boolean = false;
  isUpdating: boolean = false;

  title: string = '';
  status: boolean = false;

  constructor(
    private programService: ProgramService,
    private subjectService: CourseService,
    private fb: FormBuilder
  ) {
    this.programForm = fb.group({
      programCode: ['', [Validators.required]],
      programTitle: ['', [Validators.required]],
      yearsToComplete: ['', [Validators.required]],
      units: this.fb.array([]),
      majors: new FormControl<any[] | null>(null),
      minors: new FormControl<any[] | null>(null),
      electives: new FormControl<any[] | null>(null),
    });

    this.yearsToCompleteSubscription = this.programForm.controls[
      'yearsToComplete'
    ].valueChanges.subscribe((value) => {
      this.onYearsToCompleteChange(value);
    });
  }

  ngOnInit(): void {
    this.getAllPrograms();
    this.getAllMajors();
    this.getAllMinors();
    this.getAllElectives();
  }

  get programCode() {
    return this.programForm.get('programCode') as FormControl;
  }

  get programTitle() {
    return this.programForm.get('programTitle') as FormControl;
  }

  get yearsToComplete() {
    return this.programForm.get('yearsToComplete') as FormControl;
  }

  get units(): FormArray {
    return this.programForm.get('units') as FormArray;
  }

  get majors() {
    return this.programForm.get('majors') as FormControl;
  }

  get minors() {
    return this.programForm.get('minors') as FormControl;
  }

  get electives() {
    return this.programForm.get('electives') as FormControl;
  }

  getAllPrograms = () => {
    this.programService.getAllPrograms().subscribe((data: any) => {
      this.programs = data.sort((a: any, b: any) => b.programId - a.programId);
    });
  };

  getAllMajors = () => {
    this.subjectService.getMajors().subscribe((data: any) => {
      const sortData = data.sort((a: any, b: any) => b.subjectId - a.subjectId);
      let subjects: any = [];
      sortData.map((subj: any) => {
        subjects.push({ name: subj.subjectTitle, value: subj.subjectTitle });
      });
      this.majorSubjects = subjects;
    });
  };

  getAllMinors = () => {
    this.subjectService.getMinors().subscribe((data: any) => {
      const sortData = data.sort((a: any, b: any) => b.subjectId - a.subjectId);
      let subjects: any = [];
      sortData.map((subj: any) => {
        subjects.push({ name: subj.subjectTitle, value: subj.subjectTitle });
      });
      this.minorSubjects = subjects;
    });
  };

  getAllElectives = () => {
    this.subjectService.getElectives().subscribe((data: any) => {
      const sortData = data.sort((a: any, b: any) => b.subjectId - a.subjectId);
      let subjects: any = [];
      sortData.map((subj: any) => {
        subjects.push({ name: subj.subjectTitle, value: subj.subjectTitle });
      });
      this.electiveSubjects = subjects;
    });
  };

  addUnits(): void {
    this.units.push(this.fb.control(''));
  }

  onYearsToCompleteChange(value: any) {
    if (value != null) {
      this.units.clear();
      for (let i = 0; i < value; i++) {
        this.addUnits();
      }
    }
  }

  onClickAdd = () => {
    this.title = 'Add Program';
    this.isDialogOpen = true;
    this.units.clear();
    this.programForm.reset();
    this.programForm.markAsUntouched();
  };

  onClickCancel = () => {
    this.isDialogOpen = false;
  };

  onClickSave = () => {
    if (this.isUpdating) {
      if (this.programForm.valid) {
        const programCode = this.programForm.get('programCode')?.value;
        const programTitle = this.programForm.get('programTitle')?.value;
        const yearsToComplete = this.programForm.get('yearsToComplete')?.value;
        const units = this.programForm.get('units')?.value;
        const majors = this.programForm.get('majors')?.value;
        const minors = this.programForm.get('minors')?.value;
        const electives = this.programForm.get('electives')?.value;

        const subjectMajors: any = [];
        this.program.majors.map((sub: any) =>
          subjectMajors.push(sub.subjectTitle)
        );

        const subjectMinors: any = [];
        this.program.minors.map((sub: any) =>
          subjectMinors.push(sub.subjectTitle)
        );

        const subjectElectives: any = [];
        this.program.electives.map((sub: any) =>
          subjectElectives.push(sub.subjectTitle)
        );
        let payload: any = {};
        if (this.program.programCode != programCode) {
          payload.programCode = programCode;
        }
        if (this.program.programTitle != programTitle) {
          payload.programTitle = programTitle;
        }
        if (this.program.yearsToComplete != yearsToComplete) {
          payload.yearsToComplete = yearsToComplete;
        }
        if (this.program.units != units) {
          payload.units = units;
        }
        if (subjectMajors != majors) {
          payload.majors = majors;
        }
        if (subjectMinors != minors) {
          payload.minors = minors;
        }
        if (subjectElectives != majors) {
          payload.electives = electives;
        }
        this.programService
          .updateProgram(this.program.programId, payload)
          .subscribe((res: any) => {
            if (res.message == 'Program Code already exist') {
              alert('Program Code already exist');
            } else if (res.message == 'Program Title already exist') {
              alert('Program Title already exist');
            } else {
              this.getAllPrograms();
              this.isDialogOpen = false;
              this.programForm.reset();
              this.isUpdating = false;
            }
          });
      } else {
        this.programForm.markAllAsTouched();
      }
    } else {
      this.title = 'Add Program';
      if (this.programForm.valid) {
        const payload = {
          programCode: this.programForm.get('programCode')?.value,
          programTitle: this.programForm.get('programTitle')?.value,
          yearsToComplete: this.programForm.get('yearsToComplete')?.value,
          units: this.programForm.get('units')?.value,
          majors:
            this.programForm.get('majors')?.value != null
              ? this.programForm.get('majors')?.value
              : [],
          minors:
            this.programForm.get('minors')?.value != null
              ? this.programForm.get('minors')?.value
              : [],
          electives:
            this.programForm.get('electives')?.value != null
              ? this.programForm.get('electives')?.value
              : [],
        };
        console.log(payload);

        this.programService.addProgram(payload).subscribe((res: any) => {
          if (res.message == 'Program Code already exist') {
            alert('Program Code already exist');
          } else if (res.message == 'Program Title already exist') {
            alert('Program Title already exist');
          } else {
            this.getAllPrograms();
            this.isDialogOpen = false;
            this.programForm.reset();
          }
        });
      } else {
        this.programForm.markAllAsTouched();
      }
    }
  };

  onClickEdit = (program: any) => {
    this.title = 'Edit Program';
    this.isUpdating = true;
    this.units.clear();
    this.program = program;
    const subjectMajors: any = [];
    program.majors.map((sub: any) => subjectMajors.push(sub.subjectTitle));

    const subjectMinors: any = [];
    program.minors.map((sub: any) => subjectMinors.push(sub.subjectTitle));

    const subjectElectives: any = [];
    program.electives.map((sub: any) =>
      subjectElectives.push(sub.subjectTitle)
    );
    this.programForm.patchValue({
      programCode: program.programCode,
      programTitle: program.programTitle,
      yearsToComplete: program.yearsToComplete,
      units: program.units,
      majors: subjectMajors,
      minors: subjectMinors,
      electives: subjectElectives,
    });
    this.isDialogOpen = true;
  };

  onClickRemove = (program: any) => {
    this.program = program;
    this.status = program.status;

    Swal.fire({
      title: !this.status ? 'Activate' : 'Deactivate',
      text: `Are you sure to ${
        !this.status ? 'active' : 'deactive'
      } this program?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        let payload = { status: !this.program.status };
        this.programService
          .updateProgram(this.program.programId, payload)
          .subscribe(() => this.getAllPrograms());
        this.status = !this.program.status;
      }
    });
  };
}
