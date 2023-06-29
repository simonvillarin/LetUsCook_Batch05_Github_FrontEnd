import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-evaluation-dialog',
  templateUrl: './evaluation-dialog.component.html',
  styleUrls: ['./evaluation-dialog.component.scss'],
})
export class EvaluationDialogComponent {
  constructor(
    private evaluationDialog: MatDialogRef<EvaluationDialogComponent>
  ) {}
}
