import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
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
} from 'src/app/shared/validators/custom.validator';

@Component({
  selector: 'app-professor',
  templateUrl: './professor.component.html',
  styleUrls: ['./professor.component.scss'],
})
export class ProfessorComponent implements OnInit {
  visible: boolean = false;
  schedulesDialog: boolean = false;
  addScheduleDialog: boolean = false;
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

  search: string = '';
  title: string = 'Add Professor';
  body: string = '';
  isUpdating: boolean = false;
  deleteProfessor: boolean = false;
  alert: boolean = false;
  alertStatus: string = 'Success';
  alertMessage: string = 'Professor successfully added';
  stat: boolean = false;

  scheduleForm: FormGroup;
  schedules: any[] = [];
  programs: any = [];
  subjects: any = [];
  days: any = [
    { name: 'Monday', value: 'Monday' },
    { name: 'Tuesday', value: 'Tuesday' },
    { name: 'Wednesday', value: 'Wednesday' },
    { name: 'Thursday', value: 'Thursday' },
    { name: 'Friday', value: 'Friday' },
    { name: 'Saturday', value: 'Saturday' },
  ];
  sections: any = [];
  rooms: any = [];
  selectedDays: any = [];

  isUpdatingSchedule: boolean = false;
  schedule: any = {};

  constructor(
    private fb: FormBuilder,
    private professorService: ProfessorService,
    private scheduleService: ScheduleService,
    private courseService: CourseService,
    private sectionService: SectionService,
    private roomService: RoomService
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
      birthdate: ['', [Validators.required, birthdateValidator()]],
      birthplace: ['', [Validators.required]],
      religion: ['', [Validators.required]],
      unit: ['', [Validators.required]],
      street: ['', [Validators.required]],
      subdivision: ['', [Validators.required]],
      barangay: ['', [Validators.required]],
      city: ['', [Validators.required]],
      province: ['', [Validators.required]],
      zipcode: ['', [Validators.required, zipcodeValidator()]],
      telephone: ['' /*[telephoneNumberValidator()]*/],
      mobile: ['', [Validators.required, mobileNumberValidator()]],
      email: ['', [Validators.required, Validators.email]],
      work: ['', [Validators.required]],
      status: ['', [Validators.required]],
      image: [''],
    });
    this.scheduleForm = fb.group({
      subject: ['', Validators.required],
      days: [new FormControl<any[] | null>(null), [Validators.required]],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required],
      section: ['', Validators.required],
      room: ['', Validators.required],
      professorId: [''],
    });
  }

  ngOnInit(): void {
    this.getAllProfessors();
    this.getAllSubjects();
    this.getAllSections();
    this.getAllRooms();
  }

  getAllProfessors = () => {
    this.professorService.getAllProfessors().subscribe((data: any) => {
      this.professors = data.sort(
        (a: any, b: any) => a.professorId - b.professorId
      );
    });
  };

  getScheduleById = () => {
    console.log(this.prof.professorId, 'is prof id');

    this.scheduleService
      .getScheduleById(this.prof.professorId)
      .subscribe((data: any) => {
        const sortData = data.sort((a: any, b: any) => b.schedId - a.schedId);
        this.schedules = sortData;
        this.filterSubjects();
      });
  };

  getAllSubjects = () => {
    this.courseService.getAllSubjects().subscribe((data: any) => {
      const sortData = data.sort((a: any, b: any) => b.subjectId - a.subjectId);
      let subjects: any = [];
      sortData.map((sub: any) => {
        subjects.push(sub.subjectTitle);
      });
      this.subjects = subjects;
    });
  };

  getAllSections = () => {
    this.sectionService.getAllSections().subscribe((data: any) => {
      const sortData = data.sort((a: any, b: any) => b.sectionId - a.sectionId);
      let sections: any = [];
      sortData.map((sec: any) => {
        sections.push(sec.section);
      });
      this.sections = sections;
    });
  };

  getAllRooms = () => {
    this.roomService.getAllRooms().subscribe((data: any) => {
      const sortData = data.sort((a: any, b: any) => b.roomId - a.roomId);
      let rooms: any = [];
      sortData.map((room: any) => {
        rooms.push(room.roomNumber);
      });
      this.rooms = rooms;
    });
  };

  filterSubjects = () => {
    const exclusion = this.schedules.map(
      (sub: any) => sub.subject.subjectTitle
    );
    console.log(exclusion, 'exclusion');
    this.subjects = this.subjects.filter(
      (sub: any) => !exclusion.includes(sub)
    );
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

  get program() {
    return this.scheduleForm.get('program') as FormControl;
  }

  get subject() {
    return this.scheduleForm.get('subject') as FormControl;
  }

  get day() {
    return this.scheduleForm.get('days') as FormControl;
  }

  get startTime() {
    return this.scheduleForm.get('startTime') as FormControl;
  }

  get endTime() {
    return this.scheduleForm.get('endTime') as FormControl;
  }

  get section() {
    return this.scheduleForm.get('section') as FormControl;
  }

  get room() {
    return this.scheduleForm.get('room') as FormControl;
  }

  onClickAdd() {
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

    this.professorForm.patchValue({
      firstname: prof.firstname,
      middlename: prof.middlename,
      lastname: prof.lastname,
      suffix: prof.suffix,
      fullname: 'fullname',
      gender: prof.gender,
      civilStatus: prof.civilStatus,
      birthdate: prof.birthdate,
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

  onDeleteProfessor = () => {
    const payload = {
      activeDeactive: !this.professor.activeDeactive,
    };
    this.professorService
      .updateProfessor(this.professor.professorId, payload)
      .subscribe();
    const index = this.professors.findIndex(
      (prof) => prof.professorId === this.professor.professorId
    );
    this.professors[index].activeDeactive = !this.professor.activeDeactive;
    this.stat = !this.professor.activeDeactive;
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
      const birthdate = this.professorForm.get('birthdate')?.value;
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
    console.log(this.prof, 'in sched table');

    this.getScheduleById();
    this.schedulesDialog = true;
  };

  onAddSchedule = () => {
    console.log(this.prof);
    this.filterSubjects();
    this.title = 'Add Schedule';
    this.isUpdatingSchedule = false;
    this.scheduleForm.reset();
    this.addScheduleDialog = true;
  };

  onEditSchedule = (sched: any) => {
    this.courseService.getAllSubjects().subscribe((data: any) => {
      const sortData = data.sort((a: any, b: any) => b.subjectId - a.subjectId);
      let subjects: any = [];
      sortData.map((sub: any) => {
        subjects.push(sub.subjectTitle);
      });
      this.subjects = subjects;
      this.subjects = this.subjects.filter(
        (sub: any) => sub == sched.subject.subjectTitle
      );
      this.title = 'Edit Schedule';
      this.isUpdatingSchedule = true;
      this.schedule = sched;
      console.log(this.schedule.subject.subjectTitle, 'edit sched');
      this.addScheduleDialog = true;
      this.scheduleForm.patchValue({
        subject: this.schedule.subject.subjectTitle,
        days: this.schedule.days,
        startTime: this.schedule.startTime,
        endTime: this.schedule.endTime,
        section: this.schedule.section.section,
        room: this.schedule.room.roomNumber,
      });
    });
  };

  onCloseDialog = () => {
    this.addScheduleDialog = false;
  };

  onRemoveSchedule = (sched: any) => {
    this.schedule = sched;
    this.deleteProfessor = false;
    this.title = 'Remove Schedule';
    this.body =
      'Are you sure you want to remove this schedule from this professor?';
    this.confirmationDialog = true;
  };

  onDelete = () => {
    if (this.deleteProfessor) {
      this.onDeleteProfessor();
    } else {
      this.scheduleService
        .deleteSchedule(this.schedule.schedId)
        .subscribe(() => {
          this.getScheduleById();
          this.confirmationDialog = false;
        });
    }
  };

  onSubmitSchedule = () => {
    if (this.isUpdatingSchedule) {
      if (this.scheduleForm.valid) {
        const subject = this.scheduleForm.get('subject')?.value;
        const days = this.scheduleForm.get('day')?.value;
        const startTime = this.scheduleForm.get('startTime')?.value;
        const endTime = this.scheduleForm.get('endTime')?.value;
        const section = this.scheduleForm.get('section')?.value;
        const room = this.scheduleForm.get('room')?.value;

        const payload: any = {
          schedId: this.schedule.schedId,
          subject: subject,
          days: days,
          startTime: startTime,
          endTime: endTime,
          section: section,
          room: room,
          professorId: this.prof.professorId,
        };
        console.log(payload, ' is the payload');

        this.scheduleService.updateSchedule(payload).subscribe((res: any) => {
          if (res.message == 'Schedule already exist') {
            this.alert = true;
            setTimeout(() => {
              this.alert = false;
            }, 3000);
            this.alertStatus = 'Error';
            this.alertMessage = 'Schedule already exists';
          } else {
            this.getScheduleById();
            this.addScheduleDialog = false;
          }
        });
      } else {
        this.scheduleForm.markAllAsTouched();
      }
    } else {
      if (this.scheduleForm.valid) {
        this.scheduleForm.patchValue({
          professorId: this.prof.professorId,
        });
        this.scheduleService
          .addSchedule(this.scheduleForm.value)
          .subscribe((res: any) => {
            if (res.message == 'Schedule already exist') {
              this.alert = true;
              setTimeout(() => {
                this.alert = false;
              }, 3000);
              this.alertStatus = 'Error';
              this.alertMessage = 'Schedule already taken';
              // } else if (
              //   (res.message =
              //     'Please create start and end date of classes first')
              // ) {
              //   this.alert = true;
              //   setTimeout(() => {
              //     this.alert = false;
              //   }, 3000);
              //   this.alertStatus = 'Error';
              //   this.alertMessage =
              //     'Please create start and end date of classes first';
            } else {
              this.getScheduleById();
              this.alert = true;
              setTimeout(() => {
                this.alert = false;
              }, 3000);
              this.alertStatus = 'Success';
              this.alertMessage = 'Section successfully added';
              this.scheduleForm.reset();
              this.addScheduleDialog = false;
            }
          });
      } else {
        this.scheduleForm.markAllAsTouched();
      }
    }
  };
}
