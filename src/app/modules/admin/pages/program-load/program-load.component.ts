import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from 'src/app/shared/services/course/course.service';
import { ProgramService } from 'src/app/shared/services/program/program.service';

@Component({
  selector: 'app-program-load',
  templateUrl: './program-load.component.html',
  styleUrls: ['./program-load.component.scss'],
})
export class ProgramLoadComponent implements OnInit {
  programId: number = -1;
  program: any;
  majors: any = [];
  minors: any = [];
  electives: any = [];
  search: string = '';
  constructor(
    private route: ActivatedRoute,
    private programService: ProgramService,
    private courseService: CourseService
  ) {}

  ngOnInit(): void {
    this.getParams();
  }

  getParams = () => {
    this.programId = this.route.snapshot.params['program'];
    this.getProgram();
  };

  getProgram = () => {
    this.majors = [];
    this.minors = [];
    this.electives = [];
    this.programService
      .getProgramById(this.programId)
      .subscribe((data: any) => {
        this.program = data;
        console.log(this.program);
        this.program.majors.map((major: any) => this.majors.push(major));
        this.program.minors.map((minor: any) => this.minors.push(minor));
        this.program.electives.map((elective: any) =>
          this.electives.push(elective)
        );
        this.majors.map((major: any) => {
          console.log(major.preRequisites);
        });
        console.log(this.majors);
        console.log(this.minors);
        console.log(this.electives);
      });
  };

  onChangeSearchMajor = (searchMajor: string) => {
    if (searchMajor != '') {
      this.majors = this.majors.filter((subj: any) =>
        subj.subjectTitle.toLowerCase().includes(searchMajor.toLowerCase())
      );
    } else {
      this.getProgram();
    }
  };

  onChangeSearchMinor = (searchMinor: string) => {
    if (searchMinor != '') {
      this.minors = this.minors.filter((subj: any) =>
        subj.subjectTitle.toLowerCase().includes(searchMinor.toLowerCase())
      );
    } else {
      this.getProgram();
    }
  };

  onChangeSearchElective = (searchElective: string) => {
    if (searchElective != '') {
      this.majors = this.majors.filter((subj: any) =>
        subj.subjectTitle.toLowerCase().includes(searchElective.toLowerCase())
      );
    } else {
      this.getProgram();
    }
  };
}
