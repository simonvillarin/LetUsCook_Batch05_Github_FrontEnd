import { ApplicationService } from './../../../../shared/services/application/application.service';
import { Component, ElementRef, Renderer2, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProgramService } from 'src/app/shared/services/program/program.service';
import { StudentService } from 'src/app/shared/services/student/student.service';
import {
  ageValidator,
  birthdateValidator,
  mobileNumberValidator,
  telephoneNumberValidator,
  zipcodeValidator,
} from 'src/app/shared/validators/custom.validator';
import Swal from 'sweetalert2';

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
  existing: boolean = false;
  stepperNumber: number = 1;
  typeOfStudent: string = '';
  program: string = '';
  studentNo: string = '';
  applyForm: FormGroup;
  buttonClicked: boolean = false;
  studentInfo: any = {};
  programs: any[] = [];

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
    private studentService: StudentService,
    private appService: ApplicationService,
    private programService: ProgramService
  ) {
    this.applyForm = fb.group({
      programCode: [''],
      yearLevel: ['', [Validators.required]],
      sem: ['', [Validators.required]],
      academicYear: ['', [Validators.required]],
      firstname: ['', [Validators.required]],
      middlename: [''],
      lastname: ['', [Validators.required]],
      suffix: [''],
      gender: ['', [Validators.required]],
      civilStatus: ['', [Validators.required]],
      citizenship: ['', [Validators.required]],
      birthdate: [
        '',
        [Validators.required, birthdateValidator(), ageValidator()],
      ],
      birthplace: ['', [Validators.required]],
      religion: ['', [Validators.required]],
      unit: ['', [Validators.required]],
      street: ['', [Validators.required]],
      subdivision: ['', [Validators.required]],
      barangay: ['', [Validators.required]],
      city: ['', [Validators.required]],
      province: ['', [Validators.required]],
      zipcode: ['', [Validators.required, zipcodeValidator()]],
      telephone: ['', [telephoneNumberValidator()]],
      mobile: ['', [Validators.required, mobileNumberValidator()]],
      email: ['', [Validators.required, Validators.email]],
      lastSchoolAttended: ['', [Validators.required]],
      programTaken: ['', [Validators.required]],
      lastYearLevel: ['', [Validators.required]],
      lastSchoolYear: ['', [Validators.required]],
      lastSem: [''],
      dateOfGraduation: ['', [Validators.required]],
      parentFirstname: ['', [Validators.required]],
      parentMiddlename: [''],
      parentLastname: ['', [Validators.required]],
      parentSuffix: [''],
      parentAddress: ['', [Validators.required]],
      parentContact: ['', [Validators.required, mobileNumberValidator()]],
      parentRelationship: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.getAllPrograms();
    const date = new Date();
    let currentYear = date.getFullYear();
    const nextYear = date.getFullYear() + 1;
    const schoolYear = String(currentYear) + ' - ' + String(nextYear);
    this.schoolYear.push(schoolYear);
    for (let i = 0; i < 28; i++) {
      let previousYear = currentYear - 1;
      let year = String(previousYear) + ' - ' + String(currentYear);
      this.schoolYears.push(year);
      currentYear = currentYear - 1;
    }
  }

  getAllPrograms = () => {
    this.programService.getAllPrograms().subscribe((data) => {
      this.programs = data;
      console.log(data);
    });
  };

  onStepOne = () => {
    if (this.stepperNumber == 2 || this.stepperNumber == 4) {
      this.stepOne = true;
      this.stepTwo = false;
      this.stepThree = false;
      this.stepFour = false;
      this.stepperNumber = 1;
      this.stepOneDone = false;
    }
  };

  onStepTwo = () => {
    if (this.stepperNumber == 3 || this.stepperNumber == 4) {
      this.stepTwo = true;
      this.stepThree = false;
      this.stepFour = false;
      this.stepOne = false;
      this.stepperNumber = 2;
      this.stepTwoDone = false;
    }
  };

  onStepThree = () => {
    if (this.stepperNumber == 3) {
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
      this.existing = false;
    } else if (typeOfStudent == 'Existing Student') {
      this.studentNoError = false;
      this.program = '';
      const radioButtons =
        this.elementRef.nativeElement.querySelectorAll('.radio1');
      radioButtons.forEach((radio: any) => {
        this.renderer.setProperty(radio, 'checked', false);
      });
      this.existing = true;
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
      if (this.studentNo != '') {
        this.studentService
          .getStudentByStudentNo(this.studentNo)
          .subscribe((res: any) => {
            if (res == null) {
              alert('null');
            } else {
              this.stepTwo = true;
              this.stepThree = false;
              this.stepFour = false;
              this.stepOne = false;
              this.stepperNumber = 2;
              this.stepOneDone = true;
              scroll(0, 0);
            }
          });
      } else {
        this.stepTwo = true;
        this.stepThree = false;
        this.stepFour = false;
        this.stepOne = false;
        this.stepperNumber = 2;
        this.stepOneDone = true;
        scroll(0, 0);
      }
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
      this.studentInfo = this.applyForm.value;
      this.studentInfo.birthdate = this.convertDateString(
        this.studentInfo.birthdate
      );
      this.studentInfo.dateOfGraduation = this.convertDateString(
        this.studentInfo.dateOfGraduation
      );
      console.log(this.studentInfo);
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
    this.applyForm.patchValue({
      programCode: this.program,
    });

    Swal.fire({
      title: 'Validate',
      text: 'Are you sure to send this application?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.appService.addApplication(this.applyForm.value).subscribe(() => {
          this.stepFour = true;
          this.stepOne = false;
          this.stepTwo = false;
          this.stepThree = false;
          this.stepperNumber = 4;
          this.stepThreeDone = true;
          scroll(0, 0);
          this.applyForm.reset();
        });
      }
    });
  };

  convertDateString = (originalDate: string): string => {
    const newDate = new Date(originalDate);
    const year = newDate.getFullYear();
    const month = this.formatWithLeadingZero(newDate.getMonth() + 1);
    const day = this.formatWithLeadingZero(newDate.getDate());
    return `${month}/${day}/${year}`;
  };

  formatWithLeadingZero(value: number): string {
    return value < 10 ? '0' + value : value.toString();
  }
}
