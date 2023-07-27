import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { RoomService } from 'src/app/shared/services/room/room.service';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss'],
})
export class RoomComponent implements OnInit {
  roomForm: FormGroup;
  rooms: any[] = [];
  room: any;

  isUpdating: boolean = false;
  isDialogOpen: boolean = false;
  isDeleteDialogOpen: boolean = false;
  status: boolean = false;

  alert: boolean = false;
  alertStatus: string = '';
  alertMessage: string = '';
  title: string = '';
  search: string = '';

  constructor(private roomService: RoomService, private fb: FormBuilder) {
    this.roomForm = fb.group({
      roomNumber: ['', [Validators.required]],
      roomCapacity: ['', [Validators.required]],
    });
  }

  get roomNumber() {
    return this.roomForm.get('roomNumber') as FormControl;
  }

  get roomCapacity() {
    return this.roomForm.get('roomCapacity') as FormControl;
  }

  ngOnInit(): void {
    this.getAllRooms();
  }

  getAllRooms = () => {
    this.roomService.getAllRooms().subscribe((data: any) => {
      this.rooms = data.sort((a: any, b: any) => b.roomId - a.roomId);
    });
  };

  onChangeSearch = (searchTerm: string) => {
    if (searchTerm != '') {
      this.rooms = this.rooms.filter((room: any) =>
        room.roomNumber.toLowerCase().includes(searchTerm.toLowerCase())
      );
    } else {
      this.getAllRooms();
    }
  };

  reset = () => {
    this.search = '';
    this.getAllRooms();
  };

  onAdd = () => {
    this.title = 'Add Room';
    this.isDialogOpen = true;
    this.isUpdating = false;
    this.roomForm.reset();
    this.roomForm.markAsUntouched();
  };

  onClickCancel = () => {
    this.isDialogOpen = false;
  };

  onClickEdit = (room: any) => {
    this.title = 'Edit Room';
    this.isDialogOpen = true;
    this.isUpdating = true;
    this.room = room;
    this.roomForm.patchValue({
      roomNumber: this.room.roomNumber,
      roomCapacity: this.room.roomCapacity,
    });
  };

  onClickRemove = (room: any) => {
    this.room = room;
    this.isDeleteDialogOpen = true;
    this.status = !room.activeDeactive;
  };

  onCloseDeleteDialog = () => {
    this.isDeleteDialogOpen = false;
  };

  onDeleteRoom = () => {
    const payload = {
      activeDeactive: !this.room.activeDeactive,
    };
    this.roomService
      .updateRoom(this.room.roomId, payload)
      .subscribe(() => this.getAllRooms());
    this.isDeleteDialogOpen = false;
    this.status = !this.room.activeDeactive;
  };

  onSubmit = () => {
    if (this.isUpdating) {
      if (this.roomForm.valid) {
        const roomNumber = this.roomForm.get('roomNumber')?.value;
        const roomCapacity = this.roomForm.get('roomCapacity')?.value;
        const payload: any = {};
        if (this.room != roomNumber) {
          payload.roomNumber = roomNumber;
        }
        if (this.roomCapacity != roomCapacity) {
          payload.roomCapacity = roomCapacity;
        }

        this.roomService
          .updateRoom(this.room.roomId, payload)
          .subscribe(() => this.getAllRooms());
        this.isDialogOpen = false;
      } else {
        this.roomForm.markAllAsTouched();
      }
    } else {
      if (this.roomForm.valid) {
        this.roomService
          .addRoom(this.roomForm.value)
          .subscribe(() => this.getAllRooms());
        this.alert = true;
        setTimeout(() => {
          this.alert = false;
        }, 3000);
        this.alertStatus = 'Success';
        this.alertMessage = 'Room successfully added';
        this.roomForm.reset();
      } else {
        this.roomForm.markAllAsTouched();
      }
    }
  };
}
