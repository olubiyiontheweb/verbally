import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../services/service.service';
import { map, take } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../services/alert.service';
import { AuthServicesService } from '../services/auth-services.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  redirect = [];
  headerObject = [{
    'title': 'Verbally',
    'subTitle': 'Welcome back'
  }];


  constructor(private service: ServiceService,
    private formBuilder: FormBuilder,
    private alert: AlertService,
    private authServicesService: AuthServicesService,
    private router: Router) { }

  get getFormControl() {
    return this.loginForm.controls;
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
    })
  }

  userLogin() {
    this.submitted = true;

    let formData = JSON.stringify({
      "email": this.getFormControl.email.value.trim(),
      "password": this.getFormControl.password.value.trim()
    });

    this.service.userLogin(formData).pipe(map((response: any) => response)).subscribe((res) => {
      if (res && res['authorization'] && res['is_success']) {
        this.authServicesService.setToken(res['authorization']);
        this.router.navigate(['/tabs/yarns'])
      }
    }, err => {
      this.redirect[0] = '/tabs/front';
      this.alert.presentAlert(err.error, this.redirect);
    })

  }

}
