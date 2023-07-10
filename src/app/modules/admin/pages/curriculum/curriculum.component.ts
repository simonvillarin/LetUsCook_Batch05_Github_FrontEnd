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
      const sortData = data.sort((a: any, b: any) => b.programId - a.programId);
      let programs: any = [];
      sortData.map((program: any) => programs.push(program.programTitle));
      this.programs = programs;
    });
  };

  getAllSubjects = () => {
    this.subjectService.getAllSubjects().subscribe((data: any) => {
      data.map((d: any) => this.subjects.push(d.subjectTitle));
      this.subjects.sort();
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
        const programTitle = this.curriculumForm.get('program')?.value;
        const subjectTitle = this.curriculumForm.get('subject')?.value;
        const yearLevel = this.curriculumForm.get('yearLevel')?.value;
        const sem = this.curriculumForm.get('sem')?.value;
        let payload: any = {};
        if (this.curriculum.program != programTitle) {
          payload.program = programTitle;
        }
        if (this.curriculum.subject != subjectTitle) {
          payload.subject = subjectTitle;
        }
        if (this.curriculum.yearLevel != yearLevel) {
          payload.yearLevel = yearLevel;
        }
        if (this.curriculum.sem != sem) {
          payload.sem = sem;
        }
        this.curriculumService
          .updateCurriculum(this.curriculum.curriculumId, payload)
          .subscribe(() => {
            const index = this.curriculums.findIndex(
              (curriculum) =>
                curriculum.curriculumId == this.curriculum.curriculumId
            );
            this.curriculums[index].program = programTitle;
            this.curriculums[index].subject = subjectTitle;
            this.curriculums[index].yearLevel = yearLevel;
            this.curriculums[index].sem = sem;
            this.isDialogOpen = false;
            this.curriculumForm.reset();
            this.isUpdating = false;
          });
      } else {
        this.curriculumForm.markAllAsTouched();
      }
    } else {
      if (this.curriculumForm.valid) {
        this.curriculumService
          .addCurriculum(this.curriculumForm.value)
          .subscribe(() => this.getAllCurriculums());
        this.isDialogOpen = false;
        console.log(this.curriculums);
        this.curriculumForm.reset();
      } else {
        this.curriculumForm.markAllAsTouched();
      }
    }
  };

  onClickEdit = (curriculum: any) => {
    this.isUpdating = true;
    this.title = 'Edit Curriculum';
    this.curriculum = curriculum;
    this.curriculumForm.patchValue({
      program: curriculum.program,
      subject: curriculum.subject,
      yearLevel: curriculum.yearLevel,
      sem: curriculum.sem,
    });
    console.log(this.curriculumForm.value);
    this.isDialogOpen = true;
  };

  onClickRemove = (curriculum: any) => {
    this.curriculum = curriculum;
    console.log(this.curriculum);

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
