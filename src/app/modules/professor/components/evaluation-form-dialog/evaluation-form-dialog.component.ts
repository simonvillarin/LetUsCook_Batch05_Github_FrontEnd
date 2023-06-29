import { Component } from '@angular/core';
import { EvaluationDialogComponent } from '../evaluation-dialog/evaluation-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-evaluation-form-dialog',
  templateUrl: './evaluation-form-dialog.component.html',
  styleUrls: ['./evaluation-form-dialog.component.scss'],
})
export class EvaluationFormDialogComponent {
  constructor(private confirmDialog: MatDialog) {}
  onClickSubmit = () => {
    this.confirmDialog.open(EvaluationDialogComponent, {
      width: '450px',
      height: '300px',
    });
  };
}
