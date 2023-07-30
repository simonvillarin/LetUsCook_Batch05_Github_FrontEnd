import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ProgramService } from 'src/app/shared/services/program/program.service';
import { SectionService } from 'src/app/shared/services/section/section.service';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss'],
})
export class SectionComponent implements OnInit {
  sectionForm: FormGroup;

  sections: any = [];
  programs: any = [];
  section: any;

  alert: boolean = false;
  status: boolean = false;
  isDialogOpen: boolean = false;
  isDeleteDialogOpen: boolean = false;
  isUpdating: boolean = false;

  title: string = '';
  alertStatus: string = '';
  alertMessage: string = '';
  search: string = '';
  programSelected: string = '';

  constructor(
    private sectionService: SectionService,
    private programService: ProgramService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.sectionForm = this.fb.group({
      programCode: ['', [Validators.required]],
      sectionName: ['', [Validators.required]],
    });
  }

  get programCode() {
    return this.sectionForm.get('programCode') as FormControl;
  }

  get sectionName() {
    return this.sectionForm.get('sectionName') as FormControl;
  }

  ngOnInit(): void {
    this.getAllSections();
    this.getAllPrograms();
  }

  getAllSections() {
    this.sectionService.getAllSections().subscribe((data: any) => {
      this.sections = data.sort((a: any, b: any) => a.sectionId - b.sectionId);
    });
  }

  getAllPrograms = () => {
    this.programService.getAllPrograms().subscribe((data: any) => {
      const sortData = data.sort((a: any, b: any) => b.sectionId - a.sectionId);
      const programs: any = [];
      sortData.map((program: any) => programs.push(program.programCode));
      this.programs = programs;
    });
  };

  onChangeSearch = (searchTerm: string) => {
    if (searchTerm != '') {
      this.sections = this.sections.filter((sec: any) =>
        sec.section.toLowerCase().includes(searchTerm.toLowerCase())
      );
    } else {
      this.getAllSections();
    }
  };

  onChangeProgram = (program: string) => {
    this.sectionService.getAllSections().subscribe((data: any) => {
      this.sections = data.sort((a: any, b: any) => a.sectionId - b.sectionId);
      this.sections = this.sections.filter(
        (sec: any) => sec.program.programCode == program
      );
    });
  };

  reset = () => {
    this.search = '';
    this.programSelected = '';
    this.getAllSections();
  };

  onAdd = () => {
    this.title = 'Add Section';
    this.isDialogOpen = true;
    this.sectionForm.reset();
    this.sectionForm.markAsUntouched();
  };

  onClickCancel = () => {
    this.isDialogOpen = false;
  };

  onClickSave = () => {};

  onClickEdit = (section: any) => {
    this.isUpdating = true;
    this.title = 'Edit Section';
    this.isDialogOpen = true;
    this.section = section;
    this.sectionForm.patchValue({
      programCode: section.program.programCode,
      sectionName: section.sectionName,
    });
    this.section = section;
  };

  onClickRemove = (section: any) => {
    this.isDeleteDialogOpen = true;
    this.section = section;
  };

  onSubmit = () => {
    const programCode = this.sectionForm.get('programCode')?.value;
    const sectionName = this.sectionForm.get('sectionName')?.value;
    if (this.isUpdating) {
      console.log(this.section);

      const payload: any = {};
      if (this.section.program.programCode != programCode) {
        payload.programCode = programCode;
      }
      if (this.section.sectionName != sectionName) {
        payload.sectionName = sectionName;
      }
      console.log(payload);

      this.sectionService
        .updateSection(this.section.sectionId, payload)
        .subscribe((res: any) => {
          if (res.message == 'Section name already exist') {
            this.alert = true;
            setTimeout(() => (this.alert = false), 3000);
            this.alertStatus = 'Error';
            this.alertMessage = 'Section name already exists';
          } else {
            this.getAllSections();
            this.alert = true;
            setTimeout(() => {
              this.alert = false;
              this.isDialogOpen = false;
              this.sectionForm.reset();
            }, 2000);
            this.alertStatus = 'Success';
            this.alertMessage = 'Section name successfully updated';
            this.isUpdating = false;
            this.section = null;
          }
        });
    } else {
      if (this.sectionForm.valid) {
        this.sectionService
          .addSection(this.sectionForm.value)
          .subscribe((res: any) => {
            if (res.message == 'Section name already exist') {
              this.alert = true;
              setTimeout(() => (this.alert = false), 3000);
              this.alertStatus = 'Error';
              this.alertMessage = 'Section name already exists';
            } else {
              this.getAllSections();
              this.alert = true;
              setTimeout(() => (this.alert = false), 3000);
              this.alertStatus = 'Success';
              this.alertMessage = 'Section name successfully added';
              this.sectionForm.reset();
              this.isDialogOpen = false;
            }
          });
      } else {
        this.sectionForm.markAllAsTouched();
      }
    }
  };

  onCloseDeleteDialog = () => {
    this.isDeleteDialogOpen = false;
  };

  onDeleteSection = () => {
    if (this.section) {
      const payload = {
        activeDeactive: !this.section.activeDeactive,
      };
      this.sectionService
        .updateSection(this.section.sectionId, payload)
        .subscribe(() => this.getAllSections());
      this.isDeleteDialogOpen = false;
      this.section = null;
    }
  };

  onView = (section: any) => {
    this.router.navigate([`admin/section/${section.sectionId}`]);
  };
}
