import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Curriculum } from 'src/app/shared/models/curriculum';
import { CourseService } from 'src/app/shared/services/course/course.service';
import { CurriculumService } from 'src/app/shared/services/curriculum/curriculum.service';
import { ProgramService } from 'src/app/shared/services/program/program.service';

@Component({
  selector: 'app-curriculum',
  templateUrl: './curriculum.component.html',
  styleUrls: ['./curriculum.component.scss'],
})
export class CurriculumComponent implements OnInit {
  terms = ['First Term', 'Second Term'];
  levels = ['First Year', 'Second Year', 'Third Year', 'Fourth Year'];

  curriculumForm: FormGroup;
  curriculum: any;

  curriculums: any[] = [];
  programs: any = [];
  subjects: string[] = [];

  title: string = '';
  status: boolean = false;

  isShowDropdown = false;
  isShowMobileNav = false;
  isShowNotifications = false;
  isDialogOpen: boolean = false;
  isDeleteDialogOpen: boolean = false;
  isUpdating: boolean = false;

  constructor(
    private curriculumService: CurriculumService,
    private programService: ProgramService,
    private subjectService: CourseService,
    private fb: FormBuilder
  ) {
    this.curriculumForm = fb.group({
      program: ['', [Validators.required]],
      subject: ['', [Validators.required]],
      yearLevel: ['', [Validators.required]],
      sem: ['', [Validators.required]],
    });

    // this.curriculumForm.patchValue({
    //   program: 'Bachelor of Science in Information Technology',
    //   subject: 'Intro to Programming',
    //   yearLevel: 'First Year',
    //   sem: 'First Term',
    // });
  }

  ngOnInit(): void {
    this.getAllCurriculums();
    this.getAllPrograms();
    this.getAllSubjects();
  }

  getAllCurriculums = () => {
    this.curriculumService.getAllCurriculum().subscribe((data) => {
      this.curriculums = data;
    });
  };

  getAllPrograms = () => {
    this.programService.getAllPrograms().subscribe((data: any) => {
      data.map((d: any) => this.programs.push(d.programTitle));
    });
  };

  getAllSubjects = () => {
    this.subjectService.getAllSubjects().subscribe((data: any) => {
      data.map((d: any) => this.subjects.push(d.subjectTitle));
    });
  };

  get program() {
    return this.curriculumForm.get('program') as FormControl;
  }

  get subject() {
    return this.curriculumForm.get('subject') as FormControl;
  }

  get yearLevel() {
    return this.curriculumForm.get('yearLevel') as FormControl;
  }

  get term() {
    return this.curriculumForm.get('sem') as FormControl;
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

  onClickAdd = () => {
    this.title = 'Add Curriculum';
    this.isDialogOpen = true;
    this.curriculumForm.reset();
    this.curriculumForm.markAsUntouched();
  };

  onClickCancel = () => {
    this.isDialogOpen = false;
  };

  onClickSave = () => {
    if (this.isUpdating) {
      if (this.curriculumForm.valid) {
      } else {
        this.curriculumForm.markAllAsTouched();
      }
    } else {
      if (this.curriculumForm.valid) {
        this.curriculumService
          .addCurriculum(this.curriculumForm.value)
          .subscribe();
        this.isDialogOpen = false;
        this.curriculums = [
          ...this.curriculums,
          {
            program: this.curriculumForm.get('program')?.value,
            subject: this.curriculumForm.get('subject')?.value,
            yearLevel: this.curriculumForm.get('yearLevel')?.value,
            sem: this.curriculumForm.get('sem')?.value,
            activeDeactive: true,
          },
        ];
        console.log(this.curriculums);
        this.curriculumForm.reset();
      } else {
        this.curriculumForm.markAllAsTouched();
      }
    }
  };

  onClickEdit = (curriculum: any) => {
    this.title = 'Edit Curriculum';
    this.isDialogOpen = true;

    this.curriculumForm.patchValue({
      program: curriculum.program,
      subject: curriculum.subject,
      yearLevel: curriculum.yearLevel,
      sem: curriculum.sem,
    });
    console.log(this.curriculumForm.value);
    this.curriculumForm.reset();
  };

  onClickRemove = (curriculum: any) => {
    this.curriculum = curriculum;
    this.status = curriculum.activeDeactive;
    this.isDeleteDialogOpen = true;
  };

  onCloseDeleteDialog = () => {
    this.isDeleteDialogOpen = false;
  };

  onDeleteCurriculum = () => {
    const payload = {
      activeDeactive: !this.curriculum.activeDeactive,
    };
    this.curriculumService
      .updateCurriculum(this.curriculum.curriculumId, payload)
      .subscribe();
    const index = this.curriculums.findIndex(
      (curriculum: any) =>
        curriculum.curriculumId == this.curriculum.curriculumId
    );
    this.curriculums[index].activeDeactive = !this.curriculum.activeDeactive;
    this.status = !this.curriculum.activeDeactive;
    this.isDeleteDialogOpen = false;
  };
}
