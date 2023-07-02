import { Component, ElementRef, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-apply',
  templateUrl: './apply.component.html',
  styleUrls: ['./apply.component.scss'],
})
export class ApplyComponent {
  stepOne: boolean = true;
  stepTwo: boolean = false;
  stepThree: boolean = false;
  stepFour: boolean = false;
  stepOneDone: boolean = false;
  stepTwoDone: boolean = false;
  stepThreeDone: boolean = false;
  programError: boolean = false;
  studentNoError: boolean = false;
  stepperNumber: number = 1;
  typeOfStudent: string = '';
  program: string = '';
  studentNo: string = '';

  terms = [
    { name: 'Please select term' },
    { name: 'First Term' },
    { name: 'Second Term' },
  ];
  levels = [
    { name: 'Please select year level' },
    { name: 'First Year' },
    { name: 'Second Year' },
    { name: 'Third Year' },
    { name: 'Fourth Year' },
  ];
  schoolYear = [{ name: 'Please select school year' }, { name: '2023-2024' }];

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  onStepOne = () => {
    // if (this.stepperNumber == 2) {
    this.stepOne = true;
    this.stepTwo = false;
    this.stepThree = false;
    this.stepFour = false;
    this.stepperNumber = 1;
    this.stepOneDone = false;
    // }
  };

  onStepTwo = () => {
    // if (this.stepperNumber == 3) {
    this.stepTwo = true;
    this.stepThree = false;
    this.stepFour = false;
    this.stepOne = false;
    this.stepperNumber = 2;
    this.stepTwoDone = false;
    // }
  };

  onStepThree = () => {
    // if (this.stepperNumber == 4) {
    this.stepThree = true;
    this.stepFour = false;
    this.stepOne = false;
    this.stepTwo = false;
    this.stepperNumber = 3;
    this.stepThreeDone = false;
    // }
  };

  onStepFour = () => {
    // if (this.stepperNumber == 3) {
    this.stepFour = true;
    this.stepOne = false;
    this.stepTwo = false;
    this.stepThree = false;
    this.stepperNumber = 4;
    //}
  };

  onChangeTypeOfStudent = (typeOfStudent: any) => {
    if (typeOfStudent == 'New Student') {
      this.programError = false;
      this.studentNo == '';
    } else if (typeOfStudent == 'Existing Student') {
      this.studentNoError = false;
      this.program = '';
      const radioButtons =
        this.elementRef.nativeElement.querySelectorAll('.radio');
      radioButtons.forEach((radio: any) => {
        this.renderer.setProperty(radio, 'checked', false);
      });
    }
  };

  onChangeProgram = (program: any) => {
    if (program != '') {
      this.programError = false;
    }
  };

  onChangeStudentNo = (studentNo: any) => {
    if (studentNo != '') {
      this.studentNoError = false;
    }
  };

  onSubmitStepOne = () => {
    if (this.program != '' || this.studentNo != '') {
      this.stepTwo = true;
      this.stepThree = false;
      this.stepFour = false;
      this.stepOne = false;
      this.stepperNumber = 2;
      this.stepOneDone = true;
      scroll(0, 0);
    } else {
      if (this.program == '' && this.studentNo == '') {
        this.programError = true;
      }
      if (this.studentNo == '' && this.program == '') {
        this.studentNoError = true;
      }
    }
  };
}
