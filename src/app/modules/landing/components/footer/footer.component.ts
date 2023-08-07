import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  constructor(private router: Router) {}

  onClickCourses = () => {
    console.log('route');
    this.router.navigate(['/courses']);
  };

  onClickAbout = () => {
    this.router.navigate(['/about']);
  };

  onClickContact = () => {
    this.router.navigate(['/apply']);
  };

  onClickLife = () => {
    this.router.navigate(['/educatelife']);
  };

  onClickApply = () => {
    this.router.navigate(['/apply']);
  };
}
