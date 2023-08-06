import { AuthService } from './../../../../core/services/auth.service';
import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AttendanceStudentService } from 'src/app/shared/services/attendance-student/attendance-student.service';
import { EvalService } from 'src/app/shared/services/eval/eval.service';
import { EvalsService } from 'src/app/shared/services/evals/evals.service';

@Component({
  selector: 'app-load',
  templateUrl: './load.component.html',
  styleUrls: ['./load.component.scss'],
})
export class LoadComponent implements OnInit {
  evaluationForm!: FormGroup;

  attendance: any = [];
  subjectId: any;
  sectionId: any;
  eval: any = {};
  evals: any = {};
  questions = [
    {
      sentence:
        'The course content was insufficient and did not meet my expectations.',
      ratings: [
        { key: 'rating1', name: 'Strongly Disagree' },
        { key: 'rating2', name: 'Disagree' },
        { key: 'rating3', name: 'Neutral' },
        { key: 'rating4', name: 'Agree' },
        { key: 'rating5', name: 'Strongly Agree' },
      ],
    },
    {
      sentence:
        'The instructor was not engaging, and their teaching style did not hold my attention.',
      ratings: [
        { key: 'rating6', name: 'Strongly Disagree' },
        { key: 'rating7', name: 'Disagree' },
        { key: 'rating8', name: 'Neutral' },
        { key: 'rating9', name: 'Agree' },
        { key: 'rating10', name: 'Strongly Agree' },
      ],
    },
    {
      sentence:
        'The course materials were outdated and did not align with current industry standards.',
      ratings: [
        { key: 'rating11', name: 'Strongly Disagree' },
        { key: 'rating12', name: 'Disagree' },
        { key: 'rating13', name: 'Neutral' },
        { key: 'rating14', name: 'Agree' },
        { key: 'rating15', name: 'Strongly Agree' },
      ],
    },
    {
      sentence:
        'The workload was overwhelming, and there was not enough time to complete assignments.',
      ratings: [
        { key: 'rating16', name: 'Strongly Disagree' },
        { key: 'rating17', name: 'Disagree' },
        { key: 'rating18', name: 'Neutral' },
        { key: 'rating19', name: 'Agree' },
        { key: 'rating20', name: 'Strongly Agree' },
      ],
    },
    {
      sentence: 'The course structure was well-organized and easy to follow.',
      ratings: [
        { key: 'rating21', name: 'Strongly Disagree' },
        { key: 'rating22', name: 'Disagree' },
        { key: 'rating23', name: 'Neutral' },
        { key: 'rating24', name: 'Agree' },
        { key: 'rating25', name: 'Strongly Agree' },
      ],
    },
    {
      sentence:
        'The instructor was not engaging, and their teaching style did not hold my attention.',
      ratings: [
        { key: 'rating26', name: 'Strongly Disagree' },
        { key: 'rating27', name: 'Disagree' },
        { key: 'rating28', name: 'Neutral' },
        { key: 'rating29', name: 'Agree' },
        { key: 'rating30', name: 'Strongly Agree' },
      ],
    },
    {
      sentence:
        'The instructor was knowledgeable and effectively conveyed the subject matter.',
      ratings: [
        { key: 'rating31', name: 'Strongly Disagree' },
        { key: 'rating32', name: 'Disagree' },
        { key: 'rating33', name: 'Neutral' },
        { key: 'rating34', name: 'Agree' },
        { key: 'rating35', name: 'Strongly Agree' },
      ],
    },
    {
      sentence:
        'The course materials were comprehensive and provided valuable resources.',
      ratings: [
        { key: 'rating36', name: 'Strongly Disagree' },
        { key: 'rating37', name: 'Disagree' },
        { key: 'rating38', name: 'Neutral' },
        { key: 'rating39', name: 'Agree' },
        { key: 'rating40', name: 'Strongly Agree' },
      ],
    },
    {
      sentence:
        'The assignments and assessments were relevant and helped reinforce the concepts.',
      ratings: [
        { key: 'rating41', name: 'Strongly Disagree' },
        { key: 'rating42', name: 'Disagree' },
        { key: 'rating43', name: 'Neutral' },
        { key: 'rating44', name: 'Agree' },
        { key: 'rating45', name: 'Strongly Agree' },
      ],
    },
    {
      sentence:
        'The course encouraged active participation and fostered a collaborative learning environment.',
      ratings: [
        { key: 'rating46', name: 'Strongly Disagree' },
        { key: 'rating47', name: 'Disagree' },
        { key: 'rating48', name: 'Neutral' },
        { key: 'rating49', name: 'Agree' },
        { key: 'rating50', name: 'Strongly Agree' },
      ],
    },
  ];
  status = ['Present', 'Absent', 'Late'];

