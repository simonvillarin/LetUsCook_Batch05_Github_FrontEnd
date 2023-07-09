import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
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
  sectionForm: FormGroup;
  roomForm: FormGroup;

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
  sec: any;
  rm: any;

  isUpdatingSched: boolean = false;
  isUpdatingSec: boolean = false;
  isUpdatingRoom: boolean = false;

  isDeletingSched: boolean = false;
  isDeletingSec: boolean = false;
  isDeletingRoom: boolean = false;

  isShowDropdown = false;
  isShowMobileNav = false;
  isShowNotifications = false;
  isDialogOpen: boolean = false;
  isDeleteDialogOpen: boolean = false;
  isSectionDialogOpen: boolean = false;
  isRoomDialogOpen: boolean = false;
  buttonClicked: boolean = false;

  title: string = '';
  confirm: string = '';
  status: boolean = false;

  alert: boolean = false;
  alertStatus: string = '';
  alertMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private scheduleService: ScheduleService,
    private sectionService: SectionService,
    private roomService: RoomService
  ) {
    this.scheduleForm = fb.group({
      program: ['', Validators.required],
      subject: ['', Validators.required],
      day: ['', Validators.required],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required],
      section: ['', Validators.required],
      room: ['', Validators.required],
      professor: ['', Validators.required],
    });
    this.sectionForm = fb.group({
      sectionName: ['', Validators.required],
    });
    this.roomForm = fb.group({
      roomNumber: ['', Validators.required],
      roomCapacity: ['', Validators.required],
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

  get professor() {
    return this.scheduleForm.get('professor') as FormControl;
  }

  get sectionName() {
    return this.sectionForm.get('sectionName') as FormControl;
  }

  get roomNumber() {
    return this.roomForm.get('roomNumber') as FormControl;
  }

  get roomCapacity() {
    return this.roomForm.get('roomCapacity') as FormControl;
  }

  ngOnInit(): void {
    this.getAllSections();
  }

  getAllSchedules = () => {};

  getAllSections = () => {
    this.sectionService.getAllSections().subscribe((data: any) => {
      this.sections = data.sort((a: any, b: any) => a.sectionId - b.sectionId);
      console.log(data);
    });
  };

  getAllRooms = () => {};

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

  onClickAdd = () => {
    this.title = 'Add Schedule';
    this.isDialogOpen = true;
    this.scheduleForm.markAsUntouched();
  };

  onClickCancel = () => {
    this.isDialogOpen = false;
  };

  onClickSectionDialog = () => {
    this.isSectionDialogOpen = true;
    this.sectionForm.markAsUntouched();
    this.sectionForm.reset();
  };

  onClickRoomDialog = () => {
    this.isRoomDialogOpen = true;
  };

  onClickEdit = (sched: any) => {};

  onClickRemove = (sched: any) => {};

  onCloseDeleteDialog = () => {};

  onEditSection = (sec: any) => {
    this.isUpdatingSec = true;
    this.sectionForm.patchValue({
      sectionName: sec.sectionName,
    });
    this.sec = sec;
  };

  onRemoveSection = (sec: any) => {
    this.sec = sec;
    this.confirm = 'schedule';
    this.status = sec.activeDeactive;
    this.isDeleteDialogOpen = true;
    this.isDeletingSched = false;
    this.isDeletingSec = true;
    this.isDeletingRoom = false;
  };

  onDelete = () => {
    if (this.isDeletingSched) {
    } else if (this.isDeletingSec) {
      const payload = {
        activeDeactive: !this.sec.activeDeactive,
      };
      this.sectionService
        .updateSection(this.sec.sectionId, payload)
        .subscribe(() => this.getAllSections());
      this.isDeletingSec = false;
    } else if (this.isDeletingRoom) {
    }
    this.isDeleteDialogOpen = false;
  };

  onSubmitSection = () => {
    const sectionName = this.sectionForm.get('sectionName')?.value;

    if (this.isUpdatingSec) {
      const payload: any = {};
      if (this.sec.sectionName != sectionName) {
        payload.sectionName = sectionName;
      }

      this.sectionService
        .updateSection(this.sec.sectionId, payload)
        .subscribe((res: any) => {
          if (res.message == 'Section name already exist') {
            this.alert = true;
            setTimeout(() => (this.alert = false), 3000);
            this.alertStatus = 'Error';
            this.alertMessage = 'Section name already exists';
          } else {
            this.getAllSections();
            this.alert = true;
            setTimeout(() => (this.alert = false), 3000);
            this.alertStatus = 'Success';
            this.alertMessage = 'Section name successfully updated';
            this.sectionForm.reset();
            this.isUpdatingSec = false;
          }
        });
    } else {
      if (this.sectionForm.valid) {
        const payload = {
          sectionName: sectionName,
          activeDeactive: true,
        };
        this.sectionService
          .addSection(payload)
          .subscribe(() => this.getAllSections());
        this.alert = true;
        setTimeout(() => (this.alert = false), 3000);
        this.alertStatus = 'Success';
        this.alertMessage = 'Section name successfully added';
        this.sectionForm.reset();
      } else {
        this.sectionForm.markAllAsTouched();
      }
    }
  };
}
