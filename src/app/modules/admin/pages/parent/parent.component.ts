import { Component, OnInit } from '@angular/core';
import { ParentService } from 'src/app/shared/services/parent/parent.service';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.scss'],
})
export class ParentComponent implements OnInit {
  constructor(private parentService: ParentService) {}
  ngOnInit(): void {
    this.getAllParents();
  }
  parents: any = [];
  parent: any;

  isDeleteDialogOpen: boolean = false;
  status: boolean = false;

  getAllParents = () => {
    this.parentService.getAllParent().subscribe((data: any) => {
      this.parents = data.sort((a: any, b: any) => a.parentId - b.parentId);
    });
  };

  onClickRemove = (parent: any) => {
    this.parent = parent;
    this.status = this.parent.activeDeactive;
    this.isDeleteDialogOpen = true;
  };

  onCloseDeleteDialog = () => {
    this.isDeleteDialogOpen = false;
    this.parent = null;
  };

  onDeleteParent = () => {
    if (this.parent) {
      const payload = {
        activeDeactive: !this.parent.activeDeactive,
      };
      this.parentService
        .updateParent(this.parent.parentId, payload)
        .subscribe(() => this.getAllParents());
      this.isDeleteDialogOpen = false;
      this.parent = null;
    }
  };
}
