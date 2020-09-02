import { Component, OnInit } from '@angular/core';
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

  constructor(
    private formBuilder: FormBuilder,
    private serviceService: ServiceService
  ) { }

  get getFormControl() {
    return this.registerForm.controls;
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      emailAddress: [null, [Validators.required, Validators.pattern(this.emailPattern)]],
      userName: [null, Validators.required],
      password: [null, Validators.required],
      confirmPassword: [null, Validators.required],
      dob: [null, Validators.required],
      termsAndCondition: [null, Validators.requiredTrue]
    })
  }


  registerUser() {
    this.submitted = true;

    if (this.registerForm.invalid == true) {
      return this.registerForm.errors;
    }
    else {

      let formData = JSON.stringify({
        firstName: this.getFormControl.firstName.value,
        lastName: this.getFormControl.lastName.value,
        emailAddress: this.getFormControl.emailAddress.value,
        userName: this.getFormControl.userName.value,
        password: this.getFormControl.password.value,
        confirmPassword: this.getFormControl.confirmPassword.value,
        dob: this.getFormControl.dob.value,
        termsAndCondition: this.getFormControl.termsAndCondition.value
      });

      console.log(formData);

      this.serviceService.registerUsers(formData).pipe(take(1))
        .subscribe((response) => {
          console.log(response);
        });
    }
  }

}
