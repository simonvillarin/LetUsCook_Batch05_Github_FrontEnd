import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { CourseService } from 'src/app/shared/services/course/course.service';
import { ProfessorService } from 'src/app/shared/services/professor/professor.service';
import { RoomService } from 'src/app/shared/services/room/room.service';
import { ScheduleService } from 'src/app/shared/services/schedule/schedule.service';
import { SectionService } from 'src/app/shared/services/section/section.service';
import {
  zipcodeValidator,
  mobileNumberValidator,
  telephoneNumberValidator,
  birthdateValidator,
  ageValidator,
} from 'src/app/shared/validators/custom.validator';

@Component({
  selector: 'app-professor',
  templateUrl: './professor.component.html',
  styleUrls: ['./professor.component.scss'],
})
export class ProfessorComponent implements OnInit {
  visible: boolean = false;
  confirmationDialog: boolean = false;
  isShowImage: boolean = false;
  professors: any[] = [];
  professor: any = {};
  prof: any = {};

  genders = ['Male', 'Female'];
  civil = ['Single', 'Married', 'Divorced', 'Widowed'];
  employementStatus = ['Full Time', 'Part Time'];

  file: any;
  imagePreview: string | ArrayBuffer | null = null;
  professorForm: FormGroup;

  alert: boolean = false;
  alertStatus: string = 'Success';
  alertMessage: string = 'Professor successfully added';

  isUpdating: boolean = false;
  deleteProfessor: boolean = false;
  isUpdatingSchedule: boolean = false;
  stat: boolean = false;

  title: string = 'Add Professor';
  body: string = '';
  search: string = '';
  typeSelected: string = '';

  birthday: Date = new Date();

  constructor(
    private fb: FormBuilder,
    private professorService: ProfessorService,
    private router: Router
  ) {
    this.professorForm = fb.group({
      firstname: ['', [Validators.required]],
      middlename: [''],
      lastname: ['', [Validators.required]],
      suffix: [''],
      fullname: [''],
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
      work: ['', [Validators.required]],
      status: ['', [Validators.required]],
      image: [''],
    });
  }

  ngOnInit(): void {
    this.getAllProfessors();
  }

  getAllProfessors = () => {
    this.professorService.getAllProfessors().subscribe((data: any) => {
      this.professors = data.sort(
        (a: any, b: any) => a.professorId - b.professorId
      );
    });
  };

  get firstname() {
    return this.professorForm.get('firstname') as FormControl;
  }
  get middlename() {
    return this.professorForm.get('middlename') as FormControl;
  }

  get lastname() {
    return this.professorForm.get('lastname') as FormControl;
  }

  get suffix() {
    return this.professorForm.get('suffix') as FormControl;
  }

  get gender() {
    return this.professorForm.get('gender') as FormControl;
  }

  get civilStatus() {
    return this.professorForm.get('civilStatus') as FormControl;
  }

  get citizenship() {
    return this.professorForm.get('citizenship') as FormControl;
  }

  get birthdate() {
    return this.professorForm.get('birthdate') as FormControl;
  }

  get birthplace() {
    return this.professorForm.get('birthplace') as FormControl;
  }

  get religion() {
    return this.professorForm.get('religion') as FormControl;
  }

  get unit() {
    return this.professorForm.get('unit') as FormControl;
  }

  get street() {
    return this.professorForm.get('street') as FormControl;
  }

  get subdivision() {
    return this.professorForm.get('subdivision') as FormControl;
  }

  get barangay() {
    return this.professorForm.get('barangay') as FormControl;
  }

  get city() {
    return this.professorForm.get('city') as FormControl;
  }

  get province() {
    return this.professorForm.get('province') as FormControl;
  }

  get zipcode() {
    return this.professorForm.get('zipcode') as FormControl;
  }

  get telephone() {
    return this.professorForm.get('telephone') as FormControl;
  }

  get mobile() {
    return this.professorForm.get('mobile') as FormControl;
  }

  get email() {
    return this.professorForm.get('email') as FormControl;
  }

