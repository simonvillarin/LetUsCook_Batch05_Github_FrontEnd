import { Component } from '@angular/core';

@Component({
  selector: 'app-curriculum-dialog',
  templateUrl: './curriculum-dialog.component.html',
  styleUrls: ['./curriculum-dialog.component.scss'],
})
export class CurriculumDialogComponent {
  curriculums = [
    {
      id: 1000,
      term: 'First Term',
      yearLevel: 'Third Year',
      program: 'BSIT',
      subject: 'Advanced Database',
    },
  ];
  terms = [{ name: 'First Term' }, { name: 'Second Term' }];
  levels = [
    { name: 'First Year' },
    { name: 'Second Year' },
    { name: 'Third Year' },
    { name: 'Fourth Year' },
  ];
}
