import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { SectionService } from 'src/app/shared/services/section/section.service';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss'],
})
export class SectionComponent implements OnInit {
  constructor(private sectionService: SectionService, private fb: FormBuilder) {
    this.sectionForm = this.fb.group({
      sectionName: ['', [Validators.required]],
    });
  }

  get sectionName() {
    return this.sectionForm.get('sectionName') as FormControl;
  }

  ngOnInit(): void {
    this.getAllSections();
  }

  sectionForm: FormGroup;

  sections: any = [];
  section: any;
  title: string = '';
  alertStatus: string = '';
  alertMessage: string = '';

  alert: boolean = false;
  status: boolean = false;
  isDialogOpen: boolean = false;
  isDeleteDialogOpen: boolean = false;
  isUpdating: boolean = false;

  getAllSections() {
    this.sectionService.getAllSections().subscribe((data: any) => {
      this.sections = data.sort((a: any, b: any) => a.sectionId - b.sectionId);
    });
  }

  onClickAdd = () => {
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
      sectionName: section.sectionName,
    });
    this.section = section;
  };

  onClickRemove = (section: any) => {
    this.isDeleteDialogOpen = true;
    this.section = section;
  };

  onSubmit = () => {
    const sectionName = this.sectionForm.get('sectionName')?.value;
    if (this.isUpdating) {
      const payload: any = {};
      if (this.section.sectionName != sectionName) {
        payload.sectionName = sectionName;
      }

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
        const payload = {
          sectionName: sectionName,
          activeDeactive: true,
        };
        this.sectionService
          .addSection(payload)
          .subscribe(() => this.getAllSections());
        this.alert = true;
        setTimeout(() => (this.alert = false), 3000);
        this.alertStatus = 'Success';
        this.alertMessage = 'Section name successfully added';
        this.sectionForm.reset();
        this.isDialogOpen = false;
      } else {
        this.sectionForm.markAllAsTouched();
      }
    }
  };
  onCloseDeleteDialog = () => {};

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
}
