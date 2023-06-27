import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-curriculum',
  templateUrl: './curriculum.component.html',
  styleUrls: ['./curriculum.component.scss'],
})
export class CurriculumComponent {
  isShowDropdown = false;
  isShowMobileNav = false;
  isShowNotifications = false;

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

  curriculum = [
    {
      subjectCode: 'IT 101',
      description: 'Intermediate Programming',
      units: 3.0,
      preReqs: [
        'Introduction to Programming 1',
        'Introduction to Programming 2',
      ],
    },
    {
      subjectCode: 'IT 101',
      description: 'Advanced Database',
      units: 3.0,
      preReqs: ['Database Management'],
    },
    {
      subjectCode: 'BIO 101',
      description: 'Concepts in Biological Sciences II',
      units: 1.0,
      preReqs: [
        'Concepts in Biological Sciences I',
        'Concepts in Biological Sciences I Lab',
      ],
    },
  ];

  terms = [{ name: 'First Term' }, { name: 'Second Term' }];
  period = [{ name: 'Prelims' }, { name: 'Midterms' }, { name: 'Finals' }];

  termsSelected: string = 'First Term';
  periodSelected: string = 'Prelims';

  termSelected: FormGroup;

  constructor(private fb: FormBuilder) {
    this.termSelected = fb.group({
      term: [''],
      period: [''],
    });
  }

  onTermChange = (term: any) => {
    this.termsSelected = term.name;
  };

  onPeriodChange = (period: any) => {
    this.periodSelected = period.name;
  };
}