  get work() {
    return this.professorForm.get('work') as FormControl;
  }

  get status() {
    return this.professorForm.get('status') as FormControl;
  }

  get image() {
    return this.professorForm.get('image') as FormControl;
  }

  onChangeSearch = (searchTerm: string) => {
    if (searchTerm != '') {
      this.professors = this.professors.filter(
        (prof: any) =>
          prof.firstname.toLowerCase().includes(searchTerm.toLowerCase()) ||
          prof.middlename.toLowerCase().includes(searchTerm.toLowerCase()) ||
          prof.lastname.toLowerCase().includes(searchTerm.toLowerCase())
      );
    } else {
      this.getAllProfessors();
    }
  };

  onChangeType = (type: string) => {
    this.professorService.getAllProfessors().subscribe((data: any) => {
      this.professors = data.sort(
        (a: any, b: any) => a.professorId - b.professorId
      );
      this.professors = this.professors.filter(
        (prof: any) => prof.status == type
      );
    });
  };

  reset = () => {
    this.search = '';
    this.typeSelected = '';
    this.getAllProfessors();
  };

  onAdd() {
    this.title = 'Add Professor';
    this.visible = true;
    this.imagePreview = null;
    this.isShowImage = false;
    this.file = null;
    this.isUpdating = false;
    this.professorForm.reset();
    this.professorForm.markAsUntouched();
  }

  closeDialog = () => {
    this.visible = false;
    this.imagePreview = null;
    this.isShowImage = false;
    this.file = null;
  };

  removeImagePreview = () => {
    this.imagePreview = null;
    this.isShowImage = false;
    this.file = null;
  };

  onFileSelected(event: any) {
    this.file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e: any) => {
      this.imagePreview = e.target.result;
    };

