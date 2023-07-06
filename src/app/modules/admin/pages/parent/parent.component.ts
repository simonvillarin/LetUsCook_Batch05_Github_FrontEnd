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
    console.log(this.parents);
  }
  parents = [];
  relationship = [{ name: 'Father' }, { name: 'Mother' }, { name: 'Other' }];

  isShowDropdown = false;
  isShowMobileNav = false;
  isShowNotifications = false;

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

  getAllParents = () => {
    this.parentService.getAllParent().subscribe((parent) => this.parents);
  };
}
