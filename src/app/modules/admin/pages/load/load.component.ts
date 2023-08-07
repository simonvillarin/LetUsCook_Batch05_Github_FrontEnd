import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from 'src/app/shared/services/course/course.service';
import { ProfessorService } from 'src/app/shared/services/professor/professor.service';
import { RoomService } from 'src/app/shared/services/room/room.service';
import { ScheduleService } from 'src/app/shared/services/schedule/schedule.service';
import { SectionService } from 'src/app/shared/services/section/section.service';

@Component({
  selector: 'app-load',
  templateUrl: './load.component.html',
  styleUrls: ['./load.component.scss'],
})
export class LoadComponent implements OnInit {
  professorId: number = -1;
  scheduleForm: FormGroup;
  constructor(
    private professorService: ProfessorService,
    private scheduleService: ScheduleService,
    private courseService: CourseService,
    private sectionService: SectionService,
    private roomService: RoomService,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.scheduleForm = fb.group({
      subject: ['', Validators.required],
      days: [new FormControl<any[] | null>(null), [Validators.required]],
      startTime: ['', [Validators.required]],
      endTime: ['', [Validators.required]],
      section: ['', Validators.required],
      room: ['', Validators.required],
      professorId: [this.professorId],
    });
  }

  ngOnInit(): void {
    this.getScheduleById();
    this.getAllSubjects();
    this.getAllSections();
    this.getAllRooms();
  }

  schedules: any[] = [];
  subjects: any = [];
  sections: any = [];
  rooms: any = [];
  schedule: any = {};
  prof: any = {};
  days: any = [
    { name: 'Monday', value: 'Monday' },
    { name: 'Tuesday', value: 'Tuesday' },
    { name: 'Wednesday', value: 'Wednesday' },
    { name: 'Thursday', value: 'Thursday' },
    { name: 'Friday', value: 'Friday' },
    { name: 'Saturday', value: 'Saturday' },
  ];
  subjectSelected: string = '';
  isUpdatingSchedule: boolean = false;
  addScheduleDialog: boolean = false;
  confirmationDialog: boolean = false;
  stat: boolean = false;

  alert: boolean = false;
  alertStatus: string = '';
  alertMessage: string = '';

  title: string = '';
  body: string = '';
  search: string = '';
  daySelected: string = '';

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

  convertTime = (time: any) => {
    const splitTime = time.split(':');
    let hour;
    let zone;
    if (parseInt(splitTime[0]) == 13) {
      hour = 1;
    } else if (parseInt(splitTime[0]) == 13) {
      hour = 1;
    } else if (parseInt(splitTime[0]) == 14) {
      hour = 2;
    } else if (parseInt(splitTime[0]) == 15) {
      hour = 3;
    } else if (parseInt(splitTime[0]) == 16) {
      hour = 4;
    } else if (parseInt(splitTime[0]) == 17) {
      hour = 5;
    } else if (parseInt(splitTime[0]) == 18) {
      hour = 6;
    } else if (parseInt(splitTime[0]) == 19) {
      hour = 7;
    } else if (parseInt(splitTime[0]) == 20) {
      hour = 8;
    } else if (parseInt(splitTime[0]) == 21) {
      hour = 9;
    } else if (parseInt(splitTime[0]) == 22) {
      hour = 10;
    } else if (parseInt(splitTime[0]) == 23) {
      hour = 11;
    } else if (parseInt(splitTime[0]) == 24 || splitTime[0] == '00') {
      hour = 12;
    } else {
      hour = splitTime[0];
    }

    if (parseInt(splitTime[0]) > 12) {
      zone = 'PM';
    } else {
      zone = 'AM';
    }

    return hour + ':' + splitTime[1] + ' ' + zone;
  };

  getProfessor = () => {
    this.professorService
      .getProfessorById(this.professorId)
      .subscribe((data: any) => (this.prof = data));
  };

