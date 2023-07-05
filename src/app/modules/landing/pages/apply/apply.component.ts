import { Component, ElementRef, Renderer2, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-apply',
  templateUrl: './apply.component.html',
  styleUrls: ['./apply.component.scss'],
})
export class ApplyComponent implements OnInit {
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
  applyForm: FormGroup;
  buttonClicked: boolean = false;

  terms = ['Please select term', 'First Term', 'Second Term'];
  levels = [
    'Please select year level',
    'First Year',
    'Second Year',
    'Third Year',
    'Fourth Year',
  ];
  yearLevels = [
    'Select year level',
    'Grade 12',
    'First Year',
    'Second Year',
    'Third Year',
    'Fourth Year',
  ];
  schoolYear = ['Please select school year'];
  schoolYears = ['Select school year'];
  genders = ['Gender', 'Male', 'Female'];
  civilStatus = ['Civil Status', 'Single', 'Married', 'Divorced', 'Widowed'];

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private fb: FormBuilder
  ) {
    this.applyForm = fb.group({
      yearLevel: ['', [Validators.required]],
      term: ['', [Validators.required]],
      schoolYear: ['', [Validators.required]],
      firstName: ['', [Validators.required]],
      middleName: [''],
      lastName: ['', [Validators.required]],
      suffix: [''],
      gender: ['', [Validators.required]],
      civilStatus: ['', [Validators.required]],
      citizenship: ['', [Validators.required]],
      birthDate: ['', [Validators.required]],
      birthPlace: ['', [Validators.required]],
      religion: ['', [Validators.required]],
      unit: ['', [Validators.required]],
      street: ['', [Validators.required]],
      subdivision: ['', [Validators.required]],
      barangay: ['', [Validators.required]],
      city: ['', [Validators.required]],
      province: ['', [Validators.required]],
      zipcode: ['', [Validators.required]],
      telephone: ['', [Validators.required]],
      mobile: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      schoolName: ['', [Validators.required]],
      program: ['', [Validators.required]],
      graduationDate: ['', [Validators.required]],
      lastSchoolYear: ['', [Validators.required]],
      lastYearLevel: ['', [Validators.required]],
      lastYearTerm: [''],
      emergencyFirstName: ['', [Validators.required]],
      emergencyMiddleName: [''],
      emergencyLastName: ['', [Validators.required]],
      emergencySuffix: ['', [Validators.required]],
      emergencyAddress: ['', [Validators.required]],
      emergencyContact: ['', [Validators.required]],
      emergencyRelationship: ['', [Validators.required]],
    });
  }

  onSubmit = () => {
    if (this.applyForm.valid) {
      const {
        yearLevel,
        term,
        schoolYear,
        firstName,
        middleName,
        lastName,
        suffix,
        gender,
        civilStatus,
        citizenship,
        birthDate,
        birthPlace,
        religion,
        unit,
        street,
        subdivision,
        barangay,
        city,
        province,
        zipcode,
        telephone,
        mobile,
        email,
        schoolName,
        program,
        graduationDate,
        lastSchoolYear,
        lastYearLevel,
        lastYearTerm,
        emergencyFirstName,
        emergencyMiddleName,
        emergencyLastName,
        emergencySuffix,
        emergencyAddress,
        emergencyContact,
        emergencyRelationship,
      } = this.applyForm.value;
      this.applyForm.patchValue({
        yearLevel,
        term,
        schoolYear,
        firstName,
        middleName,
        lastName,
        suffix,
        gender,
        civilStatus,
        citizenship,
        birthDate,
        birthPlace,
        religion,
        unit,
        street,
        subdivision,
        barangay,
        city,
        province,
        zipcode,
        telephone,
        mobile,
        email,
        schoolName,
        program,
        graduationDate,
        lastSchoolYear,
        lastYearLevel,
        lastYearTerm,
        emergencyFirstName,
        emergencyMiddleName,
        emergencyLastName,
        emergencySuffix,
        emergencyAddress,
        emergencyContact,
        emergencyRelationship,
      });
    } else {
      this.buttonClicked = true;
      this.applyForm.markAllAsTouched();
    }
  };

  ngOnInit(): void {
    const date = new Date();
    let currentYear = date.getFullYear();
    const nextYear = date.getFullYear() + 1;
    const schoolYear = String(currentYear) + ' - ' + String(nextYear);
    this.schoolYear = [...this.schoolYear, schoolYear];
    for (let i = 0; i < 28; i++) {
      let previousYear = currentYear - 1;
      let year = String(previousYear) + ' - ' + String(currentYear);
      this.schoolYears = [...this.schoolYears, year];
      currentYear = currentYear - 1;
    }
  }

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
        this.elementRef.nativeElement.querySelectorAll('.radio1');
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