  confirmationDialog = false;
  successDialog = false;
  errorDialog = false;
  isEvaluated = false;

  attStatus = '';
  title = '';
  body = '';

  present = 0;
  absent = 0;
  late = 0;

  constructor(
    private attendanceStudentService: AttendanceStudentService,
    private datePipe: DatePipe,
    private fb: FormBuilder,
    private evalService: EvalService,
    private authService: AuthService,
    private evalsService: EvalsService,
    private route: ActivatedRoute
  ) {
    this.evaluationForm = this.fb.group({
      answers: this.fb.array([], Validators.required),
    });
  }

  get answers(): FormArray {
    return this.evaluationForm.get('answers') as FormArray;
  }

  ngOnInit(): void {
    this.questions.forEach(() => {
      this.answers.push(this.fb.control(''));
    });
    this.getParam();
    this.getAttendance();
    this.getEvalByStudent();
    this.getEvals();
  }

  getParam = () => {
    const params = this.route.snapshot.params['section'];
    const splitParams = params.split('-');
    this.sectionId = splitParams[0];
    this.subjectId = splitParams[1];
  };

  getAttendance = () => {
    this.attendanceStudentService
      .getAttendanceBySection(this.sectionId, this.subjectId)
      .subscribe((data: any) => {
        this.attendance = data.sort(
          (a: any, b: any) => b.attendanceId - a.attendanceId
        );
        const present = this.attendance.filter(
          (att: any) => att.status == 'Present'
        );
        this.present = present.length;
        const absent = this.attendance.filter(
          (att: any) => att.status == 'Absent'
        );
        this.absent = absent.length;
        const late = this.attendance.filter((att: any) => att.status == 'Late');
        this.late = late.length;
      });
  };

  getEvals = () => {
    this.evalsService
      .getEval(this.subjectId, this.sectionId)
      .subscribe((data) => (this.evals = data));
  };

  getEvalByStudent = () => {
    this.evalService
      .getEvalBySubjectIdAndStudentId(
        this.subjectId,
        this.authService.getUserId()
      )
      .subscribe((data: any) => {
        if (data.evaluationId != 0) {
          this.isEvaluated = true;
        }
      });
  };

  onChangeAttendance = (att: string) => {
    this.attendanceStudentService
      .getAttendanceBySection(this.sectionId, this.subjectId)
      .subscribe((data: any) => {
        this.attendance = data.sort(
          (a: any, b: any) => b.attendanceId - a.attendanceId
        );
        this.attendance = this.attendance.filter(
          (att: any) => att.status == att
        );
      });
  };

  onReset = () => {
    this.attStatus = '';
    this.getAttendance();
  };

  convertDate = (dateStr: string) => {
    const date = new Date(dateStr);
    if (date.getFullYear() > 2022) {
      return this.datePipe.transform(date, 'MMMM d, y');
    }
    return '-';
  };

  onSubmit = () => {
    this.confirmationDialog = true;
  };

  onConfirm = () => {
    const answers = this.evaluationForm.get('answers')?.value;
    const temp: any = [];
    answers.map((answer: any) => {
      if (answer !== '' && answer !== undefined && answer !== null) {
        temp.push(answer.name);
      }
    });
    if (temp.length != 10) {
      this.confirmationDialog = false;
      this.errorDialog = true;
    } else {
      const payload = {
        subjectId: this.subjectId,
        studentId: this.authService.getUserId(),
        answers: temp,
      };
      this.evalService.addEval(payload).subscribe(() => {
        this.confirmationDialog = false;
        this.successDialog = true;
      });
    }
  };

  onClose = () => {
    this.confirmationDialog = false;
  };

  onOK = () => {
    this.successDialog = false;
    this.getEvalByStudent();
  };

  onOKError = () => {
    this.errorDialog = false;
  };
}
