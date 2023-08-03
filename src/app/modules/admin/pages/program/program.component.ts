import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CourseService } from 'src/app/shared/services/course/course.service';
import { ProgramService } from 'src/app/shared/services/program/program.service';
import { minUnitsArrayValidator } from 'src/app/shared/validators/custom.validator';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-program',
  templateUrl: './program.component.html',
  styleUrls: ['./program.component.scss'],
})
export class ProgramComponent implements OnInit {
  programForm: FormGroup;

  programs: any[] = [];
  majorSubjects: any = [];
  minorSubjects: any = [];
  electiveSubjects: any = [];
  program: any;
  years = [2, 3, 4];

  isShowDropdown = false;
  isShowMobileNav = false;
  isShowNotifications = false;
  isDialogOpen: boolean = false;
  isDeleteDialogOpen: boolean = false;
  isUpdating: boolean = false;
  status: boolean = false;

  title: string = '';
  search: string = '';
  yearSelected: string = '';

  constructor(
    private programService: ProgramService,
    private subjectService: CourseService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.programForm = fb.group({
      programCode: ['', [Validators.required]],
      programTitle: ['', [Validators.required]],
      firstYearFirstSemMin: ['', [Validators.required]],
      firstYearFirstSemMax: ['', [Validators.required]],
      firstYearSecondSemMin: ['', [Validators.required]],
      firstYearSecondSemMax: ['', [Validators.required]],
      secondYearFirstSemMin: ['', [Validators.required]],
      secondYearFirstSemMax: ['', [Validators.required]],
      secondYearSecondSemMin: ['', [Validators.required]],
      secondYearSecondSemMax: ['', [Validators.required]],
      thirdYearFirstSemMin: ['', [Validators.required]],
      thirdYearFirstSemMax: ['', [Validators.required]],
      thirdYearSecondSemMin: ['', [Validators.required]],
      thirdYearSecondSemMax: ['', [Validators.required]],
      fourthYearFirstSemMin: ['', [Validators.required]],
      fourthYearFirstSemMax: ['', [Validators.required]],
      fourthYearSecondSemMin: ['', [Validators.required]],
      fourthYearSecondSemMax: ['', [Validators.required]],
      majors: new FormControl<any[] | null>(null),
      minors: new FormControl<any[] | null>(null),
      electives: new FormControl<any[] | null>(null),
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

  get firstYearFirstSemMin() {
    return this.programForm.get('firstYearFirstSemMin') as FormControl;
  }

  get firstYearFirstSemMax() {
    return this.programForm.get('firstYearFirstSemMax') as FormControl;
  }

  get firstYearSecondSemMin() {
    return this.programForm.get('firstYearSecondSemMin') as FormControl;
  }

  get firstYearSecondSemMax() {
    return this.programForm.get('firstYearSecondSemMax') as FormControl;
  }

  get secondYearFirstSemMin() {
    return this.programForm.get('secondYearFirstSemMin') as FormControl;
  }

  get secondYearFirstSemMax() {
    return this.programForm.get('secondYearFirstSemMax') as FormControl;
  }

  get secondYearSecondSemMin() {
    return this.programForm.get('secondYearSecondSemMin') as FormControl;
  }

  get secondYearSecondSemMax() {
    return this.programForm.get('secondYearSecondSemMax') as FormControl;
  }

  get thirdYearFirstSemMin() {
    return this.programForm.get('thirdYearFirstSemMin') as FormControl;
  }

  get thirdYearFirstSemMax() {
    return this.programForm.get('thirdYearFirstSemMax') as FormControl;
  }

  get thirdYearSecondSemMin() {
    return this.programForm.get('thirdYearSecondSemMin') as FormControl;
  }

  get thirdYearSecondSemMax() {
    return this.programForm.get('thirdYearSecondSemMax') as FormControl;
  }

  get fourthYearFirstSemMin() {
    return this.programForm.get('fourthYearFirstSemMin') as FormControl;
  }

  get fourthYearFirstSemMax() {
    return this.programForm.get('fourthYearFirstSemMax') as FormControl;
  }

  get fourthYearSecondSemMin() {
    return this.programForm.get('fourthYearSecondSemMin') as FormControl;
  }

  get fourthYearSecondSemMax() {
    return this.programForm.get('fourthYearSecondSemMax') as FormControl;
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
      console.log(this.programs);
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

  onChangeSearch = (searchTerm: string) => {
    if (searchTerm != '') {
      this.programs = this.programs.filter(
        (prog: any) =>
          prog.programTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
          prog.programCode.toLowerCase().includes(searchTerm.toLowerCase())
      );
    } else {
      this.getAllPrograms();
    }
  };

  onChangeYear = (year: string) => {
    this.programService.getAllPrograms().subscribe((data: any) => {
      this.programs = data.sort((a: any, b: any) => b.programId - a.programId);
      this.programs = this.programs.filter(
        (prog: any) => prog.yearsToComplete == year
      );
    });
  };

  reset = () => {
    this.search = '';
    this.yearSelected = '';
    this.getAllPrograms();
  };

  onAdd = () => {
    this.title = 'Add Program';
    this.isDialogOpen = true;
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
        const firstYearFirstSemMin = this.programForm.get(
          'firstYearFirstSemMin'
        )?.value;
        const firstYearFirstSemMax = this.programForm.get(
          'firstYearFirstSemMax'
        )?.value;
        const firstYearSecondSemMin = this.programForm.get(
          'firstYearSecondSemMin'
        )?.value;
        const firstYearSecondSemMax = this.programForm.get(
          'firstYearSecondSemMax'
        )?.value;
        const secondYearFirstSemMin = this.programForm.get(
          'secondYearFirstSemMin'
        )?.value;
        const secondYearFirstSemMax = this.programForm.get(
          'secondYearFirstSemMax'
        )?.value;
        const secondYearSecondSemMin = this.programForm.get(
          'secondYearSecondSemMin'
        )?.value;
        const secondYearSecondSemMax = this.programForm.get(
          'secondYearSecondSemMax'
        )?.value;
        const thirdYearFirstSemMin = this.programForm.get(
          'thirdYearFirstSemMin'
        )?.value;
        const thirdYearFirstSemMax = this.programForm.get(
          'thirdYearFirstSemMax'
        )?.value;
        const thirdYearSecondSemMin = this.programForm.get(
          'thirdYearSecondSemMin'
        )?.value;
        const thirdYearSecondSemMax = this.programForm.get(
          'thirdYearSecondSemMax'
        )?.value;
        const fourthYearFirstSemMin = this.programForm.get(
          'fourthYearFirstSemMin'
        )?.value;
        const fourthYearFirstSemMax = this.programForm.get(
          'fourthYearFirstSemMax'
        )?.value;
        const fourthYearSecondSemMin = this.programForm.get(
          'fourthYearSecondSemMin'
        )?.value;
        const fourthYearSecondSemMax = this.programForm.get(
          'fourthYearSecondSemMax'
        )?.value;
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
        if (this.program.firstYearFirstSemMin != firstYearFirstSemMin) {
          payload.firstYearFirstSemMin = firstYearFirstSemMin;
        }
        if (this.program.firstYearFirstSemMax != firstYearFirstSemMax) {
          payload.firstYearFirstSemMax = firstYearFirstSemMax;
        }
        if (this.program.firstYearSecondSemMin != firstYearSecondSemMin) {
          payload.firstYearSecondSemMin = firstYearSecondSemMin;
        }
        if (this.program.firstYearSecondSemMax != firstYearSecondSemMax) {
          payload.firstYearSecondSemMax = firstYearSecondSemMax;
        }
        if (this.program.secondYearFirstSemMin != secondYearFirstSemMin) {
          payload.secondYearFirstSemMin = secondYearFirstSemMin;
        }
        if (this.program.secondYearFirstSemMax != secondYearFirstSemMax) {
          payload.secondYearFirstSemMax = secondYearFirstSemMax;
        }
        if (this.program.secondYearSecondSemMin != secondYearSecondSemMin) {
          payload.secondYearSecondSemMin = secondYearSecondSemMin;
        }
        if (this.program.secondYearSecondSemMax != secondYearSecondSemMax) {
          payload.secondYearSecondSemMax = secondYearSecondSemMax;
        }
        if (this.program.thirdYearFirstSemMin != thirdYearFirstSemMin) {
          payload.thirdYearFirstSemMin = thirdYearFirstSemMin;
        }
        if (this.program.thirdYearFirstSemMax != thirdYearFirstSemMax) {
          payload.thirdYearFirstSemMax = thirdYearFirstSemMax;
        }
        if (this.program.thirdYearSecondSemMin != thirdYearSecondSemMin) {
          payload.thirdYearSecondSemMin = thirdYearSecondSemMin;
        }
        if (this.program.thirdYearSecondSemMax != thirdYearSecondSemMax) {
          payload.thirdYearSecondSemMax = thirdYearSecondSemMax;
        }
        if (this.program.fourthYearFirstSemMin != fourthYearFirstSemMin) {
          payload.fourthYearFirstSemMin = fourthYearFirstSemMin;
        }
        if (this.program.fourthYearFirstSemMax != fourthYearFirstSemMax) {
          payload.fourthYearFirstSemMax = fourthYearFirstSemMax;
        }
        if (this.program.fourthYearSecondSemMin != fourthYearSecondSemMin) {
          payload.fourthYearSecondSemMin = fourthYearSecondSemMin;
        }
        if (this.program.fourthYearSecondSemMax != fourthYearSecondSemMax) {
          payload.fourthYearSecondSemMax = fourthYearSecondSemMax;
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

        this.programService
          .addProgram(this.programForm.value)
          .subscribe((res: any) => {
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
      firstYearFirstSemMin: program.firstYearFirstSemMin,
      firstYearFirstSemMax: program.firstYearFirstSemMax,
      firstYearSecondSemMin: program.firstYearSecondSemMin,
      firstYearSecondSemMax: program.firstYearSecondSemMax,
      secondYearFirstSemMin: program.secondYearFirstSemMin,
      secondYearFirstSemMax: program.secondYearFirstSemMax,
      secondYearSecondSemMin: program.secondYearSecondSemMin,
      secondYearSecondSemMax: program.secondYearSecondSemMax,
      thirdYearFirstSemMin: program.thirdYearFirstSemMin,
      thirdYearFirstSemMax: program.thirdYearFirstSemMax,
      thirdYearSecondSemMin: program.thirdYearSecondSemMin,
      thirdYearSecondSemMax: program.thirdYearSecondSemMax,
      fourthYearFirstSemMin: program.fourthYearFirstSemMin,
      fourthYearFirstSemMax: program.fourthYearFirstSemMax,
      fourthYearSecondSemMin: program.fourthYearSecondSemMin,
      fourthYearSecondSemMax: program.fourthYearSecondSemMax,
      majors: subjectMajors,
      minors: subjectMinors,
      electives: subjectElectives,
    });
    this.isDialogOpen = true;
  };

  onCancelDeleteDialog = () => {
    this.isDeleteDialogOpen = false;
  };

  onRemove = (program: any) => {
    this.program = program;
    this.status = program.status;
    this.isDeleteDialogOpen = true;
  };

  onDeleteProgram = () => {
    let payload = { status: !this.program.status };
    this.programService
      .updateProgram(this.program.programId, payload)
      .subscribe(() => {
        this.getAllPrograms();
        this.status = !this.program.status;
        this.isDeleteDialogOpen = false;
      });
  };

  onView = (program: any) => {
    console.log(program, 'program');
    this.router.navigate([`admin/program/${program.programId}`]);
  };
}
