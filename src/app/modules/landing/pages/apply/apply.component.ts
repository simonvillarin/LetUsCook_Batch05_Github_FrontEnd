import { ApplicationService } from './../../../../shared/services/application/application.service';
import { Component, ElementRef, Renderer2, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ParentService } from 'src/app/shared/services/parent/parent.service';
import { ProgramService } from 'src/app/shared/services/program/program.service';
import { StudentHistoryService } from 'src/app/shared/services/student-history/student-history.service';
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
  invalid: boolean = false;
  stepperNumber: number = 1;
  typeOfStudent: string = '';
  program: string = '';
  studentNo: string = '';
  studNo: string = '';
  applyForm: FormGroup;
  existForm: FormGroup;
  buttonClicked: boolean = false;
  studentInfo: any = {};
  programs: any[] = [];
  studentId: any;
  parentId: any;

  terms: any = [];
  levels: any = [];
  yearLevels = [
    'Grade 12',
    'First Year',
    'Second Year',
    'Third Year',
    'Fourth Year',
  ];
  schoolYear: string[] = [];
  schoolYears: string[] = [];
  genders = ['Male', 'Female', 'Others'];
  civilStatus = ['Single', 'Married', 'Divorced', 'Widowed'];

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private fb: FormBuilder,
    private parentService: ParentService,
    private studentService: StudentService,
    private studentHistoryService: StudentHistoryService,
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
      dateOfGraduation: ['', [Validators.required, birthdateValidator()]],
      parentFirstname: ['', [Validators.required]],
      parentMiddlename: [''],
      parentLastname: ['', [Validators.required]],
      parentSuffix: [''],
      parentAddress: ['', [Validators.required]],
      parentContact: ['', [Validators.required, mobileNumberValidator()]],
      parentEmail: ['', [Validators.required, Validators.email]],
      parentRelationship: ['', [Validators.required]],
    });
    this.existForm = fb.group({
      yearLevel: ['', [Validators.required]],
      sem: ['', [Validators.required]],
      academicYear: ['', [Validators.required]],
      telephone: ['', [telephoneNumberValidator()]],
      mobile: ['', [Validators.required, mobileNumberValidator()]],
      email: ['', [Validators.required, Validators.email]],
      parentFirstname: ['', [Validators.required]],
      parentMiddlename: [''],
      parentLastname: ['', [Validators.required]],
      parentSuffix: [''],
      parentAddress: ['', [Validators.required]],
      parentContact: ['', [Validators.required, mobileNumberValidator()]],
      parentEmail: ['', [Validators.required, Validators.email]],
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
      this.invalid = false;
    }
  };

  onSubmitStepOne = () => {
    if (this.program != '' || this.studentNo != '') {
      if (this.studentNo != '') {
        this.studentHistoryService
          .getStudentByStudentNo(this.studentNo)
          .subscribe((res: any) => {
            if (res.length == 0) {
              this.invalid = true;
            } else {
              let firstYearFirstTerm: boolean = false;
              let firstYearSecondTerm: boolean = false;
              let secondYearFirstTerm: boolean = false;
              let secondYearSecondTerm: boolean = false;
              let thirdYearFirstTerm: boolean = false;
              let thirdYearSecondTerm: boolean = false;
              let fourthYearFirstTerm: boolean = false;
              let fourthYearSecondYear: boolean = false;
              let year: string;
              let term: string;
              res.map((obj: any) => {
                if (
                  obj.student.yearLevel == 'First Year' &&
                  obj.student.sem == 'First Term'
                ) {
                  firstYearFirstTerm = true;
                } else if (
                  obj.student.yearLevel == 'First Year' &&
                  obj.student.sem == 'Second Term'
                ) {
                  firstYearSecondTerm = true;
                } else if (
                  obj.student.yearLevel == 'Second Year' &&
                  obj.student.sem == 'First Term'
                ) {
                  secondYearFirstTerm = true;
                } else if (
                  obj.student.yearLevel == 'Second Year' &&
                  obj.student.sem == 'Second Term'
                ) {
                  secondYearSecondTerm = true;
                } else if (
                  obj.student.yearLevel == 'Third Year' &&
                  obj.student.sem == 'First Term'
                ) {
                  thirdYearFirstTerm = true;
                } else if (
                  obj.student.yearLevel == 'Third Year' &&
                  obj.student.sem == 'Second Term'
                ) {
                  thirdYearSecondTerm = true;
                } else if (
                  obj.student.yearLevel == 'Fourth Year' &&
                  obj.student.sem == 'First Term'
                ) {
                  fourthYearFirstTerm = true;
                } else if (
                  obj.student.yearLevel == 'Fourth Year' &&
                  obj.student.sem == 'Second Term'
                ) {
                  fourthYearSecondYear = true;
                }
              });
              const status = [
                firstYearFirstTerm,
                firstYearSecondTerm,
                secondYearFirstTerm,
                secondYearSecondTerm,
                thirdYearFirstTerm,
                thirdYearSecondTerm,
                fourthYearFirstTerm,
                fourthYearSecondYear,
              ];
              let completed = 0;
              status.map((stat: boolean) => {
                if (stat) {
                  completed += 1;
                  return;
                }
              });
              if (completed == 1) {
                year = 'First Year';
                term = 'Second Term';
                this.levels.push(year);
                this.terms.push(term);
              } else if (completed == 2) {
                year = 'Second Year';
                term = 'First Term';
                this.levels.push(year);
                this.terms.push(term);
              } else if (completed == 3) {
                year = 'Second Year';
                term = 'Second Term';
                this.levels.push(year);
                this.terms.push(term);
              } else if (completed == 4) {
                year = 'Third Year';
                term = 'First Term';
                this.levels.push(year);
                this.terms.push(term);
              } else if (completed == 5) {
                year = 'Third Year';
                term = 'Second Term';
                this.levels.push(year);
                this.terms.push(term);
              } else if (completed == 6) {
                year = 'Fourth Year';
                term = 'First Term';
                this.levels.push(year);
                this.terms.push(term);
              } else if (completed == 7) {
                year = 'Fourth Year';
                term = 'Second Term';
                this.levels.push(year);
                this.terms.push(term);
              }
              this.studNo = res[0].student.studentNo;
              this.studentId = res[0].student.studentId;
              this.parentService
                .getParentById(res[0].student.parentId)
                .subscribe((data: any) => {
                  this.parentId = data.parentId;
                  this.existForm.patchValue({
                    yearLevel: this.levels[0],
                    sem: this.terms[0],
                    academicYear: this.schoolYear[0],
                    telephone: res[0].student.telephone,
                    mobile: res[0].student.mobile,
                    email: res[0].student.email,
                    parentFirstname: data.firstname,
                    parentMiddlename: data.middlename,
                    parentLastname: data.lastname,
                    parentSuffix: data.suffix,
                    parentAddress: data.address,
                    parentEmail: data.email,
                    parentContact: data.contact,
                    parentRelationship: data.relationship,
                  });
                  this.programService
                    .getProgramById(res[0].student.programId)
                    .subscribe((data: any) => {
                      this.program = data.programTitle;
                      this.stepTwo = true;
                      this.stepThree = false;
                      this.stepFour = false;
                      this.stepOne = false;
                      this.stepperNumber = 2;
                      this.stepOneDone = true;
                      scroll(0, 0);
                    });
                });
            }
          });
      } else {
        this.terms.push('First Term');
        this.levels.push('First Year');
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
    this.applyForm.patchValue({
      yearLevel: this.levels[0],
      sem: this.terms[0],
      academicYear: this.yearLevels[0],
    });
    if (this.applyForm.valid || this.existForm.valid) {
      this.studentInfo = this.existForm.value;
      this.studentInfo = this.applyForm.value;
      this.studentInfo.birthdate = this.convertDateString(
        this.studentInfo.birthdate
      );
      this.studentInfo.dateOfGraduation = this.convertDateString(
        this.studentInfo.dateOfGraduation
      );

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
    if (this.existing) {
      const payload = {
        yearLevel: this.studentInfo.yearLevel,
        sem: this.studentInfo.sem,
        academicYear: this.studentInfo.academicYear,
        schedId: [],
      };
      this.studentService
        .updateStudent(this.studentId, payload)
        .subscribe(() => {
          const payload1 = {
            firstname: this.studentInfo.parentFirstname,
            middlename: this.studentInfo.middlename,
            lastname: this.studentInfo.lastname,
            suffix: this.studentInfo.suffix,
            address: this.studentInfo.parentAddress,
            email: this.studentInfo.parentEmail,
            contact: this.studentInfo.parentContact,
            relationship: this.studentInfo.parentRelationship,
          };
          this.parentService.updateParent(this.parentId, payload1).subscribe();
        });
    } else {
      this.appService.addApplication(this.applyForm.value).subscribe();
    }
    this.stepFour = true;
    this.stepOne = false;
    this.stepTwo = false;
    this.stepThree = false;
    this.stepperNumber = 4;
    this.stepThreeDone = true;
    scroll(0, 0);
    this.existForm.reset();
    this.applyForm.reset();
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
