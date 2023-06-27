import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginDialogComponent } from '../login-dialog/login-dialog.component';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  showMobileNav: boolean = false;
  isLoginOpen: boolean = false;
  constructor(private loginDialog: MatDialog) {}

  isMobileNavOpen = () => {
    this.showMobileNav = !this.showMobileNav;
  };

  showLoginDialog = () => {
    this.loginDialog.open(LoginDialogComponent, {
      width: '500px',
    });
  };
}
