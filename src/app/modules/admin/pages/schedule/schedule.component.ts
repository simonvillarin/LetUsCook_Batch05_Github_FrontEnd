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

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss'],
})
export class ScheduleComponent implements OnInit {
  scheduleForm: FormGroup;
  schedules: any[] = [];
  programs: any = [];
  subjects: any = [];
  days: any = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  sections: any = [];
  rooms: any = [];
  professors: any = [];

  sched: any;
  isUpdating: boolean = false;

  isDialogOpen: boolean = false;
  isDeleteDialogOpen: boolean = false;

  title: string = '';
  status: boolean = false;

  alert: boolean = false;
  alertStatus: string = '';
  alertMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private scheduleService: ScheduleService,
    private courseService: CourseService,
    private sectionService: SectionService,
    private roomService: RoomService,
    private professorService: ProfessorService
  ) {
    this.scheduleForm = fb.group({
      subject: ['', Validators.required],
      day: ['', Validators.required],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required],
      section: ['', Validators.required],
      room: ['', Validators.required],
    });
  }

  get program() {
    return this.scheduleForm.get('program') as FormControl;
  }

  get subject() {
    return this.scheduleForm.get('subject') as FormControl;
  }

  get day() {
    return this.scheduleForm.get('day') as FormControl;
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

  ngOnInit(): void {
    this.getAllSchedules();
    this.getAllSubjects();
    this.getAllSections();
    this.getAllRooms();
    this.getAllProfessors();
  }

  getAllSchedules = () => {
    this.scheduleService.getAllSchedules().subscribe((data: any) => {
      this.schedules = data.sort((a: any, b: any) => b.schedId - a.schedId);
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
        sections.push(sec.sectionName);
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

  getAllProfessors = () => {
    this.professorService.getAllProfessors().subscribe((data: any) => {
      const sortData = data.sort(
        (a: any, b: any) => b.professorId - a.professorId
      );
      let profs: any = [];
      sortData.map((prof: any) => {
        profs.push(prof.fullname);
      });
      this.professors = profs;
    });
  };

  onClickAdd = () => {
    this.title = 'Add Schedule';
    this.isDialogOpen = true;
    this.isUpdating = false;
    this.scheduleForm.reset();
    this.scheduleForm.markAsUntouched();
  };

  onClickCancel = () => {
    this.isDialogOpen = false;
  };

  onClickEdit = (sched: any) => {
    this.title = 'Edit Schedule';
    this.isDialogOpen = true;
    this.isUpdating = true;
    this.sched = sched;
    this.scheduleForm.patchValue({
      subject: sched.subject.subjectTitle,
      day: sched.day,
      startTime: sched.startTime,
      endTime: sched.endTime,
      section: sched.section,
      room: sched.room,
      professor: sched.professor.fullname,
    });
  };

  onClickRemove = (sched: any) => {
    this.isDeleteDialogOpen = true;
    this.sched = sched;
    this.status = !sched.activeDeactive;
  };

  onCloseDeleteDialog = () => {
    this.isDeleteDialogOpen = false;
  };

  onDeleteSchedule = () => {
    const payload = {
      activeDeactive: !this.sched.activeDeactive,
    };
    this.scheduleService
      .updateSchedule(this.sched.schedId, payload)
      .subscribe(() => this.getAllSchedules());
    this.status = !this.sched.activeDeactive;
    this.isDeleteDialogOpen = false;
  };

  onSubmit = () => {
    if (this.isUpdating) {
      if (this.scheduleForm.valid) {
        const subject = this.scheduleForm.get('subject')?.value;
        const day = this.scheduleForm.get('day')?.value;
        const startTime = this.scheduleForm.get('startTime')?.value;
        const endTime = this.scheduleForm.get('endTime')?.value;
        const section = this.scheduleForm.get('section')?.value;
        const room = this.scheduleForm.get('room')?.value;

        const payload: any = {};
        if (subject != this.sched.subject.subjectTitle) {
          payload.subject = subject;
        }
        if (subject != this.sched.day) {
          payload.day = day;
        }
        if (startTime != this.sched.startTime) {
          payload.startTime = startTime;
        }
        if (endTime != this.sched.endTime) {
          payload.endTime = endTime;
        }
        if (section != this.sched.section) {
          payload.section = section;
        }
        if (room != this.sched.room) {
          payload.room = room;
        }

        this.scheduleService
          .updateSchedule(this.sched.schedId, payload)
          .subscribe((res: any) => {
            if (res.message == 'Schedule is already taken') {
              this.alert = true;
              setTimeout(() => {
                this.alert = false;
              }, 3000);
              this.alertStatus = 'Error';
              this.alertMessage = 'Schedule is already taken';
            } else {
              this.getAllSchedules();
              this.isDialogOpen = false;
            }
          });
      } else {
        this.scheduleForm.markAllAsTouched();
      }
    } else {
      if (this.scheduleForm.valid) {
        this.scheduleService
          .addSchedule(this.scheduleForm.value)
          .subscribe((res: any) => {
            if (res.message == 'Schedule is already taken') {
              this.alert = true;
              setTimeout(() => {
                this.alert = false;
              }, 3000);
              this.alertStatus = 'Error';
              this.alertMessage = 'Schedule is already taken';
            } else {
              this.getAllSchedules();
              this.alert = true;
              setTimeout(() => {
                this.alert = false;
              }, 3000);
              this.alertStatus = 'Success';
              this.alertMessage = 'Section successfully added';
              this.scheduleForm.reset();
            }
          });
      } else {
        this.scheduleForm.markAllAsTouched();
      }
    }
  };
}
