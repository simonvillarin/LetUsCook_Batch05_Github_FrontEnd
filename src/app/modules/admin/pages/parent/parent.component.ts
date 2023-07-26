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

  search: string = '';

  getAllParents = () => {
    this.parentService.getAllParent().subscribe((data: any) => {
      this.parents = data.sort((a: any, b: any) => a.parentId - b.parentId);
    });
  };

  onChangeSearch = (searchTerm: string) => {
    if (searchTerm != '') {
      this.parents = this.parents.filter(
        (parent: any) =>
          parent.firstname.toLowerCase().includes(searchTerm.toLowerCase()) ||
          parent.middlename.toLowerCase().includes(searchTerm.toLowerCase()) ||
          parent.lastname.toLowerCase().includes(searchTerm.toLowerCase())
      );
    } else {
      this.getAllParents();
    }
  };

  reset = () => {
    this.search = '';
    this.getAllParents();
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
