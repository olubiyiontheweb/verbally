import { Component, OnInit } from '@angular/core';
import { LoaderService } from '../services/loader.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ServiceService } from '../services/service.service';
import { AlertService } from '../services/alert.service';

import { take } from 'rxjs/operators';

@Component({
  selector: 'app-confirmregistration',
  templateUrl: './confirmregistration.page.html',
  styleUrls: ['./confirmregistration.page.scss'],
})
export class ConfirmregistrationPage implements OnInit {
  confirmationToken: any;

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private loaderService: LoaderService,
    private service: ServiceService,
    private alertService: AlertService) { }

  ngOnInit() {
    let customCss = 'custom-class custom-loading';
    let message = 'Confirmation in progress...';
    this.loaderService.showLoader(message, customCss);
    this.extractUserCode();
  }

  extractUserCode() {
    this.confirmationToken = this.activatedRoute.snapshot.params;
    console.log(this.confirmationToken);

    let formData = JSON.stringify({
      "confirmation_token": this.confirmationToken
    });

    this.service.userAccountConfirmation(formData).pipe(take(1))
      .subscribe((response) => {
        this.alertService.presentAlert(response);
      });
  }

}