  getScheduleById = () => {
    this.professorId = this.route.snapshot.params['id'];
    this.scheduleService
      .getScheduleById(this.professorId)
      .subscribe((data: any) => {
        this.schedules = data.sort(
          (a: any, b: any) => b.schedId[0] - a.schedId[0]
        );
        this.getProfessor();
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

  onChangeSearch = (searchTerm: string) => {
    if (searchTerm != '') {
      this.schedules = this.schedules.filter((sched: any) =>
        sched.subject.subjectTitle
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      );
    } else {
      this.getScheduleById();
    }
  };

  onSubjectChange = () => {
    // filter room
    this.roomService.getAllRooms().subscribe((data: any) => {
      const sortData = data.sort((a: any, b: any) => b.roomId - a.roomId);
      let rooms: any = [];
      sortData.map((room: any) => {
        rooms.push(room.roomNumber);
      });
      this.rooms = rooms;
      const tempRoom: any = [];
      this.schedules.map((data: any) => {
        if (data.subject.subjectTitle === this.subjectSelected) {
          tempRoom.push(data.room.roomNumber);
        }
      });
      this.rooms = this.rooms.filter((room: any) => !tempRoom.includes(room));
    });
    // filter section
    this.sectionService.getAllSections().subscribe((data: any) => {
      const sortData = data.sort((a: any, b: any) => b.sectionId - a.sectionId);
      let sections: any = [];
      sortData.map((sec: any) => {
        sections.push(sec.section);
      });
      this.sections = sections;
      const tempSection: any = [];
      this.schedules.map((data: any) => {
        if (data.subject.subjectTitle === this.subjectSelected) {
          tempSection.push(data.section.section);
        }
      });
      this.sections = this.sections.filter(
        (sec: any) => !tempSection.includes(sec)
      );
    });
  };

  onChangeDay = (daySelected: any) => {
    this.professorId = this.route.snapshot.params['id'];
    this.scheduleService
      .getScheduleById(this.professorId)
      .subscribe((data: any) => {
        this.schedules = data.sort(
          (a: any, b: any) => b.schedId[0] - a.schedId[0]
        );
        const scheds: any = [];
        this.schedules.map((sched: any) => {
          sched.days.map((day: any) => {
            if (day == daySelected.name) {
              scheds.push(sched);
            }
          });
        });
        this.schedules = scheds;
      });
  };

  reset = () => {
    this.search = '';
    this.daySelected = '';
    this.getAllSubjects();
  };

  onAddSchedule = () => {
    this.title = 'Add Schedule';
    this.getScheduleById();
    this.isUpdatingSchedule = false;
    this.scheduleForm.reset();
    this.getAllSubjects();
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
      console.log(this.schedule, 'edit sched');
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

  onRemoveSchedule = (sched: any) => {
    this.schedule = sched;
    this.title = 'Remove Schedule';
    this.body = 'Are you sure you want to remove this schedule?';
    this.confirmationDialog = true;
  };

  onSubmitSchedule = () => {
    if (this.isUpdatingSchedule) {
      if (this.scheduleForm.valid) {
        const subject = this.scheduleForm.get('subject')?.value;
        const days = this.scheduleForm.get('days')?.value;
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
        console.log(payload);

        if (startTime > endTime && endTime < startTime) {
          this.alert = true;
          setTimeout(() => {
            this.alert = false;
          }, 3000);
          this.alertStatus = 'Error';
          this.alertMessage = 'Time conflict with class time';
        } else {
          console.log('updated');

          this.scheduleService.updateSchedule(payload).subscribe((res: any) => {
            console.log(res, 'res message');

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
        }
      } else {
        this.scheduleForm.markAllAsTouched();
      }
    } else {
      console.log(this.scheduleForm.value);

      if (this.scheduleForm.valid) {
        this.scheduleForm.patchValue({
          professorId: this.prof.professorId,
        });
        const startTime = this.scheduleForm.get('startTime')?.value;
        const endTime = this.scheduleForm.get('endTime')?.value;
        if (startTime > endTime && endTime < startTime) {
          this.alert = true;
          setTimeout(() => {
            this.alert = false;
          }, 3000);
          this.alertStatus = 'Error';
          this.alertMessage = 'Time conflict with class time';
        } else {
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
              } else if (
                res.message ==
                'Please create start and end date of classes first'
              ) {
                this.alert = true;
                setTimeout(() => {
                  this.alert = false;
                }, 3000);
                this.alertStatus = 'Error';
                this.alertMessage =
                  'Please create start and end date of classes first';
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
        }
      } else {
        this.scheduleForm.markAllAsTouched();
      }
    }
  };

  onDelete = () => {
    this.scheduleService.deleteSchedule(this.schedule.schedId).subscribe(() => {
      this.getScheduleById();
      this.confirmationDialog = false;
    });
  };

  onCloseDialog = () => {
    this.addScheduleDialog = false;
  };

  onBack = () => {
    history.back();
  };
}
