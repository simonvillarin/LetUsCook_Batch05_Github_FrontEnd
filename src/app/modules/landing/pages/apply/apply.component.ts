import { ApplicationService } from './../../../../shared/services/application/application.service';
import { Component, ElementRef, Renderer2, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CalendarService } from 'src/app/shared/services/calendar/calendar.service';
import { EmailService } from 'src/app/shared/services/email/email.service';
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
  prog: any = {};
  studentNo: string = '';
  studNo: string = '';
  applyForm: FormGroup;
  existForm: FormGroup;
  buttonClicked: boolean = false;
  studentInfo: any = {};
  programs: any[] = [];
  studentId: any;
  parentId: any;
  oldStudent: any = {};

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

  errorDialog = false;
  errorMessage = '';

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private fb: FormBuilder,
    private parentService: ParentService,
    private studentService: StudentService,
    private studentHistoryService: StudentHistoryService,
    private appService: ApplicationService,
    private programService: ProgramService,
    private emailService: EmailService
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
      this.yearLevels = ['Grade 12'];
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
        this.oldStudent = true;
        this.studentService
          .getStudentByStudentNo(this.studentNo)
          .subscribe((data: any) => {
            this.levels = [];
            this.terms = [];
            if (data.yearLevel == 'First Year' && data.sem == 'First Term') {
              this.levels.push('First Year');
              this.terms.push('Second Term');
            } else if (
              data.yearLevel == 'First Year' &&
              data.sem == 'Second Term'
            ) {
              this.levels.push('Second Year');
              this.terms.push('First Term');
            } else if (
              data.yearLevel == 'Second Year' &&
              data.sem == 'First Term'
            ) {
              this.levels.push('Second Year');
              this.terms.push('Second Term');
            } else if (
              data.yearLevel == 'Second Year' &&
              data.sem == 'Second Term'
            ) {
              this.levels.push('Third Year');
              this.terms.push('First Term');
            } else if (
              data.yearLevel == 'Third Year' &&
              data.sem == 'First Term'
            ) {
              this.levels.push('Third Year');
              this.terms.push('Second Term');
            } else if (
              data.yearLevel == 'Third Year' &&
              data.sem == 'Second Term'
            ) {
              this.levels.push('Fourth Year');
              this.terms.push('First Term');
            } else if (
              data.yearLevel == 'Fourth Year' &&
              data.sem == 'First Term'
            ) {
              this.levels.push('Fourth Year');
              this.terms.push('Second Term');
            } else {
              this.levels.push('Fourth Year');
              this.terms.push('Second Term');
            }
            this.studNo = data.studentNo;
            this.studentId = data.studentId;
            this.oldStudent = data;
            this.parentService
              .getParentById(data.parent.parentId)
              .subscribe((parent: any) => {
                this.parentId = parent.parentId;
                this.existForm.patchValue({
                  yearLevel: this.levels,
                  sem: this.terms,
                  academicYear: this.schoolYear,
                  telephone: data.telephone,
                  mobile: data.mobile,
                  email: data.email,
                  parentFirstname: parent.firstname,
                  parentMiddlename: parent.middlename,
                  parentLastname: parent.lastname,
                  parentSuffix: parent.suffix,
                  parentAddress: parent.address,
                  parentEmail: parent.email,
                  parentContact: parent.contact,
                  parentRelationship: parent.relationship,
                });
                this.programService
                  .getProgramById(data.program.programId)
                  .subscribe((prog: any) => {
                    this.program = prog.programTitle;
                    this.prog = prog;
                    this.stepTwo = true;
                    this.stepThree = false;
                    this.stepFour = false;
                    this.stepOne = false;
                    this.stepperNumber = 2;
                    this.stepOneDone = true;
                    scroll(0, 0);
                  });
              });
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
    if (this.existing) {
      if (this.existForm.valid) {
        this.studentInfo = this.oldStudent;
        this.studentInfo.studentId = this.studentId;
        this.studentInfo.yearLevel = this.levels[0];
        this.studentInfo.sem = this.terms[0];
        this.studentInfo.academicYear = this.schoolYear[0];
        this.studentInfo.parentFirstname =
          this.existForm.get('parentFirstname')?.value;
        this.studentInfo.parentMiddlename =
          this.existForm.get('parentMiddlename')?.value;
        this.studentInfo.parentLastname =
          this.existForm.get('parentLastname')?.value;
        this.studentInfo.parentSuffix =
          this.existForm.get('parentSuffix')?.value;
        this.studentInfo.parentContact =
          this.existForm.get('parentContact')?.value;
        this.studentInfo.parentEmail = this.existForm.get('parentEmail')?.value;
        this.studentInfo.parentAddress =
          this.existForm.get('parentAddress')?.value;
        this.studentInfo.parentRelationship =
          this.existForm.get('parentRelationship')?.value;
        this.studentInfo.birthdate = this.convertBdayString(
          this.studentInfo.birthdate
        );
        this.studentInfo.dateOfGraduation = this.convertBdayString(
          this.studentInfo.dateOfGraduation
        );
        this.studentInfo.programCode = this.prog.programCode;

        this.stepThree = true;
        this.stepFour = false;
        this.stepOne = false;
        this.stepTwo = false;
        this.stepperNumber = 3;
        this.stepTwoDone = true;
        scroll(0, 0);
      } else {
        this.buttonClicked = true;
        this.existForm.markAllAsTouched();
      }
    } else {
      this.applyForm.patchValue({
        yearLevel: this.levels[0],
        sem: this.terms[0],
        academicYear: this.schoolYear[0],
      });
      if (this.applyForm.valid) {
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
    }
  };

  onSubmitStepThree = () => {
    this.applyForm.patchValue({
      programCode: this.program,
    });
    if (this.existing) {
      this.studentInfo.email = '';
      this.appService.addApplication(this.studentInfo).subscribe((res: any) => {
        if (res.message == 'Email already exists') {
          this.errorMessage = 'Email already exists';
          this.errorDialog = true;
        } else {
          this.stepFour = true;
          this.stepOne = false;
          this.stepTwo = false;
          this.stepThree = false;
          this.stepperNumber = 4;
          this.stepThreeDone = true;
          scroll(0, 0);

          const firstName = this.studentInfo.firstname;
          const payload = {
            email: this.oldStudent.email,
            subject:
              'Acknowledgement of Your Online Application to Educate University',
            body:
              'Dear ' +
              firstName +
              ', \n\n' +
              'I hope this email finds you well. I am writing to acknowledge the receipt of your online application to Educate University. We sincerely appreciate your interest in becoming part of our academic community. We have successfully received your application, and our admissions team is already reviewing it carefully.' +
              '\n' +
              'We understand that applying for schools can be an exciting yet nerve-wracking experience, and we want to assure you that we treat every application with the utmost attention and consideration.' +
              '\n' +
              'Here are the next steps in our admissions process:' +
              '\n\n' +
              'Application Review: Our admissions committee will thoroughly review your application, including your academic records.' +
              '\n' +
              'Evaluation Period: The evaluation process may take several weeks, as we want to ensure that each applicant receives fair and thorough consideration.' +
              '\n' +
              'Decision Notification: We will notify you of the admissions decision by email once the evaluation process is complete. We aim to communicate our decision as promptly as possible.' +
              '\n\n' +
              'In the meantime, we would like to ask for your patience while we process your application.' +
              '\n\n' +
              'Again, thank you for considering Educate University for your education journey. We are excited to learn more about you and your aspirations.' +
              '\n' +
              'Wishing you all the best in your academic pursuits!' +
              '\n\n' +
              'Sincerely,' +
              '\n' +
              'Simon Villarin' +
              '\n' +
              'School Registrar' +
              '\n' +
              'Educate University' +
              '\n',
          };
          this.emailService.sendEmail(payload).subscribe();
          this.existForm.reset();
        }
      });
    } else {
      this.appService
        .addApplication(this.applyForm.value)
        .subscribe((res: any) => {
          if (res.message == 'Email already exists') {
            this.errorMessage = 'Email already exists';
            this.errorDialog = true;
          } else {
            this.stepFour = true;
            this.stepOne = false;
            this.stepTwo = false;
            this.stepThree = false;
            this.stepperNumber = 4;
            this.stepThreeDone = true;
            scroll(0, 0);

            const firstName = this.applyForm.get('firstname')?.value;
            const payload = {
              email: this.applyForm.get('email')?.value,
              subject:
                'Acknowledgement of Your Online Application to Educate University',
              body:
                'Dear ' +
                firstName +
                ', \n\n' +
                'I hope this email finds you well. I am writing to acknowledge the receipt of your online application to Educate University. We sincerely appreciate your interest in becoming part of our academic community. We have successfully received your application, and our admissions team is already reviewing it carefully.' +
                '\n' +
                'We understand that applying for schools can be an exciting yet nerve-wracking experience, and we want to assure you that we treat every application with the utmost attention and consideration.' +
                '\n' +
                'Here are the next steps in our admissions process:' +
                '\n\n' +
                'Application Review: Our admissions committee will thoroughly review your application, including your academic records.' +
                '\n' +
                'Evaluation Period: The evaluation process may take several weeks, as we want to ensure that each applicant receives fair and thorough consideration.' +
                '\n' +
                'Decision Notification: We will notify you of the admissions decision by email once the evaluation process is complete. We aim to communicate our decision as promptly as possible.' +
                '\n\n' +
                'In the meantime, we would like to ask for your patience while we process your application.' +
                '\n\n' +
                'Again, thank you for considering Educate University for your education journey. We are excited to learn more about you and your aspirations.' +
                '\n' +
                'Wishing you all the best in your academic pursuits!' +
                '\n\n' +
                'Sincerely,' +
                '\n' +
                'Simon Villarin' +
                '\n' +
                'School Registrar' +
                '\n' +
                'Educate University' +
                '\n',
            };
            this.emailService.sendEmail(payload).subscribe();
            this.applyForm.reset();
          }
        });
    }
  };

  convertDateString = (originalDate: string): string => {
    const newDate = new Date(originalDate);
    const year = newDate.getFullYear();
    const month = this.formatWithLeadingZero(newDate.getMonth() + 1);
    const day = this.formatWithLeadingZero(newDate.getDate());
    return `${month}/${day}/${year}`;
  };

  convertBdayString = (originalDate: string): string => {
    const newDate = new Date(originalDate);
    const year = newDate.getFullYear();
    const month = this.formatWithLeadingZero(newDate.getMonth() + 1);
    const day = this.formatWithLeadingZero(newDate.getDate());
    return `${year}-${month}-${day}`;
  };

  formatWithLeadingZero(value: number): string {
    return value < 10 ? '0' + value : value.toString();
  }

  onOkError = () => {
    this.errorDialog = false;
  };
}
