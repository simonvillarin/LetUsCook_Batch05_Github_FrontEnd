import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
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
export class CurriculumComponent implements OnInit, OnChanges {
  constructor(
    private curriculumService: CurriculumService,
    private programService: ProgramService,
    private subjectService: CourseService,
    private fb: FormBuilder
  ) {
    this.curriculumForm = fb.group({
      term: [this.termSelected, [Validators.required]],
      yearLevel: [this.yearLevelSelected, [Validators.required]],
      program: [this.programSelected, [Validators.required]],
      subject: [this.subjectSelected, [Validators.required]],
    });
  }
  ngOnInit(): void {
    this.getAllCurriculums();
    this.getAllPrograms();
    this.getAllSubjects();
    console.log(this.curriculumForm.value);
  }

  ngOnChanges(): void {}

  curriculumForm: FormGroup;
  curriculum: any;

  curriculums: any[] = [];
  terms = [
    { name: 'First Term', value: 'First Term' },
    { name: 'Second Term', value: 'Second Term' },
  ];
  levels = [
    { name: 'First Year', value: 'First Year' },
    { name: 'Second Year', value: 'Second Year' },
    { name: 'Third Year', value: 'Third Year' },
    { name: 'Fourth Year', value: 'Fourth Year' },
  ];
  programs: any[] = [];
  subjects: any[] = [];
  subjectArr: any[] = [];

  title: string = '';
  termSelected: string = '';
  yearLevelSelected: string = '';
  programSelected: string = '';
  subjectSelected: string = '';
  subjectId: number = -1;

  isShowDropdown = false;
  isShowMobileNav = false;
  isShowNotifications = false;
  isDialogOpen: boolean = false;
  isDeleteDialogOpen: boolean = false;
  isUpdating: boolean = false;

  get term() {
    return this.curriculumForm.get('term') as FormControl;
  }

  get yearLevel() {
    return this.curriculumForm.get('yearLevel') as FormControl;
  }

  get program() {
    return this.curriculumForm.get('program') as FormControl;
  }

  get subject() {
    return this.curriculumForm.get('subject') as FormControl;
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

  getAllCurriculums = () => {
    this.curriculumService.getAllCurriculum().subscribe((curriculum) => {
      curriculum.map((curr: any) => {
        const payload = {
          id: curr.curriculumId,
          programCode: curr.program.programCode,
          subjectTitle: curr.subject.subjectTitle,
          sem: curr.sem,
          yearLevel: curr.yearLevel,
          activeDeactive: curr.activeDeactive,
        };
        this.curriculums.push(payload);
        console.log(this.curriculums);
      });
    });
  };

  getAllPrograms = () => {
    this.programService.getAllPrograms().subscribe((program) => {
      program.map((prog: any) => {
        const payload = {
          id: prog.programId,
          name: prog.programCode,
          value: prog.programCode,
        };
        this.programs.push(payload);
      });
    });
  };

  getAllSubjects = () => {
    this.subjectService.getAllSubjects().subscribe((subject) => {
      subject.map((subj: any) => {
        const payload = {
          id: subj.subjectId,
          name: subj.subjectTitle,
        };
        this.subjectArr.push(payload);
      });
    });
  };

  getSubjectTitles = (programId: number) => {
    this.subjectService
      .getSubjectByProgramId(programId)
      .subscribe((data: any) => {
        this.subjects = [];
        data.map((d: any) => this.subjects.push({ name: d, value: d }));
      });
  };

  onProgramChange = () => {
    console.log(this.programSelected);
    this.getSubjectTitles(parseInt(this.programSelected));
  };

  onSubjectChange = () => {
    const filteredSubject = this.subjectArr.filter(
      (data) => data.name == this.subjectSelected
    );
    this.subjectId = filteredSubject[0].id;
    console.log(this.subjectId, 'is subject id');
  };

  onClickAdd = () => {
    this.title = 'Add Curriculum';
    this.isDialogOpen = true;
    this.curriculumForm.markAsUntouched();
  };

  onClickCancel = () => {
    this.isDialogOpen = false;
    this.curriculumForm.reset();
  };

  onClickSave = () => {
    if (this.curriculumForm.valid) {
      const payload = {
        programId: this.curriculumForm.get('program')?.value,
        subjectId: this.subjectId,
        sem: this.curriculumForm.get('term')?.value,
        yearLevel: this.curriculumForm.get('yearLevel')?.value,
        activeDeactive: true,
      };
      console.log(payload);
      this.curriculumService.addCurriculum(payload).subscribe();
      this.getAllCurriculums();
      this.isDialogOpen = false;
      this.curriculumForm.reset();
    } else {
      this.curriculumForm.markAllAsTouched();
    }
  };

  onClickEdit = (curriculum: any) => {
    console.log(curriculum);
    this.curriculum = null;
    this.isUpdating = true;
    this.title = 'Edit Curriculum';
    this.curriculum = curriculum;
    this.termSelected = '';
    this.yearLevelSelected = '';
    this.programSelected = '';
    this.subjectSelected = '';
    this.termSelected = curriculum.sem;
    this.yearLevelSelected = curriculum.yearLevel;
    this.programSelected = curriculum.programCode;
    this.subjectSelected = curriculum.subjectTitle;
    this.isDialogOpen = true;
  };

  onClickRemove = (curriculum: any) => {
    this.curriculum = null;
    this.curriculum = curriculum;
    this.isDeleteDialogOpen = true;
  };

  onDeleteCurriculum = () => {
    this.isDeleteDialogOpen = false;
    let payload = { activeDeactive: !this.curriculum.activeDeactive };
    this.curriculumService
      .updateCurriculum(this.curriculum.id, payload)
      .subscribe(() => {});
    const index = this.curriculums.findIndex(
      (curriculum: any) => curriculum.id == this.curriculum.id
    );
    console.log(index);

    this.curriculums[index].activeDeactive = payload.activeDeactive;
  };
}
