import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../services/service.service';
import { take } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  submitted = false;

  constructor(private service: ServiceService,
    private formBuilder: FormBuilder) { }

  get getFormControl() {
    return this.loginForm.controls;
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
    })
  }

  userLogin() {
    this.submitted = true;

    let formData = JSON.stringify({
      "username": this.getFormControl.username.value.trim(),
      "password": this.getFormControl.password.value.trim()
    });

    console.log(formData);

    this.service.userLogin(formData).pipe(take(1))
      .subscribe((response) => {
        console.log(response);
      });
  }

}
