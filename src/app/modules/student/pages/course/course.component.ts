import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss'],
})
export class CourseComponent {
  isShowDropdown = false;
  isShowMobileNav = false;
  isShowNotifications = false;
  isDialogOpen: boolean = false;

  title: string = '';

  evaluationForm!: FormGroup;

  evaluationQuestions = [
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

  ngOnInit() {
    this.evaluationQuestions.forEach((question) => {
      this.evaluationForm.addControl(question.sentence, new FormControl(''));
    });
  }

  constructor(private fb: FormBuilder) {
    this.evaluationForm = this.fb.group({});
  }

  onClickEvaluate = () => {
    this.title = 'Course Evaluation';
    this.isDialogOpen = true;
  };

  onSubmit = () => {
    console.log(this.evaluationForm.value);
  };

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
  };

  closeMobileNav = () => {
    this.isShowMobileNav = false;
  };
}
