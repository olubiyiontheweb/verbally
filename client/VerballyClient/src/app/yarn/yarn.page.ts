import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-yarn',
  templateUrl: './yarn.page.html',
  styleUrls: ['./yarn.page.scss'],
})
export class YarnPage implements OnInit {
  yarnForm: FormGroup;
  submitted = false;
  redirect = [];
  headerObject = [{
    'title': 'Verbally',
    'subTitle': 'Create yarns'
  }];

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.yarnForm = this.formBuilder.group({
      yarn: ['', Validators.required],
      tags: ['', Validators.required]
    })
  }

  get getFormControl() {
    return this.yarnForm.controls;
  }

  createYarn() {

  }

}
