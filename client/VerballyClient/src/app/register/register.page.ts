import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import { take } from 'rxjs/operators';
import { ServiceService } from '../services/service.service';

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
    private cdref: ChangeDetectorRef
  ) { }

  get getFormControl() {
    return this.registerForm.controls;
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      first_name: [null, Validators.required],
      email: [null, [Validators.required, Validators.pattern(this.emailPattern)]],
      username: [null, Validators.required],
      password: [null, Validators.required],
      password_confirmation: [null, Validators.required],
      date_of_birth: [null, Validators.required],
      accept_terms_condition: [null, Validators.requiredTrue]
    })
  }

  formatDateOfBirth() {
    this.formattedDate = this.getFormControl.date_of_birth.value;
    this.cdref.detectChanges();
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
      }
      );

      console.log(formData);

      this.serviceService.registerUsers(formData).pipe(take(1))
        .subscribe((response) => {
          console.log(response);
        });
    }
  }

}
