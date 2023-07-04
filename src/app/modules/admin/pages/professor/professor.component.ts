import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Professor } from 'src/app/shared/models/professor';
import { ProfessorService } from 'src/app/shared/services/professor/professor.service';

@Component({
  selector: 'app-professor',
  templateUrl: './professor.component.html',
  styleUrls: ['./professor.component.scss'],
})
export class ProfessorComponent implements OnInit {
  visible: boolean = false;
  isShowImage: boolean = false;
  genders = ['Male', 'Female'];
  civil = ['Single', 'Married', 'Divorced', 'Widowed'];
  employementStatus = ['Full Time', 'Part Time'];
  professors: any[] = [];

  file: any;
  imagePreview: string | ArrayBuffer | null = null;
  professorForm: FormGroup;

  search: string = '';

  isShowDropdown = false;
  isShowMobileNav = false;
  isShowNotifications = false;

  constructor(
    private fb: FormBuilder,
    private professorService: ProfessorService
  ) {
    this.professorForm = fb.group({
      firstname: ['', [Validators.required]],
      middlename: [''],
      lastname: ['', [Validators.required]],
      suffix: [''],
      gender: ['', [Validators.required]],
      civilStatus: ['', [Validators.required]],
      citizenship: ['', [Validators.required]],
      birthdate: ['', [Validators.required]],
      birthplace: ['', [Validators.required]],
      religion: ['', [Validators.required]],
      unit: ['', [Validators.required]],
      street: ['', [Validators.required]],
      subdivision: ['', [Validators.required]],
      barangay: ['', [Validators.required]],
      city: ['', [Validators.required]],
      province: ['', [Validators.required]],
      zipcode: ['', [Validators.required]],
      telephone: [''],
      mobile: ['', [Validators.required]],
      email: ['', [Validators.required]],
      work: ['', [Validators.required]],
      status: ['', [Validators.required]],
      image: [''],
    });
  }

  ngOnInit(): void {
    this.getAllProfessors();
  }

  getAllProfessors = () => {
    this.professorService.getAllProfessors().subscribe((data) => {
      this.professors = data;
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

  toggleShowDropdown = () => {
    this.isShowDropdown = !this.isShowDropdown;
    this.isShowMobileNav = false;
    this.isShowNotifications = false;
  };

  toggleShowNotifications = () => {
    this.isShowNotifications = !this.isShowNotifications;
    this.isShowMobileNav = false;
    this.isShowDropdown = false;
  };

  openMobileNav = () => {
    this.isShowMobileNav = true;
  };

  closeMobileNav = () => {
    this.isShowMobileNav = false;
  };

  showDialog() {
    this.visible = true;
    this.professorForm.markAsUntouched();
    this.imagePreview = null;
    this.isShowImage = false;
    this.file = null;
  }

  closeDialog = () => {
    this.visible = false;
    this.professorForm.reset();
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

  onSubmit = () => {
    if (this.professorForm.valid) {
      if (this.file != null) {
        const formData = new FormData();
        formData.append(
          'professor',
          new Blob([JSON.stringify(this.professorForm.value)], {
            type: 'application/json',
          })
        );
        formData.append('file', this.file);
        this.professorService
          .addProfessorWithImage(formData)
          .subscribe(() => console.log('Professor added successfully'));
      } else {
        this.professorService
          .addProfessor(this.professorForm.value)
          .subscribe(() => console.log('Professor added successfully'));
      }
      this.professors = [...this.professors, this.professorForm.value];
      this.professorForm.reset();
      this.closeDialog();
    } else {
      this.professorForm.markAllAsTouched();
    }
  };
}
