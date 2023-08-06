import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmailService } from 'src/app/shared/services/email/email.service';
import { mobileNumberValidator } from 'src/app/shared/validators/custom.validator';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent {
  contactForm: FormGroup;
  buttonClicked: boolean = false;
  isDialogOpen: boolean = false;

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private emailService: EmailService
  ) {
    this.contactForm = fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobileNumber: ['', [Validators.required, mobileNumberValidator()]],
      message: [''],
    });
  }

  onSubmitContact = () => {
    this.isDialogOpen = true;
  };

  onCloseDialog = () => {
    this.isDialogOpen = false;
  };

  onSubmit() {
    const payload = {
      setFrom: this.contactForm.get('email')?.value,
      message: this.contactForm.get('message')?.value,
    };

    this.emailService.contactEmail(payload).subscribe();
    this.contactForm.reset();
  }
}
