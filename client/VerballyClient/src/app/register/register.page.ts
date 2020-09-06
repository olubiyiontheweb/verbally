import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import { take } from 'rxjs/operators';
import { ServiceService } from '../services/service.service';
import { AlertController } from '@ionic/angular';

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

  constructor(
    private formBuilder: FormBuilder,
    private serviceService: ServiceService,
    private alertCtrl: AlertController,
    private cdref: ChangeDetectorRef
  ) { }

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

  async presentAlert() {
    const alert = await this.alertCtrl.create({
      header: 'Alert',
      message: 'Your account has been created, please verify this account through your email.',
      buttons: ['Close'],
    });

    await alert.present();
    let result = await alert.onWillDismiss();
    console.log(result);
  }

  registerUser() {
    this.submitted = true;

    if (this.registerForm.invalid == true) {
      return this.registerForm.errors;
    }
    else {

      let formData = JSON.stringify({
        "user": {
          first_name: this.getFormControl.first_name.value.trim(),
          email: this.getFormControl.email.value.trim(),
          username: this.getFormControl.username.value.trim(),
          password: this.getFormControl.password.value.trim(),
          password_confirmation: this.getFormControl.password_confirmation.value.trim(),
          date_of_birth: this.getFormControl.date_of_birth.value.trim(),
          accept_terms_condition: this.getFormControl.accept_terms_condition.value
        }
      });

      this.serviceService.registerUsers(formData).pipe(take(1))
        .subscribe((response) => {
          if (response.is_success == true) {
            this.presentAlert();
          }
        });
    }
  }

}
