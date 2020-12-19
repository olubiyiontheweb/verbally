import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import { take } from 'rxjs/operators';
import { ServiceService } from '../services/service.service';
import { AlertService } from '../services/alert.service';
import { AuthServicesService } from '../services/auth-services.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  registerForm: FormGroup;
  submitted = false;
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  formattedDate;
  redirect = [];
  headerObject = [{
    'title': 'Verbally',
    'subTitle': 'Just one click away'
  }];

  constructor(
    private formBuilder: FormBuilder,
    private serviceService: ServiceService,
    private alertService: AlertService,
    private cdref: ChangeDetectorRef,
    private authServicesService: AuthServicesService
  ) {

  }

  get getFormControl() {
    return this.registerForm.controls;
  }

  ngOnInit() {

    this.registerForm = this.formBuilder.group({
      first_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      password_confirmation: ['', [Validators.required, Validators.minLength(6)]],
      date_of_birth: ['', Validators.required],
      accept_terms_condition: [null, Validators.requiredTrue]
    }, {
      validator: this.MustMatch('password', 'password_confirmation')
    })
  }

  formatDateOfBirth() {
    this.formattedDate = this.getFormControl.date_of_birth.value;
    this.cdref.detectChanges();
  }

  // custom validator to check that two fields match
  MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        // return if another validator has already found an error on the matchingControl
        return;
      }
      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    }
  }


  registerAccount() {
    this.submitted = true;

    if (this.registerForm.invalid == true) {
      return this.registerForm.errors;
    }
    else {

      let formData = JSON.stringify({
        "account": {
          first_name: this.getFormControl.first_name.value.trim(),
          email: this.getFormControl.email.value.trim(),
          username: this.getFormControl.username.value.trim(),
          password: this.getFormControl.password.value.trim(),
          password_confirmation: this.getFormControl.password_confirmation.value.trim(),
          date_of_birth: this.getFormControl.date_of_birth.value.trim(),
          accept_terms_condition: this.getFormControl.accept_terms_condition.value
        }
      });

      this.serviceService.registerAccount(formData).pipe(take(1))
        .subscribe((response) => {
          this.redirect[0] = '/tabs/front';
          if (response) {
            this.authServicesService.setToken(response['authorization']);
            this.alertService.presentAlert(response, this.redirect);
          }
        }, (error) => {
          this.redirect[1] = '/tabs/register';
          this.alertService.presentAlert(error, this.redirect);
        });
    }
  }

}
