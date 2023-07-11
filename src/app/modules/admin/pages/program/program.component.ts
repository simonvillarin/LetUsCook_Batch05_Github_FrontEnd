import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { CourseService } from 'src/app/shared/services/course/course.service';
import { ProgramService } from 'src/app/shared/services/program/program.service';

@Component({
  selector: 'app-program',
  templateUrl: './program.component.html',
  styleUrls: ['./program.component.scss'],
})
export class ProgramComponent implements OnInit {
  constructor(
    private programService: ProgramService,
    private subjectService: CourseService,
    private fb: FormBuilder
  ) {
    this.programForm = fb.group({
      programCode: ['', [Validators.required]],
      programTitle: ['', [Validators.required]],
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

  programForm: FormGroup;

  programs: any[] = [];
  majorSubjects: any = [];
  minorSubjects: any = [];
  electiveSubjects: any = [];
  program: any;

  isShowDropdown = false;
  isShowMobileNav = false;
  isShowNotifications = false;
  isDialogOpen: boolean = false;
  isDeleteDialogOpen: boolean = false;
  isUpdating: boolean = false;

  title: string = '';
  status: boolean = false;

  get programCode() {
    return this.programForm.get('programCode') as FormControl;
  }

  get programTitle() {
    return this.programForm.get('programTitle') as FormControl;
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
        subjects.push(subj.subjectTitle);
      });
      this.majorSubjects = subjects;
    });
  };

  getAllMinors = () => {
    this.subjectService.getMinors().subscribe((data: any) => {
      const sortData = data.sort((a: any, b: any) => b.subjectId - a.subjectId);
      let subjects: any = [];
      sortData.map((subj: any) => {
        subjects.push(subj.subjectTitle);
      });
      this.minorSubjects = subjects;
    });
  };

  getAllElectives = () => {
    this.subjectService.getElectives().subscribe((data: any) => {
      const sortData = data.sort((a: any, b: any) => b.subjectId - a.subjectId);
      let subjects: any = [];
      sortData.map((subj: any) => {
        subjects.push(subj.subjectTitle);
      });
      this.electiveSubjects = subjects;
    });
  };

  onClickAdd = () => {
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
      console.log(this.programForm.value);

      if (this.programForm.valid) {
        const payload = {
          programCode: this.programForm.get('programCode')?.value,
          programTitle: this.programForm.get('programTitle')?.value,
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
    this.program = null;
    this.isUpdating = true;
    this.title = 'Edit Program';
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
      majors: subjectMajors,
      minors: subjectMinors,
      electives: subjectElectives,
    });
    this.isDialogOpen = true;
  };

  onClickRemove = (program: any) => {
    this.program = null;
    this.program = program;
    this.isDeleteDialogOpen = true;
    this.status = program.status;
  };

  onCloseDeleteDialog = () => {
    this.isDeleteDialogOpen = false;
  };

  onDeleteProgram = () => {
    this.isDeleteDialogOpen = false;
    let payload = { status: !this.program.status };
    this.programService
      .updateProgram(this.program.programId, payload)
      .subscribe(() => this.getAllPrograms());
    this.status = !this.program.status;
  };
}
