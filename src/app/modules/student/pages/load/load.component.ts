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
import { EvalService } from 'src/app/shared/services/eval/eval.service';

@Component({
  selector: 'app-load',
  templateUrl: './load.component.html',
  styleUrls: ['./load.component.scss'],
})
export class LoadComponent implements OnInit {
  evaluationForm!: FormGroup;

  attendance: any = [];
  subjectId: any;
  eval: any = {};
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

  confirmationDialog = false;
  successDialog = false;
  errorDialog = false;
  isEvaluated = false;

  title = '';
  body = '';

  constructor(
    private datePipe: DatePipe,
    private fb: FormBuilder,
    private evalService: EvalService,
    private authService: AuthService,
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
    this.getEvalByStudent();
  }

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

  getParam = () => {
    const params = this.route.snapshot.params['section'];
    const splitParams = params.split('-');
    this.subjectId = splitParams[1];
  };

  convertDate = (dateStr: string) => {
    const date = new Date(dateStr);
    if (date.getFullYear() > 2022) {
      return this.datePipe.transform(date, 'MMMM d, y');
    }
    return '-';
  };

  convertTime = (time: any) => {
    const splitTime = time.split(':');
    let hour;
    let zone;
    if (parseInt(splitTime[0]) == 13) {
      hour = 1;
    } else if (parseInt(splitTime[0]) == 13) {
      hour = 1;
    } else if (parseInt(splitTime[0]) == 14) {
      hour = 2;
    } else if (parseInt(splitTime[0]) == 15) {
      hour = 3;
    } else if (parseInt(splitTime[0]) == 16) {
      hour = 4;
    } else if (parseInt(splitTime[0]) == 17) {
      hour = 5;
    } else if (parseInt(splitTime[0]) == 18) {
      hour = 6;
    } else if (parseInt(splitTime[0]) == 19) {
      hour = 7;
    } else if (parseInt(splitTime[0]) == 20) {
      hour = 8;
    } else if (parseInt(splitTime[0]) == 21) {
      hour = 9;
    } else if (parseInt(splitTime[0]) == 22) {
      hour = 10;
    } else if (parseInt(splitTime[0]) == 23) {
      hour = 11;
    } else if (parseInt(splitTime[0]) == 24 || splitTime[0] == '00') {
      hour = 12;
    } else {
      hour = splitTime[0];
    }

    if (parseInt(splitTime[0]) > 12) {
      zone = 'PM';
    } else {
      zone = 'AM';
    }
    return hour + ':' + splitTime[1] + ' ' + zone;
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