    reader.readAsDataURL(this.file);
    this.isShowImage = true;
  }

  searchChange = (search: string) => {
    if (this.search != '') {
      const filteredProfessors = this.professors.filter(
        (prof) =>
          prof.firstname.toLowerCase().includes(search.toLowerCase()) ||
          prof.middlename.toLowerCase().includes(search.toLowerCase()) ||
          prof.lastname.toLowerCase().includes(search.toLowerCase())
      );
      this.professors = filteredProfessors;
    } else {
      this.getAllProfessors();
    }
  };

  onClickEdit = (prof: any) => {
    this.title = 'Edit Professor';
    this.visible = true;
    this.imagePreview = null;
    this.isShowImage = false;
    this.file = null;
    this.isUpdating = true;
    this.birthday = new Date(prof.birthdate);
    this.professorForm.patchValue({
      firstname: prof.firstname,
      middlename: prof.middlename,
      lastname: prof.lastname,
      suffix: prof.suffix,
      fullname: 'fullname',
      gender: prof.gender,
      civilStatus: prof.civilStatus,
      birthplace: prof.birthplace,
      citizenship: prof.citizenship,
      religion: prof.religion,
      unit: prof.unit,
      street: prof.street,
      subdivision: prof.subdivision,
      barangay: prof.barangay,
      city: prof.city,
      province: prof.province,
      zipcode: prof.zipcode,
      telephone: prof.telephone,
      mobile: prof.mobile,
      email: prof.email,
      work: prof.work,
      status: prof.status,
      image: prof.image,
    });
    this.imagePreview = prof.image;
    if (this.imagePreview) {
      this.isShowImage = true;
    }
    this.professor = prof;
  };

  onClickRemove = (prof: any) => {
    this.professor = prof;
    this.deleteProfessor = true;
    this.stat = !this.professor.activeDeactive;
    this.title = !this.stat ? 'Deactivate Professor' : 'Activate Professor';
    this.body = this.stat
      ? 'Are you sure you want to deactivate this professor?'
      : 'Are you sure you want to activate this professor?';
    this.confirmationDialog = true;
  };

  onCloseDeleteDialog = () => {
    this.confirmationDialog = false;
  };

  onDeleteProfessor = () => {
    const payload = {
      activeDeactive: !this.professor.activeDeactive,
    };
    this.professorService
      .updateProfessor(this.professor.professorId, payload)
      .subscribe(() => {
        this.getAllProfessors();
        this.stat = !this.professor.activeDeactive;
        this.confirmationDialog = false;
      });
  };

  onSubmit = () => {
    this.professorForm.patchValue({
      fullname: 'fullname',
      image: this.imagePreview,
    });
    if (this.isUpdating) {
      const firstname = this.professorForm.get('firstname')?.value;
      const middlename = this.professorForm.get('middlename')?.value;
      const lastname = this.professorForm.get('lastname')?.value;
      const suffix = this.professorForm.get('suffix')?.value;
      const gender = this.professorForm.get('gender')?.value;
      const civilStatus = this.professorForm.get('civilStatus')?.value;
      let birthdate = this.professorForm.get('birthdate')?.value;
      const birthplace = this.professorForm.get('birthplace')?.value;
      const citizenship = this.professorForm.get('citizenship')?.value;
      const religion = this.professorForm.get('religion')?.value;
      const unit = this.professorForm.get('unit')?.value;
      const street = this.professorForm.get('street')?.value;
      const subdivision = this.professorForm.get('subdivision')?.value;
      const barangay = this.professorForm.get('barangay')?.value;
      const city = this.professorForm.get('city')?.value;
      const province = this.professorForm.get('province')?.value;
      const zipcode = this.professorForm.get('zipcode')?.value;
      const telephone = this.professorForm.get('telepphone')?.value;
      const mobile = this.professorForm.get('mobile')?.value;
      const email = this.professorForm.get('email')?.value;
      const work = this.professorForm.get('work')?.value;
      const status = this.professorForm.get('status')?.value;

      let payload: any = {};
      if (this.professor.firstname != firstname) {
        payload.firstname = firstname;
      }
      if (this.professor.middlename != middlename) {
        payload.middlename = middlename;
      }
      if (this.professor.lastname != lastname) {
        payload.lastname = lastname;
      }
      if (this.professor.suffix != suffix) {
        payload.suffix = suffix;
      }
      if (this.professor.gender != gender) {
        payload.gender = gender;
      }
      if (this.professor.civilStatus != civilStatus) {
        payload.civilStatus = civilStatus;
      }
      if (this.professor.birthdate != birthdate) {
        birthdate.setDate(birthdate.getDate() + 1);
        payload.birthdate = birthdate;
      }
      if (this.professor.birthplace != birthplace) {
        payload.birthplace = birthplace;
      }
      if (this.professor.citizenship != citizenship) {
        payload.citizenship = citizenship;
      }
      if (this.professor.religion != religion) {
        payload.religion = religion;
      }
      if (this.professor.unit != unit) {
        payload.unit = unit;
      }
      if (this.professor.street != street) {
        payload.street = street;
      }
      if (this.professor.subdivision != subdivision) {
        payload.subdivision = subdivision;
      }
      if (this.professor.barangay != barangay) {
        payload.barangay = barangay;
      }
      if (this.professor.city != city) {
        payload.city = city;
      }
      if (this.professor.province != province) {
        payload.province = province;
      }
      if (this.professor.zipcode != zipcode) {
        payload.zipcode = zipcode;
      }
      if (this.professor.telephone != telephone) {
        payload.telephone = telephone;
      }
      if (this.professor.mobile != mobile) {
        payload.mobile = mobile;
      }
      if (this.professor.email != email) {
        payload.email = email;
      }
      if (this.professor.work != work) {
        payload.work = work;
      }
      if (this.professor.status != status) {
        payload.status = status;
      }

      if (this.file != null) {
        const formData = new FormData();
        formData.append(
          'professor',
          new Blob([JSON.stringify(payload)], {
            type: 'application/json',
          })
        );
        formData.append('image', this.file);
        this.professorService
          .updateProfessorWithImage(this.professor.professorId, formData)
          .subscribe((res: any) => {
            if (res.message == 'Mobile number already exist') {
              this.alert = true;
              this.alertStatus = 'Error';
              this.alertMessage = 'Mobile number already exists';
              setTimeout(() => (this.alert = false), 3000);
            } else if (res.message == 'Email already exist') {
              this.alert = true;
              this.alertStatus = 'Error';
              this.alertMessage = 'Email address already exists';
              setTimeout(() => (this.alert = false), 3000);
            } else {
              this.getAllProfessors();
              this.professorForm.reset();
              this.visible = false;
            }
          });
      } else {
        this.professorService
          .updateProfessor(this.professor.professorId, payload)
          .subscribe((res: any) => {
            console.log(res);
            if (res.message == 'Mobile number already exist') {
              this.alert = true;
              this.alertStatus = 'Error';
              this.alertMessage = 'Mobile number already exists';
              setTimeout(() => (this.alert = false), 3000);
            } else if (res.message == 'Email already exist') {
              this.alert = true;
              this.alertStatus = 'Error';
              this.alertMessage = 'Email address already exists';
              setTimeout(() => (this.alert = false), 3000);
            } else {
              this.getAllProfessors();
              this.professorForm.reset();
              this.visible = false;
            }
          });
      }
    } else {
      if (this.professorForm.valid) {
        let tempBday = this.professorForm.get('birthdate')?.value;
        tempBday.setDate(tempBday.getDate() + 1);
        this.professorForm.patchValue({
          birthdate: tempBday,
        });
        if (this.file != null) {
          const formData = new FormData();
          formData.append(
            'professor',
            new Blob([JSON.stringify(this.professorForm.value)], {
              type: 'application/json',
            })
          );
          formData.append('image', this.file);
          this.professorService
            .addProfessorWithImage(formData)
            .subscribe((res: any) => {
              if (res.message == 'Mobile number already exist') {
                this.alert = true;
                this.alertStatus = 'Error';
                this.alertMessage = 'Mobile number already exists';
                setTimeout(() => (this.alert = false), 3000);
              } else if (res.message == 'Email already exist') {
                this.alert = true;
                this.alertStatus = 'Error';
                this.alertMessage = 'Email address already exists';
                setTimeout(() => (this.alert = false), 3000);
              } else {
                this.professorForm.patchValue({
                  image: this.imagePreview,
                });
                this.getAllProfessors();
                this.alert = true;
                this.alertStatus = 'Success';
                this.alertMessage = 'Professor successfully added';
                setTimeout(() => (this.alert = false), 3000);
                this.professorForm.reset();
              }
            });
        } else {
          this.professorService
            .addProfessor(this.professorForm.value)
            .subscribe((res: any) => {
              if (res.message == 'Mobile number already exist') {
                this.alert = true;
                this.alertStatus = 'Error';
                this.alertMessage = 'Mobile number already exists';
                setTimeout(() => (this.alert = false), 3000);
              } else if (res.message == 'Email already exist') {
                this.alert = true;
                this.alertStatus = 'Error';
                this.alertMessage = 'Email address already exists';
                setTimeout(() => (this.alert = false), 3000);
              } else {
                this.getAllProfessors();
                this.alert = true;
                this.alertStatus = 'Success';
                this.alertMessage = 'Professor successfully added';
                setTimeout(() => (this.alert = false), 3000);
                this.professorForm.reset();
              }
            });
        }
      } else {
        this.professorForm.markAllAsTouched();
      }
    }
  };

  onScheduleTable = (prof: any) => {
    this.prof = prof;
    this.router.navigate([`admin/professor/schedule/${this.prof.professorId}`]);
  };

  convertDateString = (originalDate: string): string => {
    const newDate = new Date(originalDate);
    const year = newDate.getFullYear();
    const month = this.formatWithLeadingZero(newDate.getMonth() + 1);
    const day = this.formatWithLeadingZero(newDate.getDate());
    return `${year}-${month}-${day}`;
  };

  formatWithLeadingZero(value: number): string {
    return value < 10 ? '0' + value : value.toString();
  }
}
