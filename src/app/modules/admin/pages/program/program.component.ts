import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ProgramService } from 'src/app/shared/services/program/program.service';

@Component({
  selector: 'app-program',
  templateUrl: './program.component.html',
  styleUrls: ['./program.component.scss'],
})
export class ProgramComponent implements OnInit {
  programForm: FormGroup;
  programs: any[] = [];
  program: any;
  search: string = '';

  isShowDropdown = false;
  isShowMobileNav = false;
  isShowNotifications = false;
  isDialogOpen: boolean = false;
  isDeleteDialogOpen: boolean = false;
  isUpdating: boolean = false;

  title: string = '';

  constructor(private programService: ProgramService, private fb: FormBuilder) {
    this.programForm = fb.group({
      programCode: ['', [Validators.required]],
      programTitle: ['', [Validators.required]],
    });
  }

  get programCode() {
    return this.programForm.get('programCode') as FormControl;
  }
  get programTitle() {
    return this.programForm.get('programTitle') as FormControl;
  }

  ngOnInit(): void {
    this.getAllPrograms();
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
    this.programService
      .getAllPrograms()
      .subscribe((program) => (this.programs = program));
  };

  searchChange = (search: string) => {
    if (search != '') {
      const filteredPrograms = this.programs.filter(
        (program) =>
          program.programCode.toLowerCase().includes(search.toLowerCase()) ||
          program.programTitle.toLowerCase().includes(search.toLowerCase())
      );
      this.programs = filteredPrograms;
    } else {
      this.getAllPrograms();
    }
  };

  onClickAdd = () => {
    this.title = 'Add Program';
    this.isDialogOpen = true;
    this.programForm.markAsUntouched();
  };

  onClickCancel = () => {
    this.isDialogOpen = false;
    this.programForm.reset();
  };

  onClickSave = () => {
    if (this.isUpdating) {
      // for update
      this.title = 'Edit Program';
      if (this.programForm.valid) {
        const programCode = this.programForm.get('programCode')?.value;
        const programTitle = this.programForm.get('programTitle')?.value;
        let payload: any = {};
        if (this.program.programCode != programCode) {
          payload.programCode = programCode;
        }
        if (this.program.programTitle != programTitle) {
          payload.programTitle = programTitle;
        }

        this.programService
          .updateProgram(this.program.programId, payload)
          .subscribe((res: any) => {
            if (res.message == 'Program Code already exist') {
              alert('Program Code already exist');
            } else if (res.message == 'Program Title already exist') {
              alert('Program Title already exist');
            } else {
              const index = this.programs.findIndex(
                (program: any) => program.programId == this.program.programId
              );
              this.programs[index].programCode = programCode;
              this.programs[index].programTitle = programTitle;
              this.isDialogOpen = false;
              this.programForm.reset();
              this.isUpdating = false;
            }
          });
      } else {
        this.programForm.markAllAsTouched();
      }
    } else {
      // for adding
      this.title = 'Add Program';
      if (this.programForm.valid) {
        const payload = {
          programCode: this.programForm.get('programCode')?.value,
          programTitle: this.programForm.get('programTitle')?.value,
          major: [],
          minor: [],
          electives: [],
          status: true,
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
    this.programForm.patchValue({
      programCode: program.programCode,
      programTitle: program.programTitle,
    });

    this.isDialogOpen = true;
  };

  onClickRemove = (program: any) => {
    this.program = null;
    this.isDeleteDialogOpen = true;
    this.program = program;
  };

  onDeleteProgram = () => {
    this.isDeleteDialogOpen = false;
    let payload = { status: !this.program.status };
    this.programService
      .updateProgram(this.program.programId, payload)
      .subscribe(() => {});
    const index = this.programs.findIndex(
      (program: any) => program.programId == this.program.programId
    );
    this.programs[index].status = payload.status;
  };
}
