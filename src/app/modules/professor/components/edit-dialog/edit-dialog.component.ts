import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.scss'],
})
export class EditDialogComponent {
  grades = [
    { name: '1.00 (97.50 - 100%)', value: '1.00' },
    { name: '1.25 (94.50 - 97.49%)', value: '1.00' },
    { name: '1.50 (91.50 - 94.49%)', value: '1.00' },
    { name: '1.75 (88.50 - 91.49%)', value: '1.00' },
    { name: '2.00 (85.50 - 88.49%)', value: '1.00' },
    { name: '2.25 (82.50 - 85.49%)', value: '1.00' },
    { name: '2.50 (79.50 - 82.49%)', value: '1.00' },
    { name: '2.75 (76.50 - 79.49%)', value: '1.00' },
    { name: '3.00 (74.50 - 76.49%)', value: '1.00' },
    { name: '5.00 (74.49% - Below)', value: '1.00' },
  ];
  remarks = [
    { value: 'Passed' },
    { value: 'Failed' },
    { value: 'Conditional' },
  ];

  selectedGrade: string | any;
  selectedRemark: string | any;
  constructor(private editDialog: MatDialogRef<EditDialogComponent>) {}

  onGradeChange = () => {
    console.log(this.selectedGrade);
  };

  onRemarkChange = () => {
    console.log(this.selectedRemark);
  };
}
