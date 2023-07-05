import { Component, ElementRef, Renderer2, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StudentService } from 'src/app/shared/services/student/student.service';

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
  studentInfo: any;

  terms = ['First Term', 'Second Term'];
  levels = ['First Year', 'Second Year', 'Third Year', 'Fourth Year'];
  yearLevels = [
    'Grade 12',
    'First Year',
    'Second Year',
    'Third Year',
    'Fourth Year',
  ];
  schoolYear: string[] = [];
  schoolYears: string[] = [];
  genders = ['Male', 'Female'];
  civilStatus = ['Single', 'Married', 'Divorced', 'Widowed'];

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private fb: FormBuilder,
    private studentService: StudentService
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

  ngOnInit(): void {
    const date = new Date();
    let currentYear = date.getFullYear();
    const nextYear = date.getFullYear() + 1;
    const schoolYear = String(currentYear) + ' - ' + String(nextYear);
    this.schoolYear.push;
    for (let i = 0; i < 28; i++) {
      let previousYear = currentYear - 1;
      let year = String(previousYear) + ' - ' + String(currentYear);
      this.schoolYears.push(year);
      currentYear = currentYear - 1;
    }
  }

  onStepOne = () => {
    if (this.stepperNumber == 2) {
      this.stepOne = true;
      this.stepTwo = false;
      this.stepThree = false;
      this.stepFour = false;
      this.stepperNumber = 1;
      this.stepOneDone = false;
    }
  };

  onStepTwo = () => {
    if (this.stepperNumber == 3) {
      this.stepTwo = true;
      this.stepThree = false;
      this.stepFour = false;
      this.stepOne = false;
      this.stepperNumber = 2;
      this.stepTwoDone = false;
    }
  };

  onStepThree = () => {
    if (this.stepperNumber == 4) {
      this.stepThree = true;
      this.stepFour = false;
      this.stepOne = false;
      this.stepTwo = false;
      this.stepperNumber = 3;
      this.stepThreeDone = false;
    }
  };

  onStepFour = () => {
    if (this.stepperNumber == 3) {
      this.stepFour = true;
      this.stepOne = false;
      this.stepTwo = false;
      this.stepThree = false;
      this.stepperNumber = 4;
    }
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

  onSubmitStepTwo = () => {
    if (this.applyForm.valid) {
      const yearLevel = this.applyForm.get('yearLevel')?.value;
      const term = this.applyForm.get('term')?.value;
      const schoolYear = this.applyForm.get('schoolYear')?.value;
      const firstname = this.applyForm.get('firstName')?.value;
      const middlename = this.applyForm.get('middleName')?.value;
      const lastname = this.applyForm.get('lastName')?.value;
      const suffix = this.applyForm.get('suffix')?.value;
      const gender = this.applyForm.get('gender')?.value;
      const civilStatus = this.applyForm.get('civilStatus')?.value;
      const birthdate = this.applyForm.get('birthDate')?.value;
      const birthplace = this.applyForm.get('birthPlace')?.value;
      const citizenship = this.applyForm.get('citizenship')?.value;
      const religion = this.applyForm.get('religion')?.value;
      const unit = this.applyForm.get('unit')?.value;
      const street = this.applyForm.get('street')?.value;
      const subdivision = this.applyForm.get('subdivision')?.value;
      const barangay = this.applyForm.get('barangay')?.value;
      const city = this.applyForm.get('city')?.value;
      const province = this.applyForm.get('province')?.value;
      const zipcode = this.applyForm.get('zipcode')?.value;
      const telephone = this.applyForm.get('telephone')?.value;
      const mobile = this.applyForm.get('mobile')?.value;
      const email = this.applyForm.get('email')?.value;
      const lastSchoolAttended = this.applyForm.get('schoolName')?.value;
      const programTaken = this.applyForm.get('program')?.value;
      const lastYearLevel = this.applyForm.get('lastYearLevel')?.value;
      const lastSchoolYear = this.applyForm.get('lastSchoolYear')?.value;
      const lastSem = this.applyForm.get('lastYearTerm')?.value;
      const dateOfGraduation = this.applyForm.get('graduationDate')?.value;
      const parentFirstName = this.applyForm.get('emergencyFirstName')?.value;
      const parentMiddleName = this.applyForm.get('emergencyMiddleName')?.value;
      const parentLastName = this.applyForm.get('emergencyLastName')?.value;
      const parentSuffix = this.applyForm.get('emergencySuffix')?.value;
      const parentAddress = this.applyForm.get('emergencyAddress')?.value;
      const parentContact = this.applyForm.get('emergencyContact')?.value;
      const parentRelationship = this.applyForm.get(
        'emergencyRelationship'
      )?.value;

      this.studentInfo = {
        programCode: this.program,
        subjectId: [],
        yearLevel: yearLevel,
        term: term,
        schoolYear: schoolYear,
        firstname: firstname,
        middlename: middlename,
        lastname: lastname,
        suffix: suffix,
        gender: gender,
        civilStatus: civilStatus,
        birthdate: birthdate,
        birthplace: birthplace,
        citizenship: citizenship,
        religion: religion,
        unit: unit,
        street: street,
        subdivision: subdivision,
        barangay: barangay,
        city: city,
        province: province,
        zipcode: zipcode,
        telephone: telephone,
        mobile: mobile,
        email: email,
        lastSchoolAttended: lastSchoolAttended,
        programTaken: programTaken,
        lastSem: lastSem,
        lastYearLevel: lastYearLevel,
        lastSchoolYear: lastSchoolYear,
        dateOfGraduation: dateOfGraduation,
        parentFirstName: parentFirstName,
        parentMiddleName: parentMiddleName,
        parentLastName: parentLastName,
        parentSuffix: parentSuffix,
        parentAddress: parentAddress,
        parentContact: parentContact,
        parentRelationship: parentRelationship,
        image: '',
        status: 'Regular',
        enrollmentStatus: 'Pending',
        activeDeactive: true,
      };

      console.log('hello');

      this.stepThree = true;
      this.stepFour = false;
      this.stepOne = false;
      this.stepTwo = false;
      this.stepperNumber = 3;
      this.stepTwoDone = true;
      scroll(0, 0);
    } else {
      this.buttonClicked = true;
      this.applyForm.markAllAsTouched();
    }
  };

  onSubmitStepThree = () => {
    this.studentService.addStudent(this.studentInfo).subscribe(() => {
      console.log('Student added successfully');
    });
    this.stepFour = true;
    this.stepOne = false;
    this.stepTwo = false;
    this.stepThree = false;
    this.stepperNumber = 4;
    this.stepThreeDone = true;
    scroll(0, 0);
    this.applyForm.reset();
  };
}
